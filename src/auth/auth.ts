import { PrismaClient } from "@prisma/client"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { openAPI, organization } from "better-auth/plugins"
import { }
    from "better-auth/adapters"
import { Resend } from "nestjs-resend"

const prisma = new PrismaClient()

const resend = new Resend()


export const auth = betterAuth({
    advanced: {
        crossSubDomainCookies: {
            enabled: true,
            domain: "https://d3-client.vercel.app",
        },
    },
    url: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,

    database: prismaAdapter(
        prisma, {
        provider: "postgresql"
    }),
    plugins: [openAPI(), organization(
        {
            async sendInvitationEmail(data: {
                id: string;
                role: string;
                email: string;
                organization: { name: string, };
                invitation: { expiresAt?: Date };
                inviter: { user: { name: string; email: string } };
            }) {
                const orgName = data.organization.name
                const inviterName = data.inviter.user.name
                const role = data.role
                const date = data.invitation.expiresAt
                const inviteLink = process.env.NODE_ENV == "development" ? `http://localhost:3001/accept-invitation/${data.id}?orgName=${orgName}&inviterName=${inviterName}&role=${role}&date=${date}` : `https://d3-client.vercel.app/accept-invitation/${data.id}?orgName=${orgName}&inviterName=${inviterName}&role=${role}&date=${date}`;


                const html = `
                  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #111;">You're invited to join ${data.organization.name}</h2>
                    <p>Hello,</p>
                    <p><strong>${data.inviter.user.name}</strong> has invited you to join the <strong>${data.organization.name}</strong> organization as <strong>${data.role}</strong>.</p>
                    <p>Click the button below to accept the invitation:</p>
                    <p style="text-align: center;">
                      <a href="${inviteLink}" style="background-color: #4f46e5; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Accept Invitation</a>
                    </p>
                    ${data.invitation.expiresAt ? `<p style="font-size: 12px; color: #777;">This invitation expires on ${data.invitation.expiresAt.toDateString()}.</p>` : ''}
                    <p>If you did not expect this invitation, you can safely ignore this email.</p>
                    <p>Thanks,<br/>${data.inviter.user.name}</p>
                  </div>
                `;

                const resp = await resend.emails.send({
                    from: "noreply@notifications.pixel-perfecto.com",
                    to: data.email,
                    subject: `Invitation to join ${data.organization.name}`,
                    replyTo: data.inviter.user.email,
                    html,
                    cc: [],
                    bcc: [],
                    headers: {
                        "X-Entity-Ref-ID": data.id,
                        "X-Organization": data.organization.name,
                    },

                    tags: [
                        { name: "invitation", value: "team_invite" },
                        { name: "organization_id", value: data.organization.name.replace(/\s+/g, "_") }
                    ],
                });

                console.log(resp)
            }

        }
    )
    ],
    emailAndPassword: {
        enabled: true
    },
    trustedOrigins: ['http://localhost:3000', 'http://localhost:3001', "https://d3-client.vercel.app", "https://d3.beete-nibab.com"],
})
