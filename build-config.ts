import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-grid",
    path: "./web-component/lib/index.ts",
    outputPath: "./web-component/dist/index.js",
    umdName: "JBGrid",
    external: ["jb-core", "jb-core/theme", "jb-core/i18n"],
    tsConfigPath:"./web-component/tsconfig.json",
    globals: {
      "jb-core":"JBCore",
      "jb-core/theme":"JBCoreTheme",
      "jb-core/i18n":"JBCoreI18N",
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-grid-react",
    path: "./react/lib/JBGrid.tsx",
    outputPath: "./react/dist/JBGrid.js",
    external: ["mobx-react", "react", "mobx", "jb-searchbar","jb-core", "jb-core/react", "jb-core/theme", "jb-core/i18n"],
    globals: {
      react: "React",
      mobx: "MobX",
      "mobx-react": "mobxReact",
      "jb-searchbar": "JBSearchbar",
      "jb-core": "JBCore",
      "jb-core/react": "JBCoreReact",
      "jb-core/theme": "JBCoreTheme",
      "jb-core/i18n": "JBCoreI18N"
    },
    umdName: "JBGridReact",
    dir: "./react"
  },
];