import asyncHandler from 'express-async-handler'
import Subject from '../models/Subject.js'

// @desc    Get a all subjects related to logged in user
// @route   GET /api/subjects
// @access  Private
const getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({ createdBy: req.user._id })

  if (subjects) {
    res.status(200).json({
      results: subjects,
      total: subjects.length
    })
  } else {
    res.status(404)
    throw new Error("Subjects not found")
  }
})

// @desc    User would add a new Subject
// @route   POST /api/subjects
// @access  Private
const addSubject = asyncHandler(async (req, res) => {
  const { name } = req.body

  const subjectExists = await Subject.findOne({ name, createdBy: req.user._id })

  if (subjectExists) {
    res.status(409)
    throw new Error("Subject already created by user")
  }

  const subject = await Subject.create({
    name,
    createdBy: req.user._id
  })

  if (subject) {
    res.status(201).json({
      subject,
      message: 'Subject created'
    })
  } else {
    res.status(401)
    throw new Error("Invalid subject data")
  }
})

// @desc    Update existing subject
// @route   PUT /api/subjects/:id
// @access  Private
const updateSubject = asyncHandler(async (req, res) => {

  const updatedSubject = await Subject.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, {
    new: true
  })

  if (updatedSubject) {
    res.status(200).json({
      subject: updatedSubject,
      message: 'Subject updated'
    })
  } else {
    res.status(400)
    throw new Error("Invalid subject data")
  }
})

// @desc    User deletes a single subject and all nested contents
// @route   DELETE /api/subjects/:id
// @access  Private
const deleteSubject = asyncHandler(async (req, res) => {
  const subjectDeleted = await Subject.findOneAndDelete({ createdBy: req.user._id, _id: req.params.id })

  if (subjectDeleted) {
    res.status(200).json({
      message: 'Subject deleted successfully'
    })
  } else {
    res.status(404)
    throw new Error("Subject not found")
  }
})

// @desc    Get a single subject
// @route   GET /api/subjects/:id
// @access  Private
const getSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById({ _id: req.params.id })

  if (subject) {
    if (toString(subject.createdBy._id) !== toString(req.user._id)) {
      res.status(403)
      throw new Error("Not authorized to access this content")
    }
    res.status(200).json(subject)
  } else {
    res.status(404)
    throw new Error("Subject not found")
  }
})

// @desc    Get a Topic to a subject
// @route   GET /api/subjects/:id/topics/:topicId
// @access  Private
const getTopicToSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findOne({ _id: req.params.id, createdBy: req.user._id }, {
    topics: {
      "$elemMatch": {
        "_id": req.params.topicId
      }
    }
  })
  if (subject) {
    res.status(200).json(subject.topics[0])
  } else {
    res.status(404)
    throw new Error("Subject or Topic not found")
  }
})

// @desc    Add a Topic to a subject
// @route   POST /api/subjects/:id/topics
// @access  Private
const addTopicToSubject = asyncHandler(async (req, res) => {
  const { topicName, topicDescription } = req.body
  const subject = await Subject.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id }, { $push: { topics: {
    topicName,
    topicDescription
  } } }, {
    new: true
  })

  if (subject) {
    res.status(200).json({
      subject,
      message: 'Topic added to subject'
    })
  } else {
    res.status(404)
    throw new Error("Subject not found")
  }
})

// @desc    Update a Topic to a subject
// @route   PUT /api/subjects/:id/topics/:topicId
// @access  Private
const updateTopicToSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findOneAndUpdate({createdBy: req.user._id, _id: req.params.id, "topics._id": req.params.topicId}, {
    "$set": { "topics.$.topicName": req.body.topicName, "topics.$.topicDescription": req.body.topicDescription }
  }, {
    new: true
  })

  if (subject) {
    res.status(200).json({
      subject,
      message: 'Topic updated'
    })
  } else {
    res.status(404)
    throw new Error("Subject not found")
  }
})

// @desc    Delete a Topic to a subject
// @route   DELETE /api/subjects/:id/topics/:topicId
// @access  Private
const deleteTopicFromSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id }, 
    { $pull: { topics: { _id: req.params.topicId } } }, {
    new: true
  })

  if (subject) {
    res.status(200).json({
      subject,
      message: 'Topic delete from subject'
    })
  } else {
    res.status(404)
    throw new Error("Subject not found")
  }
})

// @desc    Add a Note to a Topic
// @route   POST /api/subjects/:id/topics/:topicId
// @access  Private
const addNoteToTopic = asyncHandler(async (req, res) => {
  const subject = await Subject.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id, "topics._id": req.params.topicId }, { "$push": {
    "topics.$.notes": {...req.body}
  } }, {
    new: true
  })
  
  if (subject) {
    res.status(200).json({
      subject,
      message: 'Note added to Topic'
    })
  } else {
    res.status(404)
    throw new Error("Subject or Topic not found")
  }
})

// @desc    Update a Note inside a Topic
// @route   PUT /api/subjects/:id/topics/:topicId/notes/:noteId
// @access  Private
const updateNoteToTopic = asyncHandler(async (req, res) => {
  const subject = await Subject.findOne({ _id: req.params.id, createdBy: req.user._id})

  if (subject) {
    const relatedTopic = subject.topics.find((item) => item._id.toHexString() === req.params.topicId)
    const relatedNote = relatedTopic.notes.find((item) => item._id.toHexString() === req.params.noteId)
    
    relatedNote.content = req.body.content
    relatedNote.heading = req.body.heading

    await subject.save()

    res.status(200).json({
      message: 'Note updated inside topic'
    })
  } else {
    res.status(404)
    throw new Error("Subject or Topic not found")
  }
})

// @desc    Delete a Note inside a Topic
// @route   DELETE /api/subjects/:id/topics/:topicId/notes/:noteId
// @access  Private
const deleteNoteFromTopic = asyncHandler(async (req, res) => {
  const subject = await Subject.findOne({ 
    _id: req.params.id, createdBy: req.user._id, "topics._id": req.params.topicId, 
  })

  if (subject) {
    const relatedTopic = subject.topics.find((item) => item._id.toHexString() === req.params.topicId)
    const relatedNote = relatedTopic.notes.find((item) => item._id.toHexString() === req.params.noteId)
    
    const relatedNoteIndex = relatedTopic.notes.indexOf(relatedNote)
    relatedTopic.notes.splice(relatedNoteIndex, 1)
    await subject.save()

    res.status(200).json({
      message: 'Note deleted from topic'
    })
  } else {
    res.status(404)
    throw new Error("Subject or Topic not found")
  }
})

export { 
  addSubject, 
  getSubject, 
  deleteSubject, 
  updateSubject, 
  getAllSubjects,
  addTopicToSubject,
  updateTopicToSubject,
  deleteTopicFromSubject,
  getTopicToSubject,
  addNoteToTopic,
  updateNoteToTopic,
  deleteNoteFromTopic
}
