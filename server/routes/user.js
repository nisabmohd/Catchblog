const router=require('express').Router()
const {UserModel}=require('../models/User')

router.get('/:uid',async (req,res)=>{
    try{
        const find=await UserModel.findOne({uid:req.params.uid},{password:0})
        res.send(find)
    }catch(err){
        res.status(err.code).send(err)
    }

})

module.exports=router