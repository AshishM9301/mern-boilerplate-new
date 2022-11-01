require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 5000,
  db: {
    url: "mongodb+srv://ashish:yZAYuwmMRNgKVxeT@mernbasic.w0ajb.gcp.mongodb.net/mern_boilerplate?retryWrites=true&w=majority",
  },
  gmail: {
    user: "ghostasbhoot@gmail.com",
    pass: "xfwnrjywmixtiywd",
  },
  accessSecret:
    "84p9h1Ua]4qxE3Dhm6+6UW2u37PLxpZW2>N4|w[ezc%nN_H63IOiAS9^4v8P2NL0J6Yp4n%O9oXpfq]@f/:CqCSvPj!kdk52X_Q",
  refreshSecret:
    'xduT8Zx06/37"6R62C79Y~ox87ZPf]y4-3A)-8068fGozZBZnp^:XD,htlDVaWjBaw}+e3BhUdfy>3Q2CIXj06:5yP9?slWNIMs',
  google: {
    clientId:
      "996058088574-ri1hm1te6ii4p41h1avmvb1f46g57qh9.apps.googleusercontent.com",
    clientSecret: "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",
  },
};
