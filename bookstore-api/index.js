const express = require("express");
const bodyParser = require("body-parser");
const generalRoutes = require("./routes/general.js").general;
const authRoutes = require("./routes/auth_users.js").authenticated;

const app = express();
app.use(bodyParser.json());

app.use("/", generalRoutes);
app.use("/auth", authRoutes);

app.listen(5001, () => {
  console.log("Sunucu 5001 portunda çalışıyor.");
});