import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppStore } from "../store";
import SubscriptionForm from "../components/SubscriptionForm";
import ConfirmModal from "../components/ConfirmModal";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const SubscriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const fetchSubscriptionById = useAppStore(
    (state) => state.fetchSubscriptionById,
  );
  const deleteSubscription = useAppStore((state) => state.deleteSubscription);
  const services = useAppStore((state) => state.availableServices);
  const subscription = useAppStore((state) => state.subscriptionDetails);
  const fetchAvailableServices = useAppStore(
    (state) => state.fetchAvailableServices,
  );

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchSubscriptionById(id);
      await fetchAvailableServices();
      setLoading(false);
    };
    loadData();
    document.title = "Subscription Manager - Subscription Detail";
  }, [id, fetchSubscriptionById, fetchAvailableServices]);

  const handleEdit = () => {
    setIsEditFormOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditFormOpen(false);
  };

  const handleDeleteClick = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDeleteWithConfirm = async () => {
    try {
      await deleteSubscription(id);
      navigate("/subscriptions");
    } catch (err) {
      console.error(`Failed to delete subscription:`, err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!subscription) return <div>Subscription not found</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-gray-100 pb-5">
        <button
          onClick={() => navigate("/subscriptions")}
          className="text-indigo-600 hover:text-indigo-700"
        >
          ← Back
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="inline-flex items-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {subscription.service_name}
        </h1>
        <p className="mt-2 text-gray-600">{subscription.plan_name}</p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Price</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              ${subscription.cost}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Renewal Date</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {new Date(subscription.next_billing_date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {subscription.status}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Category</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {subscription.category}
            </p>
          </div>
        </div>
      </div>

      <Transition show={isEditFormOpen} as={Fragment}>
        <Dialog onClose={handleCloseEditModal} className="relative z-50">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/40 backdrop-blur-xs" />
          </TransitionChild>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 flex items-center justify-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-xl rounded-2xl bg-white p-2 shadow-2xl border border-gray-100">
                <SubscriptionForm
                  onCancel={handleCloseEditModal}
                  onSuccess={handleCloseEditModal}
                  services={services}
                  initialData={subscription}
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <Transition show={isConfirmModalOpen} as={Fragment}>
        <Dialog onClose={closeConfirmModal} className="relative z-50">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/40 backdrop-blur-xs" />
          </TransitionChild>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 flex items-center justify-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-xl rounded-2xl bg-white p-2 shadow-2xl border border-gray-100">
                <ConfirmModal
                  title="Confirm Subscription Deletion"
                  message={`Are you sure you want to permanently delete ${subscription.service_name}?`}
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

export default SubscriptionDetail;
