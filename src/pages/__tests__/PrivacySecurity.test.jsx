import React from "react";
import { render } from "@testing-library/react";
import PrivacySecurity from "./PrivacySecurity";

describe("PrivacySecurity Component", () => {
  it("renders privacy and security information", () => {
    const { getByText } = render(<PrivacySecurity />);

    // Check if important headings and content are present
    expect(getByText("Privacy and Security")).toBeInTheDocument();
    expect(getByText("Data Collection and Usage")).toBeInTheDocument();
    expect(getByText("Privacy Controls")).toBeInTheDocument();
    expect(getByText("Security Measures")).toBeInTheDocument();
    expect(getByText("Community Guidelines")).toBeInTheDocument();
    expect(getByText("Third-Party Integration")).toBeInTheDocument();
  });
});
