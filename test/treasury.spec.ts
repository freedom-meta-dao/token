// MUST IMPORT BEFORE OTHER HARDHAT LIBRARIES
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';
import {Contract, ContractFactory} from 'ethers';

const MOCK_ADDR = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';
const MOCK_SUPPLY = 1 ** 18;

describe('Treasurable', () => {
	let deployed: Contract;
	let factory: ContractFactory;

	beforeAll(async () => {
		factory = await hre.ethers.getContractFactory('Treasurable');
		deployed = await factory.deploy(MOCK_ADDR, MOCK_SUPPLY);
		await deployed.deployed();
	});

	it(`should do the thing`, async () => {});
});
