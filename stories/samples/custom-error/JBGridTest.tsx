import React from 'react';
//@ts-ignore
import './JBGridTest.css';
import { JBCell, JBRow, JBGrid, ExpandRow } from 'jb-grid/react';
import JBGridBridge from '../JBGridBridge';
import JBGridTestViewModel from './JBGridTestViewModel';
import { observer } from 'mobx-react';
import CustomError from './CustomError';
import { useInstance } from 'jb-core/react';

function JBGridTest() {
  const vm = useInstance(JBGridTestViewModel,[]);

    return (
      <div className="grid-wrapper">
        <JBGrid contentError={<CustomError />} config={vm.jbGridConfig} bridge={JBGridBridge} title="لیست کاربران" searchbarConfig={vm.filterConfig}>
          {
            vm.jbGridConfig.data.data.map(
              (item) => {
                return (
                  <React.Fragment key={item.id}>
                    <JBRow rowTemplate={[{name:"name"},{name:"age"}]}>
                      <JBCell name="name">{item.name}</JBCell>
                      <JBCell name="age">{item.age}</JBCell>
                    </JBRow>
                
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