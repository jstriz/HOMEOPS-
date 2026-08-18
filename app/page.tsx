"use client";

import { useState } from "react";

type Screen = "Home" | "Property" | "Assets" | "Records" | "Service" | "Passport" | "Room";

const homes = [
  { id: "home", name: "Your Home", line: "Colorado Springs, CO · primary demo", health: 82 },
  { id: "cedar", name: "Cedar Ridge", line: "Colorado Springs, CO · sample", health: 91 },
  { id: "monument", name: "Monument Park", line: "Colorado Springs, CO · sample condo", health: 76 },
];

type Asset = {
  name: string; category: string; location: string; age: string; health: number;
  status: "Good" | "Watch" | "Action soon"; note: string;
  brand: string; model: string; serial: string; installed: string; installedAge: string;
  lifeYears: number; lifeUsedPct: number; lifeLeftLabel: string;
  lastService: string; nextService: string; maintStatus: string;
  warrantyProvider: string; warrantyExpires: string; warrantyCoverage: string;
  documents: { name: string; meta: string }[];
};

const assets: Asset[] = [
  {
    name: "Roof system", category: "Envelope", location: "Roof / exterior", age: "9 years", health: 88,
    status: "Good", note: "Inspection photos and warranty on file",
    brand: "GAF Timberline HDZ", model: "Timberline HDZ · Charcoal", serial: "N/A — shingle roof, no unit serial",
    installed: "Jun 2017", installedAge: "9 yrs", lifeYears: 30, lifeUsedPct: 30, lifeLeftLabel: "21 yrs",
    lastService: "Aug 12, 2026 · inspection", nextService: "Aug 2027", maintStatus: "Up to date",
    warrantyProvider: "GAF Golden Pledge", warrantyExpires: "Jun 2047", warrantyCoverage: "Materials + workmanship, transferable once",
    documents: [
      { name: "Inspection report", meta: "12 photos · Aug 12, 2026" },
      { name: "Manufacturer warranty", meta: "PDF · filed at install" },
    ],
  },
  {
    name: "Furnace + A/C", category: "HVAC", location: "Mechanical room", age: "12 years", health: 71,
    status: "Watch", note: "Annual service due in 30 days",
    brand: "Carrier Infinity 24VNA9", model: "24VNA936A0030", serial: "3324A7719F",
    installed: "May 2014", installedAge: "12 yrs", lifeYears: 15, lifeUsedPct: 80, lifeLeftLabel: "3 yrs",
    lastService: "Mar 04, 2025 · filter replacement", nextService: "Sep 17, 2026", maintStatus: "Due soon",
    warrantyProvider: "Carrier", warrantyExpires: "May 2024 — expired", warrantyCoverage: "10-yr parts (expired) · service plan recommended",
    documents: [
      { name: "Service record", meta: "Filter replacement · Mar 2025" },
      { name: "Install manual", meta: "PDF" },
    ],
  },
  {
    name: "Water heater", category: "Plumbing", location: "Mechanical room", age: "8 years", health: 68,
    status: "Action soon", note: "Flush history needs verification",
    brand: "Rheem Performance Platinum XE50", model: "XE50T10HD50U1", serial: "RH50-88213X",
    installed: "May 2018", installedAge: "8 yrs", lifeYears: 12, lifeUsedPct: 67, lifeLeftLabel: "4 yrs",
    lastService: "Not on file", nextService: "Flush recommended", maintStatus: "Needs verification",
    warrantyProvider: "Rheem", warrantyExpires: "May 2028", warrantyCoverage: "10-yr tank, 6-yr parts",
    documents: [
      { name: "Purchase receipt", meta: "Missing — add to strengthen record" },
    ],
  },
  {
    name: "Electrical panel", category: "Electrical", location: "Garage", age: "18 years", health: 93,
    status: "Good", note: "Panel label verified",
    brand: "Square D Homeline", model: "HOM2040M200PC · 200A", serial: "SQD-200-4471",
    installed: "Jan 2008", installedAge: "18 yrs", lifeYears: 40, lifeUsedPct: 45, lifeLeftLabel: "22 yrs",
    lastService: "Jun 2024 · label verification", nextService: "Jun 2029", maintStatus: "Up to date",
    warrantyProvider: "Square D", warrantyExpires: "Jan 2018 — expired", warrantyCoverage: "Limited lifetime on breakers only",
    documents: [
      { name: "Panel label photo", meta: "Verified · Jun 2024" },
    ],
  },
];

