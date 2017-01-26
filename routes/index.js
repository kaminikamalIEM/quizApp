var express = require('express');
var router = express.Router();


var QuestionBank = require('../models/questionBank');
var ParticipantInfo = require( '../models/quizTakerInfo' );


/* GET home page. */
router.get('/', function(req, res, next) {
  QuestionBank.find({})
    .exec(function(err, questions){
      if(err){
        console.log('Cannot get question data')
      }
          //console.log(questions);
        res.render('quizForm', { title: 'Welcome to the Quiz Forum', questions : questions });
    })

});


router.post('/logic', function (req, res, next){
    //console.log(req.body.quizData);
    var arrServ = req.body.quizData;
    var nameOfParticipant = req.body.nameOfParticipant ;
    //console.log(nameOfParticipant);
    var timeOfTest = req.body.time ;

    // arrServ.forEach( function (elem){
    //   console.log(elem.name);
    // });

    //var query = QuestionBank.find({}).select( _id, correct);
    //console.log(query)
    var score =0;
     QuestionBank.find({})
      .select({ _id : 1, correct : 1})
        .exec(function (err,questions){
          if(err){
            //console.log(err);
            res.json({
                error : true,
 				        reason : err
            })
          }
          if(questions.length == 5){
              // questions.forEach( function (el){
              //     //console.log('id='+el._id+" "+"correct answer="+el.correct);
              //      if( arrServ.filter( function (elem){
              //        if(elem.forQuestion == el._id){
              //          return true;
              //        }
              //      })){
              //
              //     }

                  arrServ.forEach( function (elea){
                      var correctAns =  questions.filter(function (el){
                          if(elea.forQuestion == el._id){
                            return true;
                          }
                        })[0].correct;
                      if(correctAns == elea.answered){
                        score+=1;
                      }
                  });

                  // arrServ.forEach( function (ele){
                  // //console.log('id='+ele.forQuestion+" "+"aswer ="+ele.answered);
                  //   if(el._id == ele.forQuestion){
                  //     if(el.correct == ele.answered){
                  //       score+=1;
                  //     }
                  //   }
                  // });
                // });
            }
            console.log(score);
            // res.json({
            //   error : false,
 				   //    score : score
            // })
            var objInfo = {
              name : nameOfParticipant ,
              time : timeOfTest ,
              score : score
            };

            var participant1 = new ParticipantInfo(objInfo);
            participant1.save( function (err, participant){
              if(err){
                return res.json({
                      error : true ,
                      reason : err
                    });
                }
                console.log(participant._id);
                return res.json({
                  idOfRecentParticipant : participant._id ,
                  error : false
                });

            });
        });

});

router.get('/leaderboard/:idOfparticipant?', function (req, res, next){
//  res.send('hello');

  var filter = {};
  var idOfCurrent ;
  //console.log(idOfCurrent);
  if(req.params.idOfparticipant !== undefined){
      idOfCurrent = req.params.idOfparticipant ;
  }

    ParticipantInfo.find({})
      .sort({ score : -1  })
        .exec( function (err, participants){
            if(err){
              console.log(err);
            }
              res.render('leaderboard', { title : 'LeaderBoard', participants : participants , currentOn : idOfCurrent });
        });
});



module.exports = router;
