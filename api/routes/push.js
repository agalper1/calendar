const express = require('express');
const router = express.Router();
const webpush = require('web-push');



webpush.setVapidDetails('mailto:test@test.com', process.env.PUBLIC_VKEY,process.env.PRIVATE_VKEY);

router.post('/notifications', (req,res) =>{
  const notification = req.body.data;
  const meeting = req.body.params.meeting;
  const link = req.body.params.link;
  res.status(201);
  const payload = JSON.stringify({title: meeting,link:link});
  webpush.sendNotification(notification,payload).catch(err => console.log(err));
})


module.exports = router;