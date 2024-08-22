// import axios from "axios";

// const baseURL = "http://localhost:3500/user/reset_password"

// export default axios.create({
//     baseURL
// })

import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/user/reset_password"
    : "http://localhost:3500/user/reset_password";

export default axios.create({
  baseURL,
});
