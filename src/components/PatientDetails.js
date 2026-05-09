import React from "react";
import QRCode from "react-qr-code";

function PatientDetails({ patient, onAddTreatment }) {

  const [formData, setFormData] = React.useState({
    hospital: "",
    diagnosis: "",
    medicines: "",
    date: ""
  });

  // IF NO PATIENT SELECTED
  if (!patient) return null;

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    onAddTreatment(patient._id, {
      ...formData,
      medicines: formData.medicines
        .split(",")
        .map((m) => m.trim())
    });

    // CLEAR FORM
    setFormData({
      hospital: "",
      diagnosis: "",
      medicines: "",
      date: ""
    });
  };

  return (
    <div className="card p-3 mt-4">

      <h3>{patient.name}</h3>

      {/* QR CODE */}
      <div className="mb-3">

        <QRCode
          value={`http://localhost:3000/public/${patient._id}`}
          size={120}
        />

      </div>

      {/* BASIC DETAILS */}
      <p>
        <strong>Blood:</strong> {patient.blood}
      </p>

      <p>
        <strong>Allergies:</strong> {patient.allergies}
      </p>

      {/* ADD TREATMENT */}
      <h5 className="mt-3">
        Add Treatment
      </h5>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-2"
          name="hospital"
          placeholder="Hospital"
          value={formData.hospital}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="diagnosis"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="medicines"
          placeholder="Medicines (comma separated)"
          value={formData.medicines}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <button className="btn btn-warning w-100">
          Add Treatment
        </button>

      </form>

      {/* HISTORY */}
      <h5 className="mt-4">
        Treatment History
      </h5>

      {patient.history?.length === 0 ? (

        <p>No history</p>

      ) : (

        patient.history.map((h, i) => (
          <div
            key={i}
            className="border rounded p-2 mb-2"
          >

            <p>
              <strong>Hospital:</strong> {h.hospital}
            </p>

            <p>
              <strong>Diagnosis:</strong> {h.diagnosis}
            </p>

            <p>
              <strong>Medicines:</strong>{" "}
              {h.medicines?.join(", ")}
            </p>

            <p>
              <strong>Date:</strong> {h.date}
            </p>

          </div>
        ))

      )}

    </div>
  );
}

export default PatientDetails;