const Application = require("../models/Application");
const Job = require("../models/Job");

// @desc Apply to a Job
exports.applyToJob = async (req, res) => {
    try {
        if (req.user.role !== "jobseeker") {
            return res.status(403).json({ message: "Only Job seekers can apply" });
        }

        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const existing = await Application.findOne({
            job: req.params.jobId,
            applicant: req.user._id,
        });

        if (existing) {
            return res.status(400).json({
                message: "Already applied to this job",
            });
        }

        const application = await Application.create({
            job: req.params.jobId,
            applicant: req.user._id,
            resume: req.user.resume,
            status: "Applied",
        });

        res.status(201).json(application);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get logged-in-user's applications
exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            applicant: req.user._id,
        })
            .populate("job", "title company location type")
            .sort({ createdAt: -1 });

        res.json(applications);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get all applicants for a job (Employer)
exports.getApplicantsForJob = async (req, res) => {
    try {
        if (req.user.role !== "employer") {
            return res.status(403).json({
                message: "Only employers can view applicants",
            });
        }

        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        const applications = await Application.find({
            job: req.params.jobId,
        })
            .populate("applicant", "name email resume")
            .sort({ createdAt: -1 });

        res.json(applications);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get application by Id
exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate("job", "title company")
            .populate("applicant", "name email");

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        res.json(application);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Update application status (Employer)
exports.updateStatus = async (req, res) => {
    try {
        if (req.user.role !== "employer") {
            return res.status(403).json({
                message: "Only employers can update status",
            });
        }

        const application = await Application.findById(
            req.params.id
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        const allowedStatus = [
            "Applied",
            "In Review",
            "Rejected",
            "Accepted",
        ];

        if (
            req.body.status &&
            !allowedStatus.includes(req.body.status)
        ) {
            return res.status(400).json({
                message: "Invalid status value",
            });
        }

        application.status =
            req.body.status || application.status;

        const updated = await application.save();

        res.json({
            message: "Application status updated",
            status: updated.status,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};