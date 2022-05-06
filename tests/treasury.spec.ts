// MUST IMPORT BEFORE OTHER HARDHAT LIBRARIES
import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";
import {BigNumber} from "ethers";
import {Treasury, Treasury__factory} from "../typechain-types";
import type {Owner} from "./_helpers/owner";
import {ownerMk} from "./_helpers/owner/mk";

const MOCK_ADDR = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
const MOCK_SUPPLY = 1 ** 18;

describe("Treasury", () => {
	let contract: Treasury;
	let factory: Treasury__factory;
	let owner: Owner;

	beforeAll(async () => {
		hre;
		owner = await ownerMk();
		factory = new Treasury__factory(owner.signer);
		contract = await factory.deploy(MOCK_SUPPLY, MOCK_ADDR);
		await contract.deployed();
	});

	describe("Constructor", () => {
		let ctor: Treasury;
		const addr = "0x1ABC7154748d1ce5144478cdeB574ae244b939B5";
		const supply = 3 ** 18;

		beforeAll(async () => {
			ctor = (await factory.deploy(supply, addr)) as Treasury;
			await ctor.deployed();
		});

		it(`should set supply to provided arg`, async () => {
			expect(await ctor.treasurySupply()).toStrictEqual(BigNumber.from(supply));
		});

		it(`should set treasury addr to provided arg`, async () => {
			expect(await ctor.treasury()).toBe(addr);
		});
	});
});
