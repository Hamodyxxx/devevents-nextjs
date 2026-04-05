"use client";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { BlurOverlay } from "../ui/blur-over-lay/blur-over-lay";
import { SearchInput } from "../ui/search-input/search-input";
import { EventsSearchResult } from "../events-search-result/events-search-result";

type EventItem = { id: string; title: string; location: string };

export const SearchEventsBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");


  useGSAP(() => {
    const el = searchRef.current;

    if(isExpanded) gsap.to(el, {
        width: "40vw", 
        transition: "all",
      });
    else gsap.fromTo(el,
      {width: "50%"}
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
        ref={searchRef}
        inputProps={{
          onFocus:() => setIsExpanded(true),
          onBlur:() => setIsExpanded(false),
          value: query,
          onChange: (e) => setQuery(e.target.value),
        }}
      />

      <EventsSearchResult
        query={query}
        isVisible={isExpanded}
      />
    </div>
  );
};