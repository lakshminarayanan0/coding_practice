const Transaction = require("./models/transactions");
const Customer = require("./models/customers");
const Purchase = require("./models/purchases");
const Product = require("./models/products");
const Category = require("./models/categories");
const mongoose= require("mongoose");
const redisClient = require("./redis/redis");
// const redisCache=require('./redis/redisCache')





async function topSalesToday(req, res, next) {
    const targetDate = new Date('2023-12-01');
    const key = "topsalestoday";

    try{
        const data= await redisClient.get(key);
        console.log("Searching cache for match");

        if(data !==null){
            console.log("cache found");
            return res.json(JSON.parse(data))
        }else{
            console.log("no cache found");
            const result=await  Transaction.find({
                date_of_transaction: {
                    $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
                    $lt: new Date(targetDate.setHours(23, 59, 59, 999))
                }
            })
                .populate({
                    path: 'customer_id',
                    model: Customer,
                    select: 'first_name last_name phone',
                    options: { collation: { locale: 'en', strength: 2 } }
                })
                .sort({ purchased_amount: -1 })
                .limit(10)
                console.log("saving to cache");
                await redisClient.setEx(key, 3600, JSON.stringify(result))
                console.log("from db");
                res.json(result);
        }
    }catch(err){
        console.log(err.message)
        res.status(500).send({ message: "Internal server error" });

    }
}


// Top sales this month by customers


const topSalesThisMonth = (req,res,next) => {

  Transaction.aggregate([
    {
      $match: {
        date_of_transaction: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
        }
      }
    },
    {
      $group: {
        _id: '$customer_id',
        totalPurchasedAmount: { $sum: '$purchased_amount' }
      }
    },
    {
      $lookup: {
        from: Customer.collection.name,
        localField: '_id',
        foreignField: '_id',
        as: 'customerDetails'
      }
    },
    {
      $unwind: '$customerDetails' 
    },
    {
      $project: {
        _id: 0,
        customer_id: '$_id',
        totalPurchasedAmount: 1,
        'customerDetails.first_name': 1,
        'customerDetails.last_name': 1,
        'customerDetails.phone': 1
      }
    },
    {
      $sort: {
        totalPurchasedAmount: -1 
      }
    },
    {
      $limit: 10
    }
  ])
  .then(result=>res.json(result))
  .catch(err=>{
    console.log(err.message);
    res.status(500).send({message:"Internal server error"})
})
   
  };
  

  // top sales this month by customers over 50000

  const topSalesThisMonthOver50000 =  (req,res,next) => {

    Transaction.aggregate([
      {
        $match: {
          date_of_transaction: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
          }
        }
      },
      {
        $group: {
          _id: '$customer_id',
          totalPurchasedAmount: { $sum: '$purchased_amount' }
        }
      },
      {
       $match:{
          totalPurchasedAmount:{ $gte:50000}
       }
      },
      {
        $lookup: {
          from: Customer.collection.name, 
          localField: '_id',
          foreignField: '_id',
          as: 'customerDetails'
        }
      },
      {
        $unwind: '$customerDetails' 
      },
      {
        $project: {
          _id: 0,
          customer_id: '$_id',
          totalPurchasedAmount: 1,
          'customerDetails.first_name': 1,
          'customerDetails.last_name': 1,
          'customerDetails.phone': 1
        }
      },
      {
        $sort: {
          totalPurchasedAmount: -1 
        }
      },
      {
        $limit: 10
      }
    ])
    .then(result=>res.json(result))
    .catch(err=>{
      console.log(err.message);
      res.status(500).send({message:"Internal server error"})
  })
    
  };


  //most sold products this month


  const mostSoldProducts =  (req,res,next) => {

    Purchase.aggregate([
      {
        $lookup: {
          from: Product.collection.name,
          localField: "product_id",
          foreignField: "_id",
          as: "products"
        }
      },
      {
        $unwind: "$products"
      },
      {
        $lookup: {
          from: Transaction.collection.name,
          localField: "transaction_id",
          foreignField: "_id",
          as: "transactions"
        }
      },
      {
        $unwind: "$transactions"
      },
      {
          $lookup: {
            from:Category.collection.name,
            localField: "products.category_id",
            foreignField: "_id",
            as: "categories"
          }
        },
        {
          $unwind: "$categories"
        },
  
        {
          $match: {
            "transactions.date_of_transaction": {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
              $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
            }
          }
        },
        {
          $group: {
            _id: "$product_id",
            totalQuantity: { $sum: "$quantity_purchased" },
            name: { $first: "$products.name" },
            category: { $first: "$categories.category" }
          }
        },
        {
          $sort: { totalQuantity: -1 }
        },
        {
          $limit: 10
        },
        {
          $project: {
            _id: 0,
            name: 1,
            sold_quantity: "$totalQuantity",
            category: 1
          }
        }
    ])
    .then(result=>res.json(result))
    .catch(err=>{
      console.log(err.message);
      res.status(500).send({message:"Internal server error"})
  })
  };
  
  
  //most sold products over 500 this month

  const mostSoldProductsOver500 = (req,res,next) => {


    Purchase.aggregate([
      {
        $lookup: {
          from: Product.collection.name,
          localField: "product_id",
          foreignField: "_id",
          as: "products"
        }
      },
      {
        $unwind: "$products"
      },
      {
        $lookup: {
          from: Transaction.collection.name,
          localField: "transaction_id",
          foreignField: "_id",
          as: "transactions"
        }
      },
      {
        $unwind: "$transactions"
      },
      {
          $lookup: {
            from:Category.collection.name,
            localField: "products.category_id",
            foreignField: "_id",
            as: "categories"
          }
        },
        {
          $unwind: "$categories"
        },
  
        {
          $match: {
            "transactions.date_of_transaction": {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
              $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
            }
          }
        },
        {
          $group: {
            _id: "$product_id",
            totalQuantity: { $sum: "$quantity_purchased" },
            name: { $first: "$products.name" },
            category: { $first: "$categories.category" }
          }
        },
        {
         $match:{
          totalQuantity:{$gte:500}
         }
        },
        {
          $sort: { totalQuantity: -1 }
        },
        {
          $limit: 10
        },
        {
          $project: {
            _id: 0,
            name: 1,
            sold_quantity: "$totalQuantity",
            category: 1
          }
        }
    ])
    .then(result=>res.json(result))
  .catch(err=>{
    console.log(err.message);
    res.status(500).send({message:"Internal server error"})
})

  };


  //revenue by electronics this month

