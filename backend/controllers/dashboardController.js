const mongoose = require("mongoose");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ already an ObjectId

    const incomes = await Income.find({ user: userId });
    const expenses = await Expense.find({ user: userId });

    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalBalance = totalIncome - totalExpenses;

    const now = new Date();
    const daysAgo30 = new Date(now);
    daysAgo30.setDate(now.getDate() - 30);
    const daysAgo60 = new Date(now);
    daysAgo60.setDate(now.getDate() - 60);

    const last30DaysExpenses = expenses.filter(e =>
      new Date(e.date).getTime() >= daysAgo30.getTime()
    );

    const last60DaysIncome = incomes.filter(i =>
      new Date(i.date).getTime() >= daysAgo60.getTime()
    );

    const recentIncome = incomes.map(i => ({
      _id: i._id,
      type: 'income',
      source: i.source,
      amount: i.amount,
      date: i.date,
      icon: i.icon
    }));

    const recentExpense = expenses.map(e => ({
      _id: e._id,
      type: 'expense',
      category: e.category,
      amount: e.amount,
      date: e.date,
      icon: e.icon
    }));

    const recentTransactions = [...recentIncome, ...recentExpense]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    res.json({
      totalBalance,
      totalIncome,
      totalExpenses,
      last30DaysExpenses: {
        total: last30DaysExpenses.reduce((sum, e) => sum + e.amount, 0),
        transactions: last30DaysExpenses
      },
      last60DaysIncome: {
        total: last60DaysIncome.reduce((sum, i) => sum + i.amount, 0),
        transactions: last60DaysIncome
      },
      recentTransactions
    });

  } catch (err) {
    console.error("Dashboard fetch error:", err.message);
    res.status(500).json({
      message: 'Error fetching dashboard data',
      error: err.message
    });
  }
};
