import { useCallback, useEffect, useRef } from "react"

const key = "VDocs_STATE";
export const useHydrateState = (state: any) => {
    const hydrated = useRef(false);
    useEffect(() => {
        if (!state.ready) return;
        localStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    const hydrate = useCallback(() => {
        const str = localStorage.getItem(key);
        hydrated.current =  true;
        if (!str) return null;
        return JSON.parse(str);
    }, []);

    return { hydrate, hydrated: hydrated.current };
}
