module.exports = {
  extends: "../../.eslintrc.js",
  parserOptions: {
    ecmaVersion: 2020,
    project: [
      "tsconfig.lib.json"
    ],
    createDefaultProgram: true
  },
  rules: {
    "@angular-eslint/directive-selector": [
      "error",
      {
        type: "attribute",
        prefix: "mangol",
        style: "camelCase"
      }
    ],
    "@angular-eslint/component-selector": [
      "error",
      {
        type: "element",
        prefix: "mangol",
        style: "kebab-case"
      }
    ],
  }
}
