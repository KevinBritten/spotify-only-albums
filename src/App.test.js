import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getTracksResponse } from "./test/testData";

import App from "./App";
import { getTracks } from "./components/ApiHelpers";

jest.mock("./components/ApiHelpers.js");

test("it starts displaying the setup screen", () => {
  render(<App />);
  const header = screen.queryByText(
    "Get only the full album releases from your Release Radar."
  );
  expect(header).toBeVisible();
});

test("it displays the results screen on playlist load", async () => {
  render(<App />);
  getTracks.mockResolvedValue(getTracksResponse);
  const continueButton = screen.getByText("Continue");
  userEvent.click(continueButton);
  await waitFor(() => {
    screen.getByText("Anything In Return (Instrumentals)");
  });
});

test("it displays a message when no results are found", async () => {
  render(<App />);
  getTracks.mockResolvedValue([]);
  const continueButton = screen.getByText("Continue");
  userEvent.click(continueButton);
  await waitFor(() => {
    screen.getByText("Sorry, no albums were found.");
  });
});

test("it displays a message while loading", async () => {
  render(<App />);
  getTracks.mockImplementation(() => {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, 500);
    });
  });
  const continueButton = screen.getByText("Continue");
  userEvent.click(continueButton);
  await waitFor(() => {
    screen.getByText("Loading...");
  });
});
