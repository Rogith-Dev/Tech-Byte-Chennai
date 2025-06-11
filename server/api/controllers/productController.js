const Product = require('../models/dummy');


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}

exports.getProductById = async (req, res) => {
    console.log("product id", req.params.id)
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                product,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const filePath = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : '';

        const formData = new FormData({ name, email, phone, filePath });
        await formData.save();
        res.status(201).json({ success: true, data: formData });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


exports.getAllForms = async (req, res) => {
    try {
        const forms = await FormData.find();
        res.status(200).json(forms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};