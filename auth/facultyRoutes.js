const express = require("express")
const authorize = require ("../auth/authorize")
const ROLES = require ("../auth/roles");

const router = express.Router();

//to begin the attendance session
router.post(
    "/start-session",
    authorize([ROLES.FACULTY]),
    (req, res) => {
        res.json({
            message: "Session started successfully",
            startedBy: req.userRole,
        });
    }
);

//to end the attendance session
router.post(
  "/end-session",
  authorize([ROLES.FACULTY]),
  (req, res) => {
    res.json({
      message: "Session ended successfully",
    });
  }
);