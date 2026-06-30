import './JBGridTest.css';
import { JBCell, JBRow, JBGrid, type JBGridI18nConfig } from 'jb-grid/react';
import {JBButton} from 'jb-button/react'
import JBGridBridge from './JBGridBridge';
import JBGridTestViewModel from './JBGridTestViewModel';
import { observer } from 'mobx-react';
import ExpandRowSample from './ExpandRowSample';
import {useInstance} from 'jb-core/react';
import { Fragment } from 'react/jsx-runtime';

type Props = {
  i18n: JBGridI18nConfig | null | undefined
}
function JBGridTest (props:Props){
  const vm = useInstance(JBGridTestViewModel,[]);
  return (
    <div className="grid-wrapper">
        <JBGrid config={vm.jbGridConfig} bridge={JBGridBridge} title="لیست کاربران" i18n={props.i18n}>
          {
            vm.jbGridConfig.data.data.map(
              (item) => {
                return (
                  <Fragment key={item.id} >
                    <JBRow rowTemplate={[{name:"name"},{name:"age"},{name:"operation"}]} isOpen={item.jbGridDetail.isExpanded}>
                      <JBCell name="name" label="نام:">{item.name}</JBCell>
                      <JBCell name="age" label={"سن:"}>{item.age}</JBCell>
                      <JBCell name="operation" label="عملیات:"><JBButton onClick={()=>{item.jbGridDetail.isExpanded = !item.jbGridDetail.isExpanded;}}>detail</JBButton></JBCell>
                      <div slot='expand'>
                        <ExpandRowSample></ExpandRowSample>
                      </div>
                    </JBRow>
                  </Fragment>

                );
              }
            )
          }
        </JBGrid>
      </div>
    );
}
export default observer(JBGridTest);