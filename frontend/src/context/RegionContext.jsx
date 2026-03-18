import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RegionContext = createContext();

export function RegionProvider({ children }) {
    const location = useLocation();
    const [region, setRegion] = useState('ug'); // 'ug' or 'us', default to 'ug'
    
    // Automatically detect region from URL path
    useEffect(() => {
        const path = location.pathname;
        if (path.startsWith('/us')) {
            setRegion('us');
        } else if (path.startsWith('/ug')) {
            setRegion('ug');
        }
        // If it's root '/' or admin '/admin/*', we don't necessarily change the region
        // We can let it default to what it was, or default to 'ug'
    }, [location.pathname]);

    const value = {
        region,
        setRegion,
        isUG: region === 'ug',
        isUS: region === 'us'
    };

    return (
        <RegionContext.Provider value={value}>
            {children}
        </RegionContext.Provider>
    );
}

export function useRegion() {
    const context = useContext(RegionContext);
    if (context === undefined) {
        throw new Error('useRegion must be used within a RegionProvider');
    }
    return context;
}
