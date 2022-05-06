// MUST IMPORT BEFORE OTHER HARDHAT LIBRARIES
import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";
import "hardhat-jest-plugin";
import {Airdrop, Airdrop__factory} from "../typechain-types";
import {Signer, Wallet} from "ethers";
import {ownerMk} from "./_helpers/owner/mk";
import {Owner} from "./_helpers/owner";

const MOCK_SUPPLY = 1 ** 18;
const MOCK_CLAIM_ROOT = "0x0170171c23281b16a3c58934162488ad6d039df686eca806f21eba0cebd03486";
const MOCK_PROOF = "0xb94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9";

describe("Airdrop", () => {
	hre;
	let owner: Owner;
	let contract: Airdrop;
	let factory: Airdrop__factory;

	beforeAll(async () => {
		owner = await ownerMk();

		factory = new Airdrop__factory(owner.signer);
		contract = await factory.deploy(MOCK_SUPPLY, MOCK_CLAIM_ROOT);
		await contract.deployed();
	});

	it(`should set merkle root to the claimRoot constructor argument`, async () => {

	});
});
