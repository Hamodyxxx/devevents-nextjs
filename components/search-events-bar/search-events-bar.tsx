"use client";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { BlurOverlay } from "../ui/blur-over-lay/blur-over-lay";
import { SearchInput } from "../ui/search-input/search-input";
import { FloatingEventsSearchResult } from "./floating-events-search-result/floating-events-search-result";
import { useQueryState } from "nuqs";

export const SearchEventsBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useQueryState(
    "query",
    { defaultValue: ""}
  );

  const searchRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = searchRef.current;

    if(isExpanded) gsap.to(el, {
        width: "70%", 
        transition: "all",
      });
    else gsap.fromTo(el,
      { width: "70%" }
      , {
        width: "200px", 
        transition: "all",
        duration: 0.5,
    });
  }, { dependencies: [isExpanded]})

  return (
    <div className={`justify-center grow hidden sm:flex  relative`}>

      <BlurOverlay
        isOpen={isExpanded}
        onClose={() => {setIsExpanded(false)}}
      />  

      <SearchInput
        isExpanded={isExpanded}
        className="w-[200px]"
        ref={searchRef}
        inputProps={{
          onFocus:() => setIsExpanded(true),
          onBlur:(e) => {
            if (searchRef.current?.contains(e.relatedTarget as Node)) return;
            setIsExpanded(false)
          },
          value: query,
          onChange: (e) => setQuery(e.target.value || null),
        }}
      />

      <FloatingEventsSearchResult
        query={query}
        isVisible={isExpanded}
      />
    </div>
  );
};