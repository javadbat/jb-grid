import { JBDictionary } from "jb-core/i18n";

export type JBGridLoadingDictionary = {
  loading: string;
};

export const gridLoadingDictionary = new JBDictionary<JBGridLoadingDictionary>({
  fa: { loading: "در حال بارگذاری" },
  en: { loading: "Loading" },
});
