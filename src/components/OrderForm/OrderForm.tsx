"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Shirt, Wind, Sparkles, Package } from "lucide-react";
import clsx from "clsx";

import { Field, Select } from "../UI/Form";
import { Section } from "../Section";
import { SectionTitle } from "../SectionTitle";
import type { OrderFormData } from "./types";
import styles from "./OrderForm.module.scss";
import Button from "../UI/Button";

const TITLE = 'Schedule Your Pickup';
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
  { value: 'default', label: 'Select time' },
  { value: 'morning', label: 'Morning (8AM - 12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM - 4PM)' },
  { value: 'evening', label: 'Evening (4PM - 8PM)' },
];

export const OrderForm = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>();

  const onSubmit = (data: OrderFormData) => {
    const orderData = { ...data, service: selectedService };
    console.log("Order submitted:", orderData);
    reset();
  };

  const buttonText = selectedService ? "Schedule Pickup" : "Please Select a Service";

  return (
    <Section id="order-form" bg="gray">
      <SectionTitle title={TITLE} subtitle={SUBTITLE} />

      <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
        <div className={styles.service}>
          <h3 className={styles.sectionLabel}>Select Your Service</h3>
          <div className={styles.serviceGrid}>
            {services.map(({ id, title, description, icon: Icon }) => {
              const clsxService = clsx(styles.serviceCard, { [styles.selected]: selectedService === id });
              const handleClick = () => setSelectedService(id);

              return (
                <button
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

        <h3 className={styles.sectionLabel}>Your Information</h3>

        <div className={styles.row}>
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
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[\d\s\-\(\)]+$/,
                message: "Invalid phone number",
              },
            })}
          />

          <Field
            id="address"
            type="text"
            label={{
              text: "Address",
              isError: !!errors?.address?.message,
              error: errors?.address?.message,
            }}
            {...register("address", { required: "Address is required" })}
          />
        </div>

        <h3 className={styles.sectionLabel}>Pickup Schedule</h3>

        <div className={styles.row}>
          <Field
            id="pickupDate"
            label={{
              text: "Pickup date",
              isError: !!errors?.pickupDate?.message,
              error: errors?.pickupDate?.message,
            }}
            type="date"
            {...register("pickupDate", { required: "Pickup date is required" })}
          />

          <Select
            id="pickupTime"
            label="Preferred Time"
            options={pickupOptions}
            {...register("pickupTime", { required: "Pickup time is required" })}
          />
        </div>

        <div className={styles.row}>
          <Field
            tag="textarea"
            label="Special instruction (optional)"
            id="instructions"
            placeholder="Any special care instructions or notes for our team..."
            {...register("instructions")}
          />
        </div>

        <Button type="submit" disabled={!selectedService}>
          {buttonText}
        </Button>
      </form>
    </Section>
  );
}
