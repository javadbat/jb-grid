import { JBDictionary } from "jb-core/i18n";

export type JBGridDictionary = {
  closeFilters: string;
  openFilters: string;
  refresh: string;
  enterFullscreen: string;
  exitFullscreen: string;
};

export const gridDictionary = new JBDictionary<JBGridDictionary>({
  fa: {
    closeFilters: "بستن فیلترها",
    openFilters: "باز کردن فیلترها",
    refresh: "تازه‌سازی داده‌ها",
    enterFullscreen: "ورود به حالت تمام‌صفحه",
    exitFullscreen: "خروج از حالت تمام‌صفحه",
  },
  en: {
    closeFilters: "Close filters",
    openFilters: "Open filters",
    refresh: "Refresh data",
    enterFullscreen: "Enter fullscreen",
    exitFullscreen: "Exit fullscreen",
  },
});
