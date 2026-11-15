import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string);
const db = client.db("hireloopdb");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "admin"],
        input: true, // accept the role from client sign-up input
        defaultValue: "seeker",
        required: false,
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
