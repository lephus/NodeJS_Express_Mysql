const AdminModel = require('../models/admin.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              admin Controller
 ******************************************************************************/
class AdminController {
    getAllAdmin = async (req, res, next) => {
        let AdminList = await AdminModel.select();
        res.send(AdminList);
    };

    getAdminById = async (req, res, next) => {
        const admin = await AdminModel.findOne({ admin_id: req.params.id });
        if (!admin) {
            throw new HttpException(404, 'User not found');
        }
        const { password, ...userWithoutPassword } = admin;

        res.send(userWithoutPassword);
    };

    createAdmin = async (req, res, next) => {
        this.checkValidation(req);
        const _userName = req.body.admin_username
        const checkExit = await AdminModel.checkExit(_userName );
        if (checkExit.length > 0) {
            throw new HttpException(400, 'userName is exit');
        }
        const result = await AdminModel.create(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        // res.status(201).send('Admin was created!');
        let AdminList = await AdminModel.select();
        res.send(AdminList);
    };


    updateAdmin = async (req, res, next) => {
        const { fullname, phone, address, admin_id:id } = req.body;

        const result = await AdminModel.update(fullname, phone, address, id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'admin not found' :
            affectedRows && changedRows ? 'admin updated successfully' : 'Updated failed';

        // res.send({ message, info });
        const admin = await AdminModel.findOne({ id });
        if (!admin) {
            throw new HttpException(404, 'User not found');
        }
        const { password, ...userWithoutPassword } = admin;

        res.send(userWithoutPassword);


    };

    deleteAdmin = async (req, res, next) => {
        const result = await AdminModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'admin not found');
        }
        // res.send('admin has been deleted');
        let AdminList = await AdminModel.select();
        res.send(AdminList);

    };

    adminLogin = async (req, res, next) => {
        this.checkValidation(req);

        const { username, password } = req.body;
        const admin = await AdminModel.login({ username, password });
        if (!admin || admin.length ==0) {
            throw new HttpException(401, 'Login failed');
        }
        const secretKey = "projectbiatuoigialai_phu_long_deptrai_482739302893729272";
        const token = jwt.sign({ admin_id: admin[0].admin_id.toString(), admin_username:admin[0].admin_username.toString() }, secretKey, {
            expiresIn: '24h'
        });

        res.send({ msg:"login success", token });
    };

    adminUpdatePassword = async (req, res, next) => {
        const { passwordNew, passwordOld, admin_id:id } = req.body;

        const result = await AdminModel.updatePassword( passwordNew, passwordOld, id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }
        // res.send({msg:"update password is success"});

        const admin = await AdminModel.findOne({ id });
        if (!admin) {
            throw new HttpException(404, 'User not found');
        }
        const { password, ...userWithoutPassword } = admin;

        res.send(userWithoutPassword);
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}

module.exports = new AdminController;