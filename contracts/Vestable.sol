// contracts/Vestable.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/// @title Freedom Token vesting functionality.
contract Vestable {
	struct VestClaimStatus {
		uint256 claimed;
		uint256 perBlock;
		uint256 blockGap;
		uint256 lastClaimBlock;
		uint256 total;
	}

	uint256 private immutable _initBlock;
	/** IMMUTABLE STORAGE */
	/// @notice Merkle root for token vesting participants.
	bytes32 public immutable vestRoot;
	/// @notice Total token supply allocated to vesting.
	uint256 public immutable vestSupply;
	/// @notice Total number of tokens claimed so far by all vesters.
	uint256 private _vestClaimTotal;
	/// @notice Claim Status for each wallet with vesting tokens.
	mapping(address => VestClaimStatus) private _vestClaims;

	/// @notice Emitted on successful vested token claim when the number of tokens claimed
	/// 		is 1 or more. Does not fire for 0 claims.
	/// @param to recipient of claim
	/// @param amt of tokens claimed
	event VestClaim(address indexed to, uint256 amt);

	/**	ERRORS	*/
	error VestWalletNotFound();
	error VestClaimExhausted();
	error VestClaimNotReady();
	error VestNoTokensClaimableYet();

	constructor(
		uint256 initBlock,
		bytes32 root,
		uint256 supply
	) {
		vestSupply = supply;
		vestRoot = root;
		_initBlock = initBlock;
		_vestClaimTotal = 0;
	}

	/// @notice Get number of vested wallet & claimable tokens for target wallet.
	function getVestedAmt(address target) public view returns (uint256) {
		if (_vestClaims[target].perBlock == 0) {
			return 0;
		}

		VestClaimStatus memory status = _vestClaims[target];
		if (block.number <= status.lastClaimBlock) {
			return 0;
		}

		uint256 blocks = block.number - status.lastClaimBlock;
		if (blocks < status.blockGap) {
			return 0;
		}

		return blocks * status.perBlock;
	}

	/// @notice Attempt to claim all vested tokens for wallet.
	function vestClaim(address to) external {
		VestClaimStatus memory vester = _vestClaims[to];

		if (vester.perBlock == 0) {
			revert VestWalletNotFound();
		}

		if (vester.claimed >= vester.total) {
			revert VestClaimExhausted();
		}

		uint256 amt = getVestedAmt(to);
		uint256 avail = vester.total - vester.claimed;

		if (amt == 0) {
			revert VestNoTokensClaimableYet();
		}

		if (avail == 0) {
			revert VestClaimExhausted();
		}

		// Decrease available claim to match available, if claiming the
		// current amount would put this wallet over total claim limit.
		if (amt > avail) {
			amt = avail;
		}

		if (vester.claimed + amt > vester.total) {
			amt = vester.total - vester.claimed;
		}

		// Update number of tokens claimed.
		_vestClaims[to].claimed = amt + vester.claimed;
		// Update last block on which tokens were claimed successfully.
		_vestClaims[to].lastClaimBlock = block.number;

		emit VestClaim(to, amt);
	}
}
