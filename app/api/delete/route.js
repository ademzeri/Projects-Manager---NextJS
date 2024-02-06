import { NextResponse } from "next/server";
import { prisma } from "../../db";

async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      let id = await req.json();
      if (!id) {
        return NextResponse.json(
          { error: "Missing project ID" },
          { status: 400 }
        );
      }
      const deletedProject = await prisma.project.delete({
        where: { id },
      });

      if (!deletedProject) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error:", error.message);
      return NextResponse.json(
        { error: "Failed to delete project" },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect(); // Ensure Prisma client is closed
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}

export { handler as DELETE };
