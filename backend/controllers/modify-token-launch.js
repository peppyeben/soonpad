const asyncWrapper = require("../middleware/async");
const { CustomAPIError } = require("../errors");
const TokenLaunch = require("../model/token-launch");
const { default: mongoose } = require("mongoose");
const { PublicKey } = require("@solana/web3.js");

const modifyTokenLaunch = asyncWrapper(async (req, res) => {
    const { data, doc_id } = req.body;

    if (typeof data !== "object" || data === null || Object.keys(data).length === 0) {
        throw new CustomAPIError("data must be a non-empty object.", 400);
    }

    if (!data.token_launch_address || !validateSolanaPubKey(data.token_launch_address)) {
        throw new CustomAPIError("Invalid token launch address.", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(doc_id)) {
        throw new CustomAPIError("Invalid document ID.", 400);
    }

    const updatedDoc = await TokenLaunch.findByIdAndUpdate(
        doc_id,
        { token_launch_address: data.token_launch_address },
        { new: true }
    );

    if (!updatedDoc) {
        return res.status(404).json({ error: "Token launch not found" });
    }

    res.status(200).json({
        success: true,
        result: updatedDoc,
    });
});

module.exports = {
    modifyTokenLaunch,
};

const validateSolanaPubKey = (value) => {
    try {
        const pubkey = new PublicKey(value);
        return pubkey.toBase58() == value;
    } catch (e) {
        return false;
    }
};
