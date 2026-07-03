const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
    {
        employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        totalJobsPosted: { type: Number, default: 0 },
        totalHired: { type: Number, default: 0 },
    },
    { timestamps: true },
);


module.exports = mongoose.model("Analysis", analyticsSchema);