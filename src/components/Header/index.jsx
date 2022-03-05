import { useLayoutEffect } from 'react';
import { Moon } from '../../icons';

const useTheme = () => {
    const setLightTheme = () => {
        localStorage.setItem('theme', 'light');
        document.body.classList.remove('dark');
    };
    const setDarkTheme = () => {
        localStorage.setItem('theme', 'dark');
        document.body.classList.add('dark');
    };
    const changeTheme = () => {
        const prevTheme = localStorage.getItem('theme');

        return prevTheme === 'dark' ? setLightTheme() : setDarkTheme();
    };

    useLayoutEffect(() => {
        const theme = localStorage.getItem('theme');

        if (!theme || theme === 'light') {
            setLightTheme();
        }
        if (theme === 'dark') {
            setDarkTheme();
        }
    }, []);

    return {
        theme: localStorage.getItem('theme'),
        changeTheme,
    };
};

export const Header = ({ title }) => {
    const { changeTheme } = useTheme();

    return (
        <header className="shadow-md flex justify-between items-center bg-white dark:bg-dmElements dark:text-white px-4 py-7 md:px-20 md:py-6">
            <h1 className="font-extrabold text-sm md:text-2xl">
                {title}
            </h1>

            <p className="flex items-center cursor-pointer" onClick={changeTheme}>
                <Moon className="h-4 dark:fill-white" />

                <span className="ml-2 text-xs md:text-base">
                    Dark Mode
                </span>
            </p>
        </header>
    )
};
