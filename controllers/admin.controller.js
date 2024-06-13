const Category = require("../models/Category");
const Bank = require("../models/Bank");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  dashboard: (req, res) => {
    res.render("pages/dashboard/index", {
      title: "StayCation",
      year: new Date().getFullYear(),
    });
  },
  category: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = {
      message: alertMessage,
      status: alertStatus,
    };

    try {
      const categories = await Category.find();

      res.render("pages/category/index", {
        title: "StayCation | Category",
        year: new Date().getFullYear(),
        categories,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  addCategory: async (req, res) => {
    const { name } = req.body;

    try {
      await Category.create({ name });
      req.flash("alertMessage", "Success Add Category");
      req.flash("alertStatus", "success");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }

    res.redirect("/admin/category");
  },
  editCategory: async (req, res) => {
    const { id, name } = req.body;

    try {
      await Category.findByIdAndUpdate(
        { _id: id },
        {
          name,
        }
      );
      req.flash("alertMessage", "Success Update Category");
      req.flash("alertStatus", "success");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }

    res.redirect("/admin/category");
  },
  deleteCategory: async (req, res) => {
    const { id } = req.params;

    try {
      await Category.findByIdAndDelete({
        _id: id,
      });
      req.flash("alertMessage", "Success Delete Category");
      req.flash("alertStatus", "success");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }

    res.redirect("/admin/category");
  },
  bank: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = {
      message: alertMessage,
      status: alertStatus,
    };

    try {
      const banks = await Bank.find();

      res.render("pages/bank/index", {
        title: "StayCation | Bank",
        year: new Date().getFullYear(),
        banks,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
    }
  },
  addBank: async (req, res) => {
    const { nameBank, nomorRekening, name } = req.body;

    const imageUrl = req.file.filename;

    try {
      await Bank.create({
        nameBank,
        nomorRekening,
        name,
        imageUrl: `images/${imageUrl}`,
      });
      req.flash("alertMessage", "Success Add Bank");
      req.flash("alertStatus", "success");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }

    res.redirect("/admin/bank");
  },
  editBank: async (req, res) => {
    try {
      const { id, nameBank, nomorRekening, name } = req.body;

      const bank = await Bank.findOne({ _id: id });

      if (req.file == undefined) {
        bank.nameBank = nameBank;
        bank.nomorRekening = nomorRekening;
        bank.name = name;
        await bank.save();
        req.flash("alertMessage", "Success update bank !");
        req.flash("alertStatus", "success");
        res.redirect("/admin/bank");
      } else {
        await fs.unlink(path.join(`public/${bank.imageUrl}`));
        bank.nameBank = nameBank;
        bank.nomorRekening = nomorRekening;
        bank.name = name;
        bank.imageUrl = `images/${req.file.filename}`;
        await bank.save();
        req.flash("alertMessage", "Success update bank !");
        req.flash("alertStatus", "success");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }

    res.redirect("/admin/bank");
  },
  deleteBank: async (req, res) => {
    try {
      const { id } = req.params;

      const bank = await Bank.findOne({ _id: id });

      if (fs.existsSync(path.join(`public/${bank.imageUrl}`))) {
        await fs.unlink(path.join(`public/${bank.imageUrl}`));
      }

      await bank.remove();

      req.flash("alertMessage", "Success Delete Bank !");
      req.flash("alertStatus", "success");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
    res.redirect("/admin/bank");
  },
  item: (req, res) => {
    res.render("pages/item/index", {
      title: "StayCation | Item",
      year: new Date().getFullYear(),
    });
  },
  booking: (req, res) => {
    res.render("pages/booking/index", {
      title: "StayCation | Booking",
      year: new Date().getFullYear(),
    });
  },
};
