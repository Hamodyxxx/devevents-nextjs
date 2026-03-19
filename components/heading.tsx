import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

interface HeadingProps extends PropsWithChildren {
    className?: string
}

const Heading = ({
    className,
    children
}: HeadingProps) => {
  return (
    <h1 className={cn(
        "text-gradient max-sm:text-4xl text-6xl",
        className
    )}>
        {children}
    </h1>
  )
}

export default Heading