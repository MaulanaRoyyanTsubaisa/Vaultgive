import React from "react";
import { Route, Routes } from "react-router-dom";
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";
import { Sidebar, Navbar } from "./components";

function App() {
  return (
    <div className="relative sm:8 p-4 min-h-screen flex flex-row bg-background">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280]px mx-auto sm:pr-5 flex flex-col relative">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="mt-10 border-t border-secondary/20 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4">
                <span className="text-primary font-bold text-xl">Vault</span>
                <span className="text-accent font-bold text-xl">Give</span>
              </div>
              <p className="text-secondary/80 text-sm">
                © {new Date().getFullYear()} VaultGive. All rights reserved.
              </p>
              <p className="text-secondary/60 text-xs mt-2">
                Empowering dreams through blockchain technology
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
