import { Calendar, Package, Sparkles, Home } from "lucide-react";

import { Section } from "../Section";
import { SectionTitle } from "../SectionTitle";

import styles from "./HowItWorks.module.scss";

const TITLE = "How It Works";
const SUBTITLE = "Four simple steps to fresh, clean laundry";

const steps = [
  {
    icon: Calendar,
    title: "Schedule Pickup",
    description: "Book online or via phone at your preferred time",
  },
  {
    icon: Package,
    title: "We Collect",
    description: "Our driver picks up your laundry from your doorstep",
  },
  {
    icon: Sparkles,
    title: "We Clean",
    description: "Professional cleaning with premium products",
  },
  {
    icon: Home,
    title: "We Deliver",
    description: "Fresh, clean laundry delivered back to you",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" bg="blue">
      <SectionTitle title={TITLE} subtitle={SUBTITLE} />

      <div className={styles.grid}>
        {steps.map(({ title, description, icon: Icon }) => (
          <div key={title} className={styles.step}>
            <div className={styles.stepIcon}>
              <Icon />
            </div>
            <h3 className={styles.stepTitle}>{title}</h3>
            <p className={styles.stepDescription}>{description}</p>
          </div>
            ))}
      </div>
    </Section>
  );
}