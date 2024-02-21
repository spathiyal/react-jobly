"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Item {
  static async create({ username, itemname }) {
    console.log("Here is item model - Create add just now");
    const duplicateCheck = await db.query(
      `SELECT itemname
           FROM items
           WHERE username = $1 AND itemname = $2`,
      [username, itemname]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate item: ${itemname}`);

    const result = await db.query(
      `INSERT INTO items
           (username, itemname  )
           VALUES ($1, $2 )
           RETURNING  username, itemname`,
      [username, itemname]
    );
    const item = result.rows[0];

    return item;
  }

  static async findAll(searchFilters = {}) {
    let query = `SELECT id, username, itemname
                 FROM items `;
    let whereExpressions = [];
    let queryValues = [];

    const { id, itemname, username } = searchFilters;
    if (username) {
      queryValues.push(`%${username}%`);
      whereExpressions.push(`username ILIKE $${queryValues.length}`);
    }
    if (itemname) {
      queryValues.push(`%${itemname}%`);
      whereExpressions.push(`itemname ILIKE $${queryValues.length}`);
    }
    if (id) {
      queryValues.push(`%${id}%`);
      whereExpressions.push(`id ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY id";
    const itemNameRes = await db.query(query, queryValues);
    return itemNameRes.rows;
  }

  static async get(id) {
    const itemNameRes = await db.query(
      `SELECT  id,username,itemname
           FROM items
           WHERE id = $1`,
      [id]
    );

    const item = itemNameRes.rows[0];

    if (!item) throw new NotFoundError(`No item Found`);
    // return "here in MODELS";
    return item;
  }
  static async get(itemname) {
    const itemNameRes = await db.query(
      `SELECT  id,username,itemname
           FROM items
           WHERE itemname= $1  `,
      [itemname]
    );

    const item = itemNameRes.rows[0];

    if (!item) throw new NotFoundError(`No item Found`);

    return item;
  }

  static async update(id, data) {
    const result = await db.query(
      `UPDATE items SET
      itemname ='${data.itemname}'

            WHERE id=${id}
        RETURNING  id,username,itemname`
    );

    if (result.rows.length === 0) {
      throw { message: `There is no itemname with an id '${id}`, status: 404 };
    }

    return result.rows[0];
  }

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM items
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    const item = result.rows[0];

    if (!item) throw new NotFoundError(`No item: ${id}`);
  }
}

module.exports = Item;
