import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flower2,
  Heart,
  Leaf,
  Mail,
  Menu,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Tag,
  X,
} from "lucide-react";

import "./BlogMain.css";

const BlogMain = () => {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const POSTS_PER_PAGE = 12;

  const categories = [
    { name: "All Posts", icon: Sparkles },
    { name: "Sambalpuri Sarees", icon: Flower2 },
    { name: "Handloom Stories", icon: Heart },
    { name: "Styling Tips", icon: Sparkles },
    { name: "Saree Care", icon: ShieldCheck },
    { name: "Fabric Guide", icon: Leaf },
    { name: "Traditions & Culture", icon: Flower2 },
    { name: "Events & News", icon: CalendarDays },
  ];

  /*
   * Images use remote image URLs.
   * For production, replace them with your own images from src/assets.
   */

  const articles = [
    {
      id: 1,
      title: "The Timeless Legacy of Indian Handlooms",
      category: "Handloom Stories",
      date: "12 Oct 2026",
      day: "12",
      month: "OCT",
      year: "2026",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Discover the rich heritage, intricate craftsmanship and timeless beauty of India's handloom traditions.",
      content: [
        "Indian handlooms are more than beautiful fabrics. They represent generations of craftsmanship, cultural identity and the extraordinary creativity of skilled artisans.",
        "Every woven thread carries a story. From the selection of yarn to the careful arrangement of patterns, traditional weaving requires patience, precision and a deep understanding of textile craft.",
        "At ODC Handloom, we celebrate these traditions by bringing heritage-inspired textiles closer to modern homes and contemporary wardrobes.",
      ],
    },
    {
      id: 2,
      title: "Handmade Sambalpuri Sarees: A Heritage to Treasure",
      category: "Sambalpuri Sarees",
      date: "10 Oct 2026",
      day: "10",
      month: "OCT",
      year: "2026",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Explore the beautiful ikat patterns, rich colours and distinctive identity of traditional Sambalpuri sarees from Odisha.",
      content: [
        "Sambalpuri sarees are among Odisha's most celebrated textile traditions. Their distinctive patterns, expressive colours and intricate ikat designs make them treasured pieces of Indian handloom heritage.",
        "In traditional ikat weaving, yarns are carefully tied and dyed before weaving. This process creates characteristic patterns that emerge as the fabric takes shape on the loom.",
        "Sambalpuri sarees are loved for their versatility. They can be styled for weddings, festivals, family celebrations and elegant everyday occasions.",
        "When choosing a Sambalpuri saree, look closely at the design, fabric texture, finishing and the seller's information about its origin and craftsmanship.",
      ],
    },
    {
      id: 3,
      title: "Natural Dyes: The Soul of Sustainable Fashion",
      category: "Fabric Guide",
      date: "08 Oct 2026",
      day: "08",
      month: "OCT",
      year: "2026",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1603905179139-d6b9e1f1b8e6?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Discover the beauty of naturally inspired colours and learn why responsible textile choices matter.",
      content: [
        "Colour is one of the most expressive elements of traditional textiles. Natural dyes have a long history in textile craftsmanship, with colour derived from botanical and other natural materials.",
        "The final shade depends on the material used, the dyeing technique, the fibre and the conditions of the process.",
        "Sustainable fashion involves more than choosing a particular colour or dye. It also means considering how a fabric is produced, how long it lasts and how thoughtfully it is used.",
      ],
    },
    {
      id: 4,
      title: "How to Style Handloom Sarees for Every Occasion",
      category: "Styling Tips",
      date: "05 Oct 2026",
      day: "05",
      month: "OCT",
      year: "2026",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1583391733956-6c78276477e3?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "From festive celebrations to office wear, discover simple ways to style your favourite handloom sarees.",
      content: [
        "A handloom saree can create a distinctive look for almost any occasion. The secret is balancing the saree's colours, patterns and texture with your accessories.",
        "For festive occasions, try traditional jewellery, a coordinated blouse and an elegant drape. For work, choose understated accessories and comfortable footwear.",
        "For Sambalpuri sarees, allow the ikat patterns and traditional borders to remain the focus. A simple blouse can beautifully complement a saree with an intricate design.",
      ],
    },
    {
      id: 5,
      title: "How to Care for Your Handloom Sarees",
      category: "Saree Care",
      date: "02 Oct 2026",
      day: "02",
      month: "OCT",
      year: "2026",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Simple care practices can help preserve the beauty, colour and texture of your favourite sarees.",
      content: [
        "A treasured saree deserves careful storage and gentle handling. Always check the fabric composition and care instructions before washing or cleaning it.",
        "Store sarees in a clean, dry place away from direct sunlight. Avoid keeping delicate textiles in damp conditions, and allow stored fabrics to breathe periodically.",
        "For valuable, delicate or heavily embellished sarees, professional cleaning is often the safest choice.",
      ],
    },
    {
      id: 6,
      title: "Meet the Artisans Behind Our Handlooms",
      category: "Handloom Stories",
      date: "28 Sep 2026",
      day: "28",
      month: "SEP",
      year: "2026",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Meet the skilled hands, patience and knowledge that keep India's traditional weaving heritage alive.",
      content: [
        "Behind every handwoven textile is a process that brings together knowledge, patience and technical skill.",
        "Traditional weaving communities preserve techniques that have developed over generations. Their expertise can be seen in the details of a pattern, the consistency of a weave and the careful finishing of a textile.",
        "Celebrating handlooms also means recognising the people who create them and treating their craft with respect.",
      ],
    },
    {
      id: 7,
      title: "Sambalpuri Ikat: The Art of Patterns Before Weaving",
      category: "Sambalpuri Sarees",
      date: "24 Sep 2026",
      day: "24",
      month: "SEP",
      year: "2026",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1610189012906-4c0b0e5c5f4e?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Learn how tied and dyed yarns become the distinctive patterns that make ikat textiles so special.",
      content: [
        "Ikat is a resist-dyeing technique in which sections of yarn are tied before dyeing. When the prepared yarn is woven, the dyed sections form recognisable patterns.",
        "The planning involved is remarkable. The artisan must consider how the pattern will align when the yarns are placed on the loom.",
        "This combination of preparation and weaving gives traditional ikat textiles their distinctive character.",
      ],
    },
    {
      id: 8,
      title: "Handloom Sarees for Weddings and Celebrations",
      category: "Styling Tips",
      date: "20 Sep 2026",
      day: "20",
      month: "SEP",
      year: "2026",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Celebrate special moments in traditional textiles that combine cultural character with timeless elegance.",
      content: [
        "Weddings and celebrations offer a wonderful opportunity to wear textiles that connect personal style with cultural heritage.",
        "A richly coloured Sambalpuri saree can be styled with traditional jewellery, a coordinated blouse and a carefully chosen drape.",
        "Comfort matters as much as appearance. Consider the weight of the fabric, the length of the event and the weather when choosing what to wear.",
      ],
    },
    {
      id: 9,
      title: "The Beauty of Traditional Odisha Textile Motifs",
      category: "Traditions & Culture",
      date: "16 Sep 2026",
      day: "16",
      month: "SEP",
      year: "2026",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Discover the visual language of traditional patterns and the cultural inspiration behind textile design.",
      content: [
        "Textile motifs can communicate a strong sense of place and tradition. Their shapes, arrangements and colours create a visual language that makes each weaving style distinctive.",
        "Odisha has a rich textile heritage, with regional weaving traditions known for their patterns, colour combinations and skilled craftsmanship.",
        "Understanding a motif's context can make wearing a traditional textile an even more meaningful experience.",
      ],
    },
    {
      id: 10,
      title: "Choosing the Right Blouse for Your Sambalpuri Saree",
      category: "Styling Tips",
      date: "12 Sep 2026",
      day: "12",
      month: "SEP",
      year: "2026",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1610030469668-8e9f641aaf69?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Explore blouse colours, necklines and sleeve styles that complement traditional Sambalpuri patterns.",
      content: [
        "The right blouse can transform the appearance of a saree. Start by identifying one of the prominent colours in the saree's border or body.",
        "A solid-colour blouse creates a balanced look, while a carefully coordinated patterned blouse can add character.",
        "Choose a neckline and sleeve length that feel comfortable and suit the occasion. The best styling choice is one that lets you enjoy wearing your saree with confidence.",
      ],
    },
    {
      id: 11,
      title: "Why Handwoven Textiles Deserve a Place in Your Wardrobe",
      category: "Fabric Guide",
      date: "08 Sep 2026",
      day: "08",
      month: "SEP",
      year: "2026",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Build a thoughtful wardrobe with traditional textiles chosen for their character, versatility and lasting appeal.",
      content: [
        "A thoughtful wardrobe focuses on pieces that you enjoy wearing and can style in different ways.",
        "Handwoven textiles offer a variety of textures, patterns and regional identities. A single saree can become part of a festive look, a family celebration or a special cultural occasion.",
        "Choose quality, learn how to care for each piece and buy according to your personal style rather than short-lived trends.",
      ],
    },
    {
      id: 12,
      title: "Celebrating Odisha's Handloom Heritage This Festive Season",
      category: "Events & News",
      date: "04 Sep 2026",
      day: "04",
      month: "SEP",
      year: "2026",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Discover meaningful ways to celebrate Odisha's textile traditions through festive dressing and thoughtful gifting.",
      content: [
        "Festivals bring people together through food, music, family traditions and clothing. Traditional handlooms can be an important part of these celebrations.",
        "Sambalpuri sarees offer a distinctive way to appreciate Odisha's textile heritage. Their patterns and colours work beautifully for festive occasions.",
        "When choosing a saree as a gift, consider the recipient's favourite colours, preferred fabric and the occasions on which they might wear it.",
      ],
    },
    {
      id: 13,
      title: "A Beginner's Guide to Buying Authentic Handloom Sarees",
      category: "Fabric Guide",
      date: "30 Aug 2026",
      day: "30",
      month: "AUG",
      year: "2026",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Know what to ask about fabric, weaving technique, origin and care before purchasing a handloom saree.",
      content: [
        "Buying a traditional saree becomes easier when you understand the basic details of the textile.",
        "Ask about the fabric composition, weaving technique, care requirements and the information available about its origin.",
        "A clear product description and transparent seller information help you make an informed decision. If a saree is described as handwoven, look for specific details explaining its construction and craftsmanship.",
      ],
    },
    {
      id: 14,
      title: "The Art of Gifting Traditional Sarees",
      category: "Traditions & Culture",
      date: "26 Aug 2026",
      day: "26",
      month: "AUG",
      year: "2026",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Make birthdays, weddings and festivals memorable with a thoughtfully selected traditional saree.",
      content: [
        "A saree can be a meaningful gift because it combines beauty, personal expression and cultural significance.",
        "When selecting one, think about the recipient's preferred colours, fabric and style. Traditional patterns can be especially meaningful when they connect with a family celebration or regional heritage.",
        "A thoughtful presentation and simple care instructions can make the gift feel even more special.",
      ],
    },
    {
      id: 15,
      title: "From Yarn to Saree: Understanding the Weaving Journey",
      category: "Handloom Stories",
      date: "22 Aug 2026",
      day: "22",
      month: "AUG",
      year: "2026",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=85",
      imagePosition: "center",
      excerpt:
        "Follow the stages of textile making and appreciate the skill behind a finished handwoven saree.",
      content: [
        "A handwoven saree begins long before the fabric comes off the loom. Yarn preparation, dyeing, pattern planning and loom setup all contribute to the final result.",
        "In ikat weaving, the pattern must be considered during the preparation of the yarn. Alignment and careful handling help create the intended design.",
        "The finished saree reflects the combined work of preparation, weaving and finishing, making each stage important to the textile's final appearance.",
      ],
    },
  ];

  const filteredArticles = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All Posts" ||
        article.category === activeCategory;

      const searchableContent = [
        article.title,
        article.category,
        article.excerpt,
        ...article.content,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        searchableContent.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / POSTS_PER_PAGE)
  );

  const currentArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;

    return filteredArticles.slice(
      startIndex,
      startIndex + POSTS_PER_PAGE
    );
  }, [filteredArticles, currentPage]);

  const popularArticles = articles.slice(0, 3);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Close the mobile category menu when the screen becomes wider.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock background scrolling only while viewing a full-page article.
  // No popup, modal, dark overlay, or blurred background is created.
  useEffect(() => {
    if (!selectedArticle) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedArticle]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openArticle = (article) => {
    setSelectedArticle(article);
    setCopied(false);
    setMobileMenuOpen(false);
    scrollToTop();
  };

  const goBackToArticles = () => {
    setSelectedArticle(null);
    setCopied(false);

    requestAnimationFrame(() => {
      scrollToTop();
    });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setMobileMenuOpen(false);
    setSelectedArticle(null);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
    scrollToTop();
  };

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setNewsletterStatus("error");
      setNewsletterMessage("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setNewsletterStatus("");
    setNewsletterMessage("");

    try {
      /*
       * Connect your backend here when ready.
       *
       * Example:
       *
       * await fetch("/api/newsletter/subscribe", {
       *   method: "POST",
       *   headers: { "Content-Type": "application/json" },
       *   body: JSON.stringify({ email: normalizedEmail }),
       * });
       *
       * The current implementation validates the email locally.
       */

      await new Promise((resolve) => setTimeout(resolve, 500));

      setNewsletterStatus("success");
      setNewsletterMessage(
        "Thank you! Your email is ready to be connected to our newsletter."
      );

      setEmail("");
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = async () => {
    const articleUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: selectedArticle.title,
          text: selectedArticle.excerpt,
          url: articleUrl,
        });

        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(articleUrl);
      } else {
        const temporaryInput = document.createElement("textarea");

        temporaryInput.value = articleUrl;
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";

        document.body.appendChild(temporaryInput);
        temporaryInput.select();

        const successful = document.execCommand("copy");

        temporaryInput.remove();

        if (!successful) {
          throw new Error("Copy failed");
        }
      }

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (error) {
      if (error?.name === "AbortError") return;

      setCopied(false);
    }
  };

  const changeToRelatedCategory = (category) => {
    setSelectedArticle(null);
    setActiveCategory(category);
    setSearchTerm("");
    setCurrentPage(1);
    scrollToTop();
  };

  const getArticleById = (id) =>
    articles.find((article) => article.id === id);

  /*
   * FULL-PAGE ARTICLE VIEW
   *
   * Clicking a blog card replaces the listing with an article page.
   * There is deliberately no modal or fixed backdrop.
   */

  if (selectedArticle) {
    const relatedArticles = articles
      .filter(
        (article) =>
          article.id !== selectedArticle.id &&
          article.category === selectedArticle.category
      )
      .slice(0, 3);

    const fallbackRelated = articles
      .filter((article) => article.id !== selectedArticle.id)
      .slice(0, 3);

    const displayedRelated =
      relatedArticles.length > 0
        ? relatedArticles
        : fallbackRelated;

    return (
      <main className="BlogMain">
        <div className="BlogMain__backgroundPattern BlogMain__backgroundPattern--left" />
        <div className="BlogMain__backgroundPattern BlogMain__backgroundPattern--right" />

        <div className="BlogMain__container">
          <button
            type="button"
            className="BlogMain__backButton"
            onClick={goBackToArticles}
          >
            <ArrowLeft size={17} />
            <span>Back to Journal</span>
          </button>

          <article className="BlogMain__articlePage">
            <header className="BlogMain__articleHero">
              <img
                className="BlogMain__articleHeroImage"
                src={selectedArticle.image}
                alt={selectedArticle.title}
                loading="eager"
                onError={(event) => {
                  event.currentTarget.src =
                    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85";
                }}
              />

              <div className="BlogMain__articleHeroOverlay" />

              <div className="BlogMain__articleHeroContent">
                <button
                  type="button"
                  className="BlogMain__articleHeroCategory"
                  onClick={() =>
                    changeToRelatedCategory(selectedArticle.category)
                  }
                >
                  <Tag size={13} />
                  {selectedArticle.category}
                </button>

                <span className="BlogMain__articleHeroEyebrow">
                  ODC HANDLOOM JOURNAL
                </span>

                <h1>{selectedArticle.title}</h1>

                <p>{selectedArticle.excerpt}</p>
              </div>
            </header>

            <div className="BlogMain__articleBody">
              <div className="BlogMain__articleMeta">
                <span>
                  <Clock3 size={16} />
                  {selectedArticle.readTime}
                </span>

                <span>
                  <CalendarDays size={16} />
                  {selectedArticle.date}
                </span>

                <span>
                  <BookOpen size={16} />
                  Handloom Journal
                </span>
              </div>

              <div className="BlogMain__articleIntro">
                <span className="BlogMain__eyebrow">
                  WOVEN WITH HERITAGE
                </span>

                <h2>
                  A celebration of craftsmanship, culture and timeless
                  Indian textiles.
                </h2>

                <p>{selectedArticle.excerpt}</p>
              </div>

              <div className="BlogMain__articleOrnament">
                <span />
                <Flower2 size={21} />
                <span />
              </div>

              <div className="BlogMain__articleText">
                {selectedArticle.content.map((paragraph, index) => (
                  <p key={`${selectedArticle.id}-${index}`}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <section className="BlogMain__heritageCallout">
                <div className="BlogMain__heritageIcon">
                  <Flower2 size={27} />
                </div>

                <span className="BlogMain__eyebrow">
                  THE ODC HANDLOOM PROMISE
                </span>

                <h2>
                  Handmade heritage.
                  <br />
                  Beautifully carried forward.
                </h2>

                <p>
                  Discover traditional textiles inspired by Odisha's
                  rich weaving heritage and the beauty of Indian
                  craftsmanship.
                </p>

                <button
                  type="button"
                  onClick={goBackToArticles}
                >
                  Explore More Stories
                  <ArrowRight size={16} />
                </button>
              </section>

              <div className="BlogMain__articleFooter">
                <div className="BlogMain__articleAuthor">
                  <span className="BlogMain__authorIcon">
                    <Flower2 size={20} />
                  </span>

                  <div>
                    <strong>ODC Handloom</strong>
                    <span>Stories woven with tradition</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="BlogMain__shareButton"
                  onClick={handleShare}
                >
                  {copied ? (
                    <Check size={16} />
                  ) : (
                    <Share2 size={16} />
                  )}

                  {copied ? "Link Copied" : "Share Story"}
                </button>
              </div>
            </div>
          </article>

          <section className="BlogMain__relatedSection">
            <div className="BlogMain__relatedHeading">
              <div>
                <span className="BlogMain__eyebrow">
                  CONTINUE EXPLORING
                </span>

                <h2>
                  More Stories, <span>More Heritage</span>
                </h2>
              </div>

              <button
                type="button"
                className="BlogMain__textButton"
                onClick={goBackToArticles}
              >
                All Articles
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="BlogMain__relatedGrid">
              {displayedRelated.map((article) => (
                <article
                  className="BlogMain__relatedCard"
                  key={article.id}
                >
                  <button
                    type="button"
                    className="BlogMain__relatedImageButton"
                    onClick={() => openArticle(article)}
                    aria-label={`Read ${article.title}`}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80";
                      }}
                    />
                    <span>
                      Read Story <ArrowUpRight size={16} />
                    </span>
                  </button>

                  <div className="BlogMain__relatedContent">
                    <span>{article.category}</span>

                    <h3>
                      <button
                        type="button"
                        onClick={() => openArticle(article)}
                      >
                        {article.title}
                      </button>
                    </h3>

                    <p>{article.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  }

  /*
   * BLOG LISTING PAGE
   */

  return (
    <main className="BlogMain">
      <div className="BlogMain__backgroundPattern BlogMain__backgroundPattern--left" />
      <div className="BlogMain__backgroundPattern BlogMain__backgroundPattern--right" />

      <div className="BlogMain__container">
        {/* Header */}

        <header className="BlogMain__journalHeader">
          <div className="BlogMain__journalIntro">
            <span className="BlogMain__eyebrow">
              THE ART OF INDIAN HANDLOOMS
            </span>

            <h1>
              Stories Woven <span>With Heritage</span>
            </h1>

            <p>
              Discover Sambalpuri sarees, traditional weaving,
              timeless styling and the people behind India's beautiful
              handloom heritage.
            </p>
          </div>

          <div className="BlogMain__headerSeal">
            <Flower2 size={27} strokeWidth={1.2} />
            <span>EST.</span>
            <strong>ODISHA</strong>
          </div>
        </header>

        {/* Category navigation and search */}

        <div className="BlogMain__topbar">
          <button
            type="button"
            className="BlogMain__mobileMenu"
            onClick={() => setMobileMenuOpen((previous) => !previous)}
            aria-label="Toggle blog categories"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>

          <nav
            className={`BlogMain__categories ${
              mobileMenuOpen ? "BlogMain__categories--open" : ""
            }`}
            aria-label="Blog categories"
          >
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  type="button"
                  key={category.name}
                  className={`BlogMain__category ${
                    activeCategory === category.name
                      ? "BlogMain__category--active"
                      : ""
                  }`}
                  onClick={() =>
                    handleCategoryChange(category.name)
                  }
                >
                  <Icon size={14} strokeWidth={1.7} />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </nav>

          <label className="BlogMain__search">
            <Search size={17} />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search sarees, stories, inspiration..."
              aria-label="Search blog articles"
            />

            {searchTerm && (
              <button
                type="button"
                className="BlogMain__searchClear"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </label>
        </div>

        {/* Main content */}

        <div className="BlogMain__layout">
          <section
            className="BlogMain__articles"
            aria-label="Handloom blog articles"
          >
            <div className="BlogMain__sectionHeading">
              <div>
                <span className="BlogMain__eyebrow">
                  {activeCategory === "All Posts"
                    ? "THE JOURNAL"
                    : "EXPLORE OUR STORIES"}
                </span>

                <h2>
                  {activeCategory === "All Posts"
                    ? "The Handloom Edit"
                    : activeCategory}
                </h2>

                <p>
                  Thoughtful stories celebrating the colours,
                  craftsmanship and culture of traditional Indian
                  textiles.
                </p>
              </div>

              <div className="BlogMain__articleCount">
                <span>
                  {String(filteredArticles.length).padStart(2, "0")}
                </span>

                <small>STORIES</small>
              </div>
            </div>

            {currentArticles.length > 0 ? (
              <>
                <div className="BlogMain__grid">
                  {currentArticles.map((article, index) => (
                    <article
                      className={`BlogMain__card ${
                        index === 0
                          ? "BlogMain__card--featured"
                          : ""
                      }`}
                      key={article.id}
                      style={{
                        "--BlogMain-card-index": index,
                      }}
                    >
                      <button
                        type="button"
                        className="BlogMain__imageButton"
                        onClick={() => openArticle(article)}
                        aria-label={`Read ${article.title}`}
                      >
                        <img
                          className="BlogMain__image"
                          src={article.image}
                          alt={article.title}
                          loading={index < 3 ? "eager" : "lazy"}
                          onError={(event) => {
                            event.currentTarget.src =
                              "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80";
                          }}
                        />

                        <span className="BlogMain__imageOverlay" />

                        <span className="BlogMain__date">
                          <strong>{article.day}</strong>
                          <span>{article.month}</span>
                          <small>{article.year}</small>
                        </span>

                        <span className="BlogMain__tag">
                          {article.category}
                        </span>

                        <span className="BlogMain__imageArrow">
                          <ArrowUpRight size={18} />
                        </span>
                      </button>

                      <div className="BlogMain__cardContent">
                        <div className="BlogMain__cardMeta">
                          <span className="BlogMain__cardCategory">
                            {article.category}
                          </span>

                          <span className="BlogMain__readTime">
                            <Clock3 size={12} />
                            {article.readTime}
                          </span>
                        </div>

                        <h3>
                          <button
                            type="button"
                            className="BlogMain__titleButton"
                            onClick={() => openArticle(article)}
                          >
                            {article.title}
                          </button>
                        </h3>

                        <p className="BlogMain__excerpt">
                          {article.excerpt}
                        </p>

                        <button
                          type="button"
                          className="BlogMain__readMore"
                          onClick={() => openArticle(article)}
                        >
                          Read Story
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination: 12 posts per page */}

                {totalPages > 1 && (
                  <nav
                    className="BlogMain__pagination"
                    aria-label="Blog pagination"
                  >
                    <button
                      type="button"
                      className="BlogMain__pageArrow"
                      disabled={currentPage === 1}
                      onClick={() =>
                        handlePageChange(currentPage - 1)
                      }
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={17} />
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <button
                        type="button"
                        key={page}
                        className={`BlogMain__pageNumber ${
                          currentPage === page
                            ? "BlogMain__pageNumber--active"
                            : ""
                        }`}
                        aria-current={
                          currentPage === page ? "page" : undefined
                        }
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      className="BlogMain__pageArrow"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        handlePageChange(currentPage + 1)
                      }
                      aria-label="Next page"
                    >
                      <ChevronRight size={17} />
                    </button>

                    <p className="BlogMain__paginationInfo">
                      Showing{" "}
                      {(currentPage - 1) * POSTS_PER_PAGE + 1}
                      {"–"}
                      {Math.min(
                        currentPage * POSTS_PER_PAGE,
                        filteredArticles.length
                      )}{" "}
                      of {filteredArticles.length} stories
                    </p>
                  </nav>
                )}
              </>
            ) : (
              <div className="BlogMain__empty">
                <span className="BlogMain__emptyIcon">
                  <Search size={26} />
                </span>

                <h3>No stories found</h3>

                <p>
                  We couldn't find a story matching your search.
                  Try another keyword or explore all our handloom
                  stories.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("All Posts");
                    setCurrentPage(1);
                  }}
                >
                  Explore All Stories
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </section>

          {/* Sidebar */}

          <aside className="BlogMain__sidebar">
            <section className="BlogMain__sidebarCard">
              <div className="BlogMain__sidebarHeading">
                <h2>Popular Stories</h2>

                <div className="BlogMain__headingOrnament">
                  <Flower2 size={17} />
                  <span />
                </div>
              </div>

              <div className="BlogMain__popularList">
                {popularArticles.map((article) => (
                  <button
                    type="button"
                    className="BlogMain__popularPost"
                    key={article.id}
                    onClick={() => openArticle(article)}
                  >
                    <span className="BlogMain__popularImageWrap">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80";
                        }}
                      />
                    </span>

                    <span className="BlogMain__popularInfo">
                      <strong>{article.title}</strong>
                      <small>{article.date}</small>
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="BlogMain__viewAll"
                onClick={goBackToArticles}
              >
                Explore All Stories
                <ArrowRight size={15} />
              </button>
            </section>

            {/* Newsletter */}

            <section className="BlogMain__sidebarCard BlogMain__newsletter">
              <div className="BlogMain__newsletterDecor">
                <Flower2 size={23} />
              </div>

              <div className="BlogMain__sidebarHeading">
                <h2>Stay Inspired</h2>

                <div className="BlogMain__headingOrnament">
                  <span />
                </div>
              </div>

              <p className="BlogMain__newsletterDescription">
                Receive handloom stories, Sambalpuri saree inspiration,
                styling ideas and updates from our world of
                traditional textiles.
              </p>

              <form
                className="BlogMain__newsletterForm"
                onSubmit={handleNewsletterSubmit}
              >
                <label className="BlogMain__emailInput">
                  <Mail size={17} />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);

                      if (newsletterStatus) {
                        setNewsletterStatus("");
                        setNewsletterMessage("");
                      }
                    }}
                    placeholder="Enter your email address"
                    required
                    aria-label="Email address"
                  />
                </label>

                <button
                  type="submit"
                  className="BlogMain__subscribeButton"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="BlogMain__spinner" />
                      PLEASE WAIT
                    </>
                  ) : (
                    <>
                      SUBSCRIBE
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {newsletterMessage && (
                <p
                  className={`BlogMain__newsletterMessage ${
                    newsletterStatus === "success"
                      ? "BlogMain__newsletterMessage--success"
                      : "BlogMain__newsletterMessage--error"
                  }`}
                  role="status"
                >
                  {newsletterStatus === "success" ? (
                    <Check size={15} />
                  ) : (
                    <X size={15} />
                  )}

                  {newsletterMessage}
                </p>
              )}

              <div className="BlogMain__newsletterFootnote">
                <ShieldCheck size={14} />
                Thoughtful stories, delivered with care.
              </div>
            </section>

            {/* Sambalpuri feature */}

            <section className="BlogMain__sidebarFeature">
              <img
                className="BlogMain__featureImage"
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85"
                alt="Traditional Indian saree inspiration"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src =
                    "https://images.unsplash.com/photo-1583391733956-6c78276477e3?auto=format&fit=crop&w=800&q=85";
                }}
              />

              <div className="BlogMain__featureImageOverlay" />

              <div className="BlogMain__featureContent">
                <span className="BlogMain__eyebrow">
                  MADE WITH HERITAGE
                </span>

                <h3>
                  The Beauty of
                  <br />
                  Sambalpuri
                  <br />
                  Handlooms
                </h3>

                <p>
                  Celebrate Odisha's weaving traditions, timeless
                  patterns and the beauty of handmade textiles.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleCategoryChange("Sambalpuri Sarees")
                  }
                >
                  Discover the Stories
                  <ArrowRight size={16} />
                </button>
              </div>

              <Flower2
                className="BlogMain__featureWatermark"
                size={105}
                strokeWidth={0.7}
              />
            </section>

            {/* Brand values */}

            <section className="BlogMain__sidebarValues">
              <div>
                <span>
                  <Heart size={17} />
                </span>

                <p>
                  <strong>Rooted in Tradition</strong>
                  <small>Inspired by Indian heritage.</small>
                </p>
              </div>

              <div>
                <span>
                  <Leaf size={17} />
                </span>

                <p>
                  <strong>Timeless by Nature</strong>
                  <small>Made to be treasured.</small>
                </p>
              </div>

              <div>
                <span>
                  <Flower2 size={17} />
                </span>

                <p>
                  <strong>Crafted with Care</strong>
                  <small>Celebrating textile artistry.</small>
                </p>
              </div>
            </section>
          </aside>
        </div>

        {/* Bottom heritage banner */}

        <section className="BlogMain__bottomBanner">
          <div className="BlogMain__bottomBannerIcon">
            <Flower2 size={33} strokeWidth={1.2} />
          </div>

          <div className="BlogMain__bottomBannerContent">
            <span className="BlogMain__eyebrow">
              A LEGACY WOVEN THROUGH GENERATIONS
            </span>

            <h2>
              Wear Your Heritage.
              <span> Celebrate Every Thread.</span>
            </h2>

            <p>
              Discover the stories, traditions and artistry that make
              Indian handlooms truly special.
            </p>
          </div>

          <button
            type="button"
            className="BlogMain__bottomBannerButton"
            onClick={() =>
              handleCategoryChange("Sambalpuri Sarees")
            }
          >
            Explore Sambalpuri
            <ArrowUpRight size={17} />
          </button>
        </section>
      </div>
    </main>
  );
};

export default BlogMain;