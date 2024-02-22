import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
} from "@chakra-ui/react";
import FormGroupComponent from "./FormGroup.component";

const BasicInformationComponent = () => {
  return (
    <Box maxW="5xl" mx="auto">
      <Card mb="16" variant="outline">
        <CardHeader p="5" display="flex" alignItems="center">
          <Heading fontSize="17.5px" color="#596079" mr="12px">
            Basic information
          </Heading>
          <QuestionOutlineIcon w={4} h={4} color="#036215" />
        </CardHeader>
        <Divider />
        <CardBody p="5" pt={4}>
          <FormGroupComponent
            label="Affiliate Network Name"
            description="Give a full name or descriptive to the affiliate network you're registering"
            inputValue="A4D"
          />
          <FormGroupComponent
            label="Set the timezone"
            description="Set the desired Timezone for the Affiliate Network to perform automated tasks"
            isSelect
            options={[
              "EST Eastern Standard Time GMT-4:00 DST",
              "PST Pacific Standard Time GMT-7:00 DST",
            ]}
          />
          <FormGroupComponent
            label="Set the timezone"
            description="Set the desired Timezone for the Affiliate Network to perform automated tasks"
            isSelect
            options={["Weekly", "Monthly", "Yearly"]}
          />

          <Box display="flex" mt="7">
            <Button
              colorScheme="blue"
              fontSize="sm"
              py="21"
              px="7"
              fontFamily={"sans-serif"}
            >
              Create a new group
            </Button>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default BasicInformationComponent;
