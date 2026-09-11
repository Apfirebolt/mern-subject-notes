// src/components/SubscriptionForm.jsx
import { useState } from 'react'
import { Field, Label, Input, Textarea, Select } from '@headlessui/react'
import { useAppStore } from '../store'

export default function SubscriptionForm({ initialData = null, onCancel, onSuccess }) {
  const isEditMode = !!initialData
  
  // Pluck relevant state and CRUD hooks from your consolidated Zustand architecture
  const { 
    addSubscription, 
    updateSubscription, 
    subLoading, 
    subError,
    
  } = useAppStore()

  // get services from props to populate the dropdown selection field
  const availableServices = useAppStore((state) => state.availableServices)

  // Initialize local form field state mapped exactly to your Django Model definitions
  const [formData, setFormData] = useState({
    service: initialData?.service || '',
    plan_name: initialData?.plan_name || '',
    status: initialData?.status || 'ACTIVE',
    category: initialData?.category || '',
    cost: initialData?.cost || '',
    billing_cycle: initialData?.billing_cycle || 'MONTHLY',
    next_billing_date: initialData?.next_billing_date || '',
    notes: initialData?.notes || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Quick payload payload sanitizer: ensure the numeric ID and cost decimal are cleanly scrubbed
    const payload = {
      ...formData,
      service: parseInt(formData.service, 10),
      cost: parseFloat(formData.cost).toFixed(2)
    }

    try {
      if (isEditMode) {
        await updateSubscription(initialData.id, payload)
      } else {
        await addSubscription(payload)
      }
      
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error('Subscription pipeline entry halted:', err)
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs max-w-lg w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {isEditMode ? 'Modify Tracked Commitment' : 'Add Active Subscription'}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {isEditMode 
            ? 'Adjust pricing limits, status flags, or renewal cycles.' 
            : 'Log a recurring platform cost to start calculating auto-alert metrics.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Global Error Display Banner */}
        {subError && (
          <div className="rounded-xl bg-red-50 p-4 border border-red-100">
            <p className="text-xs font-semibold text-red-800">Error: {subError}</p>
          </div>
        )}

        {/* 1. Service Provider Dropdown Selection field */}
        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Platform Service Provider
          </Label>
          <Select
            name="service"
            required
            disabled={isEditMode} // Usually bad practice to switch service references during updates
            value={formData.service}
            onChange={handleChange}
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition disabled:bg-gray-50"
          >
            <option value="">-- Choose target catalog asset --</option>
            {availableServices.map((srv) => (
              <option key={srv.id} value={srv.id}>
                {srv.name}
              </option>
            ))}
          </Select>
        </Field>

        {/* 2. Group Plan name and Financial cost side-by-side */}
        <div className="grid grid-cols-2 gap-4">
          <Field className="space-y-1">
            <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Plan Name Tier
            </Label>
            <Input
              type="text"
              name="plan_name"
              value={formData.plan_name}
              onChange={handleChange}
              placeholder="e.g. Premium, Family, Basic"
              className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
            />
          </Field>

          <Field className="space-y-1">
            <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Cost Allocation
            </Label>
            <Input
              type="number"
              step="0.01"
              name="cost"
              required
              value={formData.cost}
              onChange={handleChange}
              placeholder="0.00"
              className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
            />
          </Field>
        </div>

        {/* 3. Group Cycles and Date parameters side-by-side */}
        <div className="grid grid-cols-2 gap-4">
          <Field className="space-y-1">
            <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Billing Cycle
            </Label>
            <Select
              name="billing_cycle"
              value={formData.billing_cycle}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
            >
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </Select>
          </Field>

          <Field className="space-y-1">
            <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Next Billing Collection Date
            </Label>
            <Input
              type="date"
              name="next_billing_date"
              required
              value={formData.next_billing_date}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
            />
          </Field>
        </div>

        {/* 4. Active Status selection field flag */}
        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Operational Status Tracker
          </Label>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
          >
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="CANCELED">Canceled</option>
            <option value="EXPIRED">Expired</option>
          </Select>
        </Field>

        {/* 4. Active Status selection field flag */}
        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Category
          </Label>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
          >
            <option value="">-- Select a category --</option>
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="PRODUCTIVITY">Productivity</option>
            <option value="UTILITIES">Utilities</option>
            <option value="EDUCATION">Education</option>
            <option value="SPORTS">Sports</option>
            <option value="OTHER">Other</option>
          </Select>
        </Field>

        {/* 5. Custom Memo Textarea fields */}
        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Annotation Notes
          </Label>
          <Textarea
            name="notes"
            rows="2"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add specific annotations concerning shared family accounts, payment cards, or cancel conditions..."
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition resize-none"
          />
        </Field>

        {/* Buttons Action Bar Footer strip */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50 mt-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={subLoading}
              className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={subLoading}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-xs transition-colors disabled:opacity-50"
          >
            {subLoading ? 'Processing...' : isEditMode ? 'Save Changes' : 'Record Subscription'}
          </button>
        </div>
      </form>
    </div>
  )
}