import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── Sparks Component ──────────────────────────────────────────────────────────
const Sparks = () => {
  const sparks = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    drift: (Math.random() - 0.5) * 40,
    size: Math.random() * 3 + 1,
  }));

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
      {sparks.map((s) => (
        <div
          key={s.id}
          className="spark"
          style={{
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${1.5 + Math.random()}s`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            "--drift": `${s.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

// ─── 3D Visualizer Component ──────────────────────────────────────────────────
const GrillVisualizer = () => {
  const [selectedZone, setSelectedZone] = useState<string>("classic");
  const [selectedElements, setSelectedElements] = useState<string[]>(["grill", "pergola"]);
  const [showFire, setShowFire] = useState(true);

  const zones = [
    { id: "classic", label: "Гриль-зона", desc: "Стол + мангал + навес" },
    { id: "premium", label: "Купольная", desc: "Беседка-купол с остеклением" },
    { id: "loft", label: "Бассейн", desc: "Телескопический навес" },
  ];

  const elements = [
    { id: "grill", label: "Гриль-стол" },
    { id: "pergola", label: "Навес" },
    { id: "table", label: "Стол" },
    { id: "firepit", label: "Огонь" },
    { id: "sink", label: "Мойка" },
    { id: "shelves", label: "Полки" },
  ];

  const toggleElement = (id: string) => {
    setSelectedElements((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative bg-[hsl(20,8%,8%)] border border-[hsl(20,8%,20%)] rounded-sm overflow-hidden">
      {/* 3D Scene */}
      <div className="relative h-[380px] overflow-hidden">
        {/* Sky background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,20%,8%)] via-[hsl(20,15%,8%)] to-[hsl(20,10%,5%)]" />

        {/* Stars */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 50 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}

        {/* Ground grid */}
        <div className="absolute bottom-0 left-0 right-0 h-48 grid-3d opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[hsl(20,8%,8%)] to-transparent" />

        {/* Scene elements */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-end gap-6">

          {/* Pergola */}
          {selectedElements.includes("pergola") && (
            <div className="animate-fade-in-up relative flex flex-col items-center">
              <div className="flex gap-1 mb-0">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="w-1 h-6 bg-[hsl(210,8%,40%)]" style={{ transform: `rotate(${i % 2 === 0 ? 0 : 2}deg)` }} />
                ))}
              </div>
              <div className="flex gap-12 w-full justify-between">
                <div className="w-2 h-28 bg-gradient-to-b from-[hsl(210,8%,50%)] to-[hsl(210,8%,35%)]" />
                <div className="w-2 h-28 bg-gradient-to-b from-[hsl(210,8%,50%)] to-[hsl(210,8%,35%)]" />
              </div>
            </div>
          )}

          {/* Grill/Mangal */}
          {selectedElements.includes("grill") && (
            <div className="animate-fade-in-up delay-100 relative">
              <div className="w-24 h-12 bg-gradient-to-b from-[hsl(210,8%,45%)] to-[hsl(210,8%,28%)] rounded-t-sm border border-[hsl(210,8%,55%)]">
                {showFire && (
                  <div className="absolute inset-x-2 -top-4 flex justify-center gap-1">
                    <div className="animate-fire-pulse w-2 h-4 bg-orange-500 rounded-full opacity-90 blur-[2px]" />
                    <div className="animate-fire-pulse w-3 h-6 bg-orange-400 rounded-full opacity-80 blur-[2px]" style={{ animationDelay: "0.3s" }} />
                    <div className="animate-fire-pulse w-2 h-5 bg-red-500 rounded-full opacity-85 blur-[2px]" style={{ animationDelay: "0.6s" }} />
                    <div className="animate-fire-pulse w-2 h-3 bg-orange-300 rounded-full opacity-70 blur-[2px]" style={{ animationDelay: "0.9s" }} />
                  </div>
                )}
                <div className="h-2 flex gap-1 px-2 pt-1 opacity-60">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex-1 h-full bg-[hsl(210,8%,60%)]" />
                  ))}
                </div>
              </div>
              <div className="flex justify-between mx-4">
                <div className="w-1 h-16 bg-[hsl(210,8%,38%)]" />
                <div className="w-1 h-16 bg-[hsl(210,8%,38%)]" />
              </div>
            </div>
          )}

          {/* Table */}
          {selectedElements.includes("table") && (
            <div className="animate-fade-in-up delay-200 relative">
              <div className="w-32 h-3 bg-gradient-to-b from-[hsl(30,20%,30%)] to-[hsl(30,15%,22%)] border border-[hsl(30,15%,40%)]" />
              <div className="flex justify-between mx-3">
                <div className="w-1.5 h-20 bg-[hsl(210,8%,38%)]" />
                <div className="w-1.5 h-20 bg-[hsl(210,8%,38%)]" />
              </div>
            </div>
          )}

          {/* Fire pit */}
          {selectedElements.includes("firepit") && (
            <div className="animate-fade-in-up delay-300 relative">
              <div className="w-20 h-8 bg-gradient-to-b from-[hsl(210,8%,35%)] to-[hsl(210,8%,25%)] rounded-full border border-[hsl(210,8%,50%)]">
                {showFire && (
                  <div className="absolute inset-x-4 -top-5 flex justify-center gap-1">
                    <div className="animate-fire-pulse w-2 h-5 bg-amber-500 rounded-full opacity-90 blur-[2px]" />
                    <div className="animate-fire-pulse w-3 h-7 bg-orange-400 rounded-full opacity-80 blur-[2px]" style={{ animationDelay: "0.4s" }} />
                    <div className="animate-fire-pulse w-2 h-4 bg-red-400 rounded-full opacity-85 blur-[2px]" style={{ animationDelay: "0.8s" }} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Fire ground glow */}
        {showFire && selectedElements.includes("grill") && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-40 h-8 bg-orange-600/20 blur-2xl rounded-full" />
        )}

        {/* Sparks */}
        {showFire && <Sparks />}

        {/* Zone label */}
        <div className="absolute top-4 left-4 text-xs text-[hsl(25,90%,52%)] font-['Oswald'] tracking-widest uppercase">
          {zones.find((z) => z.id === selectedZone)?.label} — {zones.find((z) => z.id === selectedZone)?.desc}
        </div>

        {/* Fire toggle */}
        <button
          onClick={() => setShowFire(!showFire)}
          className="absolute top-4 right-4 flex items-center gap-1.5 text-xs px-3 py-1.5 border border-[hsl(20,8%,25%)] hover:border-[hsl(25,90%,52%)] text-[hsl(30,10%,60%)] hover:text-[hsl(25,90%,52%)] transition-all"
        >
          <Icon name="Flame" size={12} />
          {showFire ? "Огонь вкл" : "Огонь выкл"}
        </button>
      </div>

      {/* Controls */}
      <div className="border-t border-[hsl(20,8%,18%)] p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] text-[hsl(30,10%,45%)] uppercase tracking-widest mb-2 font-['Oswald']">Тип зоны</p>
          <div className="flex gap-2 flex-wrap">
            {zones.map((z) => (
              <button
                key={z.id}
                onClick={() => setSelectedZone(z.id)}
                className={`px-3 py-1.5 text-xs font-['Oswald'] uppercase tracking-wider transition-all ${
                  selectedZone === z.id
                    ? "bg-[hsl(25,90%,52%)] text-[hsl(20,10%,6%)]"
                    : "border border-[hsl(20,8%,25%)] text-[hsl(30,10%,60%)] hover:border-[hsl(25,90%,52%)]"
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-[hsl(30,10%,45%)] uppercase tracking-widest mb-2 font-['Oswald']">Элементы</p>
          <div className="flex gap-2 flex-wrap">
            {elements.map((el) => (
              <button
                key={el.id}
                onClick={() => toggleElement(el.id)}
                className={`px-3 py-1 text-xs font-['Oswald'] uppercase tracking-wider transition-all ${
                  selectedElements.includes(el.id)
                    ? "bg-[hsl(20,8%,22%)] border border-[hsl(25,90%,52%)] text-[hsl(25,90%,65%)]"
                    : "border border-[hsl(20,8%,20%)] text-[hsl(30,10%,45%)] hover:border-[hsl(20,8%,35%)]"
                }`}
              >
                {el.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[hsl(20,8%,18%)] p-4 flex items-center justify-between">
        <p className="text-[11px] text-[hsl(30,10%,45%)]">Хотите такую гриль-зону?</p>
        <button className="flex items-center gap-2 bg-[hsl(25,90%,52%)] hover:bg-[hsl(25,90%,45%)] text-[hsl(20,10%,6%)] px-4 py-2 text-xs font-['Oswald'] uppercase tracking-wider transition-all">
          <Icon name="Phone" size={12} />
          Получить расчёт
        </button>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "about", label: "О компании" },
    { id: "services", label: "Услуги" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const catalog = [
    { icon: "Dome", name: "Купольные беседки", desc: "Беседки и павильоны купольной формы — стильно, просторно, всесезонно. Под ключ с остеклением и монтажом", price: "от 180 000 ₽", tag: "Хит" },
    { icon: "Tent", name: "Навесы и шатры", desc: "Металлические навесы и шатровые конструкции для дачи, кафе, рынков. Быстрый монтаж", price: "от 55 000 ₽", tag: "" },
    { icon: "Waves", name: "Навесы для бассейнов", desc: "Телескопические прозрачные навесы — раздвигаются вручную или автоматически, защищают воду круглый год", price: "от 320 000 ₽", tag: "Новинка" },
    { icon: "PanelLeftOpen", name: "Раздвижные навесы", desc: "Раздвижные навесы для террас и веранд — открывайте небо одним движением", price: "от 95 000 ₽", tag: "" },
    { icon: "Utensils", name: "Гриль-столы", desc: "Функциональные гриль-столы из нержавейки и стали для домашней и профессиональной кухни на улице", price: "от 28 000 ₽", tag: "" },
    { icon: "Flame", name: "Гриль-зоны", desc: "Комплексные уличные зоны для готовки и отдыха: печь, мангал, стол, навес — всё в одном проекте", price: "от 120 000 ₽", tag: "" },
  ];

  const services = [
    { icon: "Truck", title: "Доставка", desc: "Доставим изделие до вашего участка по всей области. Аккуратная погрузка и транспортировка.", details: ["Доставка до 50 км — бесплатно", "Машина с краном-манипулятором", "Страхование груза"] },
    { icon: "Wrench", title: "Монтаж", desc: "Профессиональная установка с гарантией. Фундамент, бетонирование, сварка на месте.", details: ["Выезд мастера в день доставки", "Бетонирование стоек", "Гарантия 3 года"] },
    { icon: "Ruler", title: "Замер и проект", desc: "Бесплатный выезд замерщика. Создадим 3D-проект гриль-зоны или конструкции.", details: ["Выезд бесплатно", "3D-визуализация", "Проект за 2 дня"] },
    { icon: "Shield", title: "Гарантия", desc: "5 лет на сварные швы. Антикоррозийное покрытие с гарантией 10 лет.", details: ["Металл от 4 мм", "Порошковая окраска", "Сервисное обслуживание"] },
  ];

  const stats = [
    { num: "12", label: "лет на рынке" },
    { num: "2400+", label: "проектов" },
    { num: "98%", label: "клиентов довольны" },
    { num: "48ч", label: "изготовление" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── NAV ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[hsl(20,10%,5%)]/95 backdrop-blur-sm border-b border-[hsl(20,8%,15%)]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[hsl(25,90%,52%)] rotate-45 group-hover:rotate-[60deg] transition-transform duration-300" />
              <Icon name="Flame" size={14} className="relative z-10 text-[hsl(20,10%,6%)]" />
            </div>
            <span className="font-['Oswald'] text-xl tracking-[0.2em] uppercase text-foreground">КУЗНЯ</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-['IBM_Plex_Sans'] uppercase tracking-wider transition-colors ${
                  activeSection === item.id ? "text-[hsl(25,90%,52%)]" : "text-[hsl(30,10%,65%)] hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+79991234567" className="hidden md:flex items-center gap-2 text-sm text-[hsl(30,10%,65%)] hover:text-[hsl(25,90%,52%)] transition-colors">
              <Icon name="Phone" size={14} />
              +7 (999) 123-45-67
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-[hsl(30,10%,65%)]"
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[hsl(20,10%,6%)]/98 border-b border-[hsl(20,8%,18%)] px-4 py-4 flex flex-col gap-3">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-sm font-['Oswald'] uppercase tracking-wider text-[hsl(30,10%,70%)] hover:text-[hsl(25,90%,52%)] transition-colors py-2 border-b border-[hsl(20,8%,14%)]"
              >
                {item.label}
              </button>
            ))}
            <a href="tel:+79991234567" className="text-sm text-[hsl(25,90%,52%)] pt-1">
              +7 (999) 123-45-67
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(20,10%,5%)] via-[hsl(20,8%,7%)] to-[hsl(220,15%,5%)]" />
        <div className="absolute inset-0 metal-texture opacity-30" />

        {/* Fire glow background */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[hsl(25,90%,40%)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[hsl(15,85%,35%)]/10 rounded-full blur-[100px]" />

        {/* Diagonal lines */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-[hsl(25,90%,52%)]/10 to-transparent"
              style={{ left: `${15 + i * 15}%`, height: "100%", transform: `skewX(-20deg)` }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="animate-fade-in-up inline-flex items-center gap-2 text-[10px] text-[hsl(25,90%,52%)] font-['Oswald'] uppercase tracking-[0.3em] mb-6 border border-[hsl(25,90%,52%)]/30 px-3 py-1.5">
              <div className="w-1.5 h-1.5 bg-[hsl(25,90%,52%)] rounded-full animate-pulse" />
              Навесы. Беседки. Гриль-зоны
            </div>

            <h1 className="animate-fade-in-up delay-100 font-['Oswald'] text-5xl md:text-7xl font-bold uppercase leading-none mb-2">
              <span className="metal-shimmer">КУПОЛА,</span>
            </h1>
            <h1 className="animate-fade-in-up delay-200 font-['Oswald'] text-5xl md:text-7xl font-bold uppercase leading-none mb-2">
              <span className="text-[hsl(25,90%,52%)] fire-text-glow">НАВЕСЫ,</span>
            </h1>
            <h1 className="animate-fade-in-up delay-300 font-['Oswald'] text-5xl md:text-7xl font-bold uppercase leading-none mb-8">
              <span className="text-foreground">ГРИЛЬ-ЗОНЫ</span>
            </h1>

            <p className="animate-fade-in-up delay-400 text-[hsl(30,10%,60%)] text-lg leading-relaxed mb-10 max-w-md">
              Купольные беседки и павильоны, телескопические навесы для бассейнов, раздвижные навесы для террас, гриль-столы и гриль-зоны. Под ключ с доставкой и монтажом.
            </p>

            <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo("catalog")}
                className="group flex items-center justify-center gap-2 bg-[hsl(25,90%,52%)] hover:bg-[hsl(25,90%,45%)] text-[hsl(20,10%,6%)] px-8 py-4 font-['Oswald'] text-sm uppercase tracking-widest transition-all animate-fire-pulse"
              >
                <Icon name="Grid3x3" size={16} />
                Смотреть каталог
                <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="flex items-center justify-center gap-2 border border-[hsl(20,8%,30%)] hover:border-[hsl(25,90%,52%)] text-[hsl(30,10%,70%)] hover:text-foreground px-8 py-4 font-['Oswald'] text-sm uppercase tracking-widest transition-all"
              >
                <Icon name="Phone" size={14} />
                Связаться
              </button>
            </div>
          </div>

          {/* Hero visual */}
          <div className="animate-fade-in-up delay-300 relative hidden md:block">
            <div className="relative border border-[hsl(20,8%,22%)] bg-[hsl(20,8%,9%)] p-1 animate-fire-pulse">
              <div className="relative h-80 overflow-hidden bg-gradient-to-b from-[hsl(220,15%,6%)] to-[hsl(20,10%,5%)] flex items-end justify-center">
                <div className="absolute inset-0 grid-3d opacity-30" />

                {/* Central fire icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[hsl(25,90%,52%)]/20 blur-3xl scale-150 rounded-full" />
                    <Icon name="Flame" size={120} className="relative text-[hsl(25,90%,52%)] fire-text-glow animate-float" />
                  </div>
                </div>

                {/* Corner markers */}
                {[["top-3 left-3", "border-t border-l"], ["top-3 right-3", "border-t border-r"], ["bottom-3 left-3", "border-b border-l"], ["bottom-3 right-3", "border-b border-r"]].map(([pos, border], i) => (
                  <div key={i} className={`absolute ${pos} w-4 h-4 ${border} border-[hsl(25,90%,52%)]`} />
                ))}
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-4 border-t border-[hsl(20,8%,18%)]">
                {stats.map((s, i) => (
                  <div key={i} className={`p-3 text-center ${i < 3 ? "border-r border-[hsl(20,8%,18%)]" : ""}`}>
                    <div className="font-['Oswald'] text-lg text-[hsl(25,90%,52%)] leading-none counter-num">{s.num}</div>
                    <div className="text-[9px] text-[hsl(30,10%,45%)] uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-[10px] text-[hsl(30,10%,40%)] font-['Oswald'] uppercase tracking-widest">Листать</span>
          <Icon name="ChevronDown" size={16} className="text-[hsl(25,90%,52%)]" />
        </div>
      </section>

      {/* ── FORGE LINE ── */}
      <div className="forge-line h-px" />

      {/* ── CATALOG ── */}
      <section id="catalog" className="py-24 relative">
        <div className="absolute inset-0 metal-texture opacity-10" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <div className="text-[10px] text-[hsl(25,90%,52%)] font-['Oswald'] uppercase tracking-[0.3em] mb-3">// 01 Каталог</div>
              <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold uppercase">
                Наши <span className="text-[hsl(25,90%,52%)]">изделия</span>
              </h2>
            </div>
            <p className="text-[hsl(30,10%,55%)] max-w-xs text-sm">Купольные беседки, телескопические навесы, гриль-зоны — всё под ключ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalog.map((item, i) => (
              <div
                key={i}
                className="product-card relative bg-[hsl(20,8%,9%)] border border-[hsl(20,8%,16%)] hover:border-[hsl(25,90%,52%)]/40 p-6 cursor-pointer group"
              >
                {item.tag && (
                  <div className="absolute top-4 right-4 text-[9px] bg-[hsl(25,90%,52%)] text-[hsl(20,10%,6%)] px-2 py-0.5 font-['Oswald'] uppercase tracking-wider">
                    {item.tag}
                  </div>
                )}

                <div className="w-12 h-12 bg-[hsl(20,8%,13%)] border border-[hsl(20,8%,20%)] group-hover:border-[hsl(25,90%,52%)]/50 flex items-center justify-center mb-5 transition-all">
                  <Icon name={item.icon} size={22} className="text-[hsl(25,90%,52%)]" />
                </div>

                <h3 className="font-['Oswald'] text-xl uppercase tracking-wide mb-2">{item.name}</h3>
                <p className="text-[hsl(30,10%,52%)] text-sm leading-relaxed mb-5">{item.desc}</p>

                <div className="flex items-center justify-between">
                  <span className="font-['Oswald'] text-[hsl(25,90%,52%)] text-lg">{item.price}</span>
                  <button className="flex items-center gap-1 text-xs text-[hsl(30,10%,45%)] hover:text-[hsl(25,90%,52%)] transition-colors font-['Oswald'] uppercase tracking-wider">
                    Подробнее
                    <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3D VISUALIZER ── */}
      <section className="py-20 bg-[hsl(20,8%,7%)] relative overflow-hidden">
        <div className="absolute inset-0 metal-texture opacity-15" />
        <div className="absolute top-0 left-0 right-0 h-px forge-line" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-[10px] text-[hsl(25,90%,52%)] font-['Oswald'] uppercase tracking-[0.3em] mb-3">// Визуализатор</div>
              <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold uppercase mb-6">
                Конструктор<br />
                <span className="text-[hsl(25,90%,52%)]">вашего проекта</span>
              </h2>
              <p className="text-[hsl(30,10%,55%)] leading-relaxed mb-6">
                Соберите свою идеальную зону отдыха. Выберите тип, добавьте элементы — и получите расчёт стоимости.
              </p>
              <div className="flex flex-col gap-3 text-sm text-[hsl(30,10%,55%)]">
                {["Конструктор обновляется в реальном времени", "Более 20 элементов для комбинации", "Бесплатный выезд замерщика"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[hsl(25,90%,52%)] rounded-full" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <GrillVisualizer />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px forge-line" />
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="relative border border-[hsl(20,8%,18%)] hover:border-[hsl(25,90%,52%)]/40 p-8 bg-[hsl(20,8%,9%)] transition-all group"
                >
                  <div className="absolute top-0 left-0 w-6 h-0.5 bg-[hsl(25,90%,52%)] group-hover:w-full transition-all duration-500" />
                  <div className="font-['Oswald'] text-5xl font-bold text-[hsl(25,90%,52%)] fire-text-glow mb-2">{s.num}</div>
                  <div className="text-[hsl(30,10%,55%)] text-sm uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="text-[10px] text-[hsl(25,90%,52%)] font-['Oswald'] uppercase tracking-[0.3em] mb-3">// 02 О компании</div>
              <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold uppercase mb-6">
                Создаём пространства<br /><span className="text-[hsl(25,90%,52%)]">с 2012 года</span>
              </h2>
              <p className="text-[hsl(30,10%,58%)] leading-relaxed mb-5">
                Мы — производственная компания полного цикла. Проектируем и строим купольные беседки, навесы для бассейнов и террас, гриль-зоны под ключ. Собственный завод площадью 3 000 м² в Москве.
              </p>
              <p className="text-[hsl(30,10%,58%)] leading-relaxed mb-8">
                Наши мастера — это сварщики с разрядом 5–6, работающие в профессии более 15 лет. Используем только сертифицированный российский металл.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  { icon: "Award", text: "Сертификат качества ISO 9001" },
                  { icon: "MapPin", text: "Завод в Москве, Варшавское ш." },
                  { icon: "Clock", text: "Работаем 7 дней в неделю" },
                ].map(({ icon, text }, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[hsl(30,10%,60%)]">
                    <div className="w-8 h-8 bg-[hsl(20,8%,13%)] border border-[hsl(20,8%,22%)] flex items-center justify-center flex-shrink-0">
                      <Icon name={icon} size={14} className="text-[hsl(25,90%,52%)]" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-[hsl(20,8%,7%)] relative">
        <div className="absolute inset-0 metal-texture opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-px forge-line" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <div className="text-center mb-14">
            <div className="text-[10px] text-[hsl(25,90%,52%)] font-['Oswald'] uppercase tracking-[0.3em] mb-3">// 03 Услуги</div>
            <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold uppercase">
              Монтаж и <span className="text-[hsl(25,90%,52%)]">доставка</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((svc, i) => (
              <div
                key={i}
                className="relative border border-[hsl(20,8%,18%)] hover:border-[hsl(25,90%,52%)]/40 bg-[hsl(20,8%,9%)] p-6 transition-all group"
              >
                <div className="w-10 h-10 bg-[hsl(25,90%,52%)]/10 border border-[hsl(25,90%,52%)]/30 flex items-center justify-center mb-5 group-hover:bg-[hsl(25,90%,52%)]/20 transition-all">
                  <Icon name={svc.icon} size={18} className="text-[hsl(25,90%,52%)]" />
                </div>
                <h3 className="font-['Oswald'] text-xl uppercase tracking-wide mb-3">{svc.title}</h3>
                <p className="text-[hsl(30,10%,52%)] text-sm leading-relaxed mb-5">{svc.desc}</p>
                <div className="flex flex-col gap-2 border-t border-[hsl(20,8%,18%)] pt-4">
                  {svc.details.map((d, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-[hsl(30,10%,48%)]">
                      <Icon name="Check" size={10} className="text-[hsl(25,90%,52%)] flex-shrink-0" />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px forge-line" />
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="text-[10px] text-[hsl(25,90%,52%)] font-['Oswald'] uppercase tracking-[0.3em] mb-3">// 04 Контакты</div>
              <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold uppercase mb-6">
                Обсудим<br /><span className="text-[hsl(25,90%,52%)]">ваш проект</span>
              </h2>
              <p className="text-[hsl(30,10%,58%)] leading-relaxed mb-10">
                Оставьте заявку — перезвоним за 15 минут и бесплатно проконсультируем по любому вопросу.
              </p>

              <div className="flex flex-col gap-5">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67", href: "tel:+79991234567" },
                  { icon: "Mail", label: "Email", value: "info@kuznya.ru", href: "mailto:info@kuznya.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, Варшавское ш., 87к1", href: "#" },
                  { icon: "Clock", label: "График", value: "Пн–Вс, 8:00–20:00", href: "#" },
                ].map(({ icon, label, value, href }, i) => (
                  <a key={i} href={href} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-[hsl(20,8%,12%)] border border-[hsl(20,8%,20%)] group-hover:border-[hsl(25,90%,52%)]/50 flex items-center justify-center flex-shrink-0 transition-all">
                      <Icon name={icon} size={16} className="text-[hsl(25,90%,52%)]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-[hsl(30,10%,40%)] uppercase tracking-wider">{label}</div>
                      <div className="text-sm text-[hsl(30,15%,75%)] group-hover:text-foreground transition-colors">{value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-[hsl(20,8%,9%)] border border-[hsl(20,8%,18%)] p-8 animate-fire-pulse">
              <h3 className="font-['Oswald'] text-2xl uppercase tracking-wide mb-6">Оставить заявку</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] text-[hsl(30,10%,45%)] uppercase tracking-widest block mb-1.5">Имя</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Как вас зовут?"
                    className="w-full bg-[hsl(20,8%,12%)] border border-[hsl(20,8%,22%)] focus:border-[hsl(25,90%,52%)] text-foreground px-4 py-3 text-sm outline-none transition-all placeholder:text-[hsl(30,10%,35%)]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[hsl(30,10%,45%)] uppercase tracking-widest block mb-1.5">Телефон</label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-[hsl(20,8%,12%)] border border-[hsl(20,8%,22%)] focus:border-[hsl(25,90%,52%)] text-foreground px-4 py-3 text-sm outline-none transition-all placeholder:text-[hsl(30,10%,35%)]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[hsl(30,10%,45%)] uppercase tracking-widest block mb-1.5">Описание проекта</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Опишите что хотите изготовить..."
                    rows={4}
                    className="w-full bg-[hsl(20,8%,12%)] border border-[hsl(20,8%,22%)] focus:border-[hsl(25,90%,52%)] text-foreground px-4 py-3 text-sm outline-none transition-all resize-none placeholder:text-[hsl(30,10%,35%)]"
                  />
                </div>
                <button className="w-full bg-[hsl(25,90%,52%)] hover:bg-[hsl(25,90%,45%)] text-[hsl(20,10%,6%)] py-4 font-['Oswald'] text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                  <Icon name="Send" size={14} />
                  Отправить заявку
                </button>
                <p className="text-[10px] text-[hsl(30,10%,40%)] text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[hsl(20,8%,15%)] py-8 bg-[hsl(20,8%,5%)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-[hsl(25,90%,52%)] rotate-45" />
              <Icon name="Flame" size={10} className="relative z-10 text-[hsl(20,10%,6%)]" />
            </div>
            <span className="font-['Oswald'] text-base tracking-[0.2em] uppercase">КУЗНЯ</span>
          </div>
          <div className="flex gap-6 text-[11px] text-[hsl(30,10%,40%)] font-['Oswald'] uppercase tracking-wider">
            {nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="hover:text-[hsl(25,90%,52%)] transition-colors">
                {n.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[hsl(30,10%,35%)]">© 2024 КУЗНЯ. Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;