const asyncWrapper = require("../middleware/async");
const { CustomAPIError } = require("../errors");
const TokenLaunch = require("../model/token-launch");

const createLaunch = asyncWrapper(async (req, res) => {
    const { data } = req.body;

    if (typeof data !== "object" || data === null || Object.keys(data).length === 0) {
        throw new CustomAPIError("data must be a non-empty object.", 400);
    }

    if (
        typeof data.links !== "object" ||
        data.links === null ||
        Object.keys(data.links).length === 0
    ) {
        throw new CustomAPIError("data.links must be a non-empty object.", 400);
    }

    if (
        typeof data.images !== "object" ||
        data.images === null ||
        Object.keys(data.images).length === 0
    ) {
        throw new CustomAPIError("data.images must be a non-empty object.", 400);
    }

    let {
        project_token_name,
        project_token_symbol,
        creator_pubkey,
        project_description,
        project_token_total_supply,
        max_alloc,
        min_contribution,
        token_sale_rate,
        token_launch_address,
        contact_telegram_handle,
        links,
        images,
        whitelist_available,
    } = data;

    let tokenLaunch = new TokenLaunch({
        project_token_name,
        project_token_symbol,
        creator_pubkey,
        project_description,
        project_token_total_supply,
        max_alloc,
        min_contribution,
        token_sale_rate,
        token_launch_address,
        contact_telegram_handle,
        links,
        images,
        whitelist_available,
    });

    await tokenLaunch.validate();

    await tokenLaunch.save();

    res.status(201).json({
        success: true,
        result: tokenLaunch._id,
    });
});

module.exports = {
    createLaunch,
};
