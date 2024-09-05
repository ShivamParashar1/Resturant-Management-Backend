var express = require('express');
var router = express.Router();
var pool = require('./pool')

/* GET home page. */
router.post('/table_submit', function(req, res, next) {
    try{
       pool.query('insert into tablebooking(restaurantid, tableno, noofchairs, floor) values(?,?,?,?)',[req.body.restaurantid,req.body.tableno,req.body.noofchairs,req.body.floor],function(error,result){
          if(error){
             res.status(200).json({status:false,message:'Databse Error',data:[]})
          }
          else{
             res.status(200).json({status:true,message:'Table Successfully Submitted',data:result})
          }
       })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error',data:[]})
    }
});

router.post('/fetch_all_table',function(req,res,next){
   try{
      pool.query('select T.*,(select R.restaurantname from restaurants R where R.restaurantid=T.restaurantid)as restaurantname from tablebooking T where T.restaurantid=?',[req.body.restaurantid],function(error,result){
         if(error){
            res.status(200).json({status:false,message:'Databse Error',data:[]})
         }
         else{
            res.status(200).json({status:true,message:'Successfull',data:result})
         }
      })
   }
   catch(e){
      res.status(200).json({status:false,message:'Server Error',data:[]})
   }
})

router.post('/table_edit_data',function(req,res,next){
   try{
      pool.query('update tablebooking set restaurantid=?, tableno=?, noofchairs=?, floor=? where tableid=?',[req.body.restaurantid,req.body.tableno,req.body.noofchairs,req.body.floor,req.body.tableid],function(error,result){
         if(error){
            res.status(200).json({status:false,message:'Databse Error'})
         }
         else{
            res.status(200).json({status:true,message:'Table Successfully Updated'})
         }
      })
   }
   catch(e){
      res.status(200).json({status:false,message:'Server Error'})
   }
})

router.post('/table_delete',function(req,res,next){
   try{
      pool.query('delete from tablebooking where tableid=?',[req.body.tableid],function(error,result){
         if(error){
            res.status(200).json({status:false,message:'Database Error',data:[]})
         }
         else{
            res.status(200).json({status:true,message:'Table Deleted Successfully',data:result})
         }
      })
   }
   catch(e){
      res.status(200).json({status:false,message:'Server Error',data:[]})
   }
})

module.exports = router;