export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Payment Transfer",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/monitor.svg",
  },
  "Food And Drink": {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
  Travel: {
    bg: "bg-success-25",
    circleBg: "bg-success-100",
    text: {
      main: "text-success-900",
      count: "text-success-700",
    },
    progress: {
      bg: "bg-success-100",
      indicator: "bg-success-700",
    },
    icon: "/icons/coins.svg",
  },
  "Transfer": {
    bg: "bg-purple-25",
    circleBg: "bg-purple-100",
    text: {
      main: "text-purple-900",
      count: "text-purple-700",
    },
    progress: {
      bg: "bg-purple-100",
      indicator: "bg-purple-700",
    },
    icon: "/icons/money-send.svg",
  },
  "transfer": {
    bg: "bg-violet-25",
    circleBg: "bg-violet-100",
    text: {
      main: "text-violet-900",
      count: "text-violet-700",
    },
    progress: {
      bg: "bg-violet-100",
      indicator: "bg-violet-700",
    },
    icon: "/icons/money-send.svg",
  },
  "Transfer Out": {
    bg: "bg-orange-25",
    circleBg: "bg-orange-100",
    text: {
      main: "text-orange-900",
      count: "text-orange-700",
    },
    progress: {
      bg: "bg-orange-100",
      indicator: "bg-orange-700",
    },
    icon: "/icons/money-send.svg",
  },
  "Payment": {
    bg: "bg-emerald-25",
    circleBg: "bg-emerald-100",
    text: {
      main: "text-emerald-900",
      count: "text-emerald-700",
    },
    progress: {
      bg: "bg-emerald-100",
      indicator: "bg-emerald-700",
    },
    icon: "/icons/dollar-circle.svg",
  },
  "Entertainment": {
    bg: "bg-amber-25",
    circleBg: "bg-amber-100",
    text: {
      main: "text-amber-900",
      count: "text-amber-700",
    },
    progress: {
      bg: "bg-amber-100",
      indicator: "bg-amber-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
  "Transportation": {
    bg: "bg-cyan-25",
    circleBg: "bg-cyan-100",
    text: {
      main: "text-cyan-900",
      count: "text-cyan-700",
    },
    progress: {
      bg: "bg-cyan-100",
      indicator: "bg-cyan-700",
    },
    icon: "/icons/transaction.svg",
  },
  default: {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const transactionCategoryStyles = {
  "Food and Drink": {
    borderColor: "border-rose-600",
    backgroundColor: "bg-rose-600",
    textColor: "text-rose-700",
    chipBackgroundColor: "bg-rose-50",
  },
  "Payment": {
    borderColor: "border-emerald-600",
    backgroundColor: "bg-emerald-600",
    textColor: "text-emerald-700",
    chipBackgroundColor: "bg-emerald-50",
  },
  "Bank Fees": {
    borderColor: "border-slate-600",
    backgroundColor: "bg-slate-600",
    textColor: "text-slate-700",
    chipBackgroundColor: "bg-slate-50",
  },
  "": {
    borderColor: "border-red-600",
    backgroundColor: "bg-red-600",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-red-50",
  },
  "Processing": {
    borderColor: "border-gray-400",
    backgroundColor: "bg-gray-400",
    textColor: "text-gray-700",
    chipBackgroundColor: "bg-gray-50",
  },
  "Success": {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  "Income": {
    borderColor: "border-green-600",
    backgroundColor: "bg-green-600",
    textColor: "text-green-700",
    chipBackgroundColor: "bg-green-50",
  },
  " In": {
    borderColor: "border-sky-600",
    backgroundColor: "bg-sky-600",
    textColor: "text-sky-700",
    chipBackgroundColor: "bg-sky-50",
  },
  "Transfer Out": {
    borderColor: "border-orange-600",
    backgroundColor: "bg-orange-600",
    textColor: "text-orange-700",
    chipBackgroundColor: "bg-orange-50",
  },
  "Loan Payments": {
    borderColor: "border-amber-600",
    backgroundColor: "bg-amber-600",
    textColor: "text-amber-700",
    chipBackgroundColor: "bg-amber-50",
  },
  "Entertainment": {
    borderColor: "border-purple-600",
    backgroundColor: "bg-purple-600",
    textColor: "text-purple-700",
    chipBackgroundColor: "bg-purple-50",
  },
  "General Merchandise": {
    borderColor: "border-yellow-600",
    backgroundColor: "bg-yellow-600",
    textColor: "text-yellow-700",
    chipBackgroundColor: "bg-yellow-50",
  },
  "Home Improvement": {
    borderColor: "border-cyan-600",
    backgroundColor: "bg-cyan-600",
    textColor: "text-cyan-700",
    chipBackgroundColor: "bg-cyan-50",
  },
  "Medical": {
    borderColor: "border-pink-600",
    backgroundColor: "bg-pink-600",
    textColor: "text-pink-700",
    chipBackgroundColor: "bg-pink-50",
  },
  "Personal Care": {
    borderColor: "border-fuchsia-600",
    backgroundColor: "bg-fuchsia-600",
    textColor: "text-fuchsia-700",
    chipBackgroundColor: "bg-fuchsia-50",
  },
  "General Services": {
    borderColor: "border-teal-600",
    backgroundColor: "bg-teal-600",
    textColor: "text-teal-700",
    chipBackgroundColor: "bg-teal-50",
  },
  "Transportation": {
    borderColor: "border-blue-600",
    backgroundColor: "bg-blue-600",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-blue-50",
  },
  "Travel": {
    borderColor: "border-indigo-600",
    backgroundColor: "bg-indigo-600",
    textColor: "text-indigo-700",
    chipBackgroundColor: "bg-indigo-50",
  },
  "Rent And Utilities": {
    borderColor: "border-stone-600",
    backgroundColor: "bg-stone-600",
    textColor: "text-stone-700",
    chipBackgroundColor: "bg-stone-50",
  },
  "Other": {
    borderColor: "border-violet-500",
    backgroundColor: "bg-violet-500",
    textColor: "text-violet-700",
    chipBackgroundColor: "bg-violet-50",
  },
  default: {
    borderColor: "border-zinc-500",
    backgroundColor: "bg-zinc-500",
    textColor: "text-zinc-700",
    chipBackgroundColor: "bg-zinc-50",
  },
};
