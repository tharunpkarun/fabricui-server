const db = require('../db');

module.exports = {
  getItems: (limit, offset, callback) => {
    db.get(`SELECT COUNT(*) as count FROM items`, (err, row) => {
      const count = row.count;
      db.all(`SELECT * FROM items LIMIT ? OFFSET ?`, [limit, offset], (err, rows) =>
        callback(err, { count, data: rows })
      );
    });
  },

  getCards: () => {
    return [
      { id: 0, name: "Backlog" },
      { id: 1, name: "In Progress" },
      { id: 2, name : "Done" },
    ]
  },

  getItemById: (id, callback) => {
    db.get(`SELECT * FROM items WHERE id = ?`, [id], (err, row) => {
      callback(err, row);
    });
  },

  createItem: (data, callback) => {
    db.run(
      `INSERT INTO items (name, email, profile_image, resume, status, card_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.email,
        data.profile_image ?? null,
        data.resume ?? null,
        data.status ?? true,
        data.card_id ?? 0,
      ],
      function (err) {
        callback(err, { id: this.lastID, ...data });
      }
    );
  },

  updateItem: (id, data, callback) => {
    db.run(
      `UPDATE items SET name = ?, email = ?, profile_image = ?, resume = ?, status = ?, card_id = ? WHERE id = ?`,
      [
        data.name,
        data.email,
        data.profile_image ?? null,
        data.resume ?? null,
        data.status ?? true,
        data.card_id ?? 0,
        id,
      ],
      function (err) {
        callback(err, { id, ...data });
      }
    );
  },

  deleteItem: (id, callback) => {
    db.run(`DELETE FROM items WHERE id = ?`, [id], (err) => callback(err));
  },

  resetData: (callback) => {
    db.run(`DELETE FROM items`, callback);
    db.run(
      `INSERT INTO items (name, email, profile_image, resume, status, card_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        "John Doe",
        "john@example.com",
        "https://placehold.co/600x400/EEE/31343C",
        "https://placehold.co/600x400/EEE/31343C",
        true,
        0,
      ]
    );
  },
};
