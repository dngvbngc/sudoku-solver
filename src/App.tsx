import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { Provider } from "./components/ui/provider";
import InputGrid from "./components/sudoku/InputGrid";
import { useState } from "react";

function App() {
  const [assignment, setAssignment] = useState(Array(81).fill(-1));

  const updateAssignment = (id: number, value: number) => {
    const newAssignment = [...assignment];
    newAssignment[id] = value;
    setAssignment(newAssignment);
  };

  return (
    <Provider>
      <Box padding={10}>
        <Heading textAlign='center'>Sudoku Solver</Heading>
        <SimpleGrid columns={2}>
          <Box>
            <InputGrid width={50} onFillBlock={updateAssignment} />
          </Box>
          <Box>
            {assignment.map((id) => (
              <div>{id}</div>
            ))}
          </Box>
        </SimpleGrid>
      </Box>
    </Provider>
  );
}

export default App;
