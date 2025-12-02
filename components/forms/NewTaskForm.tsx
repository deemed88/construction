import React, { useState, useRef } from 'react';
import { mockUsers } from '../../mockData';
import { User } from '../../types';
import { MicrophoneIcon, StopCircleIcon } from '@heroicons/react/24/solid';
import { GoogleGenAI } from '@google/genai';

interface NewTaskFormProps {
  onClose: () => void;
  onAddTask: (taskData: any) => void;
}

// Helper to convert Blob to Base64
const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                // result is "data:audio/webm;base64,...."
                // We only need the part after the comma
                const base64Data = (reader.result as string).split(',')[1];
                resolve(base64Data);
            } else {
                reject(new Error("Failed to read blob."));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};


export const NewTaskForm: React.FC<NewTaskFormProps> = ({ onClose, onAddTask }) => {
    const [formData, setFormData] = useState({
        title: '',
        assigneeId: '',
        dueDate: '',
        priority: 'Medium'
    });
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);


    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask({ ...formData, audioMemoUrl: audioUrl });
    };

    const transcribeAudio = async (base64Audio: string, mimeType: string) => {
        setIsTranscribing(true);
        setTranscriptionError(null);
        try {
            if (!process.env.API_KEY) {
              throw new Error("API_KEY environment variable not set.");
            }

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const audioPart = {
                inlineData: {
                    data: base64Audio,
                    mimeType: mimeType,
                },
            };
            const textPart = { text: "Transcribe this audio recording of a task title for a construction project management app." };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash', // Gemini is good for short audio transcription
                contents: { parts: [textPart, audioPart] },
            });
            
            const transcription = response.text;
            if (transcription) {
                 setFormData(prev => ({ ...prev, title: transcription }));
            } else {
                setTranscriptionError("Could not understand the audio. Please try again.");
            }

        } catch (error) {
            console.error("Transcription error:", error);
            setTranscriptionError("Failed to transcribe audio. Please check your connection or API key.");
        } finally {
            setIsTranscribing(false);
        }
    };

    const handleToggleRecording = async () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
        } else {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
            setAudioUrl(null);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                // Note: common mime types are audio/webm, audio/ogg
                const mimeType = 'audio/webm';
                mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
                audioChunksRef.current = [];

                mediaRecorderRef.current.ondataavailable = (event) => {
                    audioChunksRef.current.push(event.data);
                };

                mediaRecorderRef.current.onstop = async () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                    const url = URL.createObjectURL(audioBlob);
                    setAudioUrl(url);

                    const base64Audio = await blobToBase64(audioBlob);
                    transcribeAudio(base64Audio, mimeType);
                    // Stop all tracks to release the microphone
                    stream.getTracks().forEach(track => track.stop()); 
                };

                mediaRecorderRef.current.start();
                setIsRecording(true);
                setTranscriptionError(null);
            } catch (error) {
                console.error("Error accessing microphone:", error);
                setTranscriptionError("Microphone access denied. Please enable it in your browser settings.");
            }
        }
    };
    
    const commonInputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm";
    const titleInputClass = "pl-3 pr-10 py-2";

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
                    <div className="relative mt-1">
                        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className={`${commonInputClass} ${titleInputClass}`} />
                        <button
                            type="button"
                            onClick={handleToggleRecording}
                            disabled={isTranscribing}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 group"
                            aria-label={isRecording ? "Stop recording" : "Record with voice"}
                        >
                          {isTranscribing ? (
                            <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : isRecording ? (
                                <StopCircleIcon className="h-6 w-6 text-red-500 animate-pulse" />
                          ) : (
                                <MicrophoneIcon className="h-5 w-5 text-gray-400 group-hover:text-brand-blue-600" />
                          )}
                        </button>
                    </div>
                     {transcriptionError && <p className="mt-2 text-xs text-red-600">{transcriptionError}</p>}
                </div>

                {audioUrl && (
                    <div className="mt-2 p-3 bg-gray-100 rounded-md border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Voice Memo Attached</label>
                        <audio src={audioUrl} controls className="w-full h-10" />
                        <button
                            type="button"
                            onClick={() => {
                                if (audioUrl) URL.revokeObjectURL(audioUrl);
                                setAudioUrl(null);
                            }}
                            className="text-xs text-red-600 hover:text-red-800 mt-2"
                        >
                            Remove Memo
                        </button>
                    </div>
                )}

                <div>
                    <label htmlFor="assigneeId" className="block text-sm font-medium text-gray-700">Assign To</label>
                    <select name="assigneeId" id="assigneeId" value={formData.assigneeId} onChange={handleChange} className={commonInputClass}>
                        <option value="">Unassigned</option>
                        {mockUsers.map((user: User) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} required className={commonInputClass} />
                </div>
                 <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                    <select name="priority" id="priority" value={formData.priority} onChange={handleChange} className={commonInputClass}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-md hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">Add Task</button>
            </div>
        </form>
    );
};