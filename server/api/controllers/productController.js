const Product=require('../models/dummy');


exports.getAllProducts=async(req,res)=>{
    try {
        const products=await Product.find();
        res.status(200).json({
            status:'success',
            results:products.length,
            data:{
                products
            }
        })
    } catch (error) {
        res.status(404).json({
            status:'fail',
            message:error
        })
    }
}

exports.getProductById= async (req, res) => {
    console.log("product id",req.params.id)
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json({
          status: 'success',
          data: {
              product,
            },
        });
    }catch (error) {
        res.status(404).json({
            status:'fail',
            message:error
        })
    }
}

exports.createProduct =async (req, res,next) => {
    try{
 const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct
      }
    })
    }catch (error) {
        res.status(404).json({
            status:'fail',
            message:error
        })
    }
   
};