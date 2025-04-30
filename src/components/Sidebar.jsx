import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, thirdweb } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../context";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [minimized, setMinimized] = useState(false);
  const { disconnect, address } = useStateContext();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      await disconnect();
      navigate("/");
    }
  };

  return (
    <aside
      className={`hidden sm:flex flex-col justify-between items-center sticky top-5 h-[93vh] bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg border border-secondary/20 p-2 transition-all duration-300 relative
        ${minimized ? "w-[64px] px-2" : "w-[220px] px-4"}
      `}
      style={{ minWidth: minimized ? 64 : 220 }}
    >
      {/* Minimize/Expand Button */}
      <button
        className={`absolute top-3 right-2 z-20 bg-secondary/10 text-primary rounded-full p-1 hover:bg-secondary/20 transition-all duration-200 border border-secondary/20 ${
          minimized ? "w-7 h-7" : "w-8 h-8"
        }`}
        onClick={() => setMinimized((prev) => !prev)}
        title={minimized ? "Expand sidebar" : "Minimize sidebar"}
      >
        {minimized ? (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12h16m-7-7 7 7-7 7"
            />
          </svg>
        ) : (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 12H4m7-7-7 7 7 7"
            />
          </svg>
        )}
      </button>

      {/* User Info */}
      <div
        className={`flex flex-col items-center w-full mb-8 mt-8 ${
          minimized ? "px-0" : "px-2"
        }`}
      >
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className={`mb-8 transition-all duration-300 ${
              minimized ? "w-14 h-14" : "w-28 h-28"
            }`}
          />
        </Link>
        {address && !minimized && (
          <div className="flex flex-col items-center w-full bg-secondary/10 rounded-xl p-3 mb-2">
            <img
              src={thirdweb}
              alt="user"
              className="w-10 h-10 rounded-full mb-2"
            />
            <span className="text-secondary text-xs font-semibold truncate w-full text-center">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full">
        <ul className="flex flex-col gap-6">
          {navlinks.map((link) => (
            <li key={link.name} className="w-full">
              <button
                className={`flex items-center w-full gap-3 py-3 rounded-xl transition-all duration-200 text-left
                  ${
                    isActive === link.name
                      ? "bg-primary/20 text-primary shadow-md"
                      : "text-secondary hover:bg-secondary/10 hover:text-accent"
                  }
                  ${
                    link.name === "logout"
                      ? "mt-8 bg-accent/10 text-accent hover:bg-accent/20"
                      : ""
                  }
                  ${minimized ? "justify-center px-0" : "px-4"}
                `}
                onClick={() => {
                  if (link.name === "logout") {
                    handleLogout();
                  } else {
                    setIsActive(link.name);
                    navigate(link.link);
                  }
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-6 h-6 object-contain ${
                    isActive === link.name ? "" : "opacity-70"
                  }`}
                />
                {!minimized && (
                  <span className="font-medium text-base inline-block">
                    {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer/Logout */}
      {!minimized && (
        <div className="mt-8 w-full text-center">
          <div className="mb-2">
            <span className="text-primary font-bold text-sm">Vault</span>
            <span className="text-accent font-bold text-sm">Give</span>
          </div>
          <p className="text-secondary/60 text-xs">
            © {new Date().getFullYear()} VaultGive
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
