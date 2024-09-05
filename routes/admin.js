var express = require('express');
var router = express.Router();
var pool = require('./pool')
var jwt = require('jsonwebtoken')

/* GET home page. */
router.post('/checklogin', function(req, res, next) {
  console.log(req.body)
  pool.query("select * from restaurants where emailid=? and password=?",[req.body.emailid,req.body.password],function(error,result){
    if(error){
        console.log(error)
        res.status(200).json({status:false,message:'Database Error',data:[]})
    }
    else{
        if(result.length==1){
          var token= jwt.sign({data:result[0]},"shhhhhh")
          res.status(200).json({status:true,message:'Login Successfully',data:result[0],token}) 
        }
        else{
           res.status(200).json({status:false,message:'Invalid Userid/Password',data:[]}) 
        }
    }
  })
});

module.exports = router;