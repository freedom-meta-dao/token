// MUST IMPORT BEFORE OTHER HARDHAT LIBRARIES
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-jest-plugin';

import {Vesting} from '../typechain/types/Vesting';
import {ContractFactory} from 'ethers';
import VestingArtifact from '../dist/artifacts/src/contracts/Vesting.sol/Vesting.json';

const MOCK_BLOCK = 11145;
const MOCK_SUPPLY = 2 ** 18;
const MOCK_CLAIM_ROOT = '0x0170171c23281b16a3c58934162488ad6d039df686eca806f21eba0cebd03486';


describe('Vesting', () => {
	let contract: Vesting;
	let factory: ContractFactory;

	beforeAll(async () => {
		factory = await hre.ethers.getContractFactoryFromArtifact(VestingArtifact);
		contract = (await factory.deploy(MOCK_SUPPLY, MOCK_BLOCK, MOCK_CLAIM_ROOT) as Vesting);
		await contract.deployed();
	});

	it(`should return 0 when target wallet address is not vesting`, async () => {
		const instance = (await factory.deploy(MOCK_SUPPLY, MOCK_BLOCK, MOCK_CLAIM_ROOT) as Vesting);
		await instance.deployed();
	});

});
