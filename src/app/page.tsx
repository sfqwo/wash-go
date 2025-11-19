import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Services } from "@/components/Services";
import { PromoCarousel } from "@/components/PromoCarousel";
import { OrderForm } from "@/components/OrderForm";

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
