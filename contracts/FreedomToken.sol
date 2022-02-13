// contracts/FreedomToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
// Import Ownable from the OpenZeppelin Contracts library
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {Airdroppable} from './Airdroppable.sol';
import {Treasurable} from './Treasurable.sol';
import {Vestable} from './Vestable.sol';

/// @title Freedom Token
/// @notice Freedom DAO Token
contract FreedomToken is ERC20, Ownable, Airdroppable, Treasurable, Vestable {
	constructor(
		string memory name,
		string memory symbol,
		address treasuryAddr,
		uint256 treasurySupply,
		bytes32 airdropClaimRoot,
		uint256 airdropSupply,
		bytes32 vestClaimRoot,
		uint256 vestSupply
	)
		ERC20(name, symbol)
		Airdroppable(airdropClaimRoot, airdropSupply)
		Treasurable(treasuryAddr, treasurySupply)
		Vestable(block.number, vestClaimRoot, vestSupply)
		Ownable()
	{
		_mint(msg.sender, 10**18);
	}
}
