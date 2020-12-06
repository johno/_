import { compile } from "./compile";

describe("compiler", () => {
  test("basic usage", () => {
    const result = compile(`
      <h1 sx={{ backgroundColor: 'gray.1', color: 'tomato' }}>Hello, world!</h1>
    `);

    expect(result).toMatchInlineSnapshot(
      `"<h1 className=\\"bg-gray-1 tomato\\">Hello, world!</h1>;"`
    );
  });
  test("responsive arrays", () => {
    const result = compile(`
      <h1 sx={{ fontSize: [1, 2, 3] }}>Hello, world!</h1>
    `);

    expect(result).toMatchInlineSnapshot(
      `"<h1 className=\\"f1 f2-md f3-lg\\">Hello, world!</h1>;"`
    );
  });
});
