import { Fragment, useEffect, useState } from "react";
import { useAppStore } from "../store";
import BudgetForm from "../components/BudgetForm";
import ConfirmModal from "../components/ConfirmModal";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const Budgets = () => {
  const budgets = useAppStore((state) => state.availableBudgets) || [];
  const budgetLoading = useAppStore((state) => state.budgetLoading);
  
  // Pluck relevant central budget CRUD store endpoints
  const fetchBudgets = useAppStore((state) => state.fetchAvailableBudgets);
  const deleteBudget = useAppStore((state) => state.deleteBudget);

  // Unified modal config to handle structural states (open/close and editing payloads)
  const [modalConfig, setModalConfig] = useState({ isOpen: false, activeData: null });
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (fetchBudgets) fetchBudgets();
    document.title = "Subscription Manager - Budgets";
  }, [fetchBudgets]);

  const handleOpenCreateModal = () => {
    setModalConfig({ isOpen: true, activeData: null });
  };

  const handleOpenEditModal = (budget) => {
    setModalConfig({ isOpen: true, activeData: budget });
  };

  const handleCloseModal = () => {
    setModalConfig({ isOpen: false, activeData: null });
  };

  const handleDelete = async (id) => {
    setIsConfirmModalOpen(true);
    setConfirmMessage(`Are you sure you want to revoke budget #${id}? This action cannot be undone.`);
    const budgetToDelete = budgets.find((b) => b.id === id);
    if (budgetToDelete) {
      setModalConfig((prev) => ({ ...prev, activeData: budgetToDelete }));
    }
  };

  const onConfirmDelete = async () => {
    console.log("Confirmed deletion for budget ID:", modalConfig.activeData);
    if (modalConfig.activeData) {
      await deleteBudget(modalConfig.activeData.id);
      setIsConfirmModalOpen(false);
    }
  }

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  // Date formatting utility
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Dynamic Greeting Header */}
      <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Budget Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Set and oversee recurring ceiling thresholds to control automated platform overhead.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            + Create New Budget
          </button>
        </div>
      </div>

      {/* Loading Indicator Fallback */}
      {budgetLoading && budgets.length === 0 ? (
        <div className="flex justify-center py-12 text-sm text-gray-400 animate-pulse">
          Syncing allocations ledger...
        </div>
      ) : budgets.length === 0 ? (
        /* Empty Catalog Fallback Layout */
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
          <span className="text-3xl">📊</span>
          <p className="mt-2 text-sm font-medium text-gray-900">
            No thresholds logged yet
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Establish your target caps to trigger overflow warning systems.
          </p>
        </div>
      ) : (
        /* Reactive Data Budget Table Layout */
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs">
          <h2 className="text-lg font-semibold text-gray-900 px-6 py-4">
            Budget Control Panel
          </h2>
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th scope="col" className="px-6 py-4">Description</th>
                <th scope="col" className="px-6 py-4">Interval Cycle</th>
                <th scope="col" className="px-6 py-4">Created Date</th>
                <th scope="col" className="px-6 py-4 text-right">Target Amount</th>
                <th scope="col" className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
              {budgets.map((budget) => (
                <tr
                  key={budget.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Description cell */}
                  <td className="px-6 py-4 max-w-xs md:max-w-md">
                    <div className="font-semibold text-gray-900 truncate">
                      {budget.description || "No annotation provided"}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      ID Ref: #{budget.id}
                    </div>
                  </td>

                  {/* Interval cycle badge */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                      {budget.duration}
                    </span>
                  </td>

                  {/* Formatted Creation Date */}
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                    {formatDate(budget.created_at)}
                  </td>

                  {/* Monospaced numeric money formatting */}
                  <td className="whitespace-nowrap px-6 py-4 text-right font-bold text-gray-900 font-mono">
                    $
                    {parseFloat(budget.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  {/* Layout Controls row buttons */}
                  <td className="whitespace-nowrap px-6 py-4 text-center text-xs font-semibold">
                    <div className="flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(budget)}
                        className="text-indigo-600 hover:text-indigo-900 hover:underline transition-colors cursor-pointer"
                      >
                        Modify
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(budget.id)}
                        className="text-red-600 hover:text-red-900 hover:underline transition-colors cursor-pointer"
                      >
                        Revoke
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Headless UI Dialog Modal Configuration */}
      <Transition show={modalConfig.isOpen} as={Fragment}>
        <Dialog onClose={handleCloseModal} className="relative z-50">
          {/* Backdrop Blur Overlay */}
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/40 backdrop-blur-xs transition-opacity" />
          </TransitionChild>

          {/* Scrolling Modal Viewport Port Container */}
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20 flex items-center justify-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-2 shadow-2xl transition-all border border-gray-100">
                {/* Inject converted BudgetForm component loader */}
                <BudgetForm
                  initialData={modalConfig.activeData}
                  onCancel={handleCloseModal}
                  onSuccess={handleCloseModal}
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* Headless UI Dialog Modal Configuration */}
      <Transition show={isConfirmModalOpen} as={Fragment}>
        <Dialog onClose={closeConfirmModal} className="relative z-50">
          {/* Backdrop Blur Overlay */}
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/40 backdrop-blur-xs transition-opacity" />
          </TransitionChild>

          {/* Scrolling Modal Viewport Port Container */}
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20 flex items-center justify-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-2 shadow-2xl transition-all border border-gray-100">
                {/* Inject converted BudgetForm component loader */}
                <ConfirmModal
                  title="Confirm Budget Revocation"
                  message={confirmMessage}
                  confirmText="Yes, Revoke"
                  cancelText="No, Keep It"
                  onConfirm={onConfirmDelete}
                  onCancel={closeConfirmModal}
                  isDestructive={true}
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Budgets;