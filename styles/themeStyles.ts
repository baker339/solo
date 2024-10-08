const lightThemeColors = {
  primary: "#006d77", // Teal for outdoorsy feel
  background: "#ffffff",
  card: "#f1faee",
  text: "#1d3557", // Dark blue for legibility
  border: "#c4c4c4",
  notification: "#ffb703", // Bright color for notifications
};

const darkThemeColors = {
  primary: "#83c5be", // Lighter teal for dark mode contrast
  background: "#1d3557", // Dark blue background
  card: "#2b2d42",
  text: "#edf2f4", // Off-white for text contrast
  border: "#4a4e69",
  notification: "#ffb703",
};

const themeStyles = {
  light: {
    colors: lightThemeColors,
    container: {
      flex: 1,
      backgroundColor: lightThemeColors.background,
      padding: 16,
    },
    textInput: {
      padding: 10,
      borderWidth: 1,
      borderColor: lightThemeColors.border,
      borderRadius: 5,
      backgroundColor: lightThemeColors.background,
    },
    button: {
      backgroundColor: lightThemeColors.notification,
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonText: {
      color: "#ffffff",
      fontWeight: "bold",
    },
    text: {
      color: lightThemeColors.text,
      fontSize: 16,
      fontWeight: "400" as const, // Updated to a specific weight
    },
    title: {
      color: lightThemeColors.text,
      fontSize: 24,
      fontWeight: "bold" as const, // Updated to a specific weight
    },
    profilePicture: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      alignSelf: "center",
    },
  },
  dark: {
    colors: darkThemeColors,
    container: {
      flex: 1,
      backgroundColor: darkThemeColors.background,
      padding: 16,
    },
    textInput: {
      padding: 10,
      borderWidth: 1,
      borderColor: darkThemeColors.border,
      borderRadius: 5,
      backgroundColor: darkThemeColors.card,
    },
    button: {
      backgroundColor: darkThemeColors.notification,
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonText: {
      color: "#ffffff",
      fontWeight: "bold",
    },
    text: {
      color: darkThemeColors.text,
      fontSize: 16,
      fontWeight: "400" as const, // Updated to a specific weight
    },
    title: {
      color: darkThemeColors.text,
      fontSize: 24,
      fontWeight: "bold" as const, // Updated to a specific weight
    },
    profilePicture: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      alignSelf: "center",
    },
  },
};

export { themeStyles };
