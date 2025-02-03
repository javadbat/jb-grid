import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-grid-react",
    path: "./react/lib/JBGrid.tsx",
    outputPath: "./react/dist/JBGrid.js",
    external: ["mobx-react", "react", "mobx", "prop-types", "jb-searchbar"],
    globals: {
      react: "React",
      mobx: "MobX",
      "prop-types": "PropTypes",
      "mobx-react": "mobxReact",
      "jb-searchbar": "JBSearchbar"
    },
    umdName: "JBGridReact",
    dir: "./react"
  },
];