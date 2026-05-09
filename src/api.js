import axios from "axios";

export const API = "http://127.0.0.1:5000/patients";

export const getPatients = () => axios.get(API);

export const createPatient = (data) => {
  return axios.post(API, data);
};

export const deletePatient = (id) => axios.delete(`${API}/${id}`);

export const addTreatmentAPI = (id, data) =>
  axios.put(`http://127.0.0.1:5000/patients/${id}/treatment`, data);