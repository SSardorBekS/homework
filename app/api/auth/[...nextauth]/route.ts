import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import TelegramProvider from "next-auth/providers/credentials"; // Custom Telegram provider, ko'proq sozlash talab qilinadi.
import axios from "axios";

// Define NextAuth options
export const authOptions: AuthOptions = {
  providers: [
    // Login with Credentials (Username & Password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password", placeholder: "Password" },
        // Optional registration fields
        name: { label: "Name", type: "text", placeholder: "Name" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }
      
        try {
          // Check if the user is logging in or registering
          let response;
          if (credentials.name) {
            // Register the user
            response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/register/`,
              {
                username: credentials.username,
                name: credentials.name,
                password: credentials.password,
              },
              {
                headers: {
                  "Content-Type": "application/json", // Ensure the correct content type
                },
              }
            );
            const user = {
              id: credentials.username,
              token: response.data.access_token,
            };
            return user;
          } else {
            // Login the user
            response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/login`,
              {
                username: credentials.username,
                password: credentials.password,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const user = {
              id: credentials.username,
              token: response.data.access_token,
            };
            return user;
          }
        } catch (error) {
          throw new Error("Invalid username or password");
        }
      }      
    }),

    // Register & Login with Telegram WebApp
    CredentialsProvider({
      id: "telegram",
      name: "Telegram",
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        if (!credentials || !credentials.telegramData) {
          throw new Error("Telegram data missing");
        }

        try {
          const telegramData = JSON.parse(credentials.telegramData);

          // Check if user already exists, if not, register new user
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/users/token`,
            new URLSearchParams({
              username: telegramData.username, // Telegram username
              password: telegramData.username, // Password can be optional based on your system
            }),
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
          );

          const user = {
            id: telegramData.username,
            token: response.data.access_token,
          };

          return user;
        } catch (error) {
          throw new Error("Telegram authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your_secret_key",
  pages: {
    signIn: "/login",
    newUser: "/register", // Optional: Custom page for account creation
  },
  session: {
    strategy: "jwt",
  },
};

// Export NextAuth handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
