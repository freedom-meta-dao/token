// contracts/Treasury.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

/// @title Treasury Wallet Address Mgmt
/// @notice Manage wallet address for Freedom DAO's treasury.
contract TreasurySupply is Ownable {
	address private _treasuryAddr;
	uint256 private immutable _treasurySupply;

	error TreasuryAddrNotChanged();
	event TreasuryAddrChange(address indexed to, address treasuryAddr);

	constructor(address addr, uint256 supply) {
		_treasuryAddr = addr;
		_treasurySupply = supply;
	}

	/// @notice		Get token allocation amount for treasury.
	function treasurySupply() public view returns (uint256) {
		return _treasurySupply;
	}

	/// @return		Wallet address for Freedom DAO's Treasury.
	function treasury() public view returns (address) {
		return _treasuryAddr;
	}

	/// @notice 	Change the current treasury address.
	function setTreasury(address target) external onlyOwner {
		if (target == _treasuryAddr) {
			revert TreasuryAddrNotChanged();
		}

		emit TreasuryAddrChange(msg.sender, target);
	}
}
