import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://fiver-clone-frontend.onrender.com/api/",
  withCredentials: true,
}); 

export default newRequest;