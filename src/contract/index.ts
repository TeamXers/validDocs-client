import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import abi from "./abi.json";

const contractInterface = new utils.Interface(abi);

if (!process.env.REACT_APP_CONTRACT_ADDRESS) {
  throw new Error("Contract address not set!");
}
export const contract = new Contract(
  process.env.REACT_APP_CONTRACT_ADDRESS,
  contractInterface
);
