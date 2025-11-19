import { Shirt, Wind, Sparkles, Package, Clock, Shield } from "lucide-react";
import styles from "./Services.module.scss";
import { SectionTitle } from "../SectionTitle";
import { Section } from "../Section";

const TITLE = 'Our Services';
const SUBTITLE = 'Comprehensive laundry solutions tailored to your needs';

const services = [
  {
    icon: Shirt,
    title: "Wash & Fold",
    description: "Professional washing, drying, and folding service for your everyday clothes",
  },
  {
    icon: Wind,
    title: "Dry Cleaning",
    description: "Expert dry cleaning for delicate fabrics and special garments",
  },
  {
    icon: Sparkles,
    title: "Iron & Press",
    description: "Crisp, wrinkle-free clothes ready to wear",
  },
  {
    icon: Package,
    title: "Pickup & Delivery",
    description: "Free doorstep pickup and delivery at your convenience",
  },
  {
    icon: Clock,
    title: "Same Day Service",
    description: "Express service available for urgent laundry needs",
  },
  {
    icon: Shield,
    title: "Eco-Friendly",
    description: "Environmentally safe detergents and cleaning methods",
  },
];

export function Services() {
  return (
    <Section id="services" bg="gray">
      <SectionTitle title={TITLE} subtitle={SUBTITLE} />

      <div className={styles.root}>
        {services.map(({ title, description, icon: Icon }) => (
          <div key={title} className={styles.card}>
            <div className={styles.cardIcon}>
              <Icon />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}