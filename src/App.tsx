import { type MouseEvent, useMemo, useState } from 'react';
import { ArrowRight, Bookmark, BookOpen, Check, ChevronLeft, Copy, Laugh, Menu, Search, Sparkles, X } from 'lucide-react';

type Section = 'torah' | 'jokes';
type ContentItem = {
  id: string;
  section: Section;
  title: string;
  excerpt: string;
  body: string[];
  source: string;
  author: string;
  date: string;
  readTime: string;
  tone: string;
  featured?: boolean;
};

const items: ContentItem[] = [
  {
    id: 'parashat-vayera', section: 'torah', featured: true,
    title: 'האוהל הפתוח של אברהם', tone: 'פרשת וירא',
    excerpt: 'לפעמים הכנסת אורחים אינה מתחילה בדלת שנפתחת, אלא בלב שמוכן לפנות מקום.',
    body: [
      'אברהם אבינו יושב בפתח האוהל, דווקא בשעה שהשמש קופחת. חז״ל מלמדים שהוא לא חיכה שהאורחים יגיעו אליו — הוא חיפש אותם.',
      'יש כאן שיעור עדין על חסד: לא די להיות אדם טוב כשנוח. החסד מבקש מאיתנו לשים לב, להרים את הראש מן העיסוקים שלנו ולראות מי עומד בצד.',
      'כל אחד מאיתנו מחזיק אוהל קטן — בית, שולחן, שיחה, או אפילו הודעה קצרה. כשאנחנו מפנים בו מקום, העולם נעשה ראוי יותר לשכינה.'
    ],
    source: 'בראשית י״ח', author: 'הרב יונתן ברקאי', date: 'י״ד חשוון תשפ״ו', readTime: '3 דקות'
  },
  {
    id: 'small-light', section: 'torah',
    title: 'אור קטן, כיוון גדול', tone: 'מחשבה לשבת',
    excerpt: 'אין צורך להאיר את כל הדרך כדי לעשות את הצעד הבא באמונה.',
    body: [
      'אנו רגילים לבקש בהירות מלאה לפני שמתחילים. אך התורה מתארת את האור לא רק כפתרון, אלא ככיוון: אור שמראה היכן להניח את הרגל.',
      'גם מעשה קטן שנעשה בעקביות — ברכה בכוונה, הקשבה אמיתית, דקה של לימוד — הופך עם הזמן לפנס שמאיר לאחרים.'
    ],
    source: 'תהילים קי״ט', author: 'נעמה שלו', date: 'ז׳ חשוון תשפ״ו', readTime: '2 דקות'
  },
  {
    id: 'sarah-laugh', section: 'torah',
    title: 'הצחוק שנכנס דרך החלון', tone: 'פרשת לך לך',
    excerpt: 'שמחה אינה פרס שמקבלים בסוף הדרך; היא כוח שמאפשר לצעוד בה.',
    body: [
      'כששרה צוחקת, התורה אינה ממהרת להשתיק אותה. גם בתוך רגעים של ספק, יש בצחוק שלה תנועה של חיים — האפשרות לדמיין עתיד שעדיין לא נראה.',
      'שמחה יהודית איננה התעלמות מן הקושי. היא היכולת להחזיק את הקושי ביד אחת, וביד השנייה להשאיר חלון פתוח לתקווה.'
    ],
    source: 'בראשית י״ח', author: 'הרב יונתן ברקאי', date: 'ל׳ תשרי תשפ״ו', readTime: '2 דקות'
  },
  {
    id: 'wise-rabbi', section: 'jokes',
    title: 'הרב, השעון והכוונה', tone: 'בדיחה של שבת',
    excerpt: 'הרב שאל את הגבאי: ״למה השעון בבית הכנסת עומד?״ הגבאי חייך: ״הוא פשוט הגיע לזמן של תפילה.״',
    body: [
      'הרב נכנס לבית הכנסת וראה שהשעון הגדול עומד מלכת. הוא שאל את הגבאי מדוע אינו מתקן אותו.',
      '״אנחנו לא ממהרים לשום מקום״, השיב הגבאי. ״אבל אם הרב רוצה, אפשר לכוון אותו לפי הזמן של הדרשה.״'
    ],
    source: 'פנקס הבדיחות של בית הכנסת', author: 'משה לוי', date: 'י״ב חשוון תשפ״ו', readTime: 'דקה'
  },
  {
    id: 'kosher-coffee', section: 'jokes',
    title: 'קפה עם הכשר', tone: 'בדיחה קצרה',
    excerpt: 'הבן שאל את אביו: ״אבא, יש קפה כשר?״ האב ענה: ״בוודאי, אבל רק אם שותים אותו בכוונה.״',
    body: [
      'הבן הסתכל על הכוס ושאל ברצינות: ״אבא, הקפה הזה כשר?״',
      '״ודאי״, אמר האב, ״רק תיזהר — אם תשתה אותו בלי כוונה, הוא עלול להפוך לקפה של חול.״'
    ],
    source: 'בין מנחה למעריב', author: 'אלי פרץ', date: 'ח׳ חשוון תשפ״ו', readTime: 'דקה'
  },
  {
    id: 'late-minyan', section: 'jokes',
    title: 'המניין המאוחר', tone: 'מהספסל האחורי',
    excerpt: '״למה קוראים לזה מניין מאוחר?״ שאל הילד. ״כי גם התשע מתפלל להגיע בזמן.״',
    body: [
      'הילד ראה את השלט ״מניין מאוחר״ ותהה: ״אם הוא מאוחר, איך הוא מתחיל בזמן?״',
      'סבא שלו ענה: ״זה פשוט. המניין מתחיל בזמן, אבל המתפללים מגיעים עם הסבר משלהם.״'
    ],
    source: 'סיפורים שאחרי הקידוש', author: 'רותם אשכנזי', date: 'ג׳ חשוון תשפ״ו', readTime: 'דקה'
  }
];

