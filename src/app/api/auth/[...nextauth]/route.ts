import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
  debug: true, // Enables detailed logs for troubleshooting
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  session: {
    strategy: "jwt", // Using JWT-based session management
  },

  callbacks: {
    async signIn({ user, account }) {
      const token = account?.access_token;
      console.log("Google Access Token:", token);

      try {
        const response = await axios.post(
          "https://urlpt.technians.in/google-auth/",
          { token }, // Sending token as part of the request body
          {
            timeout: 20000, // Setting a 10-second timeout
          }
        );

        console.log("API Response:", response.data);

        // Check if the API response indicates success
        if (response.data) {
          console.log("Sign-in successful.");
          return true; // Allow sign-in to proceed
        } else {
          console.error("Sign-in failed. API did not return success.");
          return false; // Abort sign-in
        }
      } catch (error:any) {
        console.error("Error posting user data:", error.message || error);
        return false; // Abort sign-in on error
      }
    },

    async redirect({ url, baseUrl }) {
      // Ensure redirect goes to the correct URL after successful login
      return "http://localhost:3000/homepage";
    },
  },
});

export { handler as GET, handler as POST };
