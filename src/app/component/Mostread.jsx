import Link from 'next/link';
import React from 'react';

const Mostread = async () => {
  // ক্যাশিং ম্যানেজ করার জন্য { next: { revalidate: 3600 } } যোগ করা ভালো
  const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read', {
    next: { revalidate: 3600 }
  });
  const data = await res.json();
  const readData = data?.data || [];

  console.log('check data',readData)

  return (
    
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      {/* সেকশন হেডার */}
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
        <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block"></span>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          সর্বাধিক পঠিত
        </h2>
      </div>

      {/* খবরগুলোর লিস্ট */}
      <div className="flex flex-col divide-y divide-gray-100">
        {readData.map((read, i) => (
         <Link  key={read.id || i} href={`/detailspage/${read.id}`}>
          <div
           
            className="flex items-start gap-3 py-3 group cursor-pointer hover:bg-gray-50/80 px-2 rounded-xl transition-colors duration-200"
          >
            {/* পজিশন/সিরিয়াল নম্বর */}
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 text-red-600 font-extrabold text-base flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
              {i + 1}
            </span>

            {/* খবরের টাইটেল */}
            <h3 className="text-base font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-200 leading-snug line-clamp-2 mt-0.5">
              {read.title}
            </h3>
          </div>
         </Link>
        ))}
      </div>
    </div>
  );
};

export default Mostread;