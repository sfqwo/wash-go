import { WashingMachine } from "@/components/WashingMachine";
import styles from "./page.module.scss";
import { Services } from "@/components/Services";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { Page } from "@/components/Page";
import { Section } from "@/components/Section";

export const TITLE = 'Our Services';
export const SUBTITLE = 'Professional laundry care with state-of-the-art equipment and eco-friendly detergents';

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
