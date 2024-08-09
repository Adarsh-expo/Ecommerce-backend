export const checkadmin=(req,res,next)=>{

const{role}=req.user;
if(role==0){

    res.send({status:false})
}
else{next()}



}
export const checkuser=(req,res,next)=>{

    const{role}=req.user;
    if(role==1){
    
        return res.send({status:false})
    }
    
    next()
    
    
    }