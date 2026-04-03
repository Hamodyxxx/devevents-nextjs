"use client";
import { useTheme } from 'next-themes'
import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const {
        theme,
        setTheme
    } = useTheme();

    return (
        <Button
            variant={"outline"}
            size={"icon"}
            className='rounded-full'
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <Sun
                className={`absolute rotate-0 scale-100 dark:-rotate-90 dark:scale-0 ${theme == "dark" && "hidden"}`}
                size={10}
            />
            <Moon   
                className={`absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100  ${theme == "light" && "hidden"}`}
                size={10}
            />
        </Button>
    )
}

export default ThemeToggle