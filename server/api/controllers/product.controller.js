const Product = require('../models/product.model');
// const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

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
        const { name, originalPrice, sellingPrice, productType, brandType, isActive } = req.body;
        const filePath = req.file ? `/uploads/${req.file.filename}` : '';

        const product = new Product({ name, originalPrice, sellingPrice, productType, brandType, isActive, filePath });
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
        const { productId, name, sellingPrice, originalPrice, productType, brandType, isActive } = req.body;

        // Optionally use req.file if a new file was uploaded
        const updateData = {
            name,
            sellingPrice,
            originalPrice,
            productType,
            brandType,
            isActive,
        };

        if (req.file) {
            updateData.filePath = req.file ? `/uploads/${req.file.filename}` : '';
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
        const { searchTerm, brand, sortOption, page, pageSize, productType } = req.body;

        const filter = {};
        if (searchTerm) {
            filter.name = { $regex: searchTerm, $options: 'i' };
        }
        if (brand) {
            filter.brandType = brand;
        }
        if (productType) {
            filter.productType = productType;
        }

        const sort = {};
        if (sortOption === 'priceLowHigh') {
            sort.sellingPrice = 1;
        } else if (sortOption === 'priceHighLow') {
            sort.sellingPrice = -1;
        }

        const totalItems = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .sort(sort)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.json({ products, totalItems });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.getProductsCounts = async (req, res) => {
    try {
        const { productType } = req.body;

        let intelCounts = 0;
        let amdCounts = 0;
        let counts;
        if (productType === 'Processor') {
            counts = await Product.aggregate([
                { $match: { brandType: { $in: ['Intel', 'AMD'] } } },
                {
                    $group: {
                        _id: '$brandType',
                        count: { $sum: 1 }
                    }
                }
            ]);
        }

        res.json({ brandCounts: counts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}