// This file shadows the 'wagmi' package in the root directory.
// We re-export the actual package content here to prevent build and runtime errors.
// Ideally, you should delete this file and rely on the import map.
// @ts-ignore
import * as WagmiPkg from "https://aistudiocdn.com/wagmi@^3.1.0";

export const {
  WagmiProvider,
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useWaitForTransactionReceipt,
  createConfig,
  http,
} = WagmiPkg as any;
