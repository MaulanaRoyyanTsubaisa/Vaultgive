import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { CustomButton } from "./";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { connect, address, getCampaigns, disconnect } = useStateContext();

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      const allCampaigns = await getCampaigns();
      navigate("/", { state: { filteredCampaigns: allCampaigns } });
      return;
    }

    const campaigns = await getCampaigns();
    const filteredCampaigns = campaigns.filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    navigate("/", { state: { filteredCampaigns } });
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      await disconnect();
      navigate("/");
      setToggleDrawer(false);
    }
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      {/* Modern Search Bar */}
      <div className="lg:flex-1 flex flex-row max-w-[458px] h-[52px] bg-secondary/5 rounded-full border border-secondary/20 shadow-md items-center px-4 relative group focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
          <img src={search} alt="search" className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="Search for campaigns..."
          className="flex w-full pl-10 pr-10 font-epilogue font-semibold text-[16px] placeholder:text-secondary/60 text-secondary bg-transparent outline-none border-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        {searchQuery && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/60 hover:text-primary transition-colors"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            &#10005;
          </button>
        )}
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={
            address
              ? "bg-gradient-to-r from-primary to-accent hover:opacity-90"
              : "bg-primary hover:bg-primary/90"
          }
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-secondary/10 border border-secondary/20 flex justify-center items-center cursor-pointer hover:shadow-lg transition-all duration-300">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-secondary/10 border border-secondary/20 flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-background border border-secondary/20 z-10 shadow-lg py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name
                    ? "bg-secondary/10"
                    : "hover:bg-secondary/5"
                } transition-all duration-300`}
                onClick={() => {
                  if (link.name === "logout") {
                    handleLogout();
                  } else {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "" : "opacity-60"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-accent" : "text-secondary"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={
                address
                  ? "bg-gradient-to-r from-primary to-accent hover:opacity-90 w-full"
                  : "bg-primary hover:bg-primary/90 w-full"
              }
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
