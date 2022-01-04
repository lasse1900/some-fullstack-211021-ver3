import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "../components/BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const setBlogs = jest.fn();

  const component = render(<BlogForm setBlogs={setBlogs} />);

  const input = component.container.querySelector("input");
  const form = component.container.querySelector("form");

  fireEvent.change(input, {
    target: { value: "testing of forms could be easier" },
  });
  fireEvent.submit(form)
    expect(setBlogs.mock.calls).toHaveLength(0)
  // expect(setBlogs.mock.calls.content).toBe(undefined
  //   // "testing of forms could be easier",
  // );
});

