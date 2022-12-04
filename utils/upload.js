



// binary format se image aa rhi hai aage se 
import {GridFsStorage} from "multer-gridfs-storage";
import multer from "multer"
import mongoose from "mongoose"
import dotenv from "dotenv";
import { request } from "express";
// const Grid = require('gridfs-stream');
import Grid from "gridfs-stream";
dotenv.config();
const username =process.env.DB_USERNAME;
const password =process.env.DB_PASSWORD;


// const storage = new GridFsStorage({
//     url:`mongodb+srv://${username}:${password}@blog.xr1ypn4.mongodb.net/?retryWrites=true&w=majority`,
//     options:{useNewUrlPaser:true},
//     file:(request,file)=>{
//         const match=["image/png","image/jpg"];
//         // agar array mai not exist toh return krdo 
//         if(match.indexOf(file.memeType)=== -1){
//             return `${Date.now()}-blog-${file.originalname}`;
//         }
//         return {
//             bucketName:"photos",
//             filename:`${Date.now()}-blog-${file.originalname}`

//         }
//     }

// });
//
const mongoURI = `mongodb+srv://${username}:${password}@blog.xr1ypn4.mongodb.net/?retryWrites=true&w=majority`;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

// conn.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);  
//   gfs.collection('uploads');
// });

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    const match=["image/png","image/jpg"];
    // agar array mai not exist toh return krdo 
    if(match.indexOf(file.memeType)=== -1){
        return `${Date.now()}-blog-${file.originalname}`;
    }
    return new Promise((resolve, reject) => {
        const filename = file.originalname;
       
        
        const fileInfo= {
            bucketName:"fs",
            filename:`${Date.now()}-blog-${file.originalname}`

        };
        // const fileInfo = {
        //   filename: filename,
        //   bucketName: 'uploads'
        // };
        resolve(fileInfo);
    });
  }
});
//
export default multer({storage});
