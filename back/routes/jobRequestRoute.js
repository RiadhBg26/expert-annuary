const express = require('express');
const router = express.Router();
const JobRequest = require('../models/jobRequestModel')
const Expert = require('../models/expertModel')

// router.get('/', function(req, res) {
//     JobRequest.find({},'name _id')
//         // .select('-_id -__v')
//         // .populate('skills')
//         // .populate('expertName')
//         .exec(function(error , jobReq) {
//             res.send(jobReq || error)
//     });
// });
router.get('/', function (req, res) {
  JobRequest.find({})
    .select('-__v')
    .populate({path: 'expertId', populate : {path: 'jobRequests'}, model: 'expert', select: '-__v'})
    // .deepPopulate({path: 'expertId.jobRequests', model: 'expert', select: '-__v'})
    .exec(function (err, jobRequests) {
      if (jobRequests.length > 0) {
        res.status(200).json({
          count: jobRequests.length,
          jobRequests: jobRequests,
        });
      } else {
        res.json({ message: 'No Job Requests found', err: err })
      };
    });
});

router.post('/', function (req, res) {
  JobRequest.create(req.body).then(async function (jobRequest) {
    console.log(jobRequest)
    let expert = await Expert.findById(jobRequest.expertId)
    console.log('id => ', expert);
    expert.jobRequests.push(jobRequest._id)
    await expert.save()
    console.log('jbr =>', expert.jobRequests)
    res.json({
      msg: 'Job Request created successfully!',
      jobRequest: jobRequest
    });
  })
})


router.put('/:id', function (req, res) {
  // let companyId = {_id: req.params.id};
  JobRequest.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (jobReq) {
    res.send(jobReq)
  });
});

router.delete('/:id', function (req, res) {
  JobRequest.findByIdAndDelete({ _id: req.params.id }, req.body).then(function (jobReq) {
    res.send(jobReq);
  });
});


module.exports = router