// src/components/TopicForm.jsx
import { useState, useEffect } from 'react'
import { Field, Label, Input, Textarea } from '@headlessui/react'
import { useAppStore } from '../store'

export default function TopicForm({ subjectId, initialData, onCancel, onSuccess }) {
  const isEditMode = Boolean(initialData)
  const { createTopic, updateTopic, loading, error } = useAppStore()

  const [formData, setFormData] = useState({
    topicName: initialData?.topicName ?? '',
    topicDescription: initialData?.topicDescription ?? '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        topicName: initialData.topicName ?? '',
        topicDescription: initialData.topicDescription ?? '',
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const topicId = initialData?._id ?? initialData?.id
      
      if (isEditMode) {
        await updateTopic(subjectId, topicId, formData)
      } else {
        await createTopic(subjectId, formData)
      }

      onSuccess?.()
    } catch (err) {
      console.error('Topic form submission failed:', err)
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
        {error && (
          <div className="rounded-xl bg-red-50 p-4 border border-red-100">
            <p className="text-xs font-semibold text-red-800">Error: {error}</p>
          </div>
        )}

        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Topic Title <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="topicName"
            required
            value={formData.topicName}
            onChange={handleChange}
            placeholder="e.g. Process Scheduling & Deadlocks, Binary Search Trees"
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
          />
        </Field>

        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Summary & Scope
          </Label>
          <Textarea
            name="topicDescription"
            rows="3"
            value={formData.topicDescription}
            onChange={handleChange}
            placeholder="Key concepts, syllabus sub-bullets, or exam weightage..."
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition resize-none"
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
            {loading ? 'Processing...' : isEditMode ? 'Save Changes' : 'Create Topic'}
          </button>
        </div>
      </form>
    </div>
  )
}