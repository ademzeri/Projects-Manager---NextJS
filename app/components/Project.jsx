"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
export default function Project({
  id,
  title,
  manager,
  createAt,
  updatedAt,
  complete,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  createAt = formatter.format(createAt);
  updatedAt = formatter.format(updatedAt);

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });

      if (response.ok) {
        // Handle successful response
        router.refresh();
      } else {
        // Handle error response
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  async function handleUpdate(e) {
    e.preventDefault();
    const newTitle = document.querySelector("#new-name").value;
    const newManager = document.querySelector("#new-manager").value;
    if (newTitle == "" && newManager == "") {
      alert("You must edit one field at least");
      return;
    }
    const data = {
      id,
      newTitle,
      newManager,
    };
    console.log("data", data);
    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful response
        router.refresh();
        handleClose();
      } else {
        // Handle error response
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  return (
    <tr key={id} className="text-center">
      <th scope="row">{id}</th>
      <td>{title}</td>
      <td>{manager}</td>
      <td>{createAt ? createAt.toString() : "Eroor Fetching time"}</td>
      <td>{updatedAt ? updatedAt.toString() : ""}</td>
      <td className="">
        <div className="flex flex-col items-center justify-center h-full gap-2 text-center md:gap-4 md:flex-row">
          <Button
            type="button"
            className="update btn btn-primary"
            onClick={handleShow}
          >
            Update
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="">
                You are editing the Project <b>{title + " "}</b>
                managed by <b>{manager}</b>
              </p>
              <form className="flex flex-col gap-4 mt-6" method="post">
                <div className="flex flex-col">
                  <div className="mb-6">
                    <label
                      htmlFor="new-name"
                      className="block mb-2 font-medium text-gray-900 text-md"
                    >
                      New Project name
                    </label>
                    <input
                      type="text"
                      id="new-name"
                      name="new-name"
                      placeholder="The value will remain the same if you kept it empty"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="new-manager"
                      className="block mb-2 font-medium text-gray-900 text-md"
                    >
                      New Project Manager
                    </label>
                    <input
                      type="text"
                      placeholder="The value will remain the same if you kept it empty"
                      id="new-manager"
                      name="new-manager"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-1/2 mx-auto btn btn-primary"
                  onClick={handleUpdate}
                >
                  Submit Edits
                </button>
              </form>
            </Modal.Body>
          </Modal>
          <button
            type="button"
            className="delete btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