type Equipment = { name: string; note: string; status: "Good" | "Watch" | "Action soon"; assetIndex?: number };
type Room = {
  name: string; condition: "Good" | "Watch" | "Action soon"; note: string;
  equipment: Equipment[];
  materials: { label: string; value: string }[];
  history: { date: string; text: string }[];
};

const rooms: Room[] = [
  {
    name: "Kitchen", condition: "Good", note: "All fixtures and appliances in good working order.",
    equipment: [
      { name: "Kitchen sink", note: "InSinkErator Evolution", status: "Good" },
      { name: "Dishwasher", note: "Bosch SHXM4AY55N", status: "Good" },
      { name: "Garbage disposal", note: "InSinkErator Badger 5", status: "Good" },
      { name: "GFCI outlet — island", note: "Leviton", status: "Good" },
    ],
    materials: [
      { label: "Countertop", value: "Quartz" },
      { label: "Flooring", value: "Luxury vinyl plank" },
      { label: "Cabinets", value: "Painted maple, shaker" },
    ],
    history: [{ date: "Jul 28, 2026", text: "Kitchen faucet replaced" }],
  },
  {
    name: "Living room", condition: "Good", note: "Comfortable and well maintained.",
    equipment: [
      { name: "Ceiling fan", note: "Hunter, 3-speed", status: "Good" },
      { name: "Smoke detector", note: "Hardwired + battery backup", status: "Good" },
      { name: "Thermostat", note: "Ecobee smart thermostat", status: "Good" },
    ],
    materials: [
      { label: "Flooring", value: "Engineered hardwood" },
      { label: "Paint", value: "Sherwin-Williams Agreeable Gray" },
    ],
    history: [{ date: "Feb 2024", text: "Smart thermostat installed" }],
  },
  {
    name: "Mechanical room", condition: "Watch", note: "One item needs review before winter.",
    equipment: [
      { name: "Furnace + A/C", note: "Carrier Infinity 24VNA9", status: "Watch", assetIndex: 1 },
      { name: "Water heater", note: "Rheem Performance Platinum XE50", status: "Action soon", assetIndex: 2 },
      { name: "Sump pump", note: "Not yet documented", status: "Watch" },
    ],
    materials: [{ label: "Flooring", value: "Sealed concrete" }],
    history: [{ date: "Mar 04, 2025", text: "HVAC filter replaced" }],
  },
  {
    name: "Primary bedroom", condition: "Good", note: "No open items.",
    equipment: [
      { name: "Smoke detector", note: "Hardwired + battery backup", status: "Good" },
      { name: "Window", note: "Double-pane, good seal", status: "Good" },
      { name: "Closet light", note: "LED, motion sensor", status: "Good" },
    ],
    materials: [
      { label: "Flooring", value: "Carpet" },
      { label: "Paint", value: "Behr Swiss Coffee" },
    ],
    history: [{ date: "—", text: "No recent activity" }],
  },
  {
    name: "Roof / exterior", condition: "Good", note: "Inspected recently, holding up well.",
    equipment: [
      { name: "Roof system", note: "GAF Timberline HDZ", status: "Good", assetIndex: 0 },
      { name: "Gutters", note: "Aluminum, K-style", status: "Good" },
      { name: "Exterior siding", note: "Fiber cement lap siding", status: "Good" },
    ],
    materials: [
      { label: "Roofing", value: "Architectural asphalt shingle" },
      { label: "Siding", value: "Fiber cement" },
    ],
    history: [{ date: "Aug 12, 2026", text: "Roof inspection completed" }],
  },
];

function Status({ children }: { children: string }) { return <span className={`status ${children === "Good" ? "good" : children === "Watch" ? "watch" : "soon"}`}>{children}</span>; }
function Score({ score, title, note }: { score:number; title:string; note:string }) { return <div className="score" style={{background:`conic-gradient(#2e8b68 ${score*3.6}deg,#e6efed 0deg)`}}><div><b>{score}</b><span>{title}</span><small>{note}</small></div></div>; }

