import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",

    brandTitle: "GlobalData UI",

    colorPrimary: "#6D5DFB",
    colorSecondary: "#6D5DFB",

    appBg: "#F5F7FB",
    appContentBg: "#FFFFFF",
    appPreviewBg: "#F5F7FB",
    appBorderColor: "#DCE1E8",
    appBorderRadius: 8,

    textColor: "#111827",
    textMutedColor: "#6B7280",

    barTextColor: "#6B7280",
    barSelectedColor: "#6D5DFB",
    barHoverColor: "#111827",
    barBg: "#FFFFFF",

    inputBg: "#FFFFFF",
    inputBorder: "#DCE1E8",
    inputTextColor: "#111827",
    inputBorderRadius: 6,
  }),
});
