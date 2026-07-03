import type { GridTemplate } from "./types.js";

type CreateTemplateStylesheetOptions = {
  selector: string,
  autoModeVariableName?: string
}

export function createTemplateStylesheet(sheet: CSSStyleSheet, template: GridTemplate | null, options: CreateTemplateStylesheetOptions) {
  const autoModeVariable = options.autoModeVariableName ? `${options.autoModeVariableName}: auto;` : "";
  if (template === null) {
    const css = /* css */ `
    ${options.selector}{
      display:grid;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      grid-template-rows: 1fr;
      ${autoModeVariable}
    }
  `;
    sheet.replaceSync(css);
    return sheet;
  }
  let gridTemplateColumns = "";
  const gridTemplateAreas = template.map(t => `${t.name}`).join(" ");
  template.forEach((item) => {
    if (item.size != null || item.size != undefined) {
      if (typeof item.size == "number") {
        gridTemplateColumns += ` ${item.size}px`;
      } else {
        gridTemplateColumns += ` ${item.size}`;
      }

    } else {
      gridTemplateColumns += " 1fr";
    }
  });
  const css = /* css */ `
    ${options.selector}{
      display:grid;
      grid-template-columns: ${gridTemplateColumns};
      grid-template-areas: "${gridTemplateAreas}"
    }
  `;
  sheet.replaceSync(css);
  return sheet;
}
