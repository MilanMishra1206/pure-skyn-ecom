export default {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true, // 👈 add this so "module" is allowed if needed
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:security/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "security"],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "import/no-extraneous-dependencies": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "react/jsx-uses-vars": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
