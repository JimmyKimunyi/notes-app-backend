const reverse = require("../utils/for_testing").reverse;

test("reverse of a to be", () => {
  const result = reverse("a");
  expect(result).toBe("a");
});

test("reverse of react to be", () => {
  const result = reverse("react");
  expect(result).toBe("tcaer");
});
