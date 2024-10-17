import Request from "../model/requestModel.js";
import {createError} from "../utils/error.js"

export const sendReq = async(req, res , next) => {
    
    try {
        const sender = req.user.id;
        const receiver = req.params.id;
        if(!sender || !receiver) return next(createError(404,"Invalid request"));
        const request = await Request.create({sender,receiver});
        await request.save();
        res.status(200).json(request);
    } catch (error) {
        next(error);
    }
}

export const acceptReq = async(req, res , next) => {
    
    try {
        const user = req.user.id;
        const request = await Request.findOne({receiver: user});

        if(!user || !request) return next(createError(404,"Invalid request received"));

        const accepted = await Request.findByIdAndUpdate(request._id,{$set:{status:"accepted"}},{new : true})

        res.status(200).json(accepted);
        

    } catch (error) {
        next(error);
    }
}

export const rejecttReq = async(req, res , next) => {
    
    try {

        await Request.findByIdAndDelete(req.params.id)

        res.status(200).json({});
        

    } catch (error) {
        next(error);
    }
}

export const getAllReq = async (req, res,next) => {
    try {
        const requests = await Request.find({receiver:req.params.id}).populate("sender");
        if(!requests) return next(createError(404,"No request found"));

        res.status(200).json(requests)
    } catch (error) {
        next(error);
    }
}