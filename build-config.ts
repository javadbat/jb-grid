import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-grid",
    path: "./web-component/lib/index.ts",
    outputPath: "./web-component/dist/index.js",
    umdName: "JBGrid",
    external: ["jb-core", "jb-core/theme", "jb-core/i18n", "jb-button", "jb-icons/arrow", "jb-icons/arrow-tailed", "jb-icons/triangle"],
    tsConfigPath: "./web-component/tsconfig.json",
    globals: {
      "jb-core": "JBCore",
      "jb-core/theme": "JBCoreTheme",
      "jb-core/i18n": "JBCoreI18N",
      "jb-button": "JBButton",
      "jb-icons/arrow": "JBIconArrow",
      "jb-icons/arrow-tailed": "JBIconArrowTailed",
      "jb-icons/triangle": "JBIconTriangle",
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-grid-react",
    path: "./react/lib/index.ts",
    outputPath: "./react/dist/JBGrid.js",
    external: ["react", "jb-grid", "jb-icons/close", "jb-icons/expand", "jb-icons/filter", "jb-icons/refresh", "jb-searchbar", "jb-core", "jb-core/react", "jb-core/theme", "jb-core/i18n"],
    globals: {
      react: "React",
      "jb-searchbar": "JBSearchbar",
      "jb-grid": "JBGrid",
      "jb-icons/close": "JBIconClose",
      "jb-icons/expand": "JBIconExpand",
      "jb-icons/filter": "JBIconFilter",
      "jb-icons/refresh": "JBIconRefresh",
      "jb-core": "JBCore",
      "jb-core/react": "JBCoreReact",
      "jb-core/theme": "JBCoreTheme",
      "jb-core/i18n": "JBCoreI18N",
    },
    umdName: "JBGridReact",
    dir: "./react",
  },
];
