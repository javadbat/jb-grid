import { Fragment } from 'react';
import {JBCell, JBExpandToggle, JBRow} from 'jb-grid/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {faker} from '@faker-js/faker'
import { expect, userEvent, waitFor } from 'storybook/test';
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
    {name:"age",size:'6.25rem'},
  ],
  children:<Fragment>
    <JBCell name="id">id cell</JBCell>
    <JBCell name="name">name cell</JBCell>
    <JBCell name="age">age cell</JBCell>
  </Fragment>
  }
};
export const OverflowCellUnhandled:Story = {
  args:{
   rowTemplate:[
    {name:"id",size:"1fr"},
    {name:"bio",size:"1fr"},
    {name:"name",size:"1fr"},
    {name:"jobTitle",size:'6.25rem'},
  ],
  children:<Fragment>
    <JBCell name="id">{faker.number.int({min:1000,max:9999})}</JBCell>
    <JBCell name="bio" >{faker.lorem.sentence(200)}</JBCell>
    <JBCell name="name">{faker.person.fullName()}</JBCell>
    <JBCell name="jobTitle">{faker.person.jobTitle()}</JBCell>
  </Fragment>
  }
};
export const OverflowCellSingleLine:Story = {
  args:{
   rowTemplate:[
    {name:"id",size:"1fr"},
    {name:"bio",size:"1fr"},
    {name:"name",size:"1fr"},
    {name:"jobTitle",size:'6.25rem'},
  ],
  children:<Fragment>
    <JBCell name="id">{faker.number.int({min:1000,max:9999})}</JBCell>
    <JBCell name="bio" ellipsis>{faker.lorem.sentence(200)}</JBCell>
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
    {name:"jobTitle",size:'6.25rem'},
  ],
  children:<Fragment>
    <JBCell name="id">{faker.number.int({min:1000,max:9999})}</JBCell>
    <JBCell name="bio" ellipsis={2}>{faker.lorem.sentence(200)}</JBCell>
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
  },
  play: async ({ canvasElement }) => {
    const row = canvasElement.querySelector("jb-row");
    const toggle = canvasElement.querySelector("jb-expand-toggle");
    const button = toggle?.shadowRoot?.querySelector<HTMLButtonElement>("button");
    const rowContent = row?.shadowRoot?.querySelector('[role="row"]');
    const detailsRow = row?.shadowRoot?.querySelector<HTMLElement>(".expand-wrapper");
    const detailsRegion = row?.shadowRoot?.querySelector<HTMLElement>(".expand-region");

    expect(row?.hasAttribute("role")).toBe(false);
    expect(rowContent).toBeTruthy();
    expect(detailsRow?.getAttribute("role")).toBe("row");
    expect(detailsRegion?.getAttribute("role")).toBe("region");
    expect(button?.getAttribute("aria-controls")).toBe(detailsRegion?.id);

    await userEvent.click(button!);
    await waitFor(() => {
      expect(button?.getAttribute("aria-expanded")).toBe("false");
      expect(detailsRow?.hasAttribute("inert")).toBe(true);
      expect(detailsRow?.getAttribute("aria-hidden")).toBe("true");
    });
  }
};

