import { Badge, Icon } from '@chakra-ui/react'
import * as React from 'react'
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
  FaApplePay
} from 'react-icons/fa';
import { SiAmericanexpress, SiGooglepay } from 'react-icons/si'
import { AiOutlineMail } from 'react-icons/ai';

export interface LinkGroupData {
  title: string
  links: Array<{
    label: string
    href: string
    badge?: React.ReactElement,
    icon?: React.ReactElement
  }>
}

export const links: LinkGroupData[] = [
  {
    title: 'Social Media',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/all4skinathens/', icon: <Icon as={FaInstagram} /> },
      {label: 'Facebook', href: 'https://www.facebook.com/allforskinclinic/', icon: <Icon as={FaFacebook} /> },
      { label: 'Twitter', href: 'https://twitter.com/allforskinss', icon: <Icon as={FaTwitter} /> },
      {label: 'Youtube', href: 'https://www.youtube.com/channel/UCFgM6HYw1af3ZZ0T2VXm6HA', icon: <Icon as={FaYoutube} /> },
    ],
  },
  {
    title: 'Επικοινωνια',
    links: [
      { label: 'Email: info@all4skin.gr', href: 'mailto:info@all4skin.gr' },
      { label: 'Λεωφόρος Αλεξάνδρας 192Α (1ος όροφος)', href: 'https://goo.gl/maps/GXLwL5E9WVLjMZsR8' },
      { label: 'Τηλέφωνο: 21 1410 2548', href: 'tel:2114102548' },
    ],
  },
  {
    title: 'Σχετικα',
    links: [
      { label: 'Κεντρικό Website', href: 'https://all4skin.gr' },
      { label: 'Χρήσιμα Άρθρα', href: 'https://all4skin.gr/category/blog' },
      { label: 'Ζωή Βεηκώντη', href: 'https://all4skin.gr/about' },
      { label: 'Ιατρείο', href: 'https://all4skin.gr/iatreio' },
      { label: 'Επικοινωνία', href: 'https://all4skin.gr/contact-us' },
    ],
  },
  {
    title: 'Εξυπηρετηση Πελατων',
    links: [
      { label: 'Τρόποι Πληρωμής', href: '/tropoi-plirwmis' },
      { label: 'Τρόποι Αποστολής', href: '/tropoi-apostolis' },
      { label: 'Επιστροφές Προϊόντων', href: '/epistrofes-proionton' },
      { label: 'Συχνές Ερωτήσεις', href: '/sixnes-erwtiseis' },
      { label: 'Βοήθεια Αγορών', href: '/help' },
      { label: 'Προστασία Προσωπικών Δεδομένων (GDPR)', href: '/prostasia-prosopikon-dedomenon-gdpr' },
      { label: 'Όροι Χρήσης', href: '/oroi-xrisis' },
      { label: 'Παρακολούθηση Παραγγελιών', href: '/order-tracking' },
    ],
  },
]

interface SocialLink {
  label: string
  icon: React.ReactElement
  href: string
}

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', icon: <FaFacebook />, href: '#' },
  { label: 'Instagram', icon: <FaInstagram />, href: '#' },
  { label: 'LinkedIn', icon: <FaLinkedin />, href: '#' },
  { label: 'Twitter', icon: <FaTwitter />, href: '#' },
  { label: 'Spotify', icon: <FaSpotify />, href: '#' },
  { label: 'Youtube', icon: <FaYoutube />, href: '#' },
  { label: 'Pinterest', icon: <FaPinterest />, href: '#' },
]

interface PaymentLink {
  label: string
  icon: React.ReactElement
  href: string
}

export const paymentsLinks: PaymentLink[] = [
  { label: "Visa", icon: <FaCcVisa size="35" />, href: "#" },
  { label: "MasterCard", icon: <FaCcMastercard size="35" />, href: "#" },
  { label: "AmericanExpress", icon: <SiAmericanexpress size="28" height="10" />, href: "#" },
  { label: "Stripe", icon: <FaCcStripe size="35" />, href: "#" },
  { label: "ApplePay", icon: <FaApplePay size="35" />, href: "#" },
  { label: "GooglePay", icon: <SiGooglepay size="35" />, href: "#" },
]

interface FooterLink {
  label: string
  href: string
}

export const footerLinks: FooterLink[] = [
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Offer terms', href: '#' },
  { label: 'Legal notice', href: '#' },
  { label: 'Sitemap', href: '#' },
]
