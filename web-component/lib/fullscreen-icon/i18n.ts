import { JBDictionary } from "jb-core/i18n";

export type JBFullscreenIconDictionary = {
  enterFullscreen: string;
  exitFullscreen: string;
};

export const fullscreenIconDictionary = new JBDictionary<JBFullscreenIconDictionary>({
  fa: {
    enterFullscreen: "ورود به حالت تمام‌صفحه",
    exitFullscreen: "خروج از حالت تمام‌صفحه",
  },
  en: {
    enterFullscreen: "Enter fullscreen",
    exitFullscreen: "Exit fullscreen",
  },
});
