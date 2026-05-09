const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/hospital_system")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// SCHEMA
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  blood: String,
  allergies: String,

  history: [
    {
      hospital: String,
      diagnosis: String,
      medicines: [String],
      date: String
    }
  ]
});

const Patient = mongoose.model("Patient", PatientSchema);

// CREATE PATIENT
app.post("/patients", async (req, res) => {
  try {

    const { name, age } = req.body;

    if (!name || !age) {
      return res.status(400).json({
        error: "Name and Age are required"
      });
    }

    const newPatient = await Patient.create({
      ...req.body,
      history: []
    });

    res.status(201).json(newPatient);

  } catch (err) {
    console.error("POST Error:", err);
    res.status(500).json({
      error: err.message
    });
  }
});

// GET ALL PATIENTS
app.get("/patients", async (req, res) => {
  try {

    const data = await Patient.find().sort({ _id: -1 });

    res.json(data);

  } catch (err) {
    console.error("GET Error:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

// DELETE PATIENT
app.delete("/patients/:id", async (req, res) => {
  try {

    await Patient.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted successfully"
    });

  } catch (err) {
    console.error("DELETE Error:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

// ADD TREATMENT
app.put("/patients/:id/treatment", async (req, res) => {
  try {

    const { id } = req.params;

    const treatment = {
      hospital: req.body.hospital,
      diagnosis: req.body.diagnosis,
      medicines: req.body.medicines || [],
      date: req.body.date
    };

    const updatedPatient =
      await Patient.findByIdAndUpdate(
        id,
        {
          $push: {
            history: treatment
          }
        },
        { new: true }
      );

    res.json(updatedPatient);

  } catch (err) {
    console.error("UPDATE Error:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

// PUBLIC QR ROUTE
app.get("/patients/public/:id", async (req, res) => {
  try {

    const patient =
      await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        error: "Patient not found"
      });
    }

    res.json({
      name: patient.name,
      blood: patient.blood,
      allergies: patient.allergies
    });

  } catch (err) {
    console.error("PUBLIC ERROR:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// START SERVER
app.listen(5000, () => {
  console.log(
    "🚀 Server running on http://localhost:5000"
  );
});