import Link from "next/link";
import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  // ডাটা ফেচিং (Revalidation ক্যাশ সাপোর্টসহ)
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  const showdata = data?.data || [];

  return (
    <div className="w-full pt-2 sm:pt-4">
      <div className="bg-red-700 text-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center px-2 sm:px-4">
          
          {/* বামপাশের "সর্বশেষ" লেবেল / ব্যাজ (মোবাইলে আরও ছোট ও রেসপনসিভ) */}
          <div className="bg-red-900 text-white shrink-0 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base font-bold z-10 shadow-md rounded-sm">
            সর্বশেষ
          </div>

          {/* স্ক্রোলিং নিউজ শিরোনাম (ডান দিকে স্ক্রোল হবে) */}
          <div className="flex-1 overflow-hidden py-1.5 sm:py-2 leading-none pl-2">
            {showdata.length > 0 ? (
              <MarqueeText direction="right" duration={15}>
                {showdata.map((item) => (
                  <Link
                    key={item.id}
                    href={`/detailspage/${item.id}`}
                    className="inline-flex items-center hover:opacity-90 transition-opacity"
                  >
                    <span className="text-xs sm:text-base font-medium hover:underline cursor-pointer whitespace-nowrap">
                      {item.title}
                    </span>
                    <span className="mx-3 sm:mx-6 text-red-300 font-bold">•</span>
                  </Link>
                ))}
              </MarqueeText>
            ) : (
              <span className="text-xs sm:text-sm px-2">সর্বশেষ খবর লোড হচ্ছে...</span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Marquee;