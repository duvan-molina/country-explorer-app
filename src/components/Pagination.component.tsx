import { Box, Button, Input, Text } from "@chakra-ui/react";

type Props = {
  getCanPreviousPage: boolean;
  getCanNextPage: boolean;
  getPageCount: number;
  handleSetPageIndex: (page: number) => void;
  handleClickNextPage: () => void;
  handleClickPreviousPage: () => void;
  paginationIndex: number;
};

const PaginationComponent: React.FC<Props> = ({
  getCanNextPage,
  getCanPreviousPage,
  handleSetPageIndex,
  handleClickPreviousPage,
  getPageCount,
  handleClickNextPage,
  paginationIndex,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={4}
    >
      <Box m="auto">
        <Button
          size="xs"
          variant="ghost"
          isDisabled={!getCanPreviousPage}
          onClick={() => handleSetPageIndex(0)}
        >
          <Text fontSize="sm">{"<<"}</Text>
        </Button>
        <Button
          size="xs"
          variant="ghost"
          onClick={handleClickPreviousPage}
          isDisabled={!getCanPreviousPage}
        >
          <Text fontSize="sm">{"<"}</Text>
        </Button>
        <Box display="unset" mx={2}>
          <Input
            variant="ghost"
            p={0}
            w="auto"
            min={1}
            max={getPageCount}
            readOnly
            type="number"
            value={paginationIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              handleSetPageIndex(page);
            }}
          />
          de {getPageCount}
        </Box>
        <Button
          size="xs"
          variant="ghost"
          onClick={handleClickNextPage}
          isDisabled={!getCanNextPage}
        >
          <Text fontSize="sm">{">"}</Text>
        </Button>
        <Button
          size="xs"
          variant="ghost"
          onClick={() => handleSetPageIndex(getPageCount - 1)}
          isDisabled={!getCanNextPage}
        >
          <Text fontSize="sm">{">>"}</Text>
        </Button>
      </Box>
    </Box>
  );
};

export default PaginationComponent;
