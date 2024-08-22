// import axios from "axios";

// const baseURL = "http://localhost:3500/user/Allrecords"

// export default axios.create({
//     baseURL
// })


import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/user/Allrecords"
    : "http://localhost:3500/user/Allrecords";

export default axios.create({
  baseURL,
});