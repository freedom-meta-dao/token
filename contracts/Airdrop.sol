// Source: https://github.com/steve-ng/merkle-airdrop/blob/main/contracts/MerkleDistributor.sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';

/**
  Ref: https://github.com/Uniswap/merkle-distributor
 */
contract Airdrop {
	/**	IMMUTABLE STORAGE */
	/// @notice MerkleTree root for airdrop claimees.
	bytes32 public immutable airdropRoot;
	uint256 public immutable airdropSupply;
	uint256 private _airdropClaimTotal;

	/**	MUTABLE STORAGE */
	/// @notice Mapping of addresses who have claimed
	mapping(address => bool) public airdropClaims;

	/**	EVENTS	*/
	/// @notice Emitted after a successful token claim
	/// @param to recipient of claim
	/// @param amt of tokens claimed
	event AirdropClaim(address indexed to, uint256 amt);

	/**	ERRORS	*/
	/// @notice Throw when total token supply allocated to airdrop is claimed.
	error AirdropTokensAllClaimed();
	/// @notice Throw when wallet has already claimed airdrop.
	error AirdropAlreadyClaimed();
	/// @notice Thrown if address/amt not found in Merkle tree
	error AirdropAddressNotFound();

	constructor(uint256 supply, bytes32 root) {
		airdropRoot = root;
		airdropSupply = supply;
		_airdropClaimTotal = 0;
	}

	/// @notice Allows claiming tokens if address is part of merkle tree
	/// @param to address of claimee
	/// @param amt of tokens owed to claimee
	/// @param proof merkle proof to prove address and amt are in tree
	function airdropClaim(
		address to,
		uint256 amt,
		bytes32[] calldata proof
	) external {
		// Throw if address has already claimed tokens
		if (airdropClaims[to]) revert AirdropAlreadyClaimed();

		// Verify merkle proof, or revert if not in tree
		bytes32 leaf = keccak256(abi.encodePacked(to, amt));
		bool isValidLeaf = MerkleProof.verify(proof, airdropRoot, leaf);
		if (!isValidLeaf) revert AirdropAddressNotFound();

		// Set address to claimed
		airdropClaims[to] = true;

		// Mint tokens to address
		//_mint(to, amt);

		// Emit claim event
		emit AirdropClaim(to, amt);
	}
}
