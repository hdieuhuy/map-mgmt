"use client";

import Map from "@/assets/map2.jpg";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      {/* <div className="max-w-md w-full space-y-8 bg-white shadow-2xl rounded-xl p-10 text-center">
        <div className="space-y-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/login"
              className="w-full block bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Đăng Nhập
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/register"
              className="w-full block bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Đăng Ký Tài Khoản
            </Link>
          </motion.div>
        </div>
      </div> */}

      <div className="h-auto">
        <div id="map-container">
          <Image id="map-image" src={Map} alt="Bản đồ địa phương" />
        </div>
      </div>
    </div>
  );
}
