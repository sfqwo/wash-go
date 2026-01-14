"use client";

import { Clock, Shield, Sparkles, Truck } from "lucide-react";

import { OrderForm } from "@/components/OrderForm";
import { Page } from "@/components/Page";
import { Section } from "@/components/Section";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";

import styles from "./page.module.scss";


const TITLE = "Schedule Your Pickup";
const SUBTITLE = "Free pickup and delivery • Same-day service available • 100% satisfaction guaranteed";

const benefits = [
  {
    icon: Truck,
    title: "Free Pickup & Delivery",
    description: "We come to you, always free",
  },
  {
    icon: Clock,
    title: "24-Hour Turnaround",
    description: "Fast service when you need it",
  },
  {
    icon: Shield,
    title: "Insured & Safe",
    description: "Your clothes are protected",
  },
  {
    icon: Sparkles,
    title: "Premium Care",
    description: "Eco-friendly detergents",
  },
];

export default function OrderPage() {
  return (
    <Page>
      <Section className={styles.root} bg="green">
        <SectionTitle title={TITLE} subtitle={SUBTITLE} />
        
        <div className={styles.benefits}>
          {benefits.map(({ title, description, icon: Icon }) => (
            <div className={styles.benefit} key={title}>
              <div className={styles.benefitIcon}>
                <Icon />
              </div>
              <div className={styles.benefitContent}>
                <h4 className={styles.benefitTitle}>{title}</h4>
                <p className={styles.benefitText}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      
      <OrderForm />
    </Page>
  );
}
