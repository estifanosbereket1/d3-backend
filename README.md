# NestJS Backend Documentation

A production-ready NestJS backend featuring **Better Auth**, **multi-tenancy with Organization Plugin + custom decorator**, and **Resend-powered email invitations**.

---

## 🚀 Features

### 🔐 Authentication (Better Auth)

* Fully integrated **Better Auth** for secure, modern authentication.
* Supports token-based authentication and session workflows.
* Includes role and permission scaffolding.

### 🏢 Multi‑Tenancy (Organization Plugin + Custom Decorator)

* Organizations are isolated using a custom-built **`@Organization()` decorator**.
* Automatically injects organization context into services.
* Ensures clean separation of data between tenants.

### ✉️ Email Invitations (Resend)

* Integrated **Resend** for transactional emails.
* Sends invitation emails when creating new users under an organization.
* Uses typed email templates.

---

## 📦 Tech Stack

* **NestJS** (Framework)
* **Prisma** (ORM)
* **PostgreSQL** (Database)
* **Better Auth** (Authentication)
* **Resend** (Email)
* **Organization Plugin** (Multi‑tenancy)

---

## 📁 Project Structure

```
src/
├─ app.module.ts
├─ main.ts
├─ auth/
│ └─ auth.ts # better-auth bootstrap/exports
├─ common/ # shared guards, decorators, pipes, utils
├─ config/
│ ├─ config.ts
│ └─ configuration.ts
├─ database/
│ ├─ database.module.ts
│ └─ database.service.ts
├─ lib/ # small libraries or providers
└─ outline/ # Outline feature module
├─ dto/
│ ├─ create-outline.dto.ts
│ ├─ update-outline.dto.ts
│ └─ response.dto.ts
├─ entities/
├─ outline.controller.ts
├─ outline.controller.spec.ts
├─ outline.module.ts
├─ outline.service.ts
└─ outline.service.spec.ts
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
RESEND_API_KEY="your-resend-key"
BETTER_AUTH_SECRET="your-secret"
FRONTEND_URL="https://app.example.com"
NODE_ENV=development
BETTER_AUTH_URL="https://app.example.com"
UI_URL="https://app.example.com"
```

---

## 🔐 Authentication Setup (Better Auth)

Better Auth initializes in `app.module.ts`:

```ts
@Module({
  imports: [
   AuthModule.forRoot(auth),
  ],
})
export class AppModule {}
```

---

## 🏢 Multi‑Tenancy Decorator Example

### `organization.decorator.ts`

```ts
export const OrganizationId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.organization;
  },
);
```

---

## ✉️ Sending Email Invitations (Resend)

### `invitation.service.ts`

```ts
await this.resend.emails.send({
  from: "noreply@yourapp.com",
  to: email,
  subject: "You're invited!",
  html: this.inviteTemplate({ orgName, inviteLink }),
});
```

---

## ▶️ Running the Project

### Install dependencies

```sh
pnpm install
```

### Run database migrations

```sh
npx prisma migrate deploy
```

### Start the server

```sh
pnpm start:dev
```

---

## 🧪 Testing

```sh
pnpm test
```

---

## 📄 License

MIT

---

## 📬 Support

If you have questions, feel free to reach out or open an issue.
