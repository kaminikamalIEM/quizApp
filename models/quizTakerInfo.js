

  var mongoose = require('mongoose');
  var quizParticipantSchema = new mongoose.Schema(
    {
        name : String,
        time : String,
        score : Number
    }
  );

  module.exports = mongoose.model("PaticipantInfo", quizParticipantSchema );
