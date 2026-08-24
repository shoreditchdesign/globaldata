/** @type {import("stylelint").Config} */
export default {
  rules: {
    "declaration-property-value-disallowed-list": {
      "/^(background|background-color|color|border(-top|-right|-bottom|-left)?-color|outline-color|box-shadow|fill|stroke)$/":
        ["/^#/", "/^rgb/", "/^rgba/", "/^hsl/", "/^hsla/"],
      "/^(padding(-top|-right|-bottom|-left)?|margin(-top|-right|-bottom|-left)?|gap|row-gap|column-gap|border-radius|font-size|min-width|min-height|width|height|outline-offset|outline-width|border-width)$/":
        ["/^\\d/"],
    },
  },
  overrides: [
    {
      files: ["**/*Overview.module.css"],
      rules: {
        "declaration-property-value-disallowed-list": null,
      },
    },
  ],
};
