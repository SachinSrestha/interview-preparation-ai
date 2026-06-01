const express = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router()

/** Register User (POST)
 * @route "/api/auth/register"
 */
router.post("/register",authController.registerUserController)

/** Login User (POST)
 * @route "/api/auth/login"
 */
router.post("/login",authController.loginUserController)

/** Logout User (GET)
 * @route "/api/auth/logout"
 */
router.get("/logout", authController.logoutUserController)

/** Get User Information (GET)
 * @route "/api/auth/get-me"
 */
router.get("/get-me", authMiddleware.authUser, authController.getMeController)

module.exports = router