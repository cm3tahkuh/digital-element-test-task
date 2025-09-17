import delementConfig from "@delement/eslint-config-master";

export default [
  ...delementConfig,
  {
    settings: {
      react: {
        version: "999.999.999",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
];
