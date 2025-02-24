"use server";
import { hashSync } from "bcrypt-ts";
import { RegisterSchema, SignInSchema } from "@/schema";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const signUpCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  

  const { name, email, password } = validatedFields.data;


  //const hashedPassword = hashSync(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: password && hashSync(password, 10),
      },
    });

    
  
  } catch (error) {
    
    return {
      
      message: "failed to register",
    };
  }
  redirect("/login");
};


export const signInCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid Credentials"
          }
        default:
          return {
            messge: "Something went wrong"
          }
      }
    }
    throw error
  }
}