import React from 'react';
import {JBGridData, JBGrid} from 'jb-grid/react';
import JBGridTest from './samples/JBGridTest.tsx';
import CustomErrorTest from './samples/custom-error/JBGridTest.tsx';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: "Components/JBGrid",
  component: JBGrid,
} satisfies Meta<typeof JBGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal:Story = {
  render:(args) => <JBGridTest {...args}></JBGridTest>,
  args:{
    config: new JBGridData()
  }
};

export const WithPersianNumber:Story = {
  render:(args) => <JBGridTest {...args}></JBGridTest>,
  args:{
    config: new JBGridData(),
    i18n:{showPersianNumber:true}
  }
};

export const WithCustomError:Story = {
  render:(args) => <CustomErrorTest {...args}></CustomErrorTest>,
  args:{
    config: new JBGridData()
  }
};