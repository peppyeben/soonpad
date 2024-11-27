const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");

require("dotenv").config();

// Configure GridFsStorage
const storage = new GridFsStorage({
    url: process.env.MONGO_DB_API,
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            return {
                bucketName: "photos",
                filename: `${Date.now()}_${file.originalname}`,
            };
        } else {
            return {
                bucketName: "other_files",
                filename: `${Date.now()}_${file.originalname}`,
            };
        }
    },
});

storage.on("connection", (db) => {
    console.log("MongoDB connection established for file storage!");
});

storage.on("connectionFailed", (err) => {
    console.error("MongoDB connection failed:", err.message);
});

// Set multer storage engine to the newly created object
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 5MB file size limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."
                ),
                false
            );
        }
    },
});
// Wrap upload middleware to handle errors consistently
// const uploadMiddleware = (req, res, next) => {
//     upload.fields([
//         { name: "project_logo", maxCount: 1 },
//         { name: "project_banner", maxCount: 1 },
//     ])(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).json({
//                 success: false,
//                 message: "File upload error",
//                 error: err.message,
//             });
//         } else if (err) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Unknown upload error",
//                 error: err.message,
//             });
//         }

//         if (!req.files || Object.keys(req.files).length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No files uploaded",
//             });
//         }

//         // Add file IDs to the request object
//         req.fileIds = {};
//         for (const [fieldName, files] of Object.entries(req.files)) {
//             if (files[0] && files[0].id) {
//                 req.fileIds[fieldName] = files[0].id;
//             } else {
//                 return res.status(500).json({
//                     success: false,
//                     message: `File upload failed for ${fieldName}`,
//                 });
//             }
//         }

//         next();
//     });
// };

module.exports = { upload };
