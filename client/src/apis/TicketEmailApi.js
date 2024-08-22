// import axios from "axios";

// const baseURL = "http://localhost:3500/send_ticket_email"

// export default axios.create({
//     baseURL
// })

import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/send_ticket_email"
    : "http://localhost:3500/send_ticket_email";

export default axios.create({
  baseURL,
});