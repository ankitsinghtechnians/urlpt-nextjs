import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  session: {
    strategy: 'jwt', // If you're using JWT-based session management
  },
  
  callbacks: {
    async signIn({ user, account, profile }) {
      const token = account?.access_token;
      // // Extract user data
      const { name, email } = user;
      // Post user data to your API endpoint
      try {
       const response= await axios.post('https://urlpt.technians.in/google-auth/', {
          token: token,
          // email,
          // You can add more user fields as needed
          
        });
        console.log('response:',response.data)
        // localStorage.setItem('user',JSON.stringify(response.data.email));

        return response.data.success; // Continue the sign-in process
      } catch (error) {
        console.error("Error posting user data:", error);
        return false;  // Abort sign-in if the request fails
      }
      
    },  

    async redirect({ url, baseUrl }) {
              //  localStorage.setItem('user',JSON.stringify(user.email));

      // Ensure redirect goes to the correct URL after successful login
      return 'http://localhost:3000/homepage';
    },
  },
});

export { handler as GET, handler as POST };