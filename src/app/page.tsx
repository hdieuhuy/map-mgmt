"use client";

import Map from "@/assets/map2.jpg";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="h-auto">
        <div id="map-container">
          <Image id="map-image" src={Map} alt="Bản đồ địa phương" />
        </div>
      </div>
    </div>
  );
}
