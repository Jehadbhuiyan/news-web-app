import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MainNews = ({ news }) => {
  // console.log('check', news);

  if (!news || news.length === 0) return null;

  const firstNews = news[0];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ১ নম্বর div (বাম পাশ - প্রধান খবর) */}
        <div className="lg:w-7/12 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
          {/* শুধুমাত্র প্রথম সংবাদের অংশে Link থাকবে */}
          <Link href={`/detailspage/${firstNews.id}`} className="block h-full flex flex-col justify-between">
            <div>
              <div className="relative w-full h-55 sm:h-72 overflow-hidden">
                <Image
                  src={firstNews.imageUrl}
                  alt={firstNews.imageAlt || firstNews.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                {firstNews.category && (
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-md mb-2">
                    {firstNews.category}
                  </span>
                )}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-2 line-clamp-2 hover:text-red-600 transition-colors">
                  {firstNews.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                  {firstNews.description}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* ২ নম্বর div (ডান পাশ - ছোট খবরগুলোর লিস্ট) */}
        <div className="lg:w-5/12 bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            অন্যান্য প্রধান খবর
          </h3>

          <div className="flex flex-col divide-y divide-gray-100">
            {news.slice(1, 5).map((crdnews) => (
              <Link 
                key={crdnews.id} 
                href={`/detailspage/${crdnews.id}`} 
                className="py-3 first:pt-0 last:pb-0 group hover:bg-gray-50 px-2 rounded-lg transition-colors block"
              >
                {crdnews.category && (
                  <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                    {crdnews.category}
                  </span>
                )}
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 mt-1">
                  {crdnews.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MainNews;