import { createContext, useContext, useEffect, useMemo, useState, type ReactNode, createElement } from "react";

export type Lang = "EN" | "AR" | "KU";

const translations = {
  EN: {
    nav: {
      home: "Home",
      services: "Services",
      resources: "Resources",
      team: "Team",
      about: "About",
      contact: "Contact",
      quote: "Get a Quote",
      breached: "Breached?",
    },
    header: {
      language: "Language",
      contact: "Contact",
      breached: "Breached?",
      keywords: ["EN", "AR", "KU"],
    },
    hero: {
      title: ["Identify Security Gaps", "Before Attackers Do"],
      subtitle: "Protect your business through proactive defence, offensive testing, strategic consultancy, and practical cyber training.",
      cta: "Book a Security Assessment",
      builtOn: "Built on",
      frameworks: ["NIST", "OWASP", "MITRE"],
      services: [
        {
          title: "Cyber Defence",
          subtitle: "Proactive Monitoring & Response",
          items: [
            "24/7 Security Operation Center (SOC)",
            "Vulnerability Management",
            "Incident Detection & Response",
          ],
        },
        {
          title: "Cyber Offensive",
          subtitle: "Identify & Exploit Weaknesses",
          items: ["Penetration Testing", "Red Teaming", "Attack Surface Discovery"],
        },
        {
          title: "Consultancy",
          subtitle: "Strategic Advisory & Guidance",
          items: ["Security Strategy", "Compliance Advisory", "Risk Assessment"],
        },
        {
          title: "Cyber Training",
          subtitle: "Build Cyber Resilience & Awareness",
          items: ["Awareness Training", "Technical Workshops", "Executive Security Training"],
        },
      ],
    },
    trustBar: {
      title: ["Trusted Cyber", "Security Standards"],
      desc: "Dedicated to industry-leading security standards and frameworks.",
    },
    problem: {
      eyebrow: "Why we do it",
      headline: ["Cybersecurity that speaks your language", "and protects what matters."],
      body: "Cybersecurity is too often complex, costly, and hard to understand, leaving many businesses without the protection they need. At ArasKa Cyber Core, we're changing that.",
      pillars: [
        {
          title: "Business-First",
          desc: "We learn how you operate, then tailor protection to your reality — never generic advice.",
        },
        {
          title: "Your Language",
          desc: "Every report, briefing, and training in Kurdish, Arabic, or English for real clarity.",
        },
        {
          title: "Always-On Defence",
          desc: "Keep your business running, your data secure, and your people prepared as threats evolve.",
        },
        {
          title: "Rapid Response",
          desc: "When it matters most, a partner who knows your environment and acts within minutes.",
        },
      ],
      quote: "Because it's a matter of when, not if you deserve a partner who responds swiftly and acts when it matters most.",
    },
    servicesOverview: {
      eyebrow: "What We Do",
      title: "End-to-End Cybersecurity Services",
      subtitle: "Tailored to your organisation's size, industry, and risk profile.",
      primaryServices: [
        {
          title: "24/7 Proactive Monitoring (SOC)",
          desc: "We track the attackers who target your industry, so you know what to defend against before they strike.",
          slug: "soc-as-a-service",
        },
        {
          title: "Threat & Risk Analysis (Intel & Assessment)",
          desc: "We track the attackers who target your industry, so you know what to defend against — before they strike.",
          slug: "threat-risk-analysis",
        },
        {
          title: "Emergency Response & Security Training",
          desc: "Fast incident containment plus practical staff training to reduce human error and recover faster.",
          slug: "emergency-response-training",
        },
      ],
      secondaryServices: [
        { title: "Vulnerability Management", slug: "vulnerability-management" },
        { title: "vCISO Advisory", slug: "vciso-advisory" },
        { title: "M365 Security Hardening", slug: "m365-hardening" },
        { title: "Security Policy Development", slug: "security-policy-development" },
      ],
      liveStatus: {
        active: "Live · Activity Detected",
        normal: "Live · Monitoring",
      },
      learnMore: "Learn More",
    },
    statsSection: {
      eyebrow: "By the Numbers",
      title: "Why Choose ArasKa Cyber Core?",
      subtitle: "Real results, measured every day. Here's the impact we deliver for our clients.",
      cards: [
        {
          label: "Compliance",
          desc: "Aligned with global NIST & OWASP standards",
        },
        {
          label: "Response Time",
          desc: "Target critical incident response time",
        },
        {
          label: "Live Monitoring",
          desc: "Around-the-clock proactive monitoring",
        },
        {
          label: "Data Loss Margin",
          desc: "Tolerance for client data loss in our incident response plans",
        },
      ],
    },
    ctaBanner: {
      headline: "Ready to take cyber security seriously?",
      body: "Tell us about your business and we will send you a clear, tailored proposal. No pressure. No generic packages.",
      healthCheck: "Take The Health Check",
      quote: "Get a Quote",
    },
    footer: {
      servicesTitle: "Services",
      companyTitle: "Company",
      contactTitle: "Contact",
      tagline: "Identify Security Gaps Before Attackers Do",
      services: [
        { label: "24/7 Proactive Monitoring (SOC)", href: "/services#soc-as-a-service" },
        { label: "Threat & Risk Analysis", href: "/services#threat-risk-analysis" },
        { label: "Emergency Response & Training", href: "/services#emergency-response-training" },
        { label: "Vulnerability Management", href: "/services#vulnerability-management" },
        { label: "vCISO Advisory", href: "/services#vciso-advisory" },
        { label: "Microsoft 365 Security Hardening", href: "/services#m365-hardening" },
        { label: "Security Policy Development", href: "/services#security-policy-development" },
      ],
      company: ["Home", "About", "Services", "Team", "Resources", "Cyber Health Check", "Get a Quote", "Contact"],
      email: "info@araskacyber.com",
      location: "United Kingdom",
      copyright: "© {year} Araska Cyber Core. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    about: {
      section: "About Us",
      heroTitle: ["Cybersecurity Made", "Practical, Accessible, and Effective."],
      heroBody: "At Araska Cyber Core, we help businesses strengthen their security posture through practical, structured, and business-focused cybersecurity services.",
      whoWeAre: {
        eyebrow: "Who We Are",
        title: "Built to close a critical gap.",
        body1: "Founded by experienced cybersecurity professionals, Araska Cyber Core was built to close a critical gap in the Kurdistan Region market where many organisations face growing cyber threats but lack access to dedicated, affordable, and locally understood security expertise.",
        body2: "With a registered entity in the United Kingdom and operational delivery in Erbil, we combine international credibility with local market understanding to deliver cybersecurity that is practical, accessible, and effective.",
        stats1: "Registered in the UK",
        stats2: "Delivered from Erbil",
      },
      whatWeDo: {
        eyebrow: "What We Do",
        title: "Cybersecurity across four core areas.",
        body: "A full-spectrum service model designed around how modern businesses actually operate.",
      },
      whoWeServe: {
        eyebrow: "Who We Serve",
        title: "From SMBs to sector-focused enterprises.",
        body: "We work with small and medium-sized businesses, growing enterprises, and sector-focused organisations across the Kurdistan Region and wider Iraq industries where cyber resilience is no longer optional.",
        sectors: ["Energy", "Healthcare", "Financial Services", "Education", "Technology"],
      },
      whyAraska: {
        eyebrow: "Why Araska Cyber Core",
        title: "What makes us different is simple.",
        differentiators: [
          "Local market understanding with international standards",
          "Security delivered in Kurdish, Arabic, and English",
          "Microsoft-first security expertise across Microsoft security technologies",
          "Structured security lifecycle approach",
          "Long-term security partnerships, not one-off engagements",
        ],
        closing: "We don't believe cybersecurity should be complicated, overpriced, or disconnected from business reality. We believe it should be clear, actionable, and built around the client.",
      },
      mission: {
        heading1: "Our mission",
        heading2: "Keep business leaders confidently in control of cyber risk.",
        body: "We support organisations with practical security services, clear communication, and locally relevant coaching so every business decision is made from a place of informed confidence.",
      },
    },
    contact: {
      eyebrow: "Reach Out",
      title: "Get in Touch",
      body: "Whether you have a quick question or want to start a conversation about your security, we are here.",
      labels: {
        name: "Full Name *",
        email: "Work Email *",
        org: "Organisation",
        message: "Message *",
        send: "Send Message",
      },
      successTitle: "Message Sent",
      successBody: "We'll get back to you within one business day.",
      info: [
        { title: "Email", content: "info@araskacyber.com" },
        { title: "Headquarters", content: "United Kingdom" },
        { title: "Response Time", content: "We aim to respond to all enquiries within one business day." },
      ],
    },
  },
  AR: {
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      resources: "الموارد",
      team: "الفريق",
      about: "من نحن",
      contact: "اتصل بنا",
      quote: "اطلب عرض سعر",
      breached: "مخترق؟",
    },
    header: {
      language: "اللغة",
      contact: "اتصل بنا",
      breached: "مخترق؟",
      keywords: ["EN", "AR", "KU"],
    },
    hero: {
      title: ["اكتشف ثغرات الأمان", "قبل أن يفعلها المهاجمون"],
      subtitle: "احمِ عملك من خلال الدفاع الاستباقي، الاختبار الهجومي، الاستشارات الاستراتيجية، والتدريب السيبراني العملي.",
      cta: "احجز تقييم أمني",
      builtOn: "مبني على",
      frameworks: ["NIST", "OWASP", "MITRE"],
      services: [
        {
          title: "الدفاع السيبراني",
          subtitle: "المراقبة والاستجابة الاستباقية",
          items: [
            "مركز عمليات أمنية 24/7 (SOC)",
            "إدارة الثغرات",
            "الكشف عن الحوادث والاستجابة لها",
          ],
        },
        {
          title: "الهجوم السيبراني",
          subtitle: "تحديد واستغلال نقاط الضعف",
          items: ["اختبار الاختراق", "الهندسة العكسية", "اكتشاف سطح الهجوم"],
        },
        {
          title: "الاستشارات",
          subtitle: "الإرشاد الاستراتيجي والتوجيه",
          items: ["استراتيجية الأمان", "استشارات الامتثال", "تقييم المخاطر"],
        },
        {
          title: "التدريب السيبراني",
          subtitle: "بناء المرونة والوعي السيبراني",
          items: ["تدريب الوعي", "ورش العمل التقنية", "تدريب تنفيذي"],
        },
      ],
    },
    trustBar: {
      title: ["معايير", "أمنية موثوقة"],
      desc: "ملتزمون بأعلى معايير وإطارات العمل الأمنية.",
    },
    problem: {
      eyebrow: "لماذا نفعل ذلك",
      headline: ["أمن إلكتروني يتحدث لغتك", "ويحمي ما يهمك."],
      body: "غالباً ما يكون الأمن السيبراني معقداً ومكلفاً ومن الصعب فهمه، مما يترك العديد من الشركات بدون الحماية التي تحتاجها. في أراساكا سايبر كور، نحن نغيّر ذلك.",
      pillars: [
        {
          title: "ركز على العمل",
          desc: "نستوعب طريقة عملك ثم نبني الحماية وفق واقعك — لا نصائح عامة.",
        },
        {
          title: "لغتك",
          desc: "كل تقرير، إيجاز، وتدريب بالكردية أو العربية أو الإنجليزية لوضوح حقيقي.",
        },
        {
          title: "دفاع دائم",
          desc: "نحافظ على استمرار عملك، وسلامة بياناتك، واستعداد فريقك مع تطور التهديدات.",
        },
        {
          title: "استجابة سريعة",
          desc: "عندما يكون الأمر مهماً، شريك يعرف بيئتك ويتحرك خلال دقائق.",
        },
      ],
      quote: "لأنها مسألة متى، وليست إذا، تستحق شريكاً يستجيب بسرعة ويتحرك عندما يكون الأمر في غاية الأهمية.",
    },
    servicesOverview: {
      eyebrow: "ما الذي نقدمه",
      title: "خدمات أمن سيبراني شاملة",
      subtitle: "مصممة لحجم منظمتك وصناعتك ومستوى المخاطر لديك.",
      primaryServices: [
        {
          title: "مراقبة استباقية 24/7 (SOC)",
          desc: "نراقب المهاجمين الذين يستهدفون صناعتك، حتى تعرف ما تدافع عنه قبل أن يهاجموا.",
          slug: "soc-as-a-service",
        },
        {
          title: "تحليل التهديد والمخاطر",
          desc: "نراقب المهاجمين الذين يستهدفون صناعتك، حتى تعرف ما تدافع عنه — قبل أن يضربوا.",
          slug: "threat-risk-analysis",
        },
        {
          title: "استجابة الطوارئ وتدريب الأمن",
          desc: "احتواء سريع للحوادث بالإضافة إلى تدريب عملي للموظفين لتقليل الخطأ البشري والتعافي أسرع.",
          slug: "emergency-response-training",
        },
      ],
      secondaryServices: [
        { title: "إدارة الثغرات", slug: "vulnerability-management" },
        { title: "استشارات vCISO", slug: "vciso-advisory" },
        { title: "تحصين Microsoft 365", slug: "m365-hardening" },
        { title: "تطوير سياسات الأمن", slug: "security-policy-development" },
      ],
      liveStatus: {
        active: "مباشر · تم اكتشاف نشاط",
        normal: "مباشر · تحت المراقبة",
      },
      learnMore: "تعرف أكثر",
    },
    statsSection: {
      eyebrow: "من الأرقام",
      title: "لماذا تختار ArasKa Cyber Core؟",
      subtitle: "نتائج حقيقية، تُقاس كل يوم. إليك الأثر الذي نقدمه لعملائنا.",
      cards: [
        {
          label: "التوافق",
          desc: "متوافق مع معايير NIST و OWASP العالمية",
        },
        {
          label: "زمن الاستجابة",
          desc: "نستهدف وقت استجابة للحوادث الحرجة",
        },
        {
          label: "المراقبة الحية",
          desc: "مراقبة استباقية على مدار الساعة",
        },
        {
          label: "هامش فقدان البيانات",
          desc: "تحمل فقدان بيانات العميل في خطط استجابتنا للحوادث",
        },
      ],
    },
    ctaBanner: {
      headline: "هل أنت مستعد لتأخذ الأمن السيبراني بجدية؟",
      body: "أخبرنا عن عملك وسنرسل لك اقتراحاً واضحاً ومخصصاً. بدون ضغوط. بدون حزم عامة.",
      healthCheck: "قم بفحص الصحة",
      quote: "احصل على عرض سعر",
    },
    footer: {
      servicesTitle: "الخدمات",
      companyTitle: "الشركة",
      contactTitle: "اتصل",
      tagline: "اكتشف ثغرات الأمان قبل أن يفعلها المهاجمون",
      services: [
        { label: "المراقبة الاستباقية 24/7 (SOC)", href: "/services#soc-as-a-service" },
        { label: "تحليل التهديد والمخاطر", href: "/services#threat-risk-analysis" },
        { label: "استجابة الطوارئ والتدريب", href: "/services#emergency-response-training" },
        { label: "إدارة الثغرات", href: "/services#vulnerability-management" },
        { label: "استشارات vCISO", href: "/services#vciso-advisory" },
        { label: "تحصين Microsoft 365", href: "/services#m365-hardening" },
        { label: "تطوير سياسات الأمن", href: "/services#security-policy-development" },
      ],
      company: ["الرئيسية", "من نحن", "الخدمات", "الفريق", "الموارد", "فحص الصحة السيبرانية", "اطلب عرض سعر", "اتصل بنا"],
      email: "info@araskacyber.com",
      location: "المملكة المتحدة",
      copyright: "© {year} أراساكا سايبر كور. جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
    },
    about: {
      section: "من نحن",
      heroTitle: ["الأمن السيبراني", "العملي، المتاح، والفعال."],
      heroBody: "في أراساكا سايبر كور، نساعد الشركات على تعزيز موقفها الأمني من خلال خدمات أمنية عملية، منظمة، وتركز على العمل.",
      whoWeAre: {
        eyebrow: "من نحن",
        title: "أنشأنا لسد فجوة حرجة.",
        body1: "أسسها متخصصون محترفون في الأمن السيبراني، أراساكا سايبر كور أنشئت لسد فجوة حرجة في سوق إقليم كردستان حيث تواجه العديد من المنظمات تهديدات إلكترونية متزايدة وتفتقر إلى خبرة متخصصة وميسورة التكلفة ومفهومة محلياً.",
        body2: "مع كيان مسجل في المملكة المتحدة وتسليم تشغيلي في أربيل، نجمع بين المصداقية الدولية وفهم السوق المحلي لتقديم أمن سيبراني عملي، متاح وفعال.",
        stats1: "مسجل في المملكة المتحدة",
        stats2: "مقدم من أربيل",
      },
      whatWeDo: {
        eyebrow: "ما الذي نقدمه",
        title: "أمن سيبراني عبر أربعة مجالات أساسية.",
        body: "نموذج خدمة شامل مصمم بناءً على كيفية عمل الشركات الحديثة فعلياً.",
      },
      whoWeServe: {
        eyebrow: "من نخدم",
        title: "من الشركات الصغيرة إلى الشركات المخصصة للقطاعات.",
        body: "نعمل مع الشركات الصغيرة والمتوسطة والمؤسسات المتنامية والمنظمات الموجهة للقطاعات في إقليم كردستان وشمال العراق حيث لم يعد المرونة السيبرانية خياراً.",
        sectors: ["الطاقة", "الرعاية الصحية", "الخدمات المالية", "التعليم", "التكنولوجيا"],
      },
      whyAraska: {
        eyebrow: "لماذا أراساكا سايبر كور",
        title: "ما يميزنا بسيط.",
        differentiators: [
          "فهم السوق المحلي مع المعايير الدولية",
          "أمن بلغة الكردية والعربية والإنجليزية",
          "خبرة أمنية ترتكز على Microsoft عبر تقنياتها الأمنية",
          "نهج دورة حياة أمنية منظم",
          "شراكات أمنية طويلة الأمد، لا تعاملات مؤقتة",
        ],
        closing: "نحن لا نعتقد أن الأمن السيبراني يجب أن يكون معقداً أو مكلفاً أو منفصلاً عن واقع العمل. نعتقد أنه يجب أن يكون واضحاً وقابلاً للتنفيذ ومبني حول العميل.",
      },
      mission: {
        heading1: "مهمتنا",
        heading2: "إبقاء القادة التجاريين مسيطرين بثقة على مخاطر الأمن السيبراني.",
        body: "ندعم المنظمات بخدمات أمنية عملية، تواصل واضح، وتدريب محلي ذي صلة حتى يتم اتخاذ كل قرار عمل من مكان فهم واثق.",
      },
    },
    contact: {
      eyebrow: "تواصل معنا",
      title: "اتصل بنا",
      body: "سواء كان لديك سؤال سريع أو ترغب في بدء محادثة حول أمنك، نحن هنا.",
      labels: {
        name: "الاسم الكامل *",
        email: "البريد الإلكتروني *",
        org: "المنظمة",
        message: "الرسالة *",
        send: "إرسال الرسالة",
      },
      successTitle: "تم إرسال الرسالة",
      successBody: "سوف نرد عليك خلال يوم عمل واحد.",
      info: [
        { title: "البريد الإلكتروني", content: "info@araskacyber.com" },
        { title: "المقر الرئيسي", content: "المملكة المتحدة" },
        { title: "وقت الاستجابة", content: "نسعى للرد على جميع الاستفسارات خلال يوم عمل واحد." },
      ],
    },
  },
  KU: {
    nav: {
      home: "ماڵەوە",
      services: "خزمەتگوزاریەکان",
      resources: "سەرچاوەکان",
      team: "تیمی",
      about: "دەربارە",
      contact: "پەیوەندیمان پێوە",
      quote: "داواکاری نرخ",
      breached: "هەڵەیە؟",
    },
    header: {
      language: "زمان",
      contact: "پەیوەندیمان پێوە",
      breached: "هەڵەیە؟",
      keywords: ["EN", "AR", "KU"],
    },
    hero: {
      title: ["کێشەکانی سەلامەتی دەربژارە", "پێش ئەوەی دەستبەدەست بکەن"],
      subtitle: "کەسەڵاتەکانی کارەکەت بچۆنەوە بە ڕێگای پاراستنی پێشکەوتوو، تاقیکردنەوەی هێز، ڕاهێنان، و فێرکاری سیبرە.",
      cta: "پێشکەشنامەی پاراستنەکەت بنێرە",
      builtOn: "سەر بناغە",
      frameworks: ["NIST", "OWASP", "MITRE"],
      services: [
        {
          title: "پاراستنی سایبەر",
          subtitle: "چاوەڕوانی پێشبین و وەلامدانی",
          items: [
            "سەنتەری کارەکانی ئاسودەیی 24/7 (SOC)",
            "بەڕێوەبردنی ناتەواوەکان",
            "دۆزینەوە و وەلامدانی ڕووداو",
          ],
        },
        {
          title: "هێزکردنی هێز",
          subtitle: "دۆزینەوە و بەکارهێنانی نەتەوەکانی ناتەواو",
          items: ["تاقیکردنەوەی پێناق", "ڕێڕەوی سوور", "دۆزینەوەی تەواوی سەطحی هێرەش"],
        },
        {
          title: "ڕاهێنان",
          subtitle: "ڕێنمایی ستراتیژیک و ڕێکخستن",
          items: ["ستراتیجیاسی ئاسودەیی", "ڕاهێنانی پاڵپشتی", "ھێزکردنی خەتەر"],
        },
        {
          title: "فێرکاری سایبەر",
          subtitle: "دابینکردنی توانای ئاسودەیی و هەستیارî",
          items: ["فێرکاری ئاگاداری", "Workshop-ی تەکنیکی", "فێرکاری بەرێوەبەر"],
        },
      ],
    },
    trustBar: {
      title: ["پارێزگاری", "ئاسودەییەکان"],
      desc: "بە ئامادەبوون بۆ ستانداردەکانی پێشکەوتوو و فڕیموەرکەکان.",
    },
    problem: {
      eyebrow: "بۆچی ئەمە دەکەین",
      headline: ["پاراستنی ئەمنی کە زمانت دەقیسانێ", "و ئەو شتانە پارێزات کە گرینگە."],
      body: "زیاتر قەدەغەی سیبرە زۆر زۆر کێشە، قیمەتی زۆر، و ناتوانراوە بفێڕدرێت، بۆیە زۆر کەسب و کارەکان بە پاراستنی پێویست نەرسین. لە ئاراسکا سایبەر کور، ئەمە دەگۆڕین.",
      pillars: [
        {
          title: "سەرەتایی بۆ کەسب و کار",
          desc: "ئێمە فێری چۆنیەتی کارکردنت دەبینین، دواتر پاراستن چەند مەزنەکان دامەزرین. هیچ کەسایەتی گشتی نییە.",
        },
        {
          title: "زمانت",
          desc: "هەموو راپۆرت، ڕاپرسی، و فێرکاری بە کوردی، عەرەبی، یان ئینگلیزی بۆ زانیارییەکی ڕاست.",
        },
        {
          title: "پاراستنی هەمی کات",
          desc: "کەسب و کارەکەت بەردەوام بەکاربێ، داتاکەت ئاسودە بیت، و خەڵکت بەهۆی هۆکاری ڕەوشی تری هێناوەکان ئامادەن.",
        },
        {
          title: "وەلامدانی خێرا",
          desc: "کاتێک گرنگە، هاوبەشێک کە شتەکانت دەناسێت و لە خولکاندا خەریک دەبێت.",
        },
      ],
      quote: "چونکە ئەمە پرسیارەی کەیە، نە ئەیا، دەتوانیت هاوبەشێک هەبیت کە بە خێرا وەلام دەدات و بەردەست دەبێت کاتێک گرنگە.",
    },
    servicesOverview: {
      eyebrow: "ئایا ئەمە ئەنجام دەدەین",
      title: "خزمەتگوزاریەکانی ئاسودەیی هەموو کەس",
      subtitle: "باش لە پێشکەشکراوە بۆ قەبارەی ڕوو، بازرگانی، و تایبەتمەندیەکانی خەتەر.",
      primaryServices: [
        {
          title: "چه‌وار چوار و شەوەندەری 24/7 (SOC)",
          desc: "کەسی دزەمانی ئەوانەی تێپەڕ دەکەن بۆ ناو بازرگانت پێگەیشت، بۆیە دەتەوێت چی پاراستکاری لێت بیکەیت پێش ئەوەی دەستبە دەست بن.",
          slug: "soc-as-a-service",
        },
        {
          title: "پێشووەری هەڕەشە و خەتەر (Intel & Assessment)",
          desc: "کەسی دزەمانی ئەوانەی تێپەڕ دەکەن بۆ ناو بازرگانت پێگەیشت، بۆیە دەتەوێت چی پاراستکاری لێت بیکەیت — پێش ئەوەی دەستبە دەست بن.",
          slug: "threat-risk-analysis",
        },
        {
          title: "وەلامدانی هەرەشی و فێرکاری ئاسودەیی",
          desc: "ڕێکخستنە خێراکانی ڕوویدا و ڕوونی فێرکاری کارمەند بۆ کەمکردنەوەی هەڵەی مرۆڤی و خێرای گرێدان.",
          slug: "emergency-response-training",
        },
      ],
      secondaryServices: [
        { title: "بەڕێوەبردنی ناتەواوەکان", slug: "vulnerability-management" },
        { title: "ڕاهێنانی vCISO", slug: "vciso-advisory" },
        { title: "پاراستنی Microsoft 365", slug: "m365-hardening" },
        { title: "پەرەی پۆلیتیکەکانی ئاسودەیی", slug: "security-policy-development" },
      ],
      liveStatus: {
        active: "ژینگەیی · چالاکی دۆزرایەوە",
        normal: "ژینگەیی · چاودێری",
      },
      learnMore: "زانیاری زیاتر",
    },
    statsSection: {
      eyebrow: "بە ژمارەکان",
      title: "بۆچی ArasKa Cyber Core هەڵبژێرێت؟",
      subtitle: "ئەنجامە راستەقینەکان، هەموو ڕۆژێک پێوانە دەکرێن. ئەمە ئەسەری ئەوەیە کە بۆ مشترییەکانمان پێشکەش دەکەین.",
      cards: [
        {
          label: "پێگەشتنی سازگاری",
          desc: "هاوبەشی بە ستانداردی نێودەوڵەتی NIST و OWASP",
        },
        {
          label: "کاتی وەلام",
          desc: "ئامانجمان کاتی وەلامی ڕووداوە گرنگەکانە",
        },
        {
          label: "چاودێری ژیانی",
          desc: "چاودێری پێشبینی لە سەهەدی کات",
        },
        {
          label: "پلەی کەمکردنەوەی داتای",
          desc: "پێداویستی بەکارهێنانی کەمکردنەوەی داتای مشتری لە پلاندانانی وەلام بە ڕووداو",
        },
      ],
    },
    ctaBanner: {
      headline: "ئامادەیت بۆ بەدەستهێنانی سەیرانی ئەمنی سیبر؟",
      body: "زانیاری لەسەر کارەکەت بڵێ و پێشکەشیەکی ڕوون و تایبەتی ئەمە بنێرن. بێ فشاری. بێ پاکێجە گشتییەکان.",
      healthCheck: "پشکنینی تەندروستی بکە",
      quote: "داواکاری نرخ",
    },
    footer: {
      servicesTitle: "خزمەتگوزاریەکان",
      companyTitle: "کۆمپانیا",
      contactTitle: "پەیوەندیدان",
      tagline: "کێشەکانی سەلامەتی دەرخست ببین پێش ئەوەی دزەران ببن.",
      services: [
        { label: "چه‌وار چوار و شەوەندەری 24/7 (SOC)", href: "/services#soc-as-a-service" },
        { label: "پێشووەری هەڕەشە و خەتەر", href: "/services#threat-risk-analysis" },
        { label: "وەلامدانی هەرەشی و فێرکاری", href: "/services#emergency-response-training" },
        { label: "بەڕێوەبردنی ناتەواوەکان", href: "/services#vulnerability-management" },
        { label: "ڕاهێنانی vCISO", href: "/services#vciso-advisory" },
        { label: "پاراستنی Microsoft 365", href: "/services#m365-hardening" },
        { label: "پەرەی پۆلیتیکەکانی ئاسودەیی", href: "/services#security-policy-development" },
      ],
      company: ["ماڵەوە", "دەربارە", "خزمەتگوزاریەکان", "تیم", "سەرچاوەکان", "پشکنینی تەندروستی سیبر", "داواکاری نرخ", "پەیوەندیمان پێوە"],
      email: "info@araskacyber.com",
      location: "بریتانیایە تەواو",
      copyright: "© {year} ئاراسکا سایبەر کور. هەموو مافەکان پارێزراون.",
      privacy: "سیاسەتی تایبەتمەندی",
      terms: "مەرجەکانی خزمەتگوزاری",
    },
    about: {
      section: "دەربارە",
      heroTitle: ["ئەمنی سیبر", "چالاک، بەدەستە و کارامەد."],
      heroBody: "لە ئاراسکا سایبەر کور، یارمەتی کاروبارەکان دەدەپێن بە پاراستنی ئەمنی کە کارامەد، تەرتیبکراو و سەربەخۆی بیزنسیان هەیە.",
      whoWeAre: {
        eyebrow: "کێمان",
        title: "دروستکراوە بۆ پڕ کردنەوەی بەرهەمێک.",
        body1: "لەلایەن پەیوەندیدانی پڕۆفەسیۆنالی ئەمنی سیبر دامەزرابوو، ئاراسکا سایبەر کور دروستکرا بۆ پڕکردنەوەی بەرهەمی کۆتایی لە بازاڕی هەرێم کوردستان کە زۆر ڕووکاری ئەمنی زیاتری کردوو و بەرهەمی تاوانبار بۆ ئەنجامدان و هەژمارکردنی مافی پاراستنی دروست نەبوو.",
        body2: "پەیوەندی بە بەرهەمی سەندکراو لە یەکگرتووەکان و پەیوەندی گەشەپێدانی لە ھەولێر، ئێمە لەگەڵ زانیاریەکانی نێودەوڵەتی و فەهمی بازاڕی ناوخۆی کار دەکەین بۆ پێشکەشکردنی ئەمنی سیبر کە کارامەد، بەدەست و کارکردنیە.",
        stats1: "پەیوەندیدراوە لە یەکگرتووەکان",
        stats2: "پێشکەشکراوە لە هەولێر",
      },
      whatWeDo: {
        eyebrow: "چی ئەنجام دەدەین",
        title: "ئەمنی سیبر لە سەر چاپەڕەکانی چارمەنی.",
        body: "مودێلی خزمەتگوزاری گشتی دروستکراو بەرەوە بکات لەسەر چۆنیەتی کارکردنی کەسب و کارە نوێیەکان.",
      },
      whoWeServe: {
        eyebrow: "کێمان خزمەت دەکەین",
        title: "لە کەسب و کارە بچووکەکان بۆ ڕوونکردنەوەی بەرهەمی بازاڕ.",
        body: "ئێمە پەیوەندی دەکەین بە کەسب و کارە بچووک و ناوەندی، ڕۆژانە گەورە و ئەرکە متمرکەزەکان لە هەرێم کوردستان و باشووری عێراق کە بەردەوامبوونی ئەمنی سیبر ناچالاکە.",
        sectors: ["هێز", "پاڵەوانی تەندروستی", "خزمەتگوزارییە مالییەکان", "فێرکاری", "تکنەلۆجی"],
      },
      whyAraska: {
        eyebrow: "بۆچی ئاراسکا سایبەر کور",
        title: "ئەو شتانەی جیاواز دەکاتمان سادەیە.",
        differentiators: [
          "تێگەیشتنی بازاڕی ناوخۆی بە ستانداردە نێودەوڵەتییەکان",
          "پاراستن بە زمانی کوردی، عەرەبی، و ئینگلیزی",
          "ئەمتیازی فنی سەلامەتی لە Microsoft بەکارھێنان",
          "ڕێکخراوی ژیانی سیکوریتی ڕێکبەند",
          "هاوبەشەکانی ئاسودەیی درێژخایەن، نە تەنیا یەکجار",
        ],
        closing: "نەخوازین ئەمنی سیبرەکەمە لەگەڵ پیچیدەیی، ئەرز، یان دەرچوونی لە دۆخی کارەکان بێت. دەتوانێت ڕوون، جێبەجێکراو، و سەرەتایی بێت بۆ کڕیار.",
      },
      mission: {
        heading1: "ئەنجامەکەمان",
        heading2: "بەڕێوەبەری بازرگانی بە دڵنیایی بەدەست دابنێ لەسەر خەتەری ئەمنی سیبر.",
        body: "کەسب و کارەکان پشتگیری دەکەین بە خزمەتگوزارییەکانی ئەمنی بە شێوەی کارامەد، پەیوەندی ڕوون، و فێرکاری گونجاو بۆ ناوچە، بۆ هەر بڕیارێک بێت لە شوێنێکی زانیاری و دڵنیایی.",
      },
    },
    contact: {
      eyebrow: "پەیوەندیمان پێوە",
      title: "پەیوەندی بکە",
      body: "ئەگەر پرسیارێکی خێرا هەیە یان دەتەوێتی گفتوگۆیەک دەربارەی ئەمنی خۆت دەست پێ بکەیت، ئێمە لەوێین.",
      labels: {
        name: "ناوی تام *",
        email: "ئیمەیل *",
        org: "ڕێکخراو",
        message: "پەیام *",
        send: "پەیام بنێرە",
      },
      successTitle: "پەیام نێردرا",
      successBody: "ئێمە دەگەڕێینەوە بۆت لە مێژووی یەک ڕۆژی کار.",
      info: [
        { title: "ئیمەیل", content: "info@araskacyber.com" },
        { title: "سەرپەرشتی", content: "بریتانیا" },
        { title: "کاتی وەلام", content: "هەول دەدەین بە هەموو هەواڵەکان لە مێژووی یەک ڕۆژی کار وەلام بدەین." },
      ],
    },
  },
} as const;

