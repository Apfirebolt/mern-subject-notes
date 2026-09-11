import { useState, useEffect, Fragment } from "react";
import { useAppStore } from "../store";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import ServiceForm from "../components/ServiceForm";

const Dashboard = () => {
  const user = useAppStore((state) => state.user);
  const subscriptions = useAppStore((state) => state.availableSubscriptions);
  const budget = useAppStore((state) => state.availableBudgets);
  const [isSubscriptionFormOpen, setIsSubscriptionFormOpen] = useState(false);


  const handleCloseModal = () => {
    setIsSubscriptionFormOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    useAppStore.getState().fetchAvailableServices();
    useAppStore.getState().fetchAvailableBudgets();
    useAppStore.getState().fetchAvailableSubscriptions();
    document.title = "Subscription Manager - Dashboard";
  }, []);

  console.log('User data', user);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-brand-primary">
        Welcome back, {user ? user?.userData?.username : "Subscriber"}!
      </h1>

      {budget.length === 0 ? (
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
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs">
          <h2 className="text-lg font-semibold text-gray-900 px-6 py-4">
            Budget Control Panel
          </h2>
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Description
                </th>
                <th scope="col" className="px-6 py-4">
                  Interval Cycle
                </th>
                <th scope="col" className="px-6 py-4">
                  Created Date
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Target Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
              {budget.map((budget) => (
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
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subscriptions.length === 0 ? (
        /* ─── EMPTY STATE LAYOUT ─── */
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
          <span className="text-3xl">💸</span>
          <p className="mt-2 text-sm font-medium text-gray-900">
            No subscriptions tracked yet
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Add your recurring plans to monitor your active billing cycles and
            expenses.
          </p>
        </div>
      ) : (
        /* ─── DATA TABLE LAYOUT ─── */
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs">
          <h2 className="text-lg font-semibold text-gray-900 px-6 py-4">
            Active Recurring Services
          </h2>
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Service & Plan
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Billing Cycle
                </th>
                <th scope="col" className="px-6 py-4">
                  Next Renewal
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Cost
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
              {subscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Service & Plan details + Notes as subtitle */}
                  <td className="px-6 py-4 max-w-xs md:max-w-md">
                    <div className="font-semibold text-gray-900 truncate">
                      {sub.service_name || "Unknown Platform"}
                    </div>
                    <div className="text-xs text-indigo-600 font-medium mt-0.5">
                      {sub.plan_name || "Standard Plan"}
                    </div>
                    {sub.notes && (
                      <div className="text-xs text-gray-400 mt-1 italic truncate">
                        "{sub.notes}"
                      </div>
                    )}
                  </td>

                  {/* Status dynamic badge */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        sub.status?.toUpperCase() === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>

                  {/* Billing cycle configuration layout */}
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                      {sub.billing_cycle}
                    </span>
                  </td>

                  {/* Next explicit billing collection point date */}
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                    {/* Uses your existing formatDate helper directly */}
                    {formatDate(sub.next_billing_date)}
                  </td>

                  {/* Price text formatted nicely */}
                  <td className="whitespace-nowrap px-6 py-4 text-right font-bold text-gray-900 font-mono">
                    $
                    {parseFloat(sub.cost).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* The rest of the dashboard content */}
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

export default Dashboard;
