import type { Meta, StoryObj } from "@storybook/react-vite";
import type { JBTableHeaderWebComponent } from "jb-grid";
import { JBColumnHeader, JBTableHeader } from "jb-grid/react";
import { expect, waitFor } from "storybook/test";

const headerTemplate = [
  { name: "id", size: "5rem" },
  { name: "name", size: "1fr" },
  { name: "family", size: "1fr" },
  { name: "age", size: "6.25rem" },
];

const meta = {
  title: "Components/JBGrid/TableHeader",
  component: JBTableHeader,
} satisfies Meta<typeof JBTableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    headerTemplate,
    children: (
      <>
        <JBColumnHeader name="id">ID</JBColumnHeader>
        <JBColumnHeader name="name" sortable>
          Name
        </JBColumnHeader>
        <JBColumnHeader name="family" sortable>
          Family
        </JBColumnHeader>
        <JBColumnHeader name="age">Age</JBColumnHeader>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const tableHeader = canvasElement.querySelector<JBTableHeaderWebComponent>("jb-table-header");

    expect(tableHeader).toBeTruthy();
    expect(tableHeader?.headerTemplate).toEqual(headerTemplate);

    const headerRow = tableHeader?.shadowRoot?.querySelector(".table-header-row");
    expect(headerRow?.getAttribute("role")).toBe("row");

    const columnNames = Array.from(tableHeader?.querySelectorAll("jb-col-header") ?? []).map(columnHeader => columnHeader.getAttribute("name"));
    expect(columnNames).toEqual(["id", "name", "family", "age"]);

    await waitFor(() => {
      const templateStyles = tableHeader?.shadowRoot?.adoptedStyleSheets[0];
      const stylesheetText = Array.from(templateStyles?.cssRules ?? [])
        .map(rule => rule.cssText)
        .join(" ");

      expect(stylesheetText).toContain("grid-template-columns: 5rem 1fr 1fr 6.25rem");
    });
  },
};
