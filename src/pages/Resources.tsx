import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalThreatIntel from "@/components/GlobalThreatIntel";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  X,
  ShieldAlert,
  KeyRound,
  Activity,
  Cloud,
  Bug,
  GraduationCap,
  Search,
  FileText,
} from "lucide-react";

type Article = {
  category: string;
  title: string;
  summary: string;
  body: string;
};

const categoryIcons: Record<string, typeof ShieldAlert> = {
  Awareness: ShieldAlert,
  "Identity Protection": KeyRound,
  "SOC & Monitoring": Activity,
  "M365 Security": Cloud,
  "Cyber Threats": Bug,
  "Awareness Training": GraduationCap,
  "Incident Response": Search,
};

const articles: Article[] = [
  {
    category: "Awareness",
    title: "Phishing & Social Engineering",
    summary: "How attackers trick your people — and how to stop them.",
    body: `Phishing will not disappear. But a team that knows what to look for, takes a moment before clicking, and knows how to report suspicious activity is dramatically harder to compromise than one that does not. That awareness is a security control in itself and it costs nothing to build.

**What is phishing?**

Phishing is when an attacker sends you a message — usually an email, but sometimes a text message or a WhatsApp message — pretending to be someone you trust. They might pretend to be your bank, your email provider, a colleague, a government department, or even your CEO. The message looks real. The logo looks right. The language sounds professional. But the goal is always the same: get you to click a link, open a file, or hand over information.

When you click that link, one of three things typically happens. You are taken to a fake website that looks identical to a real one — your bank, your Microsoft login, your email — and when you enter your password, the attacker captures it. Or a file downloads onto your device and installs malicious software. Or you are asked to fill in a form and hand over sensitive information directly.

**What is social engineering?**

Social engineering is the broader category that phishing belongs to. It means manipulating people psychologically rather than attacking technology. Attackers are very good at creating pressure, urgency, and fear. A message that says "Your account will be suspended in 24 hours — click here to verify" is designed to make you panic and act without thinking. A call from someone claiming to be IT support asking for your password is social engineering. An email that appears to come from your managing director asking you to urgently transfer money is social engineering — this specific attack is called Business Email Compromise and it costs businesses billions every year.

**Why does it work?**

Because it targets human nature, not technology. Your firewall cannot stop an employee from willingly clicking a link. Your antivirus cannot stop someone from handing over their password to someone they believe is their bank. Attackers know this and they exploit it relentlessly.

**What should you do?**

First, slow down. Most phishing attacks rely on urgency. Before you click anything, ask yourself: was I expecting this message? Does the sender's email address actually match the organisation they claim to be from — not just the display name, but the actual address? Is the link going where it claims to go — hover over it before clicking and check.

Second, never give your password to anyone who contacts you. No legitimate organisation — your bank, Microsoft, your IT team — will ever ask for your password in an email or over the phone.

Third, if something feels wrong, report it. Most businesses have no formal process for staff to report suspicious emails and that is a serious gap. When people are unsure, they either click anyway or delete and forget. Neither is the right answer. Create a simple way for your team to flag suspicious messages to whoever manages your IT or security.

Fourth, use Multi-Factor Authentication (MFA) on every account that allows it. If an attacker does capture your password through a phishing attack, MFA means they still cannot get in without the second factor — usually a code sent to your phone.

Phishing will not disappear. But a team that knows what to look for, takes a moment before clicking, and knows how to report suspicious activity is dramatically harder to compromise than one that does not. That awareness is a security control in itself and it costs nothing to build.`,
  },
  {
    category: "Identity Protection",
    title: "Password & MFA Security",
    summary: "The two things that protect every account your business uses.",
    body: `Your password is the key to your business. Your email account, your financial systems, your cloud storage, your customer records — they are all protected by passwords. And in most businesses, those passwords are far weaker than they should be.

**The problem with passwords**

Most people use passwords that are too short, too simple, or used across multiple accounts. "Password123", a pet's name, a birthday, the name of the business — these are guessed or cracked by attackers in seconds using automated tools that try millions of combinations. This is called a brute force attack. Attackers also buy lists of leaked passwords from previous breaches of other websites — if you used the same password on a site that was breached five years ago and you still use that password today, an attacker already has it.

The guidance on passwords has changed significantly in recent years. The old advice — change your password every 90 days, use a random mix of symbols and numbers — has been replaced by something more practical and actually more secure. The current advice from the UK's National Cyber Security Centre (NCSC) is to use three random words joined together. Something like "purple-cloud-bottle" is longer, harder to crack, and easier to remember than "P@ssw0rd1". Length matters far more than complexity.

**Never reuse passwords**

If you use the same password across multiple accounts and one of those accounts is compromised, every other account with that password is now at risk too. This is called credential stuffing and it is extremely common. The solution is simple in principle but hard to maintain manually — use a different password for every account. A password manager makes this practical. It generates and stores unique, strong passwords for every site and account, and you only need to remember one master password to access it. Tools like Bitwarden, 1Password, and Microsoft's built-in password manager are all reliable options.

**What is MFA and why is it essential?**

Multi-Factor Authentication — MFA, also called Two-Factor Authentication or 2FA — means that logging into an account requires two things instead of one. The first factor is your password. The second factor is something else — usually a code sent to your phone, or generated by an app like Microsoft Authenticator or Google Authenticator. Some systems use a fingerprint or a hardware key.

The reason MFA matters so much is this: even if an attacker has your password — through phishing, a data breach, or guessing — they cannot log in without the second factor. Your phone is not with them. MFA stops the vast majority of account takeover attacks, even when the password is already compromised.

Microsoft reports that MFA blocks over 99% of automated account attacks. It is one of the highest-impact, lowest-cost security controls available and it takes minutes to set up.

**What should you do right now?**

Enable MFA on every account that supports it. Start with the most critical — your email, your Microsoft 365 or Google Workspace, your banking, your accounting software, your cloud storage. Then work through everything else. Make it a requirement for every person in your business, not just you.

Review the passwords currently in use across your business. If anyone is using simple, short, or repeated passwords, change them now and move to a password manager. This is not a technical project — it is a discipline that anyone can adopt with a small amount of guidance.

Strong passwords combined with MFA will not make you immune to attack. But they close the door on the most common and most easily prevented ways that business accounts are compromised every day.`,
  },
  {
    category: "SOC & Monitoring",
    title: "What is a SOC and Why You Need One",
    summary: "The security team that watches your business while you sleep.",
    body: `Most businesses have locks on their doors and cameras on their buildings. They would not leave their premises unmonitored overnight. But their digital environment — their email, their servers, their cloud systems, their employee devices — runs 24 hours a day with nobody watching it at all. A Security Operations Centre, or SOC, is the answer to that problem.

**What is a SOC?**

A SOC is a team of security professionals whose job is to monitor your organisation's digital environment continuously, detect anything suspicious, investigate it, and respond when something is wrong. They watch your logs, your alerts, your network traffic, and your user activity around the clock. When something unusual happens — an employee account logging in from an unknown country at 3am, a device sending an unusual volume of data to an external server, a piece of malicious software being detected on an endpoint — the SOC sees it, investigates it, and takes action.

Think of a SOC as a security guard who never sleeps, never takes a day off, and is trained to recognise every type of threat that might target your business. Except instead of walking the floors of your building, they are watching everything that happens across your digital infrastructure.

**Why does this matter?**

The average time between an attacker entering a network and a business discovering the breach is measured in weeks and sometimes months. During that time the attacker is moving through systems, stealing data, and preparing a larger attack — often ransomware. The business has no idea anything is happening. By the time the breach is discovered, the damage is already done.

A SOC closes that gap. Continuous monitoring means that unusual activity is detected quickly — often within minutes or hours rather than weeks. Early detection means earlier response. Earlier response means less damage, less data lost, less disruption, and a far lower cost to recover.

**Do I really need one?**

If your business runs on digital systems — and every business does today — then yes, some level of continuous monitoring is appropriate. The question is not whether you need it but how much and in what form.

Large enterprises build their own SOC with a team of full-time analysts. That is expensive and not realistic for most small and medium-sized businesses. The alternative is a Managed SOC — a service like the one Araska Cyber Core provides — where a team of analysts monitors your environment on your behalf, integrated with your existing systems, at a fraction of the cost of building your own.

**What does a Managed SOC actually do for your business?**

It connects to your Microsoft 365 environment, your devices, your cloud systems, and your network. It collects data from all of these sources into a central platform — in our case Microsoft Sentinel — and applies detection rules, threat intelligence, and analyst expertise to identify anything that should not be happening. When something is found, your team is notified immediately with a clear explanation of what happened, what the risk is, and what action has been taken or is recommended.

You receive regular reports showing your security posture, what was detected, and what was done about it. You do not need to understand the technical detail — we translate it into plain language so you can make informed decisions about your business's security.

A SOC does not prevent every attack from happening. But it ensures that when something does happen, it is found fast, contained quickly, and dealt with before it becomes a catastrophe. In today's environment, that is not a luxury. It is a fundamental part of running a business responsibly.`,
  },
  {
    category: "M365 Security",
    title: "Microsoft 365 Security — Common Mistakes",
    summary: "Most businesses use Microsoft 365. Most have it configured dangerously wrong.",
    body: `Microsoft 365 is used by hundreds of millions of businesses worldwide. Email, documents, video calls, file storage — it runs the daily operations of organisations of every size. It is also one of the most targeted platforms by cybercriminals in the world. And the vast majority of businesses using it are making the same avoidable mistakes that leave them dangerously exposed.

**Mistake 1 — Not enabling MFA**

This is the most common and most dangerous mistake. Microsoft 365 accounts without Multi-Factor Authentication are targeted constantly by automated attacks. Attackers buy lists of leaked email and password combinations from previous data breaches and try them against Microsoft 365 logins millions of times per day. Without MFA, a working password is all they need. With MFA, a working password is not enough. Enabling MFA on every Microsoft 365 account in your organisation is the single most impactful thing you can do and it takes less than an hour to set up across a small business.

**Mistake 2 — Using the default security settings**

Microsoft 365 comes with default settings that are designed to be easy and accessible, not secure. Out of the box, many features that could protect your organisation are turned off or set to their weakest configuration. Microsoft provides a feature called Security Defaults that switches on a set of baseline protections automatically — but many businesses never enable it. Beyond Security Defaults, Microsoft Secure Score gives your organisation a rating out of 100 and tells you exactly what to fix to improve it. Most businesses have never looked at it.

**Mistake 3 — Not controlling who has admin access**

Global Administrator is the highest level of access in Microsoft 365. Whoever has it can do anything — read all email, access all files, create new accounts, change security settings, delete everything. Many businesses give Global Admin access to multiple people who do not need it, including IT support companies they no longer use. Admin accounts should be separate from regular user accounts, protected by MFA, and given only to the people who genuinely require that level of access for their specific job.

**Mistake 4 — Not configuring email security**

Email is the primary attack vector for most cyber threats. Microsoft 365 includes powerful email security tools — Defender for Office 365, Safe Links, Safe Attachments, anti-phishing policies — that stop malicious emails, links, and attachments from reaching your staff. In many Microsoft 365 subscriptions these tools are included but not configured. They do not work until someone turns them on and sets them up correctly.

**Mistake 5 — Not monitoring sign-in activity**

Microsoft 365 logs every login to every account — the time, the location, the device, whether it succeeded or failed. This data is available to every business but almost nobody looks at it. If an attacker is accessing accounts — logging in from an overseas IP address, logging in at unusual hours, attempting to access accounts repeatedly — the evidence is right there in the logs. Without monitoring, it goes unnoticed. A SOC or even a basic review of sign-in logs once a month would catch many account compromises that currently go undetected for weeks.

**Mistake 6 — Not controlling what apps can connect to your Microsoft 365**

Microsoft 365 allows third-party applications to connect to your accounts and access your data. Employees regularly grant these permissions without thinking — a productivity tool here, a scheduling app there. Each permission is a potential entry point. An attacker who compromises a third-party app that has been granted access to your Microsoft 365 environment can read your email and access your files without needing your password. Reviewing and restricting which apps are permitted to connect is a straightforward but frequently overlooked security control.

Microsoft 365 is a powerful and well-designed platform. Its security capabilities are genuinely excellent. But those capabilities only protect you if they are configured correctly. Left in their default state, Microsoft 365 is far less secure than most businesses assume. A security hardening review of your Microsoft 365 environment typically takes a day and the findings are almost always significant.`,
  },
  {
    category: "Cyber Threats",
    title: "Ransomware Attacks",
    summary: "The attack that locks your entire business and demands payment to get it back.",
    body: `Ransomware is one of the most destructive cyber threats facing businesses today. It has shut down hospitals, paralysed government departments, bankrupted small businesses, and cost organisations around the world billions every year. Understanding what it is and how to protect against it is not optional — it is essential.

**What is ransomware?**

Ransomware is a type of malicious software — malware — that gets onto your systems and encrypts your files. Encryption scrambles the data so it becomes completely unreadable without a decryption key. Once ransomware has run across your systems, you cannot open your documents, access your customer records, use your accounting software, or read your emails. Everything is locked. The attacker then demands payment — usually in cryptocurrency — in exchange for the key to unlock your files. The ransom demand can range from a few hundred dollars for a small business to millions for a large organisation.

**How does ransomware get in?**

The most common entry points are phishing emails, compromised passwords, and unpatched software vulnerabilities. An employee opens a malicious email attachment or clicks a link that downloads the ransomware. Or an attacker obtains a password through phishing or a data breach and logs into a remote access system. Or they find a vulnerability in software that has not been updated and exploit it to gain entry. Once they are inside the network, modern ransomware is designed to spread — moving from one device to another, escalating its access privileges, and reaching as much of your environment as possible before activating the encryption.

**Should you pay the ransom?**

Law enforcement agencies and cybersecurity organisations consistently advise against paying ransoms. Paying does not guarantee you will receive a working decryption key. It does guarantee that the attackers know you are willing to pay, which may make you a target again. It also funds the criminal organisations that carry out these attacks and enables them to attack others. The better answer is to never reach the point where paying is your only option.

**How do you protect your business?**

Backups are your most important protection. If you have clean, recent backups of all your data stored separately from your main systems — and critically, not connected to the same network that could be encrypted — you can recover from a ransomware attack without paying. The backup must be tested regularly. A backup you have never restored is a backup you cannot rely on. Many businesses believe they have backups until the moment they try to restore from them and find they are incomplete, outdated, or corrupt.

Beyond backups: keep all software and operating systems updated and patched — unpatched vulnerabilities are a primary entry point. Implement MFA on all accounts so that a compromised password alone is not enough to gain access. Restrict who can access what — not every employee needs access to every system and file. Deploy endpoint protection on every device. And ensure someone is monitoring your environment for the early signs of an attack — ransomware rarely activates immediately, and detection during the reconnaissance phase before encryption begins can stop an attack in its tracks.

Ransomware is not a technical problem that only technical people need to worry about. It is a business risk with potentially existential consequences. A business that cannot access its own data and systems for days or weeks — or permanently — faces serious damage to its operations, its reputation, and its finances. The time to prepare is before the attack, not after.`,
  },
  {
    category: "Awareness Training",
    title: "Security Awareness Training — Why It Matters",
    summary: "Your technology is only as secure as the people using it.",
    body: `Businesses invest in firewalls, antivirus software, email filters, and security monitoring. All of these are important. But none of them can fully protect an organisation if the people inside it do not know how to recognise a threat and respond correctly. Security awareness training is the investment that makes every other security control more effective.

**Why people are the primary target**

Attackers target people because it works. It is often faster and easier to convince a person to hand over access than to break through technical defences. Social engineering — manipulating people psychologically to gain access or information — is behind the majority of successful cyber attacks. Phishing, pretexting, impersonation, vishing (voice phishing over the phone) — these attacks succeed because they exploit normal human behaviours like trust, helpfulness, urgency, and fear. No software update fixes those vulnerabilities. Training does.

**What security awareness training actually covers**

Good security awareness training is not a one-hour lecture about IT rules that nobody remembers. It covers real, practical scenarios that your staff are likely to encounter. How to recognise a phishing email — including the subtle ones that look almost identical to legitimate messages. What to do if you accidentally click something suspicious. How to handle requests for sensitive information over email or phone. Why password hygiene matters and how to manage passwords safely. What Multi-Factor Authentication is and why it is non-negotiable. How to handle sensitive data and what not to share. Who to contact if something seems wrong.

It also covers the context that makes the risk real — real examples of what happened to businesses that experienced a breach, explained in plain terms without technical jargon. When people understand that these attacks happen to organisations like theirs, not just to large corporations, and that the consequences are serious and concrete, their behaviour changes.

**What good training looks like**

The most effective training is delivered in the language your staff speak and work in — for businesses in the Kurdistan Region, that means Kurdish, Arabic, or English depending on the individual. Generic training delivered in a language that is not someone's first language, or using cultural references that do not resonate, is significantly less effective. It is also interactive rather than passive — asking people to identify real phishing examples, discuss scenarios, and practise responses rather than simply reading slides.

Training should be repeated. A single session once a year is not enough because the threat landscape changes continuously. New attack techniques emerge. Staff change. A programme of regular, brief refresher sessions is far more effective than annual tick-box compliance training.

Phishing simulations — where a controlled, fake phishing email is sent to staff to see who clicks — are a valuable tool for measuring awareness and identifying who needs additional support without the consequences of a real attack.

**The return on this investment**

Security awareness training is one of the most cost-effective security investments available. A business with well-trained staff is significantly harder to compromise through social engineering. When staff know how to recognise and report suspicious activity, potential incidents are flagged before they escalate. When people understand that their behaviour directly affects the security of the organisation they work for, they take their role in protecting it seriously.

Your technical defences protect you from attacks that do not involve your people. Training protects you from the attacks that do. In today's environment, that is most of them.`,
  },
  {
    category: "Incident Response",
    title: "How to Know if Your Business Has Been Hacked",
    summary: "Most businesses find out too late. Here is what to look for.",
    body: `One of the most unsettling facts about cybersecurity is that the average business takes weeks — sometimes months — to discover that it has been compromised. During that time, an attacker may be inside the network, reading emails, accessing files, stealing data, and preparing a larger attack. Knowing the warning signs of a breach can dramatically shorten that window and reduce the damage.

**Warning sign 1 — Unusual account activity**

One of the earliest and clearest signs of a compromise is account activity that does not match normal behaviour. Logins from countries where you have no staff or operations. Logins at unusual hours — the middle of the night, weekends, public holidays. Multiple failed login attempts followed by a successful one. Password reset requests that nobody initiated. If you use Microsoft 365, this data is available in the sign-in logs. Most businesses never look at these logs, which is precisely why attackers operate undetected for so long.

**Warning sign 2 — Unexpected password resets or account lockouts**

If staff report being locked out of accounts they were using normally, or receive password reset emails they did not request, this is a serious warning sign. It may mean an attacker is attempting to access accounts or has already done so and is trying to take control by changing credentials.

**Warning sign 3 — Devices behaving strangely**

A device that is suddenly slow, crashes unexpectedly, behaves erratically, or shows processes and programs that nobody installed may be compromised. Malware running in the background consumes system resources and can cause noticeable performance changes. If a device starts doing things on its own — moving the cursor, opening programs, sending emails — these are urgent red flags.

**Warning sign 4 — Unexpected emails sent from your accounts**

If colleagues, clients, or suppliers report receiving strange emails from your address that you did not send, your email account has very likely been compromised. Attackers who gain access to a business email account frequently use it to send phishing emails to the contacts inside it — your clients, suppliers, and partners. This is particularly damaging because the emails appear to come from a trusted source.

**Warning sign 5 — Files that have been accessed, moved, or changed unexpectedly**

If files have been opened, downloaded, moved, or modified and nobody in the business can account for it, this warrants investigation. Modern cloud platforms like Microsoft 365 and SharePoint log file activity and this data can be reviewed. Unexplained bulk downloads of documents are a particular warning sign — they may indicate data theft in preparation for a ransomware attack or extortion attempt.

**Warning sign 6 — Security software being disabled**

Attackers who gain access to a system often attempt to disable security software — antivirus, endpoint protection, firewalls — to reduce their chance of detection and to make it easier to deploy malware. If security software is reporting that it has been disabled and nobody in the business did this deliberately, treat it as a serious incident.

**Warning sign 7 — Your data appears somewhere it should not**

Sometimes businesses only discover a breach when their data appears online, is offered for sale on criminal forums, or is mentioned in a ransom demand. By this point the attacker has been inside the network for some time. Services that monitor for leaked credentials — checking whether email addresses and passwords from your organisation have appeared in known data breaches — can provide an early warning. Have I Been Pwned is a free public resource that allows you to check whether any of your email addresses appear in known breach data.

**What to do if you suspect a breach**

Do not panic and do not attempt to cover it up or handle it quietly. The first step is to isolate any device or account you believe is compromised — disconnect it from the network, revoke active sessions, reset passwords. Then contact your cybersecurity partner or IT support immediately. Do not delete logs or attempt to clean up the affected systems yourself before an investigation — this may destroy the evidence needed to understand what happened and how to prevent it recurring.

Document everything — what you noticed, when you noticed it, what actions were taken and when. If personal data may have been accessed or stolen, there are legal notification obligations under data protection law that must be considered.

The best time to prepare for a breach is before one happens. Know who to call, know what your first steps are, and ensure that someone is monitoring your environment continuously so that unusual activity is caught as early as possible rather than weeks after the fact.`,
  },
];

