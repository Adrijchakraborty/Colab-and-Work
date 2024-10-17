import User from "../model/authModel.js";
import bcryptjs from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register = async (req, res,next) => {

    try {
        const { name, email, password, clan,client} = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ name, email, password: hashedPassword,clan,client });
        await newUser.save();
        const Token = jwt.sign({ id: newUser._doc.id }, process.env.JWT_SECRET)
        const {password:pass,...rest} = newUser._doc;
        res.cookie('access_token',Token,{httpOnly:true}).status(200).json(rest);
        res.status(200).json(rest)
    } catch (error) {
        next(error);
    }
}


export const login = async (req, res,next) => {
    const { email, password, } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json(createError(404,"user not found"));
        const userPassword = bcryptjs.compareSync(password,user.password);
        if (!userPassword) return res.status(404).json(createError(404,"invalid credentials"));
        const Token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        const {password:pass, ...rest} = user._doc;
        res.cookie('access_token',Token,{httpOnly:true}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res,next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json({ success: true, message: "User has been logged out" });
    } catch (error) {
        next(error);
    }
}