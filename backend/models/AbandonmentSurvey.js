const mongoose = require('mongoose');

const abandonmentSurveySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reasons: [{ type: String }], // Array of strings for multiple selections
    comment: { type: String },
    deviceInfo: { type: String }, // Optional: User agent or device type
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AbandonmentSurvey', abandonmentSurveySchema);
