const hre = require("hardhat");

const anyCall = {
  "eth": "0xC10Ef9F491C9B59f936957026020C321651ac078",
  "arbitrum": "0xC10Ef9F491C9B59f936957026020C321651ac078",
  "optimism": "0xC10Ef9F491C9B59f936957026020C321651ac078",
  "polygon": "0xC10Ef9F491C9B59f936957026020C321651ac078",
  "fantom": "0xC10Ef9F491C9B59f936957026020C321651ac078",
  "avax": "0xC10Ef9F491C9B59f936957026020C321651ac078",
  "bsc": "0xC10Ef9F491C9B59f936957026020C321651ac078",
  "xana": "0x6D7BA8D9C42Ddee313E79a0018Fc69705d90E506"
}

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("owner " + owner.address);

  console.log("\ndeploy erc20 gateway factory");
  let ERC20GatewayFactory = await ethers.getContractFactory("ERC20GatewayFactory");
  let erc20GatewayFactory = await ERC20GatewayFactory.deploy();
  await erc20GatewayFactory.deployed();
  console.log(`erc20GatewayFactory : ${erc20GatewayFactory.address}`);

  console.log("\ndeploy erc721 gateway factory");
  let ERC721GatewayFactory = await ethers.getContractFactory("ERC721GatewayFactory");
  let erc721GatewayFactory = await ERC721GatewayFactory.deploy();
  await erc721GatewayFactory.deployed();
  console.log(`erc721GatewayFactory : ${erc721GatewayFactory.address}`);

  console.log("\ndeploy erc1155 gateway factory");
  let ERC1155GatewayFactory = await ethers.getContractFactory("ERC1155GatewayFactory");
  let erc1155GatewayFactory = await ERC1155GatewayFactory.deploy();
  await erc1155GatewayFactory.deployed();
  console.log(`erc1155GatewayFactory : ${erc1155GatewayFactory.address}`);

  console.log("\ndeploy erc677 gateway factory");
  let ERC677GatewayFactory = await ethers.getContractFactory("ERC677GatewayFactory");
  let erc677GatewayFactory = await ERC677GatewayFactory.deploy();
  await erc677GatewayFactory.deployed();
  console.log(`erc677GatewayFactory : ${erc677GatewayFactory.address}`);

  console.log("\ndeploy factory portal");
  let FactoryPortal = await ethers.getContractFactory("FactoryPortal");
  let factoryPortal = await FactoryPortal.deploy(anyCall[hre.network.name], erc20GatewayFactory.address, erc721GatewayFactory.address, erc1155GatewayFactory.address, erc677GatewayFactory.address);
  await factoryPortal.deployed();
  console.log(`factoryPortal : ${factoryPortal.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
