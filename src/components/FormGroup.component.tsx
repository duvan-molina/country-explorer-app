import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

type Props = {
  inputValue?: string;
  label: string;
  description: string;
  isSelect?: boolean;
  options?: string[];
};

const FormGroupComponent: React.FC<Props> = ({
  inputValue,
  label,
  description,
  isSelect,
  options,
}) => {
  return (
    <Box>
      <FormControl p="0" isRequired>
        <FormLabel
          color="#43495C"
          margin="0"
          fontSize="md"
          requiredIndicator={
            <span
              style={{ color: "#E53E3E", fontSize: "21px", marginLeft: "3px" }}
            >
              *
            </span>
          }
        >
          {label}
        </FormLabel>
        <Text color="gray.500" textAlign="left" mb="2" fontSize="sm">
          {description}
        </Text>
        {isSelect && options ? (
          <Select mb="4">
            {options.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </Select>
        ) : (
          <Input placeholder="First name" value={inputValue} mb="4" />
        )}
      </FormControl>
    </Box>
  );
};

export default FormGroupComponent;
