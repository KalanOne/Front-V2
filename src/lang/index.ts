import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "src/lang/en";
import { es } from "src/lang/es";

void i18n.use(initReactI18next).init({
  lng: "es",
  defaultNS: "general",
  resources: {
    en: en,
    es: es,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
