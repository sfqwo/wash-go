import { Mail, MapPin, Phone, Facebook, Instagram, Twitter } from "lucide-react";

import type { ILink } from "./types";

export const PHONE = "(555)123-4567";
export const EMAIL = "info@freshwash.com";
export const ADDRESS = "123 Main Street, New York, NY 10001";

const ADDRESS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export const contacts = [
  {
    href: ADDRESS_URL,
    label: ADDRESS,
    icon: MapPin,
  },
  {
    href: `tel:${PHONE}`,
    label: PHONE,
    icon: Phone,
  },
  {
    href: `mailto:${EMAIL}`,
    label: EMAIL,
    icon: Mail,
  }
];

export const navigation: ILink[] = [
  {
    id: "/services",
    title: "Services",
  },
  {
    id: "/pricing",
    title: "Pricing",
  },
  {
    id: "/order",
    title: "Order",
  },
  {
    id: "#contact",
    title: "Contact",
  },
];

export const socialMedia = [
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://x.com/",
    label: "Twitter",
    icon: Twitter,
  }
];
