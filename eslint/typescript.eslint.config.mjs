import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ["**/eslint/*", "**/node_modules", "**/dist"],
    },
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 12,
            sourceType: "module",
        },

        settings: {
            "import/resolver": {
                typescript: {},
            },
        },

        rules: {
            "no-console": "warn",
            "no-unused-vars": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
];
