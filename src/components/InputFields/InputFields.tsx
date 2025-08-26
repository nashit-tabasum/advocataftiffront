"use client";

import { type JSX } from "react";
import InputNoPlaceholder from "./InputNoPlaceholder";
import InputWithPlaceholder from "./InputWithPlaceholder";
import TextareaNoPlaceholder from "./TextareaNoPlaceholder";
import TextareaWithPlaceholder from "./TextareaWithPlaceholder";
import SearchField from "./SearchField";
import SearchFieldHome from "./SearchFieldHome";
import VerticalNavigation from "./VerticalNavigation";
import SegmentControl from "./SegmentControl";
import SegmentControlDesktop from "./SegmentControlDesktop";

export default function InputFields(): JSX.Element {
  return (
    <div className="bg-white">
      <h1 className="text-3xl font-bold text-black text-center py-10 mb-14 border-b border-b-black">
        Inputs, Search, Segment Control & Vertical Navigation
      </h1>

      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Input Without Placeholder</h2>
          <InputNoPlaceholder />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Input With Placeholder</h2>
          <InputWithPlaceholder />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">
            Textarea Without Placeholder
          </h2>
          <TextareaNoPlaceholder />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Textarea With Placeholder</h2>
          <TextareaWithPlaceholder />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Search Field</h2>
          <SearchField />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Search Field (Home)</h2>
          <SearchFieldHome />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Vertical Navigation</h2>
          <VerticalNavigation />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Segment Control</h2>
          <SegmentControl />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Segment Control (Desktop)</h2>
          <SegmentControlDesktop />
        </div>
      </section>
    </div>
  );
}
