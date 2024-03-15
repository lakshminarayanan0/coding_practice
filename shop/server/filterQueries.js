const { Op } = require("sequelize");
const { User, Category, Transaction, Purchase, Product, sequelize, Customer } = require("./models");
const redisClient=require('./redis/redis');


async function signIn (req, res) {
    try {
      console.log(req.body); 
      const { username, password } = req.body;
      
      const authenticatedUser = await authenticateUser(username, password);
      console.log("authenticated user: ",authenticatedUser);
  
      if (authenticatedUser) {
        const userId=authenticatedUser.userId
        if(req.session.user){
          console.log(userId,req.session.user.userId);
          if(req.session.user.userId==userId){
            return res.json({ success: false, message: "User login already" });
          }
        }
        req.session.user = {
          userId: authenticatedUser.userId,
          username: authenticatedUser.username,
          email: authenticatedUser.email,
          phone: authenticatedUser.phone,
        };
        req.session.save()
      console.log("session user: ",req.session.user);
        // res.redirect('/home')
        // res.json({success:true, message:"successfully login as "+req.session.user.username,user:req.session.user})
        return res.redirect('/home')
      } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

// async function signIn(req, res) {
//   try {
//     console.log(req.body);
//     const { username, password } = req.body;

//     const authenticatedUser = await authenticateUser(username, password);
//     console.log("authenticated user: ", authenticatedUser);

//     const userSetKey = "myapp:userIds";
//     const userSetMembers = await redisClient.sMembers(userSetKey);
   

//     if (authenticatedUser) {
//       const userId = authenticatedUser.userId;

//       if (userSetMembers.includes(userId)) {
//         console.log("User already logged in");
//         return res.json({ success: false, message: "User login already" });
//       }

//       // // Check if the user is already logged in
//       // if (req.session.user && req.session.user.userId === userId) {
//       //   return res.json({ success: false, message: "User login already" });
//       // }

//       // Add the new user's ID to the set
//       const userSetKey = "myapp:userIds";
//       await redisClient.sAdd(userSetKey, userId);

//       // Set the session data
//       req.session.user = {
//         userId: userId,
//         username: authenticatedUser.username,
//         email: authenticatedUser.email,
//         phone: authenticatedUser.phone,
//       };

//       // Save the session
//       req.session.save((err) => {
//         if (err) {
//           console.error("Error saving session:", err);
//           return res.status(500).json({ success: false, error: 'Internal Server Error' });
//         }

//         console.log("session user: ", req.session.user);
//         res.json({
//           success: true,
//           message: "Successfully logged in as " + req.session.user.username,
//           user: req.session.user,
//         });
//       });
//     } else {
//       res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// }


// async function signIn(req, res) {
//   try {
//     console.log(req.body);
//     const { username, password } = req.body;

//     const authenticatedUser = await authenticateUser(username, password);
//     console.log("authenticated user: ", authenticatedUser);

//     if (authenticatedUser) {
//       const userId = authenticatedUser.userId;
//       const sessionId = req.sessionID; // Get the session ID
//       console.log("userId ",userId,"  sessionId: ",sessionId);
//       // Check if the user is already logged in
//       if (req.session.user && req.session.user.userId === userId) {
//         return res.json({ success: false, message: "User login already" });
//       }

//       // Check if the session ID is already in the database
//       const existingSession = await Session.findOne({
//         where: { userId: userId },
//       });
//       console.log("existing sessions",existingSession);

//       if (existingSession) {
//         console.log("User already logged in");
//         return res.json({ success: false, message: "User login already" });
//       }

//       console.log("gonna create session for ",authenticatedUser.username);
//       // Create a new entry in the Session table
//       const newSession=await Session.create({
//         sid: sessionId,
//         userId: userId,
//       });
//       console.log(await newSession.json());

//       // Set the session data
//       req.session.user = {
//         userId: userId,
//         username: authenticatedUser.username,
//         email: authenticatedUser.email,
//         phone: authenticatedUser.phone,
//       };

//       // Save the session
//       req.session.save((err) => {
//         if (err) {
//           console.error("Error saving session:", err);
//           return res
//             .status(500)
//             .json({ success: false, error: "Internal Server Error" });
//         }

//         console.log("session user: ", req.session.user);
//         res.json({
//           success: true,
//           message:
//             "Successfully logged in as " + req.session.user.username,
//           user: req.session.user,
//         });
//       });
//     } else {
//       res
//         .status(401)
//         .json({ success: false, error: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ success: false, error: "Internal Server Error" });
//   }
// }



  async function authenticateUser(username, password) {

    const user = await User.findOne({
      where: {
        username: username,
        password: password,
      },
    });
  
    return user ? user.toJSON() : null;
  }


  async function unsoldProductsThisMonth(req,res,next){
    console.log(req.session.sessionID);
    if (!req.session.user) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
  }
  const userId = req.session.user.userId;
  const key=req.originalUrl.slice(1)+'_'+userId.replace('-','_')

  const data= await redisClient.get(key);
        console.log("Searching cache for match");

        if(data !==null){
            console.log("cache found");
            return res.json(JSON.parse(data))
        }
      else{

      
    Product.findAll({

      attributes:['product_id','name',[sequelize.col('Categories.category'),'category']],
      include:[
        {
          model:Purchase,
          as:"Purchases",
          required:false,
          attributes:[],
          include:[
            {
              model:Transaction,
              as:"Transactions",
              required:true,
              attributes:[],
              where: {
                userId:userId,
                transaction_date: {
                  [Op.and]: {
                    [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1), 
                    [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1), 
                  },
                },
              },
             }
          ],
         where:{
          userId:userId
         }
       
        },
        {
          model:Category,
          as:"Categories",
          attributes:[],
          where:{
            userId:userId
          }
        }
        
      ],
      where:{
        userId:userId,
        "$Purchases.product_id$":null,
        
      }
      
      
    }).then(async(prod)=>{
        console.log("saving to cache");
        await redisClient.setEx(key, 3600, JSON.stringify(prod))
        console.log("from db");
        res.json(prod)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: err });
    });

}
  }


  async function revenueByElectronics(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    const userId = req.session.user.userId;
    const key=req.originalUrl.slice(1)+"_"+userId.replace('-','_')

    const data=await redisClient.get(key)
    console.log("searching for cache");
    if(data!==null){
        console.log("match found in cache");
        return res.json(JSON.parse(data))
    }
    else{
    Product.findAll({
      attributes:[
        'product_id',
        'name',
      [sequelize.fn('coalesce',sequelize.fn('SUM',sequelize.col('Purchases.quantity')),0),'sold_quantity'],
      [sequelize.fn('coalesce',sequelize.fn('SUM',sequelize.col('Purchases.subtotal')),0),'total_purchased']
    
    ],
      
      include:[
        {
          model:Category,
          as:"Categories",
          attributes:[],
          required:true,
          where:{
            category:'electronics',
            userId:userId
          }
        },
        {
          model:Purchase,
          as:"Purchases",
          attributes:[],
          required:false,
          include:[
            {
              model:Transaction,
              as:'Transactions',
              attributes:[],
              required:false,
              where:{
                userId:userId,
                transaction_date:{
                  [Op.and]:{
                    [Op.gte]:new Date(new Date().getFullYear(),new Date().getMonth(),1),
                    [Op.lt]:new Date(new Date().getFullYear(),new Date().getMonth()+1,1)
                  }
                }
              }
            }
          ],
          where:{
            userId:userId
          }
        }
      ],
      where:{
        userId:userId
      },
      
      group:['Product.product_id'],
      order:[[sequelize.literal('total_purchased desc')]]
    })
        .then(async(products) => {
            console.log("saving to cache");
            await redisClient.setEx(key,3600,JSON.stringify(products))
            console.log("From db");
            res.json(products)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: err });
        });
    }
}

