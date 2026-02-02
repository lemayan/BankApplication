<div align="center">
  
# 🏦 Ivy Banking

### A modern, full-stack banking application built with Next.js

**Real-time transaction tracking • Multi-bank connectivity • Secure payment transfers**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_App-success?style=for-the-badge)](https://ivybanking-production.up.railway.app)

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

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

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Appwrite account and project
- Plaid developer account
- Dwolla developer account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/lemayan/BankApplication.git
cd ivybanking
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file:

```env
# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_USER_COLLECTION_ID=your_user_collection_id
APPWRITE_BANK_COLLECTION_ID=your_bank_collection_id
APPWRITE_TRANSACTION_COLLECTION_ID=your_transaction_collection_id
NEXT_APPWRITE_KEY=your_appwrite_key

# Plaid
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox

# Dwolla
DWOLLA_KEY=your_dwolla_key
DWOLLA_SECRET=your_dwolla_secret
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)**

---

## 📁 Project Structure

```
ivybanking/
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (root)/              # Main application
│   ├── api/                 # API routes
│   └── globals.css
├── components/              # React components
│   ├── ui/                  # Shadcn UI components
│   ├── AuthForm.tsx
│   ├── BankCard.tsx
│   ├── DoughnutChart.tsx
│   └── ...
├── lib/
│   ├── actions/             # Server actions
│   ├── appwrite.ts
│   ├── plaid.ts
│   └── utils.ts
├── constants/
├── types/
└── public/
```

---

## 📱 Key Pages

### Dashboard
- Combined balance across all accounts
- Recent transactions
- Bank account cards
- Spending categories

### My Banks
- All connected bank accounts
- Individual account balances
- Quick transaction access

### Payment Transfer
- Send money between accounts
- Secure Dwolla processing
- Instant balance updates

### Transaction History
- Paginated transaction list
- Bank account filters
- Category indicators

---

## 🔒 Security

- Server-side authentication
- Protected API routes
- Environment variable encryption
- Input validation with Zod
- XSS & CSRF protection

---

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Appwrite](https://appwrite.io/)
- [Plaid](https://plaid.com/)
- [Dwolla](https://www.dwolla.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

---

<div align="center">
  
**Built with ❤️ using Next.js and modern web technologies**

</div>
