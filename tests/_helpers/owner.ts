import {Signer, Wallet} from "ethers";

export interface Owner {
	wallet: Wallet;
	signer: Signer;
}
