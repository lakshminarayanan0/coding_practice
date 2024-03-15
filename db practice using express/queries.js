//Top sales today

db.transactions.aggregate([
    {
      $match: {
        date_of_transaction: {
          $gte: new Date(new Date().setHours(0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59))
        }
      }
    },
    {
      $lookup: {
        from: "customers",
        localField: "customer_id",
        foreignField: "_id",
        as: "customer"
      }
    },
    {
      $unwind: "$customer"
    },
    {
      $project: {
        _id: 1,
        purchased_amount: 1,
        date_of_transaction: 1,
        "customer.first_name": 1,
        "customer.last_name": 1,
        "customer.phone": 1
      }
    },
    {
      $sort: { purchased_amount: -1 }
    },
    {
      $limit: 10
    }
  ]).toArray()
  
  
  
  // most sold products this month
  
  db.purchases.aggregate([
    {
      $lookup: {
        from: "products",
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
        from: "transactions",
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
          from: "categories",
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
  ]).toArray()
  
  // most sold products over 500 this month
  
  db.purchases.aggregate([
    {
      $lookup: {
        from: "products",
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
        from: "transactions",
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
          from: "categories",
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
           totalQuantity:{
            $gt:500
           }
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
  ]).toArray()

  
  
  
  // top sales by customers this month
  
  db.transactions.aggregate([
    {
      $match: {
        "date_of_transaction": {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
        }
      }
    },
    {
      $group: {
        _id: "$customer_id",
        totalAmount: { $sum: "$purchased_amount" }
      }
    },
    {
      $lookup: {
        from: "customers",
        localField: "_id",
        foreignField: "_id",
        as: "customerDetails"
      }
    },
    {
      $unwind: "$customerDetails"
    },
    {
      $project: {
        _id: 0,
        first_name: "$customerDetails.first_name",
        last_name: "$customerDetails.last_name",
        phone: "$customerDetails.phone",
        totalAmount: 1
      }
    },
    {
      $sort: { totalAmount: -1 }
    },
    {
      $limit: 10
    }
  ]).toArray()
  
  
  
  
  
  //revenue by electronics products this month
  
  db.products.aggregate([
    {
      $lookup: {
        from: "purchases",
        localField: "_id",
        foreignField: "product_id",
        as: "purchases"
      }
    },
    {
      $unwind: {
        path: "$purchases",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "transactions",
        let: { transactionId: "$purchases.transaction_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$transactionId"] },
                  {
                    $gte: [
                      "$date_of_transaction",
                      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                    ]
                  },
                  {
                    $lt: [
                      "$date_of_transaction",
                      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
                    ]
                  }
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
        from: "categories",
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
      $match: {
        "categories.category": "electronics"
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
  ]).toArray()
  
  
  
  
  //unsold products this month
  
  
  db.products.aggregate([
    {
      $lookup: {
        from: "purchases",
        localField: "_id",
        foreignField: "product_id",
        as: "purchases"
      }
    },
  
    {
      $lookup: {
        from: "transactions",
        localField: "purchases.product_id",
        foreignField: "_id",
        as: "transactions"
      }
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
        $match: {
          purchases: { $size: 0 }
        }
      },
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "categories"
      }
    },
    {
      $unwind: "$categories"
    },
    {
      $project: {
        _id: 0,
        name: 1,
        category: "$categories.category"
      }
    }
  ]).toArray()


  // sales more than 50000 this month

  db.transactions.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customer_id",
        foreignField: "_id",
        as: "customers"
      }
    },
    {
      $unwind: "$customers"
    },
    {
      $match: {
        "date_of_transaction": {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
        }
      }
    },
    {
      $group: {
        _id: "$customers._id",
        first_name: { $first: "$customers.first_name" },
        last_name: { $first: "$customers.last_name" },
        phone: { $first: "$customers.phone" },
        total_sales: { $sum: "$purchased_amount" }
      }
    },
    {
      $match:{
        total_sales:{
            $gte:50000
        }
      }
    },
    {
      $project: {
        _id: 0,
        first_name: 1,
        last_name: 1,
        phone: 1,
        total_sales: 1
      }
    },
    {
        $sort:{
            total_sales:-1
        }
    },
    {
        $limit:10
    }
  ]).toArray()
  


