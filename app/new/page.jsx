"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function New() {
  const router = useRouter();

  async function handleCreate(e) {
    e.preventDefault();
    const title = document.querySelector("#project-name").value;
    const manager = document.querySelector("#project-manager").value;
    try {
      const data = {
        title,
        manager,
      };
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful response
        const result = await response.json();
        console.log(result);
        router.refresh();
        router.back("/");
      } else {
        // Handle error response
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div className="">
      <nav className="p-3 navbar navbar-dark bg-dark">
        <span className="mb-0 navbar-brand h1">Project Manager</span>
        <button type="button" className="btn btn-light">
          <Link href="/" className="no-underline">
            Return to Home
          </Link>
        </button>
      </nav>
      <div className="max-w-lg p-8 mx-auto mt-4">
        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={handleCreate}
          method="post"
        >
          <h1 className="mx-auto text-3xl font-bold text-white">
            Create a New project
          </h1>
          <div className="flex flex-col">
            <div className="mb-6">
              <label
                htmlFor="project-name"
                className="block mb-2 font-medium text-gray-900 text-md dark:text-white"
              >
                Project name
              </label>
              <input
                required
                type="text"
                id="project-name"
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="project-manager"
                className="block mb-2 font-medium text-gray-900 text-md dark:text-white"
              >
                Project Manager
              </label>
              <input
                required
                type="text"
                id="project-manager"
                name="manager"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          <button type="submit" className="w-1/2 mx-auto btn btn-primary">
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}
