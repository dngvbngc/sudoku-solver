import {
  Box,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Provider } from "./components/ui/provider";
import InputGrid from "./components/sudoku/InputGrid";
import { useState } from "react";
import { isAssignmentConsistent, sudokuSolver } from "./utils/utils";

function App() {
  const [assignment, setAssignment] = useState(Array(81).fill(-1));
  const [isSolved, setIsSolved] = useState<number[]>([]);
  const [message, setMessage] = useState(
    "Fill in the Sudoku template to solve."
  );

  const updateAssignment = (id: number, value: number) => {
    const newAssignment = [...assignment];
    if (!isNaN(value) && value <= 9 && value >= 1) {
      newAssignment[id] = value;
      setAssignment(newAssignment);
      setIsSolved([...isSolved, id]);
    } else {
      setMessage("Please input a valid integer between 1 to 9.");
    }
  };

  const solveSudoku = () => {
    if (!isAssignmentConsistent(assignment, isSolved)) {
      setMessage("Invalid sudoku (same value in row, column or block).");
    } else {
      const result = sudokuSolver(assignment);
      if (result) {
        setAssignment(result);
        setMessage("Solution found!");
      } else {
        setMessage("Unable to solve.");
      }
    }
  };

  return (
    <Provider>
      <Box padding={10}>
        <Heading textAlign='center' padding={10} fontSize={40}>
          Sudoku Solver
        </Heading>
        <SimpleGrid columns={2}>
          <Center>
            <VStack>
              <InputGrid width={50} onFillBlock={updateAssignment} />
              <Text color='red' padding={5}>
                {message}
              </Text>
            </VStack>
          </Center>
          <Box>
            {assignment.map((id) => (
              <text>{id} </text>
            ))}
            <br></br>
            <Button onClick={solveSudoku}>Solve</Button>
          </Box>
        </SimpleGrid>
      </Box>
    </Provider>
  );
}

export default App;