const DIRECTION: Record<Lang, "ltr" | "rtl"> = {
  EN: "ltr",
  AR: "rtl",
  KU: "rtl",
};

const STORAGE_KEY = "araska-lang";

interface TranslationContext {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, replacements?: Record<string, string | number>) => any;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<TranslationContext | undefined>(undefined);

const findTranslation = (lang: Lang, key: string) => {
  const path = key.split(".");
  let result: any = translations[lang];
  for (const segment of path) {
    if (result == null) return undefined;
    result = result[segment];
  }
  return result;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const initialLang = (() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && ["EN", "AR", "KU"].includes(stored)) return stored;
    const nav = window.navigator.language.toLowerCase();
    if (nav.startsWith("ar")) return "AR";
    if (nav.startsWith("ku")) return "KU";
    return "EN";
  })();

  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang.toLowerCase();
    document.documentElement.dir = DIRECTION[lang];
  }, [lang]);

  const t = (key: string, replacements?: Record<string, string | number>) => {
    const value = findTranslation(lang, key);
    if (value == null) return key;
    if (typeof value === "string") {
      if (!replacements) return value;
      return Object.entries(replacements).reduce(
        (text, [key, replacement]) => text.replace(new RegExp(`{${key}}`, "g"), String(replacement)),
        value,
      );
    }
    return value;
  };

  const contextValue = useMemo(
    () => ({ lang, setLang, t, dir: DIRECTION[lang] }),
    [lang],
  );

  return createElement(LanguageContext.Provider, { value: contextValue }, children);
};

export const useTranslation = () => {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useTranslation must be used within LanguageProvider");
  return value;
};
