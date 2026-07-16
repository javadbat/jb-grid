import { useMemo, useState } from "react";
import { JBInput } from "jb-input/react";
import { JBOption, JBSelect } from "jb-select/react";
import { JBSearchbar } from "jb-searchbar/react";
import type { JBSearchbarEventType, JBSearchbarValue } from "jb-searchbar";
import { JBCell, JBColumnHeader, JBGrid, JBRow, JBTableHeader } from "../../react/lib/index.ts";
import "./SearchFilterDemo.css";

type UserStatus = "Active" | "Pending" | "Suspended";

type User = {
  id: number;
  name: string;
  email: string;
  city: string;
  status: UserStatus;
};

type GridFilters = {
  query: string;
  status: UserStatus | "";
};

const names = ["Ava Martin", "Noah Wilson", "Mia Anderson", "Liam Thomas", "Emma Taylor", "Oliver Moore", "Sophia Jackson", "Elijah White"];
const cities = ["Berlin", "London", "Madrid", "Paris", "Rome", "Toronto"];
const statuses: UserStatus[] = ["Active", "Pending", "Suspended"];
const users: User[] = Array.from({ length: 24 }, (_, index) => {
  const name = names[index % names.length];
  return {
    id: index + 1,
    name,
    email: `${name.toLowerCase().replace(" ", ".")}${index + 1}@example.com`,
    city: cities[index % cities.length],
    status: statuses[index % statuses.length],
  };
});

const rowTemplate = [
  { name: "name", size: "1fr" },
  { name: "email", size: "1.5fr" },
  { name: "city", size: "1fr" },
  { name: "status", size: "7rem" },
];

function getFilterValue(value: JBSearchbarValue, name: string) {
  return value.find(filter => filter.name === name)?.value;
}

export default function SearchFilterDemo() {
  const [filters, setFilters] = useState<GridFilters>({ query: "", status: "" });
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLocaleLowerCase();
    return users.filter(user => {
      const matchesQuery = normalizedQuery.length === 0 || [user.name, user.email, user.city].some(value => value.toLocaleLowerCase().includes(normalizedQuery));
      const matchesStatus = filters.status.length === 0 || user.status === filters.status;
      return matchesQuery && matchesStatus;
    });
  }, [filters]);

  const pageData = useMemo(() => {
    const startIndex = (pageIndex - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredUsers, pageIndex, pageSize]);

  const handleSearch = (event: JBSearchbarEventType<CustomEvent>) => {
    const value = event.target.value;
    setFilters({
      query: String(getFilterValue(value, "query") ?? ""),
      status: String(getFilterValue(value, "status") ?? "") as UserStatus | "",
    });
    setPageIndex(1);
  };

  const searchbar = (
    <JBSearchbar className="search-filter-searchbar" onSearch={handleSearch}>
      <div slot="filter">
        <JBInput name="query" placeholder="Name, email, or city" />
        <JBSelect<string> name="status" placeholder="Status">
          <JBOption value="Active">Active</JBOption>
          <JBOption value="Pending">Pending</JBOption>
          <JBOption value="Suspended">Suspended</JBOption>
        </JBSelect>
      </div>
    </JBSearchbar>
  );

  const tableHeader = (
    <JBTableHeader headerTemplate={rowTemplate}>
      <JBColumnHeader name="name">Name</JBColumnHeader>
      <JBColumnHeader name="email">Email</JBColumnHeader>
      <JBColumnHeader name="city">City</JBColumnHeader>
      <JBColumnHeader name="status">Status</JBColumnHeader>
    </JBTableHeader>
  );

  return (
    <div className="search-filter-grid-demo">
      <JBGrid
        title="Searchable users"
        searchbarComponent={searchbar}
        tableHeader={tableHeader}
        data={pageData}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalItemsCount={filteredUsers.length}
        onPageIndexChange={setPageIndex}
        onPageSizeChange={nextPageSize => {
          setPageSize(nextPageSize);
          setPageIndex(1);
        }}
      >
        {pageData.map(user => (
          <JBRow key={user.id} rowTemplate={rowTemplate}>
            <JBCell name="name" label="Name:">
              {user.name}
            </JBCell>
            <JBCell name="email" label="Email:" ellipsis>
              {user.email}
            </JBCell>
            <JBCell name="city" label="City:">
              {user.city}
            </JBCell>
            <JBCell name="status" label="Status:">
              {user.status}
            </JBCell>
          </JBRow>
        ))}
      </JBGrid>
    </div>
  );
}
