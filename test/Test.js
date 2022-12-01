const { expect } = require("chai");

describe("Factory test", function () {
  it("Test", async function () {
    const [owner] = await ethers.getSigners();
    console.log("owner " + owner.address);

    let anyCall = owner.address;

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
    let factoryPortal = await FactoryPortal.deploy(anyCall, erc20GatewayFactory.address, erc721GatewayFactory.address, erc1155GatewayFactory.address, erc677GatewayFactory.address);
    await factoryPortal.deployed();
    console.log(`factoryPortal : ${factoryPortal.address}`);

    const gatewayTypes = [
      "ERC20Gateway_MintBurn",
      "ERC20Gateway_MintBurnFrom",
      "ERC20Gateway_Pool",
      "ERC721Gateway_MintBurn",
      "ERC721Gateway_Pool",
      "ERC1155Gateway_MintBurn",
      "ERC1155Gateway_Pool",
      "ERC677Gateway_MintBurn",
      "ERC677Gateway_MintBurnFrom",
      "ERC677Gateway_Pool"
    ]

    for (var i = 0; i < 10; i++) {
      let create_tx = await factoryPortal.create("0x0000000000000000000000000000000000000000", owner.address, 0, i);
      let create_rc = await create_tx.wait();
      let [addr] = create_rc.events[2].args;
      var gateway = await ethers.getContractAt("IGatewayInfo", addr);
      console.log(`gateway ${i} : ${gateway.address}`);

      let description = await gateway.description();
      console.log(`gateway ${i} description : ${description}`);
      expect(description).to.equal(gatewayTypes[i]);

      var anyCallApp = await ethers.getContractAt("AnyCallApp", addr);
      let accept_tx = await anyCallApp.acceptAdmin();
      await accept_tx.wait();
      let admin = await anyCallApp.admin()
      console.log(`gateway ${i} admin : ${admin}`);
      expect(admin).to.equal(owner.address);

      let anyCallProxy = await anyCallApp.anyCallProxy()
      console.log(`gateway ${i} anyCallProxy : ${anyCallProxy}`);
      expect(anyCallProxy).to.equal(anyCall);
    }
  })
});
