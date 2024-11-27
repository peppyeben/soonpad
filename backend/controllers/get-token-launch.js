const asyncWrapper = require("../middleware/async");
const { CustomAPIError } = require("../errors");
const TokenLaunch = require("../model/token-launch");
const { default: mongoose } = require("mongoose");

const getTokenLaunch = asyncWrapper(async (req, res) => {
    const { data_creator_pubkey = null, data_doc_id = null } = req.query;

    let tokenLaunches;

    if (data_creator_pubkey || data_doc_id) {
        if (data_creator_pubkey) {
            tokenLaunches = await TokenLaunch.find({
                creator_pubkey: data_creator_pubkey,
            }).limit(20);
        }

        if (data_doc_id) {
            if (mongoose.Types.ObjectId.isValid(data_doc_id)) {
                tokenLaunches = await TokenLaunch.findById(data_doc_id);
                if (tokenLaunches) {
                    tokenLaunches = [tokenLaunches];
                }
            } else {
                throw new CustomAPIError("Invalid data_doc_id", 400);
            }
        }
    } else {
        tokenLaunches = await TokenLaunch.find().limit(50);
    }

    res.status(200).json({
        success: true,
        tokenLaunches: tokenLaunches.length > 0 ? tokenLaunches : [],
    });
});

module.exports = {
    getTokenLaunch,
};
