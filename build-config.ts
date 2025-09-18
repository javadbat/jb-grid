import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-grid-react",
    path: "./react/lib/JBGrid.tsx",
    outputPath: "./react/dist/JBGrid.js",
    external: ["mobx-react", "react", "mobx", "jb-searchbar",/*"jb-core", "jb-core/react", "jb-core/theme"*/],
    globals: {
      react: "React",
      mobx: "MobX",
      "mobx-react": "mobxReact",
      "jb-searchbar": "JBSearchbar",
      "jb-core": "JBCore",
      "jb-core/react": "JBCoreReact",
      "jb-core/theme": "JBCoreTheme"
    },
    umdName: "JBGridReact",
    dir: "./react"
  },
];