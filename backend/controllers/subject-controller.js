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

export { addSubject, getSubject, deleteSubject, updateSubject, getAllSubjects }
