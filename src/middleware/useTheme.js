import { useState } from 'react';

export default function useTheme() {
    const getTheme = () => {
        const Theme = localStorage.getItem('theme');
        // console.log("getlang", Theme)
        if (Theme != null) {
            return Theme;
        } else {
            return "default"
        }

    };
    const [Theme, setTheme] = useState(getTheme());
    const saveTheme = ThemeString => {
        localStorage.setItem('theme', ThemeString);
        // console.log("setTheme", ThemeString)
        setTheme(ThemeString);
    };
    return {
        setTheme: saveTheme,
        Theme
    }
}