"use client";

import { authClient } from "@/lib/auth-clinet";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";


const SignUp = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    const {data:fetchdata, error} = await authClient.signUp.email({
      name:data.name,
      email:data.email,
      password:data.password
    })
    console.log(error)
    console.log(fetchdata)

  };

  return (
    <div className="flex justify-center pt-3">
      <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
        {/* Name */}
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }

            return null;
          }}
        >
          <Label>Name</Label>

          <Input name="name" placeholder="Enter your name" />

          <FieldError />
        </TextField>

        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>

          <Input name="email" type="email" placeholder="john@example.com" />

          <FieldError />
        </TextField>

        {/* Password */}
        <TextField
          isRequired
          name="password"
          type="password"
          minLength={8}
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }

            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }

            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label>Password</Label>

          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
          />

          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>

          <FieldError />
        </TextField>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button type="submit">Submit</Button>

          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
