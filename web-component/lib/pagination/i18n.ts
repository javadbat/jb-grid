import { JBDictionary } from "jb-core/i18n";

export type JBPaginationDictionary = {
  firstPage: string;
  previousPage: string;
  nextPage: string;
  lastPage: string;
  page: (index: number) => string;
};

export const paginationDictionary = new JBDictionary<JBPaginationDictionary>({
  fa: {
    firstPage: "صفحه اول",
    previousPage: "صفحه قبل",
    nextPage: "صفحه بعد",
    lastPage: "صفحه آخر",
    page: index => `صفحه ${index}`,
  },
  en: {
    firstPage: "First page",
    previousPage: "Previous page",
    nextPage: "Next page",
    lastPage: "Last page",
    page: index => `Page ${index}`,
  },
});
