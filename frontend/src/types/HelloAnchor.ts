export type HelloAnchor = {
    version: "0.1.0";
    name: "hello_anchor";
    instructions: [
        {
            name: "initializeTokenLaunch";
            accounts: [
                {
                    name: "userAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "tokenLaunchpadAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "mint";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "tokenMetadataAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "associatedTokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "payer";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "tokenConfig";
                    type: {
                        defined: "TokenConfig";
                    };
                },
                {
                    name: "tokenLaunchMetadata";
                    type: "string";
                },
                {
                    name: "isWlAvailable";
                    type: "bool";
                }
            ];
        },
        {
            name: "contributeToLaunch";
            accounts: [
                {
                    name: "tokenLaunchpadAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "launchpadMintAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "contributorTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "contributorAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "whitelistAccount";
                    isMut: false;
                    isSigner: false;
                    isOptional: true;
                },
                {
                    name: "payer";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "associatedTokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "launchpadAuthorityPubkey";
                    type: "publicKey";
                },
                {
                    name: "launchpadIdNo";
                    type: "u64";
                },
                {
                    name: "contributionAmount";
                    type: "u64";
                }
            ];
        },
        {
            name: "openSaleOnDex";
            accounts: [
                {
                    name: "tokenLaunchpadAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "launchpadMintAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "adminAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "adminTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "tokenLaunchpadTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "signer";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "rent";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "associatedTokenProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "launchpadAuthorityPubkey";
                    type: "publicKey";
                },
                {
                    name: "launchpadIdNo";
                    type: "u64";
                }
            ];
        },
        {
            name: "initAdminAccount";
            accounts: [
                {
                    name: "adminAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "payer";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [];
        },
        {
            name: "initContributorAccount";
            accounts: [
                {
                    name: "contributorAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "payer";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "tokenLaunchpadAccount";
                    type: "publicKey";
                }
            ];
        },
        {
            name: "initWhitelistAccount";
            accounts: [
                {
                    name: "whitelistAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "tokenLaunchpadAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "authority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "launchpadAuthorityPubkey";
                    type: "publicKey";
                },
                {
                    name: "launchpadIdNo";
                    type: "u64";
                }
            ];
        },
        {
            name: "updateWhitelistAccount";
            accounts: [
                {
                    name: "whitelistAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "tokenLaunchpadAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "authority";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "whitelistAddresses";
                    type: {
                        vec: "publicKey";
                    };
                },
                {
                    name: "launchpadAuthorityPubkey";
                    type: "publicKey";
                },
                {
                    name: "launchpadIdNo";
                    type: "u64";
                }
            ];
        },
        {
            name: "createUserAccount";
            accounts: [
                {
                    name: "userAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "payer";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [];
        }
    ];
    accounts: [
        {
            name: "adminAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "authority";
                        type: "publicKey";
                    }
                ];
            };
        },
        {
            name: "tokenMetadataAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "mint";
                        type: "publicKey";
                    },
                    {
                        name: "authority";
                        type: "publicKey";
                    },
                    {
                        name: "name";
                        type: "string";
                    },
                    {
                        name: "symbol";
                        type: "string";
                    },
                    {
                        name: "uri";
                        type: "string";
                    },
                    {
                        name: "decimals";
                        type: "u8";
                    }
                ];
            };
        },
        {
            name: "tokenLaunchpadAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "authority";
                        type: "publicKey";
                    },
                    {
                        name: "tokenMint";
                        type: "publicKey";
                    },
                    {
                        name: "totalSupply";
                        type: "u64";
                    },
                    {
                        name: "tokensDistributed";
                        type: "u64";
                    },
                    {
                        name: "tokenLaunchMetadata";
                        type: "string";
                    },
                    {
                        name: "tokenRate";
                        type: "u64";
                    },
                    {
                        name: "idoPercentage";
                        type: "u64";
                    },
                    {
                        name: "adminFee";
                        type: "u64";
                    },
                    {
                        name: "maxAllocPerWallet";
                        type: "u64";
                    },
                    {
                        name: "minContributionPerWallet";
                        type: "u64";
                    },
                    {
                        name: "wlAvailable";
                        type: "bool";
                    }
                ];
            };
        },
        {
            name: "contributorAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "amountContributed";
                        type: "u64";
                    },
                    {
                        name: "amountOfTokensReceived";
                        type: "u64";
                    }
                ];
            };
        },
        {
            name: "whitelistAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "whitelistAddresses";
                        type: {
                            vec: "publicKey";
                        };
                    },
                    {
                        name: "authority";
                        type: "publicKey";
                    }
                ];
            };
        },
        {
            name: "userAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "noOfTokenLaunches";
                        type: "u64";
                    }
                ];
            };
        }
    ];
    types: [
        {
            name: "TokenConfig";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "name";
                        type: "string";
                    },
                    {
                        name: "symbol";
                        type: "string";
                    },
                    {
                        name: "uri";
                        type: "string";
                    },
                    {
                        name: "decimals";
                        type: "u8";
                    },
                    {
                        name: "totalSupply";
                        type: "u64";
                    },
                    {
                        name: "tokenRate";
                        type: "u64";
                    },
                    {
                        name: "maxAllocPerWallet";
                        type: "u64";
                    },
                    {
                        name: "minContributionPerWallet";
                        type: "u64";
                    }
                ];
            };
        }
    ];
    events: [
        {
            name: "ContributionEvent";
            fields: [
                {
                    name: "contributor";
                    type: "publicKey";
                    index: false;
                },
                {
                    name: "amount";
                    type: "u64";
                    index: false;
                },
                {
                    name: "tokensReceived";
                    type: "u64";
                    index: false;
                },
                {
                    name: "launchpad";
                    type: "publicKey";
                    index: false;
                }
            ];
        }
    ];
    errors: [
        {
            code: 6000;
            name: "TokenNameTooLong";
            msg: "Token name is too long";
        },
        {
            code: 6001;
            name: "TokenSymbolTooLong";
            msg: "Token symbol is too long";
        },
        {
            code: 6002;
            name: "TokenUriTooLong";
            msg: "Token URI is too long";
        },
        {
            code: 6003;
            name: "InvalidDecimals";
            msg: "Invalid decimal places";
        },
        {
            code: 6004;
            name: "InvalidTotalSupply";
            msg: "Invalid total supply";
        },
        {
            code: 6005;
            name: "ArithmeticOverflow";
            msg: "Arithmetic Overflow";
        },
        {
            code: 6006;
            name: "ExceedsMaxAlloc";
            msg: "Exceeds Max Allocation";
        },
        {
            code: 6007;
            name: "ExceedsAvailableTokens";
            msg: "Exceeds Available Tokens";
        },
        {
            code: 6008;
            name: "NoAccess";
            msg: "No Access";
        },
        {
            code: 6009;
            name: "WlModeNotSetInitially";
            msg: "Whitelist wasn't set to true initially";
        },
        {
            code: 6010;
            name: "WlExceedsMaxLength";
            msg: "Whitelist exceeds max length";
        },
        {
            code: 6011;
            name: "EmptyAddressWL";
            msg: "Whitelist to add is empty";
        },
        {
            code: 6012;
            name: "UserNotWhitelisted";
            msg: "User not in whitelist";
        },
        {
            code: 6013;
            name: "WhitelistAccountNotProvided";
            msg: "Whitelist was not initialized";
        },
        {
            code: 6014;
            name: "MinContributionGTEMaxAlloc";
            msg: "Minimum contribution cannot be greater than or eq to Max Alloc";
        },
        {
            code: 6015;
            name: "ContributionAmountNotInRange";
            msg: "Contribution emount must be gte Min. Contribution Amount and lte Max. Alloc";
        },
        {
            code: 6016;
            name: "SaleNotComplete";
            msg: "Percentage for launchpad sale not reached yet";
        }
    ];
};

