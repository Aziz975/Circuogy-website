

import React, { useEffect, useRef, useState } from "react";
import { initialArticles } from "../Constant";

import { Search, ArrowUpRight, X, Clock3 } from "lucide-react";



/* =========================================================

   REVEAL HOOK

\========================================================= */



function useReveal(options = {}) {

  const { threshold = 0.15, rootMargin = "0px 0px -50px 0px" } = options;

  const ref = useRef(null);

  const [visible, setVisible] = useState(false);



  useEffect(() => {

    const element = ref.current;

    if (!element) return;



    const observer = new IntersectionObserver(

      ([entry]) => setVisible(entry.isIntersecting),

      { threshold, rootMargin }

    );



    observer.observe(element);

    return () => observer.disconnect();

  }, [threshold, rootMargin]);



  return [ref, visible];

}



/* =========================================================

   LETTER REVEAL

\========================================================= */



const LetterReveal = ({ text, className = "", delay = 0 }) => {

  const [ref, visible] = useReveal({

    threshold: 0.2,

    rootMargin: "0px 0px -40px 0px",

  });



  return (

    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>

      {text.split("").map((char, index) => (

        <span

          key={`${char}-${index}`}

          aria-hidden="true"

          className="inline-block transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]"

          style={{

            opacity: visible ? 1 : 0,

            transform: visible

              ? "translate3d(0,0,0) rotateX(0deg)"

              : "translate3d(0,35px,0) rotateX(-70deg)",

            filter: visible ? "blur(0px)" : "blur(6px)",

            transitionDelay: `${delay + index * 28}ms`,

            transformOrigin: "bottom center",

          }}

        >

          {char === " " ? "\u00A0" : char}

        </span>

      ))}

    </span>

  );

};



/* =========================================================

   FADE REVEAL

\========================================================= */



