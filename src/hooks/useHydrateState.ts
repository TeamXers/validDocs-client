import { useCallback, useEffect, useState } from "react"

const key = "VDocs_STATE";
export const useHydrateState = (state: any) => {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, hydrated]);

    const hydrate = useCallback(() => {
        const str = localStorage.getItem(key);
        setHydrated(true);
        if (!str) return null;
        return JSON.parse(str);
    }, []);

    return { hydrate, hydrated };
}
