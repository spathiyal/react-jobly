"use strict";

/** Routes for items from the pantry. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const Item = require("../models/item");

const itemNewSchema = require("../schemas/itemNew.json");
const itemUpdateSchema = require("../schemas/itemUpdate.json");
const itemSearchSchema = require("../schemas/itemSearch.json");

const router = new express.Router();
router.post("/create", async function (req, res, next) {
  console.log("inside create routes ", req.body);
  try {
    const validator = jsonschema.validate(req.body, itemNewSchema);

    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      console.log("inside create routes errs", errs);
      throw new BadRequestError(errs);
    }

    const item = await Item.create(req.body);
    return res.status(201).json({ item });
  } catch (err) {
    console.log("inside create routes catch", err);
    return next(err);
  }
});
// /items/
router.get("/", async function (req, res, next) {
  const q = req.query;
  console.log("q --- ", q);
  try {
    const validator = jsonschema.validate(q, itemSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const items = await Item.findAll(res.locals.user);
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
});

router.get("/:itemname", async function (req, res, next) {
  try {
    const item = await Item.get(req.params.itemname);
    return res.json({ item });
  } catch (err) {
    return next(err);
  }
});

// router.get("/:username", async function (req, res, next) {
//   try {
//     const item = await Item.get(req.params.username);

//     return res.json({ item });
//   } catch (err) {
//     return next(err);
//   }
// });

// router.get("/:username", async function (req, res, next) {
//   try {
//     const item = await Item.get(req.params.username);

//     return res.json({ item });
//   } catch (err) {
//     console.log("inside routes # 78", err);

//     return next(err);
//   }
// });

router.get("/:id", async function (req, res, next) {
  try {
    console.log("here is Id get");
    const item = await Item.get(req.params.id);

    return res.json({ item });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", async function (req, res, next) {
  try {
    console.log("req ===in routes ");
    const item = await Item.update(req.params.id, req.body);
    return res.json({ item });
  } catch (err) {
    console.log("ERROR====");
    return next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    await Item.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
