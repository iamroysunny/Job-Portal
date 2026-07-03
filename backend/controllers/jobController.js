const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");
const SavedJob = require("../models/SavedJob");


// @desc Create a new job (Employer Only)
exports.createJob = async (req, res) => {
    try {
        if (req.user.role !== "employer") {
            return res.status(403).json({ message: "Only employer can post jobs" });
        }

        const job = await Job.create({ ...req.body, company: req.user._id });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Get all jobs
exports.getJobs = async (req, res) => {
    const {
        keyboard,
        location,
        category,
        type,
        minSalary,
        maxSalary,
        userId
    } = req.query;

    const query = {
        isClosed: false,
        ...(keyboard && { title: { $regex: keyboard, $options: "i" } }),
        ...(location && { location: { $regex: location, $options: "i" } }),
        ...(category && { category }),
        ...(type && { type }),
    };

    if (minSalary || maxSalary) {
        query.$and = [];

        if (minSalary) {
            query.$and.push({ salaryMax: { $gte: Number(minSalary) } });
        }

        if (maxSalary) {
            query.$and.push({ salaryMin: { $lte: Number(maxSalary) } });
        }

        if (query.$and.length === 0) {
            delete query.$and;
        }
    }

    try {
        const jobs = await Job.find(query).populate(
            "company",
            "name companyName companyLogo"
        );

        let savedJobIds = [];
        let appliedJobStatusMap = {};

        if (userId) {
            const savedJobs = await SavedJob.find({ jobseeker: userId }).select("job");
            savedJobIds = savedJobs.map((s) => String(s.job));

            const applications = await Application.find({ applicant: userId }).select("job status");
            applications.forEach((app) => {
                appliedJobStatusMap[String(app.job)] = app.status;
            });
        }

        const jobWithExtras = jobs.map((job) => {
            const jobIdStr = String(job._id);
            return {
                ...job.toObject(),
                isSaved: savedJobIds.includes(jobIdStr),
                applicationStatus: appliedJobStatusMap[jobIdStr] || null,
            };
        });

        res.json(jobWithExtras);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Get jobs for logged in employer
exports.getJobsEmployer = async (req, res) => {
    try {
        const userId = req.user._id;
        const { role } = req.user;

        if (role !== "employer") {
            return res.status(403).json({ message: "Access denied" });
        }

        const jobs = await Job.find({ company: userId })
            .populate("company", "name companyName companyLogo")
            .lean();

        const jobWithApplicationCounts = await Promise.all(
            jobs.map(async (job) => {
                const applicationCount = await Application.countDocuments({
                    job: job._id,
                });

                return {
                    ...job,
                    applicationCount,
                };
            })
        );

        res.json(jobWithApplicationCounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Get single job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate(
            "company",
            "name companyName companyLogo"
        );

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Update a job (Employer only)
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (String(job.company) !== String(req.user._id)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Delete a job (Employer only)
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (String(job.company) !== String(req.user._id)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await job.deleteOne();

        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Toggle close status for a job (Employer only)
exports.toggleCloseJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (String(job.company) !== String(req.user._id)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        job.isClosed = !job.isClosed;
        await job.save();

        res.json({
            message: "Job status updated",
            isClosed: job.isClosed
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};