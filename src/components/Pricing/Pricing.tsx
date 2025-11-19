"use client";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";

import styles from "./Pricing.module.scss";
import clsx from "clsx";
import { SectionTitle } from "../SectionTitle";
import { Section } from "../Section";
import { Dialog } from "../UI/Dialog";
import { Field } from "../UI/Form";
import Button from "../UI/Button";

const TITLE = 'Simple, Transparent Pricing';
const SUBTITLE = 'Choose the plan that works best for you';

const plans = [
  {
    name: "Basic",
    price: "$15",
    period: "per load",
    description: "Perfect for individuals",
    features: [
      "Wash & Fold Service",
      "Standard Detergent",
      "48-hour Turnaround",
      "Pickup & Delivery",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: "$25",
    period: "per load",
    description: "Most popular choice",
    features: [
      "Wash & Fold Service",
      "Premium Detergent",
      "24-hour Turnaround",
      "Pickup & Delivery",
      "Fabric Softener Included",
      "Special Stain Treatment",
    ],
    popular: true,
  },
  {
    name: "Family",
    price: "$99",
    period: "per month",
    description: "Best value for families",
    features: [
      "Unlimited Wash & Fold",
      "Premium Detergent",
      "Same Day Service",
      "Priority Pickup & Delivery",
      "All Premium Features",
      "20% Off Dry Cleaning",
    ],
    popular: false,
  },
];

type TPricingFormData = {
  name: string;
  email: string;
}

const PricingItemModalContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TPricingFormData>();

  const onSubmit = (data: TPricingFormData) => {
    console.log("submitted:", data);
    reset();
  };

  return <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
    <Field
      id="name"
      label={{
        text: "Name",
        isError: !!errors?.name?.message,
        error: errors?.name?.message,
      }}
      type="text"
      {...register("name", { required: "Name is required" })}
    />

    <Field
      id="email"
      type="email"
      label={{
        text: "E-mail",
        isError: !!errors?.email?.message,
        error: errors?.email?.message,
      }}
      {...register("email", {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      })}
    />

    <Button type="submit">Send</Button>
  </form>
}

const PricingItemModal = ({ popular }: Pick<typeof plans[0], 'popular'>) => {
  const variant = popular ? 'primary' : 'secondary';
  return (
    <Dialog
      title="Get started with your laundry plan"
      description="Enter your name and email, and we’ll help you choose the best option."
      content={<PricingItemModalContent />}
    >
      <Button variant={variant}>Get Started</Button>
    </Dialog>
  );
};

const PricingItem = ({
  name, description, price, period, popular, features,
}: typeof plans[0]) => {
  const clsxRoot = clsx(styles.card, { [styles.popular]: popular });

  return (
    <div
      key={name}
      className={clsxRoot}
    >
      {popular ? (
        <div className={styles.badge}>Most Popular</div>
      ) : null}
      <div className={styles.cardHeader}>
        <h3 className={styles.cardName}>{name}</h3>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.priceWrapper}>
          <span className={styles.price}>{price}</span>
          <span className={styles.period}>{period}</span>
        </div>
      </div>
      <PricingItemModal popular={popular} />
      <ul className={styles.featureList}>
        {features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <Check />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionTitle title={TITLE} subtitle={SUBTITLE} />

      <div className={styles.root}>
        {plans.map((plan) => <PricingItem key={plan.name} {...plan} />)}
      </div>
    </Section>
  );
};