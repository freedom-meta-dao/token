import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "@toreda/hardhat-jest";
import "solidity-docgen";
import "@nomiclabs/hardhat-solpp";
import {config as dotEnvConfig} from "dotenv";
require("solidity-coverage");

// IMPORTANT: Hardhat must be imported AFTER all hardhat plugin
// imports. Plugins loaded after the hardhat import will not be loaded
// This is dumb, but out of our control.
import {HardhatUserConfig, task} from "hardhat/config";

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
		artifacts: "./dist/artifacts",
		tests: "./tests",
		root: ".",
		sources: "./contracts"
	},
	typechain: {
		target: "ethers-v5",
		alwaysGenerateOverloads: false,
		outDir: "./typechain-types",
		externalArtifacts: [
			"dist/artifacts/.cache/solpp-generated-contracts/(.+).sol/[a-zA-Z0-9_-+]+.(json)+$"
		]
	},

	solpp: {
		cwd: "./contracts"
	},
	docgen: {
		outputDir: "./docs",
		pages: "items",
		collapseNewlines: true,
		theme: "markdown"
	},
	solidity: {
		version: "0.8.4",
		settings: {
			optimizer: {
				enabled: true,
				runs: 50
			}
		}
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
			chainId: 31337,
			accounts: {
				mnemonic: "test test test test test test test test test test test junk",
				count: 10
			},
			throwOnCallFailures: true,
			throwOnTransactionFailures: true
		}
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
