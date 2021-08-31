const NewFeedModel = require('../models/newfeed.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              NewFeed Controller
 ******************************************************************************/
class NewFeedController {
    getAllNewFeed = async (req, res, next) => {
        let NewFeedList = await NewFeedModel.select();
        res.send(NewFeedList);
    };

    getNewFeedById = async (req, res, next) => {
        const { id: id } = req.params
        let NewFeedList = await NewFeedModel.findOne(id);
        res.send(NewFeedList[0]);
    };

    createNewFeed = async (req, res, next) => {
        const { newfeed_image, newfeed_title, newfeed_subtitle, number1, number2, number3, image1, image2, image3, content1, content2, content3} = req.body
        let result = await NewFeedModel.create({newfeed_image, newfeed_title, newfeed_subtitle, number1, number2, number3, image1, image2, image3, content1, content2, content3});
        if(!result){
            return res.status(500).json({ msg: 'insert failed'});
        }
        return res.status(200).json({ msg: 'insert successfully'});
    };

    deleteNewFeed = async (req, res, next) => {
        const { id: id } = req.params
        let NewFeedResult = await NewFeedModel.delete(id);
        if(!NewFeedResult){
            return res.status(404).json({ msg: 'delete failed'});
        }
        // return res.status(200).json({ msg: 'delete successfully'});
        let NewFeedList = await NewFeedModel.select();
        res.send(NewFeedList);
    };


    updateNewFeed = async (req, res, next) => {
        const {newfeed_id, newfeed_image, newfeed_title, newfeed_subtitle, number1, number2, number3, image1, image2, image3, content1, content2, content3} = req.body
        let result = await NewFeedModel.update({newfeed_id, newfeed_image, newfeed_title, newfeed_subtitle, number1, number2, number3, image1, image2, image3, content1, content2, content3});
        if(!result){
            return res.status(500).json({ msg: 'update failed'});
        }
        // return res.status(200).json({ msg: 'update successfully'});
        let NewFeedList = await NewFeedModel.select();
        res.send(NewFeedList);
    };


}

module.exports = new NewFeedController;