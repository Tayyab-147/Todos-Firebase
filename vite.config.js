import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Define your environment variables here
    // These will be replaced during the build process
    // Accessible in your code as process.env.VARIABLE_NAME
    "process.env.REACT_APP_FIREBASE_API_KEY": JSON.stringify(
      "AIzaSyCU1pnIR0PSH3vrE3rToPXb_G_mdp5l3vM"
    ),
    // Define other environment variables as needed...
  },
});
