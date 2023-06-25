import jwt from "jsonwebtoken";

export const authMiddleware=async(req,res,next)=>{
    const token=req.headers["authorization"]?.split(" ")[1];
    if(!token)
    {
        return res.status(404)
        .json({
            status:false,
            message:"Authorization token is missing!!!"
        })
    }
    try
    {
      jwt.verify(token,process.env.JWT_SECRET,(error,decode)=>{
        if(error)
        {
            return res.status(400)
            .json({status:false,message:"Authentication failed!!"})
        }
        req.body.userId=decode.id;
        next();
      })
    }
    catch(error)
    {
        return res.status(501)
        .json({status:false,message:"Internal Server error!!"});
    }
}