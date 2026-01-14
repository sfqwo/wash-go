import { Page } from "@/components/Page";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { Section } from "@/components/Section";
import { Services } from "@/components/Services";
import { WashingMachine } from "@/components/WashingMachine";

import styles from "./page.module.scss";

export const TITLE = "Our Services";
export const SUBTITLE = "Professional laundry care with state-of-the-art equipment and eco-friendly detergents";

export default function ServicesPage() {
  return (
    <Page>
      <Section className={styles.root}>
        <SectionTitle title={TITLE} subtitle={SUBTITLE} />
        <WashingMachine />
      </Section>
      <Services />
    </Page>
  );
}
