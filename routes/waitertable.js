var express= require('express');
var router = express.Router();
var pool = require("./pool");

/* GET home page. */

router.post('/fetch_all_floor',function(req,res,next){
   try{
       pool.query('select DISTINCT floor from tablebooking where restaurantid=?',[req.body.restaurantid],function(error,result){
           if(error){
               res.status(200).json({status:false,message:'Database Error',data:[]})
           }
           else{
               res.status(200).json({status:true,message:'Success',data:result})
           }
       })
   }
   catch(e){
       res.status(200).json({status:false,message:'Server Error',data:[]})
   }
})

router.post('/fetch_all_table_by_floor',function(req,res,next){
   console.log(req.body)
    try{
        pool.query('select * from tablebooking where floor=? and restaurantid=?',[req.body.floor,req.body.restaurantid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Database Error',data:[]})
            }
            else{
                res.status(200).json({status:true,message:'Success',data:result})
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error',data:[]})
    }
})


router.post('/waitertable_submit',function(req, res, next) {
    try{
       pool.query("insert into waitertable (restaurantid,waiterid,tableid,currentdate) values(?,?,?,?)",[req.body.restaurantid,req.body.waiterid,req.body.tableid,req.body.currentdate],
       function(error,result){
         if(error){
            res.status(200).json({status:false,message:'Datbase Error',data:[]})
         }
         else{
            res.status(200).json({status:true,message:'Waiter Table Alloted successfully',data:result})
         }
       })
    }
    catch(e){
      console.log(e)
         res.status(200).json({status:false,message:'Server Error',data:[]})
    }
   });

   router.post('/fetch_all_waitertable',function(req,res,next){
    try{
       pool.query('select WT.*,(select W.waitername from waiters W where W.waiterid=WT.waiterid) as waitername,(select T.tableno from tablebooking T where T.tableid=WT.tableid) as tableno,(select T.floor from tablebooking T where T.tableid=WT.tableid) as floor  from waitertable WT where WT.restaurantid=?',[req.body.restaurantid],function(error,result){
          if(error){
             res.status(200).json({status:false,message:'Datbase Error',data:[]})
          }
          else{
             res.status(200).json({status:true,message:'Success',data:result})
          }
       })
    }
    catch(e){
       res.status(200).json({status:false,message:'Server Error',data:[]})
    }
 })

 router.post('/waitertable_edit_data',function(req, res, next) {
    try{
       pool.query("update waitertable set restaurantid=?,waiterid=?,tableid=?,currentdate=? where waitertableid=?",[req.body.restaurantid,req.body.waiterid,req.body.tableid,req.body.currentdate,req.body.waitertableid],
       function(error,result){
         if(error){
            res.status(200).json({status:false,message:'Database Error',data:[]})
         }
         else{
            console.log(result)
            res.status(200).json({status:true,message:'Waiter Table Data Updated successfully',data:result})
         }
       })
    }
    catch(e){
      console.log(e)
         res.status(200).json({status:false,message:'Server Error',data:[]})
    }
   });

    router.post('/waitertable_delete',function(req, res, next) {
    try{
       pool.query("delete from waitertable where waitertableid=?",[req.body.waitertableid],
       function(error,result){
         if(error){
            res.status(200).json({status:false,message:'Database Error',data:[]})
         }
         else{
            res.status(200).json({status:true,message:'Waiter Assigned Table Data Deleted successfully',data:result})
         }
       })
    }
    catch(e){
      console.log(e)
         res.status(200).json({status:false,message:'Server Error',data:[]})
    }
   });

module.exports= router