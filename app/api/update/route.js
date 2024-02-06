import { NextResponse } from "next/server";

import { prisma } from "../../db";

async function handler(req, res) {
  try {
    let project = await req.json();
    const { id, newTitle, newManager } = project;
    if (newTitle && newManager) {
      await prisma.project.update({
        where: {
          id: id,
        },
        data: {
          title: newTitle,
          manager: newManager,
        },
      });
    } else if (newTitle) {
      await prisma.project.update({
        where: {
          id: id,
        },
        data: {
          title: newTitle,
        },
      });
    } else {
      await prisma.project.update({
        where: {
          id: id,
        },
        data: {
          manager: newManager,
        },
      });
    }
    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ status: 500 });
  }
}

export { handler as POST };
