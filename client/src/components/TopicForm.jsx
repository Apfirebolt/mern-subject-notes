// src/components/TopicForm.jsx
import { useState } from 'react'
import { Field, Label, Input, Textarea, Select } from '@headlessui/react'
import { useSubjectStore } from '../store/useSubjectStore'

export default function TopicForm({ subjectId, initialData = null, onCancel, onSuccess }) {
  const isEditMode = !!initialData
  const { createTopic, updateTopic, loading, error } = useSubjectStore()

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'medium',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditMode) {
        await updateTopic(subjectId, initialData._id || initialData.id, formData)
      } else {
        await createTopic(subjectId, formData)
      }

      if (onSuccess) onSuccess()
    } catch (err) {
      console.error('Topic form submission halted:', err)
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs max-w-lg w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {isEditMode ? 'Modify Topic Details' : 'Add New Topic'}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {isEditMode
            ? 'Update the topic name, focus priority, or conceptual notes.'
            : 'Break this subject down by adding a major unit or study topic.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Backend Error Block */}
        {error && (
          <div className="rounded-xl bg-red-50 p-4 border border-red-100">
            <p className="text-xs font-semibold text-red-800">Error: {error}</p>
          </div>
        )}

        {/* Topic Title */}
        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Topic Title <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Process Scheduling & Deadlocks, Binary Search Trees"
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
          />
        </Field>

        {/* Priority Selector */}
        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Study Priority
          </Label>
          <div className="relative">
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition bg-white cursor-pointer"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="critical">Critical / Exam Essential</option>
            </Select>
          </div>
        </Field>

        {/* Topic Description */}
        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Summary & Scope
          </Label>
          <Textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Key concepts, syllabus sub-bullets, or exam weightage..."
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition resize-none"
          />
        </Field>

        {/* Form Actions */}
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
            {loading ? 'Processing...' : isEditMode ? 'Save Changes' : 'Create Topic'}
          </button>
        </div>
      </form>
    </div>
  )
}