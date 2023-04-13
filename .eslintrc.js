/** @type import("eslint").Linter.Config */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  ignorePatterns: ["out/", "*.js"],
  overrides: [
    {
      files: ["commands/index.ts"],
      rules: {
        "max-len": "off",
      },
    },
    {
      files: ["test/suite/commands/*.ts"],
      rules: {
        "no-useless-escape": "off",
      },
    },
    {
      files: ["test/suite/commands/*-tabs.test.ts"],
      rules: {
        "no-tabs": "off",
      },
    },
  ],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
  },
};
