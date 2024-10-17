import User from "../model/authModel.js";
import Clan from "../model/clanModel.js";
import {createError} from "../utils/error.js"

export const createClan = async(req,res,next) => {
    try {
        const newClan = new Clan(req.body);
        await newClan.save();

        await User.findByIdAndUpdate(req.user.id, { clan: newClan._id },{new:true});

        res.status(200).send(newClan);
    } catch (error) {
        next(error);
    }
}

export const addMembers = async (req, res, next) => {
    try {
        const { members } = req.body;

        const clan = await Clan.findById(req.params.id);

        if (!clan) return next(createError(404, "Clan not found"));

        const existingMembers = clan.members;
        const newMembers = members.filter(member => !existingMembers.includes(member));

        if (newMembers.length === 0) {
            return next(createError(400,"No new members to add"));
        }

        newMembers.forEach(async(member) => {
            await User.findByIdAndUpdate(member, { clan: clan._id },{new:true});
        })

        const updatedClan = await Clan.findByIdAndUpdate(
            req.params.id,
            { $push: { members: { $each: newMembers } } },
            { new: true }
        );

        res.status(200).json(updatedClan);
    } catch (error) {
        next(error);
    }
};

export const getClan = async (req, res,next) => {
    try {
        const clan = await Clan.findById(req.params.id).populate("members");
        if(!clan) return next(createError(404,"No clan found"));
        
        res.status(200).json(clan);
    } catch (error) {
        next(error);
    }
}

export const getAllClans = async (req, res,next) => {
    try {
        const limit = parseInt(req.query.limit) || 6;
        const skip = parseInt(req.query.skip) || 0; 
        const clans = await Clan.find().limit(limit).skip(skip);
        if(!clans)  return next(createError(404,"No clan found"));
        res.status(200).json(clans);
    } catch (error) {
        next(error);
    }
}



