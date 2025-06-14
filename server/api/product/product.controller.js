const Product = require('./product.model');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: 'success',
            results: products.length,
            data: products
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
        const { name, originalPrice, sellingPrice, productType, isActive } = req.body;
        const filePath = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : '';

        const product = new Product({ name, originalPrice, sellingPrice, productType, isActive, filePath });
        await product.save();
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getProductDetail = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { productId, name, sellingPrice, originalPrice, productType, isActive } = req.body;

        // Optionally use req.file if a new file was uploaded
        const updateData = {
            name,
            sellingPrice,
            originalPrice,
            productType,
            isActive,
        };

        if (req.file) {
            updateData.filePath = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : '';
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllForms = async (req, res) => {
    try {
        const forms = await Product.find();
        res.status(200).json(forms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductListByName = async (req, res) => {
    try {
        let input = req.body;
        const result = await Product.find({ productType: input.productType });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductsByFilter = async (req, res) => {
    try {
        let input = req.body;
        const result = await Product.find({
            name: { $regex: input.filter, $options: 'i' }
        });
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}