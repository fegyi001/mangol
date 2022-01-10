module.exports = {
    root: true,
    ignorePatterns: [
        "projects/**/*"
    ],
    env: {
        node: true,
        es6: true
    },
    overrides: [
        {
            files: [
                "*.ts"
            ],
            parserOptions: {
                ecmaVersion: 2020,
                project: [
                    "tsconfig.json"
                ],
                createDefaultProgram: true
            },
            plugins: [
                "simple-import-sort",
                "unused-imports"
            ],
            extends: [
                "plugin:@angular-eslint/recommended",
                "plugin:@angular-eslint/template/process-inline-templates",
                "plugin:@typescript-eslint/recommended",
                "prettier",
                "plugin:prettier/recommended"
            ],
            rules: {
                "@angular-eslint/directive-selector": [
                    "error",
                    {
                        type: "attribute",
                        prefix: "app",
                        style: "camelCase"
                    }
                ],
                "@angular-eslint/component-selector": [
                    "error",
                    {
                        type: "element",
                        prefix: "app",
                        style: "kebab-case"
                    }
                ],
                'simple-import-sort/imports': 'error',
                'simple-import-sort/exports': 'error',
                "no-unused-vars": "off",
                "@typescript-eslint/no-explicit-any": "off",
                "unused-imports/no-unused-imports": "error",
                "unused-imports/no-unused-vars": [
                    "warn",
                    { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
                ],
                "@typescript-eslint/no-unused-vars": [
                    "warn",
                    { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
                ]
            }
        },
        {
            files: [
                "*.html"
            ],
            extends: [
                "plugin:@angular-eslint/template/recommended"
            ],
            rules: {}
        }
    ]
}
