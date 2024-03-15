const pool = require("./db")
const queries=require('./queries')

const getTodayTopSales=(req,res)=>{
       pool.query(queries.getTodayTopSales,(err,result)=>{
           if(err) throw err;
           console.log(result.rows);
           res.status(200).json(result.rows);
       })
}

const getTopSalesThisMonth=(req,res)=>{
    pool.query(queries.getTopSalesThisMonth,(err,result)=>{
        if(err) throw err;
        res.status(200).json(result.rows);
    })
}

const getMostSoldProductsThisMonth=(req,res)=>{
    pool.query(queries.getMostSoldProductsThisMonth,(err,result)=>{
        if(err) throw err;
        res.status(200).json(result.rows);
    })
}

const getUnsoldProductsThisMonth=(req,res)=>{
    pool.query(queries.getUnsoldProductsThisMonth,(err,result)=>{
        if(err) throw err;
        res.status(200).json(result.rows);
    })
}

const getRevenueByElectronicsThisMonth=(req,res)=>{
    pool.query(queries.getRevenueByElectronicsThisMonth,(err,result)=>{
        if(err) throw err;
        res.status(200).json(result.rows);
    })
}

const getProductsSoldOver500ThisMonth=(req,res)=>{
    pool.query(queries.getProductsSoldOver500ThisMonth,(err,result)=>{
        if(err) throw err;
        res.status(200).json(result.rows);
    })
}

const getCustomersPurchasedMoreThan5000ThisMonth=(req,res)=>{
    pool.query(queries.getCustomersPurchasedMoreThan5000ThisMonth,(err,result)=>{
        if(err) throw err;
        res.status(200).json(result.rows);
    })
}

const getProducts=(req,res)=>{
    pool.query(queries.getProducts,(err,result)=>{
        if(err) throw err
        res.status(200).json(result.rows)
    })
}


const postProduct = (req, res) => {
    console.log(req.body);
    const { name, price, stock, category } = req.body;
  
    pool
      .query(queries.postProduct, [name, category, stock, price])
      .then(() => {
        console.log("Product added successfully");
        return pool.query(queries.getProductDetailsByName, [name]);
      })
      .then(result => {
        const addedProduct = result.rows[0];
        res.status(200).json({ success: true, message: 'Product added successfully.', data: addedProduct });
      })
      .catch((err) => {
        console.error('Error adding product:', err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
      });
  };
  
  

const deleteProduct=(req,res)=>{
    pool.query(queries.deleteProduct,[req.params.id],(err,result)=>{
        if(err) throw err;
        console.log("product with id: "+req.params.id+" deleted successfully.");
        res.status(200).json({message:`product with id ${req.params.id} deleted successfully`});
    })
}


const getProductById=(req,res)=>{
    pool.query(queries.getProductDetailsById,[req.params.id],(err,result)=>{
        if(err) throw err
        res.status(200).json(result.rows[0])
    })
}

const editProduct = (req, res) => {
    const { name, price, stock, category } = req.body;
  
    pool.query(queries.editProduct, [name, price, category, stock, req.params.id])
      .then(() => {
        console.log("Product edited successfully");
        return pool.query(queries.getProductDetailsById, [req.params.id]);
      })
      .then(result => {
        const editedProduct = result.rows[0];
        res.status(200).json({ success: true, message: 'Product edited successfully.', data: editedProduct });
      })
      .catch((err) => {
        console.error('Error editing product:', err);
  
        if (!res.headersSent) {
          res.status(500).json({ success: false, message: 'Internal server error.' });
        }
      });
  };
  
  

const getCategories=(req,res)=>{

    pool.query(queries.getCategories,(err,result)=>{
        if(err) throw err;
        res.status(200).json(result.rows)
    })

}


module.exports={
    getTodayTopSales,
    getTopSalesThisMonth,
    getMostSoldProductsThisMonth,
    getUnsoldProductsThisMonth,
    getRevenueByElectronicsThisMonth,
    getProductsSoldOver500ThisMonth,
    getCustomersPurchasedMoreThan5000ThisMonth,
    getProducts,
    postProduct,
    deleteProduct,
    editProduct,
    getProductById,
    getCategories


}