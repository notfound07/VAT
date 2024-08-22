// import axios from "axios";

// const baseURL = "http://localhost:3500/user/feedback"

// export default axios.create({
//     baseURL
// })


import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/user/feedback"
    : "http://localhost:3500/user/feedback";

export default axios.create({
  baseURL,
});