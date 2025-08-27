import React from "react";
import clsx from "clsx";

type WysiwygInnerProps = {
  children: React.ReactNode;
  className?: string;
};

export const WysiwygInner: React.FC<WysiwygInnerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        // h2
        "[&>h2]:text-slate-950 [&>h2]:font-family-montserrat [&>h2]:font-bold [&>h2]:text-2xl [&>h2]:lg:text-5xl [&>h2]:leading-snug [&>h2]:mb-6",
        // h3
        "[&>h3]:text-slate-950 [&>h3]:font-family-montserrat [&>h3]:font-bold [&>h3]:text-xl [&>h3]:lg:text-3xl [&>h3]:leading-snug [&>h3]:mt-6",
        // p
        "[&>p]:text-slate-600 [&>p]:font-family-baskervville [&>p]:font-normal [&>p]:text-lg/7 [&>p]:pb-6 [&>p]:pt-6",
        "[&>p>a]:text-secondary [&>p>a]:underline",
        "[&>p>span]:text-brand-black",
        // ol
        "[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:ml-6 [&>ol]:space-y-3 [&>ol]:text-slate-600 [&>ol]:text-lg/7 [&>ol]:font-normal [&>ol]:font-family-baskervville [&>ol]:py-2",
        "[&>ol>li>a]:text-secondary [&>ol>li>a]:italic [&>ol>li>a]:underline [&>ol>li>a]:underline-offset-4 [&>ol>li>a]:transition-colors",
        // ul
        "[&>ul]:ml-6 [&>ul]:space-y-3 [&>ul]:text-slate-600 [&>ul]:text-lg/7 [&>ul]:font-normal [&>ul]:font-family-baskervville [&>ul]:py-2",
        "[&>ul>li]:relative [&>ul>li]:pl-8",
        // blockquote
        "[&>blockquote]:text-lg/7 [&>blockquote]:font-family-baskervville [&>blockquote]:text-slate-600 [&>blockquote]:font-normal [&>blockquote]:border-brand-2-50 [&>blockquote]:border-l-4 [&>blockquote]:lg:pl-8 [&>blockquote]:py-3",
        "[&>blockquote>p]:pb-0 [&>blockquote>p]:pt-0",
        // span
        "[&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:text-slate-500 [&>span]:text-xs [&>span]:leading-4 [&>span]:font-normal [&>span]:font-family-baskervville [&>span]:mb-2",
        "[&>span>svg]:text-slate-500 [&>span>svg]:size-3",
        // size-large
        "[&>.size-large]:w-full [&>.size-large]:pt-4",
        // cover-large
        "[&>.cover-large]:w-full [&>.cover-large]:pt-4",
        "[&>.cover-large>img]:w-full [&>.cover-large>img]:h-full [&>.cover-large>img]:object-cover [&>.cover-large>img]:mb-0",
        className
      )}
    >
      {children}
    </div>
  );
};
