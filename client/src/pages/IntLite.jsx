import React, { useEffect, useState } from "react";
import Interval from "./Interval.jsx"
import { Center, CardHeader, Card, CardBody, Heading, Show, Hide, Box } from "@chakra-ui/react";

import { QUERY_EXERCISE, QUERY_ME } from "../utils/queries.js"; // Import your mutations
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_SINGLE_WORKOUT } from "../utils/queries";


const ExerciseInterval = () => {
  
  //This query now works. Just need to incorporate it into Browser REACT
  // const { loading, error, data: exerciseQuery } = useQuery(QUERY_EXERCISE);
  // if (loading) {return <h2>Loading...</h2>;}
  // if (error) {return <h2>Error! {error.message}</h2>;}
  // const exercises = exerciseQuery?.exercises || [];
  // console.log(exercises1);
  let { workoutId } = useParams();
  const { loading, data, error } = useQuery(QUERY_SINGLE_WORKOUT, {
    variables: { _id: workoutId },
  });

  const workout = data?.workout || [];

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading data</div>;
  }
  // console.log(workout);
  // console.log(workoutId);

  return (
    <Center mt={5}>
      <Box>
        <Interval workout={workout}/>
      </Box>
    
      <Box className="timer-wrapper">
        <Box style={{ display: "flex" }}></Box>
      </Box>
    </Center>
  );
  
};

export default ExerciseInterval;
