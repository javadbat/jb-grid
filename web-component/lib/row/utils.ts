import type { RowTemplate } from "./types";

export function createTemplateStylesheet(sheet: CSSStyleSheet, template: RowTemplate | null) {
  if (template === null) {
    const css = /* css */ `
    .grid-row{
      display:grid;
      grid-auto-columns: 1fr;
      grid-auto-flow: column;
      grid-template-rows: 1fr;
      --jb-row-grid-mode: auto;
    }
  `
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
    .grid-row{
      display:grid;
      grid-template-columns: ${gridTemplateColumns};
      grid-template-areas: "${gridTemplateAreas}"
    }
  `
  sheet.replaceSync(css);
  return sheet;
}