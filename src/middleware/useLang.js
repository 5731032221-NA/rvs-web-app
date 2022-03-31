import { useState } from 'react';

export default function useLang() {
    const getLang = () => {
        const Lang = localStorage.getItem('lang');
        // console.log("getlang", Lang)
        if (Lang != null) {
            return Lang;
        } else {
            return "en"
        }
    };
    const [Lang, setLang] = useState(getLang());
    const saveLang = LangString => {
        localStorage.setItem('lang', LangString);
        // console.log("setlang", LangString)
        setLang(LangString);
    };
    return {
        setLang: saveLang,
        Lang
    }
}