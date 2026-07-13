import { JBDictionary } from "jb-core/i18n";

export type JBGridDictionary = {
  toggleRowDetails: string;
  refreshData: string;
  enterFullscreen: string;
  exitFullscreen: string;
  firstPage: string;
  previousPage: string;
  nextPage: string;
  lastPage: string;
  page: (index: number) => string;
};

export const dictionary = new JBDictionary<JBGridDictionary>({
  fa: {
    toggleRowDetails: "نمایش یا پنهان کردن جزئیات ردیف",
    refreshData: "به‌روزرسانی داده‌ها",
    enterFullscreen: "ورود به حالت تمام‌صفحه",
    exitFullscreen: "خروج از حالت تمام‌صفحه",
    firstPage: "صفحه اول",
    previousPage: "صفحه قبل",
    nextPage: "صفحه بعد",
    lastPage: "صفحه آخر",
    page: (index) => `صفحه ${index}`,
  },
  en: {
    toggleRowDetails: "Toggle row details",
    refreshData: "Refresh data",
    enterFullscreen: "Enter fullscreen",
    exitFullscreen: "Exit fullscreen",
    firstPage: "First page",
    previousPage: "Previous page",
    nextPage: "Next page",
    lastPage: "Last page",
    page: (index) => `Page ${index}`,
  },
});
