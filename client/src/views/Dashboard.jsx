import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  BookOpenIcon,
  FolderPlusIcon,
  DocumentTextIcon,
  ListBulletIcon,
  TrashIcon,
  PencilSquareIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useAppStore } from "../store";
import SubjectForm from "../components/SubjectForm";

const Dashboard = () => {
  const { subjects, loading, fetchSubjects, deleteSubject } = useAppStore();
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  useEffect(() => {
    fetchSubjects();
    document.title = "Study Notes - Curriculum Dashboard";
  }, [fetchSubjects]);

  const handleOpenCreateModal = () => {
    setEditingSubject(null);
    setIsSubjectModalOpen(true);
  };

  const handleOpenEditModal = (subject) => {
    setEditingSubject(subject);
    setIsSubjectModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSubjectModalOpen(false);
    setEditingSubject(null);
  };

  const handleDelete = async (subjectId, subjectName) => {
    if (window.confirm(`Are you sure you want to remove "${subjectName}"?`)) {
      try {
        await deleteSubject(subjectId);
      } catch (err) {
        console.error("Failed to delete subject:", err);
      }
    }
  };

  const totalTopics = subjects.reduce(
    (acc, sub) => acc + (sub.topics?.length || 0),
    0
  );

  const totalNotes = subjects.reduce(
    (acc, sub) =>
      acc +
      (sub.topics?.reduce(
        (tAcc, topic) => tAcc + (topic.notes?.length || 0),
        0
      ) || 0),
    0
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              <SparklesIcon className="w-3.5 h-3.5 text-indigo-500" />
              Active Workspace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Subjects &amp; Notes
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your courses, modular unit topics, and revision notes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 shadow-md shadow-indigo-600/20 hover:bg-indigo-500 active:scale-[0.98] transition cursor-pointer self-start sm:self-auto"
        >
          <FolderPlusIcon className="w-4 h-4" />
          <span>New Subject</span>
        </button>
      </div>

      {/* Aggregate Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <BookOpenIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Enrolled Subjects
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {subjects.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
            <ListBulletIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Total Topics
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {totalTopics}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DocumentTextIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Logged Notes
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {totalNotes}
            </p>
          </div>
        </div>
      </div>

      {/* Subjects Grid Content Area */}
      {loading && subjects.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-600">Loading syllabus modules...</p>
        </div>
      ) : subjects.length === 0 ? (
        <div className="text-center py-16 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <BookOpenIcon className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-gray-900">
            No subjects registered yet
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 mb-6">
            Get started by creating your first subject to systematically track topics and attach detailed notes.
          </p>
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-sm cursor-pointer"
          >
            <FolderPlusIcon className="w-4 h-4" />
            <span>Create First Subject</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub) => {
            const subId = sub._id || sub.id;
            const topicCount = sub.topics?.length || 0;
            const noteCount =
              sub.topics?.reduce(
                (acc, top) => acc + (top.notes?.length || 0),
                0
              ) || 0;

            return (
              <div
                key={subId}
                className="group bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md hover:border-indigo-100 transition-all duration-200 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <BookOpenIcon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(sub)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        title="Edit Subject"
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(subId, sub.name)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Subject"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {sub.name}
                  </h3>

                  {sub.createdAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      Added {new Date(sub.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>

                <div className="pt-5 mt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <ListBulletIcon className="w-3.5 h-3.5 text-gray-400" />
                      <strong>{topicCount}</strong> {topicCount === 1 ? "topic" : "topics"}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <DocumentTextIcon className="w-3.5 h-3.5 text-gray-400" />
                      <strong>{noteCount}</strong> {noteCount === 1 ? "note" : "notes"}
                    </span>
                  </div>

                  <Link
                    to={`/subjects/${subId}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    <span>View</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Subject Create / Edit Modal Dialog */}
      <Transition show={isSubjectModalOpen} as={Fragment}>
        <Dialog onClose={handleCloseModal} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95 translate-y-3"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-3"
            >
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all border border-gray-100">
                <SubjectForm
                  initialData={editingSubject}
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