var express= require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer")

/* GET home page. */
router.post('/waiter_submit',upload.any(),function(req, res, next) {
    try{
       pool.query("insert into waiters(restaurantid,waitername,gender,dob,mobileno,emailid,address,picture) values(?,?,?,?,?,?,?,?)",[req.body.restaurantid,req.body.waitername,req.body.gender,req.body.dob,req.body.mobileno,req.body.emailid,req.body.address,req.files[0].filename],
       function(error,result){
         if(error){
            console.log(error)
            res.status(200).json({status:false,message:'Datbase Error',data:[]})
         }
         else{
            console.log(result)
            res.status(200).json({status:true,message:'Waiter Data Submitted successfully',data:result})
         }
       })
    }
    catch(e){
      console.log(e)
         res.status(200).json({status:false,message:'Server Error',data:[]})
    }
   });

router.post('/fetch_all_waiter',function(req,res,next){
   try{
      pool.query('select * from waiters where restaurantid=?',[req.body.restaurantid],function(error,result){
         if(error){
            res.status(200).json({status:false,message:'Datbase Error',data:[]})
         }
         else{
            res.status(200).json({status:true,message:'Success',data:result})
         }
      })
   }
   catch(e){
      res.status(200).json({status:false,message:'Datbase Error',data:[]})
   }
})

router.post('/waiter_edit_data',function(req, res, next) {
   try{
      pool.query("update waiters set restaurantid=?,waitername=?,gender=?,dob=?,mobileno=?,emailid=?,address=? where waiterid=?",[req.body.restaurantid,req.body.waitername,req.body.gender,req.body.dob,req.body.mobileno,req.body.emailid,req.body.address,req.body.waiterid],
      function(error,result){
        if(error){
           console.log(error)
           res.status(200).json({status:false,message:'Datbase Error',data:[]})
        }
        else{
           console.log(result)
           res.status(200).json({status:true,message:'Waiter Data Updated successfully',data:result})
        }
      })
   }
   catch(e){
     console.log(e)
        res.status(200).json({status:false,message:'Server Error',data:[]})
   }
  });

  router.post('/waiter_edit_picture',upload.any(),function(req,res,next){
   try{
      pool.query("update waiters set picture=? where waiterid=?",[req.files[0].filename,req.body.waiterid],function(error,result){
         if(error){
            res.status(200).json({status:false,message:'Database Error',data:[]})
         }
         else{
            res.status(200).json({status:true,message:' Waiter Picture Updated Successfully',data:result})
         }
      })
   }
   catch(e){
      res.status(200).json({status:false,message:'Server Error',data:[]})
   }
})

router.post('/waiter_delete',function(req,res,next){
   try{
        pool.query('delete from waiters where waiterid=?',[req.body.waiterid],function(error,result){
         if(error){
            console.log(error)
            res.status(200).json({status:false,message:'Database Error'})
         }
         else{
            res.status(200).json({status:true,message:'Waiter Deleted Successfully'})
         }
        })
   }
   catch(e){
      res.status(200).json({status:false,message:'Server Error'})
   }
})

   module.exports= router