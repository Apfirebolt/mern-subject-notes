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
  EyeIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { useAppStore } from "../store";
import TopicForm from "../components/TopicForm";
import NoteForm from "../components/NoteForm";

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

  const [isReaderModalOpen, setIsReaderModalOpen] = useState(false);
  const [activeNoteForReading, setActiveNoteForReading] = useState(null);

  // Note Modal States
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [activeTopicForNote, setActiveTopicForNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  // Accordion state to toggle open/closed topics
  const [expandedTopics, setExpandedTopics] = useState({});

  // View mode state for notes: keyed by noteId -> boolean (true = preview mode)
  const [previewModes, setPreviewModes] = useState({});

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

  const toggleNotePreview = (noteId) => {
    setPreviewModes((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
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

  const handleOpenAddNote = (topic) => {
    setActiveTopicForNote(topic);
    setSelectedNote(null);
    setIsNoteModalOpen(true);
  };

  const handleOpenEditNote = (topic, note) => {
    setActiveTopicForNote(topic);
    setSelectedNote(note);
    setIsNoteModalOpen(true);
  };

  const handleOpenReader = (note) => {
    setActiveNoteForReading(note);
    setIsReaderModalOpen(true);
  };

  const handleDeleteSubject = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${currentSubject?.name}"?`,
      )
    ) {
      try {
        await deleteSubject(subjectId);
        navigate("/dashboard");
      } catch (err) {
        console.error("Failed to delete subject:", err);
      }
    }
  };

  const handleDeleteTopic = async (topicId, topic) => {
    if (
      window.confirm(`Delete topic "${topic.topicName}" and all its notes?`)
    ) {
      try {
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

  // Basic lightweight Markdown renderer helper function
  const renderMarkdown = (content) => {
    if (!content) return null;

    // Split into lines for basic parsing of headers, lists, code blocks, and paragraphs
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-lg font-bold text-slate-900 mt-2 mb-1">
            {line.replace("# ", "")}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="text-base font-bold text-slate-900 mt-2 mb-1"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="text-sm font-bold text-slate-900 mt-1.5 mb-1"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      // Bullet lists
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-slate-700">
            {line.replace(/^[-*]\s/, "")}
          </li>
        );
      }
      // Empty lines
      if (line.trim() === "") {
        return <div key={idx} className="h-1.5" />;
      }
      // Standard Paragraph
      return (
        <p key={idx} className="text-xs text-slate-700 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  if (loading && !currentSubject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/75 py-8 px-4 sm:px-6 lg:px-8 text-slate-800 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back navigation & Top Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-primary transition cursor-pointer"
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
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-brand-primary">
                Curriculum Hub
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
                {currentSubject.name}
              </h1>
              <p className="text-xs text-slate-400">
                Created{" "}
                {new Date(currentSubject.createdAt).toLocaleDateString()} •{" "}
                {currentSubject.topics?.length || 0} Topics
              </p>
            </div>

            <button
              onClick={handleOpenAddTopic}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-primary shadow-sm hover:bg-brand-secondary active:scale-[0.98] transition cursor-pointer shrink-0"
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
          <h2 className="text-lg font-bold text-slate-900 font-sans">
            Syllabus Topics &amp; Notes
          </h2>

          {!currentSubject?.topics || currentSubject.topics.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
              <ListBulletIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">
                No topics added yet
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto mb-4">
                Organize this subject into modules or topics to begin logging
                study notes.
              </p>
              <button
                onClick={handleOpenAddTopic}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-brand-primary hover:bg-brand-secondary transition cursor-pointer"
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
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-brand-primary shrink-0">
                          {notesCount} {notesCount === 1 ? "note" : "notes"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {topic.topicDescription}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenAddNote(topic)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-brand-primary bg-purple-50 hover:bg-purple-100 rounded-lg transition cursor-pointer"
                        title="Add Note"
                      >
                        <PlusIcon className="w-3.5 h-3.5" />
                        <span>Add Note</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditTopic(topic)}
                        className="p-1.5 text-slate-400 hover:text-brand-primary hover:bg-purple-50 rounded-lg transition"
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
                          No notes added to this topic yet. Click "Add Note"
                          above.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {topic.notes.map((note) => {
                            const noteId = note._id || note.id;
                            const isPreview = previewModes[noteId] || false;

                            return (
                              <div
                                key={noteId}
                                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/75 flex flex-col justify-between shadow-xs transition"
                              >
                                <div>
                                  <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-slate-200/60">
                                    <h4 className="text-sm font-bold text-slate-900 font-sans truncate">
                                      {note.heading}
                                    </h4>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      {/* Markdown Toggle Button */}
                                      <button
                                        onClick={() =>
                                          toggleNotePreview(noteId)
                                        }
                                        className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition cursor-pointer ${
                                          isPreview
                                            ? "bg-brand-primary text-white"
                                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                                        }`}
                                        title={
                                          isPreview
                                            ? "Switch to Raw Code"
                                            : "Switch to Preview"
                                        }
                                      >
                                        {isPreview ? (
                                          <>
                                            <CodeBracketIcon className="w-3.5 h-3.5" />
                                            <span>Raw</span>
                                          </>
                                        ) : (
                                          <>
                                            <EyeIcon className="w-3.5 h-3.5" />
                                            <span>Preview</span>
                                          </>
                                        )}
                                      </button>

                                      <button
                                        onClick={() =>
                                          handleOpenEditNote(topic, note)
                                        }
                                        className="p-1 text-slate-400 hover:text-brand-primary transition"
                                        title="Edit Note"
                                      >
                                        <PencilSquareIcon className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteNote(
                                            topicId,
                                            noteId,
                                            note.heading,
                                          )
                                        }
                                        className="p-1 text-slate-400 hover:text-red-600 transition"
                                        title="Delete Note"
                                      >
                                        <TrashIcon className="w-4 h-4" />
                                      </button>

                                      <button
                                        onClick={() => handleOpenReader(note)}
                                        className="p-1 text-slate-400 hover:text-brand-primary transition"
                                        title="View Full Markdown"
                                      >
                                        <EyeIcon className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Content Area: Raw vs Preview Mode */}
                                  <div className="mt-2 min-h-24 max-h-48 overflow-y-auto">
                                    {isPreview ? (
                                      <div className="prose prose-sm max-w-none space-y-1 bg-white p-3 rounded-lg border border-slate-100">
                                        {renderMarkdown(note.content)}
                                      </div>
                                    ) : (
                                      <pre className="text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                                        {note.content}
                                      </pre>
                                    )}
                                  </div>
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
        <Dialog
          onClose={() => setIsTopicModalOpen(false)}
          className="relative z-50"
        >
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

      {/* Note Create/Edit Modal */}
      <Transition show={isNoteModalOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsNoteModalOpen(false)}
          className="relative z-50"
        >
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
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100">
                {activeTopicForNote && (
                  <NoteForm
                    subjectId={subjectId}
                    topicId={activeTopicForNote._id || activeTopicForNote.id}
                    initialData={selectedNote}
                    onCancel={() => setIsNoteModalOpen(false)}
                    onSuccess={() => {
                      setIsNoteModalOpen(false);
                      fetchSubjectById(subjectId);
                    }}
                  />
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* Note Markdown Reader Modal */}
      <Transition show={isReaderModalOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsReaderModalOpen(false)}
          className="relative z-50"
        >
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
              <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-4">
                {activeNoteForReading && (
                  <>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-bold text-slate-900 font-sans">
                        {activeNoteForReading.heading}
                      </h3>
                      <button
                        onClick={() => setIsReaderModalOpen(false)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                      >
                        Close
                      </button>
                    </div>

                    {/* Rendered Markdown Preview Area */}
                    <div className="min-h-[50vh] max-h-[70vh] overflow-y-auto space-y-2 pr-2">
                      {renderMarkdown(activeNoteForReading.content)}
                    </div>
                  </>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
