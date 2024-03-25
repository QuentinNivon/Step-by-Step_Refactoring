const express = require('express');
const route = express.Router();
const path = require('path');
const fs = require('fs');
var date = Date.now();
var currentDirPath = "";
const mainController = require(path.resolve("controller", "mainController"));
const multer = require('multer');
const BPMN_FILENAME = "original.bpmn";
const DEPENDENCIES_FILENAME = "dependencies.dep";
const GLOBAL_INFORMATION_FILENAME = "global_information.inf";
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            currentDirPath = path.resolve("..", "public", "refactoring", date.toString());
            fs.mkdirSync(currentDirPath, { recursive: true });
            cb(null, currentDirPath);
        },
        filename: (req, file, cb) => {
            if (file.originalname.endsWith(".bpmn")) {
                cb(null, BPMN_FILENAME);
            } else if (file.originalname.endsWith(".dep")) {
                cb(null, DEPENDENCIES_FILENAME);
            } else if (file.originalname.endsWith(".inf")) {
                cb(null, GLOBAL_INFORMATION_FILENAME);
            } else {
                cb(null, "RANDOM_ERROR_FILE") //Should never happen thanks to fileFilter
            }
        }
		
    }),
	fileFilter: (req, file, cb) => {
		console.log(file.originalname);
		if (!file.originalname.endsWith(".bpmn")
			&& !file.originalname.endsWith(".dep")
			&& !file.originalname.endsWith(".inf")) {
			return cb(new Error("Unknown file \"" + file.originalname + "\"!"), false);
		}
		
		cb(null, true);
	}
});

//Function used to update the global variable ``date'' to the current date
const changeDate = (req, res, next) => {
  date = Date.now();
  next(); // Call next() to pass control to the next middleware
};

//Function used to update the req body
const updateBody = (req, res, next) => {
  //Escape backslashs on Windows otherwise JSON parser complains
  if (process.platform === "win32") {
    currentDirPath = currentDirPath.replace(/\\/g, "\\\\")
  }

  req.body = "{\"date\": \"" + date + "\", \"path\": \"" + currentDirPath + "\"}";
  console.log("JSON body: " + req.body);
  next(); // Call next() to pass control to the next middleware
};

route.get("/", mainController.index)
route.get("/maintenance", mainController.maintenance)
const cpUpload = upload.fields([
    { name: 'bpmn', maxCount: 1 },
    { name: 'resources', maxCount: 1 },
    { name: 'dependencies', maxCount: 1}
])
route.post("/uploadBPMN", changeDate, cpUpload, updateBody, mainController.uploadBPMN) //Clumsy but I do not know how to do it properly...
route.post("/acceptTask", mainController.acceptTask)
route.post("/declineTask", mainController.declineTask)
route.post("/acceptProcess", mainController.acceptProcess)
route.post("/declineProcess", mainController.declineProcess)
route.post("/computeTask", mainController.computeTask)

route.all("/*", function (req, res) {
    res.status(400).send({status: false, message: "The api you request is not available"})
})
module.exports = route;
