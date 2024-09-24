import express from "express";

import db from "../db.js";

const router = express.Router();
router.get("/slots", (req, res) => {
  db.query(
    `
        SELECT s.slot_id, s.available, e.plate, e.arrival
        FROM slot s
        LEFT JOIN entry e ON s.slot_id = e.slot AND e.departure IS NULL
      `,
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching slots" });
      } else {
        res.send(results);
      }
    }
  );
});
export default router;
