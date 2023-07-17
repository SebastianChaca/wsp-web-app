const { Schema, model } = require('mongoose');

const MessageSchema = Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: 'ChatUser',
      require: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'ChatUser',
      require: true,
    },
    message: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();

  return object;
});

MessageSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'from',
    select: ['name', 'email', 'online', 'lastActive', '-friends'],
  });

  next();
});
MessageSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'to',
    select: ['name', 'email', 'online', 'lastActive', '-friends'],
  });
  next();
});

module.exports = model('ChatMessage', MessageSchema);
