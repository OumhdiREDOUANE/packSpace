// components/ProductGallery.js
"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  "/image1.png",
  "/image2.png",
  "/image3.png",
  "/image4.png",
];

export default function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500">
        <a href="/category" className="text-blue-600 hover:underline">Weprint</a> &raquo; <span className="text-gray-800 font-medium">Flyers</span>
      </div>

      <div className="relative w-full max-w-md mx-auto">
        <a href={selectedImage}>
          <Image src={selectedImage} alt="Product" width={600} height={600} className="rounded-lg mx-auto" />
        </a>
        <p className="text-center text-sm mt-2 text-gray-600">
          <i className="fa fa-search-plus"></i> Cliquez pour agrandir
        </p>
      </div>

      <div className="flex space-x-2 overflow-x-auto">
        {images.map((img, idx) => (
          <button key={idx} onClick={() => setSelectedImage(img)} className={`w-20 h-20 border ${selectedImage === img ? "border-blue-500" : "border-gray-300"}`}>
            <Image src={img} alt="thumb" width={80} height={80} />
          </button>
        ))}
      </div>
    </div>
  );
}
