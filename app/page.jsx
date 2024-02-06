import Link from "next/link";
import Project from "./components/project";
import { prisma } from "./db";
import Image from "next/image";
import avatar from "../public/Empty-bro.svg";

async function Home() {
  const projects = await prisma.project.findMany();
  console.log("projects : ", projects);
  return (
    <div className="">
      <nav className="p-3 navbar navbar-dark bg-dark">
        <span className="mb-0 navbar-brand h1">
          <Link className="text-white no-underline" href="/">
            Project Manager
          </Link>
        </span>
        <button type="button" className="btn btn-light">
          <Link href="/new" className="no-underline">
            New Project
          </Link>
        </button>
      </nav>
      <div>
        {projects.length !== 0 ? (
          <table className="table max-w-5xl mx-auto mt-16 shadow-2xl w-fit">
            <thead>
              <tr className="text-center">
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Manager</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <Project key={project.id} {...project} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center mx-auto mt-10">
            <Image src={avatar} width={400} height={400} alt="x" />
            <h3 className="text-white">There is no projects yet...</h3>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
