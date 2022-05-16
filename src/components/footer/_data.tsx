import { Badge, Icon } from "@chakra-ui/react";
import * as React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaPhoneAlt,
  FaSpotify,
  FaYoutube,
  FaPinterest,
  FaCcVisa,
  FaCcMastercard,
  FaCcStripe,
  FaApplePay,
} from "react-icons/fa";
import { SiAmericanexpress, SiGooglepay } from "react-icons/si";
import { AiOutlineMail } from "react-icons/ai";

export interface LinkGroupData {
  title: string;
  links: Array<{
    label: string;
    href: string;
    badge?: React.ReactElement;
    icon?: React.ReactElement;
  }>;
}

export const links: LinkGroupData[] = [
  {
    title: "Social Media",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/soul_parfumerie/",
        icon: <Icon as={FaInstagram} />,
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=100053260665830",
        icon: <Icon as={FaFacebook} />,
      },
    ],
  },
  {
    title: "Επικοινωνια",
    links: [
      {
        label: "Email: soulparfumerie@yahoo.com",
        href: "mailto:soulparfumerie@yahoo.com",
      },
      {
        label: "Ιπποκράτους 113, Αθήνα 114 72",
        href: "https://goo.gl/maps/GXLwL5E9WVLjMZsR8",
      },
      { label: "Τηλέφωνο: 211 7154516", href: "tel:2117154516" },
    ],
  },
  {
    title: "ΠΛΗΡΟΦΟΡΙΕΣ",
    links: [
      { label: "Βοήθεια Αγορών", href: "https://all4skin.gr/help" },
      { label: "Επικοινωνία", href: "/contact-us" },
    ],
  },
  {
    title: "Εξυπηρετηση Πελατων",
    links: [
      { label: "Τρόποι Πληρωμής", href: "/tropoi-plirwmis" },
      { label: "Τρόποι Αποστολής", href: "/tropoi-apostolis" },
      { label: "Επιστροφές", href: "/epistrofes-proionton" },
      {
        label: "Προστασία Προσωπικών Δεδομένων (GDPR)",
        href: "/prostasia-prosopikon-dedomenon-gdpr",
      },
      { label: "Όροι Χρήσης", href: "/oroi-xrisis" },
    ],
  },
];

interface SocialLink {
  label: string;
  icon: React.ReactElement;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { label: "Facebook", icon: <FaFacebook />, href: "#" },
  { label: "Instagram", icon: <FaInstagram />, href: "#" },
  { label: "LinkedIn", icon: <FaLinkedin />, href: "#" },
  { label: "Twitter", icon: <FaTwitter />, href: "#" },
  { label: "Spotify", icon: <FaSpotify />, href: "#" },
  { label: "Youtube", icon: <FaYoutube />, href: "#" },
  { label: "Pinterest", icon: <FaPinterest />, href: "#" },
];

interface PaymentLink {
  label: string;
  icon: React.ReactElement;
  href: string;
}

export const paymentsLinks: PaymentLink[] = [
  { label: "Visa", icon: <FaCcVisa size="35" />, href: "#" },
  { label: "MasterCard", icon: <FaCcMastercard size="35" />, href: "#" },
  {
    label: "AmericanExpress",
    icon: <SiAmericanexpress size="28" height="10" />,
    href: "#",
  },
  { label: "Stripe", icon: <FaCcStripe size="35" />, href: "#" },
  { label: "ApplePay", icon: <FaApplePay size="35" />, href: "#" },
  { label: "GooglePay", icon: <SiGooglepay size="35" />, href: "#" },
];

interface FooterLink {
  label: string;
  href: string;
}

export const footerLinks: FooterLink[] = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Offer terms", href: "#" },
  { label: "Legal notice", href: "#" },
  { label: "Sitemap", href: "#" },
];
