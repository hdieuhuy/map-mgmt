"use server";

import User from "@/models/User";
import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function registerUser(formData: FormData) {
  await connectDB();

  const username = formData.get("username");
  const password = formData.get("password");

  // Kiểm tra username đã tồn tại
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return { success: false, error: "Username đã tồn tại" };
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);

  try {
    await User.create({
      username,
      password: hashedPassword,
    });
    return { success: true, message: "Đăng ký thành công" };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function loginUser(formData: FormData) {
  await connectDB();

  const username = formData.get("username");
  const password = formData.get("password");

  const user = await User.findOne({ username });
  if (!user) {
    return { success: false, error: "Người dùng không tồn tại" };
  }

  const isPasswordCorrect = await bcrypt.compare(
    password as string,
    user.password
  );

  if (!isPasswordCorrect) {
    return { success: false, error: "Mật khẩu không chính xác" };
  }

  // Tạo session token đơn giản
  (
    await // Tạo session token đơn giản
    cookies()
  ).set(
    "user",
    JSON.stringify({
      username: user.username,
      role: user.role,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 ngày
    }
  );

  return {
    success: true,
    user: {
      username: user.username,
      role: user.role,
    },
  };
}

export async function listUsers(page = 1, limit = 10) {
  await connectDB();

  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .select("-password");

  const total = await User.countDocuments();

  return {
    users,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function logoutUser() {
  (await cookies()).delete("user");
  return { success: true };
}
