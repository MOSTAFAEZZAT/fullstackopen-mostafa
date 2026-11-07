import { render, screen, within, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

const todoDone    = { _id: "1", text: "hello from inside the container", done: true };
const todoNotDone = { _id: "2", text: "Learn about containers", done: false };

test("renders a done todo", () => {
  render(<Todo todo={todoDone} onDelete={() => {}} onComplete={() => {}} />);
  const row = screen.getByText(todoDone.text).closest("div");
  expect(within(row).getByText(/This todo is done/i)).toBeInTheDocument();
  expect(within(row).getByRole("button", { name: /delete/i })).toBeInTheDocument();
  expect(within(row).queryByRole("button", { name: /set as done/i })).toBeNull();
});

test("renders a not-done todo and calls handlers", () => {
  const onDelete = jest.fn();
  const onComplete = jest.fn();

  render(<Todo todo={todoNotDone} onDelete={onDelete} onComplete={onComplete} />);
  const row = screen.getByText(todoNotDone.text).closest("div");

  // has both buttons
  expect(within(row).getByText(/This todo is not done/i)).toBeInTheDocument();
  fireEvent.click(within(row).getByRole("button", { name: /set as done/i }));
  expect(onComplete).toHaveBeenCalledWith(todoNotDone);

  fireEvent.click(within(row).getByRole("button", { name: /delete/i }));
  expect(onDelete).toHaveBeenCalledWith(todoNotDone);
});
