import { HardhatUserConfig } from "hardhat/config";
import "@matterlabs/hardhat-zksync";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  zksolc: {
    version: "latest",
    settings: {
      // Note: This must be true to call NonceHolder & ContractDeployer system contracts
      enableEraVMExtensions: false,
        libraries: {
              "contracts/libraries/NFTDescriptor.sol": {
                "NFTDescriptor": "0xDCB8390276fb6C9c689E02de9444161fb2e12a1f"
              }
            }
    },
  },
  defaultNetwork: "abstractTestnet",
  networks: {
    abstractTestnet: {
      url: "https://api.testnet.abs.xyz",
      ethNetwork: "sepolia",
      zksync: true,
      verifyURL:
        "https://api-explorer-verify.testnet.abs.xyz/contract_verification",
      accounts: process.env.TESTNET_PRIVATE_KEY ? [process.env.TESTNET_PRIVATE_KEY] : [],
    },
  },
  solidity: {
    version: "0.7.6",
  },
};

export default config;