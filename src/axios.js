import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5001/clone-34791/us-central1/api", //The API (cloud function) URL
  baseURL: "https://us-central1-clone-34791.cloudfunctions.net/api",
});

export default instance;
