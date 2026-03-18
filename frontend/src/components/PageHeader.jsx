function PageHeader({ title, subtitle, badge }) {
    return (
        <section className="relative bg-gradient-to-br from-purple-900 via-primary-900 to-indigo-950 text-white py-16 sm:py-20 md:py-24 overflow-hidden">
            {/* Decorative Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500 rounded-full blur-3xl opacity-15 -ml-10 -mb-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {badge && (
                    <span className="inline-block text-pink-300 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-2 sm:mb-3">
                        {badge}
                    </span>
                )}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-3 sm:mb-4">{title}</h1>
                {subtitle && (
                    <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                )}
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-pink-400 to-orange-400 mx-auto mt-5 sm:mt-6 rounded-full"></div>
            </div>
        </section>
    );
}

export default PageHeader;
