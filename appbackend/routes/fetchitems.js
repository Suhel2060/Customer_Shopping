const express=require('express');
const router=express.Router();
const items=require('./items')

router.post('/fetchitem',(req,res)=>{
    res.json(items);

})
module.exports = router;