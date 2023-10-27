import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { sendCookie } from "../utils/features.js";

export const login=async(req,res,next)=>{

try{

    const{email,password} =req.body;

    const user=await User.findOne({email}).select("+password");

    if(!user) return next(new ErrorHandeler("Invalid Email or Password", 404));


    const isMatch= await bcryptjs.compare(password,user.password);

    if(!isMatch) return next(new ErrorHandeler("Invalid Email or Password", 404));

    sendCookie(user,res,`Welcome back, ${user.name}`,200);
 }
    catch(error){
        next(error);
    }
};
//$ npm i cors (for the purpose of server deployment)


//if we want to check our this api so we can first of all send data withoug frontend we will go to body raw and json and then wil give detail and then send

export const register=async(req,res)=>{

 
    try{
        const{name,email,password} = req.body;

        let user =await User.findOne({email}); 
    
        if(user) return next(new ErrorHandeler("User already exists", 404));
    
        const hashedPassword = await bcryptjs.hash(password,10)
    
        user = await User.create({name,email, password:hashedPassword});
    
        //what is jwt and why we are using it here
        //how this is 15 minutes  maxAge:15*60*1000,
    
        sendCookie(user,res,"Registered Sucessfully",201);
       
    }
    catch(error){
        next(error);
    }
};



export const getMyProfile=(req,res)=>{

/*     const id="myid";
 */

    //we will make sure we are login

    //cookie parser for accessing your id
    
    res.status(200).json({
        success:true,
        user:req.user,
/*         user:"sdfsdfsdf",
 */
    });
 };



 export const logout=(req,res)=>{
   //cookie parser for accessing your id
        
        res.status(200).cookie("token","",{expires:new Date(Date.now()),
            sameSite:process.env.NODE_ENV==="Development"? false:true,
            secure:process.env.NODE_ENV==="Development"? false:true,
    }).json({
            success:true,
            user:req.user,
  
        });
     };
    
