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
  { id: "safety", icon: "🛡", label: "安全簽署", badge: 3 },
  { id: "attendance", icon: "📍", label: "GPS 考勤管理" },
  { id: "progress", icon: "📊", label: "施工進度回報", badge: 1 },
  { id: "invoice", icon: "💰", label: "自動化請款" },
  { id: "payroll", icon: "💼", label: "薪酬核算" },
  { id: "profit", icon: "📈", label: "報價利潤試算" },
  { id: "tax", icon: "🧾", label: "老闆稅務計算" },
];

const INITIAL_PROJECTS = [
  { id: 1, name: "觀塘工業大廈 - A座",     client: "觀塘地產有限公司", value: 350000, pct: 72, plan: 75, status: "yellow", phase: "active",    start: "2025-04-01", end: "2025-09-30" },
  { id: 2, name: "旺角商業中心 - 電梯升級", client: "旺角商業管理公司", value: 520000, pct: 45, plan: 40, status: "ok",     phase: "active",    start: "2025-05-15", end: "2025-11-15" },
  { id: 3, name: "荃灣住宅項目 - B棟",      client: "荃灣業主立案法團", value: 280000, pct: 18, plan: 30, status: "low",    phase: "active",    start: "2025-06-01", end: "2025-12-31" },
  { id: 4, name: "沙田新城市廣場",           client: "新城市發展有限公司",value: 620000, pct: 90, plan: 88, status: "ok",     phase: "active",    start: "2025-02-01", end: "2025-08-31" },
  { id: 5, name: "將軍澳住宅大廈",           client: "將軍澳物業管理",   value: 180000, pct:100, plan:100, status: "ok",     phase: "completed", start: "2025-01-01", end: "2025-06-30" },
  { id: 6, name: "屯門商場翻新",             client: "屯門商場有限公司", value: 410000, pct:  0, plan:  0, status: "ok",     phase: "pending",   start: "2025-08-01", end: "2026-02-28" },
];

const EMPLOYEES = [
  { name: "陳偉明", role: "技術主管", days: 22, rate: 1200, color: "#f0c000", signed: true, lat: "22.3193", lng: "114.1694" },
  { name: "李志強", role: "電梯技工", days: 20, rate: 850, color: "#22c55e", signed: true, lat: "22.3201", lng: "114.1699" },
  { name: "黃國輝", role: "電梯技工", days: 18, rate: 850, color: "#60a5fa", signed: false, lat: "–", lng: "–" },
  { name: "張建文", role: "助理技工", days: 21, rate: 650, color: "#a78bfa", signed: true, lat: "22.3190", lng: "114.1691" },
  { name: "吳志偉", role: "助理技工", days: 19, rate: 650, color: "#fb923c", signed: true, lat: "22.3195", lng: "114.1688" },
];

const INVOICES = [
  { project: "觀塘工業大廈", trigger: "20% 進場開工", amount: "HK$70,000", status: "yellow", label: "待發送", icon: "📋" },
  { project: "旺角商業中心", trigger: "50% 主副路軌完成", amount: "HK$260,000", status: "green", label: "已發送", icon: "✅" },
  { project: "荃灣住宅項目", trigger: "20% 進場開工", amount: "HK$56,000", status: "red", label: "進度未達", icon: "⏳" },
  { project: "沙田新城市廣場", trigger: "95% EMSD 驗機完成", amount: "HK$589,000", status: "blue", label: "審批中", icon: "🔄" },
];

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
        <div style={{ fontSize: 13, color: '#9aa0b4' }}>今日日期：2025年7月15日 &nbsp;|&nbsp; 工地：觀塘工業大廈 A座</div>
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
              onClick={() => checked && showToast("✅ 簽署成功！時間戳記：2025-07-15 08:23:14", "success")}
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
                ["2025-07-15", "陳偉明", "觀塘工業大廈", "08:15:32", "iPhone 14 / GPS已確認"],
                ["2025-07-15", "李志強", "觀塘工業大廈", "08:19:44", "Samsung S24 / GPS已確認"],
                ["2025-07-14", "陳偉明", "旺角商業中心", "07:58:11", "iPhone 14 / GPS已確認"],
                ["2025-07-14", "張建文", "荃灣住宅項目", "08:30:22", "iPhone 13 / GPS已確認"],
                ["2025-07-13", "吳志偉", "觀塘工業大廈", "08:22:07", "OPPO A98 / GPS已確認"],
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

