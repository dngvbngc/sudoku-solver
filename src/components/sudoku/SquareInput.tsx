import { Input } from "@chakra-ui/react";

interface Props {
  width: number;
  id: number;
}

const SquareInput = ({ width, id }: Props) => {
  const stringId = id.toString();
  return (
    <Input
      id={stringId}
      placeholder={stringId}
      width={width}
      height={width}
      textAlign='center'
      fontSize={20}
      borderRadius={0}
      _focus={{ bgColor: "pink.500", boxShadow: "none" }}
    />
  );
};

export default SquareInput;
