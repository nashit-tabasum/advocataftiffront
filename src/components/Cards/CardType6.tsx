import React from "react";
import Link from "next/link";

interface CardType6Props {
  title: string;
  excerpt: string;
  fileUrl: string;
  postDate?: string;
  uri?: string; // permalink for title
}

const stripParagraphTags = (html: string) => {
  return html.replace(/<\/?p>/g, "");
};

// Helper to format date as YYYY-MM-DD only
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  return dateStr.split("T")[0];
};

// Extract the filename (without query params) from a URL
const getFileNameFromUrl = (url: string) => {
  try {
    const cleanUrl = url.split("?")[0];
    const segments = cleanUrl.split("/");
    return segments[segments.length - 1] || "download";
  } catch {
    return "download";
  }
};

// Required fixed label per spec
const FIXED_DOWNLOAD_LABEL = "csv,json,xml,excel";

const CardType6: React.FC<CardType6Props> = ({
  title,
  excerpt,
  fileUrl,
  postDate,
  uri,
}) => {
  return (
    <div className="h-full">
      <div
        className={[
          "relative flex flex-col h-full overflow-hidden rounded-lg bg-white border border-slate-300",
          "transition-all duration-500 ease-in-out",
          "hover:-translate-y-1.5 hover:border-brand-2-100",
          "hover:shadow-[0_0_40px_0_rgba(79,8,46,0.40)]",
          "focus:border-brand-2-100 focus:shadow-inner-lg",
          "card card-type-6",
        ].join(" ")}
      >
        <div className="card-body flex flex-1 flex-col justify-between bg-white px-6 py-5">
          <div className="flex-1">
            <div>
              {/* Title with permalink only — mirrors CardType5 pattern */}
              <h2 className="mt-2 cursor-pointer text-2xl leading-snug font-semibold font-family-montserrat text-slate-800 transition-colors duration-500 ease-in-out">
                {uri ? (
                  <Link
                    href={uri}
                    prefetch={false}
                    className="cursor-pointer focus:outline-none"
                    aria-label={title}
                  >
                    {title}
                  </Link>
                ) : (
                  title
                )}
              </h2>

              <div className="mt-2 text-base/6 font-normal font-family-sourcecodepro text-slate-600 line-clamp-3 transition-colors duration-500 ease-in-out">
                {stripParagraphTags(excerpt)}
              </div>
            </div>
          </div>

          <div className="card-footer mt-6 flex items-center justify-between">
            <div className="date-info flex justify-between w-full items-center space-x-1 text-xs/tight font-medium font-family-sourcecodepro text-slate-600">
              {/* Right section */}
              <time className="text-xs/tight font-medium font-family-sourcecodepro text-slate-600">
                {formatDate(postDate)}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardType6;