async function topsalesToday(req,res,next){

    if(!req.session.user){
      res.status(500).json({success:false,message:"User not authenticated!"})
    }
     const userId=req.session.user.userId

     const key=req.originalUrl.slice(1)+"_"+userId.replace('-','_')
     console.log("searching for cache");
     const data=await redisClient.get(key)
     if(data!==null){
         console.log("Match found");
        return res.json(JSON.parse(data))
     }else{
        Transaction.findAll({
            attributes:[
              [sequelize.col('Customers.name'),'name'],
              [sequelize.col('Customers.phone'),'phone'],
              [sequelize.col('total_amount'),'sales_amount']
            ],
            include:[
              {
                model:Customer,
                as:"Customers",
                attributes:[],
                where:{
                  userId:userId,
                 
                }
              }
            ],
            where:{
              userId:userId,
              transaction_date:{
                [Op.and]:{
                  [Op.gte]:new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),0,0,0),
                  [Op.lt]:new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),23,59,59)
    
    
                }
              }
    
            },
            order:[sequelize.literal('sales_amount desc')],
            limit:10
          }).then(async(sales)=>{
            console.log("saving to cache");
            await redisClient.setEx(key,3600,JSON.stringify(sales))
            console.log("from db");
            res.json(sales)
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ msg: err });
          });
     }
   }


   async function mostSoldThisMonth(req,res,next){
    if(!req.session.user){
     return res.status(500).json({success:false,message:"User not authenticated!"})
    }
     const userId=req.session.user.userId

     const key=req.originalUrl.slice(1)+"_"+userId.replace('-','_')
     console.log("searching for cache");
     const data=await redisClient.get(key)
     if(data!==null){
         console.log("Match found");
        return res.json(JSON.parse(data))
     }
     else{
     Purchase.findAll({
      attributes:[
        [sequelize.col('Products.name'),'name'],
        [sequelize.col('Products->Categories.category'),'category'],
        [sequelize.fn('sum',sequelize.col('quantity')),'total_sold']
      ],
      include:[
        {
          model:Product,
          as:"Products",
          attributes:[],
          where:{
            userId:userId
          },
          include:[
            {
              model:Category,
              as:"Categories",
              attributes:[],
              where:{
                userId:userId
              }
           }
          ]
        },
        {
          model:Transaction,
          as:"Transactions",
          attributes:[],
          where:{
            userId:userId,
            transaction_date:{
              [Op.and]:{
                [Op.gte]:new Date(new Date().getFullYear(),new Date().getMonth(),1),
                [Op.lt]:new Date(new Date().getFullYear(),new Date().getMonth()+1,1)
              }
            }
          }
        },
        
      ],
      where:{
        userId:userId
      },
      group:['Products.name','Products->Categories.category'],
      order:[sequelize.literal('total_sold desc')],
      limit:10
     }).then(async(products)=>{
        console.log("saving to cache");
        await redisClient.setEx(key,3600,JSON.stringify(products))
        console.log("from db");
        res.json(products)
     })
     .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: err });
       });
     }
}


   async function mostSoldOver500(req,res,next){
    console.log(req.session.user);
    if(!req.session.user){
      res.status(500).json({success:false,message:"User not authenticated!"})
    }
     const userId=req.session.user.userId
     
     const key=req.originalUrl.slice(1)+"_"+userId.replace('-','_')
     console.log("searching for cache");
     const data=await redisClient.get(key)
     if(data!==null){
         console.log("Match found");
        return res.json(JSON.parse(data))
     }
     else{
     Purchase.findAll({
      attributes:[
        [sequelize.col('Products.name'),'name'],
        [sequelize.col('Products->Categories.category'),'category'],
        [sequelize.fn('sum',sequelize.col('quantity')),'total_sold']
      ],
      include:[
        {
          model:Product,
          as:"Products",
          attributes:[],
          where:{
            userId:userId
          },
          include:[
            {
              model:Category,
              as:"Categories",
              attributes:[],
              where:{
                userId:userId
              }
           }
          ]
        },
        {
          model:Transaction,
          as:"Transactions",
          attributes:[],
          where:{
            userId:userId,
            transaction_date:{
              [Op.and]:{
                [Op.gte]:new Date(new Date().getFullYear(),new Date().getMonth(),1),
                [Op.lt]:new Date(new Date().getFullYear(),new Date().getMonth()+1,1)
              }
            }
          }
        },
        
      ],
      where:{
        userId:userId
      },
      group:['Products.name','Products->Categories.category'],
      having:sequelize.literal('sum("Purchase"."quantity") >500'),
      order:[sequelize.literal('total_sold desc')],
      // limit:10
     }).then(async(products)=>{
        console.log("saving to cache");
        await redisClient.setEx(key,3600,JSON.stringify(products))
        console.log("from db");
        res.json(products)
     })
     .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: err });
      });
   }
   }

 async  function topSalesByCustomerThisMonth(req,res,next){
    if(!req.session.user){
      res.status(500).json({success:false,message:"User not authenticated!"})
    }
     const userId=req.session.user.userId

     const key=req.originalUrl.slice(1)+"_"+userId.replace('-','_')
     console.log("searching for cache");
     const data=await redisClient.get(key)
     if(data!==null){
         console.log("Match found");
        return res.json(JSON.parse(data))
     }
     else{

     Transaction.findAll({
      attributes:[
        [sequelize.col('Customers.name'),'customer_name'],
        [sequelize.fn('sum',sequelize.col('total_amount')),'total_sales_this_month']
      ],
      include:[
        {
          model:Customer,
          as:"Customers",
          attributes:[],
          where:{
            userId:userId
          }
        }
      ],
      where:{
        userId:userId,
        transaction_date:{
          [Op.and]:{
            [Op.gte]:new Date(new Date().getFullYear(),new Date().getMonth(),1),
            [Op.lt]:new Date(new Date().getFullYear(),new Date().getMonth()+1,1)
          }
        }
      },
      group:['Transaction.customer_id',"Customers.name"],
      order:[sequelize.literal('total_sales_this_month desc')],
      limit:10
     }).then(async(customer)=>{
        console.log("saving to cache");
        await redisClient.setEx(key,3600,JSON.stringify(customer))
        console.log("from db");
        res.json(customer)
     })
     .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: err });
       }
     )
    }
    
    }

 async function topSalesByCustomerThisMonthOver50000(req,res,next){
        if(!req.session.user){
         return res.status(500).json({success:false,message:"User not authenticated!"})
        }
         const userId=req.session.user.userId

         const key=req.originalUrl.slice(1)+"_"+userId.replace('-','_')
         console.log("searching for cache");
         const data=await redisClient.get(key)
         if(data!==null){
             console.log("Match found");
            return res.json(JSON.parse(data))
         }
         else{
    
         Transaction.findAll({
          attributes:[
            [sequelize.col('Customers.name'),'customer_name'],
            [sequelize.fn('sum',sequelize.col('total_amount')),'total_sales_this_month']
          ],
          include:[
            {
              model:Customer,
              as:"Customers",
              attributes:[],
              where:{
                userId:userId
              }
            }
          ],
          where:{
            userId:userId,
            transaction_date:{
              [Op.and]:{
                [Op.gte]:new Date(new Date().getFullYear(),new Date().getMonth(),1),
                [Op.lt]:new Date(new Date().getFullYear(),new Date().getMonth()+1,1)
              }
            }
          },
          group:['Transaction.customer_id',"Customers.name"],
          having:sequelize.literal('sum("Transaction"."total_amount") > 50000'),
          order:[sequelize.literal('total_sales_this_month desc')],
          // limit:10
         }).then(async(customer)=>{
            console.log("saving to cache");
            await redisClient.setEx(key,3600,JSON.stringify(customer))
            console.log("from db");
            res.json(customer)
         })
         .catch((err) => {
          console.log(err);
          res.status(500).json({ msg: err });
           }
         )
        
        }
    }


        async function addCategory(req, res) {
            try {
        
                if (!req.session.user) {
                    return res.status(401).json({ success: false, error: 'User not authenticated' });
                }
        
                const userId = req.session.user.userId;
                const { category, description } = req.body;
        
                const categoryEntry = await Category.create({
                    userId: userId,
                    category: category,
                    description: description,
                });
        
                res.json({ success: true, category: categoryEntry });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            }
        }


        async function addProduct(req,res){
            try {
          
              if (!req.session.user) {
                  return res.status(401).json({ success: false, error: 'User not authenticated' });
              }
        
              const userId = req.session.user.userId;
              const { name,category_id, stock_quantity,price } = req.body;
        
              const newproduct = await Product.create({
                  userId: userId,
                  name: name,
                  category_id: category_id,
                  stock_quantity:stock_quantity,
                  price:parseFloat(price)
              });
        
              res.json({ success: true, product: newproduct });
          } catch (error) {
              console.error(error);
              res.status(500).json({ success: false, error: 'Internal Server Error' });
          }
          }

          async function addCustomer(req,res){
            try {
              const { name,email, phone,address } = req.body;
          
              if (!req.session.user) {
                  return res.status(401).json({ success: false, error: 'User not authenticated' });
              }
        
              const userId = req.session.user.userId;
            
        
              const newCustomer = await Customer.create({
                  userId: userId,
                  name: name,
                  email: email,
                  phone:phone,
                  address:address
              });
        
              res.json({ success: true, customer: newCustomer });
          } catch (error) {
              console.error(error);
              res.status(500).json({ success: false, error: 'Internal Server Error' });
          }
          }

          async function addPurchases(req, res) {
            try {
              const purchaseData = req.body;
              const { customer_id, purchases, total_amount } = purchaseData;
              console.log(purchaseData);
              console.log(purchases);
              if (!req.session.user) {
                return res.status(401).json({ success: false, error: 'User not authenticated' });
              }
          
              const userId = req.session.user.userId;
              console.log(userId);
           
          
              await sequelize.transaction(async (t) => {
                const newTransaction = await Transaction.create(
                  {
                    customer_id: customer_id,
                    userId: userId,
                    total_amount: total_amount,
                  },
                  { transaction: t }
                );
          
                await Promise.all(
                  purchases.map(async (purchase) => {
                    const { product_id, quantity, subtotal } = purchase;
                    await Purchase.create(
                      { userId:userId,
                        transaction_id: newTransaction.transaction_id,
                        product_id: product_id,
                        quantity: quantity,
                        subtotal: subtotal,
                      },
                      { transaction: t }
                    );
                  })
                );
              });
          
              res.status(200).json({ success: true, message: 'Purchases added successfully' });
            } catch (err) {
              console.error(err);
              res.status(500).json({ success: false, error: 'Internal server error' });
            }
          }


          async function getCustomers(req,res){
            try {
          
              if (!req.session.user) {
                  return res.status(401).json({ success: false, error: 'User not authenticated' });
              }
        
              const userId = req.session.user.userId;
        
              const customers = await Customer.findAll({
                  where:{
                    userId: userId,
                  }
              });
        
              res.json({ success: true, customer: customers });
          } catch (error) {
              console.error(error);
              res.status(500).json({ success: false, error: 'Internal Server Error' });
          }
          }

          
          async function getProducts(req,res){
            try{
              if (!req.session.user) {
                return res.status(401).json({ success: false, error: 'User not authenticated' });
            }
        
             const userId = req.session.user.userId;
             console.log(userId);
            
             const products = await Product.findAll({
             where:{
              userId: userId,
             }
          });
        
          res.json({ success: true, product: products });
        
            }catch(err){
              console.log(err);
              res.status(500).json({ success: false, error: 'Internal Server Error' });
        
            }
          }



         async function logout (req, res) {
          const username=req.session.user.username
            req.session.destroy(err => {
                if (err) {
                    return console.log(err);
                }
                res.json({message:username+" logged out."})
            });
        }


  module.exports={
    signIn,
    unsoldProductsThisMonth,
    revenueByElectronics,
    topsalesToday,
    mostSoldThisMonth,
    mostSoldOver500,
    topSalesByCustomerThisMonth,
    topSalesByCustomerThisMonthOver50000,
    addCategory,
    addProduct,
    addCustomer,
    addPurchases,
    getCustomers,
    getProducts,
    logout
    


  }