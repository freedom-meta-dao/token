// contracts/FreedomToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// Import Ownable from the OpenZeppelin Contracts library
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Airdrop} from "./Airdrop.sol";
import {Treasury} from "./Treasury.sol";
import {TokenVesting} from "./TokenVesting.sol";

/**
 * @title Freedom MetaDAO Token
 * @notice Token used in the Freedom MetaDAO ecosystem.
 */
contract Token is ERC20, Ownable, Airdrop, Treasury, TokenVesting {
	constructor(
		string memory name,
		string memory symbol,
		uint256 treasurySupply,
		address treasuryAddr,
		uint256 airdropSupply,
		bytes32 airdropClaimRoot,
		uint256 vestSupply,
		bytes32 vestClaimRoot
	)
		ERC20(name, symbol)
		Airdrop(airdropSupply, airdropClaimRoot)
		Treasury(treasurySupply, treasuryAddr)
		TokenVesting(vestSupply, block.number, vestClaimRoot)
		Ownable()
	{
		_mint(msg.sender, 10**18);
	}
}
