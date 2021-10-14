import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },  
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    topics: [
      {
        topicName: {
          type: String,
          required: true,
        },
        topicDescription: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        notes: [
          {
            subjectName: {
              type: String,
              required: true  
            },
            content: {
              type: String,
              required: true  
            },
          }  
        ]
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
