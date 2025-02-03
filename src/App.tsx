import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { Provider } from "./components/ui/provider";
import InputGrid from "./components/sudoku/InputGrid";

function App() {
  return (
    <Provider>
      <Box padding={10}>
        <Heading textAlign='center'>Sudoku Solver</Heading>
        <SimpleGrid columns={2}>
          <Box>
            <InputGrid width={50} />
          </Box>
          <Box></Box>
        </SimpleGrid>
      </Box>
    </Provider>
  );
}

export default App;
