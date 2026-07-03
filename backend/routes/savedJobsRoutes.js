const express = require("express");
const router = express.Router();

const {
    saveJob,
    getSavedJobs,
    removeSavedJob
} = require("../controllers/savedJobController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/:jobId", protect, saveJob);
router.get("/my", protect, getSavedJobs);
router.delete("/:jobId", protect, removeSavedJob);

module.exports = router;