import { useState, useRef } from "react";

// ─── Canonical system colors ───────────────────────────────────────
const SYSTEMS = [
  {
    id: "positioning", label: "Positioning", code: "POS", color: "#3B82F6", soft: "#EAF2FE",
    subsystems: [
      { name: "Market Position", code: "MP", tier: "FREE", areas: ["Category", "Target Market", "Competitive Landscape", "Niche Definition"] },
      { name: "Differentiation", code: "DF", tier: "FREE", areas: ["Core Message", "Desired Outcome", "Business Value", "Urgency"] },
      { name: "Competitive Positioning", code: "CP", tier: "PAID", areas: ["Market Alternatives", "Category Owner", "Buyer Perception", "Competitive Threats"] },
      { name: "Messaging", code: "MSG", tier: "FREE", areas: ["Firmographics", "Buying Triggers", "Pain Points", "Decision Makers"] },
      { name: "Value Proposition", code: "VP", tier: "FREE", areas: ["Customer Problem", "Desired Outcome", "Business Value", "Buying Behavior"] },
      { name: "Ideal Customer Profile", code: "ICP", tier: "FREE", areas: ["Customer Problem", "Desired Outcome", "Business Value", "Buying Behavior"] },
      { name: "Offer Strategy", code: "OS", tier: "PAID", areas: ["Offer Structure", "Objections", "Motivations", "Buying Behavior"] },
      { name: "Pricing Strategy", code: "PS", tier: "PAID", areas: ["Pricing Alignment", "Margin Health", "Value Perception", "Competitive Fit"] },
      { name: "Brand Identity", code: "BI", tier: "PAID", areas: ["Content Mix", "Distribution", "Consistency", "Customer Language"] },
      { name: "Go-to-Market Strategy", code: "GTM", tier: "PAID", areas: ["Pillars", "Content Mix", "Distribution", "Consistency"] },
    ],
  },
  {
    id: "authority", label: "Authority", code: "AUTH", color: "#10B981", soft: "#E7F8F1",
    subsystems: [
      { name: "Content Strategy", code: "CS", tier: "PAID", areas: ["Pillars", "Content Mix", "Distribution", "Consistency"] },
      { name: "Content Operations", code: "CO", tier: "PAID", areas: ["Founder Visibility", "Industry Perspective", "Expertise Signals", "Market Influence"] },
      { name: "Thought Leadership", code: "TL", tier: "FREE", areas: ["Founder Visibility", "Industry Perspective", "Expertise Signals", "Market Influence"] },
      { name: "Industry Authority", code: "IA", tier: "PAID", areas: ["Relevance", "Recency", "Statement", "Accessibility"] },
      { name: "Testimonials", code: "TST", tier: "FREE", areas: ["Diversity & Coverage", "Placement & Activation", "Reviews", "Awards"] },
      { name: "SEO", code: "SEO", tier: "PAID", areas: ["Technical SEO", "Content SEO", "Authority Signals", "Search Visibility"] },
      { name: "Educational Content", code: "EC", tier: "PAID", areas: ["Buyer Journey Coverage", "Depth & Expertise", "Clarity", "Relevance"] },
      { name: "Email Nurture", code: "EN", tier: "PAID", areas: ["Segmentation", "Automation", "Engagement", "Conversion Support"] },
      { name: "Brand Reputation", code: "BR", tier: "FREE", areas: ["Market Sentiment", "Online Presence", "Review Coverage", "Trust Signals"] },
      { name: "Sales Enablement Content", code: "SEC", tier: "PAID", areas: ["Battle Cards", "Proposal & Pitch Assets", "One-Pagers", "Objection Handling"] },
    ],
  },
  {
    id: "conversion", label: "Conversion", code: "CONV", color: "#E11D48", soft: "#FCEAEE",
    subsystems: [
      { name: "Demand Generation", code: "DG", tier: "FREE", areas: ["Awareness Creation", "Channel Strategy", "Message-Market Fit", "Demand Measurement"] },
      { name: "Website Conversion", code: "WC", tier: "FREE", areas: ["Messaging Alignment", "Conversion Architecture", "User Experience", "Trust & Credibility"] },
      { name: "Paid Media", code: "PM", tier: "PAID", areas: ["Audience Targeting", "Creative Quality", "ROI & Attribution", "Scaling Discipline"] },
      { name: "Referral Programs", code: "RP", tier: "PAID", areas: ["Program Structure", "Incentive Design", "Activation & Follow-Up", "Performance Tracking"] },
      { name: "Social & Community", code: "SC", tier: "PAID", areas: ["Community Building", "Platform Strategy", "Engagement Quality", "Community-to-Pipeline Conversion"] },
      { name: "Outbound", code: "OB", tier: "PAID", areas: ["Target List Quality", "Sequencing & Cadence", "Personalization", "Reply-to-Meeting Rate"] },
      { name: "Events & Partnerships", code: "EP", tier: "PAID", areas: ["Event Strategy", "Partnership Quality", "Activation & Follow-Up", "ROI Measurement"] },
      { name: "Lead Generation (MQL)", code: "LG", tier: "FREE", areas: ["Source Mix", "Lead Volume", "Lead Quality", "Lead Velocity"] },
      { name: "Lead Conversion (SQL)", code: "LC", tier: "FREE", areas: ["MQL Definition", "Qualification Criteria", "Handoff Process", "Feedback Loop"] },
      { name: "Sales Intake", code: "SI", tier: "FREE", areas: ["Friction Reduction", "Speed-to-Lead", "Routing & Assignment", "Show Rate Optimization"] },
    ],
  },
  {
    id: "lifecycle", label: "Lifecycle", code: "LFC", color: "#8B5CF6", soft: "#F1ECFE",
    subsystems: [
      { name: "Sales Process", code: "SP", tier: "FREE", areas: ["Defined Stages", "Consistency & Accountability", "Proposal & Close Process", "Conversion Rate Visibility"] },
      { name: "CRM Workflows", code: "CRM", tier: "PAID", areas: ["Workflow Design", "Data Integrity", "Adoption", "Process Impact"] },
      { name: "Lead Qualification", code: "LQ", tier: "PAID", areas: ["Qualification Criteria", "Disqualification Discipline", "Automation & Scoring", "Feedback to Marketing"] },
      { name: "Opportunity Management", code: "OM", tier: "PAID", areas: ["Pipeline Hygiene", "Deal Velocity", "Risk Management", "Forecast Accuracy"] },
      { name: "Customer Onboarding", code: "COB", tier: "FREE", areas: ["Expectation Setting", "Handoff Quality", "Time-to-Value", "Adoption"] },
      { name: "Customer Success", code: "CSX", tier: "FREE", areas: ["Proactive Communication", "Health Monitoring", "At-Risk Detection", "Outcome Delivery"] },
      { name: "Client Communication", code: "CC", tier: "PAID", areas: ["Cadence", "Transparency", "Documentation", "Responsiveness"] },
      { name: "Retention", code: "RET", tier: "FREE", areas: ["Churn Rate", "Renewal Process", "Satisfaction Measurement", "Expansion Readiness"] },
      { name: "Upsell & Expansion", code: "UE", tier: "PAID", areas: ["Upsell Process", "Cross-Sell Process", "Referral Generation", "Lifetime Value Management"] },
      { name: "Operational Standards", code: "OPS", tier: "PAID", areas: ["SOPs & Documentation", "Process Ownership", "Systems Adoption", "Scalability Readiness"] },
    ],
  },
  {
    id: "visibility", label: "Visibility", code: "VIS", color: "#F59E0B", soft: "#FEF3E2",
    subsystems: [
      { name: "KPI Frameworks", code: "KPI", tier: "FREE", areas: ["Metric Selection", "Ownership", "Consistency", "Strategic Alignment"] },
      { name: "Revenue Reporting", code: "RR", tier: "FREE", areas: ["Accuracy", "Accessibility", "Timeliness", "Trustworthiness"] },
      { name: "Forecasting", code: "FC", tier: "FREE", areas: ["Process", "Accuracy", "Confidence", "Usage"] },
      { name: "Attribution", code: "ATR", tier: "PAID", areas: ["Channel Tracking", "Source Accuracy", "Decision Support", "Completeness"] },
      { name: "Dashboarding", code: "DB", tier: "PAID", areas: ["Visibility", "Adoption", "Actionability", "Executive Alignment"] },
      { name: "Operational Intelligence", code: "OI", tier: "PAID", areas: ["Cross-Department Insights", "Leading Indicators", "Decision Readiness", "Accountability Infrastructure"] },
      { name: "Data Quality", code: "DQ", tier: "PAID", areas: ["Completeness", "Consistency", "Accuracy", "Governance"] },
      { name: "Pipeline Visibility", code: "PV", tier: "FREE", areas: ["Stage Accuracy", "Bottleneck Visibility", "Deal Risk", "Trend Analysis"] },
      { name: "Business Planning", code: "BP", tier: "PAID", areas: ["Strategic Alignment", "Capacity Planning", "Scenario Modeling", "Goal Tracking"] },
      { name: "Risk & Alerts", code: "RA", tier: "PAID", areas: ["Anomaly Detection", "Threshold Alerts", "Risk Concentration Visibility", "Early Warning Cadence"] },
    ],
  },
];

