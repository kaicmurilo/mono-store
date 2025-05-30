"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getAll = void 0;
const Product_1 = require("../models/Product");
const getAll = async (req, res) => {
    const products = await Product_1.Product.find();
    res.json(products);
};
exports.getAll = getAll;
const create = async (req, res) => {
    const product = new Product_1.Product(req.body);
    await product.save();
    res.status(201).json(product);
};
exports.create = create;
