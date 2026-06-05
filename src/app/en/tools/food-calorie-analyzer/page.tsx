import { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Food Calorie Analyzer — Identify Calories by Photo",
  description:
    "Free AI-powered food calorie analyzer. Take a photo of any meal and get instant calorie, protein, carbs, and fat details.",
  alternates: {
    canonical: "https://adwatak.cloud/en/tools/food-calorie-analyzer",
  },
  openGraph: {
    title: "Food Calorie Analyzer — Adwatak",
    description:
      "Snap a photo of your food and get instant calorie & nutrition analysis for free.",
  },
};

export default function Page() {
  return <Client />;
}
