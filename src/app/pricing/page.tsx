import { Award, Sparkles, TrendingDown } from "lucide-react";
import styles from "./page.module.scss";
import { Pricing } from "@/components/Pricing";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { Page } from "@/components/Page";
import { Section } from "@/components/Section";

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
        <PageTitle title={TITLE} subtitle={SUBTITLE} />

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