export default function App() {
  const [screen, setScreen] = useState<Screen>("Home"); const [homeId,setHomeId]=useState("home"); const [openHomes,setOpenHomes]=useState(false); const [asset,setAsset]=useState(1); const [room,setRoom]=useState(0); const [issue,setIssue]=useState(false);
  const home=homes.find(h=>h.id===homeId) ?? homes[0];
  const go=(next:Screen)=>setScreen(next);
  const titleFor = (s:Screen) => s==="Home" ? "Good afternoon, Joshua." : s==="Passport" ? assets[asset].name : s==="Room" ? rooms[room].name : s;
  const eyebrowFor = (s:Screen) => s==="Passport" ? "ASSET PASSPORT" : s==="Room" ? "ROOM DETAIL" : s.toUpperCase();
  return <main className="shell"><aside className="sidebar"><div className="brand"><i>H</i>Home<span>Ops</span></div><p className="side-label">PROPERTY WORKSPACE</p><button className="home-select" onClick={()=>setOpenHomes(!openHomes)}><i>{home.name.split(" ").map(x=>x[0]).join("")}</i><span><b>{home.name}</b><small>{home.line}</small></span><em>⌄</em></button>{openHomes&&<div className="home-menu">{homes.map(h=><button key={h.id} onClick={()=>{setHomeId(h.id);setOpenHomes(false)}}><b>{h.name}</b><small>{h.health} health</small></button>)}</div>}<nav>{(["Home","Property","Assets","Records","Service"] as Screen[]).map((n,i)=><button className={screen===n?"nav active":"nav"} onClick={()=>go(n)} key={n}><i>{["⌂","⌘","◈","▤","↗"][i]}</i>{n}</button>)}</nav><div className="side-bottom"><button onClick={()=>go("Service")}>✦ Ask HomeOps</button><small>Proof of concept · Demo data</small></div></aside><section className="main"><header><div><p className="eyebrow">HOMEOPS / {eyebrowFor(screen)}</p><h1>{titleFor(screen)}</h1></div><div className="header-buttons"><button className="plain">Share record</button><button className="primary" onClick={()=>go("Service")}>+ Add / Request help</button><i>JS</i></div></header>{screen==="Home"&&<Home home={home} go={go} request={()=>{setIssue(true);go("Service")}}/>}{screen==="Property"&&<Property home={home} asset={asset} setAsset={setAsset} setRoom={setRoom} go={go}/>} {screen==="Assets"&&<Assets asset={asset} setAsset={setAsset} go={go}/>} {screen==="Records"&&<Records/>}{screen==="Service"&&<Service issue={issue}/>}{screen==="Passport"&&<Passport asset={asset} go={go}/>}{screen==="Room"&&<RoomDetail room={room} go={go} setAsset={setAsset}/>}</section></main>;
}

function Home({home,go,request}:{home:typeof homes[number];go:(s:Screen)=>void;request:()=>void}) { return <div className="home-grid"><section className="hero-card"><div><p className="eyebrow green-label">PRIMARY DEMO PROPERTY</p><h2>{home.name}</h2><p>{home.line}</p><div className="facts"><span>Built 2006</span><span>2,186 sq ft</span><span>4 bed · 3 bath</span></div><button className="plain" onClick={()=>go("Property")}>Open digital twin →</button></div><figure><img src="/dollhouse.png" alt="Roof-off 3D dollhouse property model"/><figcaption>Demo twin · replace with mirrored home model</figcaption></figure></section><section className="health-card"><div className="health-top"><Score score={home.health} title="Home Health" note="Good"/><div><h3>Healthy, with 2 items to plan.</h3><p>Overall condition is strong. Keep the maintenance rhythm and plan ahead for aging equipment.</p><button className="link" onClick={()=>go("Assets")}>See score drivers →</button></div></div><div className="metrics"><Metric value="79" label="Performance" note="↑ 3 this year"/><Metric value="74" label="Readiness" note="2 tasks due"/><Metric value="68%" label="Record complete" note="14 open items"/></div></section><section className="card priority"><Title eyebrow="PRIORITY QUEUE" title="Needs attention" action="View all" onAction={()=>go("Assets")}/><Alert text="HVAC annual service" detail="Due in 30 days · Heating & cooling" status="Watch" action="Request help" onClick={request}/><Alert text="Water heater maintenance" detail="Flush history incomplete · Mechanical room" status="Action soon" action="Review" onClick={()=>go("Assets")}/></section><section className="card upcoming"><Title eyebrow="NEXT 60 DAYS" title="Keep ahead of the home" action="Calendar →"/><div className="date"><time>AUG 21</time><i/><p><b>Replace HVAC filter</b><small>DIY · 10 minutes</small></p></div><div className="date"><time>SEP 14</time><i className="amber"/><p><b>Annual HVAC service</b><small>Schedule contractor</small></p></div><div className="date"><time>OCT 01</time><i className="navy"/><p><b>Winterize exterior</b><small>Seasonal checklist</small></p></div></section><section className="card activity"><Title eyebrow="LIVING RECORD" title="Recent activity" action="Open record →" onAction={()=>go("Records")}/>{[["✓","Roof inspection added","Inspection report · 12 photos · Aug 12"],["↗","Kitchen faucet replaced","Receipt and warranty saved · Jul 28"],["+","Water heater details needed","Add model and serial to strengthen record"]].map(x=><div className="activity-row" key={x[1]}><i>{x[0]}</i><p><b>{x[1]}</b><small>{x[2]}</small></p></div>)}</section></div>; }
function Metric({value,label,note}:{value:string;label:string;note:string}){return <div><b>{value}</b><span>{label}</span><small>{note}</small></div>}
function Title({eyebrow,title,action,onAction}:{eyebrow:string;title:string;action:string;onAction?:()=>void}){return <div className="title"><div><p className="eyebrow">{eyebrow}</p><h3>{title}</h3></div><button className="link" onClick={onAction}>{action}</button></div>}
function Alert({text,detail,status,action,onClick}:{text:string;detail:string;status:string;action:string;onClick:()=>void}){return <div className="alert"><i className={status==="Watch"?"orange":"amber"}/><p><b>{text}</b><small>{detail}</small></p><Status>{status}</Status><button onClick={onClick}>{action}</button></div>}

