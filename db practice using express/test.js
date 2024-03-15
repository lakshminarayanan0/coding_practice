const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function performTransaction() {
  try {
    await client.connect();


    const session = client.startSession();

    try {

      session.startTransaction();


      const database = client.db('billing');
      const transactionsCollection = database.collection('transactions');
      const purchasesCollection = database.collection('purchases');
      const productsCollection = database.collection('products');

    
      const transactionData = {
        customer_id: new ObjectId("6566c406521014a328137d88"),
        purchased_amount: 0,
        date_of_transaction: new Date()
      };
      const transactionResult = await transactionsCollection.insertOne(transactionData, { session });
      const transactionId = transactionResult.insertedId;

      const purchasedProducts = [
        { product_id: new ObjectId("6566ca8d521014a328137e21"), quantity_purchased: 1 },
        { product_id: new ObjectId("6566ca8d521014a328137e06"), quantity_purchased: 2 },
        { product_id: new ObjectId("6566ca8d521014a328137e17"), quantity_purchased: 1 },
         { product_id: new ObjectId("6566ca8d521014a328137e51"), quantity_purchased: 560 },
        { product_id: new ObjectId("6566ca8d521014a328137e11"), quantity_purchased: 4 },
        { product_id: new ObjectId("6566ca8d521014a328137e52"), quantity_purchased: 1 },





      ];

      let totalPurchasedAmount = 0;


      for (const purchase of purchasedProducts) {
        const { product_id, quantity_purchased } = purchase;

        const product = await productsCollection.findOne({ _id: product_id });


        if (product.stock_quantity >= quantity_purchased) {
          const subtotal = product.price * quantity_purchased;


          totalPurchasedAmount += subtotal;


          const purchaseData = {
            transaction_id: transactionId,
            product_id: product_id,
            quantity_purchased: quantity_purchased,
            subtotal: subtotal
          };
          await purchasesCollection.insertOne(purchaseData, { session });


          await productsCollection.updateOne(
            { _id: product_id },
            { $inc: { stock_quantity: -quantity_purchased } },
            { session }
          );
        } else {
          throw new Error(`Not enough stock for product: ${product.name}`);
        }
      }

      await transactionsCollection.updateOne(
        { _id: transactionId },
        { $set: { purchased_amount: totalPurchasedAmount } },
        { session }
      );

      await session.commitTransaction();
      console.log('Transaction successfully inserted! Stock quantities updated.');

    } catch (error) {
      console.error('Transaction error:', error);
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  } finally {
    await client.close();
  }
}

performTransaction();


