
import React, { useEffect, useRef, useState } from "react";
import { Search, ArrowUpRight, X } from "lucide-react";

/* =========================================================
   API HELPERS
========================================================= */

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const getArticleRows = (payload) => {
  if (Array.isArray(payload)) return payload;

  if (Array.isArray(payload?.blogs)) return payload.blogs;
  if (Array.isArray(payload?.articles)) return payload.articles;
  if (Array.isArray(payload?.data)) return payload.data;

  if (payload?.blog && typeof payload.blog === "object") {
    return [payload.blog];
  }

  if (payload?.article && typeof payload.article === "object") {
    return [payload.article];
  }

  if (payload?.data && typeof payload.data === "object") {
    return [payload.data];
  }

  if (payload && typeof payload === "object" && payload.id != null) {
    return [payload];
  }

  return [];
};

const getArticleContent = (row) => {
  if (!row) return "";

  const candidates = [
    row.content,
    row.full_content,
    row.fullContent,
    row.article_content,
    row.articleContent,
    row.body,
    row.body_content,
    row.bodyContent,
    row.article_body,
    row.articleBody,
    row.post_content,
    row.postContent,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }

    if (Array.isArray(candidate)) {
      const text = candidate
        .map((item) =>
          typeof item === "string" ? item : item?.text || ""
        )
        .filter(Boolean)
        .join("\n\n");

      if (text.trim()) return text;
    }
  }

  return "";
};

const getArticleDescription = (row) =>
  String(
    row?.description ??
      row?.excerpt ??
      row?.summary ??
      row?.short_description ??
      row?.shortDescription ??
      ""
  );

const getArticleImage = (row) =>
  String(
    row?.image ??
      row?.image_url ??
      row?.imageUrl ??
      row?.image_path ??
      row?.featured_image ??
      row?.featuredImage ??
      ""
  );

const getArticleDate = (row) => {
  const rawDate =
    row?.date ??
    row?.published_at ??
    row?.publishedAt ??
    row?.publication_date ??
    row?.publicationDate ??
    row?.created_at ??
    row?.createdAt ??
    "";

  if (!rawDate) return "";

  const parsedDate = new Date(rawDate);

  return !Number.isNaN(parsedDate.getTime())
    ? parsedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : String(rawDate);
};

const normalizeArticle = (row, fallback = {}) => {
  const imageValue = getArticleImage(row) || fallback.image || "";

  const imageUrl =
    imageValue && /^\/uploads\//i.test(imageValue)
      ? `${API_BASE_URL}${imageValue}`
      : imageValue;

  return {
    ...fallback,
    id: row?.id ?? row?._id ?? row?.slug ?? fallback.id,
    slug: row?.slug ?? fallback.slug ?? "",
    category: String(
      row?.category ??
        row?.category_name ??
        row?.categoryName ??
        fallback.category ??
        ""
    ),
    author: String(
      row?.author ??
        row?.author_name ??
        row?.authorName ??
        fallback.author ??
        ""
    ),
    date: getArticleDate(row) || fallback.date || "",
    title: String(row?.title ?? fallback.title ?? ""),
    image: imageUrl,
    imageCaption: String(
      row?.imageCaption ??
        row?.image_caption ??
        row?.image_caption_text ??
        fallback.imageCaption ??
        ""
    ),
    description: getArticleDescription(row) || fallback.description || "",
    content: getArticleContent(row) || fallback.content || "",
  };
};

const fetchArticleDetails = async (article, signal) => {
  const identifiers = [
    article?.id,
    article?.slug,
  ].filter((value) => value != null && String(value).trim() !== "");

  for (const identifier of identifiers) {
    const encodedIdentifier = encodeURIComponent(String(identifier));

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/blogs/${encodedIdentifier}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
          signal,
        }
      );

      if (!response.ok) continue;

      const payload = await response.json();
      const rows = getArticleRows(payload);
      const row =
        rows.find(
          (item) =>
            String(item?.id ?? item?._id ?? item?.slug) ===
            String(identifier)
        ) || rows[0];

      if (row) {
        return normalizeArticle(row, article);
      }
    } catch (error) {
      if (error.name === "AbortError") throw error;

      // Continue with the next identifier or use the list data.
    }
  }

  return article;
};

/* =========================================================
   REVEAL HOOK
========================================================= */

function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -50px 0px" } =
    options;

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
========================================================= */

const LetterReveal = ({ text, className = "", delay = 0 }) => {
  const [ref, visible] = useReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -40px 0px",
  });

  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      aria-label={text}
    >
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
========================================================= */

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
========================================================= */

