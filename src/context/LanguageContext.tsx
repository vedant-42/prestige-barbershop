import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language } from '../utils/translations';

type Translations = typeof translations.en;

// Helper type to get nested keys
type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<Translations>;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: TranslationKey): string => {
        const keys = key.split('.');
        let current: any = translations[language];

        for (const k of keys) {
            if (current[k] === undefined) {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
            current = current[k];
        }

        return current as string;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
