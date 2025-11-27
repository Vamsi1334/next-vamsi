"use client";

import React from "react";

interface AdSpaceProps {
  size: "banner" | "rectangle" | "leaderboard" | "skyscraper" | "mobile-banner";
  position: string;
  className?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({
  size,
  position,
  className = "",
}) => {
  const adDimensions = {
    banner: { width: 728, height: 90, display: "Leaderboard 728x90" },
    rectangle: { width: 300, height: 250, display: "Medium Rectangle 300x250" },
    leaderboard: { width: 970, height: 250, display: "Large Leaderboard 970x250" },
    skyscraper: { width: 160, height: 600, display: "Wide Skyscraper 160x600" },
    "mobile-banner": { width: 320, height: 50, display: "Mobile Banner 320x50" },
  };

  const { width, height, display } = adDimensions[size];

  return (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        minWidth: `${width}px`,
        minHeight: `${height}px`,
      }}
      data-ad-position={position}
    >
      <div className="text-center">
        <div className="font-semibold">Advertisement</div>
        <div className="text-xs mt-1">{display}</div>
        <div className="text-xs text-gray-400 mt-1">{position}</div>
      </div>
    </div>
  );
};

export default AdSpace;
