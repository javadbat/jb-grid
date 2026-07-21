import { JBColumnHeader } from "jb-grid/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

const meta = {
  title: "Components/JBGrid/ColumnHeader",
  component: JBColumnHeader,
} satisfies Meta<typeof JBColumnHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    name: "name",
    children: "Name",
  },
  play: async ({ canvasElement }) => {
    const columnHeader = canvasElement.querySelector("jb-col-header");
    const wrapper = columnHeader?.shadowRoot?.querySelector(".column-header");

    expect(columnHeader?.getAttribute("role")).toBe("columnheader");
    expect(wrapper?.hasAttribute("role")).toBe(false);
    expect(wrapper?.hasAttribute("tabindex")).toBe(false);
  },
};

export const Sortable: Story = {
  args: {
    name: "name",
    sortable: true,
    children: "Name",
  },
  play: async ({ canvasElement }) => {
    const columnHeader = canvasElement.querySelector<HTMLElement & { sort: "asc" | "desc" | null }>("jb-col-header");
    const wrapper = columnHeader?.shadowRoot?.querySelector<HTMLElement>(".column-header");

    expect(wrapper?.getAttribute("role")).toBe("button");
    expect(wrapper?.tabIndex).toBe(0);
    wrapper?.focus();
    await userEvent.keyboard("{Enter}");
    expect(columnHeader?.sort).toBe("asc");
    expect(columnHeader?.getAttribute("aria-sort")).toBe("ascending");
  },
};

export const enableSortingRemoval: Story = {
  args: {
    name: "name",
    sortable: true,
    sort: "asc",
    enableSortingRemoval:true,
    children: "Name",
  },
};