const Reveal = ({

  children,

  className = "",

  delay = 0,

  duration = 700,

}) => {

  const [ref, visible] = useReveal();



  return (

    <div

      ref={ref}

      className={`transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}

      style={{

        opacity: visible ? 1 : 0,

        transform: visible

          ? "translate3d(0,0,0) scale(1)"

          : "translate3d(0,35px,0) scale(0.985)",

        filter: visible ? "blur(0px)" : "blur(7px)",

        transitionDuration: `${duration}ms`,

        transitionDelay: `${delay}ms`,

      }}

    >

      {children}

    </div>

  );

};



/* =========================================================

   ARTICLE CARD

\========================================================= */



const ArticleCard = ({ article, index, onSelect, onRead }) => {
  return (
    <article

      className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[12px] border border-[#d2ddea] bg-white p-3.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-[#36c9c3] hover:shadow-[0_20px_55px_rgba(0,170,167,0.15),0_0_35px_rgba(0,190,184,0.12)]"

      style={{ transitionDelay: `${Math.min(index, 5) * 35}ms` }}

    >

      {/* Card glow */}

      <div className="pointer-events-none absolute -inset-px rounded-[12px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">

        <div className="absolute inset-0 rounded-[12px] bg-[radial-gradient(circle_at_50%\_0%,rgba(0,190,184,0.18),transparent_60%)]" />

      </div>



      {/* Clickable image and title */}

      <button

        type="button"

        onClick={() => onSelect(article)}

        aria-label={`Feature ${article.title}`}

        className="relative z-10 block w-full shrink-0 cursor-pointer overflow-hidden rounded-[8px] border border-[#08b7b6] bg-[#eef6f5] text-left"

      >

        <div className="h-[145px] overflow-hidden sm:h-[150px] lg:h-[82px] xl:h-[140px]">

          <img

            src={article.image}

            alt={article.title}

            className="h-[full] w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:brightness-[1.05]"

          />

        </div>



        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#004f4d]/20 via-transparent to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      </button>



      {/* Metadata */}

      <div className="relative z-10 mt-3 flex flex-wrap items-center gap-1">
        {/* Category */}
        <span className="rounded-full bg-[#e5f6f5] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.02em] text-[#078f8d] transition-all duration-300 group-hover:bg-[#d3f3f1] group-hover:shadow-[0_0_16px_rgba(0,175,169,0.16)]">
          {article.category}
        </span>

        <span className="h-4 w-px bg-[#cbd5e1]" />

        {/* Author */}
        <span className="text-[11px] font-semibold text-[#7c879d]">
          By {article.author}
        </span>

        <span className="h-4 w-px bg-[#cbd5e1]" />

        {/* Publication Date */}
        <span className="whitespace-nowrap text-[11px] font-semibold text-[#7c879d]">
          {article.date}
        </span>
      </div>



      {/* Title */}

      <button

        type="button"

        onClick={() => onSelect(article)}

        className="relative z-10 mt-3 cursor-pointer text-left"

      >

        <h3 className="text-[21px] font-bold leading-[0.98] tracking-[-0.045em] text-[#050607] transition-colors duration-300 group-hover:text-[#087f7d] sm:text-[20px] lg:text-[18px] xl:text-[21px]">

          {article.title}

        </h3>

      </button>



      {/* Read article */}

      <button

        type="button"

        onClick={() => onRead(article)}

        className="group/read relative z-10 mt-auto flex items-center gap-2 pt-4 text-left text-[17px] font-medium tracking-[-0.02em] text-[#00aaa7]"

      >

        <span className="relative">

          Read article

          <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#00aaa7] transition-all duration-300 group-hover/read:w-full" />

        </span>



        <ArrowUpRight

          size={20}

          strokeWidth={1.8}

          className="transition-transform duration-300 group-hover/read:-translate-y-1 group-hover/read:translate-x-1"

        />

      </button>

    </article>

  );

};



/* =========================================================

   FEATURED ARTICLE

\========================================================= */



const FeaturedArticle = ({ article, onRead }) => {

  return (

    <article className="group relative h-full overflow-hidden rounded-[12px] border border-[#d2ddea] bg-white p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-[#32c9c4] hover:shadow-[0_25px_70px_rgba(0,170,167,0.15),0_0_45px_rgba(0,190,184,0.1)] sm:p-8">

      {/* Card glow */}

      <div className="pointer-events-none absolute -inset-px rounded-[12px] bg-[radial-gradient(circle_at_45%\_0%,rgba(0,190,184,0.14),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />



      {/* Featured image */}

      <div className="relative z-10 h-[200px] w-full overflow-hidden rounded-[9px] border border-[#08b7b6] bg-[#eef6f5] transition-all duration-500 group-hover:border-[#00aaa7] sm:h-[280px] md:h-[320px] lg:h-[230px] xl:h-[320px]">

        <img

          src={article.image}

          alt={article.title}

          className="h-full w-full  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] group-hover:brightness-[1.04]"

        />



        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001f1e]/35 via-transparent to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />



        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-3">

          <span className="px-3 text-center text-[13px] font-bold uppercase tracking-[-0.02em] text-white opacity-90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-100 sm:text-[15px]">

            {article.imageCaption || article.title}

          </span>

        </div>

      </div>



      {/* Metadata */}

     
<div className="relative z-10 mt-4 flex flex-wrap items-center gap-3">
  {/* Category */}
  <span className="rounded-full bg-[#e5f6f5] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.04em] text-[#078f8d] transition-all duration-300 group-hover:bg-[#d5f3f1] group-hover:shadow-[0_0_18px_rgba(0,175,169,0.18)]">
    {article.category}
  </span>

  <span className="h-5 w-px bg-[#cbd5e1]" />

  {/* Author */}
  <span className="text-[13px] font-semibold text-[#7c879d]">
    By {article.author}
  </span>

  <span className="h-5 w-px bg-[#cbd5e1]" />

  {/* Publication Date */}
  <span className="text-[13px] font-semibold text-[#7c879d]">
    {article.date}
  </span>
</div>




      {/* Title */}

      <h2 className="relative z-10 mt-4 text-[37px] font-bold leading-[0.96] tracking-[-0.055em] text-[#050607] sm:text-[42px] md:text-[46px] lg:text-[34px] xl:text-[42px]">

        {article.title}

      </h2>



      {/* Description */}

      <p className="relative z-10 mt-3 max-w-[620px] text-[16px] font-semibold leading-[1.5] tracking-[-0.025em] text-[#6c7d79] sm:text-[17px]">

        {article.description}

      </p>



      {/* Read article */}

      <button

        type="button"

        onClick={() => onRead(article)}

        className="group/read relative z-10 mt-5 flex items-center gap-2 text-[18px] font-medium tracking-[-0.02em] text-[#00aaa7]"

      >

        <span className="relative">

          Read article

          <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#00aaa7] transition-all duration-300 group-hover/read:w-full" />

        </span>



        <ArrowUpRight

          size={22}

          strokeWidth={1.8}

          className="transition-transform duration-300 group-hover/read:-translate-y-1 group-hover/read:translate-x-1"

        />

      </button>

    </article>

  );

};



/* =========================================================

   ARTICLE DETAIL MODAL

\========================================================= */



const ArticleModal = ({ article, onClose }) => {

  useEffect(() => {

    if (!article) return;



    const handleKeyDown = (event) => {

      if (event.key === "Escape") onClose();

    };



    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";



    return () => {

      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = "";

    };

  }, [article, onClose]);



  if (!article) return null;



  return (

    <div

      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#061b1b]/65 p-4 backdrop-blur-sm sm:p-6"

      onMouseDown={(event) => {

        if (event.target === event.currentTarget) onClose();

      }}

    >

      <section

        role="dialog"

        aria-modal="true"

        aria-labelledby="article-modal-title"

        className="relative my-auto max-h-[90vh] w-full max-w-[850px] overflow-y-auto rounded-[16px] border border-[#d2ddea] bg-white p-4 shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:p-7"

      >

        <button

          type="button"

          onClick={onClose}

          aria-label="Close article"

          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#d2ddea] bg-white text-[#193c38] transition-all hover:border-[#00aaa7] hover:bg-[#e5f6f5]"

        >

          <X size={20} />

        </button>



        <div className="overflow-hidden rounded-[10px] border border-[#08b7b6]">

          <img

            src={article.image}

            alt={article.title}

            className="max-h-[340px] w-full object-cover"

          />

        </div>



        <div className="mt-5 flex flex-wrap items-center gap-3 pr-12">

          <span className="rounded-full bg-[#e5f6f5] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.04em] text-[#078f8d]">

            {article.category}

          </span>



          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase  text-[#7c879d]">

            

           By {article.author}

          </span>

          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase  text-[#7c879d]">

            

           {article.date}

          </span>

        </div>



        <h2

          id="article-modal-title"

          className="mt-5 text-[34px] font-bold leading-[1.03] tracking-[-0.05em] text-[#050607] sm:text-[48px]"

        >

          {article.title}

        </h2>



        <p className="mt-5 whitespace-pre-line font-semibold  text-[16px] leading-[1.8] text-[black] sm:text-[17px]">

          {article.description}

        </p>



        {article.content && (

          <div className="mt-5 whitespace-pre-line text-[15px] leading-[1.9] text-[#52645f] sm:text-[16px]">

            {article.content}

          </div>

        )}



        <div className="mt-7 border-t border-[#d5dfea] pt-5">

          <button

            type="button"

            onClick={onClose}

            className="inline-flex items-center gap-2 rounded-full bg-[#079b96] px-6 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#087f7d] hover:shadow-[0_8px_24px_rgba(7,155,150,0.2)]"

          >

            Back to journal

            <ArrowUpRight size={17} />

          </button>

        </div>

      </section>

    </div>

  );

};



/* =========================================================

   MAIN JOURNAL COMPONENT

\========================================================= */



const CircularJournal = () => {

  const categories = [

    "All",

    "Startup Mentoring",

    "Founder Growth",

    "Strategy & Scale",

    "Digital India",

  ];





  const [articles, setArticles] = useState(initialArticles);

  const [featuredId, setFeaturedId] = useState(initialArticles[0]?.id ?? null);

  const [activeCategory, setActiveCategory] = useState("All");

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedArticle, setSelectedArticle] = useState(null);



  const featuredArticle =

    articles.find((article) => article.id === featuredId) || articles[0] || null;



  const matchesFilters = (article) => {

    if (!article) return false;

    const query = searchQuery.trim().toLowerCase();



    const matchesCategory =

      activeCategory === "All" ||

      article.category.toLowerCase() === activeCategory.toLowerCase();



    const matchesSearch =

      !query ||

      article.title.toLowerCase().includes(query) ||

      article.category.toLowerCase().includes(query) ||

      (article.description || "").toLowerCase().includes(query);



    return matchesCategory && matchesSearch;

  };



  const filteredArticles = articles.filter(

    (article) => article.id !== featuredId && matchesFilters(article)

  );



  const featuredMatchesFilters = matchesFilters(featuredArticle);



  /* Move the clicked card into the featured position.
  
     The previous featured article moves into its exact position. */

  const handleSelectArticle = (article) => {
    if (!article || article.id === featuredId) return;
    // The selected card becomes featured; the previous featured article returns to the card list.
    setFeaturedId(article.id);
  };

  const handleReadArticle = (article) => {

    setSelectedArticle(article);

  };



  const handleCategoryChange = (category) => {

    setActiveCategory(category);

  };



  return (

    <main className="min-h-screen w-full overflow-hidden bg-[#fcfdfd] px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 xl:px-[52px]">

      <div className="mx-auto w-full max-w-[1600px]">

        {/* Header */}

        <header className="relative">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

            {/* Left header */}

            <div className="min-w-0">

              <Reveal delay={50} duration={650}>

                <div className="mb-2 text-[13px] font-bold uppercase tracking-[0.18em] text-[#079db2]">

                  Circulogy Journal

                </div>

              </Reveal>



              <h1 className="max-w-[950px] text-[clamp(42px,5vw,76px)] font-bold leading-[0.98] tracking-[-0.055em] text-[#050607] sm:text-[50px] md:text-[58px] lg:text-[54px] xl:text-[58px]">

                <LetterReveal

                  text="Ideas for building better ventures."

                  delay={100}

                />

              </h1>



              <Reveal delay={350} duration={800}>

                <p className="mt-3 max-w-[1000px] text-[18px] font-medium leading-[1.25] tracking-[-0.025em] text-[#193c38] sm:text-[21px] md:text-[23px] lg:text-[21px] xl:text-[23px]">

                  Practical perspectives on mentorship, founder decisions and

                  the systems that help startups grow.

                </p>

              </Reveal>

            </div>



            {/* Functional search */}

            <Reveal

              delay={300}

              duration={750}

              className="w-full shrink-0 lg:mt-5 lg:w-[286px] xl:w-[300px]"

            >

              <div className="group relative">

                <div className="pointer-events-none absolute -inset-1 rounded-full bg-[#0cc5c0]/20 opacity-0 blur-md transition-opacity duration-500 group-focus-within:opacity-100" />



                <Search

                  size={20}

                  strokeWidth={2}

                  className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-[#17284a] transition-colors duration-300 group-focus-within:text-[#00aaa7]"

                />



                <input

                  type="search"

                  value={searchQuery}

                  onChange={(event) => setSearchQuery(event.target.value)}

                  placeholder="Search articles"

                  aria-label="Search articles"

                  className="relative h-[48px] w-full rounded-full border-[1.5px] border-[#13c6c5] bg-white pl-14 pr-5 text-[14px] font-medium text-[#17284a] outline-none transition-all duration-300 placeholder:text-[#7b879e] hover:border-[#079f9c] focus:border-[#00aaa7] focus:ring-4 focus:ring-[#13c6c5]/10 sm:h-[50px]"

                />

              </div>

            </Reveal>

          </div>



          {/* Functional category filters */}

          <Reveal delay={350} duration={800}>

            <div className="mt-6 flex flex-col gap-4 border-b border-[#d5dfea] pb-3 lg:flex-row lg:items-center lg:justify-between">

              <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1 lg:gap-3 lg:overflow-visible lg:pb-0">

                {categories.map((category) => {

                  const isActive = activeCategory === category;



                  return (

                    <button

                      key={category}

                      type="button"

                      onClick={() => handleCategoryChange(category)}

                      aria-pressed={isActive}

                      className={`group relative flex h-[44px] shrink-0 items-center justify-center overflow-hidden rounded-full px-6 text-[14px] font-bold tracking-[-0.02em] transition-all duration-300 sm:px-8 sm:text-[16px] ${isActive

                        ? "bg-[#079b96] text-white shadow-[0_8px_24px_rgba(7,155,150,0.18)]"

                        : "bg-[#e8f7f7] text-[#17284a] hover:-translate-y-1 hover:bg-[#d9f1f1] hover:text-[#078f8d] hover:shadow-[0_8px_24px_rgba(0,170,167,0.14)]"

                        }`}

                    >

                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                      <span className="relative z-10">{category}</span>

                    </button>

                  );

                })}

              </div>



              {(searchQuery || activeCategory !== "All") && (

                <button

                  type="button"

                  onClick={() => {

                    setSearchQuery("");

                    setActiveCategory("All");

                  }}

                  className="shrink-0 self-start text-[13px] font-semibold text-[#078f8d] underline-offset-4 hover:underline lg:self-center"

                >

                  Clear filters

                </button>

              )}

            </div>

          </Reveal>

        </header>



        {/* Article area */}

        <section className="mt-4">

          <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[1.08fr_1fr]">

            {/* Featured article: selected cards appear here */}

            <div className="min-w-0">

              {featuredMatchesFilters ? (

                <Reveal key={featuredArticle.id} delay={100} duration={650}>

                  <FeaturedArticle

                    article={featuredArticle}

                    onRead={handleReadArticle}

                  />

                </Reveal>

              ) : (

                <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[12px] border border-dashed border-[#b9d9d7] bg-[#f5fbfa] p-6 text-center sm:min-h-[320px]">

                  <Search size={30} className="text-[#079b96]" />

                  <h2 className="mt-4 text-[22px] font-bold tracking-[-0.04em] text-[#193c38]">

                    No featured article matches

                  </h2>

                  <p className="mt-2 max-w-[360px] text-[14px] leading-6 text-[#6c7d79]">

                    Try another search or category. Matching articles are still

                    available in the cards beside this section.

                  </p>

                  <button

                    type="button"

                    onClick={() => {

                      setSearchQuery("");

                      setActiveCategory("All");

                    }}

                    className="mt-5 rounded-full bg-[#079b96] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#087f7d]"

                  >

                    Show all articles

                  </button>

                </div>

              )}

            </div>



            {/* Right-side cards with vertical scrollbar */}
            <div className="journal-cards-scroll min-h-0 min-w-0 lg:max-h-[650px] lg:overflow-y-auto lg:overscroll-contain lg:pr-2">
              <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article, index) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      index={index}
                      onSelect={handleSelectArticle}
                      onRead={handleReadArticle}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex min-h-[240px] flex-col items-center justify-center rounded-[12px] border border-dashed border-[#b9d9d7] bg-[#f5fbfa] p-6 text-center">
                    <Search size={28} className="text-[#079b96]" />
                    <h3 className="mt-3 text-[20px] font-bold tracking-[-0.04em] text-[#193c38]">
                      No articles found
                    </h3>
                    <p className="mt-2 text-[14px] leading-6 text-[#6c7d79]">
                      Try a different title, keyword or category.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("All");
                      }}
                      className="mt-4 text-[14px] font-semibold text-[#079b96] hover:underline"
                    >
                      Clear search and filters
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

        </section>

      </div>



      {/* Read article modal */}

      <ArticleModal

        article={selectedArticle}

        onClose={() => setSelectedArticle(null)}

      />



      {/* Animations and scrollbar */}

      <style>{`

        .journal-cards-scroll {
          scrollbar-width: thin;
          scrollbar-color: #08b7b6 #e5f6f5;
          scrollbar-gutter: stable;
        }

        .journal-cards-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .journal-cards-scroll::-webkit-scrollbar-track {
          background: #e5f6f5;
          border-radius: 10px;
        }

        .journal-cards-scroll::-webkit-scrollbar-thumb {
          background: #08b7b6;
          border-radius: 10px;
        }

        .journal-cards-scroll::-webkit-scrollbar-thumb:hover {
          background: #087f7d;
        }

        .scrollbar-none::-webkit-scrollbar {

          display: none;

        }



        .scrollbar-none {

          scrollbar-width: none;

          -ms-overflow-style: none;

        }



        @media (prefers-reduced-motion: reduce) {

          *,

          *::before,

          *::after {

            animation-duration: 0.01ms !important;

            animation-iteration-count: 1 !important;

            transition-duration: 0.01ms !important;

            scroll-behavior: auto !important;

          }

        }

      `}</style>

    </main>

  );

};



export default CircularJournal;
