import React from "react";

function PatientList({ patients, onSelect, onDelete }) {
  return (
    <div className="row mt-4">
      {patients.map((p) => (
        <div key={p._id} className="col-md-4">
          <div className="card p-3 mb-3 shadow">

            <h5>{p.name}</h5>
            <p>Age: {p.age}</p>
            <p>Blood: {p.blood}</p>

            <button
              className="btn btn-success mb-2"
              onClick={() => onSelect(p)}
            >
              View Details
            </button>

            <button
              className="btn btn-danger"
              onClick={() => onDelete(p._id)}
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}

export default PatientList;