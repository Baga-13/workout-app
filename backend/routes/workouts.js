const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controller/workoutController");

// express router
const router = express.Router();

// GET for all the workouts
router.get("/", getAllWorkouts);

// GET single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
