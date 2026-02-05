import React from 'react';
import {JBPagination, type PaginationProps} from 'jb-grid/react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<PaginationProps> = {
  title: "Components/JBGrid/Pagination",
  component: JBPagination,
};

export default meta;
type Story = StoryObj<typeof JBPagination>;

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