export const IDL: HelloAnchor = {
    version: "0.1.0",
    name: "hello_anchor",
    instructions: [
        {
            name: "initializeTokenLaunch",
            accounts: [
                {
                    name: "userAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "tokenLaunchpadAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "mint",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "tokenMetadataAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "associatedTokenProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "tokenConfig",
                    type: {
                        defined: "TokenConfig",
                    },
                },
                {
                    name: "tokenLaunchMetadata",
                    type: "string",
                },
                {
                    name: "isWlAvailable",
                    type: "bool",
                },
            ],
        },
        {
            name: "contributeToLaunch",
            accounts: [
                {
                    name: "tokenLaunchpadAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "launchpadMintAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "contributorTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "contributorAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "whitelistAccount",
                    isMut: false,
                    isSigner: false,
                    isOptional: true,
                },
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "associatedTokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "launchpadAuthorityPubkey",
                    type: "publicKey",
                },
                {
                    name: "launchpadIdNo",
                    type: "u64",
                },
                {
                    name: "contributionAmount",
                    type: "u64",
                },
            ],
        },
        {
            name: "openSaleOnDex",
            accounts: [
                {
                    name: "tokenLaunchpadAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "launchpadMintAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "adminAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "adminTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "tokenLaunchpadTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "signer",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "rent",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "associatedTokenProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "launchpadAuthorityPubkey",
                    type: "publicKey",
                },
                {
                    name: "launchpadIdNo",
                    type: "u64",
                },
            ],
        },
        {
            name: "initAdminAccount",
            accounts: [
                {
                    name: "adminAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: "initContributorAccount",
            accounts: [
                {
                    name: "contributorAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "tokenLaunchpadAccount",
                    type: "publicKey",
                },
            ],
        },
        {
            name: "initWhitelistAccount",
            accounts: [
                {
                    name: "whitelistAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "tokenLaunchpadAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "authority",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "launchpadAuthorityPubkey",
                    type: "publicKey",
                },
                {
                    name: "launchpadIdNo",
                    type: "u64",
                },
            ],
        },
        {
            name: "updateWhitelistAccount",
            accounts: [
                {
                    name: "whitelistAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "tokenLaunchpadAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "authority",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "whitelistAddresses",
                    type: {
                        vec: "publicKey",
                    },
                },
                {
                    name: "launchpadAuthorityPubkey",
                    type: "publicKey",
                },
                {
                    name: "launchpadIdNo",
                    type: "u64",
                },
            ],
        },
        {
            name: "createUserAccount",
            accounts: [
                {
                    name: "userAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
    ],
    accounts: [
        {
            name: "adminAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "authority",
                        type: "publicKey",
                    },
                ],
            },
        },
        {
            name: "tokenMetadataAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "mint",
                        type: "publicKey",
                    },
                    {
                        name: "authority",
                        type: "publicKey",
                    },
                    {
                        name: "name",
                        type: "string",
                    },
                    {
                        name: "symbol",
                        type: "string",
                    },
                    {
                        name: "uri",
                        type: "string",
                    },
                    {
                        name: "decimals",
                        type: "u8",
                    },
                ],
            },
        },
        {
            name: "tokenLaunchpadAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "authority",
                        type: "publicKey",
                    },
                    {
                        name: "tokenMint",
                        type: "publicKey",
                    },
                    {
                        name: "totalSupply",
                        type: "u64",
                    },
                    {
                        name: "tokensDistributed",
                        type: "u64",
                    },
                    {
                        name: "tokenLaunchMetadata",
                        type: "string",
                    },
                    {
                        name: "tokenRate",
                        type: "u64",
                    },
                    {
                        name: "idoPercentage",
                        type: "u64",
                    },
                    {
                        name: "adminFee",
                        type: "u64",
                    },
                    {
                        name: "maxAllocPerWallet",
                        type: "u64",
                    },
                    {
                        name: "minContributionPerWallet",
                        type: "u64",
                    },
                    {
                        name: "wlAvailable",
                        type: "bool",
                    },
                ],
            },
        },
        {
            name: "contributorAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "amountContributed",
                        type: "u64",
                    },
                    {
                        name: "amountOfTokensReceived",
                        type: "u64",
                    },
                ],
            },
        },
        {
            name: "whitelistAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "whitelistAddresses",
                        type: {
                            vec: "publicKey",
                        },
                    },
                    {
                        name: "authority",
                        type: "publicKey",
                    },
                ],
            },
        },
        {
            name: "userAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "noOfTokenLaunches",
                        type: "u64",
                    },
                ],
            },
        },
    ],
    types: [
        {
            name: "TokenConfig",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "name",
                        type: "string",
                    },
                    {
                        name: "symbol",
                        type: "string",
                    },
                    {
                        name: "uri",
                        type: "string",
                    },
                    {
                        name: "decimals",
                        type: "u8",
                    },
                    {
                        name: "totalSupply",
                        type: "u64",
                    },
                    {
                        name: "tokenRate",
                        type: "u64",
                    },
                    {
                        name: "maxAllocPerWallet",
                        type: "u64",
                    },
                    {
                        name: "minContributionPerWallet",
                        type: "u64",
                    },
                ],
            },
        },
    ],
    events: [
        {
            name: "ContributionEvent",
            fields: [
                {
                    name: "contributor",
                    type: "publicKey",
                    index: false,
                },
                {
                    name: "amount",
                    type: "u64",
                    index: false,
                },
                {
                    name: "tokensReceived",
                    type: "u64",
                    index: false,
                },
                {
                    name: "launchpad",
                    type: "publicKey",
                    index: false,
                },
            ],
        },
    ],
    errors: [
        {
            code: 6000,
            name: "TokenNameTooLong",
            msg: "Token name is too long",
        },
        {
            code: 6001,
            name: "TokenSymbolTooLong",
            msg: "Token symbol is too long",
        },
        {
            code: 6002,
            name: "TokenUriTooLong",
            msg: "Token URI is too long",
        },
        {
            code: 6003,
            name: "InvalidDecimals",
            msg: "Invalid decimal places",
        },
        {
            code: 6004,
            name: "InvalidTotalSupply",
            msg: "Invalid total supply",
        },
        {
            code: 6005,
            name: "ArithmeticOverflow",
            msg: "Arithmetic Overflow",
        },
        {
            code: 6006,
            name: "ExceedsMaxAlloc",
            msg: "Exceeds Max Allocation",
        },
        {
            code: 6007,
            name: "ExceedsAvailableTokens",
            msg: "Exceeds Available Tokens",
        },
        {
            code: 6008,
            name: "NoAccess",
            msg: "No Access",
        },
        {
            code: 6009,
            name: "WlModeNotSetInitially",
            msg: "Whitelist wasn't set to true initially",
        },
        {
            code: 6010,
            name: "WlExceedsMaxLength",
            msg: "Whitelist exceeds max length",
        },
        {
            code: 6011,
            name: "EmptyAddressWL",
            msg: "Whitelist to add is empty",
        },
        {
            code: 6012,
            name: "UserNotWhitelisted",
            msg: "User not in whitelist",
        },
        {
            code: 6013,
            name: "WhitelistAccountNotProvided",
            msg: "Whitelist was not initialized",
        },
        {
            code: 6014,
            name: "MinContributionGTEMaxAlloc",
            msg: "Minimum contribution cannot be greater than or eq to Max Alloc",
        },
        {
            code: 6015,
            name: "ContributionAmountNotInRange",
            msg: "Contribution emount must be gte Min. Contribution Amount and lte Max. Alloc",
        },
        {
            code: 6016,
            name: "SaleNotComplete",
            msg: "Percentage for launchpad sale not reached yet",
        },
    ],
};
