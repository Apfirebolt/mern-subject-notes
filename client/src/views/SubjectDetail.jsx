// src/views/SubjectDetail.jsx
import { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { useAppStore } from "../store";
import TopicForm from "../components/TopicForm";

export default function SubjectDetail() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const {
    currentSubject,
    loading,
    error,
    fetchSubjectById,
    deleteSubject,
    deleteTopic,
    deleteNote,
  } = useAppStore();

  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Accordion state to toggle open/closed topics
  const [expandedTopics, setExpandedTopics] = useState({});

  useEffect(() => {
    if (subjectId) {
      fetchSubjectById(subjectId);
    }
  }, [subjectId, fetchSubjectById]);

  const toggleTopic = (topicId) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const handleOpenAddTopic = () => {
    setSelectedTopic(null);
    setIsTopicModalOpen(true);
  };

  const handleOpenEditTopic = (topic) => {
    setSelectedTopic(topic);
    setIsTopicModalOpen(true);
  };

  const handleDeleteSubject = async () => {
    if (window.confirm(`Are you sure you want to delete "${currentSubject?.name}"?`)) {
      try {
        await deleteSubject(subjectId);
        navigate("/dashboard");
      } catch (err) {
        console.error("Failed to delete subject:", err);
      }
    }
  };

  const handleDeleteTopic = async (topicId, topic) => {
    if (window.confirm(`Delete topic "${topic.topicName}" and all its notes?`)) {
      try {
        console.log('Deleting topic for subject ID:', subjectId, 'with topic ID:', topic._id);
        await deleteTopic(subjectId, topicId);
      } catch (err) {
        console.error("Failed to delete topic:", err);
      }
    }
  };

  const handleDeleteNote = async (topicId, noteId, noteHeading) => {
    if (window.confirm(`Delete note "${noteHeading}"?`)) {
      try {
        await deleteNote(subjectId, topicId, noteId);
      } catch (err) {
        console.error("Failed to delete note:", err);
      }
    }
  };

  if (loading && !currentSubject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/75 py-8 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back navigation & Top Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition cursor-pointer"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <button
            onClick={handleDeleteSubject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
          >
            <TrashIcon className="w-4 h-4" />
            <span>Delete Subject</span>
          </button>
        </div>

        {/* Subject Header Card */}
        {currentSubject && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                  Curriculum Hub
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-montserrat">
                {currentSubject.name}
              </h1>
              <p className="text-xs text-slate-400">
                Created {new Date(currentSubject.createdAt).toLocaleDateString()} • {currentSubject.topics?.length || 0} Topics
              </p>
            </div>

            <button
              onClick={handleOpenAddTopic}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 active:scale-[0.98] transition cursor-pointer shrink-0"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Topic</span>
            </button>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-800">
            {error}
          </div>
        )}

        {/* Topics List Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 font-montserrat">
            Syllabus Topics &amp; Notes
          </h2>

          {!currentSubject?.topics || currentSubject.topics.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
              <ListBulletIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No topics added yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto mb-4">
                Organize this subject into modules or topics to begin logging study notes.
              </p>
              <button
                onClick={handleOpenAddTopic}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition cursor-pointer"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Create First Topic</span>
              </button>
            </div>
          ) : (
            currentSubject.topics.map((topic) => {
              const topicId = topic._id || topic.id;
              const isExpanded = expandedTopics[topicId];
              const notesCount = topic.notes?.length || 0;

              return (
                <div
                  key={topicId}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                >
                  {/* Topic Accordion Header */}
                  <div className="p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 bg-slate-50/50 border-b border-slate-100">
                    <div
                      onClick={() => toggleTopic(topicId)}
                      className="cursor-pointer flex-1 min-w-0"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-slate-900 truncate">
                          {topic.topicName}
                        </h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 text-indigo-700 shrink-0">
                          {notesCount} {notesCount === 1 ? "note" : "notes"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {topic.topicDescription}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenEditTopic(topic)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        title="Edit Topic"
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteTopic(topicId, topic)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Topic"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => toggleTopic(topicId)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                      >
                        {isExpanded ? (
                          <ChevronUpIcon className="w-4 h-4" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Notes Accordion Body */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-4 bg-white">
                      {notesCount === 0 ? (
                        <div className="text-center py-6 text-xs text-slate-400 italic">
                          No notes added to this topic yet. Click "Add Note" above.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {topic.notes.map((note) => {
                            const noteId = note._id || note.id;
                            return (
                              <div
                                key={noteId}
                                className="p-4 rounded-xl border border-slate-100 bg-slate-50/75 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <h4 className="text-sm font-bold text-slate-900 font-montserrat">
                                      {note.heading}
                                    </h4>
                                    <div className="flex items-center gap-1 shrink-0">
                                      <button
                                        onClick={() => handleOpenEditNote(topic, note)}
                                        className="p-1 text-slate-400 hover:text-indigo-600 transition"
                                        title="Edit Note"
                                      >
                                        <PencilSquareIcon className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteNote(topicId, noteId, note.heading)}
                                        className="p-1 text-slate-400 hover:text-red-600 transition"
                                        title="Delete Note"
                                      >
                                        <TrashIcon className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                  <p className="text-xs text-slate-600 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                                    {note.content}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Topic Create/Edit Modal */}
      <Transition show={isTopicModalOpen} as={Fragment}>
        <Dialog onClose={() => setIsTopicModalOpen(false)} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 flex items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100">
                <TopicForm
                  subjectId={subjectId}
                  initialData={selectedTopic}
                  onCancel={() => setIsTopicModalOpen(false)}
                  onSuccess={() => {
                    setIsTopicModalOpen(false);
                    fetchSubjectById(subjectId);
                  }}
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}