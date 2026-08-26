import "@fontsource/poppins/latin-400.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@globaldata/design-tokens/tokens.css";

import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    layout: "centered",

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "error",
    },
  },
};

export default preview;
