import { FC, useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  FilterFn,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { ViewIcon } from "@chakra-ui/icons";

import DebouncedInput from "./DebouncedInput.component";
import PaginationComponent from "./Pagination.component";
import { CountriesType } from "../types";
import CountriesContext from "../context/countries/CountriesContext";
import ModalCountryDetailComponent from "./ModalCountryDetails.component";

const columnHelper = createColumnHelper<CountriesType>();

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

const CityTableComponent: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const {
    isLoading,
    countries,
    getCountry,
    isLoadingCountry,
    country,
    error,
    errorCountry,
  } = useContext(CountriesContext);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => <span>Country</span>,
      }),
      columnHelper.accessor((row) => row.iso2, {
        id: "iso2",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>ISO</span>,
      }),
      columnHelper.display({
        id: "Actions",
        cell: (info) => (
          <Button
            variant="ghost"
            onClick={() => {
              setIsModalOpen(true);
              getCountry(info.row.original.iso2);
            }}
          >
            <ViewIcon />
          </Button>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: countries,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      {error ? (
        <Box color="red.500" bg="red.100" p="4" borderRadius="md" mb="4">
          {error}
        </Box>
      ) : (
        <>
          <TableContainer>
            <Box display="flex" justifyContent="flex-end">
              <DebouncedInput
                value={globalFilter ?? ""}
                onChange={(value) => setGlobalFilter(String(value))}
                placeholder="Search Country..."
              />
            </Box>
            <Table variant="striped">
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <Box
                            cursor={
                              header.column.getCanSort() ? "pointer" : "none"
                            }
                            css={`
                              &:hover {
                                text-decoration: underline;
                              }
                            `}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <span>↑</span>,
                              desc: <span>↓</span>,
                            }[header.column.getIsSorted() as string] ?? null}
                          </Box>
                        )}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <PaginationComponent
              getCanNextPage={table.getCanNextPage()}
              getCanPreviousPage={table.getCanPreviousPage()}
              handleSetPageIndex={table.setPageIndex}
              handleClickPreviousPage={table.previousPage}
              getPageCount={table.getPageCount()}
              handleClickNextPage={table.nextPage}
              paginationIndex={table.getState().pagination.pageIndex}
            />
          </TableContainer>
          <ModalCountryDetailComponent
            isLoadingCountry={isLoadingCountry}
            country={country}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            error={errorCountry}
          />
        </>
      )}
    </Box>
  );
};

export default CityTableComponent;
