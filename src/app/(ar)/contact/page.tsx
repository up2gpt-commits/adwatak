import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "اتصل بنا — أدواتك",
  description:
    "تواصل مع فريق أدواتك — أرسل استفسارك، أبلغ عن مشكلة، أو اقترح أداة جديدة. نحن هنا لمساعدتك.",
  alternates: {
    canonical: "https://adwatak.cloud/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">اتصل بنا</h1>
        <p className="text-gray-400 text-sm mb-6">يسعدنا تواصلك معنا</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">وسائل التواصل</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                عندك سؤال، اقتراح، أو لقيت مشكلة في إحدى الأدوات؟ نحن هنا لمساعدتك.
                أرسل لنا رسالة وسنرد عليك في أقرب وقت.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">📧</span>
                  <div>
                    <p className="font-semibold text-gray-900">البريد الإلكتروني</p>
                    <a
                      href="mailto:contact@adwatak.cloud"
                      className="text-blue-600 hover:text-blue-700 no-underline"
                    >
                      contact@adwatak.cloud
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">🐦</span>
                  <div>
                    <p className="font-semibold text-gray-900">X (تويتر)</p>
                    <a
                      href="https://twitter.com/adawatak"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 no-underline"
                    >
                      @adawatak
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">💡</span>
                  <div>
                    <p className="font-semibold text-gray-900">اقترح أداة</p>
                    <p className="text-sm text-gray-500">
                      عندك فكرة لأداة جديدة؟ شاركنا بها!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mt-6">
                <p className="text-sm text-blue-800">
                  <strong>وقت الرد:</strong> عادةً نرد خلال 24-48 ساعة في أيام العمل.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">أرسل رسالة</h2>
            <form
              action="mailto:contact@adwatak.cloud"
              method="post"
              encType="text/plain"
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  الاسم
                </label>
                <input
                  type="text"
                  id="name"
                  name="الاسم"
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors"
                  placeholder="محمد أحمد"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="البريد"
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">
                  الموضوع
                </label>
                <select
                  id="subject"
                  name="الموضوع"
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="">اختر الموضوع...</option>
                  <option value="استفسار عام">استفسار عام</option>
                  <option value="بلغ عن مشكلة">بلغ عن مشكلة</option>
                  <option value="اقتراح أداة">اقتراح أداة</option>
                  <option value="إعلانات وشراكة">إعلانات / أدسنس</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  name="الرسالة"
                  required
                  rows={5}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 transition-colors resize-vertical"
                  placeholder="كيف يمكننا مساعدتك؟"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl border-none text-base cursor-pointer hover:bg-blue-700 transition-colors w-full"
              >
                إرسال ✉️
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 font-semibold no-underline"
        >
          ← العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
