import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-grid",
    path: "./web-component/lib/index.ts",
    outputPath: "./web-component/dist/index.js",
    umdName: "JBGrid",
    external: ["jb-core", "jb-core/theme", "jb-core/i18n", "jb-button"],
    tsConfigPath:"./web-component/tsconfig.json",
    globals: {
      "jb-core":"JBCore",
      "jb-core/theme":"JBCoreTheme",
      "jb-core/i18n":"JBCoreI18N",
      "jb-button":"JBButton",
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-grid-react",
    path: "./react/lib/index.ts",
    outputPath: "./react/dist/JBGrid.js",
    external: ["react", "jb-grid" /*"jb-icon/refresh"*/, "jb-searchbar","jb-core", "jb-core/react", "jb-core/theme", "jb-core/i18n"],
    globals: {
      react: "React",
      "jb-searchbar": "JBSearchbar",
      "jb-grid":"JBGrid",
      // "jb-icon/refresh": "JBIconRefresh",
      "jb-core": "JBCore",
      "jb-core/react": "JBCoreReact",
      "jb-core/theme": "JBCoreTheme",
      "jb-core/i18n": "JBCoreI18N"
    },
    umdName: "JBGridReact",
    dir: "./react"
  },
];
