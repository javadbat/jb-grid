import React, { Component } from 'react';
import './JBGridTest.css';
import { Cell, Row, JBGrid, ExpandRow } from 'jb-grid/react';
import {JBButton} from 'jb-button/react'
import JBGridBridge from './JBGridBridge';
import JBGridTestViewModel from './JBGridTestViewModel';
import { observer } from 'mobx-react';
import ExpandRowSample from './ExpandRowSample';
import {useInstance} from 'jb-core/react';

function JBGridTest (props:any){
  const vm = useInstance(JBGridTestViewModel,[]);
  return (
    <div className="grid-wrapper">
        <JBGrid config={vm.jbGridConfig} bridge={JBGridBridge} title="لیست کاربران" searchbarConfig={vm.filterConfig} i18n={props.i18n}>
          {
            vm.jbGridConfig.data.data.map(
              (item) => {
                return (
                  <React.Fragment key={item.id}>
                    <Row>
                      <Cell label="نام:">{item.name}</Cell>
                      <Cell label={"سن:"}>{item.age}</Cell>
                      <Cell label="عملیات:"><JBButton onClick={()=>{item.jbGridDetail.isExpanded = !item.jbGridDetail.isExpanded;}}>detail</JBButton></Cell>
                    </Row>
                    <ExpandRow show={item.jbGridDetail.isExpanded}>
                      <ExpandRowSample></ExpandRowSample>
                    </ExpandRow>
                  </React.Fragment>

                );
              }
            )
          }
        </JBGrid>
      </div>
    );
}
export default observer(JBGridTest);