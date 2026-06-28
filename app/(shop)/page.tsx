import Products from "@/app/components/Products";
import Hero from "../components/Hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense>
        <Products />
      </Suspense>
    </>

  );
}
