const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const Transaction = require('./models/tranaction');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/moneytracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.render('index', { transactions });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/transactions', async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    const newTransaction = new Transaction({ description, amount, type });
    await newTransaction.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/chart', async (req, res) => {
    try {
      const transactions = await Transaction.find();
      
    
      const expenses = transactions.filter(transaction => transaction.type === 'expense');
      const income = transactions.filter(transaction => transaction.type === 'income');
  
      
      const expenseTotal = expenses.reduce((total, transaction) => total + transaction.amount, 0);
      const incomeTotal = income.reduce((total, transaction) => total + transaction.amount, 0);
  

      res.render('chart', { expenseTotal, incomeTotal });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
