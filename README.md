# Mystery Message

Welcome to Mystery Message, a full-stack anonymous messaging application built with the Next.js, TypeScript, and Tailwind CSS. This platform allows users to create a unique profile and receive anonymous messages from anyone who has their link.

## ✨ Features

- **User Authentication**: Secure sign-up and sign-in functionality using NextAuth.js.
- **Anonymous Messaging**: Registered users get a unique URL to share and receive messages from anyone.
- **Message Management**: Users can view, manage, and delete messages from their personal dashboard.
- **Email Verification**: New users receive a verification email to confirm their identity, powered by Resend.
- **AI-Powered Message Suggestions**: Integrated with the Google AI SDK to provide users with intelligent message suggestions.
- **Real-time Username Check**: Checks for username uniqueness in real-time during the sign-up process.
- **Modern UI**: A sleek and responsive user interface built with Shadcn/UI and Tailwind CSS.
- **Form Validation**: Robust form validation on both client and server-side using Zod and React Hook Form.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Email Service**: [Resend](https://resend.com/)
- **Schema Validation**: [Zod](https://zod.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **AI**: [Google AI SDK](https://ai.google.dev/)

## 📂 Project Structure

The project follows a structure typical for Next.js applications, organizing files by feature and type.

```
C:\Next Js\mystreymessage\
├───.gitignore
├───next.config.ts
├───package.json
├───README.md
├───tsconfig.json
├───emails\
│   └───VerificationEmail.tsx
└───src\
    ├───app\
    │   ├───(app)\
    │   │   └───dashboard\
    │   ├───(auth)\
    │   │   ├───sign-in\
    │   │   ├───sign-up\
    │   │   └───verify[username]\
    │   ├───api\
    │   │   ├───auth[...nextauth]\
    │   │   ├───accept-messages\
    │   │   ├───send-message\
    │   │   └───...
    │   └───u[username]       # Public user pages
    ├───components\
    │   ├───ui\
    │   ├───MessageCard.tsx
    │   └───Navbar.tsx
    ├───context\
    │   └───AuthProvider.tsx
    ├───helper\
    │   └───sendVerificationEmail.ts
    ├───lib\
    │   ├───dbConnect.ts
    │   └───utils.ts
    ├───model\
    │   └───User.ts
    ├───schemas\
    │   ├───signUpSchema.ts
    │   └───...
    └───types\
        ├───apiResponse.ts
        └───next-auth.d.ts
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) instance (local or cloud)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/mystreymessage.git
    cd mystreymessage
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the following variables.

    ```env
    # MongoDB connection string
    DATABASE_URL=your_mongodb_connection_string

    # NextAuth.js settings
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_super_secret_key_for_nextauth

    # Email service (Resend)
    RESEND_API_KEY=your_resend_api_key
    
    # Google AI API Key
    GOOGLE_API_KEY=your_google_ai_api_key
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

## 📜 API Reference

The application exposes several API endpoints for handling its core functionality:

- `POST /api/sign-up`: Registers a new user.
- `POST /api/sign-in`: Authenticates a user.
- `GET /api/auth/[...nextauth]`: Handles NextAuth.js authentication.
- `POST /api/accept-messages`: Toggles whether a user accepts messages.
- `POST /api/send-message`: Sends a message to a user.
- `GET /api/get-messages`: Retrieves all messages for the authenticated user.
- `DELETE /api/delete-message/[messageId]`: Deletes a specific message.
- `GET /api/check-username-unique`: Checks if a username is available.
- `POST /api/verify-code`: Verifies the user's sign-up code.
- `GET /api/suggest-message`: Suggests messages using AI.

---

This README provides a comprehensive overview of the Mystery Message application. Feel free to explore the code and contribute!