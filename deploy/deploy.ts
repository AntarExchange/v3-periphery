import { deployContract } from './helper'
import {
  NFTDescriptor,
  NonfungibleTokenPositionDescriptor,
  NonfungiblePositionManager,
} from '../typechain-types'
import * as dotenv from "dotenv";

import { ethers, run } from "hardhat";
import { Deployer } from "@matterlabs/hardhat-zksync";
import { HardhatRuntimeEnvironment } from 'hardhat/types'
dotenv.config();

export default async function (hre: HardhatRuntimeEnvironment) {

  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)

  const wethLabelHex = ethers.encodeBytes32String('WETH')
  const v3Factory = {
    address: '0xbca93c225E068592a7d675f6ccC5749bd6DDB47f',
  }

  const weth = await ethers.getContractAt('IERC20', '0x9EDCde0257F2386Ce177C3a7FCdd97787F0D841d')

  //const swapRouter = await deployContract('SwapRouter', [v3Factory.address, await weth.getAddress()], 'SwapRouter', {})
   const swapRouter = await ethers.getContractAt('SwapRouter', '0x0D253f17702324967091bBcC31Fad1C505f27770')
  // const nftDescriptor = await deployContract<NFTDescriptor>('NFTDescriptor', [], 'NFTDescriptor', {})
  const nftDescriptor = await ethers.getContractAt('NFTDescriptor', '0xDCB8390276fb6C9c689E02de9444161fb2e12a1f')

 // const proxyAdmin = await deployContract<ProxyAdmin>('ProxyAdmin', [], 'ProxyAdmin', {})
 //  const proxyAdmin = await ethers.getContractAt('ProxyAdmin', '0xeF4bBf2E26ce340D1E62713ade5Ad219C85478F0')

  // const nftPositionDescriptor = await deployContract<NonfungibleTokenPositionDescriptor>(
  //   'NonfungibleTokenPositionDescriptor',
  //   [await weth.getAddress(), wethLabelHex],
  //   'NonfungibleTokenPositionDescriptor',
  //   {
  //     libraries: {
  //       NFTDescriptor: await nftDescriptor.getAddress(),
  //     },
  //   }
  // )
  const nftPositionDescriptor = await ethers.getContractAt(
    'NonfungibleTokenPositionDescriptor',
    '0xE4c2f3Ae0d25c9d58cf0A9211eb0dbB7925D346d'
  )

  // const nftPositionDescriptorProxy = await deployContract<TransparentUpgradeableProxy>(
  //   'TransparentUpgradeableProxy',
  //   [await nftPositionDescriptor.getAddress(), await proxyAdmin.getAddress(), '0x'],
  //   'NonfungibleTokenPositionDescriptorProxy',
  //   {}
  // )
  // const nftPositionDescriptorProxy = await ethers.getContractAt(
  //   'NonfungibleTokenPositionDescriptor',
  //   '0xa31E6Cf7Ce019bC30dB702F9fa74B0b1444149a3'
  // )
  const nftPositionManager = await deployContract<NonfungiblePositionManager>(
    'NonfungiblePositionManager',
    [v3Factory.address, await weth.getAddress(), "0xa31E6Cf7Ce019bC30dB702F9fa74B0b1444149a3"],
    'NonfungiblePositionManager',
    {}
  )
  // const quoterV2 = await deployContract('QuoterV2', [v3Factory.address, await weth.getAddress()], 'QuoterV2', {})
  // const tickLens = await deployContract('TickLens', [], 'TickLens', {})
  // const uniswapInteraceMulticall = await deployContract(
  //   'UniswapInterfaceMulticall',
  //   [],
  //   'UniswapInterfaceMulticall',
  //   {}
  // )

  // const quoter = await deployContract('Quoter', [v3Factory.address, await weth.getAddress()], 'Quoter', {})
  const v3Migrator = await deployContract(
    'V3Migrator',
    [v3Factory.address, await weth.getAddress(), await nftPositionManager.getAddress()],
    'V3Migrator',
    {}
  )
}