import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-jest-plugin";

import "solidity-coverage";
import "@nomiclabs/hardhat-solpp";

import {HardhatUserConfig, task} from "hardhat/config";

import {config as dotEnvConfig} from "dotenv";

dotEnvConfig();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

/**
 * Token build config.
 */
const config: HardhatUserConfig = {
	defaultNetwork: "hardhat",
	paths: {
		artifacts: "dist/artifacts",
		tests: "tests",
		root: ".",
		sources: "src/contracts",
		cache: ".cache"
	},
	solidity: {
		compilers: [
			{
				version: "0.8.4",
				settings: {
					optimizer: {
						enabled: true,
						runs: 50
					}
				}
			}
		]
	},
	networks: {
		ropsten: {
			chainId: 3,
			url: process.env.ROPSTEN_URL || "",
			accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
		},
		bsctest: {
			chainId: 97,
			url: process.env.BSCTEST_URL || "",
			timeout: 1000
		},
		hardhat: {

		},
		localhost: {}
	},
	gasReporter: {
		enabled: process.env.REPORT_GAS !== undefined,
		currency: "USD"
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY
	}
};

export default config;
