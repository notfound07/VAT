// import axios from "axios";

// const baseURL = "http://localhost:3500/user/signup"

// export default axios.create({
//     baseURL
// })


import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/user/signup"
    : "http://localhost:3500/user/signup";

export default axios.create({
  baseURL,
});