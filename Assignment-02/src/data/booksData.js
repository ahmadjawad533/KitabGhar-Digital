/**
 * ============================================================================
 * KITABGHAR BOOKSTORE - SAMPLE BOOKS DATASET
 * ============================================================================
 * For Students:
 * In a real-world web application, this data often comes from an API or database.
 * Storing data in a JavaScript array of objects like this allows us to learn
 * and practice:
 * 1. Array methods: .filter(), .map(), .find()
 * 2. Object properties & destructuring
 * 3. Passing data via React Props to components
 * ============================================================================
 */

export const INITIAL_BOOKS = [
  // -------------------------------------------------------------
  // PDF BOOKS (local sample entries; PDF files are not bundled)
  // -------------------------------------------------------------
  {
    id: 11,
    title: "HTML & CSS: A Student Workbook",
    author: "KitabGhar Learning Team",
    category: "PDF Books",
    bookType: "PDF",
    coverTheme: "cover-web",
    coverIcon: "📄",
    formatPill: "📄 PDF Document",
    pillTag: "Web Fundamentals",
    rating: "★ 4.8",
    description:
      "A sample workbook covering semantic HTML, forms, CSS selectors, and responsive layouts with practical classroom exercises.",
    metaChips: ["PDF Edition", "HTML & CSS", "Sample Catalog"],
    price: "Free",
    priceSubtitle: "Sample PDF Edition",
    isAudio: false,
    isRtl: false,
    chapters: ["Semantic HTML", "Forms and Inputs", "CSS Selectors", "Responsive Layouts"],
    previewExcerpt:
      "Start with a meaningful document structure, then use CSS to control spacing, typography, and layout. Practice by building a responsive bookstore page."
  },
  {
    id: 12,
    title: "JavaScript Practice Handbook",
    author: "KitabGhar Learning Team",
    category: "PDF Books",
    bookType: "PDF",
    coverTheme: "cover-prog",
    coverIcon: "JS",
    formatPill: "📄 PDF Document",
    pillTag: "Programming Exercises",
    rating: "★ 4.7",
    description:
      "A sample handbook of JavaScript exercises covering variables, functions, arrays, objects, and events for beginning programmers.",
    metaChips: ["PDF Edition", "JavaScript", "Sample Catalog"],
    price: "Free",
    priceSubtitle: "Sample PDF Edition",
    isAudio: false,
    isRtl: false,
    chapters: ["Variables and Types", "Functions", "Arrays and Objects", "Browser Events"],
    previewExcerpt:
      "Represent a catalog as an array of objects. Use filter to select matching books, map to display them, and reduce to calculate cart totals."
  },
  {
    id: 13,
    title: "Introduction to Astronomy: Study Notes",
    author: "KitabGhar Learning Team",
    category: "PDF Books",
    bookType: "PDF",
    coverTheme: "cover-science",
    coverIcon: "🔭",
    formatPill: "📄 PDF Document",
    pillTag: "Science Essentials",
    rating: "★ 4.6",
    description:
      "Sample introductory study notes exploring the solar system, stars, galaxies, and the basics of observing the night sky.",
    metaChips: ["PDF Edition", "Astronomy", "Sample Catalog"],
    price: "Free",
    priceSubtitle: "Sample PDF Edition",
    isAudio: false,
    isRtl: false,
    chapters: ["Our Solar System", "Stars and Light", "Galaxies", "Observing the Night Sky"],
    previewExcerpt:
      "Begin observing with the Moon and bright planets. Record what you see, the time of observation, and the conditions to compare the sky across different nights."
  },

  // -------------------------------------------------------------
  // AUDIO BOOKS
  // -------------------------------------------------------------
  {
    id: 1,
    title: "The Art of Clean Code (Audio Edition)",
    author: "🎙️ Narrated by David Vance • by Robert Martin",
    category: "Audio Books",
    coverTheme: "cover-audio",
    coverIcon: "🎧",
    formatPill: "⏱️ 8h 45m",
    pillTag: "Dolby Atmos MP3",
    rating: "★ 4.9",
    description:
      "A narrated audio guide to writing elegant, maintainable, and agile software. Includes chapter bookmarks and author commentaries.",
    metaChips: ["🎧 Audio Format", "12 Chapters", "English"],
    price: "$18.99",
    priceSubtitle: "Audiobook MP3",
    isAudio: true,
    isRtl: false,
    audioTrack: {
      chapter: "Chapter 1: The Foundation of Clean Code",
      duration: "08:45",
      sampleTime: "02:14 / 08:45"
    },
    previewExcerpt:
      '🎧 Sample Track Excerpt: "Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. Welcome to Chapter 1."'
  },
  {
    id: 2,
    title: "داستان امیر حمزہ — صوتی کتاب (Dastan-e-Amir Hamza)",
    author: "🎙️ صداکاری: ضیاء محی الدین • کلاسیک اردو داستان",
    category: "Audio Books",
    coverTheme: "cover-audio",
    coverIcon: "🎙️",
    formatPill: "⏱️ 11h 20m",
    pillTag: "Narrated Drama",
    rating: "★ 4.8",
    description:
      "اردو ادب کی معروف داستان امیر حمزہ کا صوتی شاہکار۔ دلکش پس پردہ موسیقی اور جاندار صداکاری کے ساتھ۔",
    metaChips: ["🎧 Urdu Audio", "Unabridged", "High Bitrate"],
    price: "Rs. 1,450",
    priceSubtitle: "Audiobook Digital",
    isAudio: true,
    isRtl: true,
    audioTrack: {
      chapter: "باب اوّل: داستانِ طلسُم ہوشربا کا آغاز",
      duration: "11:20",
      sampleTime: "03:40 / 11:20"
    },
    previewExcerpt:
      "صوتی نمونہ: طلسم ہوشربا کے جادوئی باغات اور امیر حمزہ کی بہادری کے لازوال قصے، معروف صداکار ضیاء محی الدین کی پرتاثیر آواز میں۔"
  },
  {
    id: 3,
    title: "Deep Work: Rules for Focused Success",
    author: "🎙️ Narrated by Jeff Hays • by Cal Newport",
    category: "Audio Books",
    coverTheme: "cover-audio",
    coverIcon: "📻",
    formatPill: "⏱️ 6h 30m",
    pillTag: "Mind & Focus",
    rating: "★ 4.7",
    description:
      "Master the ability to focus without distraction on cognitively demanding tasks in an era filled with digital noise.",
    metaChips: ["🎧 Audiobook", "English", "Speed Control"],
    price: "$16.50",
    priceSubtitle: "Audiobook MP3",
    isAudio: true,
    isRtl: false,
    audioTrack: {
      chapter: "Introduction: Deep Work is the Superpower of the 21st Century",
      duration: "06:30",
      sampleTime: "01:50 / 06:30"
    },
    previewExcerpt:
      '🎧 Audio Excerpt: "Deep work is an indispensable skill. To thrive in the new economy you must master the art of quickly learning hard things."'
  },

  // -------------------------------------------------------------
  // UNICODE BOOKS (Urdu Nastaliq & Arabic UTF-8)
  // -------------------------------------------------------------
  {
    id: 4,
    title: "دیوانِ غالب (Diwan-e-Ghalib)",
    author: "مرزا اسد اللہ خان غالب • مکمل تصحیح شدہ متن",
    category: "Unicode Books",
    coverTheme: "cover-unicode",
    coverScriptPreview: "دیوانِ غالبؔ",
    formatPill: "🔤 UTF-8 Text",
    pillTag: "نستعلیق یونی کوڈ",
    rating: "★ 5.0",
    description:
      "مرزا غالب کی تمام اردو غزلوں، قصائد اور قطعات پر مشتمل جدید یونی کوڈ ایڈیشن۔ مکمل قابلِ تلاش اور کاپی کرنے کی سہولت۔",
    metaChips: ["🔤 Unicode Nastaliq", "اردو (Urdu)", "Searchable Text"],
    price: "Rs. 950",
    priceSubtitle: "Unicode E-Book",
    isAudio: false,
    isRtl: true,
    previewExcerpt:
      "نقش فریادی ہے کس کی شوخیِ تحریر کا\nکاغذی ہے پیرہن ہر پیکرِ تصویر کا\n\nبس کہ ہوں غالبؔ اسیری میں بھی آتش زیرِ پا\nموئے آتش دیدہ ہے حلقہ مری زنجیر کا"
  },
  {
    id: 5,
    title: "کلیاتِ اقبال (Kulliyat-e-Iqbal)",
    author: "علامہ محمد اقبال • بانگِ درا، بالِ جبریل، ضربِ کلیم",
    category: "Unicode Books",
    coverTheme: "cover-unicode",
    coverScriptPreview: "کلیاتِ اقبالؔ",
    formatPill: "🔤 Multilingual UTF-8",
    pillTag: "اردو و فارسی",
    rating: "★ 4.9",
    description:
      "شاعرِ مشرق علامہ اقبال کا مکمل کلام مستند یونی کوڈ فارمیٹ میں۔ تفصیلی فرہنگ اور لغت کے حوالہ جات کے ساتھ۔",
    metaChips: ["🔤 Unicode UTF-8", "Urdu & Persian", "E-Reader Ready"],
    price: "Rs. 1,200",
    priceSubtitle: "Unicode E-Book",
    isAudio: false,
    isRtl: true,
    previewExcerpt:
      "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے\nخدا بندے سے خود پوچھے بتا تیری رضا کیا ہے\n\nستاروں سے آگے جہاں اور بھی ہیں\nابھی عشق کے امتحاں اور بھی ہیں"
  },
  {
    id: 6,
    title: "مختارات من الأدب العربي (Arabic Literature Reader)",
    author: "د. طارق منصور • نصوص أدبية مشكولة بالكامل",
    category: "Unicode Books",
    coverTheme: "cover-unicode",
    coverScriptPreview: "مختارات من الأدب العربي",
    formatPill: "🔤 Arabic Unicode",
    pillTag: "عربي مشكول",
    rating: "★ 4.8",
    description:
      "کلاسیکی اور معاصر عربی ادب کے منتخب شہکار اعراب اور مکمل یونی کوڈ فارمیٹ میں۔ طلبہ اور محققین کے لیے بہترین انتخاب۔",
    metaChips: ["🔤 Tashkeel Unicode", "Arabic", "Copy & Paste"],
    price: "$14.99",
    priceSubtitle: "Unicode E-Book",
    isAudio: false,
    isRtl: true,
    previewExcerpt:
      "العِلْمُ يَبْنِي بُيُوتًا لَا عِمَادَ لَهَا .. وَالجَهْلُ يَهْدِمُ بَيْتَ العِزِّ وَالشَّرَفِ\n\nنص أدبي محقق ومضبوط بالشكل التام لتسهيل القراءة والتعلم الأكاديمي."
  },

  // -------------------------------------------------------------
  // WEB DEVELOPMENT
  // -------------------------------------------------------------
  {
    id: 7,
    title: "HTML5 & Responsive Web Architecture",
    author: "✍️ Sara Ahmed • 3rd Edition",
    category: "Web Development",
    coverTheme: "cover-web",
    coverIcon: "</>",
    formatPill: "🌐 Frontend",
    pillTag: "HTML5 & CSS3",
    rating: "★ 4.8",
    description:
      "Build modern, accessible, and fast websites with semantic HTML elements, modern layouts, and mobile-friendly design principles.",
    metaChips: ["HTML5", "Accessibility", "PDF + Code"],
    price: "$15.00",
    priceSubtitle: "Digital E-Book",
    isAudio: false,
    isRtl: false,
    previewExcerpt:
      'Chapter Excerpt: "Semantic HTML is the backbone of accessible design. Use <header>, <nav>, <main>, <article>, and <footer> so screen readers and search engines can parse your content effectively."'
  },
  {
    id: 8,
    title: "CSS & Creative Responsive Layouts",
    author: "✍️ Ali Hassan • Web Technologies Specialist",
    category: "Web Development",
    coverTheme: "cover-web",
    coverIcon: "{ }",
    formatPill: "🎨 Styling",
    pillTag: "CSS Grid",
    rating: "★ 4.7",
    description:
      "Unlock the power of CSS Grid, Flexbox, transitions, custom properties, and modern animations for clean frontend engineering.",
    metaChips: ["CSS3", "Flexbox & Grid", "Interactive"],
    price: "$13.50",
    priceSubtitle: "Digital E-Book",
    isAudio: false,
    isRtl: false,
    previewExcerpt:
      'Chapter Excerpt: "CSS Grid gives you two-dimensional control over columns and rows, while Flexbox shines at one-dimensional alignment. Combining them creates resilient responsive designs."'
  },

  // -------------------------------------------------------------
  // PROGRAMMING
  // -------------------------------------------------------------
  {
    id: 9,
    title: "JavaScript Made Simple & Effective",
    author: "✍️ Ayesha Khan • Full Stack Engineer",
    category: "Programming",
    coverTheme: "cover-prog",
    coverIcon: "JS",
    formatPill: "⚡ JavaScript",
    pillTag: "ES2026",
    rating: "★ 4.9",
    description:
      "From core variables and DOM manipulation to async/await, closures, and modern framework concepts with hands-on examples.",
    metaChips: ["JavaScript", "ESNext", "Projects"],
    price: "$19.99",
    priceSubtitle: "Digital E-Book",
    isAudio: false,
    isRtl: false,
    previewExcerpt:
      'Chapter Excerpt: "JavaScript is the engine of interactivity on the web. Understanding state, event listeners, and asynchronous fetching enables you to master React and modern frontend frameworks."'
  },

  // -------------------------------------------------------------
  // SCIENCE
  // -------------------------------------------------------------
  {
    id: 10,
    title: "A Little Book of Space & Cosmos",
    author: "✍️ Hina Shah • Science Writer",
    category: "Science",
    coverTheme: "cover-science",
    coverIcon: "✦",
    formatPill: "🌌 Astronomy",
    pillTag: "Astrophysics",
    rating: "★ 4.6",
    description:
      "An illuminating exploration of galaxies, black holes, nebulae, and our quest to understand humanity's place in the universe.",
    metaChips: ["Science", "Astronomy", "Illustrated"],
    price: "$11.00",
    priceSubtitle: "Digital E-Book",
    isAudio: false,
    isRtl: false,
    previewExcerpt:
      'Chapter Excerpt: "Look up at the night sky. The light you see from distant stars has traveled for millions of years across cosmic voids, carrying echoes of the universe\'s earliest moments."'
  }
];

export const CATEGORIES = [
  { label: "🌟 All Books", value: "All" },
  { label: "📄 PDF Books", value: "PDF Books" },
  { label: "🔤 Unicode Books", value: "Unicode Books" },
  { label: "🎧 Audio Books", value: "Audio Books" },
  { label: "💻 Web Development", value: "Web Development" },
  { label: "⚙️ Programming", value: "Programming" },
  { label: "🔬 Science", value: "Science" }
];
