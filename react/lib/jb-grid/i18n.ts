import { JBDictionary } from "jb-core/i18n";

export type JBGridDictionary = {
  closeFilters: string;
  openFilters: string;
  refresh: string;
};

export const gridDictionary = new JBDictionary<JBGridDictionary>({
  fa: {
    closeFilters: "بستن فیلترها",
    openFilters: "باز کردن فیلترها",
    refresh: "تازه‌سازی داده‌ها",
  },
  en: {
    closeFilters: "Close filters",
    openFilters: "Open filters",
    refresh: "Refresh data",
  },
});
