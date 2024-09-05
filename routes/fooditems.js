var express= require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer")

router.post('/fooditems_submit',upload.any(),function(req,res,next){
    console.log(req.body)
    try{
        pool.query("insert into fooditems(restaurantid, categoryid, fooditemname, foodtype, ingredients, price, offerprice, icon) values(?,?,?,?,?,?,?,?)",[req.body.restaurantid, req.body.categoryid, req.body.fooditemname, req.body.foodtype, req.body.ingredients,req.body.price, req.body.offerprice, req.files[0].filename],function(error,result){
        if(error){
            res.status(200).json({status:false,message:'Database Error',data:[]})
        } 
        else{
            res.status(200).json({status:true,message:'Food Item Successfully Submitted',data:result})
        } 
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error',data:[]})
    }
})

router.post('/fetch_all_fooditems',function(req,res,next){
    try{
        pool.query("select F.*,(select R.restaurantname from restaurants R where R.restaurantid=F.restaurantid) as restaurantname,(select C.categoryname from category C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.restaurantid=?",[req.body.restaurantid],function(error,result){
        if(error){
            res.status(200).json({status:false,message:'Database Error',data:[]})
        } 
        else{
            res.status(200).json({status:true,message:'Food Item Successfully fetched',data:result})
        } 
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error',data:[]})
    }
})

router.post('/fooditems_edit_data',function(req,res,next){
    try{
       pool.query('update fooditems set restaurantid=?, categoryid=?, fooditemname=?, foodtype=?, ingredients=?, price=?, offerprice=? where fooditemid=?',
       [req.body.restaurantid, req.body.categoryid, req.body.fooditemname, req.body.foodtype, req.body.ingredients, req.body.price, req.body.offerprice, req.body.fooditemid],
       function(error,result){
          if(error){
             console.log(error)
             res.status(200).json({status:false,message:'Database Error',data:[]})
          }
          else{
             res.status(200).json({status:true,message:'Food Item Updated Successfully',data:result})
          }
       })
    }
    catch(e){
       res.status(200).json({status:false,message:'Server Error',data:[]})
    }
})

router.post('/fooditems_edit_icon',upload.any(),function(req,res,next){
    try{
       pool.query("update fooditems set icon=? where fooditemid=?",[req.files[0].filename,req.body.fooditemid],function(error,result){
          if(error){
             res.status(200).json({status:false,message:'Database Error',data:[]})
          }
          else{
             res.status(200).json({status:true,message:'Food Item Icon Updated Successfully',data:result})
          }
       })
    }
    catch(e){
       res.status(200).json({status:false,message:'Server Error',data:[]})
    }
 })

 router.post('/fooditems_delete',function(req,res,next){
    console.log(req.body)
    try{
         pool.query('delete from fooditems where fooditemid=?',[req.body.fooditemid],function(error,result){
          if(error){
             console.log(error)
             res.status(200).json({status:false,message:'Database Error'})
          }
          else{
             res.status(200).json({status:true,message:'Food Item Deleted Successfully'})
          }
         })
    }
    catch(e){
       res.status(200).json({status:false,message:'Server Error'})
    }
 })

 router.post('/fetch_all_fooditems_categorywise',function(req,res,next){
    console.log()
   try{
       pool.query("select F.*,(select R.restaurantname from restaurants R where R.restaurantid=F.restaurantid) as restaurantname,(select C.categoryname from category C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.restaurantid=? and F.categoryid=?",[req.body.restaurantid,req.body.categoryid],function(error,result){
       if(error){
           res.status(200).json({status:false,message:'Database Error',data:[]})
       } 
       else{
        console.log(result)
           res.status(200).json({status:true,message:'Food Item Successfully fetched',data:result})
       } 
       })
   }
   catch(e){
       res.status(200).json({status:false,message:'Server Error',data:[]})
   }
})
 

module.exports=router