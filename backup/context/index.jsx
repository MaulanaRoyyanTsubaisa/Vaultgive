import React, { useContext, createContext } from "react";
import { ThirdwebProvider, useAddress, useContract, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

// Disable Thirdweb analytics
window.thirdweb = {
  analytics: {
    enabled: false,
  },
};

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xD0fCAd99415ce7B5746F61268768aA122Fa94df8"
  );

  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const publishCampaign = async (form) => {
    try {
      const targetAmount = ethers.utils.parseUnits(form.target, 18).toString();
      const deadline = new Date(form.deadline).getTime().toString();
      
      const data = await contract.createCampaign(
        address, // owner
        form.title, // title
        form.description, // description
        targetAmount, // target amount as string
        deadline, // deadline as string
        form.image,
        form.category // category
      );

      console.log("contract call success", data);
      return data;
    } catch (error) {
      console.error("contract call failure:", error);
      throw error;
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      category: campaign.category,
      pId: i,
    }));

    return parsedCampaings;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    try {
      const value = ethers.utils.parseEther(amount).toString();
      const data = await contract.donateToCampaign(pId, {
        value: value
      });
      return data;
    } catch (error) {
      console.error("Donation error:", error);
      throw error;
    }
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        disconnect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