function Property({home,asset,setAsset,setRoom,go}:{home:typeof homes[number];asset:number;setAsset:(n:number)=>void;setRoom:(n:number)=>void;go:(s:Screen)=>void}) { return <div className="page"><section className="property-hero"><div><p className="eyebrow">DIGITAL TWIN / {home.name.toUpperCase()}</p><h2>Explore the home, not folders.</h2><p>Tap a room or system to see its equipment, evidence, and history.</p><div className="tabs"><button className="selected">Whole home</button><button>1st floor</button><button>2nd floor</button><button>Exterior</button></div></div><figure className="twin"><img src="/dollhouse.png" alt="Demo roof-off dollhouse"/><figcaption>Mirror the primary demo property from its real plan, photos, and asset locations.</figcaption></figure></section><section className="property-bottom"><div className="room-list"><p className="eyebrow">SPACES & SYSTEMS</p>{rooms.map((r,i)=><button key={r.name} onClick={()=>{setRoom(i);setAsset(i===2?2:i===4?0:1);go("Room")}}><i className={r.condition==="Good"?"":"orange"}/><b>{r.name}</b><small>{r.condition==="Good"?"Healthy":"1 item needs review"}</small><em>›</em></button>)}</div><div className="selected-asset"><p className="eyebrow">SELECTED ASSET</p><h3>{assets[asset].name}</h3><div className="photo-box">Asset photos & evidence</div><div className="trio"><span><b>{assets[asset].health}</b>Health</span><span><b>{assets[asset].age}</b>Age</span><span><b>2034</b>Plan horizon</span></div><button className="primary" onClick={()=>go("Passport")}>Open asset passport</button></div></section></div>; }

function Assets({asset,setAsset,go}:{asset:number;setAsset:(n:number)=>void;go:(s:Screen)=>void}){
  const a=assets[asset];
  const [catFilter,setCatFilter]=useState<string|null>(null);
  const categories=Array.from(new Set(assets.map(r=>r.category)));
  const visible=assets.map((_,i)=>i).filter(i=>!catFilter||assets[i].category===catFilter);
  return <div className="page"><section className="asset-head"><div><p className="eyebrow">ASSET PASSPORTS</p><h2>Every important system has a record.</h2><p>Identity, condition, lifecycle, maintenance, warranty, and proof in one place.</p></div><div><b>{assets.length}</b><span>assets captured</span><small>68% complete</small></div></section><section className="cat-tiles">{categories.map(c=>{const count=assets.filter(r=>r.category===c).length;return <button key={c} className={catFilter===c?"cat-tile selected":"cat-tile"} onClick={()=>setCatFilter(catFilter===c?null:c)}><b>{c}</b><span>{count} {count===1?"asset":"assets"}</span></button>})}</section><section className="assets-layout"><div className="asset-list">{visible.map(i=>{const row=assets[i];return <button className={i===asset?"asset-row selected":"asset-row"} onClick={()=>setAsset(i)} key={row.name}><i className={row.status==="Good"?"asset-icon":"asset-icon orange"}>{row.category[0]}</i><p><b>{row.name}</b><small>{row.category} · {row.age}</small></p><span className="bar"><i style={{width:`${row.health}%`}}/><small>{row.health} health</small></span><Status>{row.status}</Status><em>›</em></button>})}</div><aside className="passport"><p className="eyebrow">ASSET PASSPORT</p><Status>{a.status}</Status><h3>{a.name}</h3><p>{a.category} · {a.location}</p><div className="photo-box">Equipment photo</div><div className="trio"><span><b>{a.health}</b>Health</span><span><b>{a.age}</b>Current age</span><span><b>{a.lifeLeftLabel}</b>Est. life left</span></div><div className="note"><b>Why this status</b><p>{a.note}. HomeOps keeps this separate from verified records.</p></div><button className="plain" onClick={()=>go("Passport")}>View evidence & history →</button></aside></section></div>
}

