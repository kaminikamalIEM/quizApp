

  var mongoose = require('mongoose');
  var QuestionBankSchema = new mongoose.Schema(
    {
      question : String,
      options: [String],
      correct : String

    }
  );

  module.exports = mongoose.model("QuestionBank", QuestionBankSchema);
