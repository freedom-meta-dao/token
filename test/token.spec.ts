import {Contract, ContractFactory} from 'ethers';

import {ethers} from 'hardhat';

describe('Vesting', () => {
	let deployed: Contract;
	let factory: ContractFactory;

	beforeAll(async () => {
		factory = await ethers.getContractFactory('FreedomToken');
		deployed = await factory.deploy('Hello');
		await deployed.deployed();
	});

	it("Should return the new greeting once it's changed", async () => {
		const Greeter = await ethers.getContractFactory('FreedomToken');

		const greeter = await Greeter.deploy('Hello, world!');
		await greeter.deployed();


		// wait until the transaction is mined
		//await setGreetingTx.wait();

		//expect(await greeter.greet()).to.equal('Hola, mundo!');
	});
});
