// src/components/NoteForm.jsx
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useAppStore } from "../store";

export default function NoteForm({ subjectId, topicId, initialData, onCancel, onSuccess }) {
  const { createNote, updateNote, error, clearError } = useAppStore();

  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setHeading(initialData.heading || "");
      setContent(initialData.content || "");
    } else {
      setHeading("");
      setContent("");
    }
    clearError();
  }, [initialData, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!heading.trim() || !content.trim()) return;

    setLoading(true);
    try {
      if (initialData) {
        await updateNote(subjectId, topicId, initialData._id || initialData.id, {
          heading,
          content,
        });
      } else {
        await createNote(subjectId, topicId, { heading, content });
      }
      onSuccess();
    } catch (err) {
      console.error("Failed to save note:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 font-montserrat">
          {initialData ? "Edit Note" : "Add Study Note"}
        </h3>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-800">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="block text-xs font-semibold text-slate-700">Note Heading</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
          placeholder="e.g., Core Concepts & Summary"
          className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        />
      </div>

      <div className="space-y-1" data-color-mode="light">
        <label className="block text-xs font-semibold text-slate-700 mb-1">Content (Markdown Supported)</label>
        <MDEditor
          value={content}
          onChange={(val) => setContent(val || "")}
          height={200}
          preview="edit"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition cursor-pointer disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update Note" : "Save Note"}
        </button>
      </div>
    </form>
  );
}