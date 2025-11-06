import React, { useState, useEffect } from 'react';
import { mockNotes } from '../../mockData';
import { Note, User } from '../../types';
import { DocumentPlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface NotepadProps {
  projectId: string;
  currentUser: User;
}

export const Notepad: React.FC<NotepadProps> = ({ projectId, currentUser }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load and filter notes to show only those created by the current user
    const projectNotes = (mockNotes[projectId] || []).filter(note => note.creatorId === currentUser.id);
    setNotes(projectNotes);
    
    if (projectNotes.length > 0) {
      // If there's no selected note or the selected one is no longer visible, select the first one
      if (!selectedNoteId || !projectNotes.find(n => n.id === selectedNoteId)) {
        setSelectedNoteId(projectNotes[0].id);
      }
    } else {
      setSelectedNoteId(null); // No notes for this user in this project
    }
  }, [projectId, currentUser.id]);

  useEffect(() => {
    if (selectedNoteId === 'new') {
        setEditorTitle('New Note');
        setEditorContent('');
    } else {
        const selectedNote = notes.find(n => n.id === selectedNoteId);
        if (selectedNote) {
            setEditorTitle(selectedNote.title);
            setEditorContent(selectedNote.content);
        } else {
            setEditorTitle('');
            setEditorContent('');
        }
    }
  }, [selectedNoteId, notes]);

  const handleSelectNote = (noteId: string) => {
    setSelectedNoteId(noteId);
  };

  const handleNewNote = () => {
    setSelectedNoteId('new');
  };

  const handleSave = () => {
    if (!editorTitle.trim()) {
        alert('Note title cannot be empty.');
        return;
    }
    setIsSaving(true);
    setTimeout(() => {
      const timestamp = new Date().toISOString();

      if (selectedNoteId === 'new') {
        const newNote: Note = {
          id: `note-${Date.now()}`,
          title: editorTitle,
          content: editorContent,
          lastUpdated: timestamp,
          creatorId: currentUser.id,
        };
        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        
        // Update mock data source
        if (!mockNotes[projectId]) mockNotes[projectId] = [];
        mockNotes[projectId].push(newNote); 
        
        setSelectedNoteId(newNote.id);
      } else {
        const updatedNotes = notes.map(note =>
          note.id === selectedNoteId
            ? { ...note, title: editorTitle, content: editorContent, lastUpdated: timestamp }
            : note
        );
        setNotes(updatedNotes);

        // Update mock data source
        mockNotes[projectId] = mockNotes[projectId].map(note => 
            note.id === selectedNoteId ? updatedNotes.find(n => n.id === note.id)! : note
        );
      }
      setIsSaving(false);
    }, 500);
  };

  const handleDelete = () => {
    if (!selectedNoteId || selectedNoteId === 'new') return;

    if (window.confirm(`Are you sure you want to delete "${editorTitle}"?`)) {
        const updatedNotes = notes.filter(n => n.id !== selectedNoteId);
        setNotes(updatedNotes);
        mockNotes[projectId] = mockNotes[projectId].filter(n => n.id !== selectedNoteId);

        // Select the next note or clear the editor
        if (updatedNotes.length > 0) {
            setSelectedNoteId(updatedNotes[0].id);
        } else {
            setSelectedNoteId(null);
        }
    }
  };
  
  const formatTimestamp = (isoString: string) => {
    return new Date(isoString).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
  };
  
  const activeNote = notes.find(n => n.id === selectedNoteId);

  return (
    <div className="bg-white rounded-xl shadow-md flex h-[75vh]">
        {/* Note List Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">My Notes</h2>
                <button onClick={handleNewNote} className="p-2 text-gray-500 hover:bg-gray-100 hover:text-brand-blue-600 rounded-full" title="New Note">
                    <DocumentPlusIcon className="h-6 w-6" />
                </button>
            </div>
            <div className="overflow-y-auto flex-1">
                {notes.length > 0 ? (
                    <ul>
                        {notes.map(note => (
                            <li key={note.id}>
                                <button
                                    onClick={() => handleSelectNote(note.id)}
                                    className={`w-full text-left p-4 border-b border-gray-100 hover:bg-brand-blue-50 ${selectedNoteId === note.id ? 'bg-brand-blue-50' : ''}`}
                                >
                                    <h3 className="font-semibold text-gray-800 truncate">{note.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formatTimestamp(note.lastUpdated)}
                                    </p>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                        <p>You haven't created any notes for this project yet.</p>
                        <button onClick={handleNewNote} className="mt-2 text-brand-blue-600 font-semibold">Create one</button>
                    </div>
                )}
            </div>
        </div>

        {/* Note Editor */}
        <div className="w-2/3 flex flex-col">
            {selectedNoteId ? (
                <>
                    <div className="p-4 border-b border-gray-200 flex-shrink-0">
                        <input
                            type="text"
                            value={editorTitle}
                            onChange={e => setEditorTitle(e.target.value)}
                            placeholder="Note Title"
                            className="w-full text-xl font-bold text-gray-900 border-none focus:ring-0 p-0"
                        />
                         {activeNote && (
                            <p className="text-xs text-gray-500 mt-1">Last saved: {formatTimestamp(activeNote.lastUpdated)}</p>
                         )}
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                        <textarea
                            value={editorContent}
                            onChange={e => setEditorContent(e.target.value)}
                            placeholder="Start typing your notes here..."
                            className="w-full h-full border-none focus:ring-0 resize-none text-gray-700 leading-relaxed p-0"
                            aria-label="Note content"
                        />
                    </div>
                    <div className="p-4 border-t border-gray-200 flex justify-end items-center space-x-4 flex-shrink-0">
                         {selectedNoteId !== 'new' && (
                            <button
                                onClick={handleDelete}
                                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                                title="Delete Note"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center justify-center w-28 px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700 shadow-sm disabled:bg-brand-blue-400 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full text-center text-gray-500">
                    <div>
                        <p>Select a note to view it, or create a new one.</p>
                         <button onClick={handleNewNote} className="mt-2 font-semibold text-brand-blue-600">
                            Create a new note
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};