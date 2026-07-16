import { JBDictionary } from "jb-core/i18n";

export type JBExpandToggleDictionary = {
  rowDetails: string;
  toggleRowDetails: string;
};

export const expandToggleDictionary = new JBDictionary<JBExpandToggleDictionary>({
  fa: {
    rowDetails: "جزئیات ردیف",
    toggleRowDetails: "نمایش یا پنهان کردن جزئیات ردیف",
  },
  en: {
    rowDetails: "Row details",
    toggleRowDetails: "Toggle row details",
  },
});
