import { Fragment, useEffect, useState } from "react";
import { useAppStore } from "../store";
import { useNavigate } from "react-router";
import SubscriptionForm from "../components/SubscriptionForm";
import ConfirmModal from "../components/ConfirmModal";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const Subscriptions = () => {
  const user = useAppStore((state) => state.user);
  const subscriptions = useAppStore((state) => state.availableSubscriptions);
  const services = useAppStore((state) => state.availableServices);
  const [isSubscriptionFormOpen, setIsSubscriptionFormOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const router = useNavigate();

  console.log('Services ', services)

  const fetchAvailableSubscriptions = useAppStore(
    (state) => state.fetchAvailableSubscriptions,
  );
  const fetchAvailableServices = useAppStore(
    (state) => state.fetchAvailableServices,
  );
  const deleteSubscription = useAppStore((state) => state.deleteSubscription);

  useEffect(() => {
    fetchAvailableSubscriptions();
    fetchAvailableServices();
    document.title = "Subscription Manager - Subscriptions";
  }, [fetchAvailableSubscriptions, fetchAvailableServices]);

  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleEdit = (subscription) => {
    setSelectedSubscription(subscription);
    setIsSubscriptionFormOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedSubscription(null);
    setIsSubscriptionFormOpen(false);
  };

  const openSubscriptionForm = () => {
    setSelectedSubscription(null);
    setIsSubscriptionFormOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmMessage("");
    setIsConfirmModalOpen(false);
  };

  const handleDelete = async (id) => {
    setIsConfirmModalOpen(true);
    setConfirmMessage(
      `Are you sure you want to permanently remove subscription #${id}? This action cannot be undone.`,
    );
    const subscriptionToDelete = subscriptions.find((s) => s.id === id);
    if (subscriptionToDelete) {
      setSelectedSubscription(subscriptionToDelete);
    } else {
      console.warn(
        `Attempted to delete subscription with ID ${id}, but it was not found in the current state.`,
      );
    }
  };

  const handleView = (id) => {
    // redirect to subscription detail page
    router(`/subscriptions/${id}`);
  };

  const handleDeleteWithConfirm = async () => {
    try {
      await deleteSubscription(selectedSubscription.id);
      closeConfirmModal();
    } catch (err) {
      console.error(`Failed to delete subscription with ID ${selectedSubscription.id}:`, err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Dynamic Greeting Header */}
      <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Welcome back,{" "}
            {user?.userData?.username || "Subscriber"}!
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View, edit, or configure global platforms tracked across your
            system.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={openSubscriptionForm}
            className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors"
          >
            + Add New Subscription
          </button>
        </div>
      </div>

      {/* Loading Indicator Fallback */}
      {subscriptions.length === 0 ? (
        /* Empty Catalog Fallback Layout */
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl">
          <span className="text-3xl">📦</span>
          <p className="mt-2 text-sm font-medium text-gray-900">
            No platforms cataloged yet
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Get started by creating your very first tracked utility provider.
          </p>
        </div>
      ) : (
        /* Reactive Service Grid Deck */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-gray-300/70"
            >
              <div className="flex items-start gap-4">
                {/* Fallback Image Block in case logo URL points to wiki or lacks image format extensions */}

                <div className="space-y-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {subscription.service_name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {subscription.plan_name ||
                      "No platform description has been logged yet."}
                  </p>
                </div>
              </div>

              {/* Action Button Row */}
              <div className="mt-6 flex items-center justify-end gap-2 border-t border-gray-50 pt-3">
                <button
                  type="button"
                  onClick={() => handleEdit(subscription)}
                  className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(subscription.id)}
                  className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50/50 hover:bg-red-50 border border-red-100 transition-colors"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => handleView(subscription.id)}
                  className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold text-green-600 bg-green-50/50 hover:bg-green-50 border border-green-100 transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Transition show={isSubscriptionFormOpen} as={Fragment}>
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
              <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-2 shadow-2xl transition-all border border-gray-100">
                {/* 3. Inject our generic subscription Form inside the modal viewport */}
                <SubscriptionForm
                  onCancel={handleCloseModal}
                  onSuccess={handleCloseModal}
                  services={services}
                  initialData={selectedSubscription}
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <Transition show={isConfirmModalOpen} as={Fragment}>
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
              <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-2 shadow-2xl transition-all border border-gray-100">
                {/* 3. Inject our generic subscription Form inside the modal viewport */}
                <ConfirmModal
                  title="Confirm Subscription Deletion"
                  message={confirmMessage}
                  confirmText="Yes, Delete"
                  cancelText="No, Keep It"
                  onConfirm={handleDeleteWithConfirm}
                  onCancel={closeConfirmModal}
                  isDestructive
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Subscriptions;
