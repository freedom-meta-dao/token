// MUST IMPORT BEFORE OTHER HARDHAT LIBRARIES
import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";
import {BigNumber, Contract, ContractFactory} from "ethers";
import TreasuryArtifact from "../dist/artifacts/src/contracts/Treasury.sol/Treasury.json";
import {Treasury} from "../typechain/types/Treasury";

const MOCK_ADDR = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
const MOCK_SUPPLY = 1 ** 18;

describe("Treasury", () => {
	let contract: Treasury;
	let factory: ContractFactory;

	beforeAll(async () => {
		factory = await hre.ethers.getContractFactoryFromArtifact(TreasuryArtifact);
		contract = (await factory.deploy(MOCK_SUPPLY, MOCK_ADDR)) as Treasury;
		await contract.deployed();
	});

	describe("Constructor", () => {
		let ctor: Contract;
		const addr = "0x1abc7154748d1ce5144478cdeb574ae244b939b5";
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
