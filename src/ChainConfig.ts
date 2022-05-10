import { Chain } from "@usedapp/core";

export const Testnet: Chain = {
  chainId: 1666700000,
  chainName: "Harmony Testnet Shard 0",
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: "0xd078799c53396616844e2fa97f0dd2b4c145a685",
  getExplorerAddressLink: function (address: string): string {
    return `https://explorer.pops.one/address/${address}`;
  },
  getExplorerTransactionLink: function (txHash: string): string {
    return `https://explorer.pops.one/tx/${txHash}`;
  },
};
