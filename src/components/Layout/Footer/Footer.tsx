"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Section } from "@/components/Section";
import { Button } from "@/components/UI/Button";
import { Field } from "@/components/UI/Form";

import { navigation, socialMedia, contacts } from "../constants";

import styles from "./Footer.module.scss";

type NewsletterFormValues = {
  email: string;
};

const subscribeToNewsletter = async ({ email }: NewsletterFormValues) => {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 600);
  });

  return email;
};

export function Footer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<NewsletterFormValues>({
    defaultValues: { email: "" },
  });

  const handleNewsletterSubmit = async (values: NewsletterFormValues) => {
    await subscribeToNewsletter(values);
    reset({ email: "" }, { keepIsSubmitted: true });
    // Connect the actual API call here.
  };

  const emailLabel = errors.email
    ? {
        text: "Email",
        isError: true,
        error: errors.email.message,
      }
    : "Email";

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
          <form
            className={styles.columnForm}
            noValidate
            onSubmit={(event) => {
              void handleSubmit(handleNewsletterSubmit)(event);
            }}
          >
            <Field
              id="newsletter-email"
              type="email"
              label={emailLabel}
              placeholder="you@example.com"
              className={styles.formField}
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            <Button
              type="submit"
              variant="primary"
              disabled={isValid}
              className={styles.subscribeButton}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          {isSubmitSuccessful && (
            <p className={styles.successMessage} role="status">
              Thanks for subscribing! Check your inbox soon.
            </p>
          )}
        </div>
      </div>

      <div className={styles.copyright}>
        <p>&copy; 2025 FreshWash Laundry. All rights reserved.</p>
      </div>
    </Section>
  );
}
