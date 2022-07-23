const routers = require("express").Router();
const { user } = require("../controllers");

routers.get("/users", user.getUser);
routers.post("/users", user.login);
routers.post("/users/register", user.register);
routers.patch("/users/verification", user.verifyUser);
// routers.post("/users/verification/resend", user.resendEmail); kirim ulang
routers.post("/users/forgotPassword", user.forgotPassword);
routers.patch("/users/resetPasword", user.resetPassword);
routers.get("/users/keepLogin", user.keepLogin);

module.exports = routers;
