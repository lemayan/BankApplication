<div align="center">
  <h1>🏦 Ivy Banking</h1>
  <p>A modern, full-stack banking application built with Next.js, featuring real-time transaction tracking, multi-bank connectivity, and secure payment transfers.</p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  </p>
</div>

---

## ✨ Features

### 🔐 Authentication & Security
- Secure user authentication with Appwrite
- Protected routes and server-side rendering
- Session management with cookies

### 🏦 Multi-Bank Integration
- Connect multiple bank accounts via Plaid
- Real-time bank account synchronization
- View balances across all connected accounts
- Visual bank cards with account details

### 💸 Payment Transfers
- Secure money transfers between accounts using Dwolla
- Transfer validation and error handling
- Real-time transaction updates
- Transfer history tracking

### 📊 Financial Dashboard
- Total balance visualization with animated counters
- Interactive doughnut chart showing account distribution
- Recent transactions overview
- Top spending categories with progress indicators

### 📈 Transaction Management
- Complete transaction history with pagination
- Filter transactions by bank account
- Transaction categorization (Food & Drink, Transportation, Transfer, etc.)
- Status badges for different transaction types
- Search and sort capabilities

### 🎨 Modern UI/UX
- Responsive design for all devices
- Dark/light themed components
- Smooth animations and transitions
- Interactive charts and data visualizations
- Category-specific color coding

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15.3 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 3.4
- **Component Library:** Radix UI
- **Form Management:** React Hook Form + Zod validation
- **Charts:** Chart.js & React ChartJS 2
- **Animations:** React CountUp

### Backend & Services
- **Database:** Appwrite
- **Banking API:** Plaid
- **Payment Processing:** Dwolla
- **Error Tracking:** Sentry

### Developer Tools
- **Language:** TypeScript
- **Linting:** ESLint
- **Code Quality:** Class Variance Authority, clsx, tailwind-merge

---

## 📁 Project Structure

```
ivybanking/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/              # Main application pages
│   │   ├── page.tsx         # Dashboard
│   │   ├── my-banks/        # Bank accounts overview
│   │   ├── payment-transfer/ # Transfer money
│   │   └── transaction-history/ # Transaction list
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Shadcn UI components
│   ├── AuthForm.tsx         # Authentication form
│   ├── BankCard.tsx         # Bank account card
│   ├── DoughnutChart.tsx    # Chart component
│   ├── PaymentTransferForm.tsx # Transfer form
│   ├── RightSidebar.tsx     # Dashboard sidebar
│   ├── TransactionTable.tsx # Transaction list
│   └── ...
├── lib/
│   ├── actions/             # Server actions
│   │   ├── bank.actions.ts
│   │   ├── transaction.actions.ts
│   │   ├── user.actions.ts
│   │   └── dwolla.actions.ts
│   ├── appwrite.ts          # Appwrite configuration
│   ├── plaid.ts             # Plaid configuration
│   └── utils.ts             # Utility functions
├── constants/
│   └── index.ts             # App constants
├── types/
│   └── index.d.ts           # TypeScript definitions
└── public/
    └── icons/               # SVG icons
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- Appwrite account and project
- Plaid developer account
- Dwolla developer account

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_USER_COLLECTION_ID=your_user_collection_id
APPWRITE_BANK_COLLECTION_ID=your_bank_collection_id
APPWRITE_TRANSACTION_COLLECTION_ID=your_transaction_collection_id
APPWRITE_SECRET=your_appwrite_secret

# Plaid Configuration
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox # or development/production

# Dwolla Configuration
DWOLLA_KEY=your_dwolla_key
DWOLLA_SECRET=your_dwolla_secret
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com # or production URL

# App Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ivybanking.git
cd ivybanking
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
- Copy `.env.example` to `.env.local`
- Fill in all required credentials

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📱 Features Overview

### Dashboard
- **Total Balance Card:** Shows combined balance across all accounts
- **Recent Transactions:** Quick view of latest 5 transactions
- **Bank Accounts:** Visual cards for each connected bank
- **Spending Categories:** Top 4 categories with progress indicators

### My Banks
- View all connected bank accounts
- See individual account balances
- Quick access to transactions per bank

### Payment Transfer
- Select sender and receiver banks
- Enter amount and recipient details
- Secure transfer processing via Dwolla
- Instant balance updates

### Transaction History
- Complete transaction list with pagination (10 per page)
- Filter by bank account
- Transaction details including date, amount, category
- Status indicators (Processing, Success, etc.)

---

## 🎨 Design Features

- **Color-Coded Categories:** Each transaction category has a unique color scheme
- **Animated Counters:** Smooth number animations for balances
- **Responsive Layout:** Mobile-first design that works on all devices
- **Interactive Charts:** Visual representation of account distribution
- **Progress Indicators:** Category spending visualization

---

## 🔒 Security

- Server-side authentication with Appwrite
- Secure API routes with middleware protection
- Environment variable encryption
- HTTPS enforcement in production
- Input validation with Zod schemas
- XSS protection via React
- CSRF token validation

---

## 🚀 Deployment

### Deploy on Vercel

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
- Go to [Vercel](https://vercel.com)
- Import your GitHub repository
- Add environment variables
- Deploy

3. **Configure Domain**
- Add custom domain in Vercel settings
- Update `NEXT_PUBLIC_SITE_URL` environment variable

---

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Appwrite](https://appwrite.io/) - Backend as a Service
- [Plaid](https://plaid.com/) - Banking API
- [Dwolla](https://www.dwolla.com/) - Payment processing
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [shadcn/ui](https://ui.shadcn.com/) - Component library

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">
  <p>Built with ❤️ using Next.js and modern web technologies</p>
</div>