function polar(cx, cy, r, angleDeg) {
  const a = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

export default function RevenueMatrixZoomExplorer() {
  const [level, setLevel] = useState(0);
  const [sysIdx, setSysIdx] = useState(null);
  const [childIdx, setChildIdx] = useState(null);
  const [anim, setAnim] = useState(null);
  const containerRef = useRef(null);
  const animKey = useRef(0);

  const goTo = (nextLevel, e, updates = {}) => {
    const rect = containerRef.current.getBoundingClientRect();
    const originX = e ? ((e.clientX - rect.left) / rect.width) * 100 : 50;
    const originY = e ? ((e.clientY - rect.top) / rect.height) * 100 : 50;
    const dir = nextLevel > level ? "in" : "out";
    animKey.current += 1;
    setAnim({ origin: { x: originX, y: originY }, dir, key: animKey.current });
    if (updates.sysIdx !== undefined) setSysIdx(updates.sysIdx);
    if (updates.childIdx !== undefined) setChildIdx(updates.childIdx);
    setLevel(nextLevel);
  };

  const sys = sysIdx !== null ? SYSTEMS[sysIdx] : null;
  const child = sys && childIdx !== null ? sys.subsystems[childIdx] : null;

  const enterStyle = anim
    ? {
        transformOrigin: `${anim.origin.x}% ${anim.origin.y}%`,
        animation: `${anim.dir === "in" ? "zoomIn" : "zoomOut"} 420ms cubic-bezier(0.22,0.9,0.3,1)`,
      }
    : {};

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <h2 className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>
        Zoomable explorer of the Revenue Health Matrix: five parent systems, each with ten subsystems, each with four evaluation areas.
      </h2>

      <style>{`
        @keyframes zoomIn { from { transform: scale(0.12); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes zoomOut { from { transform: scale(6); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .rmz-node { cursor: pointer; transition: transform 150ms ease; }
        .rmz-node:hover { transform: scale(1.05); }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, marginBottom: 14, color: "#666" }}>
        <span
          onClick={(e) => level !== 0 && goTo(0, e, { sysIdx: null, childIdx: null })}
          style={{ cursor: level !== 0 ? "pointer" : "default", fontWeight: level === 0 ? 600 : 400, color: level === 0 ? "#111" : "#666" }}
        >
          Revenue Health Matrix
        </span>
        {sys && (
          <>
            <span>&rsaquo;</span>
            <span
              onClick={(e) => level !== 1 && goTo(1, e, { childIdx: null })}
              style={{ cursor: level !== 1 ? "pointer" : "default", fontWeight: level === 1 ? 600 : 400, color: level === 1 ? sys.color : "#666" }}
            >
              {sys.label}
            </span>
          </>
        )}
        {child && (
          <>
            <span>&rsaquo;</span>
            <span style={{ fontWeight: 600, color: sys.color }}>{child.name}</span>
          </>
        )}
      </div>

      <div
        ref={containerRef}
        style={{ position: "relative", width: "100%", height: 520, overflow: "hidden", borderRadius: 16, background: "#FAFAF8", border: "1px solid #E5E3DC" }}
      >
        <div key={anim?.key ?? "init"} style={{ position: "absolute", inset: 0, ...enterStyle }}>
          {level === 0 && <MatrixLevel onSelect={(i, e) => goTo(1, e, { sysIdx: i, childIdx: null })} />}
          {level === 1 && sys && (
            <SystemLevel sys={sys} onSelectChild={(i, e) => goTo(2, e, { childIdx: i })} onBack={(e) => goTo(0, e, { sysIdx: null, childIdx: null })} />
          )}
          {level === 2 && sys && child && (
            <SubsystemLevel sys={sys} child={child} onBack={(e) => goTo(1, e, { childIdx: null })} />
          )}
        </div>
      </div>
    </div>
  );
}

function MatrixLevel({ onSelect }) {
  const cx = 340, cy = 260, r = 180, size = 132;
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {SYSTEMS.map((s, i) => {
        const { x, y } = polar(cx, cy, r, (360 / SYSTEMS.length) * i);
        return (
          <div
            key={s.id}
            className="rmz-node"
            onClick={(e) => onSelect(i, e)}
            style={{
              position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: "50%",
              background: s.soft, border: `2px solid ${s.color}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 10,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 14, color: s.color }}>{s.label}</div>
            <div style={{ fontSize: 10, color: "#888", marginTop: 4 }}>10 subsystems</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: cx - 70, top: cy - 32, width: 140, textAlign: "center", fontSize: 12, color: "#999" }}>
        Click a system to zoom in
      </div>
    </div>
  );
}

