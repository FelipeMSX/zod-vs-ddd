import prettierConfig from "./prettier.eslint.config.mjs";
import typescriptConfig from "./typescript.eslint.config.mjs";

export default [...typescriptConfig, ...prettierConfig];
