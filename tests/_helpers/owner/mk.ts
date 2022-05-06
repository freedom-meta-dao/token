// MUST IMPORT BEFORE OTHER HARDHAT LIBRARIES
import hre from "hardhat";
import {Signer, Wallet} from "ethers";
import type {OwnerArgs} from "./args";
import type {Owner} from "../owner";

export async function ownerMk(args?: OwnerArgs): Promise<Owner> {
	let wallet: Wallet;
	let signer: Signer;

	wallet = hre.ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk");
	signer = await hre.ethers.getSigner(await wallet.getAddress());

	return {
		wallet: wallet,
		signer: signer
	};
}