function Attendance({ showToast, employees = EMPLOYEES }) {
  const [checkedIn, setCheckedIn] = useState([true, true, false, true, true]);

  return (
    <div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">📍 即時 GPS 定位</div>
            <span className="badge green"><span className="badge-dot" /> 系統運行中</span>
          </div>
          <div className="card-body">
            <div className="gps-map-mock">
              <div className="map-grid" />
              <div className="map-circle" />
              <div className="map-dot" />
              <div className="map-label">觀塘工業大廈 A座</div>
              <div className="map-coords">22.3193°N 114.1694°E</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "#0d0f12", borderRadius: 8, padding: "10px 14px", border: "1px solid #1e2330" }}>
                <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>容許範圍半徑</div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 700, color: "#f0c000" }}>150 m</div>
              </div>
              <div style={{ background: "#0d0f12", borderRadius: 8, padding: "10px 14px", border: "1px solid #1e2330" }}>
                <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>在場人員</div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 700, color: "#22c55e" }}>4 / 5</div>
              </div>
            </div>
            <div className="alert-strip" style={{ marginBottom: 0 }}>
              <div className="alert-icon">⚠️</div>
              <div className="alert-text">黃國輝 尚未簽到，已超出上班時間 45 分鐘</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">今日考勤記錄</div>
            <div className="date-badge" style={{ fontSize: 11 }}>2025年7月15日</div>
          </div>
          <div className="card-body" style={{ padding: "12px 20px" }}>
            {EMPLOYEES.map((e, i) => (
              <div key={i} className="emp-row">
                <div className="emp-avatar" style={{ background: e.color }}>
                  {e.name[0]}
                </div>
                <div className="emp-info">
                  <div className="emp-name">{e.name}</div>
                  <div className="emp-role">
                    {checkedIn[i]
                      ? `GPS: ${e.lat}°N ${e.lng}°E`
                      : "尚未抵達工地範圍"}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  {checkedIn[i] ? (
                    <>
                      <span className="badge green"><span className="badge-dot" /> 已簽到</span>
                      <div style={{ fontSize: 10, color: "#3a4255", marginTop: 3 }}>
                        {["07:55", "08:02", "–", "08:18", "08:10"][i]}
                      </div>
                    </>
                  ) : (
                    <span className="badge red"><span className="badge-dot" /> 缺席</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 4 }}>
        <div className="card-header">
          <div className="card-title">本月出勤彙總</div>
          <div className="card-action">下載 CSV →</div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr><th>員工</th><th>職位</th><th>應出勤</th><th>實際出勤</th><th>遲到次數</th><th>早退次數</th><th>出勤率</th></tr>
            </thead>
            <tbody>
              {EMPLOYEES.map((e, i) => {
                const rate = Math.round((e.days / 23) * 100);
                return (
                  <tr key={i}>
                    <td className="td-name">
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="emp-avatar" style={{ background: e.color, width: 24, height: 24, fontSize: 10 }}>{e.name[0]}</div>
                        {e.name}
                      </div>
                    </td>
                    <td>{e.role}</td>
                    <td>23 天</td>
                    <td>{e.days} 天</td>
                    <td>{[1, 0, 3, 0, 1][i]} 次</td>
                    <td>{[0, 0, 0, 1, 0][i]} 次</td>
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

  const handleSubmit = () => {
    showToast(`📊 進度回報已提交：${projects[projectIdx]?.name} — ${pct}%`, "success");
    setNote("");
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
            <label className="form-label">選擇完工紙範本（快速套用節點）</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {[
                { label: "新版完工紙", pcts: [20,50,80,95,100] },
                { label: "舊版完工紙", pcts: [30,65,100] },
                { label: "瑪麗醫院", pcts: [20,45,70,95,100] },
              ].map((t, i) => (
                <div key={i} style={{
                  background: "#0d0f12", border: "1px solid #1e2330", borderRadius: 8,
                  padding: "8px 12px", cursor: "pointer", fontSize: 12, color: "#9aa0b4"
                }}>
                  <div style={{ fontWeight: 700, color: "#e8eaf0", marginBottom: 4 }}>{t.label}</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {t.pcts.map(p => (
                      <span key={p}
                        onClick={() => setPct(String(p))}
                        style={{
                          background: pct === String(p) ? "#f0c000" : "#1e2330",
                          color: pct === String(p) ? "#0d0f12" : "#9aa0b4",
                          borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer"
                        }}>
                        {p}%
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">今日完成進度節點</label>
            <div style={{ marginBottom: 8 }}>
              {[
                { p: "20", desc: "已進場開工及提交秤線表" },
                { p: "50", desc: "已完成外門框、門頭、地砵，主副路軌安裝及調校" },
                { p: "80", desc: "已完成機房及井道全面安裝，已拆棚交較車行慢車" },
                { p: "95", desc: "已完成 EMSD 驗機，已完成保養部驗收手尾" },
                { p: "100", desc: "已完成客戶交機時安裝手尾" },
              ].map(({ p, desc }) => (
                <div key={p}
                  onClick={() => setPct(p)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                    background: pct === p ? "rgba(240,192,0,0.08)" : "#0d0f12",
                    border: `1px solid ${pct === p ? "rgba(240,192,0,0.4)" : "#1e2330"}`,
                    borderRadius: 8, marginBottom: 6, cursor: "pointer", transition: "all 0.15s"
                  }}>
                  <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: pct === p ? "#f0c000" : "#555d6e", minWidth: 40 }}>{p}%</span>
                  <span style={{ fontSize: 12, color: pct === p ? "#c8d0e0" : "#555d6e" }}>{desc}</span>
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
            <label className="form-label">現場備注（選填）</label>
            <input
              className="form-input"
              placeholder="例如：完成機房佈線，明日繼續安裝主軌道..."
              value={note}
              onChange={e => setNote(e.target.value)}
            />
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
            <div className="card-header"><div className="card-title">回報時間軸（觀塘項目）</div></div>
            <div className="card-body">
              <div className="timeline">
                {[
                  { label: "完成主機房電源接駁", meta: "2025-07-15 17:30", pct: "72%" },
                  { label: "安裝完成 B2 至 1F 主軌道", meta: "2025-07-10 16:45", pct: "60%" },
                  { label: "完成基坑防護及底部緩衝器", meta: "2025-07-05 15:20", pct: "45%" },
                  { label: "機房混凝土澆築完成", meta: "2025-06-28 14:00", pct: "30%" },
                  { label: "15% 訂金節點達成", meta: "2025-06-20 09:00", pct: "15%" },
                ].map((t, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-line-wrap">
                      <div className={`timeline-dot ${i > 0 ? "" : ""}`} />
                      {i < 4 && <div className="timeline-connector" style={{ minHeight: 28 }} />}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-label">{t.label} <span className="timeline-pct">→ {t.pct}</span></div>
                      <div className="timeline-meta">{t.meta} &nbsp;·&nbsp; 陳偉明 回報</div>
                    </div>
                  </div>
                ))}
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
                  系統偵測：觀塘工業大廈 A座 已達「15% 訂金節點」
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
                ["觀塘工業大廈", "20% 進場開工", "2025-07-15", "HK$70,000", "yellow", "待發", "發送"],
                ["旺角商業中心", "50% 路軌完成", "2025-07-01", "HK$260,000", "green", "已收", "–"],
                ["沙田新城市廣場", "95% EMSD驗機", "2025-06-28", "HK$589,000", "blue", "審批中", "跟進"],
                ["旺角商業中心", "20% 進場開工", "2025-05-15", "HK$104,000", "green", "已收", "–"],
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
          <div className="kpi-sub">陳偉明</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#d63030" }}>
          <div className="kpi-label">缺勤警示</div>
          <div className="kpi-value"><span>1</span> 人</div>
          <div className="kpi-sub">黃國輝 — 18天</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#60a5fa" }}>
          <div className="kpi-label">發薪日</div>
          <div className="kpi-value" style={{fontSize:20}}>7 <span style={{fontSize:14}}>月 31 日</span></div>
          <div className="kpi-sub">距今 16 天</div>
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
  const [savedQuotes, setSavedQuotes] = useState([
    { name: "旺角商業中心報價", value: 350000, labour: 68000, sub: 0, over: 12000, profit: 270000 },
    { name: "荃灣住宅 B棟報價", value: 200000, labour: 38000, sub: 15000, over: 8000, profit: 139000 },
  ]);

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
function ProjectManager({ projects, setProjects, showToast, onAdd, onUpdate, onDelete, dbConnected }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);

  // New project form state
  const [form, setForm] = useState({
    name: "", client: "", value: "", start: "", end: "",
    pct: 0, plan: 0, phase: "active", status: "ok"
  });

  const PHASE_LABELS = { active: "進行中", completed: "已完成", pending: "待開工" };
  const PHASE_COLORS = { active: "green", completed: "blue", pending: "yellow" };
  const STATUS_OPTS = [
    { v: "ok",     l: "🟢 進度正常" },
    { v: "yellow", l: "🟡 輕微落後" },
    { v: "low",    l: "🔴 嚴重落後" },
  ];

  const filtered = projects.filter(p => {
    const matchPhase = filter === "all" || p.phase === filter;
    const matchSearch = p.name.includes(search) || p.client.includes(search);
    return matchPhase && matchSearch;
  });

  const totalValue = projects.reduce((a, p) => a + Number(p.value), 0);
  const activeCount = projects.filter(p => p.phase === "active").length;
  const alertCount = projects.filter(p => p.pct < p.plan && p.phase === "active").length;

  const resetForm = () => setForm({ name: "", client: "", value: "", start: "", end: "", pct: 0, plan: 0, phase: "active", status: "ok" });

  const handleAdd = async () => {
    if (!form.name || !form.client || !form.value) {
      showToast("⚠️ 請填寫工程名稱、客戶及合約金額", "error"); return;
    }
    const tempId = Date.now();
    const newP = { ...form, id: tempId, value: Number(form.value), pct: Number(form.pct), plan: Number(form.plan) };
    setProjects([...projects, newP]);
    resetForm(); setShowAdd(false);
    if (onAdd) await onAdd(newP);
    showToast(`✅ 「${form.name}」已新增並儲存至資料庫！`);
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setForm({ ...p, value: String(p.value) });
    setShowAdd(true);
  };

  const handleUpdate = async () => {
    const updated = { ...form, id: editId, value: Number(form.value), pct: Number(form.pct), plan: Number(form.plan) };
    setProjects(projects.map(p => p.id === editId ? updated : p));
    setEditId(null); resetForm(); setShowAdd(false);
    if (onUpdate) await onUpdate(updated);
    showToast("✅ 工程資料已更新並儲存至資料庫！");
  };

  const handleDelete = async (id, name) => {
    setProjects(projects.filter(p => p.id !== id));
    if (onDelete) await onDelete(id);
    showToast(`🗑️ 「${name}」已刪除`);
  };

  const F = ({ label, field, type = "text", placeholder = "" }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input className="form-input" type={type} placeholder={placeholder}
        value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} />
    </div>
  );

  return (
    <div>
      {/* KPI row */}
      <div className="kpi-row" style={{ marginBottom: 20 }}>
        <div className="kpi-card" style={{ "--accent": "#f0c000" }}>
          <div className="kpi-label">工程總數</div>
          <div className="kpi-value"><span>{projects.length}</span> 個</div>
          <div className="kpi-sub">進行中 {activeCount} 個</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#22c55e" }}>
          <div className="kpi-label">合約總額</div>
          <div className="kpi-value" style={{ fontSize: 18 }}>HK${(totalValue / 10000).toFixed(0)}萬</div>
          <div className="kpi-sub">{projects.length} 個項目</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#d63030" }}>
          <div className="kpi-label">進度預警</div>
          <div className="kpi-value"><span style={{ color: alertCount > 0 ? "#d63030" : "#22c55e" }}>{alertCount}</span> 個</div>
          <div className="kpi-sub">{alertCount > 0 ? "需要跟進" : "全部正常"}</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#a78bfa" }}>
          <div className="kpi-label">已完成工程</div>
          <div className="kpi-value"><span>{projects.filter(p => p.phase === "completed").length}</span> 個</div>
          <div className="kpi-sub">待開工 {projects.filter(p => p.phase === "pending").length} 個</div>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#555d6e" }}>🔍</span>
          <input className="form-input" placeholder="搜尋工程名稱或客戶..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36 }} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[["all","全部"], ["active","進行中"], ["pending","待開工"], ["completed","已完成"]].map(([v, l]) => (
            <button key={v} className={`btn btn-sm ${filter === v ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setFilter(v)}>{l}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => { resetForm(); setEditId(null); setShowAdd(!showAdd); }}>
          {showAdd ? "✕ 收起" : "+ 新增工程"}
        </button>
      </div>

      {/* Add / Edit form */}
      {showAdd && (
        <div className="card" style={{ marginBottom: 20, border: "1px solid rgba(240,192,0,0.3)" }}>
          <div className="card-header">
            <div className="card-title">{editId ? "✏️ 編輯工程資料" : "➕ 新增工程項目"}</div>
          </div>
          <div className="card-body">
            <div className="grid-2">
              <div>
                <F label="工程名稱 *" field="name" placeholder="例如：觀塘工業大廈 A座" />
                <F label="客戶名稱 *" field="client" placeholder="例如：觀塘地產有限公司" />
                <F label="合約金額（HK$）*" field="value" type="number" placeholder="例如：350000" />
              </div>
              <div>
                <F label="開工日期" field="start" type="date" />
                <F label="預計完工日期" field="end" type="date" />
                <div className="form-group">
                  <label className="form-label">工程狀態</label>
                  <select className="form-select" value={form.phase} onChange={e => setForm({ ...form, phase: e.target.value })}>
                    <option value="pending">待開工</option>
                    <option value="active">進行中</option>
                    <option value="completed">已完成</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">現時實際進度（%）</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <input type="range" min="0" max="100" value={form.pct}
                    onChange={e => setForm({ ...form, pct: e.target.value })}
                    style={{ flex: 1, accentColor: "#f0c000" }} />
                  <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 800, color: "#f0c000", minWidth: 40 }}>{form.pct}%</span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">計劃目標進度（%）</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <input type="range" min="0" max="100" value={form.plan}
                    onChange={e => setForm({ ...form, plan: e.target.value })}
                    style={{ flex: 1, accentColor: "#22c55e" }} />
                  <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 800, color: "#22c55e", minWidth: 40 }}>{form.plan}%</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">進度標示</label>
              <div style={{ display: "flex", gap: 8 }}>
                {STATUS_OPTS.map(o => (
                  <button key={o.v} className={`btn btn-sm ${form.status === o.v ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => setForm({ ...form, status: o.v })}>{o.l}</button>
                ))}
              </div>
            </div>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={editId ? handleUpdate : handleAdd} style={{ flex: 1 }}>
                {editId ? "💾 儲存更改" : "✅ 確認新增"}
              </button>
              <button className="btn btn-secondary" onClick={() => { setShowAdd(false); setEditId(null); resetForm(); }}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* Project list */}
      <div style={{ fontSize: 12, color: "#555d6e", marginBottom: 10 }}>
        顯示 {filtered.length} / {projects.length} 個工程項目
        {search && <span>　搜尋：「{search}」</span>}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "#555d6e", fontSize: 14 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
          搵唔到符合條件的工程，試下調整篩選或搜尋條件
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((p, i) => (
            <div key={p.id} className="card">
              <div className="card-body" style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                      <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 17, fontWeight: 800, color: "#e8eaf0" }}>{p.name}</div>
                      <span className={`badge ${PHASE_COLORS[p.phase]}`}><span className="badge-dot" />{PHASE_LABELS[p.phase]}</span>
                      {p.pct < p.plan && p.phase === "active" && (
                        <span className="badge red"><span className="badge-dot" />進度落後</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "#555d6e", marginBottom: 10 }}>
                      👤 {p.client} &nbsp;·&nbsp; 📅 {p.start} → {p.end}
                    </div>
                    <div style={{ display: "flex", gap: 20, marginBottom: 12, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>合約金額</div>
                        <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 18, fontWeight: 800, color: "#f0c000" }}>HK${Number(p.value).toLocaleString()}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>實際進度</div>
                        <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 18, fontWeight: 800, color: p.pct >= p.plan ? "#22c55e" : "#d63030" }}>{p.pct}%</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>計劃目標</div>
                        <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 18, fontWeight: 800, color: "#9aa0b4" }}>{p.plan}%</div>
                      </div>
                    </div>
                    <div className="progress-bar-bg">
                      <div className={`progress-bar-fill ${p.status}`} style={{ width: `${p.pct}%` }} />
                    </div>
                    {p.pct < p.plan && p.phase === "active" && (
                      <div style={{ fontSize: 11, color: "#d63030", marginTop: 4 }}>
                        ▼ 低於計劃 {p.plan - p.pct}%
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(p)}>✏️ 編輯</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id, p.name)}>🗑️ 刪除</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Supabase connection hint */}
      <div style={{ marginTop: 28, background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: 10, padding: "16px 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", marginBottom: 8 }}>🗄️ 連接 Supabase 後</div>
        <div style={{ fontSize: 12, color: "#9aa0b4", lineHeight: 1.75 }}>
          而家新增 / 編輯嘅工程資料係儲存係瀏覽器記憶體，重新整頁就會消失。<br/>
          完成 Supabase 連接後，所有更改會即時儲存到雲端資料庫，員工 App 同步更新。<br/>
          <span style={{ color: "#60a5fa", fontWeight: 600 }}>下方係你需要的 Supabase 代碼，設定好帳號後直接用。</span>
        </div>
        <div style={{ background: "#080A0E", borderRadius: 8, padding: "12px 14px", marginTop: 12, fontFamily: "monospace", fontSize: 11, color: "#B0B8CC", lineHeight: 1.8, overflowX: "auto" }}>
          <span style={{ color: "#546E7A" }}>{"// 1. 安裝：npm install @supabase/supabase-js"}</span><br/>
          <span style={{ color: "#546E7A" }}>{"// 2. 喺檔案頂部加入："}</span><br/>
          <span style={{ color: "#C792EA" }}>import</span> {"{ createClient }"} <span style={{ color: "#C792EA" }}>from</span> <span style={{ color: "#C3E88D" }}>'@supabase/supabase-js'</span><br/>
          <span style={{ color: "#C792EA" }}>const</span> supabase = <span style={{ color: "#82AAFF" }}>createClient</span>(<span style={{ color: "#C3E88D" }}>'你的SUPABASE_URL'</span>, <span style={{ color: "#C3E88D" }}>'你的ANON_KEY'</span>)<br/><br/>
          <span style={{ color: "#546E7A" }}>{"// 3. 讀取工程列表"}</span><br/>
          <span style={{ color: "#C792EA" }}>const</span> {"{ data }"} = <span style={{ color: "#C792EA" }}>await</span> supabase.<span style={{ color: "#82AAFF" }}>from</span>(<span style={{ color: "#C3E88D" }}>'projects'</span>).<span style={{ color: "#82AAFF" }}>select</span>(<span style={{ color: "#C3E88D" }}>'*'</span>)<br/>
          <span style={{ color: "#546E7A" }}>{"// 4. 新增工程"}</span><br/>
          <span style={{ color: "#C792EA" }}>await</span> supabase.<span style={{ color: "#82AAFF" }}>from</span>(<span style={{ color: "#C3E88D" }}>'projects'</span>).<span style={{ color: "#82AAFF" }}>insert</span>(newProject)<br/>
          <span style={{ color: "#546E7A" }}>{"// 5. 更新工程"}</span><br/>
          <span style={{ color: "#C792EA" }}>await</span> supabase.<span style={{ color: "#82AAFF" }}>from</span>(<span style={{ color: "#C3E88D" }}>'projects'</span>).<span style={{ color: "#82AAFF" }}>update</span>(changes).<span style={{ color: "#82AAFF" }}>eq</span>(<span style={{ color: "#C3E88D" }}>'id'</span>, id)
        </div>
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
    { name: "陳偉明", type: "long", monthlyIncome: 26400 },
    { name: "李志強", type: "long", monthlyIncome: 17000 },
    { name: "黃國輝", type: "casual", dailyIncome: 850, daysPerMonth: 18 },
    { name: "張建文", type: "casual", dailyIncome: 650, daysPerMonth: 21 },
    { name: "吳志偉", type: "casual", dailyIncome: 650, daysPerMonth: 19 },
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
  const [dbStatus, setDbStatus] = useState("loading"); // loading | connected | error
  const [loadMsg, setLoadMsg] = useState("連接 Supabase...");

  // ── Load real data on mount ──
  useEffect(() => {
    const load = async () => {
      try {
        setLoadMsg("載入工程項目...");
        const proj = await sbFetch("projects", { order: "created_at.asc" });
        if (proj.length > 0) setProjectsState(proj.map(mapProject));

        setLoadMsg("載入員工資料...");
        const emps = await sbFetch("employees", { order: "created_at.asc" });
        if (emps.length > 0) setEmployees(emps.map(mapEmployee));

        setDbStatus("connected");
        showToast("✅ 已連接 Supabase 真實資料庫！");
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
            {active === "projects"  && <ProjectManager projects={projects} setProjects={setProjects} showToast={showToast} onAdd={addProjectToDB} onUpdate={updateProjectInDB} onDelete={deleteProjectFromDB} dbConnected={dbStatus === "connected"} />}
            {active === "safety" && <Safety showToast={showToast} employees={employees} />}
            {active === "attendance" && <Attendance showToast={showToast} employees={employees} />}
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
