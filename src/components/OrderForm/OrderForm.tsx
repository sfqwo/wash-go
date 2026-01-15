"use client";
import clsx from "clsx";
import { Shirt, Wind, Sparkles, Package } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { EMAIL_PATTERN, PHONE_PATTERN } from "@/components/constants";
import { showMessage } from "@/components/Notifier/Notifier";

import { Section } from "../Section";
import { SectionTitle } from "../SectionTitle";
import Button from "../UI/Button/Button/Button";
import { Field, Select } from "../UI/Form";

import styles from "./OrderForm.module.scss";
import type { OrderFormData } from "./types";


const TITLE = "Schedule Your Pickup";
const SUBTITLE = "Fill out the form below and we'll pick up your laundry at your convenience. Free pickup and delivery!";

const services = [
  {
    id: "wash-fold",
    icon: Shirt,
    title: "Wash & Fold",
    description: "Standard laundry service",
  },
  {
    id: "dry-cleaning",
    icon: Wind,
    title: "Dry Cleaning",
    description: "For delicate items",
  },
  {
    id: "iron-press",
    icon: Sparkles,
    title: "Iron & Press",
    description: "Wrinkle-free clothes",
  },
  {
    id: "pickup-delivery",
    icon: Package,
    title: "Full Service",
    description: "Complete care package",
  },
];

const pickupOptions = [
  { value: "default", label: "Select time" },
  { value: "morning", label: "Morning (8AM - 12PM)" },
  { value: "afternoon", label: "Afternoon (12PM - 4PM)" },
  { value: "evening", label: "Evening (4PM - 8PM)" },
];

export const OrderForm = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({ mode: "onSubmit" });

  const onSubmit = () => {
    showMessage({
      variant: "success",
      message: "Pickup scheduled! Our team will reach out shortly.",
    });
    reset();
  };

  const handleSubmitError = () => {
    showMessage({
      variant: "error",
      message: "Please check the form details and try again.",
    });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    void handleSubmit(onSubmit, handleSubmitError)(event);
  };

  const buttonText = selectedService ? "Schedule Pickup" : "Please Select a Service";

  return (
    <Section id="order-form" bg="gray">
      <SectionTitle title={TITLE} subtitle={SUBTITLE} />

      <form onSubmit={handleFormSubmit} className={styles.root} noValidate>
        <div className={styles.service}>
          <h3 className={styles.label}>Select Your Service</h3>
          <div className={styles.serviceGrid}>
            {services.map(({ id, title, description, icon: Icon }) => {
              const clsxService = clsx(styles.serviceCard, { [styles.selected]: selectedService === id });
              const handleClick = () => setSelectedService(id);

              return (
                <button
                  type="button"
                  key={id}
                  className={clsxService}
                  onClick={handleClick}
                >
                  <Icon className={styles.serviceIcon} />
                  <h4 className={styles.serviceTitle}>{title}</h4>
                  <p className={styles.serviceDescription}>{description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <h3 className={styles.label}>Your Information</h3>

        <div className={styles.row}>
          <Field
            id="name"
            label={{
              text: "Name",
              isError: !!errors?.name?.message,
              error: errors?.name?.message,
            }}
            required
            type="text"
            {...register("name", { required: "Name" })}
          />

          <Field
            id="email"
            type="email"
            label={{
              text: "E-mail",
              isError: !!errors?.email?.message,
              error: errors?.email?.message,
            }}
            required
            {...register("email", {
              required: "E-mail",
              pattern: {
                value: EMAIL_PATTERN,
                message: "Invalid email address",
              },
            })}
          />
        </div>

        <div className={styles.row}>
          <Field
            id="phone"
            type="tel"
            label={{
              text: "Phone number",
              isError: !!errors?.phone?.message,
              error: errors?.phone?.message,
            }}
            required
            {...register("phone", {
              required: "Phone number",
              pattern: {
                value: PHONE_PATTERN,
                message: "Invalid phone number",
              },
            })}
          />

          <Field
            id="address"
            type="text"
            required
            label={{
              text: "Address",
              isError: !!errors?.address?.message,
              error: errors?.address?.message,
            }}
            {...register("address", { required: "Address" })}
          />
        </div>

        <h3 className={styles.label}>Pickup Schedule</h3>

        <div className={styles.row}>
          <Field
            id="pickupDate"
            label={{
              text: "Pickup date",
              isError: !!errors?.pickupDate?.message,
              error: errors?.pickupDate?.message,
            }}
            required
            type="date"
            {...register("pickupDate", { required: "Pickup date" })}
          />

          <Select
            id="pickupTime"
            label="Preferred Time"
            options={pickupOptions}
            required
            {...register("pickupTime", { required: "Preferred Time" })}
          />
        </div>

        <div className={styles.row}>
          <Field
            tag="textarea"
            label="Special instruction"
            id="instructions"
            placeholder="Any special care instructions or notes for our team..."
            {...register("instructions")}
          />
        </div>

        <Button variant="primary" type="submit" disabled={!selectedService}>
          {buttonText}
        </Button>
      </form>
    </Section>
  );
};
