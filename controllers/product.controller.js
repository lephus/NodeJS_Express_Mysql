const ProductModel = require('../models/product.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Product Controller
 ******************************************************************************/
class ProductController {
    getAllProduct = async (req, res, next) => {
        let ProductList = await ProductModel.select();
        res.send(ProductList);
    };

    getProductById = async (req, res, next) => {
        const { id: id } = req.params
        let ProductList = await ProductModel.findOne(id);
        res.send(ProductList[0]);
    };

    createProduct = async (req, res, next) => {
        const {category_id, pro_title, pro_subtitle, pro_image, number1, number2, number3, image1, image2, image3, content1, content2, content3} = req.body
        let result = await ProductModel.create(category_id, pro_title, pro_subtitle, pro_image, number1, number2, number3, image1, image2, image3, content1, content2, content3);
        // res.status(200).json({ msg: 'insert successfully'});
        let ProductList = await ProductModel.select();
        res.send(ProductList);
    };

    deleteProduct = async (req, res, next) => {
        const { id: id } = req.params
        let ProductResult = await ProductModel.delete(id);
        if(!ProductResult){
            return res.status(404).json({ msg: 'delete failed'});
        }
        // return res.status(200).json({ msg: 'delete successfully'});
        let ProductList = await ProductModel.select();
        res.send(ProductList);
    };

    updateProduct =  async (req, res, next) => {
        const {pro_id, category_id, pro_title, pro_subtitle, pro_image, number1, number2, number3, image1, image2, image3, content1, content2, content3} = req.body
        let result = await ProductModel.update(pro_id, category_id, pro_title, pro_subtitle, pro_image, number1, number2, number3, image1, image2, image3, content1, content2, content3);
        if(!result){
            return res.status(404).json({ msg: 'update failed'});
        }
        // return res.status(200).json({ msg: 'update successfully'});
        let ProductList = await ProductModel.select();
        res.send(ProductList);
    };

}

module.exports = new ProductController;