# RoomMate AI Chatrooms

RoomMate is a Next.js application that allows users to create topics and engage in AI-powered chatrooms using Claude, GPT-4, and other AI models.

## Features

- User Authentication (Email/Password and Social Login)
- Create and Manage Topics
- Create AI-Powered Chatrooms
- Multiple AI Model Support (Claude, GPT-4)
- Dark/Light Theme
- Responsive Design

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth.js
- Anthropic API (Claude)
- OpenAI API (GPT-4)

## Prerequisites

- Node.js 18+
- PostgreSQL
- Anthropic API Key
- OpenAI API Key (Optional)

## Environment Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/roommate.git
cd roommate
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file with the following:

```
DATABASE_URL="postgresql://username:password@localhost:5432/roommate?schema=public"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""

# AI API Keys
ANTHROPIC_API_KEY=""
OPENAI_API_KEY=""
```

4. Set up database

```bash
npx prisma migrate dev
```

#### Check prisma tables

```bash
npx prisma studio
```

5. Run the development server

```bash
npm run dev
```

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Froommate)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [your-email@example.com](mailto:your-email@example.com)

Project Link: [https://github.com/yourusername/roommate](https://github.com/yourusername/roommate)
