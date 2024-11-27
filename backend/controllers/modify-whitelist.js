const asyncWrapper = require("../middleware/async");
const { CustomAPIError } = require("../errors");
const TokenLaunch = require("../model/token-launch");
const { PublicKey } = require("@solana/web3.js");

const modifyWhitelist = asyncWrapper(async (req, res) => {
    const { data, doc_id } = req.body;

    if (typeof data !== "object" || data === null || Object.keys(data).length === 0) {
        throw new CustomAPIError("data must be a non-empty object.", 400);
    }

    if (
        !Array.isArray(data.whitelist) ||
        data.whitelist === null ||
        data.whitelist.length === 0
    ) {
        throw new CustomAPIError(
            "data.whitelist must be a non-empty array of solana addresses",
            400
        );
    }

    const invalidAddresses = data.whitelist.filter((addr) => !validateSolanaPubKey(addr));
    if (invalidAddresses.length > 0) {
        // throw new CustomAPIError("One or more addresses are invalid", 400);
        throw new CustomAPIError(
            {
                error: "One or more addresses are invalid",
                invalidAddresses,
            },
            400
        );
    }

    const updatedDoc = await TokenLaunch.findByIdAndUpdate(
        doc_id,
        { $addToSet: { whitelist_addresses: { $each: data.whitelist } } },
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
    modifyWhitelist,
};

const validateSolanaPubKey = (value) => {
    try {
        const pubkey = new PublicKey(value);
        return pubkey.toBase58() == value;
    } catch (e) {
        return false;
    }
};
