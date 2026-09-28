import React from "react";

/**
 * Reusable SectionHeading component
 */
function SectionHeading({
    eyebrow,
    title,
    highlightTitle,
    description,
    centered = true,
    lightBg = true,
}) {
    return (
        <div className={`mx-auto max-w-4xl ${centered ? "text-center" : "text-left"}`}>
            {eyebrow && (
                <div className={`mb-4 flex items-center gap-3 ${centered ? "justify-center" : "justify-start"}`}>
                    <span className="h-[2px] w-8 bg-red-600 sm:w-12" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-600 sm:text-xs">
                        {eyebrow}
                    </span>
                    {centered && <span className="h-[2px] w-8 bg-red-600 sm:w-12" />}
                </div>
            )}

            {title && (
                <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[48px] leading-[1.15] ${lightBg ? "text-slate-900" : "text-white"}`}>
                    {title}{" "}
                    {highlightTitle && (
                        <span className="text-red-600 inline-block">{highlightTitle}</span>
                    )}
                </h2>
            )}

            {description && (
                <p className={`mt-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl ${centered ? "mx-auto" : ""} ${lightBg ? "text-slate-600" : "text-slate-300"}`}>
                    {description}
                </p>
            )}
        </div>
    );
}

export default SectionHeading;
