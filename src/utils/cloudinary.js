
import { v2 as cloudinary } from 'cloudinary';
 import { v4 as uuidv4 } from 'uuid';
 console.log(process.env.CLOUD_NAME)
 console.log(process.env.CLOUD_NAME)
async function  cloudinaryupload( fileo ) {
const uniquePublicId=uuidv4();
console.log(process.env.CLOUD_NAME)
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env. API_SECRET 
});
try{// Upload an image
 const uploadResult = await cloudinary.uploader
   .upload(
       fileo, {
        public_id: uniquePublicId,
        overwrite: true,
        invalidate: true
       }
   )
   

console.log(uploadResult);

return uploadResult;
}
catch(err){

    console.log(err.message)
}
}


export default cloudinaryupload;