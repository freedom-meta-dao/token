// MUST IMPORT BEFORE OTHER HARDHAT LIBRARIES
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';
import {ContractFactory} from 'ethers';
import {Airdrop} from '../typechain/types/Airdrop';
import AirdropArtifact from '../dist/artifacts/src/contracts/Airdrop.sol/Airdrop.json';

const MOCK_SUPPLY = 1 ** 18;
const MOCK_CLAIM_ROOT = '0x0170171c23281b16a3c58934162488ad6d039df686eca806f21eba0cebd03486';
const MOCK_PROOF = '0xb94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';

describe('Airdrop', () => {
	let contract: Airdrop;
	let factory: ContractFactory;

	beforeAll(async () => {
		factory = await hre.ethers.getContractFactoryFromArtifact(AirdropArtifact);
		contract = (await factory.deploy(MOCK_SUPPLY, MOCK_CLAIM_ROOT)) as Airdrop;
		await contract.deployed();
	});

	it(`should set merkle root to the claimRoot constructor argument`, () => {});
});
