import { Award, Sparkles, TrendingDown } from "lucide-react";

import { Page } from "@/components/Page";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { Pricing } from "@/components/Pricing";
import { Section } from "@/components/Section";

import styles from "./page.module.scss";

const TITLE = "Simple, Transparent Pricing";
const SUBTITLE = "Choose the plan that fits your lifestyle. No hidden fees, ever.";

const features = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Top-tier detergents and care",
  },
  {
    icon: TrendingDown,
    title: "Best Prices",
    description: "Affordable rates guaranteed",
  },
  {
    icon: Award,
    title: "Satisfaction",
    description: "100% money-back guarantee",
  },
];

export default function PricingPage() {
  return (
    <Page>
      <Section className={styles.root} bg="yellow">
        <SectionTitle title={TITLE} subtitle={SUBTITLE} />

        <div className={styles.features}>
          {features.map(({ title, description, icon: Icon }) => (
            <div key={title} className={styles.feature}>
              <div className={styles.featureIcon}>
                <Icon />
              </div>
              <h3 className={styles.featureTitle}>{title}</h3>
              <p className={styles.featureText}>{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Pricing />
    </Page>
  );
}