const ArticleCard = ({ article, index, onSelect, onRead }) => {
  return (
    <article
      className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[12px] border border-[#d2ddea] bg-white p-3.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-[#36c9c3] hover:shadow-[0_20px_55px_rgba(0,170,167,0.15),0_0_35px_rgba(0,190,184,0.12)]"
      style={{ transitionDelay: `${Math.min(index, 5) * 35}ms` }}
    >
      <div className="pointer-events-none absolute -inset-px rounded-[12px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-[12px] bg-[radial-gradient(circle_at_50%_0%,rgba(0,190,184,0.18),transparent_60%)]" />
      </div>

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
            className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:brightness-[1.05]"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#004f4d]/20 via-transparent to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </button>

      <div className="relative z-10 mt-3 flex flex-wrap items-center gap-1">
        <span className="rounded-full bg-[#e5f6f5] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.02em] text-[#078f8d] transition-all duration-300 group-hover:bg-[#d3f3f1] group-hover:shadow-[0_0_16px_rgba(0,175,169,0.16)]">
          {article.category}
        </span>

        <span className="h-4 w-px bg-[#cbd5e1]" />

        <span className="text-[11px] font-semibold text-[#7c879d]">
          By {article.author}
        </span>

        <span className="h-4 w-px bg-[#cbd5e1]" />

        <span className="whitespace-nowrap text-[11px] font-semibold text-[#7c879d]">
          {article.date}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onSelect(article)}
        className="relative z-10 mt-3 cursor-pointer text-left"
      >
        <h3 className="text-[21px] font-bold leading-[0.98] tracking-[-0.045em] text-[#050607] transition-colors duration-300 group-hover:text-[#087f7d] sm:text-[20px] lg:text-[18px] xl:text-[21px]">
          {article.title}
        </h3>
      </button>

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
========================================================= */

const FeaturedArticle = ({ article, onRead }) => {
  return (
    <article className="group relative h-full overflow-hidden rounded-[12px] border border-[#d2ddea] bg-white p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-[#32c9c4] hover:shadow-[0_25px_70px_rgba(0,170,167,0.15),0_0_45px_rgba(0,190,184,0.1)] sm:p-8">
      <div className="pointer-events-none absolute -inset-px rounded-[12px] bg-[radial-gradient(circle_at_45%_0%,rgba(0,190,184,0.14),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 h-[200px] w-full overflow-hidden rounded-[9px] border border-[#08b7b6] bg-[#eef6f5] transition-all duration-500 group-hover:border-[#00aaa7] sm:h-[280px] md:h-[320px] lg:h-[230px] xl:h-[320px]">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] group-hover:brightness-[1.04]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001f1e]/35 via-transparent to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-3">
          <span className="px-3 text-center text-[13px] font-bold uppercase tracking-[-0.02em] text-white opacity-90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-100 sm:text-[15px]">
            {article.imageCaption || article.title}
          </span>
        </div> */}
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#e5f6f5] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.04em] text-[#078f8d] transition-all duration-300 group-hover:bg-[#d5f3f1] group-hover:shadow-[0_0_18px_rgba(0,175,169,0.18)]">
          {article.category}
        </span>

        <span className="h-5 w-px bg-[#cbd5e1]" />

        <span className="text-[13px] font-semibold text-[#7c879d]">
          By {article.author}
        </span>

        <span className="h-5 w-px bg-[#cbd5e1]" />

        <span className="text-[13px] font-semibold text-[#7c879d]">
          {article.date}
        </span>
      </div>

      <h2 className="relative z-10 mt-4 text-[37px] font-bold leading-[0.96] tracking-[-0.055em] text-[#050607] sm:text-[42px] md:text-[46px] lg:text-[34px] xl:text-[42px]">
        {article.title}
      </h2>

      <p className="relative z-10 mt-3 max-w-[620px] whitespace-pre-line break-words text-[16px] font-semibold leading-[1.5] tracking-[-0.025em] text-[#6c7d79] sm:text-[17px]">
        {article.description}
      </p>

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
========================================================= */

const ArticleModal = ({
  article,
  onClose,
  loading = false,
  error = "",
}) => {
  useEffect(() => {
    if (!article) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [article, onClose]);

  if (!article) return null;

  const fullContent = String(article.content || "").trim();
  const description = String(article.description || "").trim();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#061b1b]/75 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
        className="relative my-2 flex max-h-[calc(100dvh-16px)] w-full max-w-[950px] flex-col overflow-hidden rounded-[16px] border border-[#d2ddea] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:my-4 sm:max-h-[calc(100dvh-32px)]"
      >
        <div className="relative shrink-0 border-b border-[#d5dfea] bg-white px-4 py-3 pr-16 sm:px-7">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#079b96]">
            Circulogy Journal
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close article"
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d2ddea] bg-white text-[#193c38] transition-all hover:border-[#00aaa7] hover:bg-[#e5f6f5] sm:right-5"
          >
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="p-4 sm:p-7">
            {article.image && (
              <div className="overflow-hidden rounded-[10px] border border-[#08b7b6] bg-[#eef6f5]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="max-h-[420px] min-h-[150px] w-full object-contain sm:object-cover"
                />
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {article.category && (
                <span className="rounded-full bg-[#e5f6f5] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.04em] text-[#078f8d]">
                  {article.category}
                </span>
              )}

              {article.author && (
                <span className="text-[11px] font-semibold uppercase text-[#7c879d]">
                  By {article.author}
                </span>
              )}

              {article.date && (
                <span className="text-[11px] font-semibold uppercase text-[#7c879d]">
                  {article.date}
                </span>
              )}
            </div>

            <h2
              id="article-modal-title"
              className="mt-5 break-words text-[32px] font-bold leading-[1.05] tracking-[-0.05em] text-[#050607] sm:text-[44px]"
            >
              {article.title}
            </h2>

            {description && (
              <p className="mt-5 whitespace-pre-line break-words text-[16px] font-semibold leading-[1.8] text-[#193c38] sm:text-[17px]">
                {description}
              </p>
            )}

            {loading && (
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#f5fbfa] p-4 text-[#078f8d]">
                <span className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-[#b9e7e3] border-t-[#079b96]" />
                <p className="text-sm font-semibold">
                  Loading full article...
                </p>
              </div>
            )}

            {!loading && error && (
              <div className="mt-5 rounded-xl border border-[#f0d7b8] bg-[#fffaf3] p-4 text-sm leading-6 text-[#79552b]">
                {error}
              </div>
            )}

            {!loading && fullContent ? (
              <div className="article-full-content mt-6 break-words text-[15px] leading-[1.9] text-[#52645f] sm:text-[16px]">
                {fullContent.split(/\n{2,}/).map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-5 whitespace-pre-line last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              !loading &&
              !error && (
                <div className="mt-6 rounded-xl border border-dashed border-[#b9d9d7] bg-[#f5fbfa] p-5">
                  <h3 className="text-base font-bold text-[#193c38]">
                    Full article content is not available
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#6c7d79]">
                    The article details endpoint did not return any full
                    content. The description above may only be a summary.
                    Please check that the backend returns the article's
                    content field.
                  </p>
                </div>
              )
            )}

            <div className="mt-8 border-t border-[#d5dfea] pt-5">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-[#079b96] px-6 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#087f7d] hover:shadow-[0_8px_24px_rgba(7,155,150,0.2)]"
              >
                Back to journal
                <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* =========================================================
   MAIN JOURNAL COMPONENT
========================================================= */

const CircularJournal = () => {
  const categories = [
    "All",
    "Startup Mentoring",
    "Founder Growth",
    "Strategy & Scale",
    "Digital India",
  ];

  const [articles, setArticles] = useState([]);
  const [featuredId, setFeaturedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleLoading, setArticleLoading] = useState(false);
  const [articleError, setArticleError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const articleRequestRef = useRef(null);

  /* Fetch the articles list */

  useEffect(() => {
    const controller = new AbortController();

    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/api/blogs`, {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Unable to load articles (HTTP ${response.status}).`
          );
        }

        const payload = await response.json();
        const rows = getArticleRows(payload);

        const normalizedArticles = rows.map((row) =>
          normalizeArticle(row)
        );

        setArticles(normalizedArticles);
        setFeaturedId(normalizedArticles[0]?.id ?? null);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          console.error("Error fetching journal articles:", fetchError);
          setError(
            fetchError.message ||
              "Something went wrong while loading articles."
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchArticles();

    return () => controller.abort();
  }, []);

  /* Cancel an unfinished detail request when the modal closes */

  useEffect(() => {
    return () => {
      articleRequestRef.current?.abort();
    };
  }, []);

  const featuredArticle =
    articles.find((article) => article.id === featuredId) ||
    articles[0] ||
    null;

  const matchesFilters = (article) => {
    if (!article) return false;

    const query = searchQuery.trim().toLowerCase();

    const matchesCategory =
      activeCategory === "All" ||
      String(article.category || "").toLowerCase() ===
        activeCategory.toLowerCase();

    const matchesSearch =
      !query ||
      String(article.title || "").toLowerCase().includes(query) ||
      String(article.category || "").toLowerCase().includes(query) ||
      String(article.description || "").toLowerCase().includes(query) ||
      String(article.content || "").toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  };

  const filteredArticles = articles.filter(
    (article) =>
      String(article.id) !== String(featuredId) &&
      matchesFilters(article)
  );

  const featuredMatchesFilters = Boolean(
    featuredArticle && matchesFilters(featuredArticle)
  );

  /* Selecting a card makes it the featured article */

  const handleSelectArticle = (article) => {
    if (!article || String(article.id) === String(featuredId)) return;
    setFeaturedId(article.id);
  };

  /* Open the complete article from either side */

  const handleReadArticle = async (article) => {
    if (!article) return;

    articleRequestRef.current?.abort();

    const controller = new AbortController();
    articleRequestRef.current = controller;

    setSelectedArticle(article);
    setArticleLoading(true);
    setArticleError("");

    try {
      const completeArticle = await fetchArticleDetails(
        article,
        controller.signal
      );

      if (!controller.signal.aborted) {
        setSelectedArticle(completeArticle);

        if (
          !completeArticle.content &&
          !completeArticle.description
        ) {
          setArticleError(
            "The API returned no article text. Check the backend detail route and database content field."
          );
        }
      }
    } catch (fetchError) {
      if (fetchError.name !== "AbortError") {
        console.error("Error fetching full article:", fetchError);

        if (!controller.signal.aborted) {
          setArticleError(
            "Unable to retrieve the full article from the server. Showing any article text already available."
          );
        }
      }
    } finally {
      if (!controller.signal.aborted) {
        setArticleLoading(false);
      }
    }
  };

  const closeArticleModal = () => {
    articleRequestRef.current?.abort();
    articleRequestRef.current = null;
    setSelectedArticle(null);
    setArticleLoading(false);
    setArticleError("");
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
                  Practical perspectives on mentorship, founder decisions
                  and the systems that help startups grow.
                </p>
              </Reveal>
            </div>

            {/* Search */}

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

          {/* Category filters */}

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
                      className={`group relative flex h-[44px] shrink-0 items-center justify-center overflow-hidden rounded-full px-6 text-[14px] font-bold tracking-[-0.02em] transition-all duration-300 sm:px-8 sm:text-[16px] ${
                        isActive
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
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-[12px] border border-[#d5dfea] bg-white">
              <div className="flex items-center gap-3 text-[#078f8d]">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#b9e7e3] border-t-[#079b96]" />
                <p className="text-[15px] font-semibold">
                  Loading articles...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-[12px] border border-dashed border-[#b9d9d7] bg-[#f5fbfa] p-6 text-center">
              <h2 className="text-[22px] font-bold tracking-[-0.04em] text-[#193c38]">
                Unable to load articles
              </h2>

              <p className="max-w-[560px] text-[14px] leading-6 text-[#6c7d79]">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-full bg-[#079b96] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#087f7d]"
              >
                Try again
              </button>

              <p className="max-w-[560px] text-[12px] leading-5 text-[#7c879d]">
                Check that the backend is running, GET /api/blogs exists,
                and CORS allows this frontend origin.
              </p>
            </div>
          ) : articles.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-[12px] border border-dashed border-[#b9d9d7] bg-[#f5fbfa] p-6 text-center">
              <div>
                <h2 className="text-[22px] font-bold tracking-[-0.04em] text-[#193c38]">
                  No articles available
                </h2>
                <p className="mt-2 text-[14px] leading-6 text-[#6c7d79]">
                  Published articles from the database will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[1.08fr_1fr]">
              {/* Featured article: left side */}

              <div className="min-w-0">
                {featuredMatchesFilters ? (
                  <Reveal
                    key={featuredArticle.id}
                    delay={100}
                    duration={650}
                  >
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
                      Try another search or category. Matching articles
                      are still available in the cards beside this section.
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

              {/* Right-side article cards */}

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
                      <Search
                        size={28}
                        className="text-[#079b96]"
                      />

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
          )}
        </section>
      </div>

      {/* Shared full-article modal for both sides */}

      <ArticleModal
        article={selectedArticle}
        loading={articleLoading}
        error={articleError}
        onClose={closeArticleModal}
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

        .article-full-content {
          overflow-wrap: anywhere;
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
