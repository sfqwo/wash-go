import { HowItWorks } from "@/components/HowItWorks";
import { OrderForm } from "@/components/OrderForm";
import { Pricing } from "@/components/Pricing";
import { PromoCarousel } from "@/components/PromoCarousel";
import { Services } from "@/components/Services";

export default function HomePage() {
  return (
    <>
      <PromoCarousel />
      <Services />
      <HowItWorks />
      <Pricing />
      <OrderForm />
    </>
  );
}
