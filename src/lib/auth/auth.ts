import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { Resend } from "resend";
import VerifyEmail from "@/emails/VerifyEmail";
import prisma from "../db/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await prisma.wallet.create({
            data: {
              userId: user.id,
            },
          });
        },
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const { data, error } = await resend.emails.send({
        from: "RentApp-Shop <onboarding@resend.dev>",
        to: user.email,
        subject: "Подтвердите email",
        react: VerifyEmail({
          username: user.name,
          verifyUrl: url,
        }),
      });

      if (error) {
        console.error("Resend error:", error);
      } else {
        console.log("Resend email sent:", data);
      }
    },

    autoSignInAfterVerification: false,
  },
  user: {
    additionalFields: {
      phoneNumber: { type: "string", input: true, required: true },
    },
  },
});
