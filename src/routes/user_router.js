const routers = require("express").Router();
const { user } = require("../controllers");

routers.get("/users", user.getUser);
routers.post("/users", user.login);
routers.post("/users/register", user.register);
routers.patch("/users/verification", user.verifyUser);
// routers.post("/users/verification/resend", user.resendEmail); kirim ulang
// routers.put("/users/edit", user.editUser)

module.exports = routers;
