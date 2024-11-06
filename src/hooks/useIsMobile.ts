import { useEffect, useState } from "react";

const getIsMobile = () => {
    if (typeof window === 'undefined') return false;

    return window.matchMedia('only screen and (max-width: 480px)').matches
};

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(getIsMobile());

    useEffect(() => {
        const onResize = () => {
            setIsMobile(getIsMobile());
        }

        window.addEventListener("resize", onResize);
    
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);
    
    return isMobile;
}