function Passport({asset,go}:{asset:number;go:(s:Screen)=>void}){
  const a=assets[asset];
  const [tab,setTab]=useState<"Maintenance"|"Warranty"|"Documents">("Maintenance");
  return <div className="page">
    <button className="link" onClick={()=>go("Assets")}>‹ Back to assets</button>
    <section className="passport-hero">
      <div className="passport-top"><p className="eyebrow">{a.category.toUpperCase()} · {a.location.toUpperCase()}</p><Status>{a.status}</Status></div>
      <div className="passport-head">
        <div><h2>{a.brand}</h2><p>{a.name}</p></div>
        <div className="photo-box passport-photo">Equipment photo</div>
      </div>
      <div className="field-grid">
        <div><span>Model</span><b>{a.model}</b></div>
        <div><span>Serial number</span><b>{a.serial}</b></div>
        <div><span>Installed</span><b>{a.installed} · {a.installedAge}</b></div>
      </div>
      <div className="life-row">
        <span>Life expectancy</span>
        <div className="life-bar"><i style={{width:`${a.lifeUsedPct}%`}}/></div>
        <b>{a.lifeYears} yrs total · {a.lifeUsedPct}% used</b>
      </div>
    </section>
    <section className="card passport-tabs">
      <div className="tabs">
        {(["Maintenance","Warranty","Documents"] as const).map(t=>
          <button key={t} className={tab===t?"selected":""} onClick={()=>setTab(t)}>{t}</button>
        )}
      </div>
      <div className="tab-rows">
        {tab==="Maintenance"&&<>
          <div className="tab-row"><i>✓</i><p><b>Last service</b><small>{a.lastService}</small></p></div>
          <div className="tab-row"><i>✓</i><p><b>Next service</b><small>{a.nextService}</small></p></div>
          <div className="tab-row"><i>●</i><p><b>Status</b><small>{a.maintStatus}</small></p></div>
        </>}
        {tab==="Warranty"&&<>
          <div className="tab-row"><i>✓</i><p><b>Provider</b><small>{a.warrantyProvider}</small></p></div>
          <div className="tab-row"><i>✓</i><p><b>Expires</b><small>{a.warrantyExpires}</small></p></div>
          <div className="tab-row"><i>✓</i><p><b>Coverage</b><small>{a.warrantyCoverage}</small></p></div>
        </>}
        {tab==="Documents"&&a.documents.map(d=>
          <div className="tab-row" key={d.name}><i>▤</i><p><b>{d.name}</b><small>{d.meta}</small></p></div>
        )}
      </div>
    </section>
    <section className="note">
      <b>Why this status</b>
      <p>{a.note}. HomeOps keeps this separate from verified records.</p>
    </section>
  </div>;
}

