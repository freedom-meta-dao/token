// contracts/Treasury.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

contract TreasurySupply is Ownable {
	address private _treasuryAddr;
	uint256 private immutable _treasurySupply;

	error TreasuryAddrNotChanged();
	event TreasuryAddrChange(address indexed to, address treasuryAddr);

	constructor(address addr, uint256 supply) {
		_treasuryAddr = addr;
		_treasurySupply = supply;
	}

	function treasurySupply() public view returns (uint256) {
		return _treasurySupply;
	}

	function treasury() public view returns (address) {
		return _treasuryAddr;
	}

	function setTreasury(address target) external onlyOwner {
		if (target == _treasuryAddr) {
			revert TreasuryAddrNotChanged();
		}

		emit TreasuryAddrChange(msg.sender, target);
	}
}
