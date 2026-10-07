import CardPage from '@/app/component/Cardpage';
import React from 'react';

const CategoryPage = async ({ params }) => {
  const { cetagoryId } = await params;

  // ক্যাটাগরি অনুসারে ডাটা ফেচিং
  const res = await fetch(`https://news-api-v2.vercel.app/api/category/${cetagoryId}`, {
    next: { revalidate: 3600 }
  });
  const data = await res.json();
  const cetagorydata = data?.data || [];
  
  // ক্যাটাগরির শিরোনাম নির্ধারণ (API রেসপন্স অনুযায়ী)
  const categoryTitle = data?.title || data?.categoryName || 'সংবাদ তালিকা';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 min-h-[60vh]">
      
      {/* ক্যাটাগরি হেডার */}
      <div className="flex items-center gap-2 border-b-2 border-red-600 pb-2 mb-6">
        <span className="w-3 h-7 bg-red-600 rounded-sm inline-block"></span>
        <h1 className="font-extrabold text-2xl sm:text-3xl text-gray-900 capitalize">
          {categoryTitle}
        </h1>
      </div>

      {/* নিউজ লিস্ট / কার্ড গ্রিড */}
      {cetagorydata.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cetagorydata.map((ctagrydata) => (
            <CardPage key={ctagrydata.id} news={ctagrydata} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 my-4">
          <p className="text-gray-500 font-semibold text-lg">
            এই ক্যাটাগরিতে বর্তমানে কোনো সংবাদ পাওয়া যায়নি।
          </p>
        </div>
      )}

    </div>
  );
};

export default CategoryPage;