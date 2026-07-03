import './JBGridTest.css';
import { useCallback, useEffect, useMemo, useRef, useState, Fragment } from 'react';
import { JBCell, JBColumnHeader, JBRow, JBGrid, JBTableHeader, type JBGridI18nConfig } from '../../react/lib/JBGrid.tsx';
import {JBButton} from 'jb-button/react'
import ExpandRowSample from './ExpandRowSample';
import type { SampleLocale } from './ExpandRowSample';
import { faker, fakerFA } from '@faker-js/faker';

type Props = {
  i18n?: JBGridI18nConfig | null,
  locale?: SampleLocale
}
type Row = {
  id: number,
  name: string,
  age: number,
  jobTitle: string,
  email: string,
  city: string,
  status: string
}
type Column = {
  id: number,
  name: string,
  title: string,
  width?: string | number,
  sortable?: boolean,
  sort?: "asc" | "desc"
}

const storyText = {
  en: {
    title: "Users",
    detailButton: "Details",
    columns: {
      name: "Name",
      age: "Age",
      jobTitle: "Job Title",
      email: "Email",
      city: "City",
      status: "Status",
      operation: "Actions",
    },
    labels: {
      name: "Name:",
      age: "Age:",
      jobTitle: "Job Title:",
      email: "Email:",
      city: "City:",
      status: "Status:",
      operation: "Actions:",
    },
    statuses: ["Active", "Pending", "Suspended"],
    i18n: {
      showPersianNumber: false,
      messages: {
        EnterPageNumberMessage: "Enter the page number you want to open",
        serverErrorText: "Something went wrong while loading data.",
        serverErrorTitle: "Sorry",
        serverErrorRefreshButtonTitle: "Try again",
        currentAvailableItem: "Total available records",
        pageItemCount: "Items per page",
        from: "of",
      }
    }
  },
  fa: {
    title: "لیست کاربران",
    detailButton: "جزئیات",
    columns: {
      name: "نام",
      age: "سن",
      jobTitle: "سمت",
      email: "ایمیل",
      city: "شهر",
      status: "وضعیت",
      operation: "عملیات",
    },
    labels: {
      name: "نام:",
      age: "سن:",
      jobTitle: "سمت:",
      email: "ایمیل:",
      city: "شهر:",
      status: "وضعیت:",
      operation: "عملیات:",
    },
    statuses: ["فعال", "در انتظار", "غیرفعال"],
    i18n: {
      showPersianNumber: true,
      messages: {
        EnterPageNumberMessage: "شماره صفحه ای که میخواهید وارد آن شوید را وارد کنید",
        serverErrorText: "متاسفانه در هنگام بارگذاری اطلاعات خطایی رخ داده است",
        serverErrorTitle: "خطا",
        serverErrorRefreshButtonTitle: "تلاش مجدد",
        currentAvailableItem: "تعداد کل آیتم های موجود",
        pageItemCount: "تعداد آیتم در هر صفحه",
        from: "از",
      }
    }
  }
} as const;

function createColumns(locale: SampleLocale): Column[] {
  const text = storyText[locale];
  return [
    {
      id: 1,
      name: 'name',
      title: text.columns.name,
      sortable: true,
      width: '1fr'
    },
    {
      id: 2,
      name: 'jobTitle',
      title: text.columns.jobTitle,
      sortable: true,
      width: '1.4fr'
    },
    {
      id: 3,
      name: 'age',
      title: text.columns.age,
      sortable: false,
      width: '72px'
    },
    {
      id: 4,
      name: 'email',
      title: text.columns.email,
      sortable: false,
      width: '1.7fr'
    },
    {
      id: 5,
      name: 'city',
      title: text.columns.city,
      sortable: false,
      width: '1fr'
    },
    {
      id: 6,
      name: 'status',
      title: text.columns.status,
      sortable: false,
      width: '112px'
    },
    {
      id: 7,
      name: 'operation',
      title: text.columns.operation,
      sortable: false,
      width: '120px'
    }
  ];
}

function createFakeRows(locale: SampleLocale) {
  const fakerInstance = locale === "fa" ? fakerFA : faker;
  fakerInstance.seed(123);
  return Array.from({ length: 45 }, (_, index) => ({
    id: index + 1,
    name: fakerInstance.person.fullName(),
    age: fakerInstance.number.int({ min: 18, max: 65 }),
    jobTitle: fakerInstance.person.jobTitle(),
    email: fakerInstance.internet.email(),
    city: fakerInstance.location.city(),
    status: storyText[locale].statuses[index % storyText[locale].statuses.length]
  }));
}

