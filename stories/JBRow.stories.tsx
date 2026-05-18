import React, { Fragment } from 'react';
import {JBCell, JBExpandToggle, JBRow, type PaginationProps} from 'jb-grid/react';
import type { Meta, StoryObj } from '@storybook/react';
import {faker} from '@faker-js/faker'
const meta: Meta<PaginationProps> = {
  title: "Components/JBGrid/Row",
  component: JBRow,
};

export default meta;
type Story = StoryObj<typeof JBRow>;

export const Normal:Story = {
  args:{
   rowTemplate:[
    {name:"id",size:"1fr"},
    {name:"name",size:"1fr"},
    {name:"family",size:"1fr"},
    {name:"age",size:'100px'},
  ],
  children:<Fragment>
    <JBCell name="id">id cell</JBCell>
    <JBCell name="name">name cell</JBCell>
    <JBCell name="age">age cell</JBCell>
  </Fragment>
  }
};
export const WithExpand:Story = {
  args:{
   isOpen:true,
  children:<Fragment>
    <JBCell name="id"><JBExpandToggle />id cell</JBCell>
    <JBCell name="name">name cell</JBCell>
    <JBCell name="age">age cell</JBCell>
    <div slot="expand">
      {faker.lorem.paragraph(50)}
    </div>
  </Fragment>
  }
};

