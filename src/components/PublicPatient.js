import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PublicPatient() {

  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  // LOAD PUBLIC DATA
  useEffect(() => {

    const fetchPatient = async () => {
      try {

        const res = await axios.get(
          `http://127.0.0.1:5000/patients/public/${id}`
        );

        setPatient(res.data);

      } catch (err) {
        console.error("Public fetch error:", err);
      }
    };

    fetchPatient();

  }, [id]);

  // LOADING
  if (!patient) {
    return (
      <div className="container mt-5">
        <h3>Loading patient data...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h1 className="text-center mb-4">
          🚑 Emergency Patient Card
        </h1>

        <h3>
          👤 {patient.name}
        </h3>

        <hr />

        <p>
          <strong>🩸 Blood Group:</strong>{" "}
          {patient.blood}
        </p>

        <p>
          <strong>⚠ Allergies:</strong>{" "}
          {patient.allergies}
        </p>

      </div>

    </div>
  );
}

export default PublicPatient;