function loadMockData(allData: Row[], pageIndex: number, pageSize: number) {
  return new Promise<Row[]>((resolve) => {
    window.setTimeout(() => {
      const startIndex = (pageIndex - 1) * pageSize;
      resolve(allData.slice(startIndex, startIndex + pageSize));
    }, 3000);
  });
}

function JBGridTest (props:Props){
  const locale = props.locale ?? "en";
  const text = storyText[locale];
  const [columns, setColumns] = useState(() => createColumns(locale));
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [expandedRowIds, setExpandedRowIds] = useState<Set<number>>(() => new Set());
  const allData = useMemo<Row[]>(() => createFakeRows(locale), [locale]);
  const [data, setData] = useState<Row[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadRequestId = useRef(0);
  const rowTemplate = useMemo(() => columns.map((column) => ({ name: column.name, size: column.width })), [columns]);
  const i18n = useMemo<JBGridI18nConfig>(() => ({
    ...text.i18n,
    ...props.i18n,
    messages: {
      ...text.i18n.messages,
      ...props.i18n?.messages
    }
  }), [props.i18n, text.i18n]);
  const loadData = useCallback((nextPageIndex = pageIndex, nextPageSize = pageSize) => {
    const requestId = loadRequestId.current + 1;
    loadRequestId.current = requestId;
    setIsLoading(true);
    return loadMockData(allData, nextPageIndex, nextPageSize).then((nextData) => {
      if (loadRequestId.current == requestId) {
        setData(nextData);
      }
    }).finally(() => {
      if (loadRequestId.current == requestId) {
        setIsLoading(false);
      }
    });
  }, [allData, pageIndex, pageSize]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  useEffect(() => {
    setColumns(createColumns(locale));
    setPageIndex(1);
    setExpandedRowIds(new Set());
  }, [locale]);

  const toggleRowExpanded = (rowId: number) => {
    setExpandedRowIds((previousValue) => {
      const newValue = new Set(previousValue);
      if (newValue.has(rowId)) {
        newValue.delete(rowId);
      } else {
        newValue.add(rowId);
      }
      return newValue;
    });
  };

  const setSortColumn = (column: Pick<Column, "name" | "sort">) => {
    setColumns((previousValue) => {
      return previousValue.map((item) => ({
        ...item,
        sort: item.name == column.name ? column.sort : undefined
      }));
    });
  };

  const tableHeader = (
    <JBTableHeader headerTemplate={rowTemplate}>
      {
        columns.map((item) => (
          <JBColumnHeader
            key={`${item.name}-${item.id}-jb-grid-table-header`}
            name={item.name}
            title={item.name}
            sortable={item.sortable}
            sort={item.sort}
            onSort={(event) => setSortColumn(event.detail)}
          >
            {item.title}
          </JBColumnHeader>
        ))
      }
    </JBTableHeader>
  );

  return (
    <div className={`grid-wrapper ${locale === "fa" ? "rtl-grid-wrapper" : ""}`} dir={locale === "fa" ? "rtl" : "ltr"}>
        <JBGrid
          tableHeader={tableHeader}
          data={data}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalItemsCount={allData.length}
          isLoading={isLoading}
          title={text.title}
          i18n={i18n}
          onPageIndexChange={setPageIndex}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPageIndex(1);
          }}
          onRefresh={() => loadData()}
        >
          {
            (data) => data.map(
              (item) => {
                return (
                  <Fragment key={item.id} >
                    <JBRow rowTemplate={rowTemplate} isOpen={expandedRowIds.has(item.id)}>
                      <JBCell name="name" label={text.labels.name}>{item.name}</JBCell>
                      <JBCell name="jobTitle" label={text.labels.jobTitle} ellipsis>{item.jobTitle}</JBCell>
                      <JBCell name="age" label={text.labels.age}>{item.age}</JBCell>
                      <JBCell name="email" label={text.labels.email} ellipsis>{item.email}</JBCell>
                      <JBCell name="city" label={text.labels.city} ellipsis>{item.city}</JBCell>
                      <JBCell name="status" label={text.labels.status}>{item.status}</JBCell>
                      <JBCell name="operation" label={text.labels.operation}><JBButton onClick={()=>toggleRowExpanded(item.id)}>{text.detailButton}</JBButton></JBCell>
                      <div slot='expand'>
                        <ExpandRowSample locale={locale} seed={item.id}></ExpandRowSample>
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
export default JBGridTest;
