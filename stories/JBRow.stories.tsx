import React, { Fragment } from 'react';
import {JBCell, JBExpandToggle, JBRow} from 'jb-grid/react';
import type { Meta, StoryObj } from '@storybook/react';
import {faker} from '@faker-js/faker'
const meta = {
  title: "Components/JBGrid/Row",
  component: JBRow,
} satisfies Meta<typeof JBRow>;

export default meta;
type Story = StoryObj<typeof meta>;

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
export const OverflowCellSingleLine:Story = {
  args:{
   rowTemplate:[
    {name:"id",size:"1fr"},
    {name:"bio",size:"1fr"},
    {name:"name",size:"1fr"},
    {name:"jobTitle",size:'100px'},
  ],
  children:<Fragment>
    <JBCell name="id">{faker.number.int({min:1000,max:9999})}</JBCell>
    <JBCell name="bio" max-line="1">{faker.lorem.sentence(200)}</JBCell>
    <JBCell name="name">{faker.person.fullName()}</JBCell>
    <JBCell name="jobTitle">{faker.person.jobTitle()}</JBCell>
  </Fragment>
  }
};
export const OverflowCellMultiLine:Story = {
  args:{
   rowTemplate:[
    {name:"id",size:"1fr"},
    {name:"bio",size:"1fr"},
    {name:"name",size:"1fr"},
    {name:"jobTitle",size:'100px'},
  ],
  children:<Fragment>
    <JBCell name="id">{faker.number.int({min:1000,max:9999})}</JBCell>
    <JBCell name="bio" max-line="2">{faker.lorem.sentence(200)}</JBCell>
    <JBCell name="name">{faker.person.fullName()}</JBCell>
    <JBCell name="jobTitle">{faker.person.jobTitle()}</JBCell>
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

