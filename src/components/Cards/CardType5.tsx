import React from "react";
import Link from "next/link";

interface CardType5Props {
  title: string;
  excerpt?: string;
  imageUrl?: string;
  postDate?: string;
  uri?: string; // permalink for title
  categories?: { id: string; name?: string | null; slug?: string | null }[];
}

const stripParagraphTags = (html?: string) =>
  html ? html.replace(/<\/?p>/g, "") : "";

// Function to format date as "24th August 2025"
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  return `${day}${suffix} ${month} ${year}`;
};

const toISOOrRaw = (date?: string) => {
  if (!date) return undefined;
  const d = new Date(date);
  return isNaN(d.getTime()) ? date : d.toISOString().split("T")[0];
};

const CardType5: React.FC<CardType5Props> = ({
  title,
  excerpt,
  imageUrl = "/assets/images/card-imgs/card-img-5.jpg",
  postDate,
  uri,
  categories = [],
}) => {
  const isoDate = toISOOrRaw(postDate);

  return (
    <article
      className="relative h-full overflow-hidden rounded-lg border border-gray-300
                 transition-all duration-500 ease-in-out
                 hover:-translate-y-1.5 hover:border-brand-2-100
                 hover:shadow-[0_0_40px_0_rgba(79,8,46,0.40)]
                 focus:border-brand-2-100 focus:shadow-inner-lg bg-white"
      aria-label={title}
    >
      <div>
        <img
          className="shrink-0 w-full h-64 object-cover aspect-[4/3]"
          src={imageUrl}
          alt={title || "card-type-5 img"}
          width={100}
          height={100}
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-8 pb-7">
        <div className="flex-1">
          {categories.length > 0 && (
            <span className="text-sm font-family-sourcecodepro text-slate-800 uppercase pb-1">
              {categories
                .map((cat) => cat?.name)
                .filter(Boolean)
                .join(", ")}
            </span>
          )}

          <h2 className="mt-3 text-xl md:text-2xl font-semibold font-family-montserrat text-slate-950 line-clamp-3">
            {uri ? (
              <Link
                href={uri}
                prefetch={false}
                className="focus:outline-none"
                aria-label={title}
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>

          {excerpt && (
            <p className="mt-3 text-base font-family-sourcecodepro text-slate-600 line-clamp-3">
              {stripParagraphTags(excerpt)}
            </p>
          )}
        </div>

        {postDate && (
          <div className="mt-9">
            <time
              className="text-xs font-family-baskervville text-slate-600"
              dateTime={isoDate}
            >
              {formatDate(postDate)}
            </time>
          </div>
        )}
      </div>
    </article>
  );
};

export default CardType5;
