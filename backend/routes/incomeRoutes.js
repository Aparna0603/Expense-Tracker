const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    addIncome,
    getAllIncome,
    downloadIncomeExcel,
    deleteIncome
} = require("../controllers/incomeController");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/all", protect, getAllIncome);
router.get("/download", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

module.exports = router;
