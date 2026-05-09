import React, { useState } from "react";

function PatientForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    blood: "",
    allergies: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);

    setForm({
      name: "",
      age: "",
      blood: "",
      allergies: ""
    });
  };

  return (
    <div className="card p-3 mt-3">
      <h4>Add Patient</h4>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="blood"
          placeholder="Blood"
          value={form.blood}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="allergies"
          placeholder="Allergies"
          value={form.allergies}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">
          Save Patient
        </button>
      </form>
    </div>
  );
}

export default PatientForm;