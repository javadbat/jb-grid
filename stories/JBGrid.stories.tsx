import JBGridTest from './samples/JBGridTest.tsx';
import CustomErrorTest from './samples/custom-error/JBGridTest.tsx';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: "Components/JBGrid",
  component: JBGridTest,
} satisfies Meta<typeof JBGridTest>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal:Story = {
  render:(args) => <JBGridTest {...args}></JBGridTest>,
  args:{

  }
};

export const WithPersianNumber:Story = {
  render:(args) => <JBGridTest {...args}></JBGridTest>,
  args:{
    i18n:{showPersianNumber:true}
  }
};

export const WithCustomError:Story = {
  render:() => <CustomErrorTest></CustomErrorTest>,
  args:{}
};
