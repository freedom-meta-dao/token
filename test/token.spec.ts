import '@nomiclabs/hardhat-ethers';

import {Contract, ContractFactory} from 'ethers';

import hre from 'hardhat';

const MOCK_AIRDROP_CLAIM_ROOT = 'b09a57d476ea01c7f91756adff1d560e579057ac99a28d3f30e259b30ecc9dc7';
const MOCK_AIRDROP_SUPPLY = 1 ** 18;
const MOCK_NAME = 'Freedom Token';
const MOCK_SYMBOL = 'FREE';
const MOCK_TREASURY_ADDR = '';
const MOCK_TREASURY_SUPPLY = 1 ** 18;
const MOCK_VEST_CLAIM_ROOT = 'b09a57d476ea01c7f91756adff1d560e579057ac99a28d3f30e259b30ecc9dc7';
const MOCK_VEST_SUPPLY = 1 ** 18;

describe('Vesting', () => {
	let deployed: Contract;
	let factory: ContractFactory;

	beforeAll(async () => {
		factory = await hre.ethers.getContractFactory('FreedomToken');
		deployed = await factory.deploy('Hello');
		await deployed.deployed();
	});

	it(`should set provided token symbol`, async () => {
		const expectedSymbol = 'AA9174';
		const Contract = await hre.ethers.getContractFactory('FreedomToken');
		const instance = await Contract.deploy(
			MOCK_NAME,
			expectedSymbol,
			MOCK_TREASURY_ADDR,
			MOCK_TREASURY_SUPPLY,
			MOCK_AIRDROP_SUPPLY,
			MOCK_AIRDROP_CLAIM_ROOT,
			MOCK_VEST_CLAIM_ROOT,
			MOCK_VEST_CLAIM_ROOT
		);

		expect(instance.symbol).toBe(expectedSymbol);
	});
	/***
	it("Should return the new greeting once it's changed", async () => {
		const Greeter = await ethers.getContractFactory('FreedomToken');

		const greeter = await Greeter.deploy('Hello, world!');
		await greeter.deployed();

		// wait until the transaction is mined
		//await setGreetingTx.wait();

		//expect(await greeter.greet()).to.equal('Hola, mundo!');
	});**/
});
