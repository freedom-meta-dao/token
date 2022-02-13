// MUST IMPORT BEFORE OTHER HARDHAT LIBRARIES
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';

import {Contract, ContractFactory} from 'ethers';

const MOCK_BLOCK = 11145;
const MOCK_SUPPLY = 2 ** 18;
const MOCK_ROOT = '0x0170171c23281b16a3c58934162488ad6d039df686eca806f21eba0cebd03486';

describe('Vestable', () => {
	let deployed: Contract;
	let factory: ContractFactory;

	beforeAll(async () => {
		factory = await hre.ethers.getContractFactory('Vestable');
		deployed = await factory.deploy(MOCK_BLOCK, MOCK_ROOT, MOCK_SUPPLY);
		await deployed.deployed();
	});

	it(`should do the thing`, async () => {

	});
});
