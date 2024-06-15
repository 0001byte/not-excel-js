import globals from "globals";
import pluginJs from "@eslint/js";
// import googleConfig from "eslint-config-google";
import jsdoc from 'eslint-plugin-jsdoc';


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  // googleConfig,
  {
    plugins: {
      jsdoc,
    },
    "rules": {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "semi": "warn",
    }
  }
];
