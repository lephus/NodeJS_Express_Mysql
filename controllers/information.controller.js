const InformationModel = require('../models/information.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Information Controller
 ******************************************************************************/
class InformationController {
    getInformation = async (req, res, next) => {
        let InformationList = await InformationModel.select();
        res.send(InformationList);
    };

    insertInformation = async (req, res, next) => {
        const { title, des} = req.body
        let InformationRest = await InformationModel.create( title, des);
        // return res.status(200).send({msg:"insert success"});
        let InformationList = await InformationModel.select();
        res.send(InformationList);
    };

    updateInformation = async (req, res, next) => {
        const {infor_id, title, des} = req.body
        let InformationRest = await InformationModel.update(infor_id, title, des);
        // return res.status(200).send({msg:"update success"});
        let InformationList = await InformationModel.select();
        res.send(InformationList);
    };

    deleteInformation = async (req, res, next) => {
        const { id: id } = req.params
        let InformationRest = await InformationModel.delete(id);
        // return res.status(200).send({msg:"delete success"});
        let InformationList = await InformationModel.select();
        res.send(InformationList);
    };

}

module.exports = new InformationController;