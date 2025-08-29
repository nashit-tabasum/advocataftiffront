"use client";
import type { JSX } from "react";
import HeroBasic from "./HeroBasic";
import HeroWhite from "./HeroWhite";
import HeroBlack from "./HeroBlack";
import HeroCoverImage from "./HeroCoverImage";

type HeroBlocksProps = {
  heroBasicBgUrl?: string;
  heroBlackBgUrl?: string;
  heroCoverImgUrl?: string;
};

export default function HeroBlocks({
  heroBasicBgUrl = "/assets/images/hero-basic-bg.jpg",
  heroBlackBgUrl = "/assets/images/hero-black-bg.jpg",
  heroCoverImgUrl = "/assets/images/hero-cover-img.jpg",
}: HeroBlocksProps): JSX.Element {
  return (
    <div className="bg-gray-400 h-full">
      <h1 className="text-3xl font-bold text-black text-center py-10 mb-14 border-b border-b-black">
        Hero Blocks
      </h1>

      <div className="px-4 pt-3 pb-6">
        {/* Hero Blocks (Basic) */}
        <h2 className="text-white text-2xl text-center border-b mb-6 pb-3 border-white">
          Hero Blocks (Basic)
        </h2>
        <HeroBasic
          bgUrl={heroBasicBgUrl}
          title={"Sample"}
          paragraph={"Sample"}
        />

        {/* Hero Blocks (White) */}
        <h2 className="text-white text-2xl text-center border-b mb-6 mt-14 pb-3 border-white">
          Hero Blocks (White)
        </h2>
        <HeroWhite title={"Sample title"} />

        {/* Hero Blocks (Black) */}
        <h2 className="text-white text-2xl text-center border-b mb-6 mt-14 pb-3 border-white">
          Hero Blocks (Black)
        </h2>
        <HeroBlack bgUrl={heroBlackBgUrl} />

        {/* Hero Blocks (Cover Image) */}
        <h2 className="text-white text-2xl text-center border-b mb-6 mt-14 pb-3 border-white">
          Hero Blocks (Cover Image)
        </h2>
        <HeroCoverImage bgUrl={heroCoverImgUrl} />
      </div>
    </div>
  );
}
