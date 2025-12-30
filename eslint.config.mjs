import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          // グループの順番
          groups: [
            "builtin", // fs, path など
            "external", // react, next, lucide-react
            "internal", // @/xxx
            ["parent", "sibling", "index"],
          ],

          // @/xxx を internal として扱う
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],

          // 各グループ内はアルファベット順
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },

          // グループ間に空行を入れる
          "newlines-between": "always",
        },
      ],
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  prettier,
]);

export default eslintConfig;
