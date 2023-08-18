import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddDream from "./AddDream";

test("renders AddDream component", () => {
  render(<AddDream />);
  const titleInput = screen.getByLabelText("Title:");
  const moodSelect = screen.getByLabelText("Mood:");
  const submitButton = screen.getByText("Add Dream Entry");

  expect(titleInput).toBeInTheDocument();
  expect(moodSelect).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("submits dream form", () => {
  render(<AddDream />);
  const titleInput = screen.getByLabelText("Title:");
  const moodSelect = screen.getByLabelText("Mood:");
  const submitButton = screen.getByText("Add Dream Entry");

  fireEvent.change(titleInput, { target: { value: "Test Title" } });
  fireEvent.change(moodSelect, { target: { value: "Happy" } });
  fireEvent.click(submitButton);

});
