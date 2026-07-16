import JBGridTest from './samples/JBGridTest.tsx';
import CustomErrorTest from './samples/custom-error/JBGridTest.tsx';
import SearchFilterDemo from './samples/SearchFilterDemo.tsx';
import type { Meta, StoryObj } from '@storybook/react-vite';

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
