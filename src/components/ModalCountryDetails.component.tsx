import {
  Box,
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import { CountryType } from "../types";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  country: CountryType | null;
  isLoadingCountry: boolean;
  error?: string;
};

const ModalCountryDetailComponent: React.FC<Props> = ({
  onClose,
  isOpen,
  country,
  isLoadingCountry,
  error,
}) => {
  return (
    <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        {error ? (
          <Box color="red.500" bg="red.100" p="4" borderRadius="md" mb="4">
            {error}
          </Box>
        ) : (
          <>
            {isLoadingCountry ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="200px"
              >
                <Spinner />
              </Box>
            ) : (
              <>
                <ModalHeader>Country Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack direction={["column", "row"]} spacing="24px">
                    <UnorderedList>
                      <ListItem>Country: {country?.name}</ListItem>
                      <ListItem>Capital: {country?.capital}</ListItem>
                      <ListItem>ISO: {country?.iso2}</ListItem>
                      <ListItem>Currency: {country?.currency}</ListItem>
                      <ListItem>phonecode: {country?.phonecode}</ListItem>
                      <ListItem>Native: {country?.native}</ListItem>
                      <ListItem>Flag: {country?.emoji}</ListItem>
                    </UnorderedList>
                  </Stack>
                </ModalBody>
              </>
            )}
          </>
        )}

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCountryDetailComponent;