function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 3 24.1 7.1 30 6.2l.7 5.9 5.3 2.7-2.8 5.3 2.8 5.3-5.3 2.7-.7 5.9-5.9-.9L20 37l-4.1-4.1-5.9.9-.7-5.9L4 25.4l2.8-5.3L4 14.8l5.3-2.7.7-5.9 5.9.9L20 3Z" fill="currentColor" opacity=".17"/>
      <path d="M12.5 13.5h15M12.5 19.7h15M12.5 25.9h9.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

function Header({ section, setSection, savedCount, onSaved, mobileOpen, setMobileOpen }: {
  section: Section; setSection: (section: Section) => void; savedCount: number; onSaved: () => void;
  mobileOpen: boolean; setMobileOpen: (open: boolean) => void;
}) {
  const jump = (next: Section) => { setSection(next); setMobileOpen(false); document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <header className="relative z-30 border-b border-[hsl(var(--border)/.65)] bg-[hsl(var(--background)/.82)] backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-10">
        <button data-testid="button-brand" onClick={() => { setSection('torah'); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group flex items-center gap-3 text-right" aria-label="חזרה לדף הראשי">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-transform group-hover:rotate-[-8deg]"><Mark size={30} /></span>
          <span><span className="display-serif block text-[18px] font-bold leading-tight text-[hsl(var(--primary))]">דברי תורה<br /><i className="not-italic text-[hsl(var(--accent))]">ובדיחות</i></span></span>
        </button>
        <nav className="hidden items-center gap-8 md:flex" aria-label="ניווט ראשי">
          <button data-testid="nav-torah" onClick={() => jump('torah')} className={`relative py-2 text-sm font-semibold ${section === 'torah' ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`}>דברי תורה{section === 'torah' && <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[hsl(var(--accent))]" />}</button>
          <button data-testid="nav-jokes" onClick={() => jump('jokes')} className={`relative py-2 text-sm font-semibold ${section === 'jokes' ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`}>בדיחות{section === 'jokes' && <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[hsl(var(--accent))]" />}</button>
          <button data-testid="button-saved" onClick={onSaved} className="flex items-center gap-2 py-2 text-sm font-semibold text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"><Bookmark size={16} strokeWidth={1.8} /> שמורים {savedCount > 0 && <span className="rounded-full bg-[hsl(var(--secondary))] px-1.5 text-xs">{savedCount}</span>}</button>
        </nav>
        <button data-testid="button-mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} className="rounded-full p-2 text-[hsl(var(--primary))] md:hidden" aria-label={mobileOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}>{mobileOpen ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
      {mobileOpen && <div className="border-t border-[hsl(var(--border)/.65)] px-5 py-4 md:hidden animate-rise">
        <div className="flex flex-col gap-1">
          <button data-testid="mobile-nav-torah" onClick={() => jump('torah')} className="rounded-xl p-3 text-right font-semibold hover:bg-[hsl(var(--secondary)/.6)]">דברי תורה</button>
          <button data-testid="mobile-nav-jokes" onClick={() => jump('jokes')} className="rounded-xl p-3 text-right font-semibold hover:bg-[hsl(var(--secondary)/.6)]">בדיחות</button>
          <button data-testid="mobile-button-saved" onClick={() => { onSaved(); setMobileOpen(false); }} className="flex items-center gap-2 rounded-xl p-3 text-right font-semibold hover:bg-[hsl(var(--secondary)/.6)]"><Bookmark size={17} /> שמורים ({savedCount})</button>
        </div>
      </div>}
    </header>
  );
}

function SearchBox({ query, setQuery }: { query: string; setQuery: (value: string) => void }) {
  return <div className="relative w-full max-w-[420px]">
    <Search size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
    <input data-testid="input-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="חיפוש בדפי האתר..." className="h-12 w-full rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card)/.8)] pr-11 pl-11 text-sm text-[hsl(var(--foreground))] shadow-[var(--shadow-sm)] placeholder:text-[hsl(var(--muted-foreground))]" aria-label="חיפוש בדפי האתר" />
    {query && <button data-testid="button-clear-search" onClick={() => setQuery('')} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]" aria-label="ניקוי החיפוש"><X size={15} /></button>}
  </div>;
}

function Hero({ section, setSection, query, setQuery }: { section: Section; setSection: (section: Section) => void; query: string; setQuery: (query: string) => void }) {
  return <section className="mx-auto max-w-[1240px] px-5 pb-10 pt-12 lg:px-10 lg:pb-20 lg:pt-20">
    <div className="relative grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
      <div className="animate-rise">
        <div className="mb-6 flex items-center gap-3 text-[hsl(var(--accent))]"><span className="h-px w-10 bg-[hsl(var(--accent))]" /><span className="micro-label">דף שבועי · תשפ״ו</span></div>
        <h1 className="display-serif max-w-[730px] text-[clamp(3.1rem,8vw,7.2rem)] font-bold leading-[.98] tracking-[-.055em] text-[hsl(var(--primary))]">מילה טובה<br /><span className="text-[hsl(var(--accent))]">לוקחים איתנו.</span></h1>
        <p className="mt-7 max-w-[540px] text-lg leading-8 text-[hsl(var(--muted-foreground))]">מקום קטן למחשבות גדולות, לסיפור שמאיר את השבוע ולבדיחה שמגיעה בדיוק בזמן.</p>
        <div className="mt-8"><SearchBox query={query} setQuery={setQuery} /></div>
      </div>
      <div className="relative hidden min-h-[250px] items-center justify-center lg:flex animate-rise delay-2">
        <div className="absolute h-[260px] w-[260px] rounded-full border border-[hsl(var(--accent)/.38)]" />
        <div className="absolute h-[215px] w-[215px] rounded-full border border-dashed border-[hsl(var(--accent)/.35)]" />
        <div className="relative flex h-[166px] w-[166px] rotate-3 items-center justify-center rounded-[50%_45%_48%_52%] bg-[hsl(var(--primary))] text-center text-[hsl(var(--primary-foreground))] shadow-[var(--shadow-md)]" style={{ animation: 'drift 6s ease-in-out infinite' }}>
          <div><Sparkles className="mx-auto mb-2 text-[hsl(var(--accent))]" size={27} /><div className="display-serif text-2xl font-bold">פתח<br />לב</div><div className="mt-1 text-[10px] tracking-[.18em] opacity-70">קרא · חייך · שתף</div></div>
        </div>
        <span className="absolute right-3 top-6 rotate-[-12deg] font-serif text-4xl text-[hsl(var(--accent)/.65)]">א</span>
        <span className="absolute bottom-2 left-10 rotate-[14deg] font-serif text-3xl text-[hsl(var(--primary)/.55)]">ב</span>
      </div>
    </div>
    <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-[hsl(var(--border))] pt-5">
      <span className="text-sm font-semibold text-[hsl(var(--muted-foreground))]">מה בא לך היום?</span>
      <button data-testid="filter-torah" onClick={() => setSection('torah')} className={`ink-button flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${section === 'torah' ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'border border-[hsl(var(--border))] bg-[hsl(var(--card)/.5)] text-[hsl(var(--foreground))]'}`}><BookOpen size={16} /> דברי תורה</button>
      <button data-testid="filter-jokes" onClick={() => setSection('jokes')} className={`ink-button flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${section === 'jokes' ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'border border-[hsl(var(--border))] bg-[hsl(var(--card)/.5)] text-[hsl(var(--foreground))]'}`}><Laugh size={16} /> בדיחות</button>
    </div>
  </section>;
}

function BookmarkButton({ saved, onClick, compact = false, testId = 'button-toggle-favorite' }: { saved: boolean; onClick: (event: MouseEvent<HTMLButtonElement>) => void; compact?: boolean; testId?: string }) {
  return <button data-testid={testId} onClick={(event) => onClick(event)} className={`ink-button flex items-center gap-2 rounded-full ${compact ? 'p-2' : 'px-3 py-2'} ${saved ? 'bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary)/.7)]'}`} aria-label={saved ? 'הסרה משמורים' : 'שמירה לקריאה'} title={saved ? 'הסרה משמורים' : 'שמירה לקריאה'}><Bookmark size={compact ? 18 : 17} fill={saved ? 'currentColor' : 'none'} />{!compact && <span className="text-xs font-semibold">{saved ? 'נשמר' : 'שמור'}</span>}</button>;
}

function ContentCard({ item, saved, onOpen, onToggle }: { item: ContentItem; saved: boolean; onOpen: () => void; onToggle: () => void }) {
  return <article data-testid={`card-content-${item.id}`} className={`card-lift group relative flex min-h-[245px] cursor-pointer flex-col rounded-[1.4rem] border bg-[hsl(var(--card)/.72)] p-6 shadow-[var(--shadow-sm)] ${item.featured ? 'border-[hsl(var(--accent)/.55)] lg:min-h-[290px]' : 'border-[hsl(var(--card-border))]'}`} onClick={onOpen} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onOpen(); }} tabIndex={0} role="button">
    <div className="flex items-start justify-between gap-3"><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.section === 'torah' ? 'bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]' : 'bg-[hsl(var(--accent)/.13)] text-[hsl(var(--accent))]'}`}>{item.section === 'torah' ? 'דברי תורה' : 'בדיחה'}</span><BookmarkButton saved={saved} testId={`button-toggle-favorite-${item.id}`} onClick={(event) => { event.stopPropagation(); onToggle(); }} compact /></div>
    <div className="mt-7 flex-1"><div className="micro-label mb-2 text-[hsl(var(--muted-foreground))]">{item.tone}</div><h3 className={`display-serif font-bold leading-tight text-[hsl(var(--primary))] ${item.featured ? 'text-3xl' : 'text-2xl'}`}>{item.title}</h3><p className="serif-quote mt-4 max-w-[570px] text-[1.05rem] leading-7 text-[hsl(var(--foreground)/.82)]">{item.excerpt}</p></div>
    <div className="mt-7 flex items-center justify-between border-t border-[hsl(var(--border)/.7)] pt-4 text-xs text-[hsl(var(--muted-foreground))]"><span>{item.author}</span><span className="flex items-center gap-1">{item.readTime}<ChevronLeft size={14} className="transition-transform group-hover:-translate-x-1" /></span></div>
  </article>;
}

function EmptyState({ savedOnly, query, onReset }: { savedOnly: boolean; query: string; onReset: () => void }) {
  return <div className="rounded-[1.5rem] border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card)/.45)] px-6 py-16 text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]">{savedOnly ? <Bookmark size={27} /> : <Search size={27} />}</div><h3 className="display-serif text-2xl font-bold text-[hsl(var(--primary))]">{savedOnly ? 'עוד לא שמרתם דבר' : 'לא מצאנו את מה שחיפשתם'}</h3><p className="mx-auto mt-2 max-w-md leading-7 text-[hsl(var(--muted-foreground))]">{savedOnly ? 'כשתמצאו מילה שתרצו לחזור אליה, סמנו אותה בסימן הסימנייה והיא תחכה כאן.' : `אין עדיין תוצאה עבור ״${query}״. נסו מילה אחרת או חזרו לכל התכנים.`}</p><button data-testid="button-reset-feed" onClick={onReset} className="mt-6 rounded-full bg-[hsl(var(--primary))] px-5 py-2.5 text-sm font-bold text-[hsl(var(--primary-foreground))]">חזרה לכל התכנים</button></div>;
}

function ReadingView({ item, saved, onBack, onToggle }: { item: ContentItem; saved: boolean; onBack: () => void; onToggle: () => void }) {
  const [copied, setCopied] = useState(false);
  const copyLink = async () => { try { await navigator.clipboard?.writeText(`${window.location.origin}/#${item.id}`); } catch { /* clipboard unavailable */ } setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <section className="mx-auto max-w-[900px] px-5 pb-24 pt-7 lg:px-10 lg:pt-12 animate-page">
    <button data-testid="button-back-to-feed" onClick={onBack} className="mb-12 flex items-center gap-2 text-sm font-bold text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"><ArrowRight size={18} /> חזרה לכל התכנים</button>
    <div className="mb-8 flex flex-wrap items-center gap-3"><span className={`rounded-full px-3 py-1.5 text-xs font-bold ${item.section === 'torah' ? 'bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]' : 'bg-[hsl(var(--accent)/.13)] text-[hsl(var(--accent))]'}`}>{item.section === 'torah' ? 'דברי תורה' : 'בדיחה'}</span><span className="text-sm text-[hsl(var(--muted-foreground))]">{item.tone}</span></div>
    <h1 data-testid={`reading-title-${item.id}`} className="display-serif max-w-[780px] text-5xl font-bold leading-[1.08] tracking-[-.035em] text-[hsl(var(--primary))] md:text-7xl">{item.title}</h1>
    <p className="mt-7 max-w-[690px] text-xl leading-9 text-[hsl(var(--muted-foreground))]">{item.excerpt}</p>
    <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-[hsl(var(--border))] py-4 text-sm text-[hsl(var(--muted-foreground))]"><span>{item.author}</span><span className="h-1 w-1 rounded-full bg-[hsl(var(--accent))]" /><span>{item.date}</span><span className="h-1 w-1 rounded-full bg-[hsl(var(--accent))]" /><span>{item.readTime}</span><span className="mr-auto flex items-center gap-2"><BookmarkButton saved={saved} testId={`button-toggle-favorite-reading-${item.id}`} onClick={() => onToggle()} /><button data-testid={`button-copy-link-${item.id}`} onClick={copyLink} className="ink-button flex items-center gap-2 rounded-full px-3 py-2 hover:bg-[hsl(var(--secondary)/.7)]" aria-label="העתקת קישור">{copied ? <Check size={17} /> : <Copy size={17} />}<span className="text-xs font-semibold">{copied ? 'הקישור הועתק' : 'העתקת קישור'}</span></button></span></div>
    <div className="reading-copy display-serif mt-10 max-w-[700px] text-xl leading-[2] text-[hsl(var(--foreground)/.9)]">{item.body.map((paragraph, index) => <p data-testid={`reading-paragraph-${item.id}-${index}`} key={paragraph} className={index === 0 ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-[hsl(var(--accent))]' : ''}>{paragraph}</p>)}</div>
    <div className="mt-16 rounded-[1.4rem] bg-[hsl(var(--primary))] px-6 py-8 text-center text-[hsl(var(--primary-foreground))] md:px-12"><div className="micro-label text-[hsl(var(--accent))]">מחשבה לקחת</div><p className="display-serif mt-3 text-2xl font-bold leading-relaxed">״מה שנכנס ללב, מוצא את דרכו גם אל הבית.״</p></div>
  </section>;
}

function Home() {
  const [section, setSection] = useState<Section>('torah');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<ContentItem | null>(null);
  const [savedOnly, setSavedOnly] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const filtered = useMemo(() => items.filter((item) => {
    const matchesSection = savedOnly || item.section === section;
    const matchesSaved = !savedOnly || saved.has(item.id);
    const normalized = query.trim();
    const matchesQuery = !normalized || [item.title, item.excerpt, item.body.join(' '), item.tone, item.author].join(' ').includes(normalized);
    return matchesSection && matchesSaved && matchesQuery;
  }), [section, query, saved, savedOnly]);
  const toggleSaved = (id: string) => setSaved((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const resetFeed = () => { setQuery(''); setSavedOnly(false); };
  const showSaved = () => { setSavedOnly(true); setSelected(null); document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' }); };
  return <div dir="rtl" className="site-shell paper-grain">
    <Header section={section} setSection={(next) => { setSection(next); setSavedOnly(false); }} savedCount={saved.size} onSaved={showSaved} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
    {!selected && <Hero section={section} setSection={(next) => { setSection(next); setSavedOnly(false); }} query={query} setQuery={setQuery} />}
    {selected ? <ReadingView item={selected} saved={saved.has(selected.id)} onBack={() => setSelected(null)} onToggle={() => toggleSaved(selected.id)} /> : <main id="discover" className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-10">
      <div className="mb-7 flex items-end justify-between gap-4"><div><div className="micro-label mb-2 text-[hsl(var(--accent))]">{savedOnly ? 'המדף הפרטי' : 'הבחירה של השבוע'}</div><h2 className="display-serif text-3xl font-bold text-[hsl(var(--primary))]">{savedOnly ? 'מה ששמרתם' : section === 'torah' ? 'דברי תורה' : 'בדיחות'}</h2></div><span className="text-sm text-[hsl(var(--muted-foreground))]">{filtered.length} {filtered.length === 1 ? 'פריט' : 'פריטים'}</span></div>
      {filtered.length > 0 ? <div className="grid gap-5 md:grid-cols-2">{filtered.map((item, index) => <div key={item.id} className={`animate-rise delay-${Math.min(index + 1, 4)}`}><ContentCard item={item} saved={saved.has(item.id)} onOpen={() => setSelected(item)} onToggle={() => toggleSaved(item.id)} /></div>)}</div> : <EmptyState savedOnly={savedOnly} query={query} onReset={resetFeed} />}
      <div className="mt-20 grid gap-8 border-t border-[hsl(var(--border))] pt-8 md:grid-cols-[1fr_1.3fr]"><div><div className="micro-label text-[hsl(var(--accent))]">בדיוק כמו פעם</div><h2 className="display-serif mt-3 text-3xl font-bold text-[hsl(var(--primary))]">דף שמחכים לפתוח.</h2></div><p className="max-w-xl text-base leading-8 text-[hsl(var(--muted-foreground))]">אין כאן רעש מסביב. רק כמה שורות טובות, שנכתבו כדי להיקרא לאט — בדרך לעבודה, ליד הקפה, או רגע לפני הקידוש.</p></div>
    </main>}
    <footer className="border-t border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))]"><div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-9 md:flex-row md:items-center md:justify-between lg:px-10"><div className="flex items-center gap-3"><Mark size={32} /><div><div className="display-serif text-lg font-bold">דברי תורה ובדיחות</div><div className="text-xs opacity-65">מילים טובות, בקצב של דף.</div></div></div><div className="text-sm opacity-70">נכתב בעברית, נשמר בלב.</div></div></footer>
  </div>;
}

function App() {
  return <Home />;
}
export default App;