function RoomDetail({room,go,setAsset}:{room:number;go:(s:Screen)=>void;setAsset:(n:number)=>void}){
  const r=rooms[room];
  const [tab,setTab]=useState<"Overview"|"Equipment"|"Materials"|"History">("Overview");
  return <div className="page">
    <button className="link" onClick={()=>go("Property")}>‹ Back to digital twin</button>
    <section className="passport-hero">
      <div className="passport-top"><p className="eyebrow">ROOM · {r.name.toUpperCase()}</p><Status>{r.condition}</Status></div>
      <div className="passport-head">
        <div><h2>{r.name}</h2><p>{r.note}</p></div>
        <div className="photo-box passport-photo">Room photo</div>
      </div>
    </section>
    <section className="card passport-tabs">
      <div className="tabs">
        {(["Overview","Equipment","Materials","History"] as const).map(t=>
          <button key={t} className={tab===t?"selected":""} onClick={()=>setTab(t)}>{t}</button>
        )}
      </div>
      <div className="tab-rows">
        {tab==="Overview"&&<>
          <div className="tab-row"><i>◈</i><p><b>{r.equipment.length} linked items</b><small>Equipment and fixtures tracked in this room</small></p></div>
          <div className="tab-row"><i>●</i><p><b>Condition</b><small>{r.note}</small></p></div>
        </>}
        {tab==="Equipment"&&r.equipment.map(e=>
          <button key={e.name} className="tab-row tab-row-click" onClick={()=>{if(e.assetIndex!==undefined){setAsset(e.assetIndex);go("Passport")}}}>
            <i className={e.status==="Good"?"":"warn"}>{e.status==="Good"?"✓":"!"}</i>
            <p><b>{e.name}</b><small>{e.note}</small></p>
            <Status>{e.status}</Status>
          </button>
        )}
        {tab==="Materials"&&r.materials.map(m=>
          <div className="tab-row" key={m.label}><i>◫</i><p><b>{m.label}</b><small>{m.value}</small></p></div>
        )}
        {tab==="History"&&r.history.map(h=>
          <div className="tab-row" key={h.text}><i>▤</i><p><b>{h.text}</b><small>{h.date}</small></p></div>
        )}
      </div>
    </section>
  </div>;
}

function Records(){const rows=[["Aug 12, 2026","Roof inspection","12 photos · inspection report","Good"],["Jul 28, 2026","Kitchen faucet replaced","Invoice · warranty · contractor","Good"],["Mar 04, 2025","HVAC maintenance","Service record · filter replacement","Good"],["May 18, 2021","Water heater installed","Receipt missing · owner-reported date","Watch"]];return <div className="page"><section className="records-head"><div><p className="eyebrow">PERMANENT PROPERTY RECORD</p><h2>History you can prove.</h2><p>Every item stays connected to the home, asset, room, and event it supports.</p></div><div className="completeness"><b>68%</b><span>record completeness</span><i><em/></i></div></section><section className="records-layout"><div className="timeline"><p className="eyebrow">LIVING TIMELINE</p>{rows.map(r=><article key={r[0]}><time>{r[0]}</time><i/><div><p><b>{r[1]}</b><Status>{r[3]}</Status></p><small>{r[2]}</small></div></article>)}</div><aside className="evidence"><p className="eyebrow">EVIDENCE LIBRARY</p><h3>What is on file</h3>{[["▧","Inspection reports","4 files"],["▤","Receipts & invoices","8 files"],["◫","Manuals & warranties","6 files"],["⌘","Permits & public data","3 records"]].map(x=><button key={x[1]}><i>{x[0]}</i><b>{x[1]}</b><small>{x[2]}</small><em>›</em></button>)}<button className="primary">+ Add record</button></aside></section></div>}

function Service({issue}:{issue:boolean}){return <div className="page"><section className="service-hero"><p className="eyebrow">SERVICE GATEWAY</p><h2>Tell us what is wrong.<br/>HomeOps supplies the context.</h2><p>No need to know the equipment, model number, or maintenance history. Start with the symptom.</p></section><section className="service-layout"><div className="intake"><label><b>1</b> Describe the issue</label><textarea defaultValue={issue?"I need to schedule the annual HVAC service.":""} placeholder="Example: The room is warm, the system is making a sound, or I noticed water near..."/><label><b>2</b> Where is it happening?</label><div className="choices"><button className="selected">Mechanical room</button><button>Kitchen</button><button>Exterior</button><button>Not sure</button></div><label><b>3</b> Add photos or video</label><button className="upload">＋<b>Drop photos here</b><small>HomeOps attaches known asset and record context automatically.</small></button><button className="primary full">Build service request →</button></div><aside className="packet"><p className="eyebrow">CONTRACTOR PACKET PREVIEW</p><h3>What gets shared—only with your approval.</h3>{[["Known asset context","Furnace + A/C · age · service history"],["Relevant evidence","Manuals, prior work, photos, and access notes"],["Property view","Room location and digital-twin marker"]].map(x=><div key={x[0]}><i>✓</i><p><b>{x[0]}</b><small>{x[1]}</small></p></div>)}<section><b>Your record stays yours.</b><p>Share a purpose-built packet—not your entire home record.</p></section></aside></section></div>}
