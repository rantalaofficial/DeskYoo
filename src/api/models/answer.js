const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    text: String,
    likes: Number,
    location: String,
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread'
    }
});

answerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model("Answer", answerSchema);
