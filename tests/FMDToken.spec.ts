// MUST IMPORT BEFORE OTHER HARDHAT LIBRARIES
import hre from "hardhat";

import {BigNumber} from "ethers";
import "@nomiclabs/hardhat-ethers";
import "hardhat-jest-plugin";
import {FMDToken, FMDToken__factory} from "../typechain-types";
import {ownerMk} from "./_helpers/owner/mk";
import {Owner} from "./_helpers/owner";

const MOCK_NAME = "0x0";
const MOCK_SYMBOL = "FREE";
const MOCK_TREASURY_ADDR = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f983";
const MOCK_ADDR = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
const MOCK_CLAIM_ROOT = "0x0170171c23281b16a3c58934162488ad6d039df686eca806f21eba0cebd03486";
const MOCK_SUPPLY = 1 ** 18;
const MOCK_BLOCK_NUMBER = 111;

describe("FMDToken", () => {
	let contract: FMDToken;
	let factory: FMDToken__factory;
	let owner: Owner;

	beforeAll(async () => {
		owner = await ownerMk();
		hre.config.solpp.noFlatten = false;
		factory = new FMDToken__factory(owner.signer);

		contract = await factory.deploy(
			MOCK_ADDR,
			MOCK_SYMBOL,
			MOCK_SUPPLY,
			MOCK_TREASURY_ADDR,
			MOCK_SUPPLY,
			MOCK_CLAIM_ROOT,
			MOCK_SUPPLY,
			MOCK_CLAIM_ROOT
		);
		await contract.deployed();
	});

	describe("Constructor", () => {
		let ctorContract: FMDToken;
		const ctorName = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f873";
		const ctorSym = "ONEO";
		const ctorTreaAddr = "0x1f9841a43d2af3bf1d1762f925bdaddc4201f983";
		const ctorTreaSupply = 3 ** 18;
		const ctorAirdRoot = "0x0170171c23281b16a3c58934162488ad6d039df686eca806f21eba0cebd12387";
		const ctorAirdSupply = 5 ** 18;
		const ctorVestRoot = "0x0170171c23281b16a3c58934162488ad6d039df686eca806f21eba0cebd02431";
		const ctorVestSupply = 4 ** 18;

		beforeAll(async () => {
			ctorContract = await factory.deploy(
				ctorName,
				ctorSym,
				ctorTreaSupply,
				ctorTreaAddr,
				ctorAirdSupply,
				ctorAirdRoot,
				ctorVestSupply,
				ctorVestRoot
			);
			await ctorContract.deployed();
		});

		it(`should set contract symbol to provided arg`, async () => {
			expect(await ctorContract.symbol()).toBe(ctorSym);
		});

		it(`should set symbol name to provided arg`, async () => {
			expect(await ctorContract.name()).toBe(ctorName);
		});

		it(`should set treasury name to provided arg`, async () => {
			expect(await ctorContract.name()).toBe(ctorName);
		});

		it(`should set airdrop claim root to provided arg`, async () => {
			expect(await ctorContract.airdropClaimRoot()).toBe(ctorAirdRoot);
		});

		it(`should set airdrop supply to provided arg`, async () => {
			const value = BigNumber.from(ctorAirdSupply);
			expect(await ctorContract.airdropSupply()).toStrictEqual(value);
		});

		it(`should set vest claim root to provided arg`, async () => {
			expect(await ctorContract.vestClaimRoot()).toBe(ctorVestRoot);
		});

		it(`should set airdrop supply to provided arg`, async () => {
			expect(await ctorContract.vestSupply()).toStrictEqual(BigNumber.from(ctorVestSupply));
		});
	});

	it(`should set symbol to provided symbol arg`, async () => {
		const sym = "ONE";
		const instance: FMDToken = await factory.deploy(
			MOCK_ADDR,
			sym,
			MOCK_SUPPLY,
			MOCK_TREASURY_ADDR,
			MOCK_SUPPLY,
			MOCK_CLAIM_ROOT,
			MOCK_SUPPLY,
			MOCK_CLAIM_ROOT
		);
		await instance.deployed();
		expect(await instance.symbol()).toBe(sym);
	});
});
