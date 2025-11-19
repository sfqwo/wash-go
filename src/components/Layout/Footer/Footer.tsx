import Link from "next/link";

import { Section } from "@/components/Section";
import { navigation, socialMedia, contacts } from "../constants";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <Section as="footer" id="contact" bg="black">
      <div className={styles.root}>
        <div className={styles.column}>
          <h3 className={styles.columnHeading}>
            <div className={styles.columnHeadingIcon}>
              🧺
            </div>
            FreshWash Laundry
          </h3>
          <p className={styles.columnDescription}>
            Professional laundry and dry cleaning services delivered to your door.
          </p>
          <div className={styles.row}>
            {socialMedia.map(({ href, label, icon: Icon }) => (
              <Link href={href} className={styles.columnLink} aria-label={label} key={href}>
                <Icon />
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnHeading}>Quick Links</h3>
          <ul className={styles.col}>
            {navigation.map(({ id, title }) => (
              <li key={id}>
                <Link href={id} className={styles.link}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnHeading}>Contact Us</h3>
          <ul className={styles.col}>
            {contacts.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={styles.link}>
                  <Icon />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnHeading}>Newsletter</h3>
          <p className={styles.columnDescription}>
            Subscribe for exclusive offers and updates
          </p>
          <form className={styles.columnForm}>
            <input
              type="email"
              placeholder="Your email"
              className={styles.input}
            />
            <button type="submit" className={styles.subscribeButton}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>&copy; 2025 FreshWash Laundry. All rights reserved.</p>
      </div>
    </Section>
  );
}