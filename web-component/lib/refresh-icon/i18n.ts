import { JBDictionary } from "jb-core/i18n";

export type JBRefreshIconDictionary = {
  refreshData: string;
};

export const refreshIconDictionary = new JBDictionary<JBRefreshIconDictionary>({
  fa: { refreshData: "به‌روزرسانی داده‌ها" },
  en: { refreshData: "Refresh data" },
});
