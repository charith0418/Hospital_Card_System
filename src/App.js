import React, { useEffect, useState } from "react";
import { getPatients, createPatient, deletePatient } from "./api";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PublicPatient from "./components/PublicPatient";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import PatientDetails from "./components/PatientDetails";

function App() {

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [search, setSearch] = useState("");

  // LOAD PATIENTS
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {

      const res = await getPatients();

      setPatients(res.data);

    } catch (err) {

      console.error("LOAD ERROR:", err);

    }
  };

  // ADD PATIENT
  const handleAddPatient = async (form) => {
    try {

      const res = await createPatient(form);

      setPatients([res.data, ...patients]);

    } catch (err) {

      console.error("ADD ERROR:", err);

    }
  };

  // DELETE PATIENT
  const handleDelete = async (id) => {
    try {

      await deletePatient(id);

      setPatients(
        patients.filter((p) => p._id !== id)
      );

      if (selectedPatient?._id === id) {
        setSelectedPatient(null);
      }

    } catch (err) {

      console.error("DELETE ERROR:", err);

    }
  };

  // ADD TREATMENT
  const handleAddTreatment = async (id, data) => {
    try {

      const res = await axios.put(
        `http://127.0.0.1:5000/patients/${id}/treatment`,
        data
      );

      setPatients(
        patients.map((p) =>
          p._id === id ? res.data : p
        )
      );

      setSelectedPatient(res.data);

    } catch (err) {

      console.error("TREATMENT ERROR:", err);

    }
  };

  // SEARCH FILTER
  const filtered = patients.filter(
    (p) =>
      p?.name?.toLowerCase().includes(
        search.toLowerCase()
      )
  );

  return (
    <Router>

      <Routes>

        {/* MAIN PAGE */}
        <Route
          path="/"
          element={
            <div className="container mt-4">

              <h1 className="text-center">
                🏥 Hospital System
              </h1>

              {/* SEARCH */}
              <input
                className="form-control mt-3"
                placeholder="Search patient..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {/* ADD FORM */}
              <PatientForm
                onAdd={handleAddPatient}
              />

              {/* PATIENT LIST */}
              <PatientList
                patients={filtered}
                onSelect={setSelectedPatient}
                onDelete={handleDelete}
              />

              {/* PATIENT DETAILS */}
              <PatientDetails
                patient={selectedPatient}
                onAddTreatment={handleAddTreatment}
              />

            </div>
          }
        />

        {/* PUBLIC QR page */}
        <Route
          path="/public/:id"
          element={<PublicPatient />}
        />

      </Routes>

    </Router>
  );
}

export default App;