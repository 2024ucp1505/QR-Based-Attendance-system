const express = require("express");
const authorize = require("../auth/authorize");
const ROLES = require("../auth/roles");

const router = express.Router();

// to mark attendance
router.post(
  "/mark-attendance",
  authorize([ROLES.STUDENT]),
  (req, res) => {
    res.json({
      message: "Attendance marked successfully",
      markedBy: req.userRole,
    });
  }
);

module.exports = router;
