/**
 * seed-regulatory-navigator.ts
 *
 * Populates the regulatory_navigator table with test data.
 *
 * SETUP:
 *   1. npm install @supabase/supabase-js tsx --save-dev  (if not already installed)
 *   2. Add your credentials below (or use a .env file)
 *   3. npx tsx seed-regulatory-navigator.ts
 */

import { createClient } from "@supabase/supabase-js";

// ─── Credentials ──────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://vtcikyuslbnrtcwvfemm.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Y2lreXVzbGJucnRjd3ZmZW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMjU0MzAsImV4cCI6MjA5NDcwMTQzMH0.HAcPj7ShRWxLd78jyPz5oJPIWD_zeqgOsY418BGcoqE"; // use service role, not anon key
// ─────────────────────────────────────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const records = [
  // ── Nigeria — NOSDRA ──────────────────────────────────────────────────────
  {
    jurisdiction: "Nigeria",
    regulatory_body: "NOSDRA",
    clause_reference: "NOSDRA Act 2006 — Section 6(1)",
    legal_text:
      "Any person who causes or permits an oil spill shall immediately notify the Agency and take all reasonable steps to contain and clean up the spill. Failure to notify within 24 hours of occurrence constitutes an offence under this Act.",
  },
  {
    jurisdiction: "Nigeria",
    regulatory_body: "NOSDRA",
    clause_reference: "NOSDRA Act 2006 — Section 7",
    legal_text:
      "The polluter shall bear full liability for the cost of spill response, clean-up, remediation, and any compensation payable to affected communities. The Agency may recover such costs through civil action if the polluter fails to discharge this obligation.",
  },
  {
    jurisdiction: "Nigeria",
    regulatory_body: "NOSDRA",
    clause_reference: "NOSDRA Act 2006 — Section 9(2)",
    legal_text:
      "All operators of oil and gas facilities shall maintain an approved Oil Spill Contingency Plan (OSCP) and ensure that response equipment and trained personnel are available at all times. The plan shall be reviewed and resubmitted to the Agency every three years.",
  },
  {
    jurisdiction: "Nigeria",
    regulatory_body: "DPR / NUPRC",
    clause_reference: "OPL Regulations 1997 — Regulation 25",
    legal_text:
      "Licensees and lessees shall not discharge or permit the discharge of oil, oily water, or any other pollutant into Nigerian waters. Any discharge in excess of the permitted threshold of 15 ppm shall be reported within 24 hours to the Department of Petroleum Resources.",
  },
  {
    jurisdiction: "Nigeria",
    regulatory_body: "DPR / NUPRC",
    clause_reference: "Environmental Guidelines and Standards for the Petroleum Industry (EGASPIN) — Section 2.4",
    legal_text:
      "Tier 1 spill response (up to 10 barrels) shall be managed by the operator using on-site resources. Tier 2 spills (10–1000 barrels) require activation of the operator's OSCP and notification of NOSDRA. Tier 3 spills (above 1000 barrels) require national and potentially international assistance.",
  },

  // ── Nigeria — NIMASA ─────────────────────────────────────────────────────
  {
    jurisdiction: "Nigeria",
    regulatory_body: "NIMASA",
    clause_reference: "NIMASA Act 2007 — Section 22",
    legal_text:
      "The Agency shall enforce MARPOL 73/78 provisions within Nigerian waters and exclusive economic zone. Ship operators found discharging oil or oily mixtures in contravention of Annex I shall be subject to prosecution and vessel detention.",
  },

  // ── International (IMO) ───────────────────────────────────────────────────
  {
    jurisdiction: "International (IMO)",
    regulatory_body: "IMO",
    clause_reference: "OPRC Convention 1990 — Article 3(1)",
    legal_text:
      "Each Party shall require that ships entitled to fly its flag have on board a shipboard oil pollution emergency plan as required by and in accordance with the provisions adopted by the Organization for this purpose.",
  },
  {
    jurisdiction: "International (IMO)",
    regulatory_body: "IMO",
    clause_reference: "OPRC Convention 1990 — Article 7",
    legal_text:
      "Parties shall co-operate and provide advisory services, technical support and equipment for the purpose of responding to an oil pollution incident, upon the request of any Party affected or likely to be affected. The costs of such assistance shall be subject to agreement between the Parties involved.",
  },
  {
    jurisdiction: "International (IMO)",
    regulatory_body: "IMO",
    clause_reference: "MARPOL 73/78 — Annex I, Regulation 15",
    legal_text:
      "Any discharge into the sea of oil or oily mixtures from ships of 400 GT and above is prohibited unless the ship is proceeding en route, the oil content of the effluent without dilution does not exceed 15 ppm, and the ship has in operation an oily-water separating equipment approved by the Administration.",
  },
  {
    jurisdiction: "International (IMO)",
    regulatory_body: "IMO",
    clause_reference: "MARPOL 73/78 — Annex I, Regulation 37",
    legal_text:
      "Every ship of 400 GT and above and every ship certified to carry 200 or more persons shall carry on board a shipboard oil pollution emergency plan approved by the Administration. The plan shall be in accordance with guidelines developed by the Organization and written in the working language of the master and officers.",
  },
  {
    jurisdiction: "International (IMO)",
    regulatory_body: "IMO",
    clause_reference: "ISM Code — Section 8",
    legal_text:
      "The Company should establish procedures, plans and instructions, including checklists as appropriate, for key shipboard operations concerning the safety of the ship and the prevention of pollution. The various tasks involved should be defined and assigned to qualified personnel.",
  },

  // ── Ghana ────────────────────────────────────────────────────────────────
  {
    jurisdiction: "Ghana",
    regulatory_body: "GNPC / EPA Ghana",
    clause_reference: "Ghana Petroleum (Exploration and Production) Act 2016 — Section 54",
    legal_text:
      "A contractor shall prepare and submit an oil spill contingency plan to the Authority before commencing petroleum operations. The plan shall demonstrate the contractor's capacity to respond to a worst-case discharge scenario and shall identify Tier 1, Tier 2 and Tier 3 response resources.",
  },
  {
    jurisdiction: "Ghana",
    regulatory_body: "EPA Ghana",
    clause_reference: "Environmental Assessment Regulations 1999 (LI 1652) — Regulation 6",
    legal_text:
      "No person shall undertake a designated undertaking, including offshore petroleum operations, without an environmental permit issued by the Agency. The permit shall include conditions relating to spill prevention, response preparedness, and post-incident environmental monitoring.",
  },

  // ── Angola ───────────────────────────────────────────────────────────────
  {
    jurisdiction: "Angola",
    regulatory_body: "ANPG / MINAMB",
    clause_reference: "Angola Petroleum Activities Law (Law 10/04) — Article 47",
    legal_text:
      "Concessionaries are obliged to take all necessary measures to prevent oil spills and environmental damage during petroleum activities. In the event of a spill, immediate notification to ANPG and MINAMB is mandatory, and the concessionary bears full responsibility for remediation costs.",
  },

  // ── South Africa ─────────────────────────────────────────────────────────
  {
    jurisdiction: "South Africa",
    regulatory_body: "DFFE / SAMSA",
    clause_reference: "National Environmental Management Act (NEMA) — Section 28",
    legal_text:
      "Every person who causes, has caused or may cause significant pollution or degradation of the environment must take reasonable measures to prevent such pollution or degradation from occurring, continuing or recurring, or, in so far as such harm to the environment is authorised by law, to minimise and rectify such pollution or degradation.",
  },
  {
    jurisdiction: "South Africa",
    regulatory_body: "SAMSA",
    clause_reference: "South Africa National Plan for Marine Oil Pollution (NATPLAN) — Section 4.2",
    legal_text:
      "Tier 2 and Tier 3 responses within South African waters shall be co-ordinated by SAMSA in conjunction with the Department of Forestry, Fisheries and the Environment. Operators must activate their approved contingency plans within two hours of a confirmed spill event and provide a situation report to SAMSA within six hours.",
  },

  // ── Kenya ────────────────────────────────────────────────────────────────
  {
    jurisdiction: "Kenya",
    regulatory_body: "NEMA Kenya / KMA",
    clause_reference: "Environmental Management and Co-ordination Act (EMCA) — Section 67",
    legal_text:
      "No person shall discharge or dispose of any hazardous substance, chemical, oil or noxious liquid into the aquatic environment except in accordance with a licence issued by the Authority. Any unlicensed discharge shall attract strict liability for clean-up costs and damages to the marine environment.",
  },
];

async function seed() {
  console.log(`Seeding ${records.length} records into regulatory_navigator…\n`);

  const { data, error } = await supabase
    .from("regulatory_navigator")
    .insert(records)
    .select("id, jurisdiction, clause_reference");

  if (error) {
    console.error("❌ Seed failed:", error.message);
    throw new Error(error.message);
  }

  console.log("✅ Inserted records:\n");
  data?.forEach((r) =>
    console.log(`  [${r.id}] ${r.jurisdiction} — ${r.clause_reference}`)
  );
  console.log("\nDone. Open /presence/regulatory-navigator and test a search.");
}

seed();
