// contracts/FreedomToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
// Import Ownable from the OpenZeppelin Contracts library
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {Airdrop} from './Airdrop.sol';
import {TreasurySupply} from './TreasurySupply.sol';
import {VestTree} from './VestTree.sol';

contract FreedomToken is ERC20, Ownable, Airdrop, TreasurySupply, VestTree {
	constructor(
		string memory name,
		string memory symbol,
		address treasuryAddr,
		uint256 treasurySupply,
		uint256 airdropSupply,
		bytes32 airdropClaimRoot,
		uint256 vestSupply,
		bytes32 vestClaimRoot
	)
		ERC20(name, symbol)
		Airdrop(airdropSupply, airdropClaimRoot)
		TreasurySupply(treasuryAddr, treasurySupply)
		VestTree(block.number, vestSupply, vestClaimRoot)
		Ownable()
	{
		_mint(msg.sender, 10**18);
	}
}
