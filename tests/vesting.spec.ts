// MUST IMPORT BEFORE OTHER HARDHAT LIBRARIES
import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";
import "hardhat-jest-plugin";

import {TokenVesting, TokenVesting__factory} from "../typechain-types";
import {ownerMk} from "./_helpers/owner/mk";
import {Owner} from "./_helpers/owner";

const MOCK_BLOCK = 11145;
const MOCK_SUPPLY = 2 ** 18;
const MOCK_CLAIM_ROOT = "0x0170171c23281b16a3c58934162488ad6d039df686eca806f21eba0cebd03486";

describe("TokenVesting", () => {
	let contract: TokenVesting;
	let factory: TokenVesting__factory;
	let owner: Owner;

	beforeAll(async () => {
		owner = await ownerMk();

		hre;
		factory = new TokenVesting__factory(owner.signer);
		contract = await factory.deploy(MOCK_SUPPLY, MOCK_BLOCK, MOCK_CLAIM_ROOT);
		await contract.deployed();
	});

	it(`should return 0 when target wallet address is not vesting`, async () => {
		const custom = await factory.deploy(MOCK_SUPPLY, MOCK_BLOCK, MOCK_CLAIM_ROOT);
		await custom.deployed();
	});
});
