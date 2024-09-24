import express from "express";

import db from "../db.js";
import checkout from "../controllers/checkout.js";

const router = express.Router();
router.post("/add", (req, res) => {
  const { plate } = req.body;

  db.query(
    "SELECT slot_id FROM slot WHERE available = 1 LIMIT 1",
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "Error checking slot availability" });
      } else {
        if (results.length > 0) {
          const slotId = results[0].slot_id;
          db.query(
            "UPDATE slot SET available = 0 WHERE slot_id = ?",
            slotId,
            (error, results, fields) => {
              if (error) {
                console.error(error);
                res
                  .status(500)
                  .send({ message: "Error updating slot availability" });
              } else {
                db.query(
                  "INSERT INTO entry (plate, slot) VALUES (?, ?)",
                  [plate, slotId],
                  (error, results, fields) => {
                    if (error) {
                      console.error(error);
                      res.status(500).send({ message: "Error adding entry" });
                    } else {
                      res.send({ message: "Entry added successfully" });
                    }
                  }
                );
              }
            }
          );
        } else {
          res.send({ message: "No available slots" });
        }
      }
    }
  );
});

router.post("/checkout", (req, res) => {
  const { plate } = req.body;

  db.query(
    "SELECT arrival, slot FROM entry WHERE plate = ? AND cost = 0",
    [plate],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "Error checking checkout" });
      } else {
        if (results.length > 0) {
          const slotId = results[0].slot;
          const [time, departure, info, cost] = checkout(results);

          db.query(
            "UPDATE entry SET cost = ?, departure = ? WHERE plate = ? AND cost = 0",
            [cost, departure, plate],
            (error, results, fields) => {
              if (error) {
                console.error(error);
                res.status(500).send({ message: "Error updating entry" });
              } else {
                db.query(
                  "UPDATE slot SET available = 1 WHERE slot_id = ?",
                  [slotId],
                  (error, results, fields) => {
                    if (error) {
                      console.error(error);
                      res.status(500).send({ message: "Error updating slot" });
                    } else {
                      res.send({ time, info, cost });
                    }
                  }
                );
              }
            }
          );
        } else {
          res.send({ message: "No entry found" });
        }
      }
    }
  );
});

/*
recieves start and end time in format yyyy-mm-dd hh:mm:ss
returns data in json 
DATA: CAR COUNT IN THE PARKING EVERY HOUR
{YYYY.MM.DD.HH : VALUE}
*/
router.post("/", (req, res) => {
  const startTime = req.body.start;
  const endTime = req.body.end || new Date();

  if (!startTime || !endTime) {
    res.status(400).send("Missing start time");
    return;
  }

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  console.log("________________________");
  console.log(startDate, endDate);
  const numHours = Math.ceil((endDate - startDate) / (1000 * 60 * 60));

  let carCount = {};

  db.query("SELECT * FROM entry", (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: "Error fetching entries" });
    } else {
      results.forEach((entry) => {
        const arrivalTime = new Date(entry.arrival);
        const departureTime = entry.departure
          ? new Date(entry.departure)
          : endDate;

        for (let i = 0; i < numHours; i++) {
          const currentHour = new Date(
            startDate.getTime() + i * 60 * 60 * 1000
          );

          if (arrivalTime <= currentHour && currentHour <= departureTime) {
            const key = `${currentHour.getFullYear()}.${
              currentHour.getMonth() + 1
            }.${currentHour.getDate()}.${currentHour.getHours()}`;

            carCount[key] = (carCount[key] || 0) + 1;
          }
        }
      });
      console.log("________________________");
      console.log(carCount);
      const sortedCarCount = {};
      Object.keys(carCount)
        .sort((a, b) => {
          const dateA = new Date(a.split(".").slice(0, 3).join("."));
          const dateB = new Date(b.split(".").slice(0, 3).join("."));
          if (dateA < dateB) {
            return -1;
          } else if (dateA > dateB) {
            return 1;
          } else {
            const hourA = parseInt(a.split(".")[3]);
            const hourB = parseInt(b.split(".")[3]);
            return hourA - hourB;
          }
        })
        .forEach((key) => {
          sortedCarCount[key] = carCount[key];
        });
      console.log(sortedCarCount);
      res.json(sortedCarCount);
    }
  });
});

export default router;
