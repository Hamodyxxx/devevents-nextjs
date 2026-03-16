"use client";
import { posthogClient } from "@/instrumation-client";
import Image from "next/image";

const ExploreBtn = () => {
    const handleClick = () => {
        posthogClient.capture("explain button clicked");
    }
    
    return (
        <button 
            type="button" 
            onClick={handleClick}
            className="
                mt-7 mx-auto my-4 flex justify-center items-center py-3 px-5 w-full sm:w-fit rounded-full cursor-pointer opacity-100 bg-dark-100 border-[0.5] border-white/10
            "
        >
            <a href="#events" className="flex justify-center items-center gap-2">
                Explore Events
                <Image
                    src="/icons/arrow-down.svg"
                    alt="arrow-down"
                    width={24}
                    height={24}
                />
            </a>
        </button>
    )
}

export default ExploreBtn