import { JBDictionary } from "jb-core/i18n";

export type JBPaginationInfoDictionary = {
  pageItemCount: string;
  currentAvailableItem: string;
  from: string;
};

export const paginationInfoDictionary = new JBDictionary<JBPaginationInfoDictionary>({
  fa: {
    pageItemCount: "تعداد آیتم در هر صفحه",
    currentAvailableItem: "تعداد کل آیتم‌های موجود",
    from: "از",
  },
  en: {
    pageItemCount: "Items per page",
    currentAvailableItem: "Total available records",
    from: "of",
  },
});
