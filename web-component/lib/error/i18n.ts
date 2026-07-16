import { JBDictionary } from "jb-core/i18n";

export type JBGridErrorDictionary = {
  title: string;
  message: string;
  refreshButtonTitle: string;
};

export const gridErrorDictionary = new JBDictionary<JBGridErrorDictionary>({
  fa: {
    title: "خطا",
    message: "متأسفانه هنگام بارگذاری اطلاعات خطایی رخ داده است",
    refreshButtonTitle: "تلاش مجدد",
  },
  en: {
    title: "Sorry",
    message: "Something went wrong while loading data.",
    refreshButtonTitle: "Try again",
  },
});
