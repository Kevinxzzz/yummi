import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locale/en.json";
import pt_brTranslations from "../locale/pt_br.json";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    ...enTranslations,
  },
  pt_br: {
    ...pt_brTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });
