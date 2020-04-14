const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({
    text: String,
    likes: Number,
    location: String,
    color: Number,
    time: Number,
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    }
});

threadSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model("Thread", threadSchema);
