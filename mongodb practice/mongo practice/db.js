const mongoose = require('mongoose');
const { topSalesToday, topSalesThisMonth, topSalesThisMonthOver50000, mostSoldProducts, mostSoldProductsOver500, revenueByElectronics, electronics, unsoldProducts, unsold, unsoldProductsUsingTransaction } = require('./filterQueries');

mongoose.connect('mongodb://localhost:27017/billing');

const db = mongoose.connection;

db
  .on('error', console.error.bind(console, 'MongoDB connection error:'))
  .once('open', () => {
    console.log('Connected to MongoDB successfully!');

    topSalesToday()

  });
