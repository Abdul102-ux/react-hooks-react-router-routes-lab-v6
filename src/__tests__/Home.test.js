import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes.js"; 


const router = createMemoryRouter(routes, {
  initialEntries: ['/'], 
});

test("renders 'Home Page' inside of an <h1 />", () => {
  render(<RouterProvider router={router} />);
  const h1 = screen.queryByText(/Home Page/);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("Displays a list of movie titles", async () => {
  render(<RouterProvider router={router} />);
  const titleList = await screen.findAllByRole('heading', { level: 2 });
  expect(titleList.length).toBeGreaterThan(2); 
  expect(titleList[0].tagName).toBe("H2");
  expect(titleList[0].textContent).toBe("Doctor Strange"); 
});

test("Displays links for each associated movie", async () => {
  render(<RouterProvider router={router} />);
  const linkList = await screen.findAllByText(/View Info/);
  expect(linkList.length).toBeGreaterThan(2); 
  expect(linkList[0].href).toContain("/movie/1"); 
});

test("renders the <NavBar /> component", () => {
  render(<RouterProvider router={router} />);
  expect(screen.getByText("Home")).toBeInTheDocument(); 
  expect(screen.getByText("Directors")).toBeInTheDocument();
  expect(screen.getByText("Actors")).toBeInTheDocument();
});
