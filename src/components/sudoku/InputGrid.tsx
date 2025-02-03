import { SimpleGrid } from "@chakra-ui/react";
import InputBlock from "./InputBlock";

interface Props {
  width: number;
}

const InputGrid = ({ width }: Props) => {
  // Input ids range from 0 - 80
  const ids: number[][] = [];
  for (var i = 0; i < 9; i++) {
    ids.push([]);
  }

  for (var i = 0; i < 81; i++) {
    ids[Math.floor(i / 9)].push(i);
  }

  const columnCount = 3;

  return (
    <SimpleGrid columns={columnCount} width={width * columnCount * columnCount}>
      {ids.map((blockIds) => (
        <InputBlock key={blockIds[0] * 10} width={width} ids={blockIds} />
      ))}
    </SimpleGrid>
  );
};

export default InputGrid;
