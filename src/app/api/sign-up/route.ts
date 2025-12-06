import client from "@/lib/prisma";
import axios from "axios";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name)
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    if (!email)
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    if (!password)
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );

    const userExist = await client.user.findUnique({
      where: { email: email },
    });

    if (userExist)
      return NextResponse.json(
        { success: false, message: "User with email already exist" },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await client.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return NextResponse.json(
        { success: false, message: "Some error occured while creating user" },
        { status: 500 }
      );
    }

    let n8nEmailStatus = "success";
    try {
      const n8nResponse = await axios.post(process.env.N8N_POST_URL!, newUser);
      if (!n8nResponse) {
        n8nEmailStatus = "error";
      }
    } catch (error) {
      console.log(error);
      n8nEmailStatus = "error";
    }

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        n8nEmailStatus: n8nEmailStatus,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user");
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
