// src/components/SubjectForm.jsx
import { useState } from 'react';
import { Field, Label, Input } from '@headlessui/react';
import { createSubjectSlice } from '../store/slices/subjectSlice';

export default function SubjectForm({ initialData = null, onCancel, onSuccess }) {
  const isEditMode = Boolean(initialData);
  const { createSubject, updateSubject, loading, error } = createSubjectSlice();

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateSubject(initialData._id || initialData.id, formData);
      } else {
        await createSubject(formData);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Subject submission failed:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs max-w-lg w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {isEditMode ? 'Update Subject' : 'Add New Subject'}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {isEditMode
            ? 'Modify the subject name.'
            : 'Create a subject to begin organizing topics and notes.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl bg-red-50 p-4 border border-red-100">
            <p className="text-xs font-semibold text-red-800">Error: {error}</p>
          </div>
        )}

        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Subject Name <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Distributed Systems, Operating Systems, Algorithms"
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
          />
        </Field>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50 mt-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Processing...' : isEditMode ? 'Save Changes' : 'Create Subject'}
          </button>
        </div>
      </form>
    </div>
  );
}