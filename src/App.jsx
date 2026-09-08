import React, { useState, useEffect } from "react";

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

  /* Mobile hamburger */
  .hamburger {
    display: none;
    position: fixed;
    top: 12px; left: 12px;
    z-index: 300;
    background: #13161c;
    border: 1px solid #2a3045;
    border-radius: 8px;
    width: 38px; height: 38px;
    align-items: center; justify-content: center;
    cursor: pointer;
    font-size: 18px;
    color: #f0c000;
  }
  .sidebar-overlay {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 199;
  }
  @media (max-width: 768px) {
    .hamburger { display: flex; }
    .sidebar {
      position: fixed !important;
      left: -240px !important;
      top: 0; bottom: 0;
      z-index: 200;
      transition: left 0.25s ease;
      width: 220px !important;
    }
    .sidebar.open {
      left: 0 !important;
      box-shadow: 4px 0 24px rgba(0,0,0,0.5);
    }
    .sidebar-overlay.open { display: block; }
    .main { padding-top: 56px !important; }
    .page-header { padding-left: 56px !important; }
    .kpi-grid { grid-template-columns: repeat(2,1fr) !important; }
  }

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
  { id: "dashboard",  icon: "⬛", label: "總覽儀表板" },
  { id: "projects",   icon: "🔧", label: "工程管理" },
  { id: "staff",      icon: "👷", label: "員工管理" },
  { id: "safety",     icon: "✅", label: "安全簽署", badge: 3 },
  { id: "attendance", icon: "📍", label: "GPS 考勤管理" },
  { id: "calendar",   icon: "📆", label: "考勤月曆" },
  { id: "company-cal", icon: "📆", label: "公司月曆" },
  { id: "qr-codes",   icon: "📲", label: "員工報更QR" },
  { id: "msg-center", icon: "✉️", label: "訊息發送中心" },
  { id: "progress",   icon: "📊", label: "施工進度回報", badge: 1 },
  { id: "invoice",    icon: "📋", label: "自動化請款" },
  { id: "payroll",    icon: "💼", label: "薪酬核算" },
  { id: "empdocs",    icon: "📁", label: "員工文件" },
  { id: "profit",     icon: "📈", label: "報價利潤試算" },
  { id: "tax",        icon: "🧾", label: "老闆稅務計算" },
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

  // Live invoice KPIs from Supabase
  const [invoiceKpi, setInvoiceKpi] = useState({ total: 0, paid: 0, unpaid: 0, paidAmt: 0, unpaidAmt: 0, ecCount: 0 });
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/invoices?select=amount,status,stage&limit=2000`,
          { headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` } }
        );
        const data = await res.json();
        if (!Array.isArray(data)) return;
        const paid = data.filter(r => r.status === "paid");
        const unpaid = data.filter(r => r.status !== "paid");
        const ecSet = new Set(data.map(r => (r.stage||"").match(/^CF\d+/)?.[0]).filter(Boolean));
        setInvoiceKpi({
          total: data.length,
          paid: paid.length,
          unpaid: unpaid.length,
          paidAmt: paid.reduce((a,r) => a + (r.amount||0), 0),
          unpaidAmt: unpaid.reduce((a,r) => a + (r.amount||0), 0),
          ecCount: ecSet.size,
        });
      } catch(e) {}
    };
    load();
  }, []);

  return (
    <div>
      <div className="kpi-row">
        <div className="kpi-card" style={{ "--accent": "#f0c000" }}>
          <div className="kpi-icon">🏗</div>
          <div className="kpi-label">CF 發票總數</div>
          <div className="kpi-value"><span>{invoiceKpi.total}</span> 張</div>
          <div className="kpi-sub">待收款 {invoiceKpi.unpaid} 張</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#22c55e" }}>
          <div className="kpi-icon">👷</div>
          <div className="kpi-label">員工人數</div>
          <div className="kpi-value"><span>{employees.length}</span> 人</div>
          <div className="kpi-sub">從 Supabase 即時載入</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#60a5fa" }}>
          <div className="kpi-icon">💰</div>
          <div className="kpi-label">待回收款項</div>
          <div className="kpi-value"><span style={{fontSize:'22px'}}>HK$</span>{invoiceKpi.unpaidAmt >= 10000 ? (invoiceKpi.unpaidAmt/10000).toFixed(0)+"萬" : invoiceKpi.unpaidAmt.toLocaleString()}</div>
          <div className="kpi-sub">{invoiceKpi.unpaid} 張請款單待發</div>
        </div>
        <div className="kpi-card" style={{ "--accent": "#a78bfa" }}>
          <div className="kpi-icon">💼</div>
          <div className="kpi-label">本月薪酬試算</div>
          <div className="kpi-value"><span style={{fontSize:'22px'}}>HK$</span>{(totalSalary/1000).toFixed(0)}K</div>
          <div className="kpi-sub">{employees.length} 名員工</div>
        </div>
      </div>

      {activeProjects.length > 0 && (
        <div className="alert-strip">
          <div className="alert-icon">⚠️</div>
          <div className="alert-text">
            <strong style={{color:'#e8a0a0'}}>進度預警：</strong>
            {activeProjects.filter(p => p.pct < p.plan).map(p => `${p.name} — 實際 ${p.pct}%，計劃 ${p.plan}%`).join('　|　')}
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

const SAFETY_TEXT = `升降機工程公司｜安全培訓及承諾書
最後更新：2026年9月2日

一、目的
為確保所有從事升降機及自動梯安裝、維修、保養、改造及相關工程之員工，正確認識並遵守香港最新之安全法例、機電署（EMSD）實務守則及公司安全管理制度，預防工業意外，保障員工、客戶及公眾安全。

二、適用範圍
本文件適用於所有涉及以下工作之員工、分判、技術員及實習人員：
• 升降機／自動梯安裝、測試及調試
• 維修、保養及故障緊急處理
• Modernisation（改造工程）
• 機房、井道、轎頂、底坑作業
• 電氣、機械相關作業
• 分判人員及訪客安全交底

三、法例、標準及實務守則
（一）香港法例
• 《升降機及自動梯條例》（Cap.618）
• 《升降機及自動梯（安全）規例》
• 《職業安全及健康條例》（Cap.509）
• 《建築地盤（安全）規例》
• 《職安健管理規例》
• 《電力條例》（Cap.406）
• 《工廠及工業經營（不安全機械）規例》
• 《危險品條例》及相關規例
• 消防處熱工／火警相關要求

（二）機電署（EMSD）實務守則與指引
• Code of Practice for Lift Works
• Code of Practice for Escalator Works
• EMSD Safety Guidelines for Lift and Escalator Works
• EMSD Accident and Incident Reporting Requirements
• RLE / RCP / REW 資格要求

（三）其他標準／文件
• 製造商／供應商操作、維修及保養手冊
• 公司安全管理制度（SOP、SMP、PTW）
• ISO 45001 職安健管理（如適用）
• 承建商安全要求（港鐵、房署、新地、會德豐等）

四、培訓內容

1）基本安全（General Safety）
• 工地出入程序、訪客管理
• 危害辨識（HAZID）與風險評估（HIRA）
• 個人防護裝備（PPE）之選擇、檢查及合規性
PPE 最低要求：安全帽、防滑鋼頭安全鞋、高可視背心、防割／電工手套、護目鏡（按工序）、聽力保護（>85dB）、全身式安全帶（高處作業）
• 上鎖／掛牌（LOTO）程序：隔離電源 → 上鎖 → 掛牌 → 雙人覆核
• 安全電壓（110V / 55V）及 RCD 使用要求
• 帶電與非帶電工作限制（非 REW 不可帶電工作）

2）升降機／自動梯專項安全
機房：出入登記、鎖匙管理、通風照明、地面防滑
井道及底坑：進入許可、通訊、通風、積水處理、氣體偵測、臨邊防護
轎頂作業：可靠站位、通訊、Fall Protection、維修模式（INS/MAINT）啟動確認、禁止帶電作業
升降機關鍵部件：導軌、鋼纜、曳引輪、對重、限速器、緩衝器、門鎖、門刀、安全回路
緊急程序：緊急停車、釋放乘客（僅授權人員）、手動盤車、現場保護

3）電氣與機械安全
• 電源隔離（LOTO）＋測試驗電
• 漏電保護器、保險絲、斷路器應用
• 移動機件夾捲危害防護
• 液壓系統放壓程序
• 油品洩漏處理及吸油棉使用

4）特殊工序與許可制度（PTW Permit-to-Work）
• 熱工處理（焊接、切割）及火警監察人
• 密閉空間作業（底坑／井道狹窄位置）
• 起重吊運、吊點驗證、索具檢查
• 高處作業（鋼絲繩／吊船／腳手架）
• 夜間／單人作業限制
• 惡劣天氣（雷暴、強風、紅黑雨）工作安排
• 高風險工序須主管批准及 PTW

5）化學與環境管理
• SDS（安全資料表）查閱及化學品分類儲存
• 廢油、廢物分類與回收
• 噪音、粉塵、照明控制
• 洩漏應變程序

6）事故與應變（符合 EMSD 要求）
• 事故、險象事故（Near Miss）即時停工上報
• 危殆事故需立即通知主管及按需通報 EMSD
• 急救、滅火器使用
• 現場保護及封鎖
• 意外調查（根因分析 RCA）
• 補救措施（Corrective & Preventive Action）
• 事故後再培訓要求

7）行為與合規要求
• 酒精與藥物政策：零容忍
• 疲勞管理制度
• 手機及分心使用禁令
• 承包商管理及訪客安全交底
• 拒絕不安全工作權利（No Reprisal）

五、培訓方式與頻率
• 新入職人員：至少 6 小時入職安全培訓
• 現職技術員／維修員：每年最少 8 小時再培訓
• 高風險工序：每 6 個月複訓
• 每日 Toolbox Talk：10–15 分鐘
• 意外或工序變更：即時專項再培訓
• 記錄保存期限：至少 5 年

六、資格與授權
• 登記升降機及自動梯工程人員（RLE）
• 註冊電工（REW）
• 僅授權人員可執行：維修模式操作、手動盤車、帶電工作、熱工、起重吊運
• 資格失效或未通過評估者不得上崗

七、個人防護裝備（PPE）最低要求
• 安全帽（須檢查有效期及撞擊痕）
• 防滑鋼包頭安全鞋
• 高可視背心或反光工作服
• 防割手套／電工手套（按工序）
• 護目鏡／面罩（切割、打磨、化學處理時）
• 聽力保護（>85 dB 環境）
• 高處作業：全身式安全帶、雙掛繩、可靠錨點

八、工具、設備與現場每日開工前檢查
• 工具、電纜、插頭、護罩狀況
• 滅火器、急救箱位置及有效期
• 井道照明及通風
• RCD 測試（按要求）
• 氣體偵測儀（進入底坑前）
• 維修模式功能測試
• 現場整潔、通道暢通
• 臨邊護欄及封鎖設施
• 發現缺陷須立即上鎖、掛牌、標示及通報

九、通訊與報告
• 緊急聯絡：主管、安健部、客戶代表、消防、救護
• 事故及不符合事項須於 2 小時內通報
• 使用指定報告表格並拍照記錄
• 危殆事故需即時通知主管，必要時通知 EMSD
• 必要時保留 CCTV 及儀器記錄

十、安全違規投訴渠道
• 如發現任何不安全工作情況，員工有權拒絕執行並即時上報
• 投訴途徑（按優先次序）：
  1. 直接向當值主管口頭或書面反映
  2. 向公司安全主任提交書面投訴（可要求保密）
  3. 向勞工處職業安全部舉報：2815 0678
  4. 向機電工程署舉報：1823
• 公司承諾：任何因合法反映安全問題而遭受打擊報復之行為，均屬嚴重違規，公司將嚴肅處理
• 所有投訴記錄保存至少 5 年

十一、員工承諾（正式條款）
本人確認：
（一）已參與上述完整安全培訓，並清楚了解及明白《升降機及自動梯條例》及相關規例之要求；
（二）明白並同意遵守公司安全管理制度（SOP、SMP、PTW）及本守則所有條款；
（三）明白工地上任何違反安全規例之行為可導致嚴重後果，包括工傷、法律責任及紀律處分；
（四）同意在發現任何不安全情況時，有責任立即停工並向主管報告，不得隱瞞；
（五）確認本人具備執行所分配工作之相關資格及牌照，並承諾在資格失效前主動通知公司；
（六）明白本承諾書之簽署屬法律文件，將作為本人已接受安全培訓之正式紀錄，有效期為六個月，屆滿須重新簽署。`;

function Safety({ showToast, employees = EMPLOYEES }) {
  const [checked, setChecked] = useState(false);
  const [safetyRecords, setSafetyRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const VALID_MONTHS = 6;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/safety_signs?select=*&order=signed_at.desc`,
          { headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` } }
        );
        const data = await res.json();
        if (Array.isArray(data)) setSafetyRecords(data);
      } catch(e) {}
      setLoadingRecords(false);
    };
    load();
  }, []);

  const getStatus = (empName) => {
    const recs = safetyRecords.filter(r => r.employee_name === empName);
    if (!recs.length) return { status: "never", label: "從未簽署", badge: "red" };
    const latest = recs.sort((a,b) => new Date(b.signed_at) - new Date(a.signed_at))[0];
    const signedDate = new Date(latest.signed_at);
    const expiryDate = new Date(signedDate);
    expiryDate.setMonth(expiryDate.getMonth() + VALID_MONTHS);
    const now = new Date();
    const daysLeft = Math.ceil((expiryDate - now) / (1000*60*60*24));
    if (daysLeft <= 0) return { status: "expired", label: "已過期", badge: "red", date: signedDate, expiry: expiryDate };
    if (daysLeft <= 30) return { status: "expiring", label: `即將到期（剩 ${daysLeft} 日）`, badge: "yellow", date: signedDate, expiry: expiryDate, daysLeft };
    return { status: "valid", label: `有效（剩 ${daysLeft} 日）`, badge: "green", date: signedDate, expiry: expiryDate, daysLeft };
  };

  const handleSign = async () => {
    if (!checked) return;
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/safety_signs`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ employee_name: "Admin", signed_at: new Date().toISOString(), valid_months: VALID_MONTHS })
      });
    } catch(e) {}
    showToast(`✅ 簽署成功！時間戳記：${new Date().toLocaleString('zh-HK')}，有效期 6 個月`, "success");
    setChecked(false);
  };

  const handleExportExcel = () => {
    const rows = [["員工姓名","簽署日期","有效至","狀態"]];
    employees.forEach(e => {
      const s = getStatus(e.name);
      rows.push([e.name, s.date ? s.date.toLocaleDateString('zh-HK') : "—", s.expiry ? s.expiry.toLocaleDateString('zh-HK') : "—", s.label]);
    });
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF"+csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "安全簽署記錄.csv"; a.click();
    showToast("✅ 已導出 Excel 格式記錄", "success");
  };

  const neverCount   = employees.filter(e => getStatus(e.name).status === "never").length;
  const expiringCount = employees.filter(e => getStatus(e.name).status === "expiring").length;
  const expiredCount  = employees.filter(e => getStatus(e.name).status === "expired").length;
  const validCount    = employees.filter(e => getStatus(e.name).status === "valid").length;

  return (
    <div>
      <div style={{ marginBottom: 16, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <div style={{ fontSize: 13, color: '#9aa0b4' }}>今日日期：{new Date().toLocaleDateString('zh-HK', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}</div>
        <div style={{ fontSize: 12, color: '#5a6070', fontStyle:"italic" }}>守則版本：2026年9月2日　有效期：簽署後 6 個月</div>
      </div>

      <div className="grid-2">
        {/* ── 左：完整守則 ── */}
        <div className="sign-card">
          <div className="sign-title">📋 電梯施工安全守則</div>
          <div className="safety-clause" style={{ maxHeight: 480, overflowY: "auto", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap", color: "#c8d0e0" }}>
            {SAFETY_TEXT}
          </div>
          <div className="sign-confirm-row" style={{ marginTop: 16 }}>
            <div className={`checkbox-custom ${checked ? "checked" : ""}`} onClick={() => setChecked(!checked)}>
              {checked && <span style={{ color: "#0d0f12", fontSize: 12, fontWeight: 700 }}>✓</span>}
            </div>
            <div className="checkbox-label">
              本人確認已詳細閱讀並理解以上安全守則全部十一條條款，並同意遵守所有規定，明白本承諾書有效期為六個月
            </div>
          </div>
          <div className="btn-row">
            <button className={`btn ${checked ? "btn-primary" : "btn-secondary"}`} onClick={handleSign}>
              ✍️ 確認簽署
            </button>
            <button className="btn btn-secondary" onClick={() => window.print()}>📄 列印守則</button>
          </div>
        </div>

        {/* ── 右：員工簽署狀態 ── */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">員工安全簽署狀態（每 6 個月）</div>
            <div className="card-action" style={{ cursor:"pointer" }} onClick={handleExportExcel}>導出 EXCEL →</div>
          </div>

          {/* KPI 行 */}
          <div style={{ display:"flex", gap:8, padding:"12px 16px 0", flexWrap:"wrap" }}>
            {[
              { label:"有效", count:validCount,    color:"#22c55e" },
              { label:"即將到期（30日內）", count:expiringCount, color:"#f0c000" },
              { label:"已過期", count:expiredCount,  color:"#e05c5c" },
              { label:"未簽署", count:neverCount,    color:"#5a6070" },
            ].map((k,i) => (
              <div key={i} style={{ flex:1, minWidth:60, background:"#1a1d24", borderRadius:8, padding:"8px 10px", textAlign:"center", border:`1px solid ${k.color}33` }}>
                <div style={{ fontSize:22, fontWeight:700, color:k.color }}>{k.count}</div>
                <div style={{ fontSize:10, color:"#9aa0b4", marginTop:2 }}>{k.label}</div>
              </div>
            ))}
          </div>

          <div className="card-body" style={{ padding: "12px 16px" }}>
            {loadingRecords ? (
              <div style={{ color:"#9aa0b4", fontSize:13, textAlign:"center", padding:20 }}>載入中...</div>
            ) : employees.map((e, i) => {
              const s = getStatus(e.name);
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:"1px solid #1e2330" }}>
                  <div className="emp-avatar" style={{ background: e.color, flexShrink:0 }}>{e.name[0]}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:600, fontSize:14, color:"#e8eaf0" }}>{e.name}</div>
                    {s.status !== "never" && s.date && (
                      <div style={{ fontSize:11, color:"#9aa0b4", marginTop:2 }}>
                        上次：{s.date.toLocaleDateString('zh-HK')} · 有效至：{s.expiry.toLocaleDateString('zh-HK')}
                      </div>
                    )}
                    {s.status === "never" && <div style={{ fontSize:11, color:"#e05c5c", marginTop:2 }}>⚠️ 從未簽署</div>}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
                    <span className={`badge ${s.badge === "green" ? "green" : s.badge === "yellow" ? "" : "red"}`}
                      style={s.badge === "yellow" ? { background:"#f0c00022", color:"#f0c000", border:"1px solid #f0c00044", borderRadius:6, padding:"2px 8px", fontSize:11 } : {}}>
                      <span className="badge-dot" />
                      {s.status === "valid" ? "已簽署" : s.label}
                    </span>
                    {s.status !== "valid" && (
                      <button className="btn btn-danger btn-sm" style={{ fontSize:11, padding:"3px 10px" }}
                        onClick={() => {
                          const phone = e.phone ? e.phone.replace(/[^0-9]/g,'') : '';
                          const msg = encodeURIComponent(`${e.name}，你好！請記得簽署安全守則，連結：https://elevator-mgmt-vert.vercel.app/checkin.html?emp=${e.id}`);
                          if (phone) {
                            window.open(`https://wa.me/852${phone}?text=${msg}`, '_blank');
                          } else {
                            showToast('⚠️ 未有電話號碼，請在員工管理更新', 'error');
                          }
                        }}>
                        📱 催簽
                      </button>
                    )}
                    {s.status === "valid" && (
                      <button className="btn btn-secondary btn-sm" style={{ fontSize:11, padding:"3px 10px" }}
                        onClick={() => showToast(`📄 ${e.name} 簽署記錄已載入`, "success")}>
                        📄
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 歷史記錄 ── */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-header">
          <div className="card-title">歷史簽署記錄</div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr><th>員工</th><th>簽署日期</th><th>有效至</th><th>裝置／IP</th><th>狀態</th></tr>
            </thead>
            <tbody>
              {safetyRecords.slice(0, 20).map((r, i) => {
                const signedDate = new Date(r.signed_at);
                const expiryDate = new Date(signedDate);
                expiryDate.setMonth(expiryDate.getMonth() + VALID_MONTHS);
                const expired = expiryDate < new Date();
                return (
                  <tr key={i}>
                    <td className="td-name">{r.employee_name}</td>
                    <td>{signedDate.toLocaleDateString('zh-HK')}</td>
                    <td>{expiryDate.toLocaleDateString('zh-HK')}</td>
                    <td style={{ fontSize:11 }}>{r.device || "—"}</td>
                    <td><span className={`badge ${expired ? "red" : "green"}`}><span className="badge-dot" />{expired ? "已過期" : "有效"}</span></td>
                  </tr>
                );
              })}
              {safetyRecords.length === 0 && !loadingRecords && (
                <tr><td colSpan={5} style={{ textAlign:"center", color:"#9aa0b4", padding:20 }}>暫無簽署記錄</td></tr>
              )}
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

// ─── Message Center ───────────────────────────────────────────────────────────
const MSG_TEMPLATES = [
  {
    id: "checkin",
    icon: "📆",
    label: "員工報更",
    color: "#22c55e",
    bg: "#0a1a0a",
    getUrl: (emp) => `https://junhui-checkin.vercel.app?emp=${emp.id}`,
    getMessage: (emp) => `【俊輝電梯工程有限公司】\n\n${emp.name}，你好！\n\n請用以下連結自助報更：\nhttps://junhui-checkin.vercel.app?emp=${emp.id}\n\n步驟：\n(1) 開連結\n(2) 揀更期\n(3) 填上班時間\n(4) 撳「確認報更」\n\n多謝合作！`,
  },
  {
    id: "safety",
    icon: "✅",
    label: "安全守則簽署",
    color: "#f0c000",
    bg: "#1a1500",
    getUrl: (emp) => `https://junhui-safety.vercel.app?emp=${emp.id}`,
    getMessage: (emp) => `【俊輝電梯工程有限公司】\n\n${emp.name}，你好！\n\n請用以下連結簽署安全守則：\nhttps://junhui-safety.vercel.app?emp=${emp.id}\n\n步驟：\n(1) 開連結\n(2) 細閱安全守則\n(3) 剔選同意\n(4) 簽名確認\n\n有效期六個月，請盡快完成。\n\n多謝合作！`,
  },
  {
    id: "progress",
    icon: "🔧",
    label: "施工進度日報",
    color: "#60a5fa",
    bg: "#0a1525",
    getUrl: (emp) => `https://junhui-progress.vercel.app?emp=${emp.id}`,
    getMessage: (emp) => `【俊輝電梯工程有限公司】\n\n${emp.name}，你好！\n\n請用以下連結提交今日施工進度日報：\nhttps://junhui-progress.vercel.app?emp=${emp.id}\n\n請填寫：完成進度、今日工作、問題及明日計劃。\n\n多謝合作！`,
  },
  {
    id: "payday",
    icon: "📋",
    label: "出糧確認簽署",
    color: "#22c55e",
    bg: "#0a1a0a",
    getUrl: (emp) => `https://junhui-payday.vercel.app?emp=${emp.id}&month=${new Date().toISOString().slice(0,7)}`,
    getMessage: (emp) => `【俊輝電梯工程有限公司】\n\n${emp.name}，你好！\n\n本月薪酬已發放，請用以下連結確認簽收：\nhttps://junhui-payday.vercel.app?emp=${emp.id}&month=${new Date().toISOString().slice(0,7)}\n\n如金額有異議，可在連結內填寫異議說明。\n\n多謝！`,
  },
];

function MessageCenter({ employees = EMPLOYEES, showToast }) {
  const [selTemplate, setSelTemplate] = React.useState(MSG_TEMPLATES[0]);
  const [selEmps, setSelEmps] = React.useState(new Set());
  const [sentLog, setSentLog] = React.useState([]);
  const [customMsg, setCustomMsg] = React.useState("");
  const [useCustom, setUseCustom] = React.useState(false);

  const toggleEmp = (id) => {
    setSelEmps(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };
  const selectAll = () => setSelEmps(new Set(employees.map(e => e.id)));
  const clearAll  = () => setSelEmps(new Set());

  const sendToEmp = (emp) => {
    const msg = useCustom && customMsg
      ? customMsg.replace("{name}", emp.name).replace("{url}", selTemplate.getUrl(emp))
      : selTemplate.getMessage(emp);
    const phone = emp.phone ? emp.phone.replace(/[^0-9]/g,'') : '';
    if (!phone) { showToast(`⚠️ ${emp.name} 未有電話號碼`,"error"); return; }
    window.open(`https://wa.me/852${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    setSentLog(prev => [{empName:emp.name, template:selTemplate.label, time:new Date().toLocaleTimeString('zh-HK'), phone}, ...prev.slice(0,49)]);
    showToast(`✅ 已開啟 ${emp.name} 嘅 WhatsApp`, "success");
  };

  const sendBulk = () => {
    if (selEmps.size === 0) { showToast("⚠️ 請先選擇員工","error"); return; }
    const targets = employees.filter(e => selEmps.has(e.id));
    targets.forEach((emp, i) => {
      setTimeout(() => sendToEmp(emp), i * 800);
    });
    showToast(`📤 逐一開啟 ${targets.length} 個 WhatsApp...`, "success");
  };

  return (
    <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>

      {/* Left panel */}
      <div style={{ flex:"1 1 300px", minWidth:280 }}>

        {/* Template selector */}
        <div className="card" style={{ marginBottom:14 }}>
          <div className="card-header"><div className="card-title">📋 選擇訊息類型</div></div>
          <div className="card-body" style={{ padding:"8px 12px" }}>
            {MSG_TEMPLATES.map(t => (
              <div key={t.id} onClick={()=>setSelTemplate(t)}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:8, marginBottom:6, cursor:"pointer",
                  background:selTemplate.id===t.id?t.bg:"transparent",
                  border:`1px solid ${selTemplate.id===t.id?t.color:"#2a3045"}` }}>
                <span style={{ fontSize:20 }}>{t.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:selTemplate.id===t.id?t.color:"#e8eaf0" }}>{t.label}</div>
                </div>
                {selTemplate.id===t.id && <span style={{ color:t.color, fontSize:14 }}>✓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Message preview */}
        <div className="card" style={{ marginBottom:14 }}>
          <div className="card-header">
            <div className="card-title">💬 訊息預覽</div>
            <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:"#9aa0b4", cursor:"pointer" }}>
              <input type="checkbox" checked={useCustom} onChange={e=>setUseCustom(e.target.checked)} style={{ accentColor:"#f0c000" }} />
              自訂訊息
            </label>
          </div>
          <div className="card-body" style={{ padding:"8px 12px" }}>
            {useCustom ? (
              <div>
                <div style={{ fontSize:11, color:"#555d6e", marginBottom:6 }}>可用變量：{"{name}"} = 員工名，{"{url}"} = 連結</div>
                <textarea value={customMsg} onChange={e=>setCustomMsg(e.target.value)}
                  placeholder={`${selTemplate.getMessage({name:"{name}", id:0, phone:""})}`}
                  style={{ width:"100%", background:"#0d0f12", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:8, padding:"10px 12px", fontSize:12, resize:"none", height:160, fontFamily:"inherit", outline:"none", lineHeight:1.7, boxSizing:"border-box" }} />
              </div>
            ) : (
              <div style={{ background:"#0d0f12", border:"1px solid #2a3045", borderRadius:8, padding:"10px 12px", fontSize:12, color:"#9aa0b4", lineHeight:1.7, whiteSpace:"pre-wrap", maxHeight:200, overflowY:"auto" }}>
                {selTemplate.getMessage({ name:"【員工姓名】", id:"XX", phone:"" })}
              </div>
            )}
          </div>
        </div>

        {/* Bulk send button */}
        <button onClick={sendBulk}
          style={{ width:"100%", background:selEmps.size>0?"#f0c000":"#1e2330", color:selEmps.size>0?"#0d0f12":"#555d6e", border:"none", borderRadius:10, padding:"13px 0", fontWeight:800, fontSize:14, cursor:selEmps.size>0?"pointer":"not-allowed", marginBottom:8 }}>
          📤 一鍵發送俾已選 {selEmps.size} 位員工
        </button>

        {/* Sent log */}
        {sentLog.length > 0 && (
          <div className="card">
            <div className="card-header"><div className="card-title">📋 發送記錄</div><span style={{ fontSize:11, color:"#555d6e" }}>本次 {sentLog.length} 條</span></div>
            <div className="card-body" style={{ padding:"6px 12px", maxHeight:180, overflowY:"auto" }}>
              {sentLog.map((l,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #1e2330", fontSize:12 }}>
                  <span style={{ color:"#e8eaf0", fontWeight:600 }}>{l.empName}</span>
                  <span style={{ color:"#555d6e" }}>{l.template} · {l.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right panel — Employee list */}
      <div style={{ flex:"1 1 300px", minWidth:280 }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">👷 選擇員工</div>
            <div style={{ display:"flex", gap:6 }}>
              <button onClick={selectAll} style={{ background:"#1e2330", border:"1px solid #2a3045", color:"#9aa0b4", borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:11 }}>全選</button>
              <button onClick={clearAll}  style={{ background:"#1e2330", border:"1px solid #2a3045", color:"#9aa0b4", borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:11 }}>清除</button>
            </div>
          </div>
          <div className="card-body" style={{ padding:"8px 12px" }}>
            <div style={{ fontSize:11, color:"#555d6e", marginBottom:8 }}>已選 {selEmps.size} / {employees.length} 人</div>
            {employees.map(emp => {
              const isSel = selEmps.has(emp.id);
              return (
                <div key={emp.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:8, marginBottom:4,
                  background:isSel?"#0a1525":"transparent", border:`1px solid ${isSel?"#60a5fa33":"#1e2330"}`, cursor:"pointer" }}
                  onClick={()=>toggleEmp(emp.id)}>
                  {/* Checkbox */}
                  <div style={{ width:18, height:18, borderRadius:4, border:`2px solid ${isSel?"#60a5fa":"#2a3045"}`, background:isSel?"#60a5fa":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {isSel && <span style={{ color:"#0d0f12", fontSize:11, fontWeight:800 }}>✓</span>}
                  </div>
                  {/* Avatar */}
                  <div style={{ width:32, height:32, borderRadius:"50%", background:emp.color+"33", border:`2px solid ${emp.color}55`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:emp.color, flexShrink:0 }}>
                    {emp.name[0]}
                  </div>
                  {/* Name + phone */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color: isSel?"#e8eaf0":"#9aa0b4" }}>{emp.name}</div>
                    <div style={{ fontSize:10, color:"#555d6e" }}>{emp.phone ? `📱 ${emp.phone}` : "⚠️ 未有電話"}</div>
                  </div>
                  {/* Individual send button */}
                  <button onClick={e=>{ e.stopPropagation(); sendToEmp(emp); }}
                    style={{ background:selTemplate.bg, border:`1px solid ${selTemplate.color}44`, color:selTemplate.color, borderRadius:6, padding:"5px 10px", cursor:"pointer", fontSize:10, fontWeight:700, flexShrink:0 }}>
                    {selTemplate.icon} 發送
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── QR Codes Page ────────────────────────────────────────────────────────────
// ─── Employee Self-Service Check-in Page ──────────────────────────────────────
const CHECKIN_EMPLOYEES = [
  { id:26, name:"姚奇敏", phone:"52392789", color:"#FF6B1A" },
  { id:28, name:"賴偉志", phone:"91498681", color:"#22C55E" },
  { id:29, name:"韓小錦", phone:"57631557", color:"#60A5FA" },
  { id:30, name:"彭金花", phone:"93405725", color:"#A78BFA" },
  { id:31, name:"李文彪", phone:"63573726", color:"#FB923C" },
  { id:32, name:"莫家文", phone:"65704790", color:"#F43F5E" },
  { id:33, name:"陳文軒", phone:"51115103", color:"#06B6D4" },
  { id:43, name:"Simon 曾遠宗", phone:"93408961", color:"#84CC16" },
  { id:44, name:"Kim",   phone:"66438119", color:"#E879F9" },
  { id:45, name:"耿華成", phone:"95615270", color:"#F0C000" },
  { id:46, name:"譚敏銳", phone:"54201997", color:"#22C55E" },
  { id:47, name:"吳紹鵬", phone:"56111810", color:"#60A5FA" },
  { id:48, name:"蔡貴明", phone:"59383172", color:"#A78BFA" },
  { id:51, name:"李國森", phone:"68908731", color:"#FB923C" },
];

function CheckinPage({ empId }) {
  const emp = CHECKIN_EMPLOYEES.find(e => e.id === empId);
  const [shift, setShift] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [summary, setSummary] = useState(null);

  // HK time
  const hkNow = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 8 * 3600000);
  };
  const hk = hkNow();
  const todayStr = `${hk.getFullYear()}-${String(hk.getMonth()+1).padStart(2,'0')}-${String(hk.getDate()).padStart(2,'0')}`;
  const nowTime  = `${String(hk.getHours()).padStart(2,'0')}:${String(hk.getMinutes()).padStart(2,'0')}`;

  const [date, setDate]     = useState(todayStr);
  const [time, setTime]     = useState(nowTime);
  const [remark, setRemark] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const submit = async () => {
    if (!shift) { showToast('⚠️ 請選擇更期'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/attendance`, {
        method: 'POST',
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify({ employee_name: emp.name, date, shift_type: shift, clock_in: `${date}T${time}:00+08:00`, notes: remark || null, status: 'present' })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setSummary({ name: emp.name, date, shift, time, remark });
      setSubmitted(true);
    } catch(e) {
      showToast('❌ 提交失敗，請重試');
    }
    setLoading(false);
  };

  const ciStyles = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'PingFang HK', sans-serif; }
    .ci-wrap { background:#0d0f12; min-height:100vh; display:flex; flex-direction:column; align-items:center; padding:20px 16px 40px; color:#e8eaf0; }
    .ci-card { background:#13161c; border:1px solid #1e2330; border-radius:16px; padding:24px 20px; width:100%; max-width:420px; margin-bottom:16px; }
    .ci-badge { display:flex; align-items:center; gap:14px; margin-bottom:24px; padding:16px; background:#0d0f12; border-radius:12px; border:1px solid #2a3045; }
    .ci-avatar { width:52px; height:52px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:800; flex-shrink:0; }
    .ci-field { margin-bottom:18px; }
    .ci-label { display:block; font-size:12px; color:#9aa0b4; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px; font-weight:600; }
    .ci-input { width:100%; background:#0d0f12; border:1px solid #2a3045; border-radius:10px; color:#e8eaf0; font-size:16px; padding:13px 14px; outline:none; -webkit-appearance:none; }
    .ci-input:focus { border-color:#f0c000; }
    .ci-textarea { width:100%; background:#0d0f12; border:1px solid #2a3045; border-radius:10px; color:#e8eaf0; font-size:15px; padding:12px 14px; outline:none; resize:none; height:80px; }
    .ci-shifts { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .ci-shift { padding:14px 10px; border-radius:10px; border:2px solid #2a3045; background:transparent; color:#9aa0b4; font-size:14px; font-weight:600; cursor:pointer; text-align:center; transition:all 0.15s; }
    .ci-shift.sel { border-color:#f0c000; background:#1a1500; color:#f0c000; }
    .ci-btn { width:100%; background:#f0c000; color:#0d0f12; border:none; border-radius:12px; padding:16px; font-size:17px; font-weight:800; cursor:pointer; margin-top:8px; }
    .ci-btn:disabled { opacity:0.4; cursor:not-allowed; }
    .ci-success { text-align:center; }
    .ci-sum { background:#0d0f12; border:1px solid #1e2330; border-radius:12px; padding:16px; margin:20px 0; text-align:left; }
    .ci-row { display:flex; justify-content:space-between; padding:6px 0; font-size:14px; border-bottom:1px solid #1e2330; }
    .ci-row:last-child { border-bottom:none; }
  `;

  const shiftMap = { '早更':'🌅 早更','夜更':'🌙 夜更','假日更':'🎉 假日更','散工':'💼 散工' };

  if (!emp) return (
    <div style={{ background:'#0d0f12', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#e8eaf0', padding:24 }}>
      <style>{ciStyles}</style>
      <div style={{ fontSize:48, marginBottom:16 }}>⚠️</div>
      <div style={{ fontSize:18, fontWeight:700, color:'#e05c5c', marginBottom:8 }}>連結無效</div>
      <div style={{ color:'#555d6e', fontSize:14 }}>請向主管索取正確嘅報更連結</div>
    </div>
  );

  return (
    <div className="ci-wrap">
      <style>{ciStyles}</style>
      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:28, paddingTop:12 }}>
        <div style={{ fontSize:36, marginBottom:8 }}>🏗️</div>
        <div style={{ fontSize:18, fontWeight:700, color:'#f0c000' }}>巨揚工程有限公司</div>
        <div style={{ fontSize:13, color:'#555d6e', marginTop:4 }}>員工自助報更</div>
      </div>

      {submitted ? (
        <div className="ci-card ci-success">
          <div style={{ fontSize:64, marginBottom:16 }}>✅</div>
          <div style={{ fontSize:22, fontWeight:800, color:'#22c55e', marginBottom:8 }}>報更成功！</div>
          <div className="ci-sum">
            {[['姓名', summary.name],['日期', summary.date],['更期', shiftMap[summary.shift]||summary.shift],['上班時間', summary.time],summary.remark&&['備註', summary.remark]].filter(Boolean).map(([l,v],i)=>(
              <div key={i} className="ci-row">
                <span style={{ color:'#555d6e' }}>{l}</span>
                <span style={{ fontWeight:600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ color:'#9aa0b4', fontSize:14, lineHeight:1.6 }}>已記錄到系統，主管可以喺考勤月曆睇到</div>
        </div>
      ) : (
        <div className="ci-card">
          {/* Employee badge */}
          <div className="ci-badge">
            <div className="ci-avatar" style={{ background:emp.color+'33', color:emp.color, border:`2px solid ${emp.color}66` }}>{emp.name[0]}</div>
            <div>
              <div style={{ fontSize:18, fontWeight:700 }}>{emp.name}</div>
              <div style={{ fontSize:12, color:'#555d6e', marginTop:2 }}>電梯技工</div>
            </div>
          </div>

          {/* Date */}
          <div className="ci-field">
            <label className="ci-label">📅 日期</label>
            <input type="date" className="ci-input" value={date} onChange={e=>setDate(e.target.value)} />
          </div>

          {/* Shift */}
          <div className="ci-field">
            <label className="ci-label">⏰ 更期</label>
            <div className="ci-shifts">
              {[['早更','🌅'],['夜更','🌙'],['假日更','🎉'],['散工','💼']].map(([s,icon])=>(
                <button key={s} className={'ci-shift'+(shift===s?' sel':'')} onClick={()=>setShift(s)}>
                  <span style={{ fontSize:20, display:'block', marginBottom:4 }}>{icon}</span>{s}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="ci-field">
            <label className="ci-label">🕐 上班時間</label>
            <input type="time" className="ci-input" value={time} onChange={e=>setTime(e.target.value)} />
          </div>

          {/* Remark */}
          <div className="ci-field">
            <label className="ci-label">📝 備註（可選）</label>
            <textarea className="ci-textarea" value={remark} onChange={e=>setRemark(e.target.value)} placeholder="例：工作內容、特別情況..." />
          </div>

          <button className="ci-btn" disabled={loading} onClick={submit}>
            {loading ? '提交中...' : '✅ 確認報更'}
          </button>
        </div>
      )}

      {toast && (
        <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', background:'#e05c5c', color:'#fff', borderRadius:8, padding:'10px 20px', fontSize:14, fontWeight:600, whiteSpace:'nowrap' }}>
          {toast}
        </div>
      )}
    </div>
  );
}


function QRCodesPage({ employees = EMPLOYEES }) {
  const SITE_URLS = {
    checkin:  "https://junhui-checkin.vercel.app",
    safety:   "https://junhui-safety.vercel.app",
    progress: "https://junhui-progress.vercel.app",
    payday:   "https://junhui-payday.vercel.app",
  };
  const BASE_URL = SITE_URLS.checkin;
  const [copied, setCopied] = React.useState(null);

  const getUrl = (emp) => `${BASE_URL}?emp=${emp.id}`;

  const copyLink = (emp) => {
    navigator.clipboard.writeText(getUrl(emp)).then(() => {
      setCopied(emp.id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const printAll = () => window.print();

  const copyAll = () => {
    const text = employees.map(e => `${e.name}: ${getUrl(e)}`).join('\n');
    navigator.clipboard.writeText(text);
    // Show toast via parent - we use alert as fallback
    alert('✅ 已複製全部連結！請貼入 WhatsApp 群組發送。');
  };

  const sendViaWhatsApp = (emp) => {
    const phone = emp.phone ? emp.phone.replace(/[^0-9]/g,'') : '';
    const msg = encodeURIComponent(
      `${emp.name}，你好！\n\n請用以下連結自助報更：\n${getUrl(emp)}\n\n步驟：\n1️⃣ 開連結\n2️⃣ 揀更期\n3️⃣ 填上班時間\n4️⃣ 撳「確認報更」\n\n多謝合作！`
    );
    if (phone) {
      window.open(`https://wa.me/852${phone}?text=${msg}`, '_blank');
    } else {
      alert(`${emp.name} 未有電話號碼，請在員工管理頁面更新。`);
    }
  };

  // QR via Google Charts API (no npm needed)
  const qrUrl = (url) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(url)}&color=e8eaf0&bgcolor=0d0f12`;

  return (
    <div>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:13, color:"#555d6e" }}>每位員工有專屬連結，WhatsApp發給佢哋即可</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={copyAll}
            style={{ background:"#1e2330", border:"1px solid #2a3045", color:"#9aa0b4", borderRadius:8, padding:"8px 16px", cursor:"pointer", fontSize:12, fontWeight:600 }}>
            📋 複製全部連結
          </button>
          <button onClick={printAll}
            style={{ background:"#f0c000", color:"#0d0f12", border:"none", borderRadius:8, padding:"8px 16px", cursor:"pointer", fontSize:12, fontWeight:700 }}>
            🖨️ 打印全部QR
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div style={{ background:"#0a1525", border:"1px solid #60a5fa33", borderRadius:10, padding:"12px 16px", marginBottom:20, fontSize:13, color:"#60a5fa", lineHeight:1.8 }}>
        <div><strong>💬 「發送」按鈕用法：</strong>撳後會自動開你手機嘅 WhatsApp，並預填好訊息。你只需撳「傳送」即可。</div>
        <div style={{marginTop:6, color:"#9aa0b4"}}>員工收到連結 → 開連結 → 揀更期 → 填上班時間 → 撳確認 → 自動入系統 ✅</div>
      </div>

      {/* Employee QR grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:14 }}>
        {employees.map(emp => (
          <div key={emp.id} style={{ background:"#13161c", border:"1px solid #1e2330", borderRadius:12, padding:16, display:"flex", gap:14, alignItems:"center" }}>
            {/* QR Code */}
            <div style={{ flexShrink:0, background:"#0d0f12", borderRadius:8, padding:6, border:"1px solid #2a3045" }}>
              <img src={qrUrl(getUrl(emp))} width={80} height={80} alt={`QR ${emp.name}`}
                style={{ display:"block", borderRadius:4 }} />
            </div>

            {/* Info */}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:emp.color+"33", border:`2px solid ${emp.color}66`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:emp.color, flexShrink:0 }}>
                  {emp.name[0]}
                </div>
                <span style={{ fontWeight:700, fontSize:15 }}>{emp.name}</span>
              </div>

              <div style={{ fontSize:10, color:"#3a4255", marginBottom:8, wordBreak:"break-all", fontFamily:"monospace" }}>
                {getUrl(emp).replace(window.location.origin,'')}
              </div>

              <div style={{ display:"flex", gap:6 }}>
                <button onClick={() => copyLink(emp)}
                  style={{ flex:1, background: copied===emp.id ? "#0a1a0a" : "#1e2330", border:`1px solid ${copied===emp.id ? "#22c55e" : "#2a3045"}`, color: copied===emp.id ? "#22c55e" : "#9aa0b4", borderRadius:6, padding:"6px 0", cursor:"pointer", fontSize:11, fontWeight:600 }}>
                  {copied===emp.id ? "✅ 已複製" : "📋 複製"}
                </button>
                <button onClick={() => sendViaWhatsApp(emp)}
                  style={{ flex:1, background:"#0a1a0a", border:"1px solid #22c55e44", color:"#22c55e", borderRadius:6, padding:"6px 0", cursor:"pointer", fontSize:11, fontWeight:600 }}>
                  💬 發送
                </button>
                <a href={getUrl(emp)} target="_blank" rel="noreferrer"
                  style={{ flex:"0 0 40px", background:"#1e2330", border:"1px solid #2a3045", color:"#9aa0b4", borderRadius:6, padding:"6px 0", cursor:"pointer", fontSize:11, fontWeight:600, textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  🔗
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
        }
      `}</style>
    </div>
  );
}

// ─── Company Calendar ─────────────────────────────────────────────────────────
const CAL_EVENT_TYPES = {
  project:  { label:"工程截止/驗機", icon:"🔧", color:"#60a5fa",  bg:"#0a1525" },
  invoice:  { label:"請款節點",      icon:"📋", color:"#f0c000",  bg:"#1a1500" },
  shift:    { label:"員工排更",      icon:"👷", color:"#22c55e",  bg:"#0a1a0a" },
  safety:   { label:"安全守則到期",  icon:"✅", color:"#e05c5c",  bg:"#1a0a0a" },
  meeting:  { label:"會議/重要事項", icon:"📋", color:"#a78bfa",  bg:"#120a1a" },
  holiday:  { label:"公眾假期",      icon:"🎉", color:"#f97316",  bg:"#1a0f00" },
};

const HK_HOLIDAYS_2026 = [
  "2026-01-01","2026-01-26","2026-02-17","2026-02-18","2026-02-19",
  "2026-04-03","2026-04-04","2026-04-05","2026-04-06",
  "2026-04-20","2026-05-01","2026-05-20","2026-06-19",
  "2026-07-01","2026-09-26","2026-10-01","2026-10-02",
  "2026-10-26","2026-12-25","2026-12-26",
];

function CompanyCalendar({ showToast, employees = EMPLOYEES, projects = INITIAL_PROJECTS }) {
  const now = new Date();
  const [curYear,  setCurYear]  = useState(now.getFullYear());
  const [curMonth, setCurMonth] = useState(now.getMonth());
  const [events,   setEvents]   = useState({}); // { "YYYY-MM-DD": [{ id, type, title, detail, empName, color }] }
  const [selDate,  setSelDate]  = useState(null);
  const [showAdd,  setShowAdd]  = useState(false);
  const [editEvt,  setEditEvt]  = useState(null); // event being edited
  const [filters,  setFilters]  = useState(Object.fromEntries(Object.keys(CAL_EVENT_TYPES).map(k=>[k,true])));
  const [newEvt,   setNewEvt]   = useState({ type:"meeting", title:"", detail:"", empName:"", date: now.toISOString().slice(0,10) });

  const WEEKDAYS  = ["日","一","二","三","四","五","六"];
  const todayStr  = now.toISOString().slice(0,10);
  const monthStr  = `${curYear}-${String(curMonth+1).padStart(2,"0")}`;
  const firstDay  = new Date(curYear, curMonth, 1);
  const lastDay   = new Date(curYear, curMonth+1, 0);
  const startDow  = firstDay.getDay();
  const daysInMon = lastDay.getDate();
  const dateStr   = d => `${curYear}-${String(curMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

  // ── Load events from Supabase + auto-generate from existing data ──
  useEffect(() => {
    const load = async () => {
      const evts = {};

      // Helper to add event
      const addEvt = (date, evt) => {
        if (!evts[date]) evts[date] = [];
        evts[date].push({ id: Date.now() + Math.random(), ...evt });
      };

      // 1. Auto-generate project deadlines from Supabase projects
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/projects?select=name,end_date,start_date,phase&limit=200`,
          { headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` } }
        );
        const proj = await res.json();
        if (Array.isArray(proj)) {
          proj.forEach(p => {
            if (p.end_date && p.end_date.startsWith(monthStr)) {
              addEvt(p.end_date.slice(0,10), { type:"project", title:`📋 ${p.name}`, detail:"工程竣工日期", fromDB:true, projName:p.name });
            }
            // 10-day warning
            if (p.end_date) {
              const warn = new Date(p.end_date);
              warn.setDate(warn.getDate() - 10);
              const warnStr = warn.toISOString().slice(0,10);
              if (warnStr.startsWith(monthStr)) {
                addEvt(warnStr, { type:"project", title:`⚠️ ${p.name}`, detail:"距離竣工剩10天", fromDB:true });
              }
            }
          });
        }
      } catch(e) {}

      // 2. Auto-generate invoice milestones from Supabase invoices
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/invoices?select=stage,amount,status,sent_at&status=eq.pending&limit=200`,
          { headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` } }
        );
        const invs = await res.json();
        if (Array.isArray(invs)) {
          invs.filter(r => r.sent_at && r.sent_at.startsWith(monthStr)).forEach(r => {
            addEvt(r.sent_at.slice(0,10), { type:"invoice", title:`💰 ${r.stage}`, detail:`HK$${(r.amount||0).toLocaleString()} 待收款`, fromDB:true });
          });
        }
      } catch(e) {}

      // 3. Auto-generate safety expiry warnings from safety_signs
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/safety_signs?select=employee_name,signed_at&order=signed_at.desc`,
          { headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` } }
        );
        const signs = await res.json();
        if (Array.isArray(signs)) {
          const seen = new Set();
          signs.forEach(s => {
            if (seen.has(s.employee_name)) return;
            seen.add(s.employee_name);
            const exp = new Date(s.signed_at);
            exp.setMonth(exp.getMonth() + 6);
            const expStr = exp.toISOString().slice(0,10);
            if (expStr.startsWith(monthStr)) {
              addEvt(expStr, { type:"safety", title:`🛡 ${s.employee_name}`, detail:"安全守則簽署到期", fromDB:true, empName:s.employee_name });
            }
            // 14-day warning
            const warn = new Date(exp); warn.setDate(warn.getDate()-14);
            const warnStr = warn.toISOString().slice(0,10);
            if (warnStr.startsWith(monthStr)) {
              addEvt(warnStr, { type:"safety", title:`⚠️ ${s.employee_name}`, detail:"安全守則14日後到期", fromDB:true });
            }
          });
        }
      } catch(e) {}

      // 4. Load manually-added events from Supabase calendar table
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/calendar_events?date=gte.${monthStr}-01&date=lte.${monthStr}-31&select=*&order=date.asc`,
          { headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` } }
        );
        const manuals = await res.json();
        if (Array.isArray(manuals)) {
          manuals.forEach(m => {
            addEvt(m.date, { id:m.id, type:m.type||"meeting", title:m.title, detail:m.detail||"", empName:m.emp_name||"", fromDB:true, manualId:m.id });
          });
        }
      } catch(e) {}

      // 5. HK Public Holidays
      HK_HOLIDAYS_2026.filter(d=>d.startsWith(monthStr)).forEach(d => {
        addEvt(d, { type:"holiday", title:"🎉 公眾假期", detail:"香港法定假日", fromDB:false });
      });

      setEvents(evts);
    };
    load();
  }, [curYear, curMonth]);

  // ── Save manual event ──
  const saveEvent = async (evt) => {
    const payload = { date: evt.date, type: evt.type, title: evt.title, detail: evt.detail, emp_name: evt.empName };
    try {
      let savedId = evt.manualId;
      if (savedId) {
        await fetch(`${SUPABASE_URL}/rest/v1/calendar_events?id=eq.${savedId}`, {
          method:"PATCH", headers:{ "apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/calendar_events`, {
          method:"POST", headers:{ "apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json","Prefer":"return=representation" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        savedId = data?.[0]?.id;
      }
      setEvents(prev => {
        const n = { ...prev };
        const date = evt.date;
        if (!n[date]) n[date] = [];
        // Remove old version if editing
        if (evt.manualId) n[date] = n[date].filter(e => e.manualId !== evt.manualId);
        n[date] = [...n[date], { ...evt, manualId:savedId, fromDB:true }];
        return n;
      });
      showToast("✅ 事項已儲存", "success");
    } catch(e) { showToast("⚠️ 儲存失敗", "error"); }
    setShowAdd(false); setEditEvt(null);
    setNewEvt({ type:"meeting", title:"", detail:"", empName:"", date: todayStr });
  };

  // ── Delete event ──
  const deleteEvent = async (date, evt) => {
    if (evt.manualId) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/calendar_events?id=eq.${evt.manualId}`, {
          method:"DELETE", headers:{ "apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}` }
        });
      } catch(e) {}
    }
    setEvents(prev => {
      const n = { ...prev };
      n[date] = (n[date]||[]).filter(e => e !== evt);
      return n;
    });
    showToast("🗑 事項已刪除", "success");
    setEditEvt(null);
  };

  // ── Export ──
  const handleExport = () => {
    const rows = [["日期","類型","標題","詳情","相關人員"]];
    Object.entries(events).sort().forEach(([date, evts]) => {
      evts.forEach(e => { if (filters[e.type]) rows.push([date, CAL_EVENT_TYPES[e.type]?.label||e.type, e.title, e.detail||"", e.empName||""]); });
    });
    const csv = rows.map(r=>r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"}));
    a.download = `公司月曆_${curYear}年${curMonth+1}月.csv`; a.click();
    showToast("✅ 月曆已導出", "success");
  };

  // ── Upcoming events (next 14 days) ──
  const upcoming = [];
  for (let i=0; i<14; i++) {
    const d = new Date(now); d.setDate(now.getDate()+i);
    const ds = d.toISOString().slice(0,10);
    (events[ds]||[]).filter(e=>filters[e.type]).forEach(e => upcoming.push({ date:ds, ...e }));
  }

  // ── Event form ──
  const EventForm = ({ initial, onSave, onCancel }) => {
    const [form, setForm] = useState(initial);
    return (
      <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}
        onClick={e=>e.target===e.currentTarget&&onCancel()}>
        <div style={{ background:"#13161c", border:"1px solid #2a3045", borderRadius:12, padding:24, width:400, maxWidth:"92vw" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:16, color:"#e8eaf0" }}>{initial.manualId?"編輯事項":"新增事項"}</div>
            <button onClick={onCancel} style={{ background:"none", border:"none", color:"#9aa0b4", cursor:"pointer", fontSize:20 }}>✕</button>
          </div>

          {/* Type selector */}
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:11, color:"#9aa0b4", marginBottom:6 }}>事項類型</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {Object.entries(CAL_EVENT_TYPES).filter(([k])=>k!=="holiday").map(([k,v])=>(
                <button key={k} onClick={()=>setForm(p=>({...p,type:k}))}
                  style={{ padding:"4px 10px", borderRadius:6, border:`1px solid ${form.type===k?v.color:"#2a3045"}`, background:form.type===k?v.bg:"transparent", color:form.type===k?v.color:"#9aa0b4", cursor:"pointer", fontSize:11, fontWeight:600 }}>
                  {v.icon} {v.label}
                </button>
              ))}
            </div>
          </div>

          {[
            { l:"日期", k:"date", t:"date" },
            { l:"標題", k:"title", t:"text", p:"例：EC-505 驗機、薪酬審批會議..." },
            { l:"詳情（可選）", k:"detail", t:"text", p:"例：請準備相關文件" },
            { l:"相關人員（可選）", k:"empName", t:"text", p:"例：姚奇敏、全體員工" },
          ].map(f=>(
            <div key={f.k} style={{ marginBottom:10 }}>
              <div style={{ fontSize:11, color:"#9aa0b4", marginBottom:4 }}>{f.l}</div>
              <input type={f.t} value={form[f.k]||""} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}
                placeholder={f.p||""} style={{ width:"100%", background:"#0d0f12", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:7, padding:"8px 10px", fontSize:13, boxSizing:"border-box" }} />
            </div>
          ))}

          {/* Preview */}
          {form.title && (
            <div style={{ background:CAL_EVENT_TYPES[form.type]?.bg||"#1a1a2a", border:`1px solid ${CAL_EVENT_TYPES[form.type]?.color||"#60a5fa"}44`, borderRadius:7, padding:"8px 12px", marginBottom:14 }}>
              <span style={{ fontSize:12, color:CAL_EVENT_TYPES[form.type]?.color||"#60a5fa" }}>
                {CAL_EVENT_TYPES[form.type]?.icon} {form.title}
              </span>
              {form.detail && <div style={{ fontSize:11, color:"#9aa0b4", marginTop:2 }}>{form.detail}</div>}
            </div>
          )}

          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>form.title?onSave(form):showToast("⚠️ 請填寫標題","error")}
              style={{ flex:1, background:"#f0c000", color:"#0d0f12", border:"none", borderRadius:7, padding:"10px 0", fontWeight:700, fontSize:13, cursor:"pointer" }}>
              ✅ 儲存
            </button>
            {initial.manualId && (
              <button onClick={()=>{ if(window.confirm("確定刪除此事項？")) deleteEvent(initial.date, initial); }}
                style={{ background:"#2a1010", color:"#e05c5c", border:"1px solid #e05c5c44", borderRadius:7, padding:"10px 14px", cursor:"pointer", fontSize:13 }}>
                🗑
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ── Day detail panel ──
  const DayPanel = ({ date }) => {
    const dayEvts = (events[date]||[]).filter(e=>filters[e.type]);
    const dow = new Date(date).getDay();
    const isHoliday = HK_HOLIDAYS_2026.includes(date);
    return (
      <div className="card" style={{ height:"100%" }}>
        <div className="card-header">
          <div>
            <div className="card-title">{date}</div>
            <div style={{ fontSize:11, color:"#9aa0b4" }}>{["星期日","星期一","星期二","星期三","星期四","星期五","星期六"][dow]}{isHoliday?" 🎉 公眾假期":""}</div>
          </div>
          <button onClick={()=>{ setNewEvt(p=>({...p,date})); setShowAdd(true); }}
            style={{ background:"#f0c000", color:"#0d0f12", border:"none", borderRadius:6, padding:"5px 12px", fontWeight:700, fontSize:12, cursor:"pointer" }}>
            + 新增
          </button>
        </div>
        <div className="card-body" style={{ padding:"8px 12px", maxHeight:500, overflowY:"auto" }}>
          {dayEvts.length===0 ? (
            <div style={{ textAlign:"center", padding:"30px 0", color:"#3a4255" }}>
              <div style={{ fontSize:24, marginBottom:8 }}>📭</div>
              <div style={{ fontSize:12 }}>今日暫無事項</div>
              <button onClick={()=>{ setNewEvt(p=>({...p,date})); setShowAdd(true); }}
                style={{ marginTop:10, background:"#1e2330", border:"1px solid #2a3045", color:"#9aa0b4", borderRadius:6, padding:"6px 16px", cursor:"pointer", fontSize:12 }}>
                + 新增事項
              </button>
            </div>
          ) : dayEvts.map((e,i)=>{
            const tc = CAL_EVENT_TYPES[e.type]||CAL_EVENT_TYPES.meeting;
            return (
              <div key={i} style={{ background:tc.bg, border:`1px solid ${tc.color}44`, borderRadius:8, padding:"10px 12px", marginBottom:8, cursor: e.manualId?"pointer":"default" }}
                onClick={()=>e.manualId&&setEditEvt({...e,date})}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                  <span style={{ fontSize:14 }}>{tc.icon}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:tc.color }}>{e.title}</span>
                  {e.manualId && <span style={{ marginLeft:"auto", fontSize:10, color:"#555d6e" }}>✏️</span>}
                </div>
                {e.detail && <div style={{ fontSize:11, color:"#9aa0b4", marginLeft:20 }}>{e.detail}</div>}
                {e.empName && <div style={{ fontSize:10, color:"#555d6e", marginLeft:20, marginTop:2 }}>👤 {e.empName}</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Stats for this month ──
  const typeCount = Object.fromEntries(Object.keys(CAL_EVENT_TYPES).map(k=>[k,0]));
  Object.values(events).flat().forEach(e=>{ if(typeCount[e.type]!==undefined) typeCount[e.type]++; });

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, flexWrap:"wrap" }}>
        {/* Month nav */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {[["◀", ()=>{ if(curMonth===0){setCurMonth(11);setCurYear(y=>y-1);}else setCurMonth(m=>m-1); }],
            ["▶", ()=>{ if(curMonth===11){setCurMonth(0);setCurYear(y=>y+1);}else setCurMonth(m=>m+1); }]
          ].map(([l,fn],i)=>(
            <button key={i} onClick={fn} style={{ background:"#1e2330", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:6, padding:"5px 12px", cursor:"pointer", fontSize:13 }}>{l}</button>
          ))}
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:22, fontWeight:700, color:"#e8eaf0", minWidth:140, textAlign:"center" }}>
            {curYear}年 {curMonth+1}月
          </div>
          <button onClick={()=>{setCurYear(now.getFullYear());setCurMonth(now.getMonth());setSelDate(todayStr);}}
            style={{ background:"#1e2330", border:"1px solid #f0c00044", color:"#f0c000", borderRadius:6, padding:"5px 10px", cursor:"pointer", fontSize:11 }}>今日</button>
        </div>
        <div style={{ flex:1 }} />
        <button onClick={()=>setShowAdd(true)}
          style={{ background:"#f0c000", color:"#0d0f12", border:"none", borderRadius:6, padding:"6px 16px", fontWeight:700, fontSize:12, cursor:"pointer" }}>
          ＋ 新增事項
        </button>
        <button onClick={handleExport}
          style={{ background:"transparent", border:"1px solid #f0c000", color:"#f0c000", borderRadius:6, padding:"6px 14px", cursor:"pointer", fontSize:12, fontWeight:600 }}>
          📥 導出
        </button>
      </div>

      {/* ── Filter chips ── */}
      <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
        {Object.entries(CAL_EVENT_TYPES).map(([k,v])=>(
          <button key={k} onClick={()=>setFilters(p=>({...p,[k]:!p[k]}))}
            style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 12px", borderRadius:20, border:`1px solid ${filters[k]?v.color:"#2a3045"}`, background:filters[k]?v.bg:"transparent", cursor:"pointer", fontSize:11, fontWeight:600, color:filters[k]?v.color:"#555d6e" }}>
            {v.icon} {v.label}
            <span style={{ background:filters[k]?v.color+"33":"#1e2330", borderRadius:10, padding:"0 5px", fontSize:10, color:filters[k]?v.color:"#555d6e" }}>{typeCount[k]||0}</span>
          </button>
        ))}
      </div>

      {/* ── KPI strip ── */}
      <div className="kpi-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:14 }}>
        {[
          { l:"本月事項總數", v:Object.values(events).flat().length, c:"#60a5fa" },
          { l:"工程截止/驗機", v:typeCount.project, c:"#60a5fa" },
          { l:"安全到期提醒", v:typeCount.safety, c:"#e05c5c" },
          { l:"請款節點",     v:typeCount.invoice, c:"#f0c000" },
        ].map((k,i)=>(
          <div key={i} style={{ background:"#13161c", border:`1px solid ${k.c}33`, borderRadius:10, padding:"10px 14px" }}>
            <div style={{ fontSize:10, color:"#3a4255", textTransform:"uppercase", marginBottom:4 }}>{k.l}</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:22, fontWeight:800, color:k.c }}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* ── Main layout: Calendar + Side Panel ── */}
      <div style={{ display:"flex", gap:14 }}>
        {/* Calendar grid */}
        <div style={{ flex:1 }}>
          {/* Weekday headers */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3, marginBottom:4 }}>
            {WEEKDAYS.map(d=>(
              <div key={d} style={{ textAlign:"center", fontSize:11, fontWeight:700, color:"#555d6e", padding:"6px 0" }}>{d}</div>
            ))}
          </div>
          {/* Day cells */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
            {Array.from({length:startDow}).map((_,i)=><div key={`e${i}`}/>)}
            {Array.from({length:daysInMon}).map((_,i)=>{
              const day = i+1;
              const ds  = dateStr(day);
              const isToday   = ds===todayStr;
              const isSel     = ds===selDate;
              const isHoliday = HK_HOLIDAYS_2026.includes(ds);
              const dow       = new Date(curYear,curMonth,day).getDay();
              const isWeekend = dow===0||dow===6;
              const dayEvts   = (events[ds]||[]).filter(e=>filters[e.type]);

              return (
                <div key={day} onClick={()=>setSelDate(isSel?null:ds)}
                  style={{ background:isSel?"#1a2240":isToday?"#0d1525":isHoliday?"#1a0f00":isWeekend?"#0f1118":"#0d0f12",
                    border:`2px solid ${isSel?"#f0c000":isToday?"#60a5fa":isHoliday?"#f9741633":"#1e2330"}`,
                    borderRadius:8, padding:"6px 6px", minHeight:90, cursor:"pointer" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:isToday?"#60a5fa":isHoliday?"#f97316":isWeekend?"#9aa0b4":"#e8eaf0" }}>{day}</span>
                    {isHoliday && <span style={{ fontSize:9, color:"#f97316" }}>假</span>}
                    {dayEvts.length>0 && !isHoliday && (
                      <span style={{ fontSize:9, background:"#1e2330", color:"#9aa0b4", borderRadius:8, padding:"0 5px" }}>{dayEvts.length}</span>
                    )}
                  </div>
                  {/* Event pills — max 3 */}
                  {dayEvts.slice(0,3).map((e,j)=>{
                    const tc = CAL_EVENT_TYPES[e.type]||CAL_EVENT_TYPES.meeting;
                    return (
                      <div key={j} style={{ background:tc.bg, border:`1px solid ${tc.color}44`, borderRadius:4, padding:"2px 5px", marginBottom:2, fontSize:9, color:tc.color, overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>
                        {tc.icon} {e.title.replace(/^[^\w\u4e00-\u9fff]*/,"")}
                      </div>
                    );
                  })}
                  {dayEvts.length>3 && <div style={{ fontSize:9, color:"#555d6e" }}>+{dayEvts.length-3}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side panel */}
        <div style={{ width:300, flexShrink:0, display:"flex", flexDirection:"column", gap:12 }}>
          {/* Selected day detail */}
          {selDate ? <DayPanel date={selDate} /> : (
            /* Upcoming 14 days */
            <div className="card" style={{ flex:1 }}>
              <div className="card-header">
                <div className="card-title">📌 未來14日事項</div>
                <span style={{ fontSize:11, color:"#9aa0b4" }}>{upcoming.length} 項</span>
              </div>
              <div className="card-body" style={{ padding:"8px 12px", maxHeight:520, overflowY:"auto" }}>
                {upcoming.length===0 ? (
                  <div style={{ textAlign:"center", padding:"30px 0", color:"#3a4255", fontSize:12 }}>暫無即將事項</div>
                ) : upcoming.map((e,i)=>{
                  const tc = CAL_EVENT_TYPES[e.type]||CAL_EVENT_TYPES.meeting;
                  const daysLeft = Math.ceil((new Date(e.date)-now)/(1000*60*60*24));
                  return (
                    <div key={i} style={{ display:"flex", gap:8, padding:"7px 0", borderBottom:"1px solid #1e2330", cursor:"pointer" }}
                      onClick={()=>setSelDate(e.date)}>
                      <div style={{ width:36, flexShrink:0, textAlign:"center" }}>
                        <div style={{ fontSize:16, lineHeight:1 }}>{tc.icon}</div>
                        <div style={{ fontSize:9, color: daysLeft===0?"#e05c5c":daysLeft<=3?"#f0c000":"#555d6e", marginTop:2, fontWeight:700 }}>
                          {daysLeft===0?"今日":`${daysLeft}日`}
                        </div>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:12, fontWeight:600, color:tc.color, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.title}</div>
                        <div style={{ fontSize:10, color:"#555d6e" }}>{e.date} {e.detail&&`· ${e.detail.slice(0,20)}`}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      {showAdd  && <EventForm initial={newEvt}  onSave={saveEvent} onCancel={()=>setShowAdd(false)}  />}
      {editEvt  && <EventForm initial={editEvt} onSave={saveEvent} onCancel={()=>setEditEvt(null)}   />}
    </div>
  );
}

// ─── Attendance Calendar ───────────────────────────────────────────────────────
const SHIFT_OPTIONS = ["早更 07:00–16:00", "夜更 16:00–01:00", "假日更", "散工", "休假", "病假", "事假"];
const SHIFT_COLORS  = {
  "早更 07:00–16:00": { bg:"#0a2a0a", border:"#22c55e", text:"#22c55e" },
  "夜更 16:00–01:00": { bg:"#0a0a2a", border:"#60a5fa", text:"#60a5fa" },
  "假日更":           { bg:"#2a200a", border:"#f0c000", text:"#f0c000" },
  "散工":             { bg:"#1a0a2a", border:"#a78bfa", text:"#a78bfa" },
  "休假":             { bg:"#1a1a1a", border:"#555d6e", text:"#555d6e" },
  "病假":             { bg:"#2a0a0a", border:"#e05c5c", text:"#e05c5c" },
  "事假":             { bg:"#1a1510", border:"#f97316", text:"#f97316" },
};

function AttendanceCalendar({ showToast, employees = EMPLOYEES, projects = INITIAL_PROJECTS }) {
  const now = new Date();
  const [viewMode,   setViewMode]   = useState("month");   // "month" | "grid"
  const [curYear,    setCurYear]    = useState(now.getFullYear());
  const [curMonth,   setCurMonth]   = useState(now.getMonth()); // 0-based
  const [records,    setRecords]    = useState({});  // { "YYYY-MM-DD": { empId: { shift, site, inTime, outTime, note } } }
  const [editCell,   setEditCell]   = useState(null);// { date, empId } currently editing
  const [editForm,   setEditForm]   = useState({});
  const [loading,    setLoading]    = useState(true);
  const [selDate,    setSelDate]    = useState(null);// month view: selected date for detail panel

  const activeProjects = projects.filter(p => p.phase === "active" || p.phase === "pending");

  // ── Build calendar days ──
  const firstDay  = new Date(curYear, curMonth, 1);
  const lastDay   = new Date(curYear, curMonth + 1, 0);
  const startDow  = firstDay.getDay(); // 0=Sun
  const daysInMon = lastDay.getDate();
  const WEEKDAYS  = ["日","一","二","三","四","五","六"];
  const monthStr  = `${curYear}-${String(curMonth+1).padStart(2,"0")}`;
  const todayStr  = now.toISOString().slice(0,10);

  const dateStr = (d) => `${curYear}-${String(curMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

  // ── Load records from Supabase ──
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/attendance?date=gte.${monthStr}-01&date=lte.${monthStr}-31&select=*&order=date.asc`,
          { headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` } }
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          const rec = {};
          data.forEach(r => {
            if (!rec[r.date]) rec[r.date] = {};
            rec[r.date][r.employee_name] = {
              shift: r.shift || "早更 07:00–16:00",
              site:  r.site  || "",
              inTime:  r.check_in  ? new Date(r.check_in).toLocaleTimeString("zh-HK",{hour:"2-digit",minute:"2-digit"}) : "",
              outTime: r.check_out ? new Date(r.check_out).toLocaleTimeString("zh-HK",{hour:"2-digit",minute:"2-digit"}) : "",
              note:  r.note  || "",
              isLate: r.is_late || false,
              id:    r.id,
            };
          });
          setRecords(rec);
        }
      } catch(e) {}
      setLoading(false);
    };
    load();
  }, [curYear, curMonth]);

  // ── Save a cell to Supabase ──
  const saveCell = async (date, empName, form) => {
    const existing = records[date]?.[empName];
    const payload = {
      employee_name: empName,
      date,
      shift:    form.shift,
      site:     form.site,
      check_in:  form.inTime  ? `${date}T${form.inTime}:00+08:00` : null,
      check_out: form.outTime ? `${date}T${form.outTime}:00+08:00` : null,
      note:     form.note,
      is_late:  form.inTime ? (parseInt(form.inTime) > 9 && !form.shift.includes("夜更")) : false,
    };
    try {
      if (existing?.id) {
        await fetch(`${SUPABASE_URL}/rest/v1/attendance?id=eq.${existing.id}`, {
          method: "PATCH",
          headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(`${SUPABASE_URL}/rest/v1/attendance`, {
          method: "POST",
          headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=representation" },
          body: JSON.stringify(payload)
        });
      }
      // Update local state
      setRecords(prev => ({
        ...prev,
        [date]: { ...(prev[date]||{}), [empName]: { ...form, isLate: payload.is_late } }
      }));
      showToast(`✅ ${empName} ${date} 記錄已儲存`, "success");
    } catch(e) {
      showToast("⚠️ 儲存失敗，請重試", "error");
    }
    setEditCell(null);
  };

  // ── Delete a cell ──
  const deleteCell = async (date, empName) => {
    const existing = records[date]?.[empName];
    if (existing?.id) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/attendance?id=eq.${existing.id}`, {
          method: "DELETE",
          headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
        });
      } catch(e) {}
    }
    setRecords(prev => {
      const n = { ...prev };
      if (n[date]) { delete n[date][empName]; }
      return n;
    });
    showToast(`🗑 ${empName} ${date} 記錄已刪除`, "success");
    setEditCell(null);
  };

  // ── Batch fill a whole day ──
  const batchFillDay = async (date, shift, site) => {
    const updates = employees.map(e => ({
      employee_name: e.name, date, shift, site,
      is_late: false,
    }));
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/attendance`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify(updates)
      });
      const dayRec = {};
      employees.forEach(e => { dayRec[e.name] = { shift, site, inTime:"", outTime:"", note:"", isLate:false }; });
      setRecords(prev => ({ ...prev, [date]: { ...(prev[date]||{}), ...dayRec } }));
      showToast(`✅ ${date} 已批量排更 ${employees.length} 人`, "success");
    } catch(e) {
      showToast("⚠️ 批量排更失敗", "error");
    }
  };

  // ── Export ──
  const handleExport = () => {
    const rows = [["日期","員工","更期","工地","簽到","簽退","遲到","備註"]];
    Object.entries(records).sort().forEach(([date, emps]) => {
      Object.entries(emps).forEach(([emp, r]) => {
        rows.push([date, emp, r.shift||"", r.site||"", r.inTime||"", r.outTime||"", r.isLate?"是":"否", r.note||""]);
      });
    });
    const csv = rows.map(r=>r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"}));
    a.download = `考勤月曆_${curYear}年${curMonth+1}月.csv`; a.click();
    showToast("✅ 已導出考勤月曆", "success");
  };

  // ── Edit modal ──
  const openEdit = (date, empName) => {
    const existing = records[date]?.[empName] || {};
    setEditForm({ shift: existing.shift||"早更 07:00–16:00", site: existing.site||"", inTime: existing.inTime||"", outTime: existing.outTime||"", note: existing.note||"" });
    setEditCell({ date, empName });
  };

  // ── Month stats ──
  const monthStats = employees.map(e => {
    let worked=0, late=0, leave=0;
    for (let d=1; d<=daysInMon; d++) {
      const r = records[dateStr(d)]?.[e.name];
      if (!r) continue;
      if (r.shift === "休假" || r.shift === "病假" || r.shift === "事假") leave++;
      else { worked++; if (r.isLate) late++; }
    }
    return { name:e.name, color:e.color, worked, late, leave };
  });

  const navBtn = (label, onClick) => (
    <button onClick={onClick} style={{ background:"#1e2330", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:6, padding:"5px 12px", cursor:"pointer", fontSize:13 }}>{label}</button>
  );

  // ════════════════════════════════════════════════════════
  // MONTH VIEW
  // ════════════════════════════════════════════════════════
  const MonthView = () => {
    const [batchDate, setBatchDate] = useState(null);
    const [batchShift, setBatchShift] = useState("早更 07:00–16:00");
    const [batchSite,  setBatchSite]  = useState("");

    return (
      <div style={{ display:"flex", gap:14 }}>
        {/* Calendar grid */}
        <div style={{ flex:1 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3, marginBottom:4 }}>
            {WEEKDAYS.map(d => (
              <div key={d} style={{ textAlign:"center", fontSize:11, fontWeight:700, color:"#555d6e", padding:"6px 0" }}>{d}</div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
            {/* Empty cells before first day */}
            {Array.from({length: startDow}).map((_,i) => <div key={`e${i}`} />)}
            {/* Day cells */}
            {Array.from({length: daysInMon}).map((_,i) => {
              const day = i+1;
              const ds  = dateStr(day);
              const dayRec = records[ds] || {};
              const count  = Object.keys(dayRec).length;
              const isToday = ds === todayStr;
              const isFuture = ds > todayStr;
              const isSel   = ds === selDate;
              const dow     = new Date(curYear, curMonth, day).getDay();
              const isWeekend = dow === 0 || dow === 6;

              return (
                <div key={day} onClick={() => setSelDate(isSel ? null : ds)}
                  style={{ background: isSel?"#1a2240":isToday?"#1a2030":isWeekend?"#0f1118":"#0d0f12",
                    border: `2px solid ${isSel?"#f0c000":isToday?"#60a5fa":"#1e2330"}`,
                    borderRadius:8, padding:"6px 7px", minHeight:80, cursor:"pointer",
                    position:"relative"
                  }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:700, color: isToday?"#60a5fa":isWeekend?"#9aa0b4":"#e8eaf0" }}>{day}</span>
                    {count>0 && <span style={{ fontSize:10, background:"#f0c00033", color:"#f0c000", borderRadius:10, padding:"1px 6px" }}>{count}人</span>}
                    {isFuture && count===0 && <span style={{ fontSize:9, color:"#3a4255" }}>排更</span>}
                  </div>
                  {/* Shift badges - show up to 3 */}
                  {Object.entries(dayRec).slice(0,3).map(([emp, r]) => {
                    const sc = SHIFT_COLORS[r.shift] || SHIFT_COLORS["早更 07:00–16:00"];
                    return (
                      <div key={emp} style={{ background:sc.bg, border:`1px solid ${sc.border}33`, borderRadius:4, padding:"1px 5px", marginBottom:2, fontSize:9, color:sc.text, overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>
                        {r.isLate && "⚠️"}{emp.slice(0,2)} {r.shift.slice(0,2)}
                      </div>
                    );
                  })}
                  {count > 3 && <div style={{ fontSize:9, color:"#555d6e" }}>+{count-3} 更多</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel: selected day detail or stats */}
        <div style={{ width:280, flexShrink:0 }}>
          {selDate ? (
            <div className="card" style={{ height:"100%" }}>
              <div className="card-header">
                <div className="card-title">📅 {selDate}</div>
                <button onClick={() => setSelDate(null)} style={{ background:"none", border:"none", color:"#9aa0b4", cursor:"pointer", fontSize:16 }}>✕</button>
              </div>
              <div className="card-body" style={{ padding:"8px 12px" }}>
                {/* Batch fill for this day */}
                <div style={{ background:"#0d0f12", border:"1px solid #1e2330", borderRadius:8, padding:"10px", marginBottom:10 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#9aa0b4", marginBottom:6 }}>⚡ 批量排更</div>
                  <select value={batchShift} onChange={e=>setBatchShift(e.target.value)}
                    style={{ width:"100%", background:"#13161c", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:5, padding:"5px 8px", fontSize:11, marginBottom:6 }}>
                    {SHIFT_OPTIONS.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                  <select value={batchSite} onChange={e=>setBatchSite(e.target.value)}
                    style={{ width:"100%", background:"#13161c", border:"1px solid #2a3045", color: batchSite?"#e8eaf0":"#555d6e", borderRadius:5, padding:"5px 8px", fontSize:11, marginBottom:6 }}>
                    <option value="">── 選擇工地（可選）──</option>
                    {activeProjects.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                  <button onClick={() => batchFillDay(selDate, batchShift, batchSite)}
                    style={{ width:"100%", background:"#f0c000", color:"#0d0f12", border:"none", borderRadius:5, padding:"6px 0", fontWeight:700, fontSize:11, cursor:"pointer" }}>
                    分配全部 {employees.length} 人
                  </button>
                </div>

                {/* Per-employee for selected day */}
                <div style={{ maxHeight:420, overflowY:"auto" }}>
                  {employees.map(e => {
                    const r = records[selDate]?.[e.name];
                    const sc = r ? (SHIFT_COLORS[r.shift]||SHIFT_COLORS["早更 07:00–16:00"]) : null;
                    return (
                      <div key={e.name} style={{ display:"flex", alignItems:"center", gap:7, padding:"6px 0", borderBottom:"1px solid #1e2330" }}>
                        <div className="emp-avatar" style={{ background:e.color, width:24, height:24, fontSize:10, flexShrink:0 }}>{e.name[0]}</div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:12, fontWeight:600 }}>{e.name}</div>
                          {r ? (
                            <div style={{ fontSize:10, color:sc.text }}>
                              {r.shift} {r.inTime&&`${r.inTime}→${r.outTime||"?"}`} {r.isLate&&"⚠️遲"}
                            </div>
                          ) : (
                            <div style={{ fontSize:10, color:"#3a4255" }}>未排更</div>
                          )}
                        </div>
                        <button onClick={() => openEdit(selDate, e.name)}
                          style={{ background:"#1e2330", border:"none", color:"#f0c000", borderRadius:5, padding:"3px 8px", fontSize:10, cursor:"pointer" }}>
                          {r ? "✏️" : "+"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            // Monthly stats summary
            <div className="card">
              <div className="card-header"><div className="card-title">📊 本月出勤統計</div></div>
              <div className="card-body" style={{ padding:"8px 12px" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, marginBottom:10 }}>
                  {[
                    {l:"出勤天數",c:"#22c55e",v:k=>k.worked},
                    {l:"遲到",c:"#e05c5c",v:k=>k.late},
                    {l:"請假",c:"#f97316",v:k=>k.leave},
                  ].map((col,ci)=>(
                    <div key={ci} style={{ background:"#0d0f12", border:`1px solid ${col.c}33`, borderRadius:8, padding:"8px", textAlign:"center" }}>
                      <div style={{ fontSize:10, color:"#555d6e", marginBottom:2 }}>{col.l}</div>
                      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:20, fontWeight:800, color:col.c }}>
                        {monthStats.reduce((a,s)=>a+col.v(s),0)}
                      </div>
                    </div>
                  ))}
                </div>
                {monthStats.map(s => (
                  <div key={s.name} style={{ display:"flex", alignItems:"center", gap:7, padding:"5px 0", borderBottom:"1px solid #1e2330" }}>
                    <div className="emp-avatar" style={{ background:s.color, width:22, height:22, fontSize:9 }}>{s.name[0]}</div>
                    <div style={{ flex:1, fontSize:11 }}>{s.name}</div>
                    <span style={{ fontSize:10, color:"#22c55e" }}>{s.worked}天</span>
                    {s.late>0  && <span style={{ fontSize:10, color:"#e05c5c" }}>遲{s.late}</span>}
                    {s.leave>0 && <span style={{ fontSize:10, color:"#f97316" }}>假{s.leave}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════
  // GRID VIEW (員工 × 日期)
  // ════════════════════════════════════════════════════════
  const GridView = () => {
    const days = Array.from({length: daysInMon}, (_,i) => i+1);
    return (
      <div style={{ overflowX:"auto" }}>
        <table style={{ borderCollapse:"collapse", fontSize:11, minWidth: daysInMon*52+160 }}>
          <thead>
            <tr>
              <th style={{ position:"sticky", left:0, background:"#13161c", zIndex:2, minWidth:100, padding:"8px 10px", borderBottom:"2px solid #2a3045", textAlign:"left", color:"#9aa0b4" }}>員工</th>
              {days.map(d => {
                const ds  = dateStr(d);
                const dow = new Date(curYear, curMonth, d).getDay();
                const isW = dow===0||dow===6;
                const isT = ds===todayStr;
                return (
                  <th key={d} style={{ minWidth:48, padding:"6px 3px", borderBottom:"2px solid #2a3045", textAlign:"center", background: isT?"#1a2030":isW?"#0f1118":"#13161c", color: isT?"#60a5fa":isW?"#555d6e":"#9aa0b4" }}>
                    <div style={{ fontSize:10, fontWeight:700 }}>{d}</div>
                    <div style={{ fontSize:9, color:"#3a4255" }}>{WEEKDAYS[dow]}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {employees.map((e, ei) => (
              <tr key={e.name} style={{ background: ei%2===0?"#0d0f12":"#0a0c10" }}>
                {/* Sticky name cell */}
                <td style={{ position:"sticky", left:0, background: ei%2===0?"#0d0f12":"#0a0c10", zIndex:1, padding:"6px 10px", borderRight:"2px solid #2a3045", whiteSpace:"nowrap" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div className="emp-avatar" style={{ background:e.color, width:20, height:20, fontSize:9 }}>{e.name[0]}</div>
                    <span style={{ fontWeight:600, color:"#e8eaf0" }}>{e.name}</span>
                  </div>
                </td>
                {/* Day cells */}
                {days.map(d => {
                  const ds  = dateStr(d);
                  const r   = records[ds]?.[e.name];
                  const sc  = r ? (SHIFT_COLORS[r.shift]||SHIFT_COLORS["早更 07:00–16:00"]) : null;
                  const isT = ds===todayStr;
                  const dow = new Date(curYear, curMonth, d).getDay();
                  const isW = dow===0||dow===6;
                  return (
                    <td key={d} onClick={() => openEdit(ds, e.name)}
                      style={{ padding:"3px", textAlign:"center", cursor:"pointer", border:"1px solid #1a1d24",
                        background: isT?"#0d1525":isW?"#0a0c10":"transparent",
                        verticalAlign:"middle"
                      }}>
                      {r ? (
                        <div style={{ background:sc.bg, border:`1px solid ${sc.border}44`, borderRadius:5, padding:"3px 2px", minHeight:32 }}>
                          <div style={{ fontSize:9, fontWeight:700, color:sc.text, lineHeight:1.2 }}>
                            {r.isLate && "⚠️"}
                            {r.shift==="休假"?"休":r.shift==="病假"?"病":r.shift==="事假"?"事":r.shift.slice(0,1)==="早"?"早":r.shift.slice(0,1)==="夜"?"夜":r.shift.slice(0,1)==="假"?"假":"散"}
                          </div>
                          {r.inTime && <div style={{ fontSize:8, color:sc.text+"99" }}>{r.inTime}</div>}
                        </div>
                      ) : (
                        <div style={{ minHeight:32, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <span style={{ fontSize:14, color:"#2a3045", lineHeight:1 }}>+</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Legend */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:12 }}>
          {Object.entries(SHIFT_COLORS).map(([s,c])=>(
            <div key={s} style={{ display:"flex", alignItems:"center", gap:4, background:c.bg, border:`1px solid ${c.border}44`, borderRadius:6, padding:"3px 8px" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:c.border }} />
              <span style={{ fontSize:10, color:c.text }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Edit Modal ──
  const EditModal = () => {
    if (!editCell) return null;
    const { date, empName } = editCell;
    const hasRecord = !!records[date]?.[empName];
    return (
      <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}
        onClick={e => e.target === e.currentTarget && setEditCell(null)}>
        <div style={{ background:"#13161c", border:"1px solid #2a3045", borderRadius:12, padding:24, width:360, maxWidth:"90vw" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:16, color:"#e8eaf0" }}>{empName}</div>
              <div style={{ fontSize:12, color:"#9aa0b4" }}>{date}</div>
            </div>
            <button onClick={()=>setEditCell(null)} style={{ background:"none", border:"none", color:"#9aa0b4", cursor:"pointer", fontSize:20 }}>✕</button>
          </div>

          {/* Form fields */}
          {[
            { label:"更期", key:"shift", type:"select", opts: SHIFT_OPTIONS },
            { label:"工地", key:"site",  type:"select", opts: ["", ...activeProjects.map(p=>p.name)], placeholder:"── 選擇工地 ──" },
            { label:"簽到時間", key:"inTime",  type:"time" },
            { label:"簽退時間", key:"outTime", type:"time" },
            { label:"備註",    key:"note",    type:"text", placeholder:"例：半日工、特別任務..." },
          ].map(f => (
            <div key={f.key} style={{ marginBottom:12 }}>
              <div style={{ fontSize:11, color:"#9aa0b4", marginBottom:4 }}>{f.label}</div>
              {f.type==="select" ? (
                <select value={editForm[f.key]||""} onChange={e=>setEditForm(p=>({...p,[f.key]:e.target.value}))}
                  style={{ width:"100%", background:"#0d0f12", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:7, padding:"8px 10px", fontSize:13 }}>
                  {f.opts.map(o=><option key={o} value={o}>{o||f.placeholder}</option>)}
                </select>
              ) : (
                <input type={f.type} value={editForm[f.key]||""} onChange={e=>setEditForm(p=>({...p,[f.key]:e.target.value}))}
                  placeholder={f.placeholder||""} style={{ width:"100%", background:"#0d0f12", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:7, padding:"8px 10px", fontSize:13, boxSizing:"border-box" }} />
              )}
            </div>
          ))}

          {/* Shift color preview */}
          {editForm.shift && SHIFT_COLORS[editForm.shift] && (
            <div style={{ background:SHIFT_COLORS[editForm.shift].bg, border:`1px solid ${SHIFT_COLORS[editForm.shift].border}`, borderRadius:7, padding:"6px 12px", marginBottom:14, fontSize:11, color:SHIFT_COLORS[editForm.shift].text }}>
              預覽：{editForm.shift} {editForm.inTime&&`${editForm.inTime} → ${editForm.outTime||"?"}`}
            </div>
          )}

          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => saveCell(date, empName, editForm)}
              style={{ flex:1, background:"#f0c000", color:"#0d0f12", border:"none", borderRadius:7, padding:"10px 0", fontWeight:700, fontSize:13, cursor:"pointer" }}>
              ✅ 儲存
            </button>
            {hasRecord && (
              <button onClick={() => { if(window.confirm(`確定刪除 ${empName} ${date} 的記錄？`)) deleteCell(date, empName); }}
                style={{ background:"#2a1010", color:"#e05c5c", border:"1px solid #e05c5c44", borderRadius:7, padding:"10px 14px", cursor:"pointer", fontSize:13 }}>
                🗑
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════
  // MAIN RENDER
  // ════════════════════════════════════════════════════════
  return (
    <div>
      {/* ── Header controls ── */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, flexWrap:"wrap" }}>
        {/* Month nav */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {navBtn("◀", () => { if(curMonth===0){setCurMonth(11);setCurYear(y=>y-1);}else setCurMonth(m=>m-1); })}
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:22, fontWeight:700, color:"#e8eaf0", minWidth:130, textAlign:"center" }}>
            {curYear}年 {curMonth+1}月
          </div>
          {navBtn("▶", () => { if(curMonth===11){setCurMonth(0);setCurYear(y=>y+1);}else setCurMonth(m=>m+1); })}
          <button onClick={()=>{setCurYear(now.getFullYear());setCurMonth(now.getMonth());}} style={{ background:"#1e2330", border:"1px solid #f0c00044", color:"#f0c000", borderRadius:6, padding:"5px 10px", cursor:"pointer", fontSize:11 }}>今月</button>
        </div>

        {/* View toggle */}
        <div style={{ display:"flex", gap:6, background:"#0d0f12", border:"1px solid #1e2330", borderRadius:8, padding:3 }}>
          {[{v:"month",l:"📅 月曆"},{v:"grid",l:"⊞ 員工表"}].map(btn=>(
            <button key={btn.v} onClick={()=>setViewMode(btn.v)} style={{ padding:"5px 14px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:600, fontSize:12, background:viewMode===btn.v?"#f0c000":"transparent", color:viewMode===btn.v?"#0d0f12":"#8891a4" }}>
              {btn.l}
            </button>
          ))}
        </div>

        <div style={{ flex:1 }} />

        {/* Export */}
        <button onClick={handleExport} style={{ background:"transparent", border:"1px solid #f0c000", color:"#f0c000", borderRadius:6, padding:"5px 14px", cursor:"pointer", fontSize:12, fontWeight:600 }}>
          📥 導出 CSV
        </button>
      </div>

      {/* ── KPI Strip ── */}
      <div className="kpi-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:14 }}>
        {[
          { l:"本月出勤總天數", v: monthStats.reduce((a,s)=>a+s.worked,0), c:"#22c55e" },
          { l:"遲到記錄",       v: monthStats.reduce((a,s)=>a+s.late,0),   c:"#e05c5c" },
          { l:"請假天數",       v: monthStats.reduce((a,s)=>a+s.leave,0),  c:"#f97316" },
          { l:"已排更人次",     v: Object.values(records).reduce((a,d)=>a+Object.keys(d).length,0), c:"#a78bfa" },
        ].map((k,i)=>(
          <div key={i} style={{ background:"#13161c", border:`1px solid ${k.c}33`, borderRadius:10, padding:"10px 14px" }}>
            <div style={{ fontSize:10, color:"#3a4255", textTransform:"uppercase", marginBottom:4 }}>{k.l}</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:22, fontWeight:800, color:k.c }}>{loading?"…":k.v}</div>
          </div>
        ))}
      </div>

      {/* ── Main view ── */}
      {loading ? (
        <div style={{ textAlign:"center", padding:60, color:"#9aa0b4" }}>📅 載入考勤記錄中...</div>
      ) : viewMode==="month" ? <MonthView /> : <GridView />}

      {/* ── Edit Modal ── */}
      <EditModal />
    </div>
  );
}

function Attendance({ showToast, employees = EMPLOYEES, projects = INITIAL_PROJECTS }) {
  const today = new Date().toLocaleDateString("zh-HK", { year: "numeric", month: "long", day: "numeric", weekday: "short" });
  const now = new Date();
  const LATE_HOUR = 9; // 09:00 為遲到分界
  const SHIFTS = ["早更 (07:00–16:00)", "夜更 (16:00–01:00)", "假日更", "散工"];

  // ── State ──
  const [empSite,      setEmpSite]      = useState(() => employees.map(() => null));
  const [empShift,     setEmpShift]     = useState(() => employees.map(() => SHIFTS[0]));
  const [checkedIn,    setCheckedIn]    = useState(() => employees.map(() => false));
  const [checkedOut,   setCheckedOut]   = useState(() => employees.map(() => false));
  const [checkInTime,  setCheckInTime]  = useState(() => employees.map(() => null));
  const [checkOutTime, setCheckOutTime] = useState(() => employees.map(() => null));
  const [viewMode,     setViewMode]     = useState("employee");
  const [activeTab,    setActiveTab]    = useState("today"); // "today" | "shift" | "monthly"
  const [selectedSiteView, setSelectedSiteView] = useState(null);
  const [monthYear,    setMonthYear]    = useState({ y: now.getFullYear(), m: now.getMonth()+1 });

  const activeProjects = projects.filter(p => p.phase === "active" || p.phase === "pending");

  // ── Helpers ──
  const calcHours = (inT, outT) => {
    if (!inT || !outT) return null;
    const [ih, im] = inT.split(":").map(Number);
    const [oh, om] = outT.split(":").map(Number);
    const mins = (oh * 60 + om) - (ih * 60 + im);
    if (mins <= 0) return null;
    const h = Math.floor(mins / 60), m = mins % 60;
    return `${h}h ${m}m`;
  };

  const isLate = (inT, shift) => {
    if (!inT) return false;
    if (shift && shift.includes("夜更")) return false; // 夜更唔計遲到
    const [h, m] = inT.split(":").map(Number);
    return h > LATE_HOUR || (h === LATE_HOUR && m > 0);
  };

  const getStatus = (i) => {
    if (checkedOut[i]) return { label: `已離場 ${checkOutTime[i]}`, badge: "green", color: "#22c55e" };
    if (checkedIn[i])  return { label: `在場 ${checkInTime[i]}${isLate(checkInTime[i], empShift[i]) ? " ⚠️遲" : ""}`, badge: isLate(checkInTime[i], empShift[i]) ? "yellow" : "green", color: isLate(checkInTime[i], empShift[i]) ? "#f0c000" : "#22c55e" };
    if (empSite[i])    return { label: "已分配", badge: "yellow", color: "#f0c000" };
    return { label: "未分配", badge: "red", color: "#e05c5c" };
  };

  // ── Handlers ──
  const handleAssignSite = (i, site) => {
    const u = [...empSite]; u[i] = site; setEmpSite(u);
    showToast(`📍 ${employees[i].name} → 「${site}」`);
  };

  const handleAssignShift = (i, shift) => {
    const u = [...empShift]; u[i] = shift; setEmpShift(u);
  };

  const handleCheckIn = async (i) => {
    if (!empSite[i]) { showToast("⚠️ 請先選擇工地", "error"); return; }
    const t = new Date().toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" });
    const u = [...checkedIn]; u[i] = true; setCheckedIn(u);
    const ts = [...checkInTime]; ts[i] = t; setCheckInTime(ts);
    const late = isLate(t, empShift[i]);
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/attendance`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ employee_id: employees[i].id, employee_name: employees[i].name, site: empSite[i], shift: empShift[i], check_in: new Date().toISOString(), is_late: late, date: new Date().toISOString().slice(0,10) })
      });
    } catch(e) {}
    showToast(`✅ ${employees[i].name} 已簽到${late ? " — ⚠️ 遲到記錄" : ""}`, late ? "error" : "success");
  };

  const handleCheckOut = async (i) => {
    const t = new Date().toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" });
    const u = [...checkedOut]; u[i] = true; setCheckedOut(u);
    const ts = [...checkOutTime]; ts[i] = t; setCheckOutTime(ts);
    const hrs = calcHours(checkInTime[i], t);
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/attendance?employee_name=eq.${encodeURIComponent(employees[i].name)}&date=eq.${new Date().toISOString().slice(0,10)}&order=check_in.desc&limit=1`, {
        method: "PATCH",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ check_out: new Date().toISOString(), hours_worked: hrs })
      });
    } catch(e) {}
    showToast(`🏁 ${employees[i].name} 已簽退 — 工時 ${hrs || "計算中"}`, "success");
  };

  const handleBatchAssign = (site, shift) => {
    setEmpSite(employees.map(() => site));
    setEmpShift(employees.map(() => shift));
    showToast(`✅ 已批量分配 ${employees.length} 人 → 「${site}」${shift}`);
  };

  const handleExportCSV = () => {
    const rows = [["員工","職位","更期","工地","簽到","簽退","工時","遲到","日期"]];
    employees.forEach((e, i) => {
      const late = isLate(checkInTime[i], empShift[i]) ? "是" : "否";
      const hrs = calcHours(checkInTime[i], checkOutTime[i]) || "—";
      rows.push([e.name, e.role, empShift[i]||"—", empSite[i]||"未分配", checkInTime[i]||"—", checkOutTime[i]||"—", hrs, late, new Date().toLocaleDateString('zh-HK')]);
    });
    const csv = rows.map(r=>r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF"+csv], {type:"text/csv;charset=utf-8;"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `考勤記錄_${monthYear.y}年${monthYear.m}月.csv`; a.click();
    showToast("✅ 考勤報表已導出", "success");
  };

  // ── Computed ──
  const siteGroups = {};
  activeProjects.forEach(p => { siteGroups[p.name] = []; });
  employees.forEach((e, i) => { if (empSite[i] && siteGroups[empSite[i]] !== undefined) siteGroups[empSite[i]].push({ ...e, idx:i, checkedIn:checkedIn[i], checkedOut:checkedOut[i], time:checkInTime[i], outTime:checkOutTime[i], shift:empShift[i] }); });
  const unassigned = employees.filter((_, i) => !empSite[i]);
  const totalIn    = checkedIn.filter(Boolean).length;
  const totalOut   = checkedOut.filter(Boolean).length;
  const lateCount  = employees.filter((_, i) => checkedIn[i] && isLate(checkInTime[i], empShift[i])).length;
  const focusSite  = selectedSiteView || empSite.find(s => s) || activeProjects[0]?.name;
  const focusGPS   = SITE_GPS[focusSite] || { lat: "22.3193", lng: "114.1694" };
  const focusCount = focusSite ? (siteGroups[focusSite]?.length || 0) : 0;

  const kpiStyle = (color) => ({ background:"#13161c", border:`1px solid ${color}33`, borderRadius:10, padding:"12px 16px" });
  const tabBtn   = (t, label) => (
    <button onClick={() => setActiveTab(t)} style={{ padding:"6px 16px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:600, fontSize:12, background: activeTab===t ? "#f0c000" : "#1e2330", color: activeTab===t ? "#0d0f12" : "#8891a4" }}>{label}</button>
  );

  return (
    <div>
      {/* ── KPI Strip ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10, marginBottom:14 }}>
        {[
          { label:"今日簽到", value:`${totalIn}/${employees.length}`, color:"#22c55e" },
          { label:"已簽退", value:totalOut, color:"#60a5fa" },
          { label:"在場中", value:totalIn-totalOut, color:"#f0c000" },
          { label:"遲到記錄", value:lateCount, color: lateCount>0 ? "#e05c5c" : "#3a4255" },
          { label:"活躍地盤", value:activeProjects.length, color:"#a78bfa" },
        ].map((k,i) => (
          <div key={i} style={kpiStyle(k.color)}>
            <div style={{ fontSize:10, color:"#3a4255", textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>{k.label}</div>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:22, fontWeight:800, color:k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* ── Late Alert ── */}
      {lateCount > 0 && (
        <div style={{ background:"#2a1010", border:"1px solid #e05c5c", borderRadius:8, padding:"10px 16px", marginBottom:12, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:18 }}>⚠️</span>
          <div style={{ flex:1 }}>
            <strong style={{ color:"#e05c5c" }}>今日遲到記錄：</strong>
            <span style={{ fontSize:13, color:"#c8d0e0" }}>
              {employees.filter((_,i) => checkedIn[i] && isLate(checkInTime[i], empShift[i])).map((e,_,i) => `${e.name}（${checkInTime[employees.indexOf(e)]}）`).join("、")}
            </span>
          </div>
        </div>
      )}

      {/* ── Tab Bar ── */}
      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
        {tabBtn("today", "📋 今日考勤")}
        {tabBtn("shift", "🔄 員工報更")}
        {tabBtn("monthly", "📊 月度報表")}
        <div style={{ flex:1 }} />
        <button onClick={handleExportCSV} style={{ padding:"6px 14px", borderRadius:6, border:"1px solid #f0c000", cursor:"pointer", fontWeight:600, fontSize:12, background:"transparent", color:"#f0c000" }}>
          📥 導出 CSV
        </button>
      </div>

      {/* ══ TAB: 今日考勤 ══ */}
      {activeTab === "today" && (
        <div className="grid-2">
          {/* Left */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">👷 員工簽到／簽退</div>
              <div style={{ fontSize:11, color:"#9aa0b4" }}>{today}</div>
            </div>
            <div className="card-body" style={{ padding:"8px 14px", maxHeight:560, overflowY:"auto" }}>
              {employees.map((e, i) => {
                const s = getStatus(i);
                const hrs = calcHours(checkInTime[i], checkOutTime[i]);
                return (
                  <div key={i} style={{ background:"#0d0f12", border:`1px solid ${checkedIn[i] ? "#1e3a1e" : "#1e2330"}`, borderRadius:10, padding:"11px 13px", marginBottom:9 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:9 }}>
                      <div className="emp-avatar" style={{ background:e.color }}>{e.name[0]}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:700, fontSize:14 }}>{e.name}</div>
                        <div style={{ fontSize:11, color:"#555d6e" }}>{e.role}</div>
                      </div>
                      <span className={`badge ${s.badge}`} style={{ fontSize:11 }}><span className="badge-dot" />{s.label}</span>
                    </div>

                    {/* Site + Shift selectors */}
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:8 }}>
                      <select value={empSite[i]||""} onChange={ev => handleAssignSite(i, ev.target.value)} disabled={checkedIn[i]}
                        style={{ background:"#13161c", border:"1px solid #2a3045", color: empSite[i]?"#e8eaf0":"#555d6e", borderRadius:6, padding:"6px 8px", fontSize:11, cursor: checkedIn[i]?"not-allowed":"pointer" }}>
                        <option value="">── 選擇工地 ──</option>
                        {activeProjects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                      </select>
                      <select value={empShift[i]} onChange={ev => handleAssignShift(i, ev.target.value)} disabled={checkedIn[i]}
                        style={{ background:"#13161c", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:6, padding:"6px 8px", fontSize:11, cursor: checkedIn[i]?"not-allowed":"pointer" }}>
                        {SHIFTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    {/* GPS */}
                    {empSite[i] && SITE_GPS[empSite[i]] && (
                      <div style={{ fontSize:10, color:"#3a4255", marginBottom:7 }}>📍 {SITE_GPS[empSite[i]].lat}°N {SITE_GPS[empSite[i]].lng}°E</div>
                    )}

                    {/* Work hours display */}
                    {checkedIn[i] && (
                      <div style={{ display:"flex", gap:8, marginBottom:8, flexWrap:"wrap" }}>
                        <div style={{ background:"#0a1a0a", borderRadius:6, padding:"4px 10px", fontSize:11 }}>
                          🕐 簽到：<strong style={{ color:"#22c55e" }}>{checkInTime[i]}</strong>
                          {isLate(checkInTime[i], empShift[i]) && <span style={{ color:"#e05c5c", marginLeft:4 }}>遲到</span>}
                        </div>
                        {checkedOut[i] && (
                          <>
                            <div style={{ background:"#0a0a1a", borderRadius:6, padding:"4px 10px", fontSize:11 }}>
                              🏁 簽退：<strong style={{ color:"#60a5fa" }}>{checkOutTime[i]}</strong>
                            </div>
                            <div style={{ background:"#1a1510", borderRadius:6, padding:"4px 10px", fontSize:11 }}>
                              ⏱ 工時：<strong style={{ color:"#f0c000" }}>{hrs}</strong>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div style={{ display:"flex", gap:6 }}>
                      {!checkedIn[i] && (
                        <button onClick={() => handleCheckIn(i)} style={{ flex:1, background: empSite[i]?"#f0c000":"#1e2330", color: empSite[i]?"#0d0f12":"#555d6e", border:"none", borderRadius:6, padding:"7px 0", fontWeight:700, fontSize:12, cursor: empSite[i]?"pointer":"not-allowed" }}>
                          📍 確認簽到
                        </button>
                      )}
                      {checkedIn[i] && !checkedOut[i] && (
                        <button onClick={() => handleCheckOut(i)} style={{ flex:1, background:"#1a2a4a", color:"#60a5fa", border:"1px solid #60a5fa44", borderRadius:6, padding:"7px 0", fontWeight:700, fontSize:12, cursor:"pointer" }}>
                          🏁 確認簽退
                        </button>
                      )}
                      {checkedOut[i] && (
                        <div style={{ flex:1, background:"#0a1a0a", border:"1px solid #22c55e44", borderRadius:6, padding:"7px 0", fontWeight:600, fontSize:12, color:"#22c55e", textAlign:"center" }}>
                          ✅ 已完成
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: GPS + Site View */}
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div className="card">
              <div className="card-header">
                <div className="card-title">📍 GPS 地盤定位</div>
                <span className="badge green"><span className="badge-dot" />系統運行中</span>
              </div>
              <div className="card-body">
                <div className="gps-map-mock">
                  <div className="map-grid" /><div className="map-circle" /><div className="map-dot" />
                  <div className="map-label">{focusSite||"請選擇地盤"}</div>
                  <div className="map-coords">{focusGPS.lat}°N {focusGPS.lng}°E</div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                  {[{l:"容許半徑",v:"150 m",c:"#f0c000"},{l:"在場人數",v:`${focusCount} 人`,c:"#22c55e"}].map((k,i)=>(
                    <div key={i} style={{ background:"#0d0f12", borderRadius:8, padding:"10px 14px", border:"1px solid #1e2330" }}>
                      <div style={{ fontSize:10, color:"#3a4255", textTransform:"uppercase", marginBottom:4 }}>{k.l}</div>
                      <div style={{ fontFamily:"'Barlow Condensed'", fontSize:20, fontWeight:700, color:k.c }}>{k.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ maxHeight:160, overflowY:"auto" }}>
                  {activeProjects.map(p => (
                    <div key={p.id} onClick={() => setSelectedSiteView(p.name)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 10px", borderRadius:6, marginBottom:4, cursor:"pointer", background: selectedSiteView===p.name?"#1a1f2e":"#0d0f12", border:`1px solid ${selectedSiteView===p.name?"#f0c000":"#1e2330"}` }}>
                      <div style={{ fontSize:11, fontWeight:600 }}>{p.name}</div>
                      <div style={{ fontSize:10, color:"#3a4255" }}>{SITE_GPS[p.name]?`${SITE_GPS[p.name].lat}, ${SITE_GPS[p.name].lng}`:"未設定"}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Site view mini */}
            <div className="card" style={{ flex:1 }}>
              <div className="card-header"><div className="card-title">🏗 各地盤人員</div></div>
              <div className="card-body" style={{ padding:"8px 14px", maxHeight:220, overflowY:"auto" }}>
                {activeProjects.map(p => {
                  const ppl = siteGroups[p.name]||[];
                  return (
                    <div key={p.id} style={{ background:"#0d0f12", border:"1px solid #1e2330", borderRadius:8, padding:"9px 12px", marginBottom:8 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                        <div style={{ fontWeight:700, fontSize:12 }}>{p.name}</div>
                        <span className={`badge ${ppl.length>0?"green":"red"}`}><span className="badge-dot" />{ppl.length} 人</span>
                      </div>
                      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                        {ppl.map((emp,j) => (
                          <div key={j} style={{ display:"flex", alignItems:"center", gap:4, background:"#13161c", borderRadius:20, padding:"2px 8px" }}>
                            <div style={{ width:16, height:16, borderRadius:"50%", background:emp.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:700, color:"#0d0f12" }}>{emp.name[0]}</div>
                            <span style={{ fontSize:10, color: emp.checkedOut?"#60a5fa":emp.checkedIn?"#22c55e":"#f0c000" }}>{emp.name}</span>
                            <span style={{ fontSize:9, color:"#3a4255" }}>{emp.checkedOut?`出${emp.outTime}`:emp.time||""}</span>
                          </div>
                        ))}
                        {ppl.length===0 && <div style={{ fontSize:11, color:"#3a4255" }}>暫無人員</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ TAB: 員工報更 ══ */}
      {activeTab === "shift" && (
        <div>
          {/* Batch assign */}
          <div className="card" style={{ marginBottom:12 }}>
            <div className="card-header"><div className="card-title">⚡ 批量報更</div></div>
            <div className="card-body" style={{ padding:"12px 16px" }}>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"flex-end" }}>
                <div style={{ flex:2, minWidth:180 }}>
                  <div style={{ fontSize:11, color:"#9aa0b4", marginBottom:4 }}>工地</div>
                  <select id="batchSite" style={{ width:"100%", background:"#13161c", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:6, padding:"8px 10px", fontSize:12 }}>
                    <option value="">── 選擇工地 ──</option>
                    {activeProjects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>
                <div style={{ flex:1, minWidth:140 }}>
                  <div style={{ fontSize:11, color:"#9aa0b4", marginBottom:4 }}>更期</div>
                  <select id="batchShift" style={{ width:"100%", background:"#13161c", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:6, padding:"8px 10px", fontSize:12 }}>
                    {SHIFTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <button onClick={() => {
                  const site  = document.getElementById("batchSite").value;
                  const shift = document.getElementById("batchShift").value;
                  if (!site) { showToast("⚠️ 請選擇工地", "error"); return; }
                  handleBatchAssign(site, shift);
                }} style={{ background:"#f0c000", color:"#0d0f12", border:"none", borderRadius:6, padding:"8px 20px", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                  ✅ 批量分配全員
                </button>
              </div>
            </div>
          </div>

          {/* Individual shift table */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">📋 個人報更管理</div>
              <div style={{ fontSize:11, color:"#9aa0b4" }}>{today}</div>
            </div>
            <div className="card-body" style={{ padding:0 }}>
              <table className="data-table">
                <thead>
                  <tr><th>員工</th><th>職位</th><th>更期</th><th>工地</th><th>簽到</th><th>簽退</th><th>工時</th><th>狀態</th></tr>
                </thead>
                <tbody>
                  {employees.map((e, i) => {
                    const s = getStatus(i);
                    const hrs = calcHours(checkInTime[i], checkOutTime[i]);
                    return (
                      <tr key={i}>
                        <td className="td-name">
                          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                            <div className="emp-avatar" style={{ background:e.color, width:24, height:24, fontSize:10 }}>{e.name[0]}</div>
                            {e.name}
                          </div>
                        </td>
                        <td style={{ fontSize:11 }}>{e.role}</td>
                        <td>
                          <select value={empShift[i]} onChange={ev => handleAssignShift(i, ev.target.value)} disabled={checkedIn[i]}
                            style={{ background:"#13161c", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:5, padding:"4px 6px", fontSize:11, cursor: checkedIn[i]?"not-allowed":"pointer", maxWidth:130 }}>
                            {SHIFTS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td style={{ fontSize:11, color: empSite[i]?"#f0c000":"#3a4255" }}>{empSite[i]||"未分配"}</td>
                        <td style={{ color:"#22c55e", fontSize:12 }}>{checkInTime[i]||"—"}{isLate(checkInTime[i],empShift[i])&&<span style={{color:"#e05c5c",fontSize:10}}> ⚠️</span>}</td>
                        <td style={{ color:"#60a5fa", fontSize:12 }}>{checkOutTime[i]||"—"}</td>
                        <td style={{ color:"#f0c000", fontWeight:600, fontSize:12 }}>{hrs||"—"}</td>
                        <td><span className={`badge ${s.badge}`} style={{fontSize:10}}><span className="badge-dot" />{s.label}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shift legend */}
          <div style={{ marginTop:12, display:"flex", gap:10, flexWrap:"wrap" }}>
            {[
              { shift:"早更 (07:00–16:00)", note:"遲到基準：09:00", color:"#22c55e" },
              { shift:"夜更 (16:00–01:00)", note:"不計遲到", color:"#60a5fa" },
              { shift:"假日更", note:"假日加班", color:"#f0c000" },
              { shift:"散工", note:"按日計算", color:"#a78bfa" },
            ].map((s,i) => (
              <div key={i} style={{ background:"#13161c", border:`1px solid ${s.color}33`, borderRadius:8, padding:"8px 14px" }}>
                <div style={{ fontWeight:600, fontSize:12, color:s.color }}>{s.shift}</div>
                <div style={{ fontSize:10, color:"#555d6e", marginTop:2 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ TAB: 月度報表 ══ */}
      {activeTab === "monthly" && (
        <div>
          <div style={{ display:"flex", gap:10, marginBottom:14, alignItems:"center" }}>
            <select value={monthYear.y} onChange={e=>setMonthYear(p=>({...p,y:+e.target.value}))} style={{ background:"#13161c", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:6, padding:"6px 10px", fontSize:12 }}>
              {[2024,2025,2026].map(y=><option key={y} value={y}>{y}年</option>)}
            </select>
            <select value={monthYear.m} onChange={e=>setMonthYear(p=>({...p,m:+e.target.value}))} style={{ background:"#13161c", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:6, padding:"6px 10px", fontSize:12 }}>
              {Array.from({length:12},(_,i)=><option key={i+1} value={i+1}>{i+1}月</option>)}
            </select>
            <button onClick={handleExportCSV} style={{ background:"#f0c000", color:"#0d0f12", border:"none", borderRadius:6, padding:"6px 18px", fontWeight:700, fontSize:12, cursor:"pointer" }}>
              📥 導出 Excel（CSV）
            </button>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">📊 {monthYear.y}年{monthYear.m}月 出勤彙總</div>
              <div style={{ fontSize:11, color:"#9aa0b4" }}>連結薪酬核算</div>
            </div>
            <div className="card-body" style={{ padding:0 }}>
              <table className="data-table">
                <thead>
                  <tr><th>員工</th><th>職位</th><th>日薪</th><th>應出勤</th><th>實際出勤</th><th>遲到次數</th><th>總工時</th><th>月薪試算</th><th>出勤率</th></tr>
                </thead>
                <tbody>
                  {employees.map((e, i) => {
                    const worked = e.days || 22;
                    const shouldWork = 23;
                    const late = checkedIn[i] && isLate(checkInTime[i], empShift[i]) ? 1 : 0;
                    const rate = Math.round((worked/shouldWork)*100);
                    const totalHrs = worked * 8;
                    const salary = worked * (e.rate||0);
                    return (
                      <tr key={i}>
                        <td className="td-name">
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <div className="emp-avatar" style={{ background:e.color, width:24, height:24, fontSize:10 }}>{e.name[0]}</div>
                            {e.name}
                          </div>
                        </td>
                        <td style={{ fontSize:11 }}>{e.role}</td>
                        <td>HK${(e.rate||0).toLocaleString()}</td>
                        <td>{shouldWork} 天</td>
                        <td style={{ color:"#22c55e", fontWeight:600 }}>{worked} 天</td>
                        <td style={{ color: late>0?"#e05c5c":"#3a4255" }}>{late} 次</td>
                        <td style={{ color:"#f0c000" }}>{totalHrs}h</td>
                        <td className="td-amount">HK${salary.toLocaleString()}</td>
                        <td>
                          <span className={`badge ${rate>=90?"green":rate>=75?"yellow":"red"}`}>
                            <span className="badge-dot" />{rate}%
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
      )}
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
    <div class="co">巨揚工程有限公司</div><br/>
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

  // Load all invoices with pagination (Supabase default limit = 1000, we paginate to get all)
  const loadCFList = async () => {
    setLoading(true);
    try {
      const fetchPage = async (from, to) => {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/invoices?select=*,projects(name)&order=cf_num.asc.nullslast`,
          { headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Range-Unit": "items",
            "Range": `${from}-${to}`
          } }
        );
        return res.json();
      };
      // Fetch page 1 (0–999) and page 2 (1000–1999) in parallel
      const [page1, page2] = await Promise.all([fetchPage(0, 999), fetchPage(1000, 1999)]);
      const data = [...(Array.isArray(page1)?page1:[]), ...(Array.isArray(page2)?page2:[])];
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
  const MAKE_WEBHOOK_DEADLINE = ""; // 留空直到設定 WhatsApp API

  const [cfDeadlineAlerts, setCfDeadlineAlerts] = useState([]);
  const [notifiedCFs, setNotifiedCFs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("notifiedCFs") || "{}"); } catch { return {}; }
  });

  const sendCFDeadlineWhatsApp = async (inv, auto = false) => {
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
          sendCFDeadlineWhatsApp(inv, true);
          const updated = { ...notifiedCFs, [key]: true };
          setNotifiedCFs(updated);
          try { localStorage.setItem("notifiedCFs", JSON.stringify(updated)); } catch {}
        }
      }
    });
    setCfDeadlineAlerts(alerts);
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
      {cfDeadlineAlerts.length > 0 && (
        <div style={{ background:"rgba(239,68,68,0.08)", border:"1.5px solid #EF4444", borderRadius:10, padding:12, marginBottom:14 }}>
          <div style={{ fontFamily:"'Barlow Condensed'", fontSize:14, fontWeight:700, color:"#EF4444", marginBottom:10 }}>
            🔴 即將到期工程 — {cfDeadlineAlerts.length} 個
          </div>
          {cfDeadlineAlerts.map(inv => {
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
                  <button onClick={() => sendCFDeadlineWhatsApp(inv)}
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
                          <button onClick={() => sendCFDeadlineWhatsApp(item)}
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
    <div class="header"><div><h2>員工文件存檔</h2><div style="font-size:12px;color:#666">巨揚工程有限公司</div></div><div style="text-align:right;font-size:12px;color:#666">列印日期：${today}</div></div>
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
  const [navOpen, setNavOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [projects, setProjectsState] = useState(INITIAL_PROJECTS);
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [dbStatus, setDbStatus] = useState("loading");
  const [loadMsg, setLoadMsg] = useState("連接 Supabase...");
  const [deadlineAlerts, setDeadlineAlerts] = useState([]);

  // ── WhatsApp deadline notification via Make webhook ──
  const MAKE_WEBHOOK = ""; // 留空直到設定 WhatsApp API
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
        if (MAKE_WEBHOOK) try {
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
    projects:  { icon: "🔧", title: "工程管理", sub: "新增 / 篩選 / 搜尋" },
    staff:     { icon: "👷", title: "員工管理", sub: "人員 / PIN / 薪酬" },
    safety: { icon: "✅", title: "安全條款", sub: "電子簽署" },
    attendance: { icon: "📍", title: "GPS 考勤", sub: "管理" },
    calendar:    { icon: "📆", title: "考勤月曆",   sub: "排更 / 補登 / 月覽" },
    "company-cal": { icon: "📆", title: "公司月曆",   sub: "工程 / 請款 / 排更 / 會議" },
    "qr-codes":    { icon: "📲", title: "員工報更QR", sub: "生成每位員工專屬報更連結" },
    "msg-center": { icon: "✉️", title: "訊息發送中心", sub: "WhatsApp 發送安全守則 / 報更 / 出糧通知" },
    progress: { icon: "📊", title: "施工進度", sub: "回報與預警" },
    invoice: { icon: "📋", title: "自動請款", sub: "上單系統" },
    payroll: { icon: "💼", title: "薪酬核算", sub: "自動計算" },
    empdocs: { icon: "📁", title: "員工文件", sub: "綠卡 / ID / 住址證明" },
    profit: { icon: "📈", title: "報價利潤", sub: "試算工具" },
    tax: { icon: "🧾", title: "老闆稅務", sub: "計算器（香港有限公司）" },
  };

  const pt = PAGE_TITLES[active] || { icon: "📋", title: active, sub: "" };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="hamburger" onClick={() => setNavOpen(o => !o)}>☰</div>
        <div className={"sidebar-overlay" + (navOpen ? " open" : "")} onClick={() => setNavOpen(false)} />
        <div className={"sidebar" + (navOpen ? " open" : "")}>
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
                onClick={() => { setActive(item.id); setNavOpen(false); }}
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
                <ProjectManager projects={projects} setProjects={setProjects} showToast={showToast} onAdd={addProjectToDB} onUpdate={updateProjectInDB} onDelete={deleteProjectFromDB} dbConnected={dbStatus === "connected"} />
              </>
            )}
            {active === "staff"   && <StaffManagement employees={employees} setEmployees={setEmployees} showToast={showToast} />}
            {active === "empdocs" && <EmployeeDocs showToast={showToast} employees={employees} />}
            {active === "safety" && <Safety showToast={showToast} employees={employees} />}
            {active === "attendance" && <Attendance showToast={showToast} employees={employees} projects={projects} />}
            {active === "calendar"    && <AttendanceCalendar showToast={showToast} employees={employees} projects={projects} />}
            {active === "company-cal" && <CompanyCalendar showToast={showToast} employees={employees} projects={projects} />}
            {active === "qr-codes"   && <QRCodesPage employees={employees} />}
            {active === "msg-center" && <MessageCenter employees={employees} showToast={showToast} />}
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
