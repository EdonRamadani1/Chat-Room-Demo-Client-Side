import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";
// sentence builder test
test("lab 11 builds a sentence", () => {
 render(<App />);
 let inputName = screen.getByPlaceholderText("Add Word");
 expect(inputName.value).toBe("");
 fireEvent.change(inputName, { target: { value: "Here" } });
 fireEvent.click(screen.getByTestId("addbutton"));
 expect(screen.getByText("Here")).toBeInTheDocument();
 fireEvent.change(inputName, { target: { value: "is" } });
 fireEvent.click(screen.getByTestId("addbutton"));
 expect(screen.getByText("Here is")).toBeInTheDocument();
 fireEvent.change(inputName, { target: { value: "a" } });
 fireEvent.click(screen.getByTestId("addbutton"));
 expect(screen.getByText("Here is a")).toBeInTheDocument();
 fireEvent.change(inputName, { target: { value: "sentence!" } });
 fireEvent.click(screen.getByTestId("addbutton"));
 expect(screen.getByText("Here is a sentence!")).toBeInTheDocument();
 // this just shows what the test sees, comment it out if there are no problems
 screen.debug();
});