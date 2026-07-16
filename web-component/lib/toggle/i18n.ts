import { JBDictionary } from "jb-core/i18n";

export type JBExpandToggleDictionary = {
  toggleRowDetails: string;
};

export const expandToggleDictionary = new JBDictionary<JBExpandToggleDictionary>({
  fa: { toggleRowDetails: "نمایش یا پنهان کردن جزئیات ردیف" },
  en: { toggleRowDetails: "Toggle row details" },
});
