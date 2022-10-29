require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 5000,
  db: {
    url: "mongodb+srv://ashish:yZAYuwmMRNgKVxeT@mernbasic.w0ajb.gcp.mongodb.net/?retryWrites=true&w=majority",
  },
};
