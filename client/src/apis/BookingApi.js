// import axios from "axios";

// const baseURL = "http://localhost:3500/user/booking"

// export default axios.create({
//     baseURL
// })

import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/user/booking"
    : "http://localhost:3500/user/booking";

export default axios.create({
  baseURL,
});