const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

// Render markdown-ish body: paragraphs + **bold** lines as subheadings
const renderBody = (body: string) => {
  const blocks = body.split(/\n\n+/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    const boldOnly = trimmed.match(/^\*\*(.+)\*\*$/);
    if (boldOnly) {
      return (
        <h3
          key={i}
          className="text-lg sm:text-xl font-bold text-foreground mt-8 mb-3"
        >
          {boldOnly[1]}
        </h3>
      );
    }
    return (
      <p
        key={i}
        className="text-foreground/80 text-base leading-[1.8] mb-4"
      >
        {trimmed}
      </p>
    );
  });
};

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openArticle, setOpenArticle] = useState<Article | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  // Lock body scroll when modal is open and close on Escape
  useEffect(() => {
    if (!openArticle) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenArticle(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openArticle]);

  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main className="pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="eyebrow text-xl">Insights</span>
            <span className="eyebrow-rule" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-[-0.02em]">
              Resources
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-[1.8]">
              Threat briefings, security guides, and practical insights from the Araska Cyber Core team.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-medium px-4 py-2 rounded transition-all duration-200 ${
                  activeCategory === cat
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground font-bold"
                }`}
                style={{
                  border:
                    activeCategory === cat
                      ? "1px solid rgba(31,143,203,0.45)"
                      : "1px solid rgba(31,143,203,0.18)",
                  background:
                    activeCategory === cat ? "rgba(31,143,203,0.08)" : "transparent",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid — matches Home "What We Do" card style */}
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
            style={{ perspective: "1200px" }}
          >
            {filtered.map((article, i) => {
              const Icon = categoryIcons[article.category] ?? FileText;
              const isActive = hoveredIdx === i;
              return (
                <motion.article
                  key={article.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() =>
                    setHoveredIdx((cur) => (cur === i ? null : cur))
                  }
                  onClick={() => setOpenArticle(article)}
                  whileHover={{ rotateX: -4, rotateY: 6, translateY: -8, scale: 1.02 }}
                  className="services-card rounded-lg p-9 flex flex-col items-center text-center group h-full cursor-pointer"
                  style={{
                    background: "#FFFFFF",
                    border: `1px solid ${
                      isActive
                        ? "hsl(var(--primary) / 0.7)"
                        : "hsl(var(--primary) / 0.18)"
                    }`,
                    borderRadius: "8px",
                    boxShadow: isActive
                      ? "0 24px 50px -14px hsl(var(--primary) / 0.5), 0 0 0 1px hsl(var(--primary) / 0.45), 0 0 24px hsl(var(--primary) / 0.35)"
                      : "0 1px 3px rgba(0,0,0,0.04)",
                    transformStyle: "preserve-3d",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <div
                    className="w-[52px] h-[52px] rounded-md flex items-center justify-center mb-5 transition-transform duration-500"
                    style={{
                      background: "hsl(var(--primary) / 0.08)",
                      border: "1px solid hsl(var(--primary) / 0.25)",
                      transform: isActive
                        ? "translateZ(20px) scale(1.1)"
                        : "translateZ(0) scale(1)",
                    }}
                  >
                    <Icon
                      className={`text-primary ${isActive ? "icon-spin-fast" : ""}`}
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-xs text-primary font-bold tracking-wider uppercase mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-[18px] font-bold uppercase tracking-wide text-foreground mb-3 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-[15px] leading-[1.7] mb-6 flex-1 font-bold">
                    {article.summary}
                  </p>
                  <span
                    className="inline-flex items-center justify-center px-5 py-2 text-xs font-bold uppercase tracking-wider rounded border border-primary/40 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  >
                    Read More
                  </span>
                </motion.article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">
              No posts in this category yet. Check back soon.
            </p>
          )}

          <GlobalThreatIntel />
        </div>
      </main>
      <Footer />

      {/* Article Modal */}
      <AnimatePresence>
        {openArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
            style={{ background: "rgba(10, 20, 35, 0.65)", backdropFilter: "blur(4px)" }}
            onClick={() => setOpenArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl bg-background rounded-lg shadow-2xl my-8"
              style={{ border: "1px solid rgba(31,143,203,0.25)" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="article-title"
            >
              <button
                onClick={() => setOpenArticle(null)}
                aria-label="Close article"
                className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-background hover:bg-muted transition-colors"
                style={{ border: "1px solid rgba(31,143,203,0.35)" }}
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              <div className="p-6 sm:p-10">
                <span className="text-xs text-primary font-semibold tracking-wide uppercase">
                  {openArticle.category}
                </span>
                <h2
                  id="article-title"
                  className="text-2xl sm:text-3xl font-extrabold text-foreground mt-3 mb-3 tracking-[-0.01em] leading-tight"
                >
                  {openArticle.title}
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-[1.7] mb-6">
                  {openArticle.summary}
                </p>
                <div className="h-px w-full bg-foreground/10 mb-6" />
                <div>{renderBody(openArticle.body)}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resources;
