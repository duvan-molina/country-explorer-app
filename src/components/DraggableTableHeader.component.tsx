import { CSSProperties } from "react";
import { ArrowUpIcon, DragHandleIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Th, Text } from "@chakra-ui/react";
import { Header, flexRender } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CountriesType } from "../types";

const DraggableTableHeader = ({
  header,
  styles,
}: {
  header: Header<CountriesType, unknown>;
  styles: CSSProperties;
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <Th
      colSpan={header.colSpan}
      ref={setNodeRef}
      style={{ ...style, ...styles }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Box display="flex" alignItems="center">
          <Text
            onClick={header.column.getToggleSortingHandler()}
            mr={2}
            cursor="pointer"
            css={{
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </Text>
          {{
            asc: <ArrowUpIcon />,
            desc: <ArrowUpIcon transform="rotate(180deg)" />,
          }[header.column.getIsSorted() as string] ?? null}

          <Button
            outline="unstyled"
            background="transparent"
            css={{
              "&:hover": {
                background: "transparent",
                borderColor: "transparent",
              },
            }}
            mx={2}
            cursor={isDragging ? "grabbing" : "grab"}
            {...attributes}
            {...listeners}
          >
            <DragHandleIcon />
          </Button>
        </Box>

        <Divider
          orientation="vertical"
          height={10}
          borderLeftWidth={4}
          cursor="col-resize"
          {...{
            onDoubleClick: () => header.column.resetSize(),
            onMouseDown: header.getResizeHandler(),
            onTouchStart: header.getResizeHandler(),
          }}
        />
      </Box>
    </Th>
  );
};

export default DraggableTableHeader;
