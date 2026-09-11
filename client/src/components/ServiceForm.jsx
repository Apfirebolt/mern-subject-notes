// src/components/ServiceForm.jsx
import { useState } from 'react'
import { Field, Label, Input, Textarea } from '@headlessui/react'
import { useAppStore } from '../store'

export default function ServiceForm({ initialData = null, onCancel, onSuccess }) {

  const isEditMode = !!initialData
  const { addService, updateService, serviceLoading, serviceError } = useAppStore()

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    logo_url: initialData?.logo_url || '',
    description: initialData?.description || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditMode) {
        // Execute PUT update flow
        await updateService(initialData.id, formData)
      } else {
        // Execute POST creation flow
        await addService(formData)
      }
      
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error('Form submission halted:', err)
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs max-w-lg w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {isEditMode ? 'Modify Service Details' : 'Catalog New Platform Service'}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {isEditMode 
            ? 'Update corporate configuration details for this entry.' 
            : 'Register a base service platform to make it selectable for subscriptions.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Backend Error Notification Block */}
        {serviceError && (
          <div className="rounded-xl bg-red-50 p-4 border border-red-100">
            <p className="text-xs font-semibold text-red-800">Error: {serviceError}</p>
          </div>
        )}

        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Service Name
          </Label>
          <Input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Disney+ Hotstar, AWS, Slack"
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
          />
        </Field>

        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Logo URL Image Asset
          </Label>
          <Input
            type="url"
            name="logo_url"
            value={formData.logo_url}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
          />
        </Field>

        {/* Description Field */}
        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Platform Description
          </Label>
          <Textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a brief overview regarding what this service catalog option includes..."
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition resize-none"
          />
        </Field>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50 mt-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={serviceLoading}
              className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={serviceLoading}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-xs transition-colors disabled:opacity-50"
          >
            {serviceLoading ? 'Processing...' : isEditMode ? 'Save Changes' : 'Create Service'}
          </button>
        </div>
      </form>
    </div>
  )
}