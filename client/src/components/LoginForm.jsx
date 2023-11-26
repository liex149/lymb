import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Box,
  Link
} from "@chakra-ui/react";
import { Form } from 'react-router-dom';

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });

  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <FormErrorMessage
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </FormErrorMessage>
        <FormControl marginY={5}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          {/* <FormHelperText type="invalid">Email is required!</FormHelperText> */}
        </FormControl>

        <FormControl  marginY={5}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          {/* <FormHelperText type="invalid">Password is required!</FormHelperText> */}
        </FormControl>

        <Box marginY={5}>
          No Account? 
          <Link href="/signup" > Signup</Link>
        </Box>

        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          // variant="success"
          colorScheme="blue"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
