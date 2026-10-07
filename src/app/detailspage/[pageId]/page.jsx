import Image from "next/image";
import React from "react";

const ArticlePage = async ({ params }) => {
  const { pageId } = await params;

  // =========================
  // FETCH ARTICLE
  // =========================
  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${pageId}`,
    {
      next: { revalidate: 3600 },
    }
  );

  const data = await res.json();
  const article = data?.data;

  // =========================
  // ARTICLE NOT FOUND
  // =========================
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">📰</div>

          <h2 className="text-2xl font-bold text-gray-700">
            সংবাদটি পাওয়া যায়নি!
          </h2>

          <p className="mt-2 text-gray-500">
            দুঃখিত, এই সংবাদটি বর্তমানে পাওয়া যাচ্ছে না।
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // DATE FORMAT
  // =========================
  const formatDate = (isoString) => {
    if (!isoString) return "";

    return new Date(isoString).toLocaleDateString("bn-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // =========================
  // FIND FIRST TEXT
  // =========================
  const firstText =
    article.body?.find((item) => item.type === "text")?.text || "";

  return (
    <div className="min-h-screen bg-[#f5f6f8] py-5 sm:py-8">

      <div className="mx-auto max-w-5xl px-3 sm:px-5">

        {/* ==================================================
            MAIN ARTICLE CARD
        ================================================== */}
        <article className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">

          {/* ==================================================
              IMAGE SECTION
          ================================================== */}
          {article.imageUrl && (
            <div className="relative h-[230px] w-full overflow-hidden sm:h-[400px] md:h-[480px]">

              <Image
                src={article.imageUrl}
                alt={article.title || "নিউজ ছবি"}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Category */}
              {article.topics && article.topics.length > 0 && (
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">

                  <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-lg sm:text-sm">
                    {article.topics[0].name}
                  </span>

                </div>
              )}

            </div>
          )}

          {/* ==================================================
              CONTENT
          ================================================== */}
          <div className="p-5 sm:p-8 md:p-10">

            {/* ==================================================
                TOPICS
            ================================================== */}
            {article.topics && article.topics.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">

                {article.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic.id}
                    className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-bold text-red-600"
                  >
                    {topic.name}
                  </span>
                ))}

              </div>
            )}

            {/* ==================================================
                TITLE
            ================================================== */}
            <h1 className="text-2xl font-black leading-snug text-gray-900 transition-colors duration-300 group-hover:text-gray-800 sm:text-4xl md:text-[42px]">
              {article.title}
            </h1>

            {/* ==================================================
                AUTHOR + DATE
            ================================================== */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">

              {/* Author */}
              {article.byline && article.byline.length > 0 && (
                <div className="flex items-center gap-2">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600">
                    ✍
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">
                      প্রতিবেদক
                    </p>

                    <p className="text-sm font-bold text-gray-700">
                      {article.byline[0].name}
                    </p>
                  </div>

                </div>
              )}

              {/* Date */}
              {article.firstPublished && (
                <div className="flex items-center gap-2">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                    📅
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">
                      প্রকাশিত
                    </p>

                    <p className="text-sm font-semibold text-gray-600">
                      {formatDate(article.firstPublished)}
                    </p>
                  </div>

                </div>
              )}

            </div>

            {/* ==================================================
                DIVIDER
            ================================================== */}
            <div className="my-6 h-px bg-gray-100" />

            {/* ==================================================
                ARTICLE BODY
            ================================================== */}
            <div className="space-y-6">

              {article.body && article.body.length > 0 ? (

                article.body.map((item, index) => {

                  // =========================
                  // TEXT
                  // =========================
                  if (item.type === "text") {
                    return (
                      <p
                        key={index}
                        className="text-base leading-8 tracking-wide text-gray-700 sm:text-lg sm:leading-9"
                      >
                        {item.text}
                      </p>
                    );
                  }

                  // =========================
                  // SUBHEADING
                  // =========================
                  if (item.type === "subheading") {
                    return (
                      <h2
                        key={index}
                        className="mt-10 border-l-4 border-red-600 pl-3 text-xl font-bold leading-relaxed text-gray-900 sm:text-2xl"
                      >
                        {item.text}
                      </h2>
                    );
                  }

                  // =========================
                  // IMAGE
                  //
                  // IMPORTANT:
                  // Body image render হবে না।
                  // শুধু article.imageUrl-এর image থাকবে।
                  // =========================
                  if (item.type === "image") {
                    return null;
                  }

                  return null;
                })

              ) : (

                <p className="whitespace-pre-line text-base leading-8 text-gray-700 sm:text-lg">
                  {article.text}
                </p>

              )}

            </div>

            {/* ==================================================
                RELATED TAGS
            ================================================== */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-10 border-t border-gray-100 pt-6">

                <h3 className="mb-3 text-sm font-bold text-gray-800">
                  সম্পর্কিত বিষয়
                </h3>

                <div className="flex flex-wrap gap-2">

                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="cursor-pointer rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-medium text-gray-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      #{tag}
                    </span>
                  ))}

                </div>

              </div>
            )}

            {/* ==================================================
                READ MORE / END
            ================================================== */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">

              <div>
                <p className="text-xs text-gray-400">
                  Bangla News 24
                </p>

                <p className="text-sm font-semibold text-gray-700">
                  সর্বশেষ সংবাদ জানতে আমাদের সাথে থাকুন
                </p>
              </div>

              <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 sm:flex">
                →
              </div>

            </div>

          </div>
        </article>

        {/* ==================================================
            SMALL FOOTER SPACE
        ================================================== */}
        <div className="py-6 text-center">

          <p className="text-xs text-gray-400">
            © Bangla News 24
          </p>

        </div>

      </div>
    </div>
  );
};

export default ArticlePage;