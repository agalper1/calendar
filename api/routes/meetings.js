const express = require('express');
const router = express.Router();
const Meeting = require('../model/Meeting');
const verify = require('./verify')




// GET Meetings

router.get('/meeting',verify, async (req, res) => {
 try {
   const meeting = await Meeting.find
   ({$or : [{"date" : req.headers.activedate},{"weekly": req.headers.weeknr }],"username" : req.headers.username}); 
   res.send(meeting);
 } catch (error) {
   console.log(error);
   res.sendStatus(500);
 }
});

// POST Meetings

router.post('/meeting', async (req, res) => {
  try {
   await Meeting.create(req.body);
   res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// DELETE Meetings

router.delete('/meeting:id', async (req, res) => {
  try {
    await Meeting.deleteOne({_id: req.headers.id});
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// UPDATE Meetings

// router.delete('/meeting:id', async (req, res) => {
//   try {
//     await Meeting.updateOne({_id: new mongodb.ObjectID(req.headers.id)});
//     res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });


module.exports = router;