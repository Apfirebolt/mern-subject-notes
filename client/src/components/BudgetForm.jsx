// src/components/BudgetForm.jsx
import { useState } from "react";
import { Field, Label, Input, Textarea, Select } from "@headlessui/react";
import { useAppStore } from "../store";

export default function BudgetForm({
  initialData = null,
  onCancel,
  onSuccess,
}) {
  const isEditMode = !!initialData;

  // Pluck budget action states from your main unified store mesh
  const { addBudget, updateBudget, budgetLoading, budgetError } = useAppStore();

  // Initialize form state properties cleanly against your Django schema attributes
  const [formData, setFormData] = useState({
    amount: initialData?.amount || "",
    is_active: initialData?.is_active || false,
    duration: initialData?.duration || "MONTHLY",
    description: initialData?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enforce float type conversions to make Django DecimalField validation happy
    const payload = {
      ...formData,
      amount: parseFloat(formData.amount).toFixed(2),
    };

    try {
      if (isEditMode) {
        await updateBudget(initialData.id, payload);
      } else {
        await addBudget(payload);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Budget processing stream halted:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs max-w-lg w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {isEditMode
            ? "Modify Budget Configuration"
            : "Establish New Budget Target"}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {isEditMode
            ? "Adjust threshold limits and duration intervals."
            : "Set cost limits to trigger notification system warning points."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Central Store Error Banner Catch */}
        {budgetError && (
          <div className="rounded-xl bg-red-50 p-4 border border-red-100">
            <p className="text-xs font-semibold text-red-800">
              Error: {budgetError}
            </p>
          </div>
        )}

        {/* Amount Entry Field */}
        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Target Amount Limit
          </Label>
          <Input
            type="number"
            name="amount"
            step="0.01"
            required
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
          />
        </Field>

        {/* Duration Selection Menu Mapping exact TextChoices */}
        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Duration Interval Cycle
          </Label>
          <Select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition"
          >
            <option value="MONTHLY">Monthly</option>
            <option value="QUARTERLY">Quarterly</option>
            <option value="SEMI_ANNUAL">Semi-Annual</option>
            <option value="YEARLY">Yearly</option>
          </Select>
        </Field>

        {/* Annotation/Description Textbox field */}
        <Field className="space-y-1">
          <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Budget Description / Notes
          </Label>
          <Textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. Household Streaming Threshold, Personal Development Caps..."
            className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-xs placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden transition resize-none"
          />
        </Field>

        {/* Is active checkbox field */}
        <Field className="flex items-center gap-3">
          <Input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active || false}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, is_active: e.target.checked }))
            }
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <Label
            htmlFor="is_active"
            className="text-sm font-semibold text-gray-600 cursor-pointer"
          >
            Activate this budget
          </Label>
        </Field>

        {/* Action Controls Footer group */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50 mt-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={budgetLoading}
              className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={budgetLoading}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-xs transition-colors disabled:opacity-50"
          >
            {budgetLoading
              ? "Processing..."
              : isEditMode
                ? "Save Changes"
                : "Confirm Budget"}
          </button>
        </div>
      </form>
    </div>
  );
}
