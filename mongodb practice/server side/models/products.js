const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  stock_quantity:{
    type: Number,
    integer:true
  },
  price: Number,
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' 
  }
}, { collection: 'products' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
