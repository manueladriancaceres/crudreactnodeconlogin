import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export const authRequired = (req,res,next) => {
    const token = req.cookies.token;
    // console.log('test');
    // console.log(token);
    
    if(!token)
        return res.status(401).json({
            message: "no token, autorization denied"
        });

    jwt.verify(token,TOKEN_SECRET,(err,user)=>{
        if(err) 
            return res.status(401).json({message:"Invalid token"});
        //console.log(user);
        req.user = user;
        next();
    })
}