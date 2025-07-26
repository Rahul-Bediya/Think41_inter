const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    loadCSV();
  })
  .catch(err => console.error(err));

function loadCSV() {
  const results = [];
  fs.createReadStream('ecommerce_products.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await Product.insertMany(results);
        console.log("✅ CSV data inserted");
        process.exit();
      } catch (err) {
        console.error("❌ Insert failed", err);
      }
    });
}
