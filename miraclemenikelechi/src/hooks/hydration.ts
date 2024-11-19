"use client";

import { useEffect, useState } from "react";

export function useHydration() {
    const [isHydrated, setIsHydrated] = useState<boolean>(false);

    useEffect(function () { setIsHydrated(true); }, []);

    return isHydrated;
}