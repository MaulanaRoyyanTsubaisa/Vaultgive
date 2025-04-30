import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";
import { categories } from "../constants/categories";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  useEffect(() => {
    if (location.state?.filteredCampaigns) {
      setCampaigns(location.state.filteredCampaigns);
    }
  }, [location]);

  const sortCampaigns = (campaigns) => {
    let sortedCampaigns = [...campaigns];

    // Filter by category if selected
    if (selectedCategory) {
      sortedCampaigns = sortedCampaigns.filter(
        (campaign) => campaign.category === selectedCategory
      );
    }

    // Sort campaigns
    switch (sortBy) {
      case "newest":
        sortedCampaigns.sort((a, b) => b.deadline - a.deadline);
        break;
      case "oldest":
        sortedCampaigns.sort((a, b) => a.deadline - b.deadline);
        break;
      case "highest":
        sortedCampaigns.sort(
          (a, b) =>
            parseFloat(b.amountCollected) - parseFloat(a.amountCollected)
        );
        break;
      case "lowest":
        sortedCampaigns.sort(
          (a, b) =>
            parseFloat(a.amountCollected) - parseFloat(b.amountCollected)
        );
        break;
      default:
        break;
    }

    return sortedCampaigns;
  };

  const sortedCampaigns = sortCampaigns(campaigns);

  return (
    <div>
      {/* Motivational Header */}
      <div className="w-full mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center leading-tight">
          Your support turns dreams into reality
          <span className="block mt-2 text-lg md:text-xl font-medium">
            powered by transparent and trustworthy blockchain technology
          </span>
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <select
            className="py-2 px-4 bg-primary/20 text-accent rounded-lg border border-primary focus:outline-none font-epilogue font-semibold"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.name}
                className="text-accent"
              >
                {category.icon} {category.name}
              </option>
            ))}
          </select>

          <select
            className="py-2 px-4 bg-primary/20 text-accent rounded-lg border border-primary focus:outline-none font-epilogue font-semibold"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>

      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={sortedCampaigns}
      />
    </div>
  );
};

export default Home;
