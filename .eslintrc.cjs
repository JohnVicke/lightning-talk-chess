/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended",
    "plugin:typescript-sort-keys/recommended",
  ],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "deprecation/deprecation": "off",
      },
    },
    {
      extends: ["plugin:markdown/recommended"],
      files: ["**/*.md", "**/*.md/*.{js,jsx,ts,tsx,astro}"],
      processor: "markdown/markdown",
    },
  ],
};
