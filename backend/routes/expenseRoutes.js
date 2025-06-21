const express = require("express");
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/all", protect, getAllExpense); // ✅ Protect applied here
router.delete("/:id", protect, deleteExpense);
router.get("/download", protect, downloadExpenseExcel);

module.exports = router;
