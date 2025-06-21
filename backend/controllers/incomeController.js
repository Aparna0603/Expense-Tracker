const Income = require("../models/Income");
const xlsx = require("xlsx");

// Add Income
exports.addIncome = async (req, res) => {
  const userId = req.user._id; // ✅ Corrected: ObjectId

  try {
    const { icon, source, amount, date } = req.body;

    if (!icon || !source || !amount || !date) {
      return res.status(400).json({
        message: "All fields (icon, source, amount, date) are required.",
      });
    }

    const newIncome = new Income({
      user: userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();

    res.status(201).json({
      message: "Income added successfully.",
      income: newIncome,
    });
  } catch (error) {
    console.error("Add Income Error:", error);
    res.status(500).json({
      message: "Error adding income.",
      error: error.message,
    });
  }
};

// Get All Incomes
exports.getAllIncome = async (req, res) => {
  const userId = req.user._id;

  try {
    const incomes = await Income.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error("Fetch Income Error:", error);
    res.status(500).json({
      message: "Failed to fetch incomes",
      error: error.message,
    });
  }
};

// Delete Income
exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Delete Income Error:", error);
    res.status(500).json({
      message: "Failed to delete income",
      error: error.message,
    });
  }
};

// Download as Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user._id;

  try {
    const incomes = await Income.find({ user: userId }).sort({ date: -1 });

    const data = incomes.map((income) => ({
      Icon: income.icon,
      Source: income.source,
      Amount: income.amount,
      Date: income.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Incomes");

    const filePath = "./income_details.xlsx";
    xlsx.writeFile(wb, filePath);

    res.download(filePath);
  } catch (error) {
    console.error("Download Income Excel Error:", error);
    res.status(500).json({
      message: "Failed to download Excel",
      error: error.message,
    });
  }
};
