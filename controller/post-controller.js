



import { response } from "express";
import Post from "../model/post.js"

export const createPost = async (request, response) => {
    //  validate the data model bnao
    try {
        const post = await new Post(request.body);
        post.save();
        return response.status(200).json("post saved succesfully")
    }
    catch (error) {
        return response.status(500).json(error);

    }

}
export const getAllPosts = async (request, response) => {
    let category = request.query.category;
    let posts;
    // console.log(request.params);
    console.log(request.query.category);
    try {
        // all data from collection
        // if no  condition given then toh sabko le ayga
        // if u provide  the condition like username yeh hona chaye toh woh hi ayga
        if (category) {
            posts = await Post.find({ categories: category })
        }
        else {

            posts = await Post.find({});
        }

        //  let posts= await Post.find({});
        return response.status(200).json(posts);
    }
    catch (error) {
        return response.status(500).json({ msg: error.message });
    }
}
export const getPost = async (request, response) => {
    try {
        // id is a mmongo db id 
        const post = await Post.findById(request.query.id)
        return response.status(200).json(post)
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
}
export const updatePost = async(request,response)=>{
    try{
        // post ko nikalo and update and insert
        const post = await Post.findById(request.query.id);
        console.log(post);
        if(!post){
            return response.status(404).json({msg:"post not found"});
        }
        // when u want to set or replace values use $set and if append addtoset
        await Post.findByIdAndUpdate(request.query.id,{$set:request.body})
        return response.status(200).json({msg:"post updated successfully"})
    }catch(error){
        return response.status(500).json({error:error.message});

    }
}
export const deletePost =async(request,response)=>{
    try{
        const res  = await Post.findByIdAndDelete(request.query.id);
        if(!res){
            return response.status(400).json({msg:"post not delted"});
        }
        return response.status(200).json({msg:"post deleted"});
    }catch(error){
        return response.status(400).json({error:error.message});
    }
   
}