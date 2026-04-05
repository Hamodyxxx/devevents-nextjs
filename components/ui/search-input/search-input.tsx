import { cn } from "@/lib/utils"
import { Input } from "../input"
import { Search } from "lucide-react"

interface SearchInputProps extends React.ComponentProps<"div"> {
    inputProps: React.ComponentProps<"input">
    isExpanded: boolean 
}

export const SearchInput = ({
    className,
    inputProps: { className: inputClassName, ...restInputProps },
    isExpanded,
    ...props
}: SearchInputProps) => {
    return (
        <div 
            className={cn(
                "z-50 w-fit group flex items-center relative gap-2",
                className
            )}
            {...props}
        >
            <div className={cn(
                `absolute left-1 z-10 flex items-center justify-center
                w-8 h-8 rounded-full transition-all duration-300 text-[#5dfeca]`,
                isExpanded 
                        ? "bg-[#5dfeca] text-black"
                        : "group-hover:text-white group-hover:bg-[#5dfeca]/40"
            )}>
                <Search size={16} strokeWidth={2.5} />
            </div>

            <Input
                placeholder="Search events..."
                className={cn(
                    `pl-11 pr-4 h-10 w-full rounded-full border-none 
                    bg-white/80 backdrop-blur-md shadow-sm transition-all
                    focus:ring-2 focus:ring-black/5 focus:bg-white
                    placeholder:text-gray-400`,
                    inputClassName
                )}
                { ...restInputProps}
            />
        </div>
    )
}