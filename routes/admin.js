const express = require("express");
const router = express.Router();
const {upload} = require("../middlewares/multer");

const {
  dashboard,
  category,
  addCategory,
  editCategory,
  deleteCategory,
  bank,
  addBank,
  editBank,
  deleteBank,
  booking,
  item,
} = require("../controllers/admin.controller");

router.get("/dashboard", dashboard);
router.get("/category", category);
router.post("/category", addCategory);
router.put("/category", editCategory);
router.delete("/category/:id", deleteCategory);
router.get("/bank", bank);
router.post("/bank", upload, addBank);
router.put('/bank', upload, editBank);
router.delete('/bank/:id', deleteBank);
router.get("/item", item);
router.get("/booking", booking);

module.exports = router;
