import React from 'react';
import {Pagination, type PaginationProps} from 'jb-grid/react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<PaginationProps> = {
  title: "Components/JBGrid/Pagination",
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Normal:Story = {
  args:{
  }
};
export const Max:Story = {
  args:{
    max:10
  }
};

