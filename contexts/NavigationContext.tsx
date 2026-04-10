
import React, { createContext, useContext, useState } from 'react';

// Profile list pages — navigating to these clears the matched selectedId
const PROFILE_LIST_CLEAR_MAP: Record<string, string[]> = {
    'E-08': ['selectedAccountId'],
    'E-10': ['selectedContactId'],
    'E-11': ['selectedPropertyId'],
    'E-12': ['selectedPropertyId'],
    'E-15': ['selectedProjectId'],
    // Pipeline stage pages — clear selectedProjectId so list view is shown
    'E-26': ['selectedProjectId'],
    'E-27': ['selectedProjectId'],
    'E-28': ['selectedProjectId'],
    'E-29': ['selectedProjectId'],
    'E-30': ['selectedProjectId'],
    'E-31': ['selectedProjectId'],
    'E-32': ['selectedProjectId'],
    'E-33': ['selectedProjectId'],
    'E-34': ['selectedProjectId'],
    'E-35': ['selectedProjectId'],
    'E-36': ['selectedProjectId'],
};

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
