/**
 * SLOTS SPORTSWEAR — Payment Methods Data
 *
 * Official approved payment methods for the light-themed redesign (TASK 11).
 * Exactly 4 payment methods:
 * 1. Bank Transfer
 * 2. Remitly
 * 3. Venmo
 * 4. MoneyGram
 */

export interface PaymentLogoItem {
  id: string;
  name: string;
  label: string;
  logo: string;
  altText: string;
}

export const PAYMENT_METHODS: PaymentLogoItem[] = [
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    label: "BANK TRANSFER",
    logo: "/images/payments/bank-transfer-logo.png",
    altText: "Bank Transfer — Secure B2B International Bank Payment",
  },
  {
    id: "remitly",
    name: "Remitly",
    label: "REMITLY",
    logo: "/images/payments/remitly.png",
    altText: "Remitly — Global Digital Money Transfer",
  },
  {
    id: "venmo",
    name: "Venmo",
    label: "VENMO",
    logo: "/images/payments/venmo-logo.png",
    altText: "Venmo — Digital Wallet and Payment Service",
  },
  {
    id: "moneygram",
    name: "MoneyGram",
    label: "MONEYGRAM",
    logo: "/images/payments/moneygram-logo.png",
    altText: "MoneyGram — International Money Transfer",
  },
];

export const PAYMENT_FEATURE_CARDS = [
  {
    id: "secure-payment",
    iconName: "Shield",
    title: "Secure Payment",
    description: "All transactions processed through verified banking channels.",
  },
  {
    id: "international-transfer",
    iconName: "Globe",
    title: "International Transfer",
    description: "Accepting international B2B bank transfers from all major markets.",
  },
  {
    id: "no-bank-details-public",
    iconName: "Lock",
    title: "No Bank Details Public",
    description: "Full banking credentials provided only upon confirmed order.",
  },
  {
    id: "payment-terms-on-request",
    iconName: "Info",
    title: "Payment Terms On Request",
    description: "Deposit and balance terms are confirmed per individual order agreement.",
  },
] as const;

export const PAYMENT_ADVISORY = {
  label: "Payment Advisory",
  text: "Bank account credentials, SWIFT/IBAN details, advance payment percentages, and balance payment terms are not published publicly. These are shared securely with buyers upon order confirmation and are subject to the final agreed order terms.",
};
