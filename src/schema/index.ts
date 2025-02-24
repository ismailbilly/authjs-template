import * as zod from "zod";

export const RegisterSchema = zod.object({
  email: zod.string().email({
    message: "Email is Required",
  }),
  password: zod.string().min(4, {
    message: "Input a password of 4 or more characters",
  }),
  name: zod.string().min(2, {
    message: "Name is Required",
  }),
});

export const SignInSchema = zod.object({
  email: zod.string().email({
    message: "Email is Required",
  }),
  password: zod.string().min(4, {
    message: "Input a password of 4 or more characters",
  })
  
});
