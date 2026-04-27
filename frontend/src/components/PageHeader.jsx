/**
 * PageHeader — Shared branded page hero for all interior pages.
 * Uses the brand deep maroon / purple gradient consistently.
 */
function PageHeader({ title, subtitle, badge, actions }) {
    return (
        <section
            className="relative bg-gradient-to-br from-[#341525] via-[#7d52a0] to-[#1a0a12]
                       text-white py-16 sm:py-20 md:py-24 overflow-hidden"
            aria-label={`${title} page header`}
        >
            {/* Ambient glow orbs */}
            <div
                className="absolute top-0 right-0 w-72 h-72 sm:w-[420px] sm:h-[420px]
                           bg-primary-500 rounded-full blur-[100px] opacity-20
                           -mr-24 -mt-24 pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 left-0 w-52 h-52 sm:w-80 sm:h-80
                           bg-orange-400 rounded-full blur-[100px] opacity-15
                           -ml-16 -mb-16 pointer-events-none"
                aria-hidden="true"
            />

            {/* Subtle dot-grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                }}
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {/* Badge / Eyebrow */}
                {badge && (
                    <span
                        className="inline-block text-primary-200 font-bold tracking-[0.15em]
                                   uppercase text-[11px] sm:text-xs mb-3 sm:mb-4
                                   bg-white/10 px-4 py-1.5 rounded-full border border-white/15
                                   backdrop-blur-sm"
                    >
                        {badge}
                    </span>
                )}

                {/* Title */}
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                               font-heading font-black mb-4 sm:mb-5
                               tracking-tight text-white"
                >
                    {title}
                </h1>

                {/* Subtitle */}
                {subtitle && (
                    <p
                        className="text-base sm:text-lg md:text-xl
                                   text-white/75 max-w-2xl mx-auto leading-relaxed"
                    >
                        {subtitle}
                    </p>
                )}

                {/* Brand accent rule */}
                <div
                    className="w-16 sm:w-24 h-1
                               bg-gradient-to-r from-primary-400 to-orange-400
                               mx-auto mt-5 sm:mt-6 rounded-full"
                    aria-hidden="true"
                />

                {/* Optional CTA actions */}
                {actions && (
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                        {actions}
                    </div>
                )}
            </div>
        </section>
    );
}

export default PageHeader;
