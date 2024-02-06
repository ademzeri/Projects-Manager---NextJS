import { useRouter } from "next/navigation";
// Your server-side component (API route)

import { NextResponse } from "next/server";

import { prisma } from "../../db";

async function handler(req, res) {
  try {
    let project = await req.json();
    const { title, manager } = project;
    await prisma.project.create({
      data: { title: title, manager: manager, complete: false },
    });
    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ status: 500 });
  }
}

export { handler as POST };
