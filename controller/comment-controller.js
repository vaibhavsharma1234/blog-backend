




import comment from "../model/comment.js";
export const newComment=async(request,response)=>{
// validate the coming data and model bnao 
try{
   const newcomment= await new comment(request.body);
   newcomment.save();
   response.status(200).json({msg:"saved succesfully comment"});

}catch(error){
response.status(500).json({error:error.message});
}
}
export const getComments = async(request,response)=>{
    try{
      const comments=  await comment.find({postId:request.query.id1});
      return response.status(200).json(comments);


    } catch(error){
        return response.status(500).json({error:error.message});
    }
}
export const deleteComment = async(request,response)=>{
    try{
        let res = await comment.findByIdAndDelete(request.query.id);
        return response.status(200).json("successfully deleted the commet")
    }catch(error){
        return response.status(500).json({error:error.message});
    }
}