"use client";
import clsx from "clsx";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Section } from "@/components/Section";
import type { TPropsWithClassName } from "@/components/types";
import { Dropdown, DropdownItem } from "@/components/UI/Dropdown";

import logo from "../../../../public/android-chrome-192x192.png";
import { contacts, navigation } from "../constants";
import type { ILink } from "../types";

import styles from "./Header.module.scss";

const HeaderNavigationLink = ({ id, title, ...props }: ILink) => {
  const pathname = usePathname();
  const isSelected = pathname.includes(id);
  const clsxRoot = clsx(styles.navLink, { [styles.navLink_selected]: isSelected });
  return (
    <Link href={id} className={clsxRoot} {...props}>
      {title}
    </Link>
  );
};

const HeaderNavigationButton = () => (
  <Link href="/order#order-form" className={styles.bookButton}>Book Now</Link>
);

const HeaderMenu = ({ className }: TPropsWithClassName) => {
  const clsxRoot = clsx(styles.nav, className);

  return (
    <Dropdown content={(
      <nav className={clsxRoot}>
        {navigation.map((item) => (
          <DropdownItem key={item.id}>
            <HeaderNavigationLink {...item} />
          </DropdownItem>
        ))}
        <div className={styles.actions}>
          {contacts.map(({ href, label, icon: Icon }) => (
            <Link href={href} className={styles.phone} key={href}>
              <Icon />
              {label}
            </Link>
          ))}
          <DropdownItem asChild><HeaderNavigationButton /></DropdownItem>
        </div>
      </nav>
    )}>
      <button className={styles.menuButton}>
        <Menu />
      </button>
    </Dropdown>
  );
};

const HeaderNavigation = ({ className }: TPropsWithClassName) => {
  const clsxRoot = clsx(styles.nav, className);
  const { href, label, icon: Icon } = contacts[1];

  return (
    <nav className={clsxRoot}>
      {navigation.map((item) => (
        <HeaderNavigationLink key={item.id} {...item} />
      ))}
      <div className={styles.actions}>
        <Link href={href} className={styles.phone} key={href}>
          <Icon />
          {label}
        </Link>
        <HeaderNavigationButton />
      </div>
    </nav>
  );
};

export function Header() {
  return (
    <Section as="header" className={styles.root}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Image src={logo.src} alt="" width={40} height={40} />
          </div>
          <span className={styles.logoText}>WASH&GO Loundry</span>
        </Link>

        <HeaderNavigation className={styles.nav_desktop} />
        <HeaderMenu className={styles.nav_mobile} />
      </div>
    </Section>
  );
}