import { JBColumnHeader } from "jb-grid/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
};

export const Sortable: Story = {
  args: {
    name: "name",
    sortable: true,
    children: "Name",
  },
};

export const Ascending: Story = {
  args: {
    name: "name",
    sortable: true,
    sort: "asc",
    children: "Name",
  },
};

export const Descending: Story = {
  args: {
    name: "name",
    sortable: true,
    sort: "desc",
    children: "Name",
  },
};
