// controllers/subjectController.js
import asyncHandler from "../middleware/asyncHandler.js";
import Subject from "../models/subject.js";

// @desc    Create a new subject
// @route   POST /api/subjects
// @access  Private
const createSubject = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Subject name is required");
  }

  const subject = new Subject({
    name,
    createdBy: req.user._id,
    topics: [],
  });

  const createdSubject = await subject.save();
  res.status(201).json(createdSubject);
});

// @desc    Get all subjects for logged-in user
// @route   GET /api/subjects
// @access  Private
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({ createdBy: req.user._id });
  res.json(subjects);
});

// @desc    Get subject by ID
// @route   GET /api/subjects/:id
// @access  Private
const getSubjectById = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id).populate(
    "createdBy",
    "name email"
  );

  if (subject) {
    res.json(subject);
  } else {
    res.status(404);
    throw new Error("Subject not found");
  }
});

// @desc    Update subject name
// @route   PUT /api/subjects/:id
// @access  Private
const updateSubject = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }

  subject.name = name || subject.name;
  const updatedSubject = await subject.save();

  res.json(updatedSubject);
});

// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Private
const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }

  await subject.deleteOne();
  res.status(204).end();
});

// @desc    Add a topic to a subject
// @route   POST /api/subjects/:id/topics
// @access  Private
const addTopicToSubject = asyncHandler(async (req, res) => {
  const { topicName, topicDescription } = req.body;
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }

  if (!topicName || !topicDescription) {
    res.status(400);
    throw new Error("Topic name and description are required");
  }

  const newTopic = {
    topicName,
    topicDescription,
    notes: [],
  };

  subject.topics.push(newTopic);
  await subject.save();

  res.status(201).json(subject);
});

// @desc    Delete a topic from a subject
// @route   DELETE /api/subjects/:id/topics/:topicId
// @access  Private
const deleteTopicFromSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }

  const topic = subject.topics.id(req.params.topicId);
  if (!topic) {
    res.status(404);
    throw new Error("Topic not found");
  }

  await topic.deleteOne(); // <-- Fixed: use deleteOne() instead of remove()
  await subject.save();

  res.status(204).end();
});

// @desc    Update a topic from a subject
// @route   PUT /api/subjects/:id/topics/:topicId
// @access  Private
const updateTopicFromSubject = asyncHandler(async (req, res) => {
  const { topicName, topicDescription } = req.body;
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }

  const topic = subject.topics.id(req.params.topicId);
  if (!topic) {
    res.status(404);
    throw new Error("Topic not found");
  }

  topic.topicName = topicName || topic.topicName;
  topic.topicDescription = topicDescription || topic.topicDescription;
  await subject.save();

  res.json(subject);
});

// @desc    Add a markdown note to a topic
// @route   POST /api/subjects/:id/topics/:topicId/notes
// @access  Private
const addNoteToTopic = asyncHandler(async (req, res) => {
  const { heading, content } = req.body;
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }

  const topic = subject.topics.id(req.params.topicId);
  if (!topic) {
    res.status(404);
    throw new Error("Topic not found");
  }

  if (!heading || !content) {
    res.status(400);
    throw new Error("Heading and content are required");
  }

  topic.notes.push({ heading, content });
  await subject.save();

  res.status(201).json(subject);
});

// @desc    Delete a markdown note from a topic
// @route   DELETE /api/subjects/:id/topics/:topicId/notes/:noteId
// @access  Private
const deleteNoteFromTopic = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }

  const topic = subject.topics.id(req.params.topicId);
  if (!topic) {
    res.status(404);
    throw new Error("Topic not found");
  }

  const note = topic.notes.id(req.params.noteId);
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  await note.deleteOne();
  await subject.save();

  res.status(204).end();
});

// @desc    Update a markdown note from a topic
// @route   PUT /api/subjects/:id/topics/:topicId/notes/:noteId
// @access  Private
const updateNoteFromTopic = asyncHandler(async (req, res) => {
  const { heading, content } = req.body;
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }

  const topic = subject.topics.id(req.params.topicId);
  if (!topic) {
    res.status(404);
    throw new Error("Topic not found");
  }

  const note = topic.notes.id(req.params.noteId);
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  note.heading = heading || note.heading;
  note.content = content || note.content;
  await subject.save();

  res.json(subject);
});

export {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  addTopicToSubject,
  addNoteToTopic,
  deleteNoteFromTopic,
  updateNoteFromTopic,
  deleteTopicFromSubject,
  updateTopicFromSubject,
};