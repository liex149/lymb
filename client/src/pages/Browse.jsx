import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Heading,
  Input,
  InputLeftAddon,
  Image,
  SimpleGrid,
  Container,
  InputGroup,
  InputRightAddon,
  Wrap,
} from "@chakra-ui/react";

import theme from "../components/theme";
import "@fontsource-variable/lexend-peta"; //font theme. 
import { useQuery } from '@apollo/client';
import { QUERY_EXERCISE, QUERY_WORKOUT} from '../utils/queries.js'; // Import your mutations
import React, {useEffect, useState} from 'react';
import getBrowseData from '../utils/browserImport.js' //Generates images and name for "Browse By Type"

const Browse = () => {
//Function from import. Helps, generates images and name for "Browse By Type"
  const typeData = getBrowseData();

//Query exercise (ALL), store it as exerciseDataJson. 
  const { data, loading, error } = useQuery(QUERY_EXERCISE);
  const exerciseDataJson = data?.exercises || [];

  const { workoutData, workoutLoading, workoutError } = useQuery(QUERY_WORKOUT);
  const WorkoutDataJson = workoutData?.workouts ||[];
  console.log(WorkoutDataJson);

  //Browse-Type that the user selects.
  const [selectedType, setSelectedType] = useState(''); 
//modified exercisedata to be displayed in results
  const [exerciseData, setExerciseData] = useState(exerciseDataJson); 
  
// Update exerciseData state when data changes
  useEffect(() => {
    if (data) {
      setExerciseData(data.exercises || []);
    }
  }, [data]);

  const handleTypeClick = (type) => {
    //logic: check previous type, if equal to type, then set it to blank. Otherwise, set to type. 
    setSelectedType(prevType => (prevType === type ? '' : type));
  
    // Filter exerciseData based on type clicked
    const filteredExercises = exerciseDataJson.filter(exercise => {
      const types = exercise.type.split(',').map(t => t.trim());
      return types.includes(type);
    });
  
    // If type is blank from above logic, reset to default data to exerciseDataJson - show all exercise data
    if (selectedType === type || !type) {
      setExerciseData(exerciseDataJson);
    } else {
      setExerciseData(filteredExercises);
    }
  };

  return (
    <Container maxW="100%">

{/* Attempt to populate ALL workouts */}
    {WorkoutDataJson.map((workouts, index) => (
      <Card key={workouts._id}>
        <CardHeader fontWeight="bold" fontSize="large">{workouts.name}</CardHeader>
        <CardBody>{workouts.name}</CardBody>
        <CardBody>
          Type: {workouts.description}
        </CardBody>
          <Button>Click to add</Button>
      </Card>
    ))}


{/*Browse Type Section */}
    <Box my={10} display="flex" flexDirection={'column'}>
      <Heading mb={5} alignSelf='center' fontFamily={theme.fonts.heading} as="h2" size="md">
        Browse by Type
      </Heading>
      <Wrap justify={"space-evenly"}>
        {/* Maps through browseType, to populate the cards TYPE. */}
        {typeData.map((data, index) => (
          <Card
            key={`type-${index}`}
            width={150}
            textAlign="center"
            alignSelf="center"
            onClick={() => handleTypeClick(data.type)}
            _hover={{
              bg: "gray.200",
              cursor: "pointer",
            }}
            bg={selectedType === data.type ? "gray.200" : "white"} // Apply conditional bg color
          >
            <CardHeader>
              <Heading color={theme.colors.darkCyan} as="h3" size="sm">
                <Image src={data.image} alt={`${data.type}-photo`} />
              </Heading>
            </CardHeader>
            <CardBody fontWeight="bold" fontSize="large">
              {data.type}
            </CardBody>
          </Card>
        ))}
      </Wrap>
    </Box>

{/* Exercise Section */}
      <Box my={10} display='flex' flexDirection={'column'}>
        <Heading mb={5} alignSelf='center' fontFamily={theme.fonts.heading} as="h2" size="md">
          Results
        </Heading>
        <SimpleGrid spacing={10} minChildWidth={300} textAlign="center">
  {/* Maps through exerciseData (includes filtering), to populate the cards. */}
            {exerciseData.map((exercise, index) => (
            <Card key={exercise._id}>
              <CardHeader fontWeight="bold" fontSize="large">{exercise.name}</CardHeader>
              <CardBody>{exercise.description}</CardBody>
              <CardBody>
                Type: {exercise.type}
                <br />
                Targets: {exercise.target}</CardBody>
                <Button>Click to add</Button>
            </Card>
            ))}
        </SimpleGrid>
      </Box>

    </Container>
  );
};

export default Browse;


// Future Implementation. Search-Bar */}
// <Box my={10}>
//   <InputGroup>
//     <InputLeftAddon fontFamily={theme.fonts.heading} as="h2" size="md">
//       Search Exercises
//     </InputLeftAddon>
//     <Input
//       size="md"
//       value={searchTerm}
//       onChange={handleSearch}
//       placeholder="Enter exercise name"
//     />
//     <InputRightAddon>
//       <Button>Search</Button>
//     </InputRightAddon>
//   </InputGroup>
// </Box>

// {/* collapse bar in testing... not there yet. */}
// <>
//   <Button onClick={handleToggle}>
//     Toggle
//   </Button>
//   <Collapse mt={4} isOpen={show}>
//     {/* Add content to display inside the Collapse */}
//     <p>Some collapsible content...</p>
//   </Collapse>
// </>