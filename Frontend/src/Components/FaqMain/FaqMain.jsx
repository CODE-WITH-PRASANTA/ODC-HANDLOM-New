import React, { useEffect, useMemo, useState } from "react";
import {
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  Layers,
  Flower2,
  UserRound,
  CircleHelp,
  Search,
  Plus,
  Minus,
  MessageCircle,
  Phone,
  Mail,
  Headphones,
  ShieldCheck,
  Clock3,
  ArrowRight,
  ChevronRight,
  IndianRupee,
  Tag,
  FileText,
  Menu,
  X,
  PackageCheck,
  Heart,
} from "lucide-react";

import "./FaqMain.css";

const FaqMain = () => {
  const [activeCategory, setActiveCategory] = useState("orders");
  const [openQuestion, setOpenQuestion] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [contactCopied, setContactCopied] = useState(false);

  const categories = [
    {
      id: "orders",
      label: "Orders & Shopping",
      icon: ShoppingBag,
    },
    {
      id: "payment",
      label: "Payment & Offers",
      icon: CreditCard,
    },
    {
      id: "shipping",
      label: "Shipping & Delivery",
      icon: Truck,
    },
    {
      id: "returns",
      label: "Returns & Refunds",
      icon: RotateCcw,
    },
    {
      id: "product",
      label: "Product Care",
      icon: Layers,
    },
    {
      id: "saree",
      label: "Saree Information",
      icon: Flower2,
    },
    {
      id: "account",
      label: "Account & Profile",
      icon: UserRound,
    },
    {
      id: "general",
      label: "General Queries",
      icon: CircleHelp,
    },
  ];

  const faqData = {
    orders: [
      {
        question: "How can I place an order on ODC-HANDLOOM?",
        answer:
          'You can easily place an order by browsing our collections, selecting your desired product, choosing the size (if applicable), and clicking on the "Add to Cart" button. Once you’re ready, proceed to checkout and complete the payment.',
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "You may be able to modify or cancel your order before it is shipped. Please contact our customer support team as soon as possible with your order details so we can assist you.",
      },
      {
        question: "Do I need to create an account to place an order?",
        answer:
          "Creating an account is recommended for a smoother shopping experience, but whether guest checkout is available depends on the checkout options enabled on our website.",
      },
      {
        question: "Will I get an order confirmation?",
        answer:
          "Yes. After your order is successfully placed, you should receive an order confirmation by email or SMS using the contact information provided during checkout.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "Available payment options are displayed during checkout. Depending on your order and location, these may include UPI, debit cards, credit cards, net banking, and other supported payment methods.",
      },
      {
        question: "Is Cash on Delivery (COD) available?",
        answer:
          "Cash on Delivery may be available for eligible products and delivery locations. Enter your delivery PIN code during checkout to see the payment options available for your order.",
      },
      {
        question: "Can I apply discount coupons?",
        answer:
          "If you have a valid discount coupon, enter its code in the coupon or promo-code field during checkout. The applicable discount will be reflected in your order total.",
      },
      {
        question: "Are the prices inclusive of GST?",
        answer:
          "The applicable taxes and charges are displayed in your order summary before you complete your purchase. Please review the final checkout amount for the complete price breakdown.",
      },
    ],

    payment: [
      {
        question: "Which payment methods can I use?",
        answer:
          "Please check the payment methods shown at checkout. Supported options may include UPI, credit cards, debit cards, net banking, and other available payment services.",
      },
      {
        question: "Why did my payment fail?",
        answer:
          "A payment can fail because of a bank restriction, insufficient funds, an interrupted connection, or a payment gateway issue. Check your bank statement before attempting another payment.",
      },
      {
        question: "What should I do if money is deducted but my order is not confirmed?",
        answer:
          "Please keep your payment reference number and transaction details. Contact our support team so the payment status can be checked before you attempt another payment.",
      },
      {
        question: "How can I use a coupon code?",
        answer:
          "Enter your coupon code in the designated field during checkout and apply it before placing your order. Make sure the coupon is valid and that your order meets its conditions.",
      },
      {
        question: "Can I use more than one discount coupon?",
        answer:
          "Coupon combination rules depend on the offer. The checkout page will indicate whether multiple promotions can be applied to the same order.",
      },
      {
        question: "How will I receive my refund?",
        answer:
          "Once a refund is approved, it will be processed according to the applicable refund policy and payment method. The time required for the amount to appear depends on the payment provider.",
      },
    ],

    shipping: [
      {
        question: "How long does delivery take?",
        answer:
          "Delivery times depend on your location, product availability, and courier service. The estimated delivery date, when available, will be displayed during checkout or in your shipping updates.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order is dispatched, use the tracking link or shipment details provided in your order confirmation or shipping notification.",
      },
      {
        question: "Do you deliver across India?",
        answer:
          "Delivery availability depends on the serviceability of your PIN code. Enter your PIN code on the product or checkout page to check whether delivery is available.",
      },
      {
        question: "Can I change my delivery address?",
        answer:
          "Please contact customer support immediately if you need to change your address. Changes may not be possible once your order has been packed or handed over to the courier.",
      },
      {
        question: "What should I do if my package is delayed?",
        answer:
          "Check the latest shipment tracking information first. If the delivery estimate has passed, contact our support team with your order number for assistance.",
      },
      {
        question: "What if I receive a damaged package?",
        answer:
          "Please photograph the package and the damaged item, keep the original packaging, and contact customer support promptly with your order details.",
      },
    ],

    returns: [
      {
        question: "What is your return policy?",
        answer:
          "Return eligibility depends on the product, its condition, and the applicable return policy. Please review the return terms displayed on the product page or contact support before sending an item back.",
      },
      {
        question: "How do I request a return?",
        answer:
          "Contact customer support with your order number, the item details, and the reason for your request. Our team will guide you through the applicable return process.",
      },
      {
        question: "How long does a refund take?",
        answer:
          "Refund processing times vary depending on the payment method and the status of your return. You will be guided through the applicable process after your request is reviewed.",
      },
      {
        question: "Can I exchange a saree for another design?",
        answer:
          "Exchanges depend on product eligibility and stock availability. Please contact our team before returning the item so we can explain the available options.",
      },
      {
        question: "Can I return a product after using it?",
        answer:
          "Products generally need to meet the applicable return conditions. Please check the product-specific policy before initiating a return.",
      },
      {
        question: "What if I receive the wrong product?",
        answer:
          "Contact customer support with your order number and clear photographs of the received item and its packaging. Our team will review the issue and advise you on the next steps.",
      },
    ],

    product: [
      {
        question: "How should I care for my handloom products?",
        answer:
          "Follow the care instructions provided with your product. For delicate handloom fabrics, gentle washing or professional dry cleaning may be appropriate depending on the material and dyes.",
      },
      {
        question: "How do I store my sarees?",
        answer:
          "Store sarees in a clean, dry, well-ventilated place away from direct sunlight. Fold them carefully and periodically refold delicate fabrics to help protect them during long-term storage.",
      },
      {
        question: "Can handloom fabric have slight irregularities?",
        answer:
          "Yes. Small variations in texture, weave, colour, and motifs can be natural characteristics of handcrafted textiles. These details often reflect the individual nature of handloom production.",
      },
      {
        question: "How do I remove stains from a saree?",
        answer:
          "Avoid harsh detergents and vigorous rubbing. Check the fabric care instructions and consult a professional cleaner for delicate silk, zari, or richly coloured fabrics.",
      },
      {
        question: "Will the product look exactly like the photograph?",
        answer:
          "We aim to represent our products accurately. However, slight colour differences may occur because of lighting, photography, and screen settings.",
      },
    ],

    saree: [
      {
        question: "What makes an Odisha handloom saree special?",
        answer:
          "Odisha handloom traditions are known for distinctive weaving techniques, traditional motifs, detailed patterns, and regional craftsmanship passed down through generations.",
      },
      {
        question: "How do I choose the right saree?",
        answer:
          "Consider the occasion, fabric, colour, weaving style, border, and your preferred drape. Product descriptions and photographs can help you compare available designs.",
      },
      {
        question: "What is the difference between handloom and machine-made sarees?",
        answer:
          "Handloom sarees are woven using hand-operated looms, while machine-made sarees are produced using powered machinery. Weaving methods can influence texture, pattern, and the character of the finished fabric.",
      },
      {
        question: "Are blouse pieces included with sarees?",
        answer:
          "Blouse-piece availability varies by product. Please check the individual product description for details before placing your order.",
      },
      {
        question: "How should I care for silk and zari sarees?",
        answer:
          "Follow the care instructions provided with the saree. Professional dry cleaning is often recommended for delicate silk and zari work, and sarees should be stored in a dry place.",
      },
      {
        question: "Are the sarees suitable for gifting?",
        answer:
          "Handloom sarees can make thoughtful gifts for weddings, festivals, family celebrations, and special occasions. Check the product details for available packaging options.",
      },
    ],

    account: [
      {
        question: "How do I create an account?",
        answer:
          "Open the account or profile section on our website and follow the registration instructions. Provide the requested details to complete the process.",
      },
      {
        question: "I forgot my password. What should I do?",
        answer:
          "Use the Forgot Password option on the login page, if available, and follow the instructions sent to your registered email address or mobile number.",
      },
      {
        question: "How can I update my profile information?",
        answer:
          "Sign in to your account and open your profile settings. Update the available fields and save your changes.",
      },
      {
        question: "How can I view my previous orders?",
        answer:
          "Sign in and open the Orders section of your account, if available, to view your previous purchases and their status.",
      },
      {
        question: "How do I change my registered mobile number?",
        answer:
          "Check your profile settings for an option to update your mobile number. If verification is required or you cannot edit the field, contact customer support.",
      },
    ],

    general: [
      {
        question: "What is ODC-HANDLOOM?",
        answer:
          "ODC-HANDLOOM celebrates traditional handloom craftsmanship by bringing beautiful textile designs and handloom-inspired collections to customers.",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "You can contact our team using the telephone number, email address, or contact options displayed on this page.",
      },
      {
        question: "Are your products handcrafted?",
        answer:
          "Product manufacturing and weaving details may differ between collections. Please refer to the individual product description for accurate information about its craftsmanship.",
      },
      {
        question: "Do you offer gift packaging?",
        answer:
          "Gift packaging availability depends on the product and current services. Please contact customer support to confirm the available options.",
      },
      {
        question: "How can I share feedback?",
        answer:
          "We welcome your feedback. Contact our support team with your suggestions, experience, or concerns so we can better understand your needs.",
      },
    ],
  };

  const activeCategoryInfo = categories.find(
    (category) => category.id === activeCategory
  );

  const filteredQuestions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const questions = categories.flatMap((category) =>
      (faqData[category.id] || []).map((item, index) => ({
        ...item,
        categoryId: category.id,
        categoryLabel: category.label,
        originalIndex: index,
      }))
    );

    if (!normalizedQuery) {
      return (faqData[activeCategory] || []).map((item, index) => ({
        ...item,
        categoryId: activeCategory,
        categoryLabel: activeCategoryInfo?.label || "",
        originalIndex: index,
      }));
    }

    return questions.filter(
      (item) =>
        item.question.toLowerCase().includes(normalizedQuery) ||
        item.answer.toLowerCase().includes(normalizedQuery) ||
        item.categoryLabel.toLowerCase().includes(normalizedQuery)
    );
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    setOpenQuestion(filteredQuestions.length > 0 ? 0 : -1);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    if (!contactCopied) return;

    const timer = window.setTimeout(() => {
      setContactCopied(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [contactCopied]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setSearchQuery("");
    setOpenQuestion(0);
    setMobileSidebarOpen(false);
  };

  const handleQuestionToggle = (index) => {
    setOpenQuestion((previousIndex) =>
      previousIndex === index ? -1 : index
    );
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:support@odchandloom.com";
  };

  const handleLiveChatClick = () => {
    window.location.href = "/contact";
  };

  return (
    <main className="FaqMain">
      <section className="FaqMain__container">
        {/* Decorative background */}
        <div className="FaqMain__ambient FaqMain__ambient--left" />
        <div className="FaqMain__ambient FaqMain__ambient--right" />

        {/* Mobile heading */}
        <div className="FaqMain__mobileHeader">
          <div className="FaqMain__mobileBrand">
            <span className="FaqMain__eyebrow">HERE TO HELP</span>
            <h1>How can we help you?</h1>
            <p>
              Find answers to your questions about our handloom collections.
            </p>
          </div>

          <button
            type="button"
            className="FaqMain__mobileMenu"
            onClick={() => setMobileSidebarOpen((previous) => !previous)}
            aria-label={mobileSidebarOpen ? "Close categories" : "Open categories"}
            aria-expanded={mobileSidebarOpen}
          >
            {mobileSidebarOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        <div className="FaqMain__layout">
          {/* Sidebar */}
          <aside
            className={`FaqMain__sidebar ${
              mobileSidebarOpen ? "FaqMain__sidebar--open" : ""
            }`}
          >
            <div className="FaqMain__sidebarHeading">
              <span>HELP CENTRE</span>
              <p>How can we help?</p>
            </div>

            <nav
              className="FaqMain__categoryList"
              aria-label="FAQ categories"
            >
              {categories.map((category) => {
                const CategoryIcon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`FaqMain__category ${
                      isActive ? "FaqMain__category--active" : ""
                    }`}
                    onClick={() => handleCategoryChange(category.id)}
                    aria-pressed={isActive}
                  >
                    <CategoryIcon
                      className="FaqMain__categoryIcon"
                      size={16}
                      strokeWidth={1.6}
                    />

                    <span className="FaqMain__categoryLabel">
                      {category.label}
                    </span>

                    <ChevronRight
                      className="FaqMain__categoryArrow"
                      size={15}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="FaqMain__sidebarNote">
              <Flower2 size={23} strokeWidth={1.3} />
              <p>Crafted with love.</p>
              <span>Rooted in tradition.</span>
            </div>
          </aside>

          {/* FAQ Content */}
          <section className="FaqMain__content">
            <div className="FaqMain__contentHeader">
              <div className="FaqMain__heading">
                <span className="FaqMain__eyebrow">
                  POPULAR QUESTIONS
                </span>

                <h2>
                  {searchQuery.trim()
                    ? "Search Results"
                    : activeCategoryInfo?.label}
                </h2>

                <p className="FaqMain__headingDescription">
                  {searchQuery.trim()
                    ? `Answers matching "${searchQuery.trim()}"`
                    : "Everything you need to know, all in one place."}
                </p>
              </div>

              <label className="FaqMain__search">
                <Search size={16} strokeWidth={1.7} />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search your question..."
                  aria-label="Search frequently asked questions"
                />

                {searchQuery && (
                  <button
                    type="button"
                    className="FaqMain__searchClear"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </label>
            </div>

            {/* Search results */}
            {searchQuery.trim() && filteredQuestions.length > 0 && (
              <div className="FaqMain__resultCount" aria-live="polite">
                <Search size={13} />
                {filteredQuestions.length}{" "}
                {filteredQuestions.length === 1 ? "answer" : "answers"} found
              </div>
            )}

            <div className="FaqMain__questions">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((item, index) => {
                  const isOpen = openQuestion === index;

                  return (
                    <article
                      className={`FaqMain__item ${
                        isOpen ? "FaqMain__item--open" : ""
                      }`}
                      key={`${item.categoryId}-${item.originalIndex}`}
                    >
                      <button
                        type="button"
                        className="FaqMain__question"
                        onClick={() => handleQuestionToggle(index)}
                        aria-expanded={isOpen}
                      >
                        <span className="FaqMain__questionIcon">
                          {index === 0 && !searchQuery ? (
                            <ShoppingBag size={15} strokeWidth={1.6} />
                          ) : (
                            <FileText size={15} strokeWidth={1.6} />
                          )}
                        </span>

                        <span className="FaqMain__questionText">
                          {item.question}
                          {searchQuery && (
                            <small className="FaqMain__questionCategory">
                              {item.categoryLabel}
                            </small>
                          )}
                        </span>

                        <span className="FaqMain__toggle">
                          {isOpen ? (
                            <Minus size={13} strokeWidth={2.2} />
                          ) : (
                            <Plus size={13} strokeWidth={2.2} />
                          )}
                        </span>
                      </button>

                      <div
                        className={`FaqMain__answer ${
                          isOpen ? "FaqMain__answer--visible" : ""
                        }`}
                        aria-hidden={!isOpen}
                      >
                        <div className="FaqMain__answerInner">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="FaqMain__empty">
                  <div className="FaqMain__emptyIcon">
                    <Search size={25} strokeWidth={1.5} />
                  </div>

                  <h3>No matching questions found</h3>

                  <p>
                    We couldn&apos;t find an answer for &ldquo;
                    {searchQuery}&rdquo;. Try another keyword or contact our
                    friendly support team.
                  </p>

                  <button
                    type="button"
                    className="FaqMain__emptyButton"
                    onClick={() => setSearchQuery("")}
                  >
                    View popular questions
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>

            <div className="FaqMain__bottomHelp">
              <div className="FaqMain__bottomHelpIcon">
                <MessageCircle size={19} strokeWidth={1.5} />
              </div>

              <div>
                <h3>Still have a question?</h3>
                <p>We&apos;re just a message away.</p>
              </div>

              <button
                type="button"
                onClick={handleLiveChatClick}
                className="FaqMain__bottomHelpButton"
              >
                Get Help
                <ArrowRight size={15} />
              </button>
            </div>
          </section>

          {/* Contact Support Card */}
          <aside className="FaqMain__support">
            <div className="FaqMain__supportCard">
              <div className="FaqMain__supportPattern" />

              <div className="FaqMain__supportIcon">
                <Headphones size={26} strokeWidth={1.3} />
                <span className="FaqMain__supportIconDot" />
              </div>

              <div className="FaqMain__ornament">
                <span />
                <Flower2 size={14} strokeWidth={1.3} />
                <span />
              </div>

              <h3>Still Need Help?</h3>

              <p className="FaqMain__supportDescription">
                Our team is always here to assist you with any questions.
              </p>

              <button
                type="button"
                className="FaqMain__contactButton"
                onClick={handleLiveChatClick}
              >
                CONTACT US
                <ArrowRight size={15} />
              </button>

              <div className="FaqMain__ornament FaqMain__ornament--second">
                <span />
                <Flower2 size={14} strokeWidth={1.3} />
                <span />
              </div>

              <div className="FaqMain__reach">
                <h4>Reach Us</h4>

                <button
                  type="button"
                  className="FaqMain__contactItem"
                  onClick={handlePhoneClick}
                >
                  <Phone size={15} strokeWidth={1.6} />

                  <span>
                    <strong>+91 98765 43210</strong>
                    <small>(Mon - Sat, 10 AM - 7 PM)</small>
                  </span>
                </button>

                <button
                  type="button"
                  className="FaqMain__contactItem"
                  onClick={handleEmailClick}
                >
                  <Mail size={15} strokeWidth={1.6} />

                  <span>
                    <strong>support@odchandloom.com</strong>
                    <small>We reply within 24 hours</small>
                  </span>
                </button>

                <button
                  type="button"
                  className="FaqMain__contactItem"
                  onClick={handleLiveChatClick}
                >
                  <Headphones size={15} strokeWidth={1.6} />

                  <span>
                    <strong>Live Chat</strong>
                    <small>Chat with our support team</small>
                  </span>
                </button>
              </div>

              <div className="FaqMain__supportFooter">
                <Heart size={12} />
                <span>Made for your peace of mind</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Brand Benefits */}
      <section className="FaqMain__benefits">
        <div className="FaqMain__benefitsInner">
          <div className="FaqMain__benefitsIntro">
            <span className="FaqMain__eyebrow">WHY SHOP WITH</span>
            <h3>ODC-HANDLOOM?</h3>

            <div className="FaqMain__benefitsOrnament">
              <span />
              <Flower2 size={16} strokeWidth={1.3} />
              <span />
            </div>
          </div>

          <div className="FaqMain__benefit">
            <ShieldCheck
              className="FaqMain__benefitIcon"
              size={28}
              strokeWidth={1.45}
            />

            <h4>Authentic Handlooms</h4>

            <p>
              Pure and genuine handloom
              <br />
              collections from across India.
            </p>
          </div>

          <div className="FaqMain__benefit">
            <Truck
              className="FaqMain__benefitIcon"
              size={28}
              strokeWidth={1.45}
            />

            <h4>Secure &amp; Fast Delivery</h4>

            <p>
              Safe packaging with reliable
              <br />
              shipping partners.
            </p>
          </div>

          <div className="FaqMain__benefit">
            <RotateCcw
              className="FaqMain__benefitIcon"
              size={28}
              strokeWidth={1.45}
            />

            <h4>Easy Returns</h4>

            <p>
              Hassle-free 7 day
              <br />
              return policy.
            </p>
          </div>

          <div className="FaqMain__benefit">
            <Headphones
              className="FaqMain__benefitIcon"
              size={28}
              strokeWidth={1.45}
            />

            <h4>Dedicated Support</h4>

            <p>
              We&apos;re here to help
              <br />
              you always.
            </p>
          </div>
        </div>
      </section>

      {/* Traditional decorative footer */}
      <footer className="FaqMain__footer">
        <div className="FaqMain__footerPattern" />

        <p>
          <span>WEAVING TRADITIONS, DRESSING TOMORROWS</span>
        </p>
      </footer>
    </main>
  );
};

export default FaqMain;