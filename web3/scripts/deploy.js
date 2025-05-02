async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const Contract = await ethers.getContractFactory("CrowdFunding");
  const contract = await Contract.deploy();

  // Untuk Hardhat v6+ gunakan waitForDeployment()
  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
