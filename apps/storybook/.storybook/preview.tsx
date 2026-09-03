import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
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

    options: {
      // Atomic design order, not alphabetical: atoms are the primitives every
      // molecule and organism composes from, so the sidebar reads bottom-up the
      // same way the library is built. Anything not listed here sorts after.
      storySort: {
        order: ["Atoms", "Molecules", "Organisms"],
      },
    },
  },
};

export default preview;
