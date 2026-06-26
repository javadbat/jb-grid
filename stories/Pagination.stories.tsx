import React from 'react';
import {JBPagination} from 'jb-grid/react';
import type { Meta, StoryObj } from '@storybook/react';

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
  }
};

