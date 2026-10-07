import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CardPage = ({ news }) => {
  // ডাটা সেফটি চেক
  if (!news) return null;

  const date = new Date(news.firstPublished).toLocaleString("bn-BD", {
  timeZone: "Asia/Dhaka",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

  return (
   <Link href={`/detailspage/${news.id}`}>
    <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div>
        {/* ইমেজের সঠিক হাইট দিতে h-[200px] sm:h-[240px] ব্যবহার করা হয়েছে */}
        <div className="relative w-full h-50 sm:h-60 overflow-hidden">
          <Image
            src={news.imageUrl}
            alt={news.imageAlt || news.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-md mb-2">
            {news.category}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-2 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer">
            {news.title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {news.description}
          </p>
          <p className='text-gray-400 text-[12px]'>{date}</p>
        </div>
      </div>
    </div>
   </Link>
  );
};

export default CardPage;