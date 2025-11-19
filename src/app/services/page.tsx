import { Page } from "@/components/Page";
import { PageTitle } from "@/components/PageTitle/PageTitle";
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
        <PageTitle title={TITLE} subtitle={SUBTITLE} />
        <WashingMachine />
      </Section>
      <Services />
    </Page>
  );
}
