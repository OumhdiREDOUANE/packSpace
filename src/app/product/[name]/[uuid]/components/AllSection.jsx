"use client";
import { useEffect, useRef, useState } from "react";
import ProductGallery from "./ProductImag";
import FlyerFormat from "./ProductProprieter";

export default function ProductPage({ product }) {
  const flyerRef = useRef(null);
  const galleryRef = useRef(null);
  const [scrollPassed, setScrollPassed] = useState(false);
  const [DetailsProprieter, setDetailsProprieter] = useState(null);
  useEffect(() => {
    const onScroll = () => {
      if (!flyerRef.current) return;

      const scrollTop = window.scrollY;
      const flyerHeight = flyerRef.current.offsetHeight;

      if (scrollTop >= flyerHeight) {
        setScrollPassed(true);
      } else {
        setScrollPassed(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="flex my-7 gap-[30px]">
        {/* الجزء الثاني (القصير) ثابت */}
        <div
          ref={galleryRef}
          className={`w-full md:w-6/12 h-fit ${
            scrollPassed ? "relative" : "sticky top-0"
          }`}
          style={{ alignSelf: "start" }}
        >
          <ProductGallery DetailsProprieter={DetailsProprieter} />
        </div>

        {/* الجزء الطويل (FlyerFormat) */}
        <div ref={flyerRef} className="w-full h-fit md:w-6/12">
          <FlyerFormat product={product} onDetailsProprieterChange={(details) => setDetailsProprieter(details)} />
        </div>
      </div>
    </>
  );
}
