import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { ClassNameValue } from "tailwind-merge"

const gridViewClassNames = {
  1:  "grid grid-cols-1",
  2:  "grid grid-cols-1 sm:grid-cols-2",
  3:  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4:  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5:  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  6:  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
  7:  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7",
  8:  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8",
  9:  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9",
  10: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10",
  11: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11",
  12: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12",
};

interface GridViewProps extends PropsWithChildren {
    num: keyof typeof gridViewClassNames
    className: string
}

const GridView = ({
    num,
    children,
    className
}: GridViewProps) => {
  return (
    <div className={cn(
        gridViewClassNames[num],
        className,
    )}>
        {children}
    </div>
  )
}

export default GridView