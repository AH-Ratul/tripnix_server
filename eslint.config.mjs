import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-dynamic-delete": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "no-useless-escape": "warn",
    },
  }
);