const electronics= (req,res,next)=>{


  Product.aggregate([
    {
      $lookup:{
        from:Purchase.collection.name,
        localField:"_id",
        foreignField:"product_id",
        as:"purchases"
      }
    },
    {
      $unwind:{
        path:"$purchases",
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $lookup:{
        from:Transaction.collection.name,
        let:{ transactionId:"$purchases.transaction_id"},
        pipeline:[
          {
            $match:{
              $expr:{
                $and:[
                  {$eq:["$_id","$transactionId"]},
                  {$gte:[ 
                    "date_of_transaction", new Date(new Date().getFullYear(),new Date().getMonth(),1)
                  ]},
                  {$lt:[ 
                    "date_of_transaction", new Date(new Date().getFullYear(),new Date().getMonth()+1,0,23,59,59)
                  ]}
                ]
              }
            }
          }
        ],
        as: "transactions"
      }
    },
    {
      $unwind: {
        path: "$transactions",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: Category.collection.name,
        localField: "category_id",
        foreignField: "_id",
        as: "categories"
      }
    },
    {
      $unwind: {
        path: "$categories",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match:{
        "categories.category":"electronics"
      }
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        totalSoldQuantity: { $sum: "$purchases.quantity_purchased" },
        totalSoldAmount: { $sum: "$purchases.subtotal" }
      }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        totalSoldQuantity: 1,
        totalSoldAmount: 1
      }
    },
    {
      $sort: { totalSoldAmount: -1 }
    }
  ])
  .then(result=>res.json(result))
  .catch(err=>{
    console.log(err.message);
    res.status(500).send({message:"Internal server error"})
})
  
}



//unsold products this month


const unsoldProducts =  (req,res,next) => {

  Product.aggregate([
    {
      $lookup: {
        from: Purchase.collection.name,
        let: { productId: "$_id" },
        pipeline: [
          {
            $lookup: {
              from: Transaction.collection.name,
              localField: "transaction_id",
              foreignField: "_id",
              as: "transaction",
            },
          },
          {
            $match: {
              $expr: { $eq: ["$product_id", "$$productId"] },
              "transaction.date_of_transaction": {
                $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59),
              },
            },
          },
        ],
        as: "purchases",
      },
    },
    {
      $match: {
        purchases: { $size: 0 }, 
      },
    },
    {
      $lookup: {
        from: Category.collection.name,
        localField: "category_id",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $unwind: "$categories",
    },
    {
      $project: {
        name: 1,
        category: "$categories.category",
      },
    },
  ])
  .then(result=>res.json(result))
  .catch(err=>{
    console.log(err.message);
    res.status(500).send({message:"Internal server error"})
})
};


//unsold using mongoose transaction

const unsoldProductsUsingTransaction = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const transactions = await Transaction.find(
      {
        date_of_transaction: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59),
        },
      },
      { _id: 1 }
    ).session(session);

    const transactionIds = transactions.map(transaction => transaction._id);

    const purchases = await Purchase.aggregate(
      [
        {
          $match: {
            transaction_id: { $in: transactionIds },
          },
        },
        {
          $group: {
            _id: "$product_id",
            total_sold: { $sum: "$quantity_purchased" },
          },
        },
        {
          $project: {
            _id: 1,
            total_sold: 1,
          },
        },
      ],
      { session: session }
    );

    const purchasedProductIds = purchases.map(purchase => purchase._id);

    const unsoldProducts = await Product.aggregate([
      {
        $match: {
          _id: { $nin: purchasedProductIds },
        },
      },
      {
        $lookup: {
          from: Category.collection.name,
          localField: "category_id",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $unwind: "$categories",
      },
      {
        $project: {
          name: 1,
          category: "$categories.category",
        },
      },
    ]).session(session);

    console.log(unsoldProducts, unsoldProducts.length);

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err.message);
  }
};


  
module.exports = {
  topSalesToday,
  topSalesThisMonth,
  topSalesThisMonthOver50000,
  mostSoldProducts,
  mostSoldProductsOver500,
  electronics,
  unsoldProducts,
  unsoldProductsUsingTransaction
};
