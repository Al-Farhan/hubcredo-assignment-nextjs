"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signIn } from "next-auth/react";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(2, "Email must be at least 2 characters.")
    .max(100, "Email must be at most 100 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const SignInPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await signIn(
        "credentials",
        {
          redirect: false,
          email: data.email,
          password: data.password,
        },
        {
          redirectTo: "/dashboard",
        }
      );

      router.replace("/");
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Internal server error",
      });
    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 md:px-0">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Sign In - HubCredo</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="farhan@email.com"
                      aria-invalid={fieldState.invalid}
                      type="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="sign-in-form">
              Sign In
            </Button>
          </Field>
        </CardFooter>
      </Card>
      <div className="flex text-xs">
        <div className="">Don't have account</div>
        <Link href={"/sign-up"} className="underline px-1">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
