import { Fragment } from "react";
import { useAppStore } from "../store";
import ServiceForm from "../components/ServiceForm";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const Services = () => {
  const user = useAppStore((state) => state.user);
  const services = useAppStore((state) => state.availableServices);
  const serviceLoading = useAppStore((state) => state.serviceLoading);
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);

  const fetchAvailableServices = useAppStore(
    (state) => state.fetchAvailableServices,
  );

  useEffect(() => {
    fetchAvailableServices();
    document.title = "Subscription Manager - Services";
  }, [fetchAvailableServices]);

  const handleCloseModal = () => {
    setIsServiceFormOpen(false);
  };

  const openServiceForm = () => {
    setIsServiceFormOpen(true);
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
            onClick={openServiceForm}
            className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors"
          >
            + Add New Service
          </button>
        </div>
      </div>

      {/* Loading Indicator Fallback */}
      {serviceLoading && services.length === 0 ? (
        <div className="flex justify-center py-12 text-sm text-gray-400 animate-pulse">
          Syncing service inventory...
        </div>
      ) : services.length === 0 ? (
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
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-gray-300/70"
            >
              <div className="flex items-start gap-4">
                <div className="space-y-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {service.description ||
                      "No platform description has been logged yet."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Transition show={isServiceFormOpen} as={Fragment}>
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
                {/* 3. Inject our generic Service Form inside the modal viewport */}
                <ServiceForm
                  onCancel={handleCloseModal}
                  onSuccess={handleCloseModal}
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Services;
