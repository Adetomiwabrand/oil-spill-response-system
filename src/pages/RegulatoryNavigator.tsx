import { useState, useMemo } from "react";
import { useInView } from "../hooks/useInView";
import { GridRule } from "../components/GridRule";
import { DataStatus } from "../components/DataStatus";
import { useRegulatoryDocs } from "../hooks/useRegulatoryDocs";

// ─── Static jurisdiction list ─────────────────────────────────────────────────
const JURISDICTIONS = [
  "All",
  "Nigeria",
  "Ghana",
  "Cameroon",
  "Equatorial Guinea",
  "Gabon",
  "Angola",
  "Kenya",
  "Tanzania",
  "Mozambique",
  "South Africa",
  "International (IMO)",
];

export default function RegulatoryNavigator() {
  // ─── Filter state ──────────────────────────────────────────────────────────
  const [query, setQuery] = useState("");
  const [activeJurisdiction, setActiveJurisdiction] = useState("All");
  const [hasSearched, setHasSearched] = useState(false);

  // ─── Scroll animations ─────────────────────────────────────────────────────
  const { ref: heroRef, inView: heroInView } = useInView<HTMLElement>({ threshold: 0.15 });
  const { ref: searchRef, inView: searchInView } = useInView<HTMLElement>({ threshold: 0.15 });
  const { ref: resultsRef, inView: resultsInView } = useInView<HTMLElement>({ threshold: 0.1 });

  // ─── Data — fetch all docs once, filter client-side ───────────────────────
  const { data: allDocs = [], isLoading, isError } = useRegulatoryDocs(100);

  // ─── Filtered results ──────────────────────────────────────────────────────
  const results = useMemo(() => {
    if (!hasSearched) return [];
    const trimmed = query.trim().toLowerCase();

    return allDocs.filter((doc) => {
      const matchesJurisdiction =
        activeJurisdiction === "All" || doc.acf.jurisdiction === activeJurisdiction;

      const matchesQuery =
        !trimmed ||
        doc.acf.clause_reference?.toLowerCase().includes(trimmed) ||
        doc.acf.summary?.toLowerCase().includes(trimmed) ||
        doc.title.rendered?.toLowerCase().includes(trimmed);

      return matchesJurisdiction && matchesQuery;
    });
  }, [allDocs, query, activeJurisdiction, hasSearched]);

  // ─── Search handler ────────────────────────────────────────────────────────
  const handleSearch = () => {
    if (!query.trim() && activeJurisdiction === "All") return;
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative bg-navyPanel overflow-hidden min-h-[480px] flex items-end"
      >
        <div className="absolute inset-0">
          <img
            src="/assets/images/home-pillar-logistics.webp"
            alt="Shipping containers at African port"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navyPanel via-navyPanel/60 to-transparent" />
        </div>

        <div
          className={`relative max-w-7xl mx-auto px-4 pb-16 pt-32 transition-all duration-700 ${
            heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-sm font-bold uppercase tracking-widest text-responseGreen mb-3">
            Regulatory Intelligence
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Regulatory Navigator
          </h1>
          <GridRule />
          <p className="text-white/70 mt-5 text-lg max-w-2xl leading-relaxed">
            Search across oil spill response regulations, IMO conventions, and
            national environmental frameworks across African jurisdictions.
          </p>
        </div>
      </section>

      {/* ── Search panel ──────────────────────────────────────────────────── */}
      <section
        ref={searchRef}
        className={`bg-navyPanel border-b border-white/10 py-10 transition-all duration-700 ${
          searchInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">

          {/* Search input row */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search regulations, clauses, obligations…"
              className="flex-1 bg-white/5 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-responseGreen focus:bg-white/10 transition-colors"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-responseGreen hover:bg-green-400 text-navyPanel font-bold px-8 py-3 text-sm transition-colors disabled:opacity-50 min-h-[44px] uppercase tracking-wider"
            >
              Search
            </button>
          </div>

          {/* Jurisdiction filter — corporate square tabs */}
          <div className="flex flex-wrap gap-2">
            {JURISDICTIONS.map((j) => (
              <button
                key={j}
                onClick={() => setActiveJurisdiction(j)}
                className={`px-3 py-1.5 text-sm font-bold uppercase tracking-wider border transition-colors ${
                  activeJurisdiction === j
                    ? "bg-responseGreen text-navyPanel border-responseGreen"
                    : "bg-transparent text-white/50 border-white/20 hover:border-white/60 hover:text-white"
                }`}
              >
                {j}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ───────────────────────────────────────────────────────── */}
      <section
        ref={resultsRef}
        className={`bg-fieldBg min-h-[480px] transition-all duration-700 ${
          resultsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Pre-search state — logo watermark */}
        {!hasSearched && (
          <div className="flex flex-col items-center justify-center py-32 gap-8 select-none">
            <img
              src="/assets/images/caa_logo2.png"
              alt="CAA"
              className="h-24 opacity-10 grayscale"
            />
            <p className="text-navyPanel/30 text-sm font-bold uppercase tracking-widest">
              Enter a keyword or select a jurisdiction to begin
            </p>
          </div>
        )}

        {/* Results area */}
        {hasSearched && (
          <div className="max-w-7xl mx-auto px-4 py-12">

            {/* Result count */}
            {!isLoading && !isError && results.length > 0 && (
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm font-bold uppercase tracking-widest text-navyPanel/40">
                  {results.length} result{results.length !== 1 ? "s" : ""} found
                </p>
                {activeJurisdiction !== "All" && (
                  <span className="text-sm font-bold uppercase tracking-wider text-responseGreen border border-responseGreen px-3 py-1">
                    {activeJurisdiction}
                  </span>
                )}
              </div>
            )}

            {/* DataStatus — loading / error / empty */}
            <DataStatus
              isLoading={isLoading}
              isError={isError}
              isEmpty={!isLoading && !isError && results.length === 0}
              emptyMessage="No regulations matched your search. Try different keywords or a broader jurisdiction."
            />

            {/* Result cards */}
            {!isLoading && !isError && results.length > 0 && (
              <div className="space-y-px">
                {results.map((doc) => (
                  <article
                    key={doc.id}
                    className="bg-white border-l-4 border-l-transparent hover:border-l-responseGreen border border-gray-200 p-6 transition-all duration-200 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-navyPanel font-black text-sm uppercase tracking-wide leading-snug">
                        {doc.acf.clause_reference || doc.title.rendered}
                      </h3>
                      <span className="shrink-0 bg-fieldBg text-navyPanel/50 text-sm font-bold uppercase tracking-wider px-3 py-1 border border-gray-200">
                        {doc.acf.jurisdiction}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-responseGreen uppercase tracking-widest mb-3">
                      {doc.acf.issuing_body}
                    </p>
                    <p className="text-navyPanel/70 text-sm leading-relaxed">
                      {doc.acf.summary}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
