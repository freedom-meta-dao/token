// MUST IMPORT BEFORE OTHER HARDHAT LIBRARIES
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';
import {Contract, ContractFactory} from 'ethers';

const MOCK_NAME = '0x0';
const MOCK_SYMBOL = 'FREE';
const MOCK_TREASURY_ADDR = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f983';
const MOCK_ADDR = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';
const MOCK_CLAIM_ROOT = '0x0170171c23281b16a3c58934162488ad6d039df686eca806f21eba0cebd03486';
const MOCK_SUPPLY = 1 ** 18;
const MOCK_BLOCK_NUMBER = 111;

describe('FreedomToken', () => {
	let deployed: Contract;
	let factory: ContractFactory;

	beforeAll(async () => {
		factory = await hre.ethers.getContractFactory('FreedomToken');
		deployed = await factory.deploy(
			MOCK_ADDR,
			MOCK_SYMBOL,
			MOCK_TREASURY_ADDR,
			MOCK_SUPPLY,
			MOCK_CLAIM_ROOT,
			MOCK_SUPPLY,
			MOCK_CLAIM_ROOT,
			MOCK_SUPPLY
		);
		await deployed.deployed();
	});

	it(`should set symbol to provided symbol argument`, async () => {
		const sym = 'ONE';
		const Contract = await hre.ethers.getContractFactory('FreedomToken');
		const instance: Contract = await Contract.deploy(
			MOCK_ADDR,
			sym,
			MOCK_TREASURY_ADDR,
			MOCK_SUPPLY,
			MOCK_CLAIM_ROOT,
			MOCK_SUPPLY,
			MOCK_CLAIM_ROOT,
			MOCK_SUPPLY
		);
		await instance.deployed();
		expect(await instance.symbol()).toBe(sym);
	});
});
