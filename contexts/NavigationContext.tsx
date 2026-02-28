
import React, { createContext, useContext, useState } from 'react';

interface NavigationContextType {
    activePageId: string;
    setActivePageId: (id: string) => void;
    lastPortalPageId: string;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activePageId, setPageId] = useState<string>('');
    const [lastPortalPageId, setLastPortalPageId] = useState<string>('');

    const setActivePageId = (id: string) => {
        // If the current page is a portal page (not starting with P-), save it before switching to a public page
        if (activePageId && !activePageId.startsWith('P-') && id.startsWith('P-')) {
            setLastPortalPageId(activePageId);
        }
        setPageId(id);
    };

    return (
        <NavigationContext.Provider value={{ activePageId, setActivePageId, lastPortalPageId }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) throw new Error("useNavigation must be used within NavigationProvider");
    return context;
};
