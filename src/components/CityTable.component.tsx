import { FC, useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  FilterFn,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { rankItem } from "@tanstack/match-sorter-utils";
import { ViewIcon } from "@chakra-ui/icons";

import DebouncedInput from "./DebouncedInput.component";
import PaginationComponent from "./Pagination.component";
import { CountriesType } from "../types";
import CountriesContext from "../context/countries/CountriesContext";
import ModalCountryDetailComponent from "./ModalCountryDetails.component";
import DraggableTableHeader from "./DraggableTableHeader.component";
import DragAlongCell from "./DragAlongCell.component";

const columnHelper = createColumnHelper<CountriesType>();

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

const CityTableComponent: FC = () => {
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
        id: "id",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        id: "fullName",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((c) => c.id!)
  );

  const table = useReactTable({
    data: countries,
    columns,
    defaultColumn: {
      minSize: 200,
      maxSize: 800,
    },
    columnResizeMode: "onChange",
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
      columnOrder,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnOrderChange: setColumnOrder,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [table.getState().columnSizingInfo]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {error ? (
              <Box color="red.500" bg="red.100" p="4" borderRadius="md" mb="4">
                {error}
              </Box>
            ) : (
              <>
                <TableContainer>
                  <Box display="flex" justifyContent="flex-end">
                    <DebouncedInput
                      width={table.getTotalSize()}
                      value={globalFilter ?? ""}
                      onChange={(value) => setGlobalFilter(String(value))}
                      placeholder="Search Country..."
                    />
                  </Box>
                  <Table
                    variant="striped"
                    style={{
                      ...columnSizeVars,
                      width: table.getTotalSize(),
                    }}
                  >
                    <Thead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                          <SortableContext
                            items={columnOrder}
                            strategy={horizontalListSortingStrategy}
                          >
                            {headerGroup.headers.map((header) => (
                              <DraggableTableHeader
                                key={header.id}
                                header={header}
                                styles={{
                                  width: `calc(var(--header-${header?.id}-size) * 1px)`,
                                }}
                              />
                            ))}
                          </SortableContext>
                        </Tr>
                      ))}
                    </Thead>
                    <Tbody>
                      {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <DragAlongCell key={cell.id} cell={cell} />
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
                    pageSize={table.getState().pagination.pageSize}
                    getPageCount={table.getPageCount()}
                    handleClickNextPage={table.nextPage}
                    paginationIndex={table.getState().pagination.pageIndex}
                    setPageSize={(size) => table.setPageSize(size)}
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
        </DndContext>
      )}
    </>
  );
};

export default CityTableComponent;
