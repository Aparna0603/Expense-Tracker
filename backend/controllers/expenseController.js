const Expense = require("../models/Expense");
const xlsx = require("xlsx");

// Add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user._id; // ✅ Corrected: ObjectId

  try {
    const { icon, category, amount, date } = req.body;

    if (!icon || !category || !amount || !date) {
      return res.status(400).json({
        message: "All fields (icon, category, amount, date) are required.",
      });
    }

    const newExpense = new Expense({
      user: userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();

    res.status(201).json({
      message: "Expense added successfully.",
      expense: newExpense,
    });
  } catch (error) {
    console.error("Add Expense Error:", error);
    res.status(500).json({
      message: "Error adding expense.",
      error: error.message,
    });
  }
};

// Get All Expenses
exports.getAllExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Fetch Expense Error:", error);
    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Delete Expense Error:", error);
    res.status(500).json({
      message: "Failed to delete expense",
      error: error.message,
    });
  }
};

// Download as Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });

    const data = expenses.map((expense) => ({
      Icon: expense.icon,
      Category: expense.category,
      Amount: expense.amount,
      Date: expense.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expenses");

    const filePath = "./expense_details.xlsx";
    xlsx.writeFile(wb, filePath);

    res.download(filePath);
  } catch (error) {
    console.error("Download Expense Excel Error:", error);
    res.status(500).json({
      message: "Failed to download Excel",
      error: error.message,
    });
  }
};
