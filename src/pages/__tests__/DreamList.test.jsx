import React from "react";
import { render, screen } from "@testing-library/react";
import DreamList from "./DreamList";

describe("DreamList Component", () => {
  it("renders the component without errors", () => {
    render(<DreamList />);

    // Check if the component's title is rendered
    const titleElement = screen.getByText("Dreams");
    expect(titleElement).toBeInTheDocument();

    // Check if the "Add Dream" button is rendered
    const addDreamButton = screen.getByText("+");
    expect(addDreamButton).toBeInTheDocument();

  });
});
