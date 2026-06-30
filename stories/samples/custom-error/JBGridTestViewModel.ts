import { action, makeObservable, observable } from "mobx";

import {JBGridData, type SearchbarConfig} from 'jb-grid/react';
class JBGridTestViewModel{

    jbGridConfig = new JBGridData();
    constructor(){
      makeObservable(this,{
        jbGridConfig:observable,
        initGrid:action.bound
      });
      this.initGrid();
    }
    initGrid(){
      this.jbGridConfig.table.columns = [
        {
          id: 1,
          name: 'name',
          title: 'نام',
          sortable: true,
          width: '1fr'
        },
        {
          id: 2,
          name: 'age',
          title: 'سن',
          sortable: false,
          width: '1fr'
        },
        {
          id: 3,
          name: 'expand',
          title: 'باز کردن',
          sortable: false,
        }
      ];
      this.jbGridConfig.data.requestParams.url = "http://localhost:3200/grid/user-list";
      this.jbGridConfig.data.requestParams.method = "POST";
    }
}
export default JBGridTestViewModel;