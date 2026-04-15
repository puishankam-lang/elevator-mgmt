import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root {
    background: #0d0f12;
    color: #e8eaf0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
  }

  .app { display: flex; height: 100vh; overflow: hidden; }

  /* Sidebar */
  .sidebar {
    width: 220px;
    background: #13161c;
    border-right: 1px solid #1e2330;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }
  .logo-area {
    padding: 20px 18px 16px;
    border-bottom: 1px solid #1e2330;
  }
  .logo-icon {
    width: 36px; height: 36px;
    background: #f0c000;
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: #0d0f12;
    margin-bottom: 8px;
  }
  .logo-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #f0c000;
    text-transform: uppercase;
    line-height: 1.3;
  }
  .logo-sub { font-size: 11px; color: #555d6e; font-weight: 400; letter-spacing: 0; text-transform: none; font-family: 'Barlow', sans-serif; }

  .nav { flex: 1; padding: 12px 0; overflow-y: auto; }
  .nav-section-title {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #3a4255;
    padding: 12px 18px 6px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 18px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    color: #6b7490;
    border-left: 3px solid transparent;
    transition: all 0.15s;
    user-select: none;
  }
  .nav-item:hover { color: #c8d0e0; background: #181c24; }
  .nav-item.active { color: #f0c000; background: #181c24; border-left-color: #f0c000; }
  .nav-icon { width: 18px; text-align: center; font-size: 15px; flex-shrink: 0; }
  .nav-badge {
    margin-left: auto;
    background: #d63030;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    border-radius: 10px;
    padding: 1px 6px;
    min-width: 18px;
    text-align: center;
  }

  .sidebar-footer {
    padding: 14px 18px;
    border-top: 1px solid #1e2330;
    font-size: 11px;
    color: #3a4255;
  }
  .online-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #22c55e; margin-right: 6px; }

  /* Main */
  .main { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
  .topbar {
    background: #13161c;
    border-bottom: 1px solid #1e2330;
    padding: 0 28px;
    height: 56px;
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
  }
  .page-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #e8eaf0;
    display: flex; align-items: center; gap: 10px;
  }
  .page-title span { color: #f0c000; }
  .topbar-right { display: flex; align-items: center; gap: 16px; }
  .date-badge {
    font-size: 12px;
    color: #555d6e;
    background: #0d0f12;
    border: 1px solid #1e2330;
    border-radius: 6px;
    padding: 5px 12px;
  }
  .alert-btn {
    width: 34px; height: 34px;
    background: #1a1e28;
    border: 1px solid #1e2330;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    position: relative;
    font-size: 15px;
  }
  .alert-dot {
    position: absolute; top: 6px; right: 6px;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #f0c000;
    border: 2px solid #13161c;
  }
  .avatar {
    width: 34px; height: 34px;
    background: linear-gradient(135deg, #f0c000, #d4a800);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #0d0f12;
  }

  .content { padding: 24px 28px; flex: 1; }

  /* KPI Cards */
  .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
  .kpi-card {
    background: #13161c;
    border: 1px solid #1e2330;
    border-radius: 10px;
    padding: 18px 20px;
    position: relative;
    overflow: hidden;
  }
  .kpi-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--accent, #f0c000);
  }
  .kpi-label { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #555d6e; margin-bottom: 10px; }
  .kpi-value { font-family: 'Barlow Condensed', sans-serif; font-size: 32px; font-weight: 700; color: #e8eaf0; line-height: 1; margin-bottom: 6px; }
  .kpi-value span { color: var(--accent, #f0c000); }
  .kpi-sub { font-size: 11px; color: #3a4255; }
  .kpi-icon { position: absolute; right: 16px; top: 16px; font-size: 22px; opacity: 0.15; }

  /* Grid layout */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .grid-3 { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 20px; }

  /* Card */
  .card {
    background: #13161c;
    border: 1px solid #1e2330;
    border-radius: 10px;
    overflow: hidden;
  }
  .card-header {
    padding: 14px 20px;
    border-bottom: 1px solid #1e2330;
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-title { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #a0a8bc; }
  .card-body { padding: 20px; }
  .card-action {
    font-size: 11px;
    color: #f0c000;
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  /* Progress bars */
  .progress-item { margin-bottom: 14px; }
  .progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
  .progress-name { font-size: 13px; color: #c8d0e0; font-weight: 500; }
  .progress-pct { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; color: #f0c000; }
  .progress-bar-bg { background: #1e2330; border-radius: 4px; height: 8px; overflow: hidden; }
  .progress-bar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #f0c000, #e67e00); transition: width 0.6s ease; }
  .progress-bar-fill.low { background: linear-gradient(90deg, #d63030, #ff6b35); }
  .progress-bar-fill.ok { background: linear-gradient(90deg, #22c55e, #16a34a); }
  .progress-meta { font-size: 11px; color: #3a4255; margin-top: 3px; }

  /* Table */
  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #3a4255;
    padding: 8px 12px;
    text-align: left;
    border-bottom: 1px solid #1e2330;
  }
  .data-table td {
    padding: 10px 12px;
    font-size: 13px;
    color: #9aa0b4;
    border-bottom: 1px solid #181c24;
  }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table tr:hover td { background: #181c24; }
  .td-name { color: #c8d0e0 !important; font-weight: 500; }
  .td-amount { color: #f0c000 !important; font-family: 'Barlow Condensed', sans-serif; font-size: 15px !important; font-weight: 700 !important; }

  /* Status badges */
  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 20px;
    letter-spacing: 0.3px;
  }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; }
  .badge.green { background: rgba(34, 197, 94, 0.12); color: #22c55e; }
  .badge.green .badge-dot { background: #22c55e; }
  .badge.yellow { background: rgba(240, 192, 0, 0.12); color: #f0c000; }
  .badge.yellow .badge-dot { background: #f0c000; }
  .badge.red { background: rgba(214, 48, 48, 0.12); color: #d63030; }
  .badge.red .badge-dot { background: #d63030; }
  .badge.blue { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
  .badge.blue .badge-dot { background: #60a5fa; }

  /* Alert/Warning strip */
  .alert-strip {
    background: rgba(214, 48, 48, 0.08);
    border: 1px solid rgba(214, 48, 48, 0.25);
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .alert-icon { font-size: 18px; flex-shrink: 0; }
  .alert-text { font-size: 13px; color: #e8a0a0; font-weight: 500; flex: 1; }
  .alert-time { font-size: 11px; color: #d63030; }

  /* Invoice card */
  .invoice-item {
    padding: 14px 0;
    border-bottom: 1px solid #1e2330;
    display: flex; align-items: center; gap: 14px;
  }
  .invoice-item:last-child { border-bottom: none; }
  .invoice-icon {
    width: 38px; height: 38px;
    border-radius: 8px;
    background: rgba(240,192,0,0.1);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }
  .invoice-info { flex: 1; }
  .invoice-name { font-size: 13px; color: #c8d0e0; font-weight: 600; margin-bottom: 2px; }
  .invoice-sub { font-size: 11px; color: #555d6e; }
  .invoice-amount { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; color: #f0c000; }

  /* Timeline */
  .timeline { padding: 4px 0; }
  .timeline-item { display: flex; gap: 14px; margin-bottom: 16px; position: relative; }
  .timeline-line-wrap { display: flex; flex-direction: column; align-items: center; }
  .timeline-dot { width: 10px; height: 10px; border-radius: 50%; background: #f0c000; flex-shrink: 0; margin-top: 3px; }
  .timeline-dot.grey { background: #2a3040; }
  .timeline-connector { flex: 1; width: 2px; background: #1e2330; margin-top: 4px; }
  .timeline-content { padding-bottom: 2px; }
  .timeline-label { font-size: 12px; font-weight: 600; color: #e8eaf0; margin-bottom: 2px; }
  .timeline-meta { font-size: 11px; color: #555d6e; }
  .timeline-pct { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; color: #f0c000; }

  /* Tabs inside content */
  .sub-tabs { display: flex; gap: 4px; margin-bottom: 20px; }
  .sub-tab {
    padding: 7px 16px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-radius: 6px;
    cursor: pointer;
    color: #555d6e;
    background: transparent;
    border: 1px solid transparent;
    transition: all 0.15s;
    text-transform: uppercase;
  }
  .sub-tab:hover { color: #9aa0b4; background: #181c24; }
  .sub-tab.active { color: #f0c000; background: rgba(240,192,0,0.08); border-color: rgba(240,192,0,0.2); }

  /* Sign form */
  .sign-card {
    background: #13161c;
    border: 1px solid #1e2330;
    border-radius: 10px;
    padding: 24px;
    margin-bottom: 16px;
  }
  .sign-title { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 700; color: #f0c000; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
  .safety-clause {
    background: #0d0f12;
    border: 1px solid #1e2330;
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 12px;
    font-size: 13px;
    color: #9aa0b4;
    line-height: 1.7;
    max-height: 160px;
    overflow-y: auto;
  }
  .safety-clause p { margin-bottom: 8px; }
  .safety-clause strong { color: #c8d0e0; }
  .sign-confirm-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .checkbox-custom {
    width: 18px; height: 18px;
    border: 2px solid #3a4255;
    border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: all 0.15s;
    flex-shrink: 0;
  }
  .checkbox-custom.checked { background: #f0c000; border-color: #f0c000; }
  .checkbox-label { font-size: 13px; color: #9aa0b4; }

  /* GPS area */
  .gps-map-mock {
    background: #0d1117;
    border: 1px solid #1e2330;
    border-radius: 8px;
    height: 140px;
    display: flex; align-items: center; justify-content: center;
    position: relative;
    overflow: hidden;
    margin-bottom: 16px;
  }
  .map-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(30,35,48,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(30,35,48,0.6) 1px, transparent 1px);
    background-size: 28px 28px;
  }
  .map-circle {
    position: absolute;
    width: 80px; height: 80px;
    border: 2px dashed rgba(240,192,0,0.3);
    border-radius: 50%;
  }
  .map-dot {
    width: 12px; height: 12px;
    background: #22c55e;
    border-radius: 50%;
    border: 3px solid #fff;
    box-shadow: 0 0 0 6px rgba(34,197,94,0.2);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 4px rgba(34,197,94,0.2); }
    50% { box-shadow: 0 0 0 10px rgba(34,197,94,0.05); }
  }
  .map-label { position: absolute; top: 8px; left: 8px; font-size: 10px; color: #3a4255; letter-spacing: 0.5px; text-transform: uppercase; }
  .map-coords { position: absolute; bottom: 8px; right: 8px; font-size: 10px; color: #3a4255; font-family: monospace; }

  /* Buttons */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
  }
  .btn-primary { background: #f0c000; color: #0d0f12; }
  .btn-primary:hover { background: #ffd020; }
  .btn-secondary { background: #1e2330; color: #9aa0b4; border: 1px solid #2a3040; }
  .btn-secondary:hover { background: #252b3a; color: #c8d0e0; }
  .btn-danger { background: rgba(214,48,48,0.15); color: #d63030; border: 1px solid rgba(214,48,48,0.25); }
  .btn-danger:hover { background: rgba(214,48,48,0.25); }
  .btn-success { background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }
  .btn-success:hover { background: rgba(34,197,94,0.25); }
  .btn-sm { padding: 6px 12px; font-size: 11px; }
  .btn-row { display: flex; gap: 10px; flex-wrap: wrap; }

  /* Input */
  .form-group { margin-bottom: 14px; }
  .form-label { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #3a4255; margin-bottom: 6px; display: block; }
  .form-input, .form-select {
    width: 100%;
    background: #0d0f12;
    border: 1px solid #1e2330;
    border-radius: 7px;
    padding: 9px 12px;
    font-size: 13px;
    color: #c8d0e0;
    font-family: 'Barlow', sans-serif;
    outline: none;
    transition: border-color 0.15s;
  }
  .form-input:focus, .form-select:focus { border-color: rgba(240,192,0,0.4); }
  .form-select option { background: #13161c; }

  /* Employee row */
  .emp-row {
    display: flex; align-items: center; gap: 14px;
    padding: 12px 0;
    border-bottom: 1px solid #1e2330;
  }
  .emp-row:last-child { border-bottom: none; }
  .emp-avatar {
    width: 34px; height: 34px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #0d0f12;
    flex-shrink: 0;
  }
  .emp-info { flex: 1; }
  .emp-name { font-size: 13px; color: #c8d0e0; font-weight: 600; }
  .emp-role { font-size: 11px; color: #555d6e; }
  .emp-salary { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; color: #22c55e; }
  .emp-days { font-size: 11px; color: #555d6e; text-align: right; }

  .section-divider { height: 1px; background: #1e2330; margin: 20px 0; }

  /* Toast */
  .toast {
    position: fixed; bottom: 24px; right: 24px;
    background: #1e2330;
    border: 1px solid #2a3040;
    border-left: 3px solid #f0c000;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 13px;
    color: #c8d0e0;
    z-index: 9999;
    max-width: 300px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    animation: slideIn 0.3s ease;
  }
  .toast.success { border-left-color: #22c55e; }
  .toast.error { border-left-color: #d63030; }
  @keyframes slideIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #0d0f12; }
  ::-webkit-scrollbar-thumb { background: #2a3040; border-radius: 4px; }
`;

const NAV_ITEMS = [
  { id: "dashboard", icon: "⬛", label: "總覽儀表板" },
  { id: "projects", icon: "🏗", label: "工程管理" },
  { id: "staff", icon: "👷", label: "員工管理" },
  { id: "safety", icon: "🛡", label: "安全簽署", badge: 3 },
  { id: "attendance", icon: "📍", label: "GPS 考勤管理" },
  { id: "progress", icon: "📊", label: "施工進度回報", badge: 1 },
  { id: "invoice", icon: "💰", label: "自動化請款" },
  { id: "payroll", icon: "💼", label: "薪酬核算" },
  { id: "empdocs", icon: "📁", label: "員工文件" },
  { id: "profit", icon: "📈", label: "報價利潤試算" },
  { id: "tax", icon: "🧾", label: "老闆稅務計算" },
];

const INITIAL_PROJECTS = [];

const EMPLOYEES = [
  { id:1,  name:"姚奇敏", role:"電梯技工",    phone:"52392789", pin:"7823", color:"#FF6B1A", rate:850 },
  { id:2,  name:"李國森", role:"電梯技工",    phone:"68908731", pin:"4591", color:"#22C55E", rate:850 },
  { id:3,  name:"賴偉志", role:"電梯技工",    phone:"91498681", pin:"2067", color:"#60A5FA", rate:850 },
  { id:4,  name:"韓小錦", role:"電梯技工",    phone:"57631557", pin:"9314", color:"#A78BFA", rate:850 },
  { id:5,  name:"彭金花", role:"電梯技工",    phone:"93405725", pin:"6182", color:"#FB923C", rate:850 },
  { id:6,  name:"李文彪", role:"電梯技工",    phone:"63573726", pin:"3759", color:"#F43F5E", rate:850 },
  { id:7,  name:"吳昭鵬", role:"電梯技工",    phone:"56111810", pin:"8426", color:"#06B6D4", rate:850 },
  { id:8,  name:"耿華成", role:"電梯技工",    phone:"95615270", pin:"1938", color:"#84CC16", rate:850 },
  { id:9,  name:"蔡貴明", role:"電梯技工",    phone:"59383172", pin:"5073", color:"#E879F9", rate:850 },
  { id:10, name:"莫家文", role:"電梯技工",    phone:"65704790", pin:"7261", color:"#F0C000", rate:850 },
  { id:11, name:"陳文軒", role:"電梯技工",    phone:"51115103", pin:"3847", color:"#22C55E", rate:850 },
  { id:12, name:"李志軍", role:"電梯技工",    phone:"98564747", pin:"6510", color:"#60A5FA", rate:850 },
  { id:13, name:"蔡洵義", role:"電梯技工",    phone:"61503368", pin:"9284", color:"#A78BFA", rate:850 },
  { id:14, name:"蔡洵忠", role:"電梯技工",    phone:"69323753", pin:"1673", color:"#FB923C", rate:850 },
  { id:15, name:"鄧達財", role:"電梯技工",    phone:"55731042", pin:"4928", color:"#F43F5E", rate:850 },
  { id:16, name:"梁培煊", role:"電梯技工",    phone:"69322800", pin:"7035", color:"#06B6D4", rate:850 },
  { id:17, name:"馮永昌", role:"電梯技工",    phone:"92848912", pin:"2816", color:"#84CC16", rate:850 },
  { id:18, name:"陳煜良", role:"電梯技工",    phone:"63062572", pin:"5394", color:"#E879F9", rate:850 },
  { id:19, name:"李華渡", role:"電梯技工",    phone:"51156023", pin:"8167", color:"#F0C000", rate:850 },
];

const INVOICES = [];

function Dashboard({ projects = INITIAL_PROJECTS, setActive, employees = EMPLOYEES }) {
  const totalSalary = employees.reduce((a, e) => a + (e.days || 22) * (e.rate || 0), 0);
  const activeProjects = projects.filter(p => p.phase === "active");
  const alertProjects = projects.filter(p => p.pct < p.plan && p.phase === "active");
  return (
    <div>
      <div className="kpi-row">
        <div className="kpi-card" style={{ "--accent": "#f0c000" }}>
          <div className="kpi-icon">🏗</div>
          <div className="kpi-label">進行中工程</div>
          <div className="kpi-value"><span>{activeProjects.length}</span> 個</div>
          <div className="kpi-sub">共 {projects.length} 個工程項目</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#22c55e" }}>
          <div className="kpi-icon">👷</div>
          <div className="kpi-label">今日簽到人數</div>
          <div className="kpi-value"><span>4</span>/5</div>
          <div className="kpi-sub">1 人未簽到 ⚠️</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#60a5fa" }}>
          <div className="kpi-icon">💰</div>
          <div className="kpi-label">待回收款項</div>
          <div className="kpi-value"><span style={{fontSize:'22px'}}>HK$</span>349K</div>
          <div className="kpi-sub">2 張請款單待發</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#a78bfa" }}>
          <div className="kpi-icon">💼</div>
          <div className="kpi-label">本月薪酬試算</div>
          <div className="kpi-value"><span style={{fontSize:'22px'}}>HK$</span>{(totalSalary/1000).toFixed(0)}K</div>
          <div className="kpi-sub">5 名員工</div>
        </div>
      </div>

      {alertProjects.length > 0 && (
        <div className="alert-strip">
          <div className="alert-icon">⚠️</div>
          <div className="alert-text">
            <strong style={{color:'#e8a0a0'}}>進度預警：</strong>
            {alertProjects.map(p => `${p.name} — 實際 ${p.pct}%，計劃 ${p.plan}%，差距 ${p.plan - p.pct}%`).join('　|　')}
          </div>
          <div className="alert-time">剛剛</div>
        </div>
      )}

      <div className="grid-3">
        <div className="card">
          <div className="card-header">
            <div className="card-title">施工進度一覽</div>
            <div className="card-action" style={{cursor:"pointer"}} onClick={() => setActive && setActive("projects")}>全部工程 →</div>
          </div>
          <div className="card-body">
            {activeProjects.slice(0, 5).map((p, i) => (
              <div key={i} className="progress-item">
                <div className="progress-header">
                  <div className="progress-name">{p.name}</div>
                  <div className="progress-pct">{p.pct}%</div>
                </div>
                <div className="progress-bar-bg">
                  <div className={`progress-bar-fill ${p.status}`} style={{ width: `${p.pct}%` }} />
                </div>
                <div className="progress-meta">計劃目標：{p.plan}% &nbsp;|&nbsp;
                  {p.pct >= p.plan
                    ? <span style={{ color: "#22c55e" }}>▲ 進度正常</span>
                    : <span style={{ color: "#d63030" }}>▼ 低於計劃 {p.plan - p.pct}%</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">請款觸發狀態</div>
          </div>
          <div className="card-body" style={{ padding: "12px 20px" }}>
            {INVOICES.map((inv, i) => (
              <div key={i} className="invoice-item">
                <div className="invoice-icon">{inv.icon}</div>
                <div className="invoice-info">
                  <div className="invoice-name">{inv.project}</div>
                  <div className="invoice-sub">{inv.trigger}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="invoice-amount">{inv.amount}</div>
                  <span className={`badge ${inv.status}`} style={{ marginTop: 4 }}>
                    <span className="badge-dot" /> {inv.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">員工考勤 &amp; 薪酬快覽（本月）</div>
          <div className="card-action">完整報表 →</div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>員工</th>
                <th>職位</th>
                <th>日薪</th>
                <th>出勤天數</th>
                <th>月薪試算</th>
                <th>今日簽到</th>
                <th>安全簽署</th>
              </tr>
            </thead>
            <tbody>
              {EMPLOYEES.map((e, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="emp-avatar" style={{ background: e.color, width: 26, height: 26, fontSize: 11 }}>
                        {e.name[0]}
                      </div>
                      <span className="td-name">{e.name}</span>
                    </div>
                  </td>
                  <td>{e.role}</td>
                  <td>HK${e.rate}</td>
                  <td>{e.days} 天</td>
                  <td className="td-amount">HK${(e.days * e.rate).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${i === 2 ? "red" : "green"}`}>
                      <span className="badge-dot" /> {i === 2 ? "未到" : "已簽到"}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${e.signed ? "green" : "red"}`}>
                      <span className="badge-dot" /> {e.signed ? "已簽署" : "待簽署"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Safety({ showToast, employees = EMPLOYEES }) {
  const [checked, setChecked] = useState(false);
  const [signed, setSigned] = useState([true, true, false, true, true]);

  const handleSign = (i) => {
    const n = [...signed];
    n[i] = true;
    setSigned(n);
    showToast("✅ 安全條款簽署成功，時間戳記已記錄", "success");
  };

  return (
    <div>
      <div className="sub-tabs" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: '#9aa0b4' }}>今日日期：{new Date().toLocaleDateString('zh-HK', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}</div>
      </div>

      <div className="grid-2">
        <div className="sign-card">
          <div className="sign-title">📋 電梯施工安全守則</div>
          <div className="safety-clause">
            <p><strong>第一條 — 個人防護裝備：</strong>所有進入施工現場人員必須全程佩戴安全帽、安全鞋及反光背心。電梯槽內作業必須配備安全繩及防墜落裝置。</p>
            <p><strong>第二條 — 電源管制：</strong>進行任何電氣工程前，必須確認主電源已切斷並上鎖（LOTO程序），並在配電箱貼上警告標示。</p>
            <p><strong>第三條 — 高空作業：</strong>超過2米高度作業必須使用獲認可之升降台或搭棚架，不得單人作業，必須保持通話聯絡。</p>
            <p><strong>第四條 — 危險品存放：</strong>潤滑油、清潔劑等危險品須存放於指定區域，遠離熱源，並確保通風良好。</p>
            <p><strong>第五條 — 緊急應變：</strong>熟悉緊急撤離路線及急救箱位置。發生意外須即時通報主管並填寫事故報告表。</p>
          </div>
          <div className="sign-confirm-row">
            <div
              className={`checkbox-custom ${checked ? "checked" : ""}`}
              onClick={() => setChecked(!checked)}
            >
              {checked && <span style={{ color: "#0d0f12", fontSize: 12, fontWeight: 700 }}>✓</span>}
            </div>
            <div className="checkbox-label">本人確認已詳細閱讀並理解以上安全守則，並同意遵守所有條款</div>
          </div>
          <div className="btn-row">
            <button
              className={`btn ${checked ? "btn-primary" : "btn-secondary"}`}
              onClick={() => checked && showToast(`✅ 簽署成功！時間戳記：${new Date().toLocaleString('zh-HK')}`, "success")}
            >
              ✍️ 確認簽署
            </button>
            <button className="btn btn-secondary">📄 列印守則</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">今日人員簽署狀態</div>
            <div className="card-action">導出記錄 →</div>
          </div>
          <div className="card-body" style={{ padding: "12px 20px" }}>
            {EMPLOYEES.map((e, i) => (
              <div key={i} className="emp-row">
                <div className="emp-avatar" style={{ background: e.color }}>
                  {e.name[0]}
                </div>
                <div className="emp-info">
                  <div className="emp-name">{e.name}</div>
                  <div className="emp-role">{e.role}</div>
                </div>
                {signed[i] ? (
                  <div style={{ textAlign: "right" }}>
                    <span className="badge green"><span className="badge-dot" /> 已簽署</span>
                    <div style={{ fontSize: 10, color: "#3a4255", marginTop: 3 }}>08:15 – 08:23</div>
                  </div>
                ) : (
                  <button className="btn btn-danger btn-sm" onClick={() => handleSign(i)}>
                    催簽
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 4 }}>
        <div className="card-header">
          <div className="card-title">歷史簽署記錄（最近7天）</div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr><th>日期</th><th>人員</th><th>工地</th><th>簽署時間</th><th>IP / 裝置</th><th>狀態</th></tr>
            </thead>
            <tbody>
              {[
                // GPS 考勤記錄從 Supabase 即時載入
              ].map((r, i) => (
                <tr key={i}>
                  <td className="td-name">{r[0]}</td>
                  <td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td style={{ fontSize: 11 }}>{r[4]}</td>
                  <td><span className="badge green"><span className="badge-dot" /> 有效</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Site GPS data (can be extended per project) ──────────────────────────────
const SITE_GPS = {
  // 真實工地 GPS 座標 — 可在 GPS 考勤管理頁面設定
  "EC-590大圓街GDS數據中心升降機": { lat: "22.3371", lng: "114.1340" },
  "EC-662柴灣VTC":               { lat: "22.2786", lng: "114.2368" },
  "EC-550屯門橋機":               { lat: "22.3960", lng: "113.9733" },
  "EC-547將軍澳政府聯用辦工大樓":   { lat: "22.3059", lng: "114.2599" },
  "EC-530西灣河綜合大樓":          { lat: "22.2797", lng: "114.2253" },
};

function Attendance({ showToast, employees = EMPLOYEES, projects = INITIAL_PROJECTS }) {
  const today = new Date().toLocaleDateString("zh-HK", { year: "numeric", month: "long", day: "numeric", weekday: "short" });

  // empSite[i] = project name selected for employee i (null = 未選擇)
  const [empSite, setEmpSite] = useState(() => employees.map(() => null));
  const [checkedIn, setCheckedIn] = useState(() => employees.map(() => false));
  const [checkInTime, setCheckInTime] = useState(() => employees.map(() => null));
  const [selectedSiteView, setSelectedSiteView] = useState(null); // for site-focused map view
  const [viewMode, setViewMode] = useState("employee"); // "employee" | "site"

  const activeProjects = projects.filter(p => p.phase === "active" || p.phase === "pending");

  const handleAssignSite = (empIdx, siteName) => {
    const updated = [...empSite];
    updated[empIdx] = siteName;
    setEmpSite(updated);
    showToast(`📍 ${employees[empIdx].name} 已分配至「${siteName}」`);
  };

  const handleCheckIn = (empIdx) => {
    if (!empSite[empIdx]) { showToast("⚠️ 請先選擇工地", "error"); return; }
    const updated = [...checkedIn];
    updated[empIdx] = true;
    setCheckedIn(updated);
    const t = new Date().toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" });
    const times = [...checkInTime];
    times[empIdx] = t;
    setCheckInTime(times);
    showToast(`✅ ${employees[empIdx].name} 已簽到 — ${empSite[empIdx]}`);
  };

  // Group employees by site
  const siteGroups = {};
  activeProjects.forEach(p => { siteGroups[p.name] = []; });
  employees.forEach((e, i) => {
    if (empSite[i] && siteGroups[empSite[i]] !== undefined) {
      siteGroups[empSite[i]].push({ ...e, idx: i, checkedIn: checkedIn[i], time: checkInTime[i] });
    }
  });

  const unassigned = employees.filter((e, i) => !empSite[i]);
  const totalCheckedIn = checkedIn.filter(Boolean).length;

  const focusSite = selectedSiteView || empSite.find(s => s) || activeProjects[0]?.name;
  const focusGPS = SITE_GPS[focusSite] || { lat: "22.3193", lng: "114.1694" };
  const focusCount = focusSite ? (siteGroups[focusSite]?.length || 0) : 0;

  return (
    <div>
      {/* Top KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { label: "今日出勤", value: `${totalCheckedIn} / ${employees.length}`, color: "#22c55e" },
          { label: "已分配地盤", value: empSite.filter(Boolean).length, color: "#f0c000" },
          { label: "未分配", value: unassigned.length, color: "#d63030" },
          { label: "活躍地盤", value: activeProjects.length, color: "#60a5fa" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#13161c", border: "1px solid #1e2330", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 24, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* View toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {["employee", "site"].map(m => (
          <button key={m} onClick={() => setViewMode(m)} style={{
            padding: "6px 18px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
            background: viewMode === m ? "#f0c000" : "#1e2330", color: viewMode === m ? "#0d0f12" : "#8891a4"
          }}>
            {m === "employee" ? "👷 員工視角" : "🏗 地盤視角"}
          </button>
        ))}
      </div>

      <div className="grid-2">
        {/* Left: employee or site view */}
        {viewMode === "employee" ? (
          <div className="card">
            <div className="card-header">
              <div className="card-title">👷 員工地盤分配</div>
              <div className="date-badge" style={{ fontSize: 11 }}>{today}</div>
            </div>
            <div className="card-body" style={{ padding: "8px 16px" }}>
              {employees.map((e, i) => (
                <div key={i} style={{ background: "#0d0f12", border: "1px solid #1e2330", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div className="emp-avatar" style={{ background: e.color }}>{e.name[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{e.name}</div>
                      <div style={{ fontSize: 11, color: "#555d6e" }}>{e.role}</div>
                    </div>
                    {checkedIn[i]
                      ? <span className="badge green"><span className="badge-dot" /> 已簽到 {checkInTime[i]}</span>
                      : empSite[i]
                        ? <span className="badge yellow"><span className="badge-dot" /> 已分配</span>
                        : <span className="badge red"><span className="badge-dot" /> 未分配</span>
                    }
                  </div>

                  {/* Site selector */}
                  <select
                    value={empSite[i] || ""}
                    onChange={e2 => handleAssignSite(i, e2.target.value)}
                    disabled={checkedIn[i]}
                    style={{
                      width: "100%", background: "#13161c", border: "1px solid #2a3045",
                      color: empSite[i] ? "#e8eaf0" : "#555d6e", borderRadius: 6,
                      padding: "7px 10px", fontSize: 12, marginBottom: 8, cursor: checkedIn[i] ? "not-allowed" : "pointer"
                    }}
                  >
                    <option value="">── 選擇今日工地 ──</option>
                    {activeProjects.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>

                  {/* GPS coords if site selected */}
                  {empSite[i] && SITE_GPS[empSite[i]] && (
                    <div style={{ fontSize: 10, color: "#3a4255", marginBottom: 8 }}>
                      📍 GPS: {SITE_GPS[empSite[i]].lat}°N {SITE_GPS[empSite[i]].lng}°E
                    </div>
                  )}

                  {/* Check-in button */}
                  {!checkedIn[i] && (
                    <button
                      onClick={() => handleCheckIn(i)}
                      style={{
                        width: "100%", background: empSite[i] ? "#f0c000" : "#1e2330",
                        color: empSite[i] ? "#0d0f12" : "#555d6e",
                        border: "none", borderRadius: 6, padding: "7px 0",
                        fontWeight: 700, fontSize: 12, cursor: empSite[i] ? "pointer" : "not-allowed"
                      }}
                    >
                      📍 確認簽到
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-header">
              <div className="card-title">🏗 各地盤人員</div>
              <span className="badge green"><span className="badge-dot" /> 即時</span>
            </div>
            <div className="card-body" style={{ padding: "8px 16px" }}>
              {activeProjects.map(p => {
                const ppl = siteGroups[p.name] || [];
                return (
                  <div key={p.id}
                    onClick={() => setSelectedSiteView(p.name)}
                    style={{
                      background: selectedSiteView === p.name ? "#1a1f2e" : "#0d0f12",
                      border: `1px solid ${selectedSiteView === p.name ? "#f0c000" : "#1e2330"}`,
                      borderRadius: 10, padding: "12px 14px", marginBottom: 10, cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</div>
                      <span className={`badge ${ppl.length > 0 ? "green" : "red"}`}>
                        <span className="badge-dot" /> {ppl.length} 人
                      </span>
                    </div>
                    <div style={{ fontSize: 10, color: "#3a4255", marginBottom: 8 }}>
                      📍 {SITE_GPS[p.name] ? `${SITE_GPS[p.name].lat}°N ${SITE_GPS[p.name].lng}°E` : "GPS 未設定"}
                    </div>
                    {ppl.length > 0 ? (
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {ppl.map((emp, j) => (
                          <div key={j} style={{ display: "flex", alignItems: "center", gap: 4, background: "#13161c", borderRadius: 20, padding: "3px 10px" }}>
                            <div style={{ width: 18, height: 18, borderRadius: "50%", background: emp.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#0d0f12" }}>{emp.name[0]}</div>
                            <span style={{ fontSize: 11, color: emp.checkedIn ? "#22c55e" : "#f0c000" }}>{emp.name}</span>
                            {emp.checkedIn && <span style={{ fontSize: 9, color: "#3a4255" }}>{emp.time}</span>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: 11, color: "#3a4255" }}>今日暫無人員分配</div>
                    )}
                  </div>
                );
              })}
              {unassigned.length > 0 && (
                <div style={{ background: "#0d0f12", border: "1px solid #d63030", borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#d63030", marginBottom: 8 }}>⚠️ 未分配地盤</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {unassigned.map((e, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 4, background: "#13161c", borderRadius: 20, padding: "3px 10px" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: e.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#0d0f12" }}>{e.name[0]}</div>
                        <span style={{ fontSize: 11, color: "#e8eaf0" }}>{e.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right: GPS map focus */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">📍 GPS 地盤定位</div>
            <span className="badge green"><span className="badge-dot" /> 系統運行中</span>
          </div>
          <div className="card-body">
            <div className="gps-map-mock">
              <div className="map-grid" />
              <div className="map-circle" />
              <div className="map-dot" />
              <div className="map-label">{focusSite || "請選擇地盤"}</div>
              <div className="map-coords">{focusGPS.lat}°N {focusGPS.lng}°E</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div style={{ background: "#0d0f12", borderRadius: 8, padding: "10px 14px", border: "1px solid #1e2330" }}>
                <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>容許半徑</div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 700, color: "#f0c000" }}>150 m</div>
              </div>
              <div style={{ background: "#0d0f12", borderRadius: 8, padding: "10px 14px", border: "1px solid #1e2330" }}>
                <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>此地盤人數</div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 700, color: "#22c55e" }}>{focusCount} 人</div>
              </div>
            </div>

            {/* Quick site GPS reference table */}
            <div style={{ fontSize: 11, color: "#555d6e", marginBottom: 6, fontWeight: 600 }}>各地盤 GPS 座標</div>
            <div style={{ maxHeight: 180, overflowY: "auto" }}>
              {activeProjects.map(p => (
                <div key={p.id}
                  onClick={() => setSelectedSiteView(p.name)}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "6px 10px", borderRadius: 6, marginBottom: 4, cursor: "pointer",
                    background: selectedSiteView === p.name ? "#1a1f2e" : "#0d0f12",
                    border: `1px solid ${selectedSiteView === p.name ? "#f0c000" : "#1e2330"}`
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: "#3a4255" }}>
                    {SITE_GPS[p.name] ? `${SITE_GPS[p.name].lat}, ${SITE_GPS[p.name].lng}` : "未設定"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly summary table */}
      <div className="card" style={{ marginTop: 4 }}>
        <div className="card-header">
          <div className="card-title">本月出勤彙總</div>
          <div className="card-action">下載 CSV →</div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr><th>員工</th><th>職位</th><th>今日地盤</th><th>應出勤</th><th>實際出勤</th><th>遲到</th><th>出勤率</th></tr>
            </thead>
            <tbody>
              {employees.map((e, i) => {
                const rate = Math.round(((e.days || 22) / 23) * 100);
                return (
                  <tr key={i}>
                    <td className="td-name">
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="emp-avatar" style={{ background: e.color, width: 24, height: 24, fontSize: 10 }}>{e.name[0]}</div>
                        {e.name}
                      </div>
                    </td>
                    <td>{e.role}</td>
                    <td style={{ fontSize: 11, color: empSite[i] ? "#f0c000" : "#3a4255" }}>
                      {empSite[i] || "未分配"}
                    </td>
                    <td>23 天</td>
                    <td>{e.days || 22} 天</td>
                    <td>{[1, 0, 3, 0, 1][i] || 0} 次</td>
                    <td>
                      <span className={`badge ${rate >= 90 ? "green" : rate >= 75 ? "yellow" : "red"}`}>
                        <span className="badge-dot" /> {rate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Progress({ showToast, projects = INITIAL_PROJECTS }) {
  const [projectIdx, setProjectIdx] = useState(0);
  const [pct, setPct] = useState("15");
  const [note, setNote] = useState("");
  const [stageDesc, setStageDesc] = useState("");

  const selectStage = (p, desc) => {
    setPct(p);
    setStageDesc(desc);
    setNote(desc); // auto-fill note with stage content
  };

  const handleSubmit = () => {
    showToast(`📊 進度回報已提交：${projects[projectIdx]?.name} — ${pct}%`, "success");
    setNote("");
    setStageDesc("");
  };

  const activeProjects = projects.filter(p => p.phase === "active");
  const alertProjects = projects.filter(p => p.pct < p.plan && p.phase === "active");

  return (
    <div>
      {alertProjects.length > 0 && (
        <div className="alert-strip">
          <div className="alert-icon">🚨</div>
          <div className="alert-text">
            <strong style={{color:'#e8a0a0'}}>系統預警 ({alertProjects.length})：</strong>
            {alertProjects.map(p => `「${p.name}」實際 ${p.pct}% 低於計劃 ${p.plan}%`).join('　')}
          </div>
          <span className="badge red" style={{ flexShrink: 0 }}><span className="badge-dot" /> 需跟進</span>
        </div>
      )}

      <div className="grid-2">
        <div className="sign-card">
          <div className="sign-title">📸 提交今日進度回報</div>

          <div className="form-group">
            <label className="form-label">選擇工程項目</label>
            <select className="form-select" value={projectIdx} onChange={e => setProjectIdx(+e.target.value)}>
              {activeProjects.map((p, i) => <option key={i} value={i}>{p.name}</option>)}
            </select>
          </div>


          <div className="form-group">
            <label className="form-label">今日完成進度節點</label>

            {/* 新裝完工紙 */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: "#f0c000", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>🆕 新裝完工紙</div>
              {[
                { p: "20", desc: "已進場開工及提交秤線表" },
                { p: "50", desc: "已完成外門框、門頭、地砵，已完成主副路軌安裝及調校" },
                { p: "80", desc: "已完成機房及井道全面安裝，已拆棚交較車行慢車" },
                { p: "95", desc: "已完成 EMSD 驗機，已完成保養部驗收手尾" },
                { p: "100", desc: "已完成客戶交機時安裝手尾" },
              ].map(({ p, desc }) => (
                <div key={`new-${p}`} onClick={() => selectStage(p, desc)} style={{
                  display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 12px",
                  background: pct === p ? "rgba(240,192,0,0.08)" : "#0d0f12",
                  border: `1px solid ${pct === p ? "rgba(240,192,0,0.4)" : "#1e2330"}`,
                  borderRadius: 8, marginBottom: 6, cursor: "pointer", transition: "all 0.15s"
                }}>
                  <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: pct === p ? "#f0c000" : "#555d6e", minWidth: 40, flexShrink: 0 }}>{p}%</span>
                  <span style={{ fontSize: 12, color: pct === p ? "#c8d0e0" : "#555d6e", lineHeight: 1.6 }}>{desc}</span>
                </div>
              ))}
            </div>

            {/* 舊裝翻新完工紙 */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: "#60a5fa", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>🔄 舊裝翻新完工紙</div>
              {[
                { p: "30", desc: "已完成拆除機房物料，已完成拆除井道物料（不包括外門、外門框及外門地砵），已提供已簽到工地的「升降機/自動梯工作日誌」，已提供有效的廢料回收紙回條/載貨入帳票回條" },
                { p: "65", desc: "已提交秤線表，已完成機房及井道全面安裝，已完成外門框、門頭、地砵、外門，已完成主副路軌安裝及調校，已交較車行快車，已提供已簽到工地的「升降機/自動梯工作日誌」，已提供有效的廢料回收紙回條/載貨入帳票回條" },
                { p: "100", desc: "已完成 EMSD 驗機，已完成保養部驗收手尾，已完成客戶交機時安裝手尾，EMSD 發出准用証六個月內" },
              ].map(({ p, desc }) => (
                <div key={`old-${p}`} onClick={() => selectStage(p, desc)} style={{
                  display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 12px",
                  background: pct === p ? "rgba(96,165,250,0.08)" : "#0d0f12",
                  border: `1px solid ${pct === p ? "rgba(96,165,250,0.4)" : "#1e2330"}`,
                  borderRadius: 8, marginBottom: 6, cursor: "pointer", transition: "all 0.15s"
                }}>
                  <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: pct === p ? "#60a5fa" : "#555d6e", minWidth: 40, flexShrink: 0 }}>{p}%</span>
                  <span style={{ fontSize: 12, color: pct === p ? "#c8d0e0" : "#555d6e", lineHeight: 1.6 }}>{desc}</span>
                </div>
              ))}
            </div>

            {/* 特殊工程（多期） */}
            <div style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 10, color: "#a78bfa", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>🏥 特殊工程（多期）</div>
              {[
                { p: "20", desc: "進場開工，提交秤線表，完成初期外門框、門頭、地砵，完成初期主副路軌安裝及調校" },
                { p: "45", desc: "完成機房及井道全面安裝，協助快車慢車調試，完成 EMSD 驗機" },
                { p: "70", desc: "完成第二期安裝及升機，協助快車慢車調試，完成 EMSD 驗機" },
                { p: "95", desc: "完成第三期安裝及升機，協助快車慢車調試，完成 EMSD 驗機" },
                { p: "100", desc: "完成拆卸及清理" },
              ].map(({ p, desc }) => (
                <div key={`special-${p}`} onClick={() => selectStage(p, desc)} style={{
                  display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 12px",
                  background: pct === p ? "rgba(167,139,250,0.08)" : "#0d0f12",
                  border: `1px solid ${pct === p ? "rgba(167,139,250,0.4)" : "#1e2330"}`,
                  borderRadius: 8, marginBottom: 6, cursor: "pointer", transition: "all 0.15s"
                }}>
                  <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: pct === p ? "#a78bfa" : "#555d6e", minWidth: 40, flexShrink: 0 }}>{p}%</span>
                  <span style={{ fontSize: 12, color: pct === p ? "#c8d0e0" : "#555d6e", lineHeight: 1.6 }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">現場照片上傳</label>
            <div style={{
              background: "#0d0f12", border: "2px dashed #2a3040", borderRadius: 8,
              padding: "20px", textAlign: "center", cursor: "pointer",
              color: "#3a4255", fontSize: 13
            }}>
              📷 點擊上傳或拖拽照片至此<br/>
              <span style={{ fontSize: 11 }}>支援 JPG / PNG，最多 5 張</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">現場備注（可自行修改）</label>
            <input
              className="form-input"
              placeholder="選擇節點後自動填入，或手動輸入備注..."
              value={note}
              onChange={e => setNote(e.target.value)}
              style={{ minHeight: 60 }}
            />
            {stageDesc && note === stageDesc && (
              <div style={{ fontSize: 11, color: "#22c55e", marginTop: 4 }}>
                ✅ 已自動帶入節點內容，可直接提交或修改
              </div>
            )}
          </div>

          <button className="btn btn-primary" onClick={handleSubmit} style={{ width: "100%" }}>
            📤 提交進度回報
          </button>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div className="card-title">各項目進度 vs 計劃</div>
            </div>
            <div className="card-body">
              {projects.filter(p => p.phase === "active").map((p, i) => (
                <div key={i} className="progress-item">
                  <div className="progress-header">
                    <div className="progress-name" style={{ fontSize: 12 }}>{p.name}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#555d6e" }}>計劃 {p.plan}%</span>
                      <div className="progress-pct">{p.pct}%</div>
                    </div>
                  </div>
                  <div className="progress-bar-bg">
                    <div className={`progress-bar-fill ${p.status}`} style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">回報時間軸</div></div>
            <div className="card-body">
              <div style={{ color: '#9aa0b4', fontSize: 13, padding: '20px 0', textAlign: 'center' }}>
                📋 進度回報從 Supabase 即時載入
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Invoice({ showToast }) {
  return (
    <div>
      <div className="kpi-row">
        {[
          { label: "本月應收總額", value: "HK$349,500", sub: "4 張請款單", accent: "#f0c000" },
          { label: "已收款", value: "HK$175,000", sub: "旺角中期款", accent: "#22c55e" },
          { label: "待發送", value: "HK$52,500", sub: "1 張草稿待確認", accent: "#60a5fa" },
          { label: "逾期未收", value: "HK$0", sub: "狀況良好", accent: "#a78bfa" },
        ].map((k, i) => (
          <div key={i} className="kpi-card" style={{ "--accent": k.accent }}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ fontSize: 22 }}>{k.value}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">
          <div className="card-title">⚡ 自動觸發請款機制</div>
          <span className="badge yellow"><span className="badge-dot" /> 1 張待處理</span>
        </div>
        <div className="card-body">
          <div style={{ background: "rgba(240,192,0,0.05)", border: "1px solid rgba(240,192,0,0.15)", borderRadius: 8, padding: "16px 20px", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 28 }}>🤖</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 15, fontWeight: 700, color: "#f0c000", marginBottom: 4 }}>
                  系統偵測：工程已達「15% 訂金節點」
                </div>
                <div style={{ fontSize: 13, color: "#9aa0b4" }}>
                  進度確認：72% ≥ 觸發條件 20% ✓ &nbsp;|&nbsp; 請款金額：HK$70,000 &nbsp;|&nbsp; 草稿已生成
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-primary btn-sm" onClick={() => showToast("📧 請款單已發送至客戶！", "success")}>
                  確認發送
                </button>
                <button className="btn btn-secondary btn-sm">預覽草稿</button>
              </div>
            </div>
          </div>

          <div style={{ fontSize: 12, color: "#555d6e", marginBottom: 12 }}>請款節點設定：</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            {[
              { pct: "20%", label: "進場開工", color: "#f0c000", done: true },
              { pct: "50%", label: "路軌完成", color: "#22c55e", done: true },
              { pct: "80%", label: "全面安裝", color: "#60a5fa", done: false },
              { pct: "95%", label: "EMSD驗機", color: "#a78bfa", done: false },
              { pct: "100%", label: "客戶交機", color: "#fb923c", done: false },
            ].map((s, i) => (
              <div key={i} style={{
                background: s.done ? `rgba(${s.color === "#f0c000" ? "240,192,0" : "34,197,94"},0.08)` : "#0d0f12",
                border: `1px solid ${s.done ? s.color + "40" : "#1e2330"}`,
                borderRadius: 8, padding: "12px 10px", textAlign: "center"
              }}>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: s.done ? s.color : "#3a4255" }}>{s.pct}</div>
                <div style={{ fontSize: 11, color: s.done ? "#9aa0b4" : "#3a4255", marginTop: 2 }}>{s.label}</div>
                <div style={{ fontSize: 10, marginTop: 4 }}>{s.done ? "✅ 已觸發" : "⏳ 待觸發"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">請款記錄</div>
          <div className="card-action">下載 PDF →</div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr><th>工程項目</th><th>請款節點</th><th>觸發日期</th><th>金額</th><th>發送狀態</th><th>收款狀態</th><th>操作</th></tr>
            </thead>
            <tbody>
              {[
                // 發票記錄從 Supabase 載入
              ].map((r, i) => (
                <tr key={i}>
                  <td className="td-name">{r[0]}</td>
                  <td>{r[1]}</td>
                  <td>{r[2]}</td>
                  <td className="td-amount">{r[3]}</td>
                  <td><span className={`badge ${r[4]}`}><span className="badge-dot" /> {r[5]}</span></td>
                  <td><span className={`badge ${r[5] === "已收" ? "green" : r[5] === "審批中" ? "blue" : "yellow"}`}><span className="badge-dot" /> {r[5]}</span></td>
                  <td>
                    {r[6] !== "–" && (
                      <button
                        className={`btn btn-sm ${r[6] === "發送" ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => showToast(`已處理：${r[0]} ${r[1]}`, "success")}
                      >
                        {r[6]}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Payroll({ showToast, employees = EMPLOYEES }) {
  const totalSalary = employees.reduce((a, e) => a + (e.days || 22) * (e.rate || 0), 0);
  return (
    <div>
      <div className="kpi-row">
        <div className="kpi-card" style={{ "--accent": "#f0c000" }}>
          <div className="kpi-label">本月薪酬總額</div>
          <div className="kpi-value" style={{fontSize:22}}>HK${totalSalary.toLocaleString()}</div>
          <div className="kpi-sub">5 名員工，自動計算</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#22c55e" }}>
          <div className="kpi-label">最高出勤</div>
          <div className="kpi-value">22 <span style={{fontSize:14}}>天</span></div>
          <div className="kpi-sub">從 Supabase 即時載入</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#d63030" }}>
          <div className="kpi-label">缺勤警示</div>
          <div className="kpi-value"><span>—</span></div>
          <div className="kpi-sub">從考勤記錄計算</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#60a5fa" }}>
          <div className="kpi-label">發薪日</div>
          <div className="kpi-value" style={{fontSize:20}}>{new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate()} <span style={{fontSize:14}}>日</span></div>
          <div className="kpi-sub">{new Date().getMonth()+1} 月月底</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">
          <div className="card-title">薪酬試算明細（2025 年 7 月）</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary btn-sm" onClick={() => showToast("📊 薪酬報表已匯出", "success")}>匯出 Excel</button>
            <button className="btn btn-primary btn-sm" onClick={() => showToast("✅ 已提交老闆審批", "success")}>提交審批</button>
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr><th>員工</th><th>職位</th><th>日薪</th><th>出勤天數</th><th>遲到扣薪</th><th>總薪酬</th><th>狀態</th></tr>
            </thead>
            <tbody>
              {EMPLOYEES.map((e, i) => {
                const deduct = [0, 0, 500, 0, 0][i];
                const total = e.days * e.rate - deduct;
                return (
                  <tr key={i}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="emp-avatar" style={{ background: e.color, width: 28, height: 28, fontSize: 12 }}>{e.name[0]}</div>
                        <span className="td-name">{e.name}</span>
                      </div>
                    </td>
                    <td>{e.role}</td>
                    <td>HK${e.rate}</td>
                    <td style={{ color: e.days < 20 ? "#d63030" : "#9aa0b4" }}>
                      {e.days} 天 {e.days < 20 && "⚠️"}
                    </td>
                    <td style={{ color: deduct > 0 ? "#d63030" : "#3a4255" }}>
                      {deduct > 0 ? `-HK$${deduct}` : "–"}
                    </td>
                    <td className="td-amount">HK${total.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${i < 2 || i > 2 ? "yellow" : "red"}`}>
                        <span className="badge-dot" />
                        {i < 2 || i > 2 ? "待審批" : "需確認"}
                      </span>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={5} style={{ textAlign: "right", fontWeight: 700, color: "#c8d0e0", paddingRight: 16 }}>合計</td>
                <td className="td-amount">HK${(totalSalary - 500).toLocaleString()}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2">
        <div className="sign-card">
          <div className="sign-title">⚙️ 薪酬規則設定</div>
          {[
            { role: "技術主管", rate: 1200 },
            { role: "電梯技工", rate: 850 },
            { role: "助理技工", rate: 650 },
          ].map((r, i) => (
            <div key={i} className="form-group">
              <label className="form-label">{r.role} 日薪（HK$）</label>
              <input className="form-input" defaultValue={r.rate} type="number" />
            </div>
          ))}
          <button className="btn btn-primary" style={{width:"100%"}} onClick={() => showToast("✅ 薪酬規則已更新", "success")}>
            儲存規則
          </button>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">歷史薪酬記錄</div></div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="data-table">
              <thead><tr><th>月份</th><th>薪酬總額</th><th>人數</th><th>狀態</th></tr></thead>
              <tbody>
                {[
                  ["2025年7月", `HK$${(totalSalary - 500).toLocaleString()}`, 5, "yellow", "待發"],
                  ["2025年6月", "HK$72,800", 5, "green", "已發"],
                  ["2025年5月", "HK$68,500", 4, "green", "已發"],
                  ["2025年4月", "HK$61,200", 4, "green", "已發"],
                ].map((r, i) => (
                  <tr key={i}>
                    <td className="td-name">{r[0]}</td>
                    <td className="td-amount">{r[1]}</td>
                    <td>{r[2]} 人</td>
                    <td><span className={`badge ${r[3]}`}><span className="badge-dot" /> {r[4]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfitCalc({ showToast }) {
  const [projectValue, setProjectValue] = useState(100000);
  const [targetMargin, setTargetMargin] = useState(30);
  const [targetFixed, setTargetFixed] = useState(30000);
  const [workers, setWorkers] = useState([
    { role: "技術主管", days: 10, rate: 1200 },
    { role: "電梯技工", days: 15, rate: 850 },
  ]);
  const [subcontract, setSubcontract] = useState(0);
  const [overhead, setOverhead] = useState(5000);
  const [savedQuotes, setSavedQuotes] = useState([]);

  const labourTotal = workers.reduce((a, w) => a + w.days * w.rate, 0);
  const totalCost = labourTotal + subcontract + overhead;
  const profit = projectValue - totalCost;
  const actualMargin = projectValue > 0 ? ((profit / projectValue) * 100) : 0;
  const targetProfit = projectValue * (targetMargin / 100);
  const maxCostBudget = projectValue - targetProfit;
  const budgetRemaining = maxCostBudget - totalCost;
  const marginColor = actualMargin >= targetMargin ? "#22c55e" : actualMargin >= targetMargin * 0.7 ? "#f0c000" : "#d63030";

  // For fixed target view
  const fixedShortfall = targetFixed - profit;
  const minPriceForFixed = totalCost + targetFixed;
  // Min price for % target
  const minPriceForMargin = Math.ceil(totalCost / (1 - targetMargin / 100));

  const addWorker = () => setWorkers([...workers, { role: "助理技工", days: 10, rate: 650 }]);
  const removeWorker = (i) => setWorkers(workers.filter((_, idx) => idx !== i));
  const updateWorker = (i, field, val) => {
    const w = [...workers];
    w[i] = { ...w[i], [field]: field === "role" ? val : Number(val) };
    setWorkers(w);
  };

  const handleSave = () => {
    const name = `新報價 ${new Date().toLocaleDateString("zh-HK")}`;
    setSavedQuotes([{ name, value: projectValue, labour: labourTotal, sub: subcontract, over: overhead, profit }, ...savedQuotes]);
    showToast("✅ 報價已儲存至記錄", "success");
  };

  const ROLE_PRESETS = [
    { role: "技術主管", rate: 1200 },
    { role: "電梯技工", rate: 850 },
    { role: "助理技工", rate: 650 },
    { role: "判頭/判工", rate: 1500 },
  ];

  return (
    <div>
      {/* Top: contract input + 4-view profit summary */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="sign-card" style={{ marginBottom: 0 }}>
          <div className="sign-title">💼 工程合約金額</div>
          <input
            className="form-input"
            type="number"
            value={projectValue}
            onChange={e => setProjectValue(Number(e.target.value))}
            style={{ fontSize: 28, fontFamily: "'Barlow Condensed'", fontWeight: 800, color: "#f0c000", marginBottom: 12, height: 56 }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 16 }}>
            {[50000, 100000, 200000, 350000].map(v => (
              <button key={v} className={`btn btn-sm ${projectValue === v ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setProjectValue(v)}>
                {v >= 10000 ? `${v/10000}萬` : v}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "#555d6e" }}>
              <span>成本 {projectValue > 0 ? (100 - actualMargin).toFixed(1) : 0}%</span>
              <span style={{ color: marginColor, fontWeight: 700 }}>利潤 {actualMargin.toFixed(1)}%</span>
            </div>
            <div className="progress-bar-bg" style={{ height: 12, borderRadius: 6 }}>
              <div style={{
                width: `${Math.min(Math.max(projectValue > 0 ? (totalCost / projectValue) * 100 : 0, 0), 100)}%`,
                height: "100%", borderRadius: 6,
                background: "linear-gradient(90deg, #d63030, #ff6b35)",
                transition: "width 0.4s ease"
              }} />
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {/* View 1: leftover */}
          <div style={{ background: "#13161c", border: `1px solid ${profit < 0 ? "rgba(214,48,48,0.3)" : "rgba(34,197,94,0.2)"}`, borderTop: `3px solid ${profit < 0 ? "#d63030" : "#22c55e"}`, borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#555d6e", marginBottom: 8 }}>💵 成本後剩餘</div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 26, fontWeight: 800, color: profit < 0 ? "#d63030" : "#22c55e" }}>HK${profit.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "#555d6e", marginTop: 4 }}>{profit < 0 ? "⚠️ 虧本" : "你實際到手"}</div>
          </div>
          {/* View 2: actual margin */}
          <div style={{ background: "#13161c", border: `1px solid ${marginColor}40`, borderTop: `3px solid ${marginColor}`, borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#555d6e", marginBottom: 8 }}>📊 實際利潤率</div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 26, fontWeight: 800, color: marginColor }}>{actualMargin.toFixed(1)}%</div>
            <div style={{ fontSize: 11, color: "#555d6e", marginTop: 4 }}>{actualMargin >= targetMargin ? `✅ 達標（目標 ${targetMargin}%）` : `❌ 低於目標 ${(targetMargin - actualMargin).toFixed(1)}%`}</div>
          </div>
          {/* View 3: % target min price */}
          <div style={{ background: "rgba(240,192,0,0.05)", border: "1px solid rgba(240,192,0,0.2)", borderTop: "3px solid #f0c000", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#555d6e", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
              🎯 保
              <input type="number" value={targetMargin} onChange={e => setTargetMargin(Number(e.target.value))}
                style={{ width: 36, background: "transparent", border: "none", borderBottom: "1px solid #f0c000", color: "#f0c000", fontFamily: "'Barlow Condensed'", fontSize: 14, fontWeight: 700, textAlign: "center", outline: "none" }} />
              % 最低報價
            </div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: "#f0c000" }}>HK${minPriceForMargin.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "#555d6e", marginTop: 4 }}>{projectValue >= minPriceForMargin ? `✅ 現報價多 +HK$${(projectValue - minPriceForMargin).toLocaleString()}` : `需加價 HK$${(minPriceForMargin - projectValue).toLocaleString()}`}</div>
          </div>
          {/* View 4: fixed $ target */}
          <div style={{ background: "rgba(96,165,250,0.05)", border: "1px solid rgba(96,165,250,0.2)", borderTop: "3px solid #60a5fa", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#555d6e", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
              💰 固定賺
              <input type="number" value={targetFixed} onChange={e => setTargetFixed(Number(e.target.value))}
                style={{ width: 56, background: "transparent", border: "none", borderBottom: "1px solid #60a5fa", color: "#60a5fa", fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 700, textAlign: "center", outline: "none" }} />
              最低報價
            </div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: "#60a5fa" }}>HK${minPriceForFixed.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "#555d6e", marginTop: 4 }}>{profit >= targetFixed ? `✅ 已達標，多賺 HK$${(profit - targetFixed).toLocaleString()}` : `尚差 HK$${fixedShortfall.toLocaleString()}`}</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div>
          {/* Labour */}
          <div className="sign-card" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div className="sign-title" style={{ marginBottom: 0 }}>👷 人工成本</div>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 700, color: "#d63030" }}>HK${labourTotal.toLocaleString()}</div>
            </div>
            {workers.map((w, i) => (
              <div key={i} style={{ background: "#0d0f12", border: "1px solid #1e2330", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 75px 85px 32px", gap: 8, alignItems: "end" }}>
                  <div>
                    <div style={{ fontSize: 10, color: "#3a4255", marginBottom: 4 }}>職位</div>
                    <select className="form-select" value={w.role} onChange={e => updateWorker(i, "role", e.target.value)}>
                      {ROLE_PRESETS.map(p => <option key={p.role} value={p.role}>{p.role}</option>)}
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#3a4255", marginBottom: 4 }}>天數</div>
                    <input className="form-input" type="number" value={w.days} min="1"
                      onChange={e => updateWorker(i, "days", e.target.value)} style={{ padding: "7px 8px" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#3a4255", marginBottom: 4 }}>日薪 HK$</div>
                    <input className="form-input" type="number" value={w.rate} min="0"
                      onChange={e => updateWorker(i, "rate", e.target.value)} style={{ padding: "7px 8px" }} />
                  </div>
                  <button className="btn btn-danger btn-sm" style={{ padding: "8px", marginBottom: 1 }} onClick={() => removeWorker(i)}>✕</button>
                </div>
                <div style={{ fontSize: 12, color: "#555d6e", marginTop: 8, display: "flex", justifyContent: "space-between" }}>
                  <span>{w.days} 天 × HK${w.rate}/天</span>
                  <span style={{ color: "#f0c000", fontFamily: "'Barlow Condensed'", fontSize: 15, fontWeight: 700 }}>= HK${(w.days * w.rate).toLocaleString()}</span>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setWorkers([...workers, { role: "助理技工", days: 10, rate: 650 }])}>+ 新增工人</button>
              {ROLE_PRESETS.map(p => (
                <button key={p.role} className="btn btn-secondary btn-sm" style={{ fontSize: 11 }}
                  onClick={() => setWorkers([...workers, { role: p.role, days: 10, rate: p.rate }])}>
                  + {p.role}
                </button>
              ))}
            </div>
          </div>

          <div className="sign-card">
            <div className="sign-title">🧾 其他成本</div>
            <div className="form-group">
              <label className="form-label">🤝 判頭 / 外判費用 (HK$)</label>
              <input className="form-input" type="number" value={subcontract} onChange={e => setSubcontract(Number(e.target.value))} />
              {subcontract > 0 && <div style={{ fontSize: 11, color: "#555d6e", marginTop: 4 }}>佔合約 {projectValue > 0 ? ((subcontract / projectValue) * 100).toFixed(1) : 0}%</div>}
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">🏢 行政 / 管理費 (HK$)</label>
              <input className="form-input" type="number" value={overhead} onChange={e => setOverhead(Number(e.target.value))} />
              {overhead > 0 && <div style={{ fontSize: 11, color: "#555d6e", marginTop: 4 }}>佔合約 {projectValue > 0 ? ((overhead / projectValue) * 100).toFixed(1) : 0}%</div>}
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div className="card-title">📊 成本 vs 利潤拆解</div>
            </div>
            <div className="card-body">
              {[
                { label: "👷 人工成本", val: labourTotal, color: "#d63030" },
                { label: "🤝 外判費用", val: subcontract, color: "#a78bfa" },
                { label: "🏢 行政管理費", val: overhead, color: "#fb923c" },
                { label: "🎯 你的利潤", val: profit, color: "#22c55e", highlight: true },
              ].map((item, i) => {
                const pct = projectValue > 0 ? Math.max(0, (item.val / projectValue) * 100) : 0;
                return (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: item.highlight ? "#22c55e" : "#9aa0b4", fontWeight: item.highlight ? 700 : 400 }}>{item.label}</span>
                      </div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 16, fontWeight: 700, color: item.color }}>HK${item.val.toLocaleString()}</span>
                        <span style={{ fontSize: 11, color: "#3a4255", minWidth: 38, textAlign: "right" }}>{pct.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="progress-bar-bg" style={{ height: item.highlight ? 10 : 6 }}>
                      <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", borderRadius: 4, background: item.color, opacity: item.val <= 0 ? 0.15 : 1, transition: "width 0.4s ease" }} />
                    </div>
                  </div>
                );
              })}
              <div style={{ borderTop: "1px solid #1e2330", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#9aa0b4" }}>總成本</span>
                <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 18, fontWeight: 700, color: "#d63030" }}>HK${totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header"><div className="card-title">🔢 利潤場景一覽</div></div>
            <div className="card-body" style={{ padding: 0 }}>
              {[20, 25, 30, 35, 40].map(m => {
                const minP = Math.ceil(totalCost / (1 - m / 100));
                const p = minP - totalCost;
                const isTarget = m === targetMargin;
                return (
                  <div key={m} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: isTarget ? "rgba(240,192,0,0.05)" : "transparent", borderBottom: "1px solid #1e2330", borderLeft: isTarget ? "3px solid #f0c000" : "3px solid transparent" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 800, color: m <= 20 ? "#d63030" : m <= 25 ? "#f0c000" : "#22c55e" }}>{m}%</span>
                      {isTarget && <span style={{ fontSize: 10, color: "#f0c000", background: "rgba(240,192,0,0.1)", padding: "2px 7px", borderRadius: 4, fontWeight: 700 }}>目標</span>}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 16, fontWeight: 700, color: "#c8d0e0" }}>HK${minP.toLocaleString()}</div>
                      <div style={{ fontSize: 11, color: "#22c55e" }}>淨賺 HK${p.toLocaleString()}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="btn-row">
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}>💾 儲存報價</button>
            <button className="btn btn-secondary" onClick={() => showToast("📄 報價單 PDF 已生成", "success")}>匯出報價單</button>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-header"><div className="card-title">📁 已儲存報價記錄</div></div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr><th>報價名稱</th><th>合約金額</th><th>人工</th><th>外判</th><th>管理費</th><th>總成本</th><th>毛利潤</th><th>利潤率</th></tr>
            </thead>
            <tbody>
              {savedQuotes.map((q, i) => {
                const cost = q.labour + q.sub + q.over;
                const margin = q.value > 0 ? ((q.profit / q.value) * 100).toFixed(1) : "0.0";
                return (
                  <tr key={i}>
                    <td className="td-name">{q.name}</td>
                    <td style={{ color: "#f0c000", fontFamily: "'Barlow Condensed'", fontWeight: 700 }}>HK${q.value.toLocaleString()}</td>
                    <td>HK${q.labour.toLocaleString()}</td>
                    <td>HK${q.sub.toLocaleString()}</td>
                    <td>HK${q.over.toLocaleString()}</td>
                    <td style={{ color: "#d63030" }}>HK${cost.toLocaleString()}</td>
                    <td className="td-amount">HK${q.profit.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${Number(margin) >= 30 ? "green" : Number(margin) >= 20 ? "yellow" : "red"}`}>
                        <span className="badge-dot" />{margin}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT MANAGER ────────────────────────────────────────────────────────
// ── Invoice PDF Generator (俊輝格式) ─────────────────────────────────────────
function generateInvoicePDF(inv) {
  const w = window.open("", "_blank");
  if (!w) { alert("請允許彈出視窗以生成 PDF"); return; }
  const dateStr = new Date().toLocaleDateString("zh-HK", { year: "numeric", month: "long", day: "numeric" });
  const amt = Number(inv.amount || 0);
  const amtFmt = amt.toLocaleString("en-HK", { minimumFractionDigits: 2 });
  const ecName = inv.ecName || inv.projectName || "";
  const desc = inv.description || "";
  const pct = inv.pct ? `${inv.pct}%` : "";
  const contractVal = inv.contractValue ? Number(inv.contractValue).toLocaleString() : "";
  const pctLine = contractVal && pct ? `${contractVal}元的${pct}, 共$${amtFmt}元` : "";

  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    body{font-family:Arial,sans-serif;padding:40px;font-size:13px;color:#000}
    .order-no{text-align:right;font-weight:bold;font-size:14px;margin-bottom:4px}
    .date{text-align:right;color:#666;font-size:12px;margin-bottom:30px}
    .bill-label{font-weight:bold;font-size:15px;margin-bottom:6px}
    table{width:100%;border-collapse:collapse;margin:20px 0}
    th{background:#1a1a1a;color:#fff;padding:10px 12px;text-align:left;font-size:13px}
    th:nth-child(3),th:nth-child(4),th:nth-child(5){text-align:right}
    td{padding:14px 12px;border:1px solid #ddd;vertical-align:top}
    td:nth-child(3),td:nth-child(4),td:nth-child(5){text-align:right}
    .total td{font-weight:bold;background:#f5f5f5;border:1px solid #ddd}
    .total-amt{font-size:16px}
    .footer{line-height:2;margin-top:20px}
    .co{font-weight:bold}
    @media print{body{padding:20px}}
  </style></head><body>
  <div class="order-no">INVOICE NO.: ${inv.cfNo}</div>
  <div class="date">日期 Date: ${dateStr}</div>
  <div class="bill-label">BILL TO</div>
  <div>Anlev Elex Elevator Ltd</div>
  <div>ATAL Tower, 45-51 Kwok Shui Road, Kwai Chung, New Territories, Hong Kong</div>
  <div style="margin-bottom:20px">Phone: 2561 8278</div>
  <table>
    <thead><tr>
      <th style="width:5%">Items</th>
      <th style="width:56%">Details</th>
      <th style="width:10%">Quantity</th>
      <th style="width:14%">Unit Price</th>
      <th style="width:15%">AMOUNT</th>
    </tr></thead>
    <tbody>
      <tr>
        <td style="text-align:center">1</td>
        <td><strong>${ecName}</strong><br/>${desc ? desc + "<br/><br/>" : ""}${pctLine}</td>
        <td style="text-align:center">1</td>
        <td style="text-align:right">$${amtFmt}</td>
        <td style="text-align:right">$${amtFmt}</td>
      </tr>
      <tr class="total">
        <td colspan="4" style="text-align:right">TOTAL:</td>
        <td class="total-amt">HKD$${amtFmt}</td>
      </tr>
    </tbody>
  </table>
  <div class="footer">
    <div>Make all checks payable to <span class="co">Chun Fai Lifts Engineering Company Ltd.</span></div>
    <div class="co">俊輝電梯工程有限公司</div><br/>
    <div>If you have any questions concerning this invoice, contact Mr. Kam at 5444 2099.</div>
    <br/><div style="font-weight:bold">THANK YOU FOR YOUR BUSINESS!</div>
  </div>
  <script>window.onload=()=>{window.print()}</script>
  </body></html>`);
  w.document.close();
}

// ── ProjectManager (CF-based) ─────────────────────────────────────────────────
function ProjectManager({ projects, setProjects, showToast, onAdd, onUpdate, onDelete, dbConnected }) {
  // CF invoices loaded from Supabase invoices table (joined with project name)
  const [cfList, setCfList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterPaid, setFilterPaid] = useState("all"); // all | paid | unpaid
  const [filterEC, setFilterEC] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ cfNo: "", ecName: "", amount: "", pct: "", description: "", contractValue: "", startDate: "", endDate: "", contactPhone: "" });
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Load all invoices with project names from Supabase
  const loadCFList = async () => {
    setLoading(true);
    try {
      // Use Supabase join: invoices → projects
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/invoices?select=*,projects(name)&order=cf_num.asc.nullslast&limit=2000&offset=0`,
        { headers: { 
          "apikey": SUPABASE_KEY, 
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Prefer": "count=exact",
          "Range-Unit": "items",
          "Range": "0-1999"
        } }
      );
      const data = await res.json();
      // Flatten: each row = { id, cfNo(stage), ecName, amount, status, pct, description, contractValue }
      const flat = data.map(inv => ({
        id: inv.id,
        cfNo: inv.stage || "",
        ecName: inv.projects?.name || "",
        amount: inv.amount || 0,
        status: inv.status || "pending",
        pct: inv.pct || "",
        description: inv.label || inv.description || "",
        contractValue: inv.contract_value || "",
        projectId: inv.project_id,
        startDate: inv.start_date || "",
        endDate: inv.end_date || "",
        contactPhone: inv.contact_phone || "",
      }));
      setCfList(flat);
    } catch(e) {
      showToast("⚠️ 載入發票失敗，使用示範數據", "error");
      // Demo fallback
      setCfList([
        { id:1, cfNo:"CF01162", ecName:"EC-550屯門醫院輕鐵站行人天橋NF411", amount:10750, status:"pending", pct:"5", description:"已完成客戶交機時安裝手尾", contractValue:215000, projectId:1 },
        { id:2, cfNo:"CF01156", ecName:"EC-550屯門鳴琴路旁Footbridge NF198", amount:64500, status:"paid", pct:"30", description:"已完成機房及井道全面安裝，已拆棚交較車行慢車", contractValue:215000, projectId:1 },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => { loadCFList(); }, []);

  // 🔔 Check deadlines every time cfList loads - send WhatsApp for projects ending within 10 days
  const BOSS_PHONE = "85254442099"; // 老闆電話 (852 + 5444 2099)
  const MAKE_WEBHOOK_DEADLINE = "https://hook.eu2.make.com/YOUR_DEADLINE_WEBHOOK"; // Make webhook

  const [deadlineAlerts, setDeadlineAlerts] = useState([]);
  const [notifiedCFs, setNotifiedCFs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("notifiedCFs") || "{}"); } catch { return {}; }
  });

  const sendDeadlineWhatsApp = async (inv, auto = false) => {
    const daysLeft = Math.ceil((new Date(inv.endDate) - new Date()) / 86400000);
    const msg = `⚠️ *工程完工期提醒*\n📋 工程：${inv.ecName}\n🔖 CF 號：${inv.cfNo}\n📅 結束日期：${inv.endDate}\n⏳ 距離結束：*${daysLeft} 日*\n請盡快跟進安排！`;
    const recipients = [BOSS_PHONE];
    if (inv.contactPhone && inv.contactPhone !== BOSS_PHONE) recipients.push(`852${inv.contactPhone.replace(/\D/g,"")}`);
    try {
      await fetch(MAKE_WEBHOOK_DEADLINE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, phones: recipients, cf: inv.cfNo, project: inv.ecName, days_left: daysLeft, end_date: inv.endDate }),
      });
      if (!auto) showToast(`✅ WhatsApp 已發送至 ${recipients.length} 人 — ${inv.cfNo}`);
    } catch(e) {
      if (!auto) showToast("⚠️ 通知發送失敗，請檢查 Make Webhook", "error");
    }
  };

  useEffect(() => {
    if (cfList.length === 0) return;
    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);
    const alerts = [];
    cfList.forEach(inv => {
      if (!inv.endDate || inv.status === "paid") return;
      const end = new Date(inv.endDate);
      const daysLeft = Math.ceil((end - today) / 86400000);
      if (daysLeft >= 0 && daysLeft <= 10) {
        alerts.push({ ...inv, daysLeft });
        // Auto-send once per day per CF
        const key = `${inv.cfNo}_${todayKey}`;
        if (!notifiedCFs[key] && MAKE_WEBHOOK_DEADLINE !== "https://hook.eu2.make.com/YOUR_DEADLINE_WEBHOOK") {
          sendDeadlineWhatsApp(inv, true);
          const updated = { ...notifiedCFs, [key]: true };
          setNotifiedCFs(updated);
          try { localStorage.setItem("notifiedCFs", JSON.stringify(updated)); } catch {}
        }
      }
    });
    setDeadlineAlerts(alerts);
  }, [cfList]);

  const togglePaid = async (item) => {
    const newStatus = item.status === "paid" ? "pending" : "paid";
    // Optimistic update
    setCfList(prev => prev.map(c => c.id === item.id ? { ...c, status: newStatus } : c));
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/invoices?id=eq.${item.id}`, {
        method: "PATCH",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      showToast(newStatus === "paid" ? `✅ ${item.cfNo} 已確認收款！` : `↩️ ${item.cfNo} 取消收款`);
    } catch(e) {
      showToast("❌ 更新失敗", "error");
      setCfList(prev => prev.map(c => c.id === item.id ? { ...c, status: item.status } : c));
    }
  };

  const handleAddCF = async () => {
    if (!addForm.cfNo || !addForm.ecName || !addForm.amount) {
      showToast("⚠️ 請填寫 CF 號、工程名稱及金額", "error"); return;
    }
    setSaving(true);
    try {
      // Find or create project
      let projectId = null;
      const projRes = await fetch(
        `${SUPABASE_URL}/rest/v1/projects?name=eq.${encodeURIComponent(addForm.ecName)}&limit=1`,
        { headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` } }
      );
      const projData = await projRes.json();
      if (projData.length > 0) {
        projectId = projData[0].id;
      } else {
        const newProj = await sbInsert("projects", { name: addForm.ecName, client: addForm.ecName.match(/EC-\d+/)?.[0] || "", contract_value: Number(addForm.contractValue||0), progress_pct: Number(addForm.pct||0), plan_pct: Number(addForm.pct||0), status: "ok", phase: "active" });
        projectId = newProj[0].id;
      }
      const newInv = await sbInsert("invoices", {
        project_id: projectId,
        stage: addForm.cfNo,
        amount: Number(addForm.amount),
        status: "pending",
        label: addForm.description,
        start_date: addForm.startDate || null,
        end_date: addForm.endDate || null,
        contact_phone: addForm.contactPhone || null,
        cf_num: parseInt(addForm.cfNo.replace(/[^0-9]/g,'')) || null,
      });
      setCfList(prev => [...prev, {
        id: newInv[0].id, cfNo: addForm.cfNo, ecName: addForm.ecName,
        amount: Number(addForm.amount), status: "pending",
        pct: addForm.pct, description: addForm.description,
        contractValue: addForm.contractValue, projectId,
        startDate: addForm.startDate, endDate: addForm.endDate,
        contactPhone: addForm.contactPhone,
      }].sort((a,b) => (a.cfNo||"").localeCompare(b.cfNo||"")));
      setAddForm({ cfNo: "", ecName: "", amount: "", pct: "", description: "", contractValue: "", startDate: "", endDate: "", contactPhone: "" });
      setShowAddForm(false);
      showToast(`✅ ${addForm.cfNo} 已新增！`);
    } catch(e) {
      showToast("❌ 新增失敗：" + e.message, "error");
    }
    setSaving(false);
  };

  // Filtered list
  const PAGE_SIZE = 50;
  const [currentPage, setCurrentPage] = useState(1);

  const ecCodes = [...new Set(cfList.map(c => c.ecName.match(/EC-\d+/)?.[0]).filter(Boolean))].sort();
  const filtered = cfList.filter(c => {
    const s = search.toLowerCase();
    const matchSearch = !s || c.cfNo.toLowerCase().includes(s) || c.ecName.toLowerCase().includes(s) || c.description.toLowerCase().includes(s);
    const matchPaid = filterPaid === "all" || (filterPaid === "paid" ? c.status === "paid" : c.status !== "paid");
    const matchEC = filterEC === "all" || c.ecName.includes(filterEC);
    return matchSearch && matchPaid && matchEC;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Reset to page 1 when filter/search changes
  const handleSearch = (val) => { setSearch(val); setCurrentPage(1); };
  const handleFilterPaid = (val) => { setFilterPaid(val); setCurrentPage(1); };
  const handleFilterEC = (val) => { setFilterEC(val); setCurrentPage(1); };

  const totalAmt = filtered.reduce((a,c) => a + c.amount, 0);
  const paidAmt = filtered.filter(c => c.status === "paid").reduce((a,c) => a + c.amount, 0);
  const unpaidAmt = totalAmt - paidAmt;

  return (
    <div>
      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { label: "CF 發票總數", value: cfList.length, color: "#f0c000" },
          { label: "篩選顯示", value: filtered.length, color: "#60a5fa" },
          { label: "已收款", value: `HK$${(paidAmt/10000).toFixed(0)}萬`, color: "#22c55e" },
          { label: "待收款", value: `HK$${(unpaidAmt/10000).toFixed(0)}萬`, color: "#d63030" },
        ].map((k,i) => (
          <div key={i} style={{ background:"#13161c", border:"1px solid #1e2330", borderRadius:10, padding:"12px 16px" }}>
            <div style={{ fontSize:10, color:"#3a4255", textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>{k.label}</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:22, fontWeight:800, color:k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Search + Filters + Add button */}
      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
        <input
          className="form-input" placeholder="🔍 搜尋 CF 號 / 工程名稱..."
          value={search} onChange={e => handleSearch(e.target.value)}
          style={{ flex:1, minWidth:200 }}
        />
        <select value={filterPaid} onChange={e => handleFilterPaid(e.target.value)}
          style={{ background:"#13161c", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:6, padding:"8px 12px", fontSize:12 }}>
          <option value="all">全部收款狀態</option>
          <option value="paid">✅ 已收款</option>
          <option value="unpaid">⏳ 待收款</option>
        </select>
        <select value={filterEC} onChange={e => handleFilterEC(e.target.value)}
          style={{ background:"#13161c", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:6, padding:"8px 12px", fontSize:12, maxWidth:160 }}>
          <option value="all">全部 EC 工程</option>
          {ecCodes.map(ec => <option key={ec} value={ec}>{ec}</option>)}
        </select>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "✕ 收起" : "+ 新增 CF"}
        </button>
      </div>

      {/* Add CF form */}
      {showAddForm && (
        <div style={{ background:"#13161c", border:"1px solid #f0c000", borderRadius:10, padding:16, marginBottom:16 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:16, fontWeight:700, color:"#f0c000", marginBottom:12 }}>📋 新增 CF 發票</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:10 }}>
            {[
              { label:"CF 號碼 *", key:"cfNo", ph:"CF01163" },
              { label:"完成 % *", key:"pct", ph:"5" },
              { label:"發票金額 (HK$) *", key:"amount", ph:"10750" },
              { label:"合約總值 (HK$)", key:"contractValue", ph:"215000" },
            ].map(f => (
              <div key={f.key}>
                <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>{f.label}</div>
                <input value={addForm[f.key]} onChange={e => setAddForm({...addForm, [f.key]: e.target.value})}
                  placeholder={f.ph} className="form-input" />
              </div>
            ))}
          </div>
          <div style={{ marginBottom:10 }}>
            <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>EC 工程名稱 *</div>
            <input value={addForm.ecName} onChange={e => setAddForm({...addForm, ecName: e.target.value})}
              placeholder="EC-550屯門醫院輕鐵站行人天橋NF411" className="form-input" style={{ width:"100%" }} />
          </div>
          <div style={{ marginBottom:10 }}>
            <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>工程描述</div>
            <input value={addForm.description} onChange={e => setAddForm({...addForm, description: e.target.value})}
              placeholder="已完成客戶交機時安裝手尾" className="form-input" style={{ width:"100%" }} />
          </div>
          {/* 🆕 Start/End dates + contact */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:10 }}>
            <div>
              <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>📅 開始日期</div>
              <input type="date" value={addForm.startDate} onChange={e => setAddForm({...addForm, startDate: e.target.value})}
                className="form-input" />
            </div>
            <div>
              <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>📅 結束日期</div>
              <input type="date" value={addForm.endDate} onChange={e => setAddForm({...addForm, endDate: e.target.value})}
                className="form-input" style={{ borderColor: addForm.endDate ? "#f0c000" : "" }} />
            </div>
            <div>
              <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>📱 工程聯絡人電話</div>
              <input type="tel" value={addForm.contactPhone} onChange={e => setAddForm({...addForm, contactPhone: e.target.value})}
                placeholder="9XXXXXXX" className="form-input" />
            </div>
          </div>
          {addForm.endDate && (() => {
            const daysLeft = Math.ceil((new Date(addForm.endDate) - new Date()) / 86400000);
            return (
              <div style={{ background: daysLeft <= 10 ? "rgba(239,68,68,0.1)" : "rgba(240,192,0,0.08)", border: `1px solid ${daysLeft <= 10 ? "#EF4444" : "#f0c000"}`, borderRadius:8, padding:"8px 12px", marginBottom:10, fontSize:12, color: daysLeft <= 10 ? "#EF4444" : "#f0c000" }}>
                {daysLeft <= 0 ? `⚠️ 已超期 ${Math.abs(daysLeft)} 日` : daysLeft <= 10 ? `🔴 距離結束只剩 ${daysLeft} 日！將自動發送 WhatsApp 通知` : `✅ 距離結束還有 ${daysLeft} 日`}
              </div>
            );
          })()}
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-primary" onClick={handleAddCF} disabled={saving} style={{ flex:1 }}>
              {saving ? "儲存中..." : "✅ 確認新增"}
            </button>
            <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>取消</button>
          </div>
        </div>
      )}

      {/* 🔔 Deadline Alerts */}
      {deadlineAlerts.length > 0 && (
        <div style={{ background:"rgba(239,68,68,0.08)", border:"1.5px solid #EF4444", borderRadius:10, padding:12, marginBottom:14 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:14, fontWeight:700, color:"#EF4444", marginBottom:10 }}>
            🔴 即將到期工程 — {deadlineAlerts.length} 個
          </div>
          {deadlineAlerts.map(inv => {
            const daysLeft = Math.ceil((new Date(inv.endDate) - new Date()) / 86400000);
            return (
              <div key={inv.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid rgba(239,68,68,0.2)" }}>
                <div>
                  <span style={{ color:"#f0c000", fontWeight:700, fontSize:13 }}>{inv.cfNo}</span>
                  <span style={{ color:"#8891a4", fontSize:12, marginLeft:8 }}>{inv.ecName}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ color: daysLeft <= 3 ? "#EF4444" : "#f0c000", fontWeight:800, fontSize:13 }}>
                    {daysLeft === 0 ? "今日到期！" : `還剩 ${daysLeft} 日`}
                  </span>
                  <button onClick={() => sendDeadlineWhatsApp(inv)}
                    style={{ background:"#25D366", border:"none", color:"#fff", borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700, cursor:"pointer" }}>
                    📱 通知
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      <div style={{ fontSize:12, color:"#555d6e", marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span>
          顯示 {filtered.length} / {cfList.length} 張發票
          {filterEC !== "all" && <span style={{ color:"#f0c000", marginLeft:8 }}>· {filterEC}</span>}
          　第 {currentPage} / {totalPages || 1} 頁（每頁 {PAGE_SIZE} 個）
        </span>
        {/* Pagination controls top */}
        {totalPages > 1 && (
          <div style={{ display:"flex", gap:4, alignItems:"center" }}>
            <button onClick={() => setCurrentPage(1)} disabled={currentPage===1}
              style={{ background:"#1e2330", border:"none", color: currentPage===1?"#3a4255":"#e8eaf0", borderRadius:5, padding:"4px 10px", cursor: currentPage===1?"default":"pointer", fontSize:12 }}>
              «
            </button>
            <button onClick={() => setCurrentPage(p => Math.max(1,p-1))} disabled={currentPage===1}
              style={{ background:"#1e2330", border:"none", color: currentPage===1?"#3a4255":"#e8eaf0", borderRadius:5, padding:"4px 10px", cursor: currentPage===1?"default":"pointer", fontSize:12 }}>
              ‹ 上頁
            </button>
            {/* Page numbers */}
            {Array.from({length: Math.min(7, totalPages)}, (_,i) => {
              let p;
              if (totalPages <= 7) p = i+1;
              else if (currentPage <= 4) p = i+1;
              else if (currentPage >= totalPages-3) p = totalPages-6+i;
              else p = currentPage-3+i;
              return (
                <button key={p} onClick={() => setCurrentPage(p)}
                  style={{ background: currentPage===p?"#f0c000":"#1e2330", border:"none", color: currentPage===p?"#0d0f12":"#8891a4", borderRadius:5, padding:"4px 10px", cursor:"pointer", fontSize:12, fontWeight: currentPage===p?800:400, minWidth:32 }}>
                  {p}
                </button>
              );
            })}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages,p+1))} disabled={currentPage===totalPages}
              style={{ background:"#1e2330", border:"none", color: currentPage===totalPages?"#3a4255":"#e8eaf0", borderRadius:5, padding:"4px 10px", cursor: currentPage===totalPages?"default":"pointer", fontSize:12 }}>
              下頁 ›
            </button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage===totalPages}
              style={{ background:"#1e2330", border:"none", color: currentPage===totalPages?"#3a4255":"#e8eaf0", borderRadius:5, padding:"4px 10px", cursor: currentPage===totalPages?"default":"pointer", fontSize:12 }}>
              »
            </button>
          </div>
        )}
      </div>

      {/* CF Table */}
      {loading ? (
        <div style={{ textAlign:"center", padding:40, color:"#555d6e" }}>
          <div style={{ fontSize:24, marginBottom:8 }}>⏳</div>載入發票中...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:40, color:"#555d6e" }}>
          <div style={{ fontSize:32, marginBottom:8 }}>🔍</div>搵唔到符合條件的發票
        </div>
      ) : (
        <div className="card" style={{ padding:0, overflow:"hidden" }}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ background:"#13161c", borderBottom:"2px solid #1e2330" }}>
                  {["✅ 收款","CF 號碼","EC 工程名稱","發票金額","完成 %","工程描述","操作"].map(h => (
                    <th key={h} style={{ padding:"10px 12px", textAlign:"left", fontSize:10, color:"#3a4255", textTransform:"uppercase", letterSpacing:0.8, whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((item, idx) => {
                    const daysLeft = item.endDate ? Math.ceil((new Date(item.endDate) - new Date()) / 86400000) : null;
                    const isNearDeadline = daysLeft !== null && daysLeft >= 0 && daysLeft <= 10;
                    const isOverdue = daysLeft !== null && daysLeft < 0;
                    return (
                  <tr key={item.id} style={{ borderBottom:"1px solid #0d0f12", background: isNearDeadline ? "rgba(239,68,68,0.04)" : item.status === "paid" ? "rgba(34,197,94,0.04)" : idx%2===0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                    {/* Paid checkbox */}
                    <td style={{ padding:"10px 12px", textAlign:"center" }}>
                      <input type="checkbox" checked={item.status === "paid"} onChange={() => togglePaid(item)}
                        style={{ width:16, height:16, accentColor:"#22c55e", cursor:"pointer" }} />
                    </td>
                    {/* CF No */}
                    <td style={{ padding:"10px 12px", whiteSpace:"nowrap" }}>
                      <span style={{ background: item.status==="paid" ? "#1a2e1a" : "#1a1f2e", color: item.status==="paid" ? "#22c55e" : "#f0c000", borderRadius:5, padding:"3px 9px", fontFamily:"'Barlow Condensed'", fontWeight:800, fontSize:13 }}>
                        {item.cfNo}
                      </span>
                    </td>
                    {/* EC Name */}
                    <td style={{ padding:"10px 12px", maxWidth:220 }}>
                      <div style={{ fontSize:12, color:"#e8eaf0", lineHeight:1.4 }}>{item.ecName}</div>
                    </td>
                    {/* Amount */}
                    <td style={{ padding:"10px 12px", whiteSpace:"nowrap" }}>
                      <div style={{ fontFamily:"'Barlow Condensed'", fontWeight:700, fontSize:15, color: item.status==="paid" ? "#22c55e" : "#f0c000" }}>
                        {item.amount > 0 ? `HK$${Number(item.amount).toLocaleString()}` : "—"}
                      </div>
                    </td>
                    {/* % */}
                    <td style={{ padding:"10px 12px", color:"#9aa0b4", whiteSpace:"nowrap" }}>
                      {item.pct ? `${item.pct}%` : "—"}
                    </td>
                    {/* Dates */}
                    <td style={{ padding:"10px 12px", whiteSpace:"nowrap", minWidth:130 }}>
                      {item.startDate || item.endDate ? (
                        <div style={{ fontSize:11, lineHeight:1.8 }}>
                          {item.startDate && <div style={{ color:"#8891a4" }}>▶ {item.startDate}</div>}
                          {item.endDate && (
                            <div style={{ color: isOverdue ? "#EF4444" : isNearDeadline ? "#f0c000" : "#8891a4", fontWeight: isNearDeadline||isOverdue ? 700 : 400 }}>
                              ■ {item.endDate}
                              {isNearDeadline && <span style={{ marginLeft:4, color:"#EF4444" }}>({daysLeft}日)</span>}
                              {isOverdue && <span style={{ marginLeft:4, color:"#EF4444" }}>超期!</span>}
                            </div>
                          )}
                        </div>
                      ) : <span style={{ color:"#3a4255" }}>—</span>}
                    </td>
                    {/* Actions */}
                    <td style={{ padding:"10px 12px", whiteSpace:"nowrap" }}>
                      <div style={{ display:"flex", gap:4 }}>
                        <button onClick={() => generateInvoicePDF(item)}
                          style={{ background:"none", border:"1px solid #2a3045", color:"#60a5fa", borderRadius:5, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>
                          🖨️ PDF
                        </button>
                        {isNearDeadline && (
                          <button onClick={() => sendDeadlineWhatsApp(item)}
                            style={{ background:"#25D366", border:"none", color:"#fff", borderRadius:5, padding:"4px 8px", fontSize:11, cursor:"pointer" }}>
                            📱
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Footer: totals + bottom pagination */}
          <div style={{ borderTop:"1px solid #1e2330", background:"#13161c" }}>
            <div style={{ display:"flex", gap:24, padding:"10px 16px", borderBottom:"1px solid #1e2330" }}>
              <div><span style={{ fontSize:10, color:"#3a4255" }}>篩選總額</span> <span style={{ fontFamily:"'Barlow Condensed'", fontWeight:700, color:"#e8eaf0", marginLeft:6 }}>HK${totalAmt.toLocaleString()}</span></div>
              <div><span style={{ fontSize:10, color:"#3a4255" }}>已收款</span> <span style={{ fontFamily:"'Barlow Condensed'", fontWeight:700, color:"#22c55e", marginLeft:6 }}>HK${paidAmt.toLocaleString()}</span></div>
              <div><span style={{ fontSize:10, color:"#3a4255" }}>待收款</span> <span style={{ fontFamily:"'Barlow Condensed'", fontWeight:700, color:"#d63030", marginLeft:6 }}>HK${unpaidAmt.toLocaleString()}</span></div>
            </div>
            {/* Bottom pagination */}
            {totalPages > 1 && (
              <div style={{ display:"flex", justifyContent:"center", gap:4, padding:"10px 16px" }}>
                <button onClick={() => setCurrentPage(1)} disabled={currentPage===1}
                  style={{ background:"#1e2330", border:"none", color: currentPage===1?"#3a4255":"#e8eaf0", borderRadius:5, padding:"6px 12px", cursor: currentPage===1?"default":"pointer", fontSize:12 }}>«</button>
                <button onClick={() => setCurrentPage(p => Math.max(1,p-1))} disabled={currentPage===1}
                  style={{ background:"#1e2330", border:"none", color: currentPage===1?"#3a4255":"#e8eaf0", borderRadius:5, padding:"6px 12px", cursor: currentPage===1?"default":"pointer", fontSize:12 }}>‹ 上頁</button>
                <span style={{ padding:"6px 14px", fontSize:12, color:"#8891a4" }}>
                  第 <strong style={{ color:"#f0c000" }}>{currentPage}</strong> / {totalPages} 頁
                </span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages,p+1))} disabled={currentPage===totalPages}
                  style={{ background:"#1e2330", border:"none", color: currentPage===totalPages?"#3a4255":"#e8eaf0", borderRadius:5, padding:"6px 12px", cursor: currentPage===totalPages?"default":"pointer", fontSize:12 }}>下頁 ›</button>
                <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage===totalPages}
                  style={{ background:"#1e2330", border:"none", color: currentPage===totalPages?"#3a4255":"#e8eaf0", borderRadius:5, padding:"6px 12px", cursor: currentPage===totalPages?"default":"pointer", fontSize:12 }}>»</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


// ── Employee Docs ─────────────────────────────────────────────────────────────
function EmployeeDocs({ showToast, employees = [] }) {
  const [selEmp, setSelEmp] = useState(null);
  const [docs, setDocs] = useState({}); // { empId: [{type, name, url, date}] }
  const [loading, setLoading] = useState(false);

  const DOC_TYPES = [
    { id: "green_card", label: "綠卡（電梯工程安全訓練）", icon: "🟢", required: true },
    { id: "id_card",    label: "香港身份證",               icon: "🪪", required: true },
    { id: "address",    label: "住址證明",                 icon: "🏠", required: true },
    { id: "medical",    label: "體格檢查證明",             icon: "🏥", required: false },
    { id: "cert",       label: "其他專業資格證書",         icon: "📜", required: false },
  ];

  const allEmps = employees.length > 0 ? employees : [
    { id:1, name:"姚奇敏", color:"#FF6B1A" },
    { id:2, name:"李國森", color:"#22C55E" },
    { id:3, name:"賴偉志", color:"#60A5FA" },
  ];

  const loadDocs = async (emp) => {
    setSelEmp(emp);
    if (docs[emp.id]) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/employee_docs?employee_id=eq.${emp.id}&order=created_at.desc`,
        { headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` } }
      );
      const data = await res.json();
      setDocs(prev => ({ ...prev, [emp.id]: data }));
    } catch(e) {
      setDocs(prev => ({ ...prev, [emp.id]: [] }));
    }
    setLoading(false);
  };

  const handleUpload = async (empId, docType, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result;
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/employee_docs`, {
          method: "POST",
          headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=representation" },
          body: JSON.stringify({
            employee_id: empId,
            doc_type: docType,
            file_name: file.name,
            file_data: base64,
            file_size: file.size,
            uploaded_at: new Date().toISOString()
          })
        });
        const [saved] = await res.json();
        setDocs(prev => ({ ...prev, [empId]: [...(prev[empId] || []), saved] }));
        showToast(`✅ ${file.name} 上傳成功！`);
      } catch(e) {
        showToast("❌ 上傳失敗", "error");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleExportPDF = (emp) => {
    const empDocs = docs[emp.id] || [];
    const w = window.open("", "_blank");
    const today = new Date().toLocaleDateString("zh-HK");
    const rows = DOC_TYPES.map(dt => {
      const d = empDocs.find(x => x.doc_type === dt.id);
      return `<tr>
        <td>${dt.icon} ${dt.label}</td>
        <td style="color:${d?"#22c55e":"#ef4444"}">${d?"✅ 已上傳":"❌ 待補交"}</td>
        <td>${d ? new Date(d.uploaded_at).toLocaleDateString("zh-HK") : "–"}</td>
        <td>${d ? d.file_name : "–"}</td>
      </tr>`;
    }).join("");
    const imgTags = empDocs.filter(d=>d.file_data&&d.file_data.startsWith("data:image")).map(d=>
      `<div style="margin:10px 0"><div style="font-size:12px;color:#666;margin-bottom:4px">${DOC_TYPES.find(t=>t.id===d.doc_type)?.label||d.doc_type}: ${d.file_name}</div><img src="${d.file_data}" style="max-width:100%;max-height:300px;border:1px solid #ddd"/></div>`
    ).join("");
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
      body{font-family:Arial,sans-serif;padding:30px;font-size:13px}
      h2{color:#1a1a1a}table{width:100%;border-collapse:collapse;margin:16px 0}
      th{background:#1a1a1a;color:#fff;padding:8px 12px;text-align:left}
      td{padding:8px 12px;border:1px solid #ddd}
      .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:12px;border-bottom:2px solid #f0c000}
    </style></head><body>
    <div class="header"><div><h2>員工文件存檔</h2><div style="font-size:12px;color:#666">俊輝電梯工程有限公司</div></div><div style="text-align:right;font-size:12px;color:#666">列印日期：${today}</div></div>
    <div style="background:#f9f9f9;padding:12px;border-radius:6px;margin-bottom:16px">
      <div style="font-size:16px;font-weight:700">${emp.name}</div>
      <div style="font-size:12px;color:#666">${emp.role||"電梯技工"} · 手機：${emp.phone||"–"}</div>
    </div>
    <table><thead><tr><th>文件類型</th><th>狀態</th><th>上傳日期</th><th>檔案名稱</th></tr></thead><tbody>${rows}</tbody></table>
    ${imgTags ? `<h3>文件圖片</h3>${imgTags}` : ""}
    <script>window.onload=()=>{window.print()}</script></body></html>`);
    w.document.close();
  };

  return (
    <div>
      <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap" }}>
        {allEmps.map(emp => (
          <div key={emp.id} onClick={() => loadDocs(emp)}
            style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px", borderRadius:10, border:`1.5px solid ${selEmp?.id===emp.id?"#f0c000":"#1e2330"}`, background:selEmp?.id===emp.id?"#1a1f2e":"#13161c", cursor:"pointer", minWidth:160 }}>
            <div style={{ width:34, height:34, borderRadius:"50%", background:emp.color||"#f0c000", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#0d0f12", fontSize:14 }}>{emp.name[0]}</div>
            <div>
              <div style={{ fontWeight:700, fontSize:14 }}>{emp.name}</div>
              <div style={{ fontSize:11, color:"#555d6e" }}>
                {docs[emp.id] ? `${docs[emp.id].length}/${DOC_TYPES.length} 份` : "點擊查看"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selEmp && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">📁 {selEmp.name} 的文件</div>
            <button className="btn btn-primary btn-sm" onClick={() => handleExportPDF(selEmp)}>🖨️ 匯出 PDF</button>
          </div>
          <div className="card-body" style={{ padding:"12px 20px" }}>
            {loading ? (
              <div style={{ textAlign:"center", padding:24, color:"#555d6e" }}>載入中...</div>
            ) : DOC_TYPES.map(dt => {
              const existing = (docs[selEmp.id]||[]).filter(d => d.doc_type === dt.id);
              return (
                <div key={dt.id} style={{ marginBottom:16, padding:"14px 16px", background:"#0d0f12", borderRadius:10, border:"1px solid #1e2330" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <div>
                      <span style={{ fontSize:18, marginRight:8 }}>{dt.icon}</span>
                      <span style={{ fontWeight:700, fontSize:14 }}>{dt.label}</span>
                      {dt.required && <span style={{ marginLeft:8, fontSize:10, color:"#d63030", fontWeight:700 }}>必須</span>}
                    </div>
                    <span style={{ fontSize:12, color: existing.length>0?"#22c55e":"#d63030", fontWeight:700 }}>
                      {existing.length>0 ? `✅ ${existing.length} 份` : "❌ 待補交"}
                    </span>
                  </div>
                  {existing.map((d,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, padding:"6px 10px", background:"#13161c", borderRadius:6 }}>
                      <span style={{ fontSize:12, color:"#22c55e" }}>📄</span>
                      <span style={{ fontSize:12, color:"#e8eaf0", flex:1 }}>{d.file_name}</span>
                      <span style={{ fontSize:11, color:"#3a4255" }}>{d.uploaded_at ? new Date(d.uploaded_at).toLocaleDateString("zh-HK") : ""}</span>
                      {d.file_data && d.file_data.startsWith("data:image") && (
                        <a href={d.file_data} target="_blank" style={{ fontSize:11, color:"#60a5fa" }}>預覽</a>
                      )}
                    </div>
                  ))}
                  <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", marginTop:6 }}>
                    <input type="file" accept="image/*,application/pdf" style={{ display:"none" }}
                      onChange={e => e.target.files[0] && handleUpload(selEmp.id, dt.id, e.target.files[0])} />
                    <span style={{ background:"#1e2330", border:"1px dashed #2a3045", color:"#8891a4", borderRadius:6, padding:"7px 14px", fontSize:12, fontWeight:600 }}>
                      📎 上傳 / 拍照
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Staff Management ───────────────────────────────────────────────────────────
function StaffManagement({ employees, setEmployees, showToast }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name:"", role:"電梯技工", phone:"", pin:"", rate:850, color:"#f0c000" });
  const [pinVisible, setPinVisible] = useState({});

  const ROLES = ["電梯技工","技術主管","助理技工","文員","管理人員"];
  const COLORS = ["#FF6B1A","#22C55E","#60A5FA","#A78BFA","#FB923C","#F43F5E","#06B6D4","#84CC16","#E879F9","#F0C000"];

  const genPin = () => Math.floor(1000+Math.random()*9000).toString();
  const resetForm = () => setForm({ name:"", role:"電梯技工", phone:"", pin:genPin(), rate:850, color:"#f0c000" });

  useEffect(() => { if (showAdd && !editId) setForm(f => ({ ...f, pin: genPin() })); }, [showAdd]);

  const handleSave = async () => {
    if (!form.name || !form.phone) { showToast("⚠️ 請填寫姓名及電話", "error"); return; }
    if (form.pin.length !== 4 || !/^\d{4}$/.test(form.pin)) { showToast("⚠️ PIN 必須係4位數字", "error"); return; }
    try {
      if (editId) {
        await sbUpdate("employees", editId, { name:form.name, role:form.role, phone:form.phone, pin:form.pin, daily_rate:Number(form.rate), color:form.color });
        setEmployees(prev => prev.map(e => e.id===editId ? {...e, ...form, rate:Number(form.rate)} : e));
        showToast("✅ 員工資料已更新！");
      } else {
        const res = await sbInsert("employees", { name:form.name, role:form.role, phone:form.phone, pin:form.pin, daily_rate:Number(form.rate), color:form.color, site:"工地" });
        setEmployees(prev => [...prev, {...res[0], rate:res[0].daily_rate}]);
        showToast(`✅ ${form.name} 已加入！PIN: ${form.pin}`);
      }
      setShowAdd(false); setEditId(null); resetForm();
    } catch(e) { showToast("❌ 儲存失敗", "error"); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`確定刪除 ${name}？`)) return;
    try {
      await sbDelete("employees", id);
      setEmployees(prev => prev.filter(e => e.id!==id));
      showToast(`🗑️ ${name} 已移除`);
    } catch(e) { showToast("❌ 刪除失敗", "error"); }
  };

  const handleResetPin = (emp) => {
    const newPin = genPin();
    setForm({ name:emp.name, role:emp.role||"電梯技工", phone:emp.phone||"", pin:newPin, rate:emp.rate||850, color:emp.color||"#f0c000" });
    setEditId(emp.id);
    setShowAdd(true);
    showToast(`🔐 已產生新 PIN: ${newPin}，請按儲存確認`);
  };

  const empList = employees.length > 0 ? employees : [];

  return (
    <div>
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
        {[
          { label:"員工總數", value:empList.length, color:"#f0c000" },
          { label:"技術主管", value:empList.filter(e=>e.role==="技術主管").length, color:"#60a5fa" },
          { label:"電梯技工", value:empList.filter(e=>e.role==="電梯技工").length, color:"#22c55e" },
        ].map((k,i) => (
          <div key={i} style={{ background:"#13161c", border:"1px solid #1e2330", borderRadius:10, padding:"12px 16px" }}>
            <div style={{ fontSize:10, color:"#3a4255", textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>{k.label}</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:28, fontWeight:800, color:k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:12 }}>
        <button className="btn btn-primary" onClick={() => { resetForm(); setEditId(null); setShowAdd(!showAdd); }}>
          {showAdd && !editId ? "✕ 收起" : "+ 新增員工"}
        </button>
      </div>

      {/* Add/Edit form */}
      {showAdd && (
        <div style={{ background:"#13161c", border:"1px solid #f0c000", borderRadius:10, padding:16, marginBottom:16 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:16, fontWeight:700, color:"#f0c000", marginBottom:12 }}>
            {editId ? "✏️ 編輯員工" : "👷 新增員工"}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
            <div>
              <div style={{ fontSize:11, color:"#555d6e", marginBottom:4 }}>姓名 *</div>
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="form-input" placeholder="員工姓名" />
            </div>
            <div>
              <div style={{ fontSize:11, color:"#555d6e", marginBottom:4 }}>電話 *</div>
              <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="form-input" placeholder="香港手機號碼" />
            </div>
            <div>
              <div style={{ fontSize:11, color:"#555d6e", marginBottom:4 }}>職位</div>
              <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}
                style={{ width:"100%", background:"#0d0f12", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:6, padding:"8px 10px", fontSize:13 }}>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize:11, color:"#555d6e", marginBottom:4 }}>日薪 (HK$)</div>
              <input type="number" value={form.rate} onChange={e=>setForm({...form,rate:e.target.value})} className="form-input" />
            </div>
            <div>
              <div style={{ fontSize:11, color:"#555d6e", marginBottom:4 }}>登入 PIN（4位數字）</div>
              <div style={{ display:"flex", gap:6 }}>
                <input type="text" maxLength={4} value={form.pin} onChange={e=>setForm({...form,pin:e.target.value.replace(/\D/g,"")})}
                  className="form-input" placeholder="0000" style={{ flex:1, letterSpacing:4, fontWeight:800 }} />
                <button onClick={() => setForm({...form,pin:genPin()})}
                  style={{ background:"#1e2330", border:"1px solid #2a3045", color:"#f0c000", borderRadius:6, padding:"6px 12px", cursor:"pointer", fontSize:12, whiteSpace:"nowrap" }}>
                  🔀 隨機
                </button>
              </div>
              <div style={{ fontSize:10, color:"#3a4255", marginTop:4 }}>員工用呢個 PIN 登入員工 App</div>
            </div>
            <div>
              <div style={{ fontSize:11, color:"#555d6e", marginBottom:4 }}>顏色標記</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {COLORS.map(c => (
                  <div key={c} onClick={()=>setForm({...form,color:c})}
                    style={{ width:24, height:24, borderRadius:"50%", background:c, cursor:"pointer", border:form.color===c?"2px solid #fff":"2px solid transparent" }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-primary" onClick={handleSave} style={{ flex:1 }}>💾 儲存</button>
            <button className="btn btn-secondary" onClick={() => { setShowAdd(false); setEditId(null); }}>取消</button>
          </div>
        </div>
      )}

      {/* Employee list */}
      <div className="card" style={{ padding:0 }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr style={{ background:"#13161c", borderBottom:"2px solid #1e2330" }}>
              {["員工","職位","電話","日薪","PIN","操作"].map(h => (
                <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:11, color:"#3a4255", textTransform:"uppercase", letterSpacing:0.8 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {empList.map((emp, idx) => (
              <tr key={emp.id} style={{ borderBottom:"1px solid #0d0f12", background:idx%2===0?"rgba(255,255,255,0.01)":"transparent" }}>
                <td style={{ padding:"10px 14px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:emp.color||"#f0c000", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#0d0f12", fontSize:12 }}>{(emp.name||"?")[0]}</div>
                    <span style={{ fontWeight:700 }}>{emp.name}</span>
                  </div>
                </td>
                <td style={{ padding:"10px 14px", color:"#9aa0b4" }}>{emp.role||"電梯技工"}</td>
                <td style={{ padding:"10px 14px", color:"#9aa0b4" }}>{emp.phone||"–"}</td>
                <td style={{ padding:"10px 14px", color:"#f0c000", fontWeight:700 }}>HK${emp.rate||850}</td>
                <td style={{ padding:"10px 14px" }}>
                  <span style={{ background:"#1e2330", borderRadius:6, padding:"3px 10px", fontFamily:"monospace", fontSize:14, fontWeight:800, letterSpacing:2, color:"#f0c000" }}>
                    {pinVisible[emp.id] ? (emp.pin||"????") : "••••"}
                  </span>
                  <button onClick={() => setPinVisible(p=>({...p,[emp.id]:!p[emp.id]}))}
                    style={{ background:"none", border:"none", color:"#555d6e", cursor:"pointer", fontSize:12, marginLeft:4 }}>
                    {pinVisible[emp.id]?"🙈":"👁️"}
                  </button>
                </td>
                <td style={{ padding:"10px 14px" }}>
                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={() => { setForm({name:emp.name,role:emp.role||"電梯技工",phone:emp.phone||"",pin:emp.pin||"",rate:emp.rate||850,color:emp.color||"#f0c000"}); setEditId(emp.id); setShowAdd(true); }}
                      style={{ background:"#1e2330", border:"none", color:"#60a5fa", borderRadius:5, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>✏️</button>
                    <button onClick={() => handleResetPin(emp)}
                      style={{ background:"#1e2330", border:"none", color:"#f0c000", borderRadius:5, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>🔐 PIN</button>
                    <button onClick={() => handleDelete(emp.id, emp.name)}
                      style={{ background:"rgba(214,48,48,0.1)", border:"none", color:"#d63030", borderRadius:5, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
            {empList.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign:"center", padding:40, color:"#555d6e" }}>未有員工資料，請點「新增員工」</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PIN update note */}
      <div style={{ marginTop:12, background:"rgba(96,165,250,0.06)", border:"1px solid rgba(96,165,250,0.15)", borderRadius:8, padding:"12px 16px", fontSize:12, color:"#9aa0b4" }}>
        💡 員工亦可以喺 Employee App 登入後自行更改 PIN 碼
      </div>
    </div>
  );
}

// ─── HONG KONG TAX CALCULATOR (Limited Company) ────────────────────────────
// Tax rates: 2024/25 assessment year
// Profits Tax: 8.25% (first HK$2M), 16.5% (remainder) — two-tier
// Salaries Tax progressive: 2% / 6% / 10% / 14% / 17%
// MPF: employer 5%, max HK$1,500/month per employee (cap at HK$30,000/month income)

function TaxCalc({ showToast }) {
  const [tab, setTab] = useState("profits");

  // ── Profits Tax inputs ──
  const [annualRevenue, setAnnualRevenue] = useState(1200000);
  const [staffCost, setStaffCost] = useState(480000);
  const [mpfCost, setMpfCost] = useState(54000);
  const [rentUtil, setRentUtil] = useState(60000);
  const [materials, setMaterials] = useState(120000);
  const [otherExp, setOtherExp] = useState(30000);
  const [directorSalary, setDirectorSalary] = useState(240000);

  // ── MPF inputs ──
  const [empList, setEmpList] = useState([
    { name: "員工A", type: "long", monthlyIncome: 26400 },
    { name: "員工B", type: "long", monthlyIncome: 17000 },
    { name: "員工C", type: "casual", dailyIncome: 850, daysPerMonth: 18 },
  ]);

  // ── Director Salaries Tax inputs ──
  const [dirMonthly, setDirMonthly] = useState(20000);
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [children, setChildren] = useState(0);
  const [selfMpf, setSelfMpf] = useState(1500); // monthly MPF employee contribution
  const [otherAllowances, setOtherAllowances] = useState(0);

  // ─────────────────────────────────────────────
  // PROFITS TAX CALCULATION
  // ─────────────────────────────────────────────
  const totalDeductions = staffCost + mpfCost + rentUtil + materials + otherExp + directorSalary;
  const assessableProfit = Math.max(0, annualRevenue - totalDeductions);
  const profitMargin = annualRevenue > 0 ? (assessableProfit / annualRevenue) * 100 : 0;

  const calcProfitsTax = (profit) => {
    if (profit <= 0) return 0;
    if (profit <= 2000000) return profit * 0.0825;
    return 2000000 * 0.0825 + (profit - 2000000) * 0.165;
  };
  const profitsTax = calcProfitsTax(assessableProfit);
  const effectiveProfitsRate = assessableProfit > 0 ? (profitsTax / assessableProfit) * 100 : 0;

  // ─────────────────────────────────────────────
  // MPF CALCULATION
  // ─────────────────────────────────────────────
  const calcMpfMonthly = (emp) => {
    if (emp.type === "long") {
      const relevant = Math.min(Math.max(emp.monthlyIncome, 7100), 30000);
      return emp.monthlyIncome < 7100 ? 0 : Math.min(relevant * 0.05, 1500);
    } else {
      // casual: daily cap HK$1,000 relevant income
      const dailyRelevant = Math.min(emp.dailyIncome, 1000);
      const dailyMpf = dailyRelevant < 280 ? 0 : dailyRelevant * 0.05;
      return dailyMpf * (emp.daysPerMonth || 20);
    }
  };
  const mpfPerEmployee = empList.map(e => ({ ...e, monthly: calcMpfMonthly(e) }));
  const totalMpfMonthly = mpfPerEmployee.reduce((a, e) => a + e.monthly, 0);
  const totalMpfAnnual = totalMpfMonthly * 12;

  // ─────────────────────────────────────────────
  // DIRECTOR SALARIES TAX
  // ─────────────────────────────────────────────
  const dirAnnualIncome = dirMonthly * 12;
  const mpfDeduction = Math.min(selfMpf * 12, 18000); // max HK$18,000/yr deductible
  const netIncome = Math.max(0, dirAnnualIncome - mpfDeduction);

  // Allowances 2024/25
  const BASIC_ALLOWANCE = 132000;
  const MARRIED_ALLOWANCE = 264000;
  const CHILD_ALLOWANCE = 130000;
  const personalAllowance = (maritalStatus === "married" ? MARRIED_ALLOWANCE : BASIC_ALLOWANCE)
    + children * CHILD_ALLOWANCE + otherAllowances;
  const netChargeableIncome = Math.max(0, netIncome - personalAllowance);

  // Progressive tax
  const calcProgressiveTax = (nci) => {
    if (nci <= 0) return 0;
    let tax = 0;
    const bands = [50000, 50000, 50000, 50000];
    const rates = [0.02, 0.06, 0.10, 0.14];
    let remaining = nci;
    for (let i = 0; i < bands.length; i++) {
      const taxable = Math.min(remaining, bands[i]);
      tax += taxable * rates[i];
      remaining -= taxable;
      if (remaining <= 0) break;
    }
    if (remaining > 0) tax += remaining * 0.17;
    return tax;
  };
  const progressiveTax = calcProgressiveTax(netChargeableIncome);
  const standardTax = netIncome * 0.15; // standard rate on net income (no personal allowances)
  const dirSalariesTax = Math.min(progressiveTax, standardTax);
  const effectiveDirRate = dirAnnualIncome > 0 ? (dirSalariesTax / dirAnnualIncome) * 100 : 0;
  const dirNetTakeHome = dirAnnualIncome - dirSalariesTax - mpfDeduction;

  // ─────────────────────────────────────────────
  // TOTAL ANNUAL TAX BURDEN
  // ─────────────────────────────────────────────
  const totalAnnualTax = profitsTax + dirSalariesTax + totalMpfAnnual;
  const marginColor = (v, good, warn) => v <= good ? "#22c55e" : v <= warn ? "#f0c000" : "#d63030";

  const TABS = [
    { id: "profits", label: "利得稅", icon: "🏢" },
    { id: "mpf", label: "MPF 僱主供款", icon: "👷" },
    { id: "director", label: "董事薪俸稅", icon: "👔" },
    { id: "summary", label: "總稅務負擔", icon: "📊" },
  ];

  const FmtHKD = ({ v, color }) => (
    <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 18, fontWeight: 700, color: color || "#f0c000" }}>
      HK${Math.round(v).toLocaleString()}
    </span>
  );

  const InfoRow = ({ label, value, color, sub }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1e2330" }}>
      <div>
        <div style={{ fontSize: 13, color: "#9aa0b4" }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: "#3a4255", marginTop: 2 }}>{sub}</div>}
      </div>
      <FmtHKD v={value} color={color} />
    </div>
  );

  const ConceptBox = ({ icon, title, children }) => (
    <div style={{ background: "rgba(96,165,250,0.05)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: 8, padding: "14px 16px", marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", marginBottom: 8 }}>{icon} {title}</div>
      <div style={{ fontSize: 12, color: "#9aa0b4", lineHeight: 1.75 }}>{children}</div>
    </div>
  );

  const NumInput = ({ label, value, onChange, prefix = "HK$", note }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 13, color: "#555d6e", flexShrink: 0 }}>{prefix}</span>
        <input className="form-input" type="number" value={value} onChange={e => onChange(Number(e.target.value))} style={{ flex: 1 }} />
      </div>
      {note && <div style={{ fontSize: 11, color: "#3a4255", marginTop: 4 }}>{note}</div>}
    </div>
  );

  return (
    <div>
      {/* Disclaimer */}
      <div style={{ background: "rgba(250,204,21,0.06)", border: "1px solid rgba(250,204,21,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#9a8a50", display: "flex", gap: 8 }}>
        <span>⚠️</span>
        <span>以下數據僅供估算參考，不構成專業稅務意見。實際稅款請諮詢持牌會計師或稅務局。</span>
      </div>

      {/* Annual snapshot KPIs */}
      <div className="kpi-row" style={{ marginBottom: 20 }}>
        {[
          { label: "年度利得稅（估算）", value: `HK$${Math.round(profitsTax).toLocaleString()}`, sub: `有效稅率 ${effectiveProfitsRate.toFixed(1)}%`, accent: "#f0c000" },
          { label: "MPF 僱主供款（年）", value: `HK$${Math.round(totalMpfAnnual).toLocaleString()}`, sub: `月均 HK$${Math.round(totalMpfMonthly).toLocaleString()}`, accent: "#60a5fa" },
          { label: "董事薪俸稅（年）", value: `HK$${Math.round(dirSalariesTax).toLocaleString()}`, sub: `有效稅率 ${effectiveDirRate.toFixed(1)}%`, accent: "#a78bfa" },
          { label: "總稅務負擔", value: `HK$${Math.round(totalAnnualTax).toLocaleString()}`, sub: "利得稅 + MPF + 薪俸稅", accent: "#d63030" },
        ].map((k, i) => (
          <div key={i} className="kpi-card" style={{ "--accent": k.accent }}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ fontSize: 18 }}>{k.value}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="sub-tabs" style={{ marginBottom: 20 }}>
        {TABS.map(t => (
          <div key={t.id} className={`sub-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            {t.icon} {t.label}
          </div>
        ))}
      </div>

      {/* ── TAB: PROFITS TAX ── */}
      {tab === "profits" && (
        <div>
          <ConceptBox icon="💡" title="咩係利得稅（Profits Tax）？">
            有限公司喺香港賺到的<strong style={{color:"#c8d0e0"}}>應課稅利潤</strong>需要交利得稅。
            重點：係交<strong style={{color:"#c8d0e0"}}>利潤</strong>，唔係交營業額。
            收入扣除所有認可業務開支（員工薪酬、MPF、租金、材料等）之後先係利潤。<br/><br/>
            <strong style={{color:"#c8d0e0"}}>2024/25 兩級制稅率：</strong><br/>
            首 HK$2,000,000 利潤 → 8.25%<br/>
            超出 HK$2,000,000 部分 → 16.5%
          </ConceptBox>

          <div className="grid-2">
            <div className="sign-card" style={{ marginBottom: 0 }}>
              <div className="sign-title">📥 收入及開支輸入</div>
              <NumInput label="全年營業額（工程收入）" value={annualRevenue} onChange={setAnnualRevenue} note="所有工程項目合約收入總和" />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#3a4255", margin: "12px 0 8px" }}>可扣除開支</div>
              <NumInput label="員工薪酬（散工 + 長工）" value={staffCost} onChange={setStaffCost} />
              <NumInput label="MPF 僱主供款" value={mpfCost} onChange={setMpfCost} note="建議從左側MPF計算器取數" />
              <NumInput label="租金 / 水電 / 辦公室" value={rentUtil} onChange={setRentUtil} />
              <NumInput label="材料及零件採購" value={materials} onChange={setMaterials} />
              <NumInput label="董事薪酬（你自己）" value={directorSalary} onChange={setDirectorSalary} note="支付給自己的薪酬可扣減公司利潤稅，但你個人要另交薪俸稅" />
              <NumInput label="其他業務開支" value={otherExp} onChange={setOtherExp} note="交通、工具、保險等" />
            </div>

            <div>
              <div className="card" style={{ marginBottom: 14 }}>
                <div className="card-header"><div className="card-title">利得稅計算結果</div></div>
                <div className="card-body">
                  <InfoRow label="全年營業額" value={annualRevenue} color="#e8eaf0" />
                  <InfoRow label="總可扣除開支" value={totalDeductions} color="#d63030" />
                  <div style={{ borderTop: "2px solid #2a3040", margin: "8px 0" }} />
                  <InfoRow label="應課稅利潤" value={assessableProfit} color="#f0c000"
                    sub={`利潤率 ${profitMargin.toFixed(1)}%`} />

                  <div style={{ background: "#0d0f12", borderRadius: 8, padding: "14px", marginTop: 14 }}>
                    <div style={{ fontSize: 11, color: "#3a4255", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>稅款計算明細</div>
                    {assessableProfit <= 2000000 ? (
                      <div style={{ fontSize: 13, color: "#9aa0b4" }}>
                        HK${Math.min(assessableProfit, 2000000).toLocaleString()} × 8.25% =
                        <span style={{ color: "#f0c000", fontWeight: 700, fontFamily: "'Barlow Condensed'", fontSize: 16 }}> HK${Math.round(assessableProfit * 0.0825).toLocaleString()}</span>
                      </div>
                    ) : (
                      <>
                        <div style={{ fontSize: 13, color: "#9aa0b4", marginBottom: 6 }}>
                          首 HK$2,000,000 × 8.25% = HK${(2000000 * 0.0825).toLocaleString()}
                        </div>
                        <div style={{ fontSize: 13, color: "#9aa0b4" }}>
                          餘 HK${(assessableProfit - 2000000).toLocaleString()} × 16.5% = HK${Math.round((assessableProfit - 2000000) * 0.165).toLocaleString()}
                        </div>
                      </>
                    )}
                    <div style={{ borderTop: "1px solid #1e2330", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#e8eaf0" }}>估算應交利得稅</span>
                      <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 24, fontWeight: 800, color: "#d63030" }}>
                        HK${Math.round(profitsTax).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "#555d6e", marginTop: 6 }}>
                      有效稅率：{effectiveProfitsRate.toFixed(2)}% &nbsp;·&nbsp; 稅後利潤：HK${Math.round(assessableProfit - profitsTax).toLocaleString()}
                    </div>
                  </div>

                  <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 8, padding: "12px 14px", marginTop: 12 }}>
                    <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 700, marginBottom: 4 }}>💡 節稅提示</div>
                    <div style={{ fontSize: 12, color: "#9aa0b4", lineHeight: 1.7 }}>
                      • 所有業務相關開支要<strong style={{color:"#c8d0e0"}}>保留收據</strong>，方可申請扣稅<br/>
                      • 購買工具設備可申請<strong style={{color:"#c8d0e0"}}>折舊免稅額（Depreciation Allowance）</strong><br/>
                      • 董事薪酬增加 → 公司利潤減少 → 利得稅減少（但個人薪俸稅增加）<br/>
                      • 建議每年聘請會計師報稅，費用本身亦可扣稅
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: MPF ── */}
      {tab === "mpf" && (
        <div>
          <ConceptBox icon="💡" title="MPF 僱主強制性供款">
            作為僱主，你必須為每位員工每月供款，金額係員工「有關入息」的 <strong style={{color:"#c8d0e0"}}>5%</strong>。<br/><br/>
            <strong style={{color:"#c8d0e0"}}>長工（月薪）：</strong> 月薪 HK$7,100 以下免供，上限 HK$30,000（即最多每月供 HK$1,500）<br/>
            <strong style={{color:"#c8d0e0"}}>散工（日薪）：</strong> 日薪 HK$280 以下免供，上限 HK$1,000/天（即最多每天供 HK$50）<br/><br/>
            MPF 供款係公司合法開支，可抵扣利得稅。
          </ConceptBox>

          <div className="card">
            <div className="card-header">
              <div className="card-title">僱主 MPF 供款明細（月）</div>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 16, fontWeight: 700, color: "#60a5fa" }}>
                月供 HK${Math.round(totalMpfMonthly).toLocaleString()}
              </div>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>員工</th><th>類型</th><th>月入 / 日薪</th>
                    <th>有關入息</th><th>僱主供款（月）</th><th>年度供款</th>
                  </tr>
                </thead>
                <tbody>
                  {mpfPerEmployee.map((e, i) => {
                    const relevant = e.type === "long"
                      ? `HK$${Math.min(Math.max(e.monthlyIncome, 7100), 30000).toLocaleString()}`
                      : `HK$${Math.min(e.dailyIncome, 1000)}/天`;
                    const isExempt = e.type === "long" ? e.monthlyIncome < 7100 : e.dailyIncome < 280;
                    return (
                      <tr key={i}>
                        <td className="td-name">{e.name}</td>
                        <td><span className={`badge ${e.type === "long" ? "green" : "blue"}`}>
                          <span className="badge-dot" />{e.type === "long" ? "長工" : "散工"}
                        </span></td>
                        <td>{e.type === "long" ? `HK$${e.monthlyIncome.toLocaleString()}/月` : `HK$${e.dailyIncome}/天 × ${e.daysPerMonth}天`}</td>
                        <td style={{ fontSize: 12, color: "#9aa0b4" }}>{isExempt ? <span style={{ color: "#555d6e" }}>免供</span> : relevant}</td>
                        <td style={{ color: "#60a5fa", fontFamily: "'Barlow Condensed'", fontSize: 16, fontWeight: 700 }}>
                          {isExempt ? "–" : `HK$${Math.round(e.monthly).toLocaleString()}`}
                        </td>
                        <td style={{ color: "#9aa0b4" }}>
                          {isExempt ? "–" : `HK$${Math.round(e.monthly * 12).toLocaleString()}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ padding: "14px 20px", background: "#0d0f12", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#e8eaf0" }}>全年僱主 MPF 總供款</div>
                  <div style={{ fontSize: 11, color: "#555d6e", marginTop: 2 }}>可計入公司開支扣減利得稅</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 24, fontWeight: 800, color: "#60a5fa" }}>
                    HK${Math.round(totalMpfAnnual).toLocaleString()}
                  </div>
                  <div style={{ fontSize: 11, color: "#555d6e" }}>月均 HK${Math.round(totalMpfMonthly).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 8, padding: "14px 16px", marginTop: 4 }}>
            <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 700, marginBottom: 6 }}>📋 老闆要記住的事</div>
            <div style={{ fontSize: 12, color: "#9aa0b4", lineHeight: 1.75 }}>
              • 每月 <strong style={{color:"#c8d0e0"}}>10號前</strong> 必須完成當月供款，逾期罰款<br/>
              • 散工每次出糧後 <strong style={{color:"#c8d0e0"}}>10個工作天內</strong> 供款<br/>
              • 員工離職時需於 <strong style={{color:"#c8d0e0"}}>30天內</strong> 完成最後供款<br/>
              • 建議用 <strong style={{color:"#c8d0e0"}}>eMPF 平台</strong>（政府網站）管理，可設定自動扣數
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: DIRECTOR SALARIES TAX ── */}
      {tab === "director" && (
        <div>
          <ConceptBox icon="💡" title="董事薪俸稅 — 你自己的稅">
            你從公司支取的<strong style={{color:"#c8d0e0"}}>董事薪酬</strong>需要個人報薪俸稅。
            稅款係按<strong style={{color:"#c8d0e0"}}>累進稅率</strong>或<strong style={{color:"#c8d0e0"}}>標準稅率 15%</strong>計算，取兩者較低。
            供 MPF 的員工部分（每年最多 HK$18,000）可扣稅。
          </ConceptBox>

          <div className="grid-2">
            <div className="sign-card" style={{ marginBottom: 0 }}>
              <div className="sign-title">👔 董事薪酬設定</div>
              <div className="form-group">
                <label className="form-label">每月薪酬（HK$）</label>
                <input className="form-input" type="number" value={dirMonthly}
                  onChange={e => setDirMonthly(Number(e.target.value))}
                  style={{ fontSize: 20, fontFamily: "'Barlow Condensed'", fontWeight: 700, color: "#f0c000" }} />
                <div style={{ fontSize: 11, color: "#3a4255", marginTop: 4 }}>年薪：HK${(dirMonthly * 12).toLocaleString()}</div>
              </div>

              <div className="form-group">
                <label className="form-label">婚姻狀況</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[{ v: "single", l: "單身" }, { v: "married", l: "已婚" }].map(o => (
                    <button key={o.v}
                      className={`btn btn-sm ${maritalStatus === o.v ? "btn-primary" : "btn-secondary"}`}
                      style={{ flex: 1 }} onClick={() => setMaritalStatus(o.v)}>
                      {o.l}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#3a4255", marginTop: 4 }}>
                  免稅額：HK${(maritalStatus === "married" ? 264000 : 132000).toLocaleString()}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">子女數目（每名免稅額 HK$130,000）</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[0, 1, 2, 3, 4].map(n => (
                    <button key={n} className={`btn btn-sm ${children === n ? "btn-primary" : "btn-secondary"}`}
                      style={{ flex: 1 }} onClick={() => setChildren(n)}>{n}</button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">自己每月 MPF 供款（員工部分）</label>
                <input className="form-input" type="number" value={selfMpf}
                  onChange={e => setSelfMpf(Number(e.target.value))} />
                <div style={{ fontSize: 11, color: "#3a4255", marginTop: 4 }}>
                  每年最多扣 HK$18,000 MPF 免稅
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><div className="card-title">薪俸稅計算結果</div></div>
              <div className="card-body">
                <InfoRow label="年薪" value={dirMonthly * 12} color="#e8eaf0" />
                <InfoRow label="MPF 扣減" value={mpfDeduction} color="#22c55e"
                  sub={`上限 HK$18,000/年`} />
                <InfoRow label="應課薪俸入息" value={netIncome} color="#f0c000" />
                <InfoRow label="個人免稅額"
                  value={personalAllowance}
                  color="#22c55e"
                  sub={`${maritalStatus === "married" ? "已婚" : "單身"}免稅額 + ${children}名子女`} />
                <InfoRow label="應課稅入息淨額" value={netChargeableIncome} color="#f0c000" />

                <div style={{ background: "#0d0f12", borderRadius: 8, padding: "14px", marginTop: 14 }}>
                  <div style={{ fontSize: 11, color: "#3a4255", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>計算方法對比（取較低者）</div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <div style={{
                      flex: 1, background: progressiveTax <= standardTax ? "rgba(34,197,94,0.08)" : "#131618",
                      border: `1px solid ${progressiveTax <= standardTax ? "rgba(34,197,94,0.3)" : "#1e2330"}`,
                      borderRadius: 8, padding: "10px 12px", textAlign: "center"
                    }}>
                      <div style={{ fontSize: 10, color: "#555d6e", marginBottom: 4 }}>累進稅率計算</div>
                      <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 700, color: progressiveTax <= standardTax ? "#22c55e" : "#9aa0b4" }}>
                        HK${Math.round(progressiveTax).toLocaleString()}
                      </div>
                      {progressiveTax <= standardTax && <div style={{ fontSize: 10, color: "#22c55e", marginTop: 3 }}>✓ 採用此方法</div>}
                    </div>
                    <div style={{
                      flex: 1, background: standardTax < progressiveTax ? "rgba(34,197,94,0.08)" : "#131618",
                      border: `1px solid ${standardTax < progressiveTax ? "rgba(34,197,94,0.3)" : "#1e2330"}`,
                      borderRadius: 8, padding: "10px 12px", textAlign: "center"
                    }}>
                      <div style={{ fontSize: 10, color: "#555d6e", marginBottom: 4 }}>標準稅率 15%</div>
                      <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 700, color: standardTax < progressiveTax ? "#22c55e" : "#9aa0b4" }}>
                        HK${Math.round(standardTax).toLocaleString()}
                      </div>
                      {standardTax < progressiveTax && <div style={{ fontSize: 10, color: "#22c55e", marginTop: 3 }}>✓ 採用此方法</div>}
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid #1e2330", paddingTop: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#e8eaf0" }}>估算薪俸稅（年）</span>
                      <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 24, fontWeight: 800, color: "#d63030" }}>
                        HK${Math.round(dirSalariesTax).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "#9aa0b4" }}>實際到手（年）</span>
                      <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 18, fontWeight: 700, color: "#22c55e" }}>
                        HK${Math.round(dirNetTakeHome).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "#555d6e", marginTop: 4 }}>
                      有效稅率：{effectiveDirRate.toFixed(2)}% &nbsp;·&nbsp; 月均到手：HK${Math.round(dirNetTakeHome / 12).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: SUMMARY ── */}
      {tab === "summary" && (
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div className="card-title">📊 全年稅務總負擔</div>
              <span className="badge red"><span className="badge-dot" />估算</span>
            </div>
            <div className="card-body">
              {[
                { label: "🏢 公司利得稅", value: profitsTax, sub: `應課稅利潤 HK$${Math.round(assessableProfit).toLocaleString()} × ${effectiveProfitsRate.toFixed(1)}%`, color: "#f0c000" },
                { label: "👷 MPF 僱主供款（年）", value: totalMpfAnnual, sub: `${empList.length} 名員工，月均 HK$${Math.round(totalMpfMonthly).toLocaleString()}`, color: "#60a5fa" },
                { label: "👔 董事薪俸稅", value: dirSalariesTax, sub: `董事年薪 HK$${(dirMonthly * 12).toLocaleString()}，有效稅率 ${effectiveDirRate.toFixed(1)}%`, color: "#a78bfa" },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#c8d0e0" }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: "#555d6e", marginTop: 2 }}>{item.sub}</div>
                    </div>
                    <FmtHKD v={item.value} color={item.color} />
                  </div>
                  <div className="progress-bar-bg" style={{ height: 6 }}>
                    <div style={{ width: `${totalAnnualTax > 0 ? (item.value / totalAnnualTax) * 100 : 0}%`, height: "100%", borderRadius: 4, background: item.color, transition: "width 0.5s ease" }} />
                  </div>
                </div>
              ))}

              <div style={{ borderTop: "2px solid #2a3040", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#e8eaf0" }}>全年總稅務支出</div>
                  <div style={{ fontSize: 11, color: "#555d6e", marginTop: 2 }}>佔年度營業額 {annualRevenue > 0 ? ((totalAnnualTax / annualRevenue) * 100).toFixed(1) : 0}%</div>
                </div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 32, fontWeight: 800, color: "#d63030" }}>
                  HK${Math.round(totalAnnualTax).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-header"><div className="card-title">💰 現金流影響</div></div>
              <div className="card-body">
                {[
                  { label: "全年營業額", value: annualRevenue, color: "#e8eaf0" },
                  { label: "總開支（含稅前）", value: totalDeductions, color: "#d63030" },
                  { label: "利得稅", value: profitsTax, color: "#d63030" },
                  { label: "MPF 僱主供款", value: totalMpfAnnual, color: "#d63030" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1e2330" }}>
                    <span style={{ fontSize: 13, color: "#9aa0b4" }}>{r.label}</span>
                    <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 15, fontWeight: 700, color: r.color }}>
                      {r.color === "#d63030" ? "–" : ""}HK${Math.round(r.value).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "2px solid #2a3040", marginTop: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#e8eaf0" }}>公司稅後淨利</span>
                  <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 800, color: "#22c55e" }}>
                    HK${Math.max(0, Math.round(annualRevenue - totalDeductions - profitsTax - totalMpfAnnual)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><div className="card-title">📅 報稅時間表</div></div>
              <div className="card-body">
                {[
                  { month: "4月", task: "稅務局發出利得稅報稅表", color: "#f0c000" },
                  { month: "6月", task: "利得稅報稅表截止期（一般）", color: "#d63030", urgent: true },
                  { month: "8月", task: "薪俸稅報稅表（董事個人）", color: "#f0c000" },
                  { month: "11月", task: "暫繳利得稅第一期繳交", color: "#60a5fa" },
                  { month: "每月10號", task: "MPF 僱主供款截止", color: "#a78bfa", urgent: true },
                  { month: "每年3月", task: "審計師完成審計（有限公司必須）", color: "#22c55e" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: i < 5 ? "1px solid #1e2330" : "none", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, color: r.color, minWidth: 60, flexShrink: 0 }}>{r.month}</span>
                    <span style={{ fontSize: 12, color: "#9aa0b4", lineHeight: 1.5 }}>
                      {r.urgent && <span style={{ color: r.color }}>⚠️ </span>}{r.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: "rgba(240,192,0,0.06)", border: "1px solid rgba(240,192,0,0.2)", borderRadius: 10, padding: "16px 20px", marginTop: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f0c000", marginBottom: 8 }}>🎯 老闆最重要的三件事</div>
            <div style={{ fontSize: 13, color: "#9aa0b4", lineHeight: 2 }}>
              <span style={{ color: "#22c55e", fontWeight: 700 }}>① 每年必須請審計師</span> — 有限公司法律規定，費用約 HK$3,000–8,000/年<br/>
              <span style={{ color: "#22c55e", fontWeight: 700 }}>② MPF 每月10號前供款</span> — 逾期最高罰款 HK$5,000 + 5%附加費<br/>
              <span style={{ color: "#22c55e", fontWeight: 700 }}>③ 所有收據保留7年</span> — 稅務局有權追查過去6個課稅年度
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SUPABASE CLIENT ────────────────────────────────────────────────────────
const SUPABASE_URL = "https://fyxvejnvzflxppqrhlzt.supabase.co";
const SUPABASE_KEY = "sb_publishable_k9GEEEmqiYnuBPFqsQuvIQ_YGjweOSh";

async function sbFetch(table, options = {}) {
  const { select = "*", filter, order, limit } = options;
  let url = `${SUPABASE_URL}/rest/v1/${table}?select=${select}`;
  if (filter) url += `&${filter}`;
  if (order) url += `&order=${order}`;
  if (limit) url += `&limit=${limit}`;
  const res = await fetch(url, {
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    }
  });
  if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
  return res.json();
}

async function sbInsert(table, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Insert error: ${res.status}`);
  return res.json();
}

async function sbUpdate(table, id, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Update error: ${res.status}`);
  return res.json();
}

async function sbDelete(table, id) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: "DELETE",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Delete error: ${res.status}`);
  return true;
}

// Map DB rows → app format
const mapProject = p => ({
  id: p.id, name: p.name, client: p.client,
  value: p.contract_value, pct: p.progress_pct, plan: p.plan_pct,
  status: p.status, phase: p.phase,
  start: p.start_date, end: p.end_date,
});
const mapEmployee = e => ({
  id: e.id, name: e.name, role: e.role, phone: e.phone,
  rate: e.daily_rate, site: e.site, color: e.color || "#f0c000",
  days: 22, signed: true, lat: "22.3193", lng: "114.1694",
});

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const [projects, setProjectsState] = useState(INITIAL_PROJECTS);
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [dbStatus, setDbStatus] = useState("loading");
  const [loadMsg, setLoadMsg] = useState("連接 Supabase...");
  const [deadlineAlerts, setDeadlineAlerts] = useState([]);

  // ── WhatsApp deadline notification via Make webhook ──
  const MAKE_WEBHOOK = "https://hook.eu2.make.com/YOUR_WEBHOOK_ID"; // 換成你嘅 Make webhook
  const BOSS_PHONE = "85254442099"; // 你的 WhatsApp 號碼（香港格式）

  const checkDeadlines = async (projList) => {
    const today = new Date();
    const alerts = [];
    for (const p of projList) {
      if (!p.end || p.phase === "completed") continue;
      const endDate = new Date(p.end);
      const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      if (daysLeft >= 0 && daysLeft <= 10) {
        alerts.push({ ...p, daysLeft });
        // Send WhatsApp via Make
        try {
          await fetch(MAKE_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: BOSS_PHONE,
              message: `⚠️ 工程完工期提醒\n工程：${p.name}\n完工日期：${p.end}\n距離完工：${daysLeft} 日\n進度：${p.pct}%\n請跟進！`
            })
          });
        } catch(e) {}
      }
    }
    setDeadlineAlerts(alerts);
    return alerts;
  };

  // ── Load real data on mount ──
  useEffect(() => {
    const load = async () => {
      try {
        setLoadMsg("載入工程項目...");
        const proj = await sbFetch("projects", { order: "created_at.asc" });
        const mapped = proj.length > 0 ? proj.map(mapProject) : INITIAL_PROJECTS;
        if (proj.length > 0) setProjectsState(mapped);

        setLoadMsg("載入員工資料...");
        const emps = await sbFetch("employees", { order: "created_at.asc" });
        if (emps.length > 0) setEmployees(emps.map(mapEmployee));

        setDbStatus("connected");
        showToast("✅ 已連接 Supabase 真實資料庫！");

        // Check deadlines after load
        const alerts = await checkDeadlines(mapped);
        if (alerts.length > 0) {
          showToast(`⚠️ ${alerts.length} 個工程即將完工，已發送 WhatsApp 通知！`, "error");
        }
      } catch (e) {
        console.error(e);
        setDbStatus("error");
        showToast("⚠️ 資料庫連接失敗，使用示範數據", "error");
      }
    };
    load();
  }, []);

  // ── Project CRUD wired to Supabase ──
  const setProjects = async (newProjects) => {
    setProjectsState(newProjects); // optimistic update
  };

  const addProjectToDB = async (proj) => {
    try {
      const row = await sbInsert("projects", {
        name: proj.name, client: proj.client,
        contract_value: proj.value, progress_pct: proj.pct,
        plan_pct: proj.plan, status: proj.status,
        phase: proj.phase, start_date: proj.start, end_date: proj.end,
      });
      const saved = mapProject(row[0]);
      setProjectsState(prev => [...prev.filter(p => p.id !== proj.id), saved]);
      return saved;
    } catch (e) { showToast("❌ 儲存失敗：" + e.message, "error"); }
  };

  const updateProjectInDB = async (proj) => {
    try {
      await sbUpdate("projects", proj.id, {
        name: proj.name, client: proj.client,
        contract_value: proj.value, progress_pct: proj.pct,
        plan_pct: proj.plan, status: proj.status,
        phase: proj.phase, start_date: proj.start, end_date: proj.end,
      });
    } catch (e) { showToast("❌ 更新失敗：" + e.message, "error"); }
  };

  const deleteProjectFromDB = async (id) => {
    try { await sbDelete("projects", id); }
    catch (e) { showToast("❌ 刪除失敗：" + e.message, "error"); }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  // Loading screen
  if (dbStatus === "loading") {
    return (
      <>
        <style>{styles}</style>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", gap: 16, background: "#0d0f12" }}>
          <div style={{ width: 48, height: 48, border: "3px solid #1e2330", borderTop: "3px solid #f0c000", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 18, fontWeight: 700, color: "#f0c000" }}>{loadMsg}</div>
          <div style={{ fontSize: 12, color: "#555d6e" }}>連接至 Supabase 資料庫</div>
        </div>
      </>
    );
  }

  const PAGE_TITLES = {
    dashboard: { icon: "⬛", title: "總覽", sub: "儀表板" },
    projects:  { icon: "🏗", title: "工程管理", sub: "新增 / 篩選 / 搜尋" },
    safety: { icon: "🛡", title: "安全條款", sub: "電子簽署" },
    attendance: { icon: "📍", title: "GPS 考勤", sub: "管理" },
    progress: { icon: "📊", title: "施工進度", sub: "回報與預警" },
    invoice: { icon: "💰", title: "自動請款", sub: "上單系統" },
    payroll: { icon: "💼", title: "薪酬核算", sub: "自動計算" },
    empdocs: { icon: "📁", title: "員工文件", sub: "綠卡 / ID / 住址證明" },
    profit: { icon: "📈", title: "報價利潤", sub: "試算工具" },
    tax: { icon: "🧾", title: "老闆稅務", sub: "計算器（香港有限公司）" },
  };

  const pt = PAGE_TITLES[active];

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="sidebar">
          <div className="logo-area">
            <div className="logo-icon">升</div>
            <div className="logo-text">電梯工程管理</div>
            <div className="logo-sub">施工現場自動化系統</div>
            {/* DB connection badge */}
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: dbStatus === "connected" ? "#22c55e" : "#d63030", boxShadow: dbStatus === "connected" ? "0 0 6px #22c55e" : "0 0 6px #d63030" }} />
              <span style={{ fontSize: 10, color: dbStatus === "connected" ? "#22c55e" : "#d63030", fontWeight: 600 }}>
                {dbStatus === "connected" ? "Supabase 已連接" : "離線模式"}
              </span>
            </div>
          </div>
          <div className="nav">
            <div className="nav-section-title">核心功能</div>
            {NAV_ITEMS.map(item => (
              <div
                key={item.id}
                className={`nav-item ${active === item.id ? "active" : ""}`}
                onClick={() => setActive(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
          <div className="sidebar-footer">
            <span className="online-dot" />
            系統運行正常 &nbsp;·&nbsp; v1.0
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <div className="page-title">
              {pt.icon} &nbsp;<span>{pt.title}</span>&nbsp;{pt.sub}
            </div>
            <div className="topbar-right">
              <div className="date-badge">{new Date().toLocaleDateString("zh-HK", { year: "numeric", month: "long", day: "numeric", weekday: "long" })}</div>
              <div className="alert-btn">
                🔔 <div className="alert-dot" />
              </div>
              <div className="avatar">Admin</div>
            </div>
          </div>

          <div className="content">
            {active === "dashboard" && <Dashboard projects={projects} setActive={setActive} employees={employees} />}
            {active === "projects"  && (
              <>
                {deadlineAlerts.length > 0 && (
                  <div style={{ background:"rgba(239,68,68,0.08)", border:"1.5px solid rgba(239,68,68,0.3)", borderRadius:10, padding:"12px 16px", marginBottom:14 }}>
                    <div style={{ fontWeight:700, color:"#ef4444", marginBottom:8, fontSize:14 }}>🔔 即將完工提醒（{deadlineAlerts.length} 個工程）</div>
                    {deadlineAlerts.map((p,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 0", borderBottom: i < deadlineAlerts.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                        <div style={{ fontSize:12, color:"#c4c9d8" }}>
                          📅 <strong style={{ color:"#e8eaf0" }}>{p.ecName||p.name}</strong>
                          {" — "}CF: {p.cfNo} — 距完工 <strong style={{ color: p.daysLeft<=3?"#ef4444":"#f0c000" }}>{p.daysLeft} 日</strong>（{p.endDate||p.end}）
                        </div>
                        <button onClick={() => { const pm = document.querySelector("[data-senddeadline='"+p.cfNo+"']"); if(pm) pm.click(); }}
                          style={{ background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", color:"#ef4444", borderRadius:6, padding:"3px 10px", fontSize:11, cursor:"pointer", whiteSpace:"nowrap", marginLeft:12 }}>
                          📲 發送通知
                        </button>
                      </div>
                    ))}
                    <div style={{ fontSize:10, color:"#3a4255", marginTop:8 }}>💡 每日自動發送 WhatsApp 通知至老闆 + 工程負責人</div>
                  </div>
                )}
                <ProjectManager projects={projects} setProjects={setProjects} showToast={showToast} onAdd={addProjectToDB} onUpdate={updateProjectInDB} onDelete={deleteProjectFromDB} dbConnected={dbStatus === "connected"} deadlineAlerts={deadlineAlerts} sendDeadlineWhatsApp={sendDeadlineWhatsApp} />
              </>
            )}
            {active === "staff"   && <StaffManagement employees={employees} setEmployees={setEmployees} showToast={showToast} />}
            {active === "empdocs" && <EmployeeDocs showToast={showToast} employees={employees} />}
            {active === "safety" && <Safety showToast={showToast} employees={employees} />}
            {active === "attendance" && <Attendance showToast={showToast} employees={employees} projects={projects} />}
            {active === "progress" && <Progress showToast={showToast} projects={projects} />}
            {active === "invoice" && <Invoice showToast={showToast} />}
            {active === "payroll" && <Payroll showToast={showToast} employees={employees} />}
            {active === "profit" && <ProfitCalc showToast={showToast} />}
            {active === "tax" && <TaxCalc showToast={showToast} />}
          </div>
        </div>
      </div>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </>
  );
}
