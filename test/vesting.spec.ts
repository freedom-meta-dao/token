import '@nomiclabs/hardhat-ethers';

import {Contract, ContractFactory} from 'ethers';

import hre from 'hardhat';

describe('Vesting', () => {
	let deployed: Contract;
	let factory: ContractFactory;

	beforeAll(async () => {
		factory = await hre.ethers.getContractFactory('Vesting');
		deployed = await factory.deploy('Hello');
		await deployed.deployed();
	});


	it("Should return the new greeting once it's changed", async  () => {
		const Greeter = await hre.ethers.getContractFactory('Greeter');
		const greeter = await Greeter.deploy('Hello, world!');
		await greeter.deployed();

		//expect(await greeter.greet()).to.equal('Hello, world!');

		const setGreetingTx = await greeter.setGreeting('Hola, mundo!');

		// wait until the transaction is mined
		await setGreetingTx.wait();

		//expect(await greeter.greet()).to.equal('Hola, mundo!');
	});
});
