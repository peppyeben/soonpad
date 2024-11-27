const mongoose = require("mongoose");
const BigNumber = require("bignumber.js");
const validator = require("validator");
const { PublicKey, LAMPORTS_PER_SOL } = require("@solana/web3.js");

const TokenLaunchSchema = new mongoose.Schema({
    project_token_name: {
        type: "string",
        required: [true, "Must provide project token name"],
        trim: true,
        minlength: [5, "project token name cannot be less than 5 characters"],
        maxlength: [25, "project token name cannot be more than 25 characters"],
    },
    project_token_symbol: {
        type: "string",
        required: [true, "Must provide project token symbol"],
        trim: true,
        minlength: [2, "project token symbol cannot be less than 2 characters"],
        maxlength: [4, "project token symbol cannot be more than 4 characters"],
    },
    creator_pubkey: {
        type: "string",
        required: [true, "Must provide creator public key"],
        trim: true,
        validate: {
            validator: function (value) {
                return validateSolanaPubKey(value);
            },
            message: "Invalid Solana public key for the token launch creator",
        },
    },
    project_description: {
        type: "string",
        required: [true, "Must provide project description"],
        trim: true,
        minlength: [30, "project description cannot be less than 30 characters"],
        maxlength: [250, "project description cannot be more than 250 characters"],
    },
    project_token_total_supply: {
        type: String,
        required: [true, "Must provide token total supply"],
        validate: [
            {
                validator: function (v) {
                    const bigNumberValue = new BigNumber(
                        new BigNumber(v) * LAMPORTS_PER_SOL
                    );
                    return bigNumberValue.isGreaterThanOrEqualTo(
                        new BigNumber("5") * LAMPORTS_PER_SOL
                    );
                },
                message: "Total supply must be at least 5 lamports",
            },
        ],
    },
    max_alloc: {
        type: String,
        required: [true, "Must provide token launch max allocation"],
        validate: [
            {
                validator: function (v) {
                    const totalSupply = new BigNumber(this.project_token_total_supply);
                    const maxAlloc = new BigNumber(v);
                    return maxAlloc.isLessThanOrEqualTo(totalSupply);
                },
                message: "Max allocation must be less than or equal to total supply",
            },
        ],
    },
    min_contribution: {
        type: String,
        required: [true, "Must provide token launch minimum contribution"],
        validate: [
            {
                validator: function (v) {
                    const totalSupply = new BigNumber(this.project_token_total_supply);
                    const maxAlloc = new BigNumber(this.max_alloc);
                    const minContribution = new BigNumber(v);

                    return (
                        minContribution.isLessThanOrEqualTo(maxAlloc) &&
                        minContribution.isLessThanOrEqualTo(totalSupply)
                    );
                },
                message:
                    "Minimum contribution must be less than or equal to both max allocation and total supply",
            },
        ],
    },
    token_sale_rate: {
        type: String,
        required: [true, "Must provide token sale rate"],
        validate: {
            validator: function (v) {
                const tokenSaleRate = new BigNumber(v);
                return tokenSaleRate.isGreaterThan(0);
            },
        },
    },
    token_launch_address: {
        type: "string",
        validate: {
            validator: function (value) {
                return validateSolanaPubKey(value);
            },
            message: "Invalid solana address for the token launch",
        },
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    contact_telegram_handle: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return v ? /^@[a-zA-Z0-9_]{5,32}$/.test(v) : true;
            },
            message: "Invalid Telegram handle. Must start with @ and be 5-32 characters.",
        },
    },
    links: {
        website: {
            type: String,
            required: [true, "Must provide project website"],
            validate: {
                validator: function (v) {
                    return v
                        ? validator.isURL(v, {
                              protocols: ["http", "https"],
                              require_protocol: true,
                          })
                        : true;
                },
                message: "Please provide a valid URL starting with http:// or https://",
            },
        },
        project_twitter: {
            type: String,
            validate: {
                validator: function (v) {
                    return v ? /^https:\/\/x\.com\/[a-zA-Z0-9_]{1,15}$/.test(v) : true;
                },
                message: "Please provide a valid Twitter profile URL",
            },
        },
        pitch_deck: {
            type: String,
            validate: {
                validator: function (v) {
                    return v
                        ? validator.isURL(v, {
                              protocols: ["http", "https"],
                              require_protocol: true,
                          })
                        : true;
                },
                message: "Please provide a valid pitchdeck URL",
            },
        },
        other_links: [
            {
                type: String,
                validate: {
                    validator: function (v) {
                        return validator.isURL(v, {
                            protocols: ["http", "https"],
                            require_protocol: true,
                        });
                    },
                    message: "Please provide a valid URL",
                },
            },
        ],
    },
    images: {
        project_logo: {
            type: String, // Store GridFS file ID
            required: [true, "Project logo is required"],
            // validate: {
            //     validator: function (v) {
            //         return mongoose.Types.ObjectId.isValid(v);
            //     },
            //     message: "Invalid project logo file ID",
            // },
        },
        project_banner: {
            type: String, // Store GridFS file ID
            required: [true, "Project banner is required"],
            // validate: {
            //     validator: function (v) {
            //         return mongoose.Types.ObjectId.isValid(v);
            //     },
            //     message: "Invalid project banner file ID",
            // },
        },
    },
    whitelist_available: {
        type: Boolean,
        required: [true, "Project whitelist availability is required"],
        validate: {
            validator: function (v) {
                return typeof v == "boolean";
            },
            message: "Invalid whitelist status",
        },
    },
    whitelist_addresses: {
        type: [String],
        validate: {
            validator: function (addresses) {
                if (this.whitelist_available) {
                    return addresses.every((address) => validateSolanaPubKey(address));
                }
                return true;
            },
            message: "One or more addresses in the whitelist are invalid",
        },
    },
});

const validateSolanaPubKey = (value) => {
    try {
        const pubkey = new PublicKey(value);
        return pubkey.toBase58() == value;
    } catch (e) {
        return false;
    }
};

module.exports = mongoose.model("TokenLaunch", TokenLaunchSchema);
