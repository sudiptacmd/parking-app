import express from "express";

import db from "../db.js";

const router = express.Router();
router.get("/", (req, res) => {
  const getSlotQuery = "SELECT * FROM slot";
  db.query(getSlotQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error getting slots" });
    } else {
      res.status(200).send(result);
    }
  });
});
router.post("/slot", (req, res) => {
  const addSlotQuery = "INSERT INTO slot (available) VALUES (?)";
  db.query(addSlotQuery, [1], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ messsage: "Error adding slot" });
    } else {
      console.log(`Slot no.${result.insertId} added`);
      res.status(200).send({ message: `Slot no.${result.insertId} added` });
    }
  });
});
router.delete("/slot", (req, res) => {
  const removeSlotQuery = "DELETE FROM slot ORDER BY slot_id DESC LIMIT 1";
  db.query(removeSlotQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error removing slot" });
    } else {
      console.log("Slot removed successfully");
      res.status(200).send({ message: "Slot removed successfully" });
    }
  });
});
export default router;
