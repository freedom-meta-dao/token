// MUST IMPORT BEFORE OTHER HARDHAT LIBRARIES
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';
import {Contract, ContractFactory} from 'ethers';

const MOCK_SUPPLY = 1 ** 18;
const MOCK_CLAIM_ROOT = '0x0170171c23281b16a3c58934162488ad6d039df686eca806f21eba0cebd03486';
const MOCK_PROOF = '0xb94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';

describe('Airdrop', () => {
	let deployed: Contract;
	let factory: ContractFactory;

	beforeAll(async () => {
		factory = await hre.ethers.getContractFactory('Airdroppable');
		deployed = await factory.deploy(MOCK_CLAIM_ROOT, MOCK_SUPPLY);
		await deployed.deployed();
	});

	it(`should set merkle root to the claimRoot constructor argument`, () => {});
});
