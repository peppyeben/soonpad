const express = require("express");
const {
    createLaunch,
    modifyWhitelist,
    getTokenLaunch,
    modifyTokenLaunch,
} = require("../controllers");
const { checkRequiredHeaders } = require("../middleware");
const router = express.Router();

router
    .route("/launchpad")
    .get(checkRequiredHeaders, getTokenLaunch)
    .post(checkRequiredHeaders, createLaunch)
    .patch(checkRequiredHeaders, modifyTokenLaunch);

router.route("/whitelist").post(modifyWhitelist);

module.exports = router;
