import { Input } from "@chakra-ui/react";

interface Props {
  width: number;
  id: number;
  onFill: (id: number, value: number) => void;
}

const SquareInput = ({ width, id, onFill }: Props) => {
  const stringId = id.toString();
  const placeholder = (id % 9 + 1).toString();
  return (
    <Input
      id={stringId}
      placeholder={placeholder}
      width={width}
      height={width}
      textAlign='center'
      fontSize={20}
      borderRadius={0}
      _focus={{ bgColor: "pink.500" }}
      onChange={(e) => onFill(id, parseInt(e.target.value))}
    />
  );
};

export default SquareInput;
