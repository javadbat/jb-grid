import './JBGridTest.css';
import React, { useState } from 'react';
import { JBCell, JBRow, JBGrid } from '../../../react/lib/JBGrid.tsx';
import CustomError from './CustomError';

type Row = {
  id: number,
  name: string,
  age: number
}

function JBGridTest() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [data] = useState<Row[]>(() => [
    { id: 1, name: "علی", age: 28 },
    { id: 2, name: "زهرا", age: 31 }
  ]);

    return (
      <div className="grid-wrapper">
        <JBGrid
          contentError={<CustomError onRetry={() => console.log("retry grid data")} />}
          data={data}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalItemsCount={data.length}
          isErrorOccurred
          title="لیست کاربران"
          onPageIndexChange={setPageIndex}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPageIndex(1);
          }}
          onRefresh={() => console.log("retry grid data")}
        >
          {
            (data) => data.map(
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
export default JBGridTest;
