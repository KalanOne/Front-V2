import { useEffect } from "react";

import i18next from "i18next";

import { LANGUAGE } from "src/utils/constants.ts";

export { useLanguage };

function useLanguage() {
  async function onFirstLoad() {
    const language = localStorage.getItem(LANGUAGE);
    if (language) {
      await i18next.changeLanguage(language);
    } else {
      localStorage.setItem(LANGUAGE, "es");
      await i18next.changeLanguage("es");
    }
  }

  useEffect(() => {
    void onFirstLoad();
  }, []);
}
