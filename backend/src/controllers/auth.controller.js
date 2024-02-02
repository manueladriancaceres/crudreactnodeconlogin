import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export const register = async (req,res) => {
    const {email,password,username} =
        req.body;

    const userFound = await User.findOne({email})
    if(userFound)
        return res.status(400).json(["the email already exists"])    

    try {
        const passwordHash = await bcrypt.hash(password,10);
        const newUser = new User({email,username,
            password:passwordHash})
        const saveUser = await newUser.save();
        const token = await createAccessToken({id:saveUser._id});    
        res.cookie("token",token)    
        /*
        jwt.sign({id:saveUser._id},"secret123",{expiresIn: 3600},
            (err,token) => {
                if(err) res.send('error token') 
                res.cookie('token',token)
                res.json({message:"user created successfully"})
                // res.json({token})                
            })
        */    
        
        res.json({
            id: saveUser._id,
            username: saveUser.username,
            email: saveUser.email,
            createAt: saveUser.createdAt,
            updateAt: saveUser.updatedAt
        })
        
        //res.json(saveUser);
        // res.send("register");
    } catch (error) {
        console.log(error);
        res.send("error de registro")        
    }    
}
    
export const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const userFound = await User.findOne({email});
        if(!userFound) {
            return res.status(400).json(["User not found"])
        } else {
            const isMatch = await bcrypt.compare(password,userFound.password);
            if(!isMatch) {
                return res.status(400).json(["incorrect credentials"]);
            } else {
                const token = await createAccessToken({id:userFound._id}) 
                res.cookie("token",token)
                    /*
                res.cookie("token",token,{
                    sameSite: 'none',
                    secure: true,
                    httpOnly: false
                });
                */
                res.json({
                    id: userFound._id,
                    username: userFound.username,
                    email: userFound.email,
                    createAt: userFound.createdAt,
                    updateAt: userFound.updatedAt
                })
        
            }
        }
    } catch(err) {
        res.send(err)
    }
}

export const logout = (req,res) => {
    // revisar de buscar al usuario
    res.cookie('token',"",{expires:new Date(0)})
    res.sendStatus(200);
}

export const profile = async (req,res) => {
    const userFound = await User.findById(req.user.id);
    if(!userFound)
        return res.status(400).json({message: "User not found"});
    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt
    })
}

export const verifyToken = async (req,res) => {
    const {token} = req.cookies;
    if(!token)
        return res.status(401).json({message:'Unahthorized'});
    jwt.verify(token,TOKEN_SECRET, async(err,user) => {
        if(err) return res.status(401).json({message:'Unauthorized'});
        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json({message:'Unauthorized'});
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}