import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";

export default [
    eslintConfigPrettier,
    {
        plugins: {
            prettier: prettier,
        },

        languageOptions: {},

        rules: {
            "prettier/prettier": [
                "error",
                {
                    "singleQuote": false,
                    "semi": true,
                    "arrowParens": "always",
                    "trailingComma": "all",
                    "endOfLine": "auto",
                    "tabWidth": 4,
                    "no-unused-vars": "off",
                },
            ],

            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
];
