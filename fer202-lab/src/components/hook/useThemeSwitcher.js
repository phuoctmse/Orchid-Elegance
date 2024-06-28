    import { useEffect, useState } from 'react';

    const useThemeSwitcher = () => {
        const preferDarkQuery = '(prefers-color-scheme: dark)';
        const [mode, setMode] = useState("");

        useEffect(() => {
            const mediaQuery = window.matchMedia(preferDarkQuery);
            const userPref = window.localStorage.getItem('theme');
            
            const applyTheme = (theme) => {
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                }
            };

            const handleChange = () => {
                const newMode = userPref || (mediaQuery.matches ? 'dark' : 'light');
                setMode(newMode);
                applyTheme(newMode);
            };

            handleChange();

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }, []);

        useEffect(() => {
            if (mode) {
                window.localStorage.setItem('theme', mode);
                if (mode === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                }
            }
        }, [mode]);

        return [mode, setMode];
    };

    export default useThemeSwitcher;
