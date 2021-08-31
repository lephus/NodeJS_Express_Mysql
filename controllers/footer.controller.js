const FooterModel = require('../models/footer.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Footer Controller
 ******************************************************************************/
class FooterController {
    getFooter = async (req, res, next) => {
        let footer = await FooterModel.select();
        res.send(footer);
    };


// MANAGER

    managerGetTypeFooter = async (req, res, next) => {
        let footer = await FooterModel.selectTypeFooter();
        res.send(footer);
    };

    managerUpdateTypeFooter = async (req, res, next) => {
        let result = await FooterModel.updateTypeFooter(req.body);
        // res.status(200).json({ msg: 'update successfully'});
        let footer = await FooterModel.selectTypeFooter();
        res.send(footer);
    }


    managerGetFooter = async (req, res, next) => {
        let footer = await FooterModel.selectFooter();
        res.send(footer);
    };

    managerInsertFooter = async (req, res, next) => {
        const {type_id, title } = req.body
        const result = await FooterModel.insertFooter({type_id, title })
        // res.status(200).json({ msg: 'insert successfully'});
        let footer = await FooterModel.selectFooter();
        res.send(footer);
    };

    managerDeleteFooter = async (req, res, next) => {
        const { id: id } = req.params
        let footer = await FooterModel.deleteFooter(id);
        // res.status(200).json({ msg: 'delete successfully'});
        let footer = await FooterModel.selectFooter();
        res.send(footer);
    };

    managerUpdateFooter = async (req, res, next) => {
        const {type_id, title, footer_id:id} = req.body
        const result = await FooterModel.updateFooter({type_id, title, id})
        // res.status(200).json({ msg: 'update successfully'});
        let footer = await FooterModel.selectFooter();
        res.send(footer);
    };

}

module.exports = new FooterController;