function SystemLevel({ sys, onSelectChild, onBack }) {
  const cx = 340, cy = 260, r = 210, size = 108;
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        className="rmz-node"
        onClick={onBack}
        style={{
          position: "absolute", left: cx - 85, top: cy - 85, width: 170, height: 170, borderRadius: "50%",
          background: sys.color, color: "#fff",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 16,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 16 }}>{sys.label}</div>
        <div style={{ fontSize: 11, opacity: 0.85, marginTop: 6 }}>{sys.code} &middot; 10 subsystems</div>
        <div style={{ fontSize: 10, opacity: 0.7, marginTop: 8 }}>Click to zoom out</div>
      </div>

      {sys.subsystems.map((sub, i) => {
        const { x, y } = polar(cx, cy, r, (360 / sys.subsystems.length) * i);
        return (
          <div
            key={sub.code}
            className="rmz-node"
            onClick={(e) => onSelectChild(i, e)}
            style={{
              position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: "50%",
              background: sys.soft, border: `1.5px solid ${sys.color}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 8,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 500, color: "#333" }}>{sub.name}</div>
          </div>
        );
      })}
    </div>
  );
}

function SubsystemLevel({ sys, child, onBack }) {
  const cx = 340, cy = 260, r = 175, size = 150;
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        className="rmz-node"
        onClick={onBack}
        style={{
          position: "absolute", left: cx - 90, top: cy - 90, width: 180, height: 180, borderRadius: "50%",
          background: sys.color, color: "#fff",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 16,
        }}
      >
        <div style={{ fontSize: 10, opacity: 0.75, textTransform: "uppercase", letterSpacing: 0.5 }}>{sys.label} &middot; {child.code}</div>
        <div style={{ fontWeight: 600, fontSize: 16, marginTop: 4 }}>{child.name}</div>
        <div style={{ fontSize: 10, opacity: 0.7, marginTop: 10 }}>Click to zoom out</div>
      </div>

      {child.areas.map((area, i) => {
        const { x, y } = polar(cx, cy, r, 90 * i + 45);
        return (
          <div
            key={area}
            style={{
              position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: 14,
              background: sys.soft, border: `1.5px solid ${sys.color}`,
              display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 14, boxSizing: "border-box",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 13, color: sys.color }}>{area}</div>
          </div>
        );
      })}
    </div>
  );
}
