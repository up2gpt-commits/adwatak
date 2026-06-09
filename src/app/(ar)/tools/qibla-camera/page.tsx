import Client from "./Client";

export const metadata = {
  title: "اتجاه القبلة بالكاميرا | أدواتك",
  description:
    "وجّه كاميرا هاتفك لترى اتجاه القبلة مباشرةً — AR تفاعلي يُظهر الكعبة عند التوجّه الصحيح",
  openGraph: {
    title: "اتجاه القبلة بالكاميرا — AR مباشر",
    description:
      "استخدم كاميرا هاتفك لمعرفة اتجاه القبلة. بوصلة AR تفاعلية تُظهر الكعبة عند الاتجاه الصحيح.",
  },
};

export default function Page() {
  return (
    <>
      <Client locale="ar" />
    </>
  );
}
