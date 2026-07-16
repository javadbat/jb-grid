import {JBPagination} from 'jb-grid/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

const meta = {
  title: "Components/JBGrid/Pagination",
  component: JBPagination,
} satisfies Meta<typeof JBPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal:Story = {
  args:{
    pageIndex:1,
    onChange:(e)=>{console.log("change Event",e)}
  }
};
export const Max:Story = {
  args:{
    max:10
  },
  play: async ({ canvasElement }) => {
    const pagination = canvasElement.querySelector("jb-pagination");
    const shadowRoot = pagination?.shadowRoot;
    const navigation = shadowRoot?.querySelector("nav");

    expect(navigation?.getAttribute("aria-label")).toBe("Pagination");
    expect(shadowRoot?.querySelector<HTMLButtonElement>(".first-page")?.disabled).toBe(true);
    expect(shadowRoot?.querySelector<HTMLButtonElement>(".prev-page")?.disabled).toBe(true);
    expect(shadowRoot?.querySelector<HTMLButtonElement>(".next-page")?.disabled).toBe(false);
    expect(shadowRoot?.querySelector<HTMLButtonElement>(".last-page")?.disabled).toBe(false);
  }
};

