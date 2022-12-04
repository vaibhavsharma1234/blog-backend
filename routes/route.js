import express from 'express';


import {  singupUser,loginUser} from '../controller/user-controller.js';
import { uploadImage,getImage } from '../controller/image-controller.js';
import upload from "../utils/upload.js";
import { createPost,getAllPosts,getPost,updatePost,deletePost } from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
// innerWidth
import {newComment,getComments,deleteComment} from "../controller/comment-controller.js";

// import upload from '../utils/upload.js';

const router = express.Router();


router.post('/signup', singupUser);
router.post("/login",loginUser);
router.post("/file/upload",upload.single('file'),uploadImage);
// 3 arguments 1 is the route 2nd is middleware and 3 is api call  
// middleware pta hona chaye 
router.get('/file/:filename',getImage);
router.post("/create",authenticateToken,createPost);
router.get("/posts",authenticateToken,getAllPosts);
// validate the access token that are u allowed to see the post and create 
router.get("/posts/post",authenticateToken,getPost);
router.put("/update/:id",authenticateToken,updatePost);
router.delete("/details/:id",authenticateToken,deletePost);
router.post("/comment/new",authenticateToken,newComment);
router.get("/comments/:id",authenticateToken,getComments);
router.delete("/comment/delete",authenticateToken,deleteComment);


export default router;