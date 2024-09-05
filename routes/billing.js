var express= require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer")

/* GET home page. */
router.post('/bill_submit',function(req, res, next) {
    try{
       pool.query("insert into billing(billtime, billdate, tableno, server, fssai, cnote, gst, billingdetails, totalamount, customername, mobileno) values(?,?,?,?,?,?,?,?,?,?,?)",[req.body.billtime, req.body.billdate, req.body.tableno, req.body.server, req.body.fssai, req.body.cnote, req.body.gst, req.body.billingdetails, req.body.totalamount, req.body.customername, req.body.mobileno,],function(error,result){
         if(error){
            console.log(error)
            res.status(200).json({status:false,message:'Database Error',data:[]})
         }
         else{
            res.status(200).json({status:true,message:'Bill Saved successfully',data:result})
         }
       })
    }
    catch(e){
      console.log(e)
         res.status(200).json({status:false,message:'Server Error',data:[]})
    }
   });

   router.post('/fetch_all_bill',function(req, res, next) {
      try{
         pool.query("select * from billing where billdate between ? and ? ",[req.body.fromDate,req.body.toDate],function(error,result){
           if(error){
              res.status(200).json({status:false,message:'Database Error',data:[]})
           }
           else{
            console.log(result)
              res.status(200).json({status:true,message:'Bill fetch successfully',data:result})
           }
         })
      }
      catch(e){
        console.log(e)
           res.status(200).json({status:false,message:'Server Error',data:[]})
      }
     });

     router.post('/fetch_total',function(req, res, next) {
      try{
         pool.query("select sum(totalamount) as totalsale from billing where billdate between ? and ? ",[req.body.fromDate,req.body.toDate],function(error,result){
           if(error){
              res.status(200).json({status:false,message:'Database Error',data:[]})
           }
           else{
            console.log(result)
              res.status(200).json({status:true,message:'Bill amount successfully fetch',data:result[0]})
           }
         })
      }
      catch(e){
        console.log(e)
           res.status(200).json({status:false,message:'Server Error',data:[]})
      }
     });

     router.post('/fetch_totalsale_month',function(req, res, next) {
      try{
         pool.query("select month(billdate) as month,sum(totalamount) as totalmonthsale from billing group by month(billdate)",function(error,result){
           if(error){
              res.status(200).json({status:false,message:'Database Error',data:[]})
           }
           else{
              res.status(200).json({status:true,message:'Monthly amount successfully fetch',data:result})
           }
         })
      }
      catch(e){
        console.log(e)
           res.status(200).json({status:false,message:'Server Error',data:[]})
      }
     });

     router.post('/fetch_todays_total',function(req, res, next) {
      try{
         pool.query("select sum(totalamount) as todayssale from billing where billdate=? ",[req.body.todaysdate],function(error,result){
           if(error){
              res.status(200).json({status:false,message:'Database Error',data:[]})
           }
           else{
              res.status(200).json({status:true,message:'Bill amount successfully fetch',data:result[0]})
           }
         })
      }
      catch(e){
        console.log(e)
           res.status(200).json({status:false,message:'Server Error',data:[]})
      }
     });

     router.get('/fetch_recent_bills',function(req,res,next){
      try{
         pool.query('select * from billing ORDER by billdate desc, billno desc limit 4',function(error,result){
            if(error){
               res.status(200).json({status:false,message:'Database Error',data:[]})
            }
            else{
               res.status(200).json({status:true,message:'Recent Bills Successfully Fetch ',data:result})
            }
         })
      }
      catch(e){
         res.status(200).json({status:false,message:'Server Error',data:[]})
      }
     })

   module.exports=router