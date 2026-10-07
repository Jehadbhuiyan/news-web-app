import Link from "next/link";
import React from "react";

const NebLink = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  const categorys = data?.data || [];
  const filtercategory = categorys.filter((c) => c.scrapable);

  return (
    <nav className="w-full bg-white border-b border-gray-100 py-2">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* মোবাইলে ডানে-বামে স্ক্রোল হবে এবং ডেক্সটপে মাঝখানে (Center) থাকবে */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto whitespace-nowrap scrollbar-none justify-start md:justify-center text-center">
          
          {/* হোম লিংক */}
          <Link href="/">
            <span className="text-base sm:text-xl font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer">
              হোম
            </span>
          </Link>

          {/* ফিল্টার করা ক্যাটাগরি তালিকা */}
          {filtercategory.map((category) => (
            <Link key={category.slug} href={`/cetagory/${category.slug}`}>
              <span className="text-base sm:text-xl font-medium text-gray-800 hover:text-red-500 transition-colors cursor-pointer">
                {category.title}
              </span>
            </Link>
          ))}

        </div>
      </div>
    </nav>
  );
};

export default NebLink;