import JBGridTest from './samples/JBGridTest.tsx';
import CustomErrorTest from './samples/custom-error/JBGridTest.tsx';
import SearchFilterDemo from './samples/SearchFilterDemo.tsx';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

const meta = {
  title: "Components/JBGrid",
  component: JBGridTest,
} satisfies Meta<typeof JBGridTest>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal:Story = {
  render:(args) => <JBGridTest {...args}></JBGridTest>,
  args:{
    locale: "en"
  },
  play: async ({ canvasElement }) => {
    const layout = canvasElement.querySelector("jb-grid-layout");
    const table = layout?.shadowRoot?.querySelector('[role="table"]');

    expect(table).toBeTruthy();
    expect(table?.getAttribute("aria-label")).toBe("Users");
    expect(table?.querySelector('[role="rowgroup"]')).toBeTruthy();

    await waitFor(() => {
      expect(canvasElement.querySelectorAll("jb-row").length).toBeGreaterThan(0);
    }, { timeout: 5000 });

    expect(canvasElement.querySelector('jb-button[aria-label="Refresh data"]')).toBeTruthy();
    expect(canvasElement.querySelector('jb-button[aria-label="Enter fullscreen"]')).toBeTruthy();
  }
};

export const RTL:Story = {
  render:(args) => <JBGridTest {...args}></JBGridTest>,
  args:{
    locale: "fa"
  }
};

export const WithCustomError:Story = {
  render:() => <CustomErrorTest></CustomErrorTest>,
  args:{}
};

export const WithSearchAndFilters: Story = {
  render: () => <SearchFilterDemo />,
  args: {},
};
