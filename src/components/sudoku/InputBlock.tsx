import { Box, SimpleGrid } from "@chakra-ui/react";
import SquareInput from "./SquareInput";

interface Props {
  width: number;
  ids: number[];
}
const InputBlock = ({ width, ids }: Props) => {
  return (
    <Box bgColor={ids[0] % 2 == 0 ? "pink.400" : ""}>
      <SimpleGrid columns={3} width={width * 3}>
        {ids.map((id) => (
          <SquareInput key={id} id={id} width={width} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default InputBlock;
