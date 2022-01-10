require("@typechain/hardhat");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  typechain: {
    outDir: "./types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
  },

  solidity: "0.7.9",
  defaultNetwork: "localhost",
  networks: {
    matic: {
      url:
        "https://polygon-mumbai.g.alchemy.com/v2/I6_CU10SsmTGqIRlBfM7zO50wgrLgh8z",
      accounts: [
        "e88c7abce5856c490245a0baef186054719fe8a055b08f0c35906b8dcc4fd775",
      ],
    },
    rinkeby: {
      url:
        "https://eth-rinkeby.alchemyapi.io/v2/vQlebJT0Yvzo3jWvVdUjF53ty2xVaEAc",
      accounts: [
        "e88c7abce5856c490245a0baef186054719fe8a055b08f0c35906b8dcc4fd775",
      ],
    },
    hardhat: {
      accounts: [
        {
          privateKey:
            "0xbe6b42a4e3e67ffffc4d90c62c2c69cf72326e9307b04460ac623a85c50a3737",
          balance: "1000000000000000000000",
        },
        {
          privateKey:
            "0xda4fded32ff27d0505892af4ae26c109ca4cc187e2633e1bf506112d19264e37",
          balance: "1000000000000000000000",
        },
        {
          privateKey:
            "0xbb7e75994db07ef61a0c33efc60d72aa0863111fa297311c2e75b3971c9e063d",
          balance: "1000000000000000000000",
        },
        {
          privateKey:
            "0xfd0e22ff02cfa205d8cb34a4bd2b877b29282a194119c27532cc9fdbe03df113",
          balance: "1000000000000000000000",
        },
        {
          privateKey:
            "0xd57ecf846e6ee89cc46d9d58f4c347d5a9a6abb11168e1df063951b17c52a07f",
          balance: "1000000000000000000000",
        },
        {
          privateKey:
            "0xd1bae01e9ed0b5d720beadbdb5b7abfa2dfef754beba68525954c94b43069136",
          balance: "1000000000000000000000",
        },
        {
          privateKey:
            "0x6e285d331680f5efe6e814afc9dd710ab63a82fa3205aaca1b8879674aa7c463",
          balance: "1000000000000000000000",
        },
        {
          privateKey:
            "0x10ae0389fe976e0e3d4cfdbb7d38a9a96776cc1065e2fc8a084ed84375477ba5",
          balance: "1000000000000000000000",
        },
        {
          privateKey:
            "0x6a521aefeb5aa2327a8aeb0aa9e94154f4013d606f95912cb02f1eb6d224f6f5",
          balance: "1000000000000000000000",
        },
        {
          privateKey:
            "0xfd18b56760cae1220692f1490951a9e065f019055c26eddbf4cc6b29c57b5517",
          balance: "1000000000000000000000",
        },
      ],
    },
  },
};
