import { theme, extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: props => ({
      "html, body": {
        fontSize: "95%",
        // color: props.colorMode === "light" ? "gray.800" : "gray.200",

        // rounded: "none"
        // lineHeight: "tall",
      },

      // "*:focus": {
      //   boxShadow: "none !important"
      // },

      // Eric: only used in ListItem
      ".boxText": {
        textColor: props.colorMode === "light" ? "gray.800" : "gray.200",
        fontSize: "lg",
      },
    }),
  },
  fonts: {
    ...theme.fonts,
    /** Example */
    // body: "Work Sans, sans-serif",
    // heading: "Markazi Text, serif",
  },
  colors: {
    ...theme.colors,
    secondary: "#292929",
    // primary: '#AF986C',
    // secondary: '#DCC87F',//'#CEC6B7'
    // default: "gray.800"//"gray.800"
    //dark: theme.colors.blackAlpha[400],
    /** Example */
    // teal: {
    //   ...theme.colors.teal,
    //   700: "#005661",
    //   500: "#00838e",
    //   300: "#4fb3be",
    // },
    primary: {
      100: "",
      200: "#FD5A89",
      300: "#FD5A89",
      400: "#FD5A89",
      500: "#FD5A89",
      700: "#ca486e",
      800: "#ca486e",
      900: "#ca486e",
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: "black",
        fontSize: "17",
      },
    },
  },
});

export default customTheme;
