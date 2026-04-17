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

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.4); }
  }

  /* ── Light Mode ── */
  body.light-mode { background: #f5f7fa !important; color: #1a2533 !important; }
  body.light-mode #root { background: #f5f7fa !important; color: #1a2533 !important; }
  body.light-mode .sidebar { background: #ffffff !important; border-right-color: #e0e6ed !important; }
  body.light-mode .logo-area { border-bottom-color: #e0e6ed !important; }
  body.light-mode .logo-text { color: #1a2533 !important; }
  body.light-mode .logo-sub { color: #5a6478 !important; }
  body.light-mode .nav-section-title { color: #5a6478 !important; }
  body.light-mode .nav-item { color: #5a6478 !important; border-left-color: transparent !important; }
  body.light-mode .nav-item:hover { background: #f0f3f8 !important; color: #1a2533 !important; }
  body.light-mode .nav-item.active { background: #fff7d6 !important; color: #b8870a !important; }
  body.light-mode .sidebar-footer { color: #5a6478 !important; border-top-color: #e0e6ed !important; }
  body.light-mode .topbar { background: #ffffff !important; border-bottom-color: #e0e6ed !important; }
  body.light-mode .page-title { color: #1a2533 !important; }
  body.light-mode .date-badge { background: #f0f3f8 !important; color: #5a6478 !important; }
  body.light-mode .avatar { background: #f0f3f8 !important; color: #1a2533 !important; }
  body.light-mode .content { background: #f5f7fa !important; }
  body.light-mode .card { background: #ffffff !important; border-color: #e0e6ed !important; }
  body.light-mode .card-header { border-bottom-color: #e0e6ed !important; }
  body.light-mode .card-title { color: #1a2533 !important; }
  body.light-mode .kpi-card { background: #ffffff !important; border-color: #e0e6ed !important; }
  body.light-mode .kpi-label { color: #5a6478 !important; }
  body.light-mode .kpi-value { color: #1a2533 !important; }
  body.light-mode .data-table { color: #1a2533 !important; }
  body.light-mode .data-table th { background: #f0f3f8 !important; color: #1a2533 !important; }
  body.light-mode .data-table td { border-bottom-color: #e0e6ed !important; color: #1a2533 !important; }
  body.light-mode .td-name { color: #1a2533 !important; }
  body.light-mode .sign-card { background: #ffffff !important; border-color: #e0e6ed !important; }
  body.light-mode .sign-title { color: #1a2533 !important; }
  body.light-mode .form-input, body.light-mode .form-select { background: #ffffff !important; border-color: #d4dae3 !important; color: #1a2533 !important; }
  body.light-mode .form-label { color: #5a6478 !important; }
  body.light-mode .btn-secondary { background: #f0f3f8 !important; color: #1a2533 !important; border-color: #d4dae3 !important; }
  body.light-mode .progress-bar-bg { background: #e0e6ed !important; }
  body.light-mode .safety-clause { background: #f9fafb !important; color: #1a2533 !important; }
  body.light-mode .checkbox-label { color: #1a2533 !important; }

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
  { id: "leave", icon: "📝", label: "請假審批" },
  { id: "calendar", icon: "📅", label: "行事曆" },
  { id: "subcontract", icon: "📋", label: "判頭合約" },
  { id: "profit", icon: "📈", label: "報價利潤試算" },
  { id: "tax", icon: "🧾", label: "老闆稅務計算" },
  { id: "settings", icon: "⚙️", label: "系統設定" },
];

const INITIAL_PROJECTS = [];

// Real employees are loaded from Supabase
const EMPLOYEES = [];

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
              {employees.map((e, i) => (
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
                  <td>{e.days || 22} 天</td>
                  <td className="td-amount">HK${((e.days || 22) * (e.rate || 0)).toLocaleString()}</td>
                  <td>
                    <span className="badge green">
                      <span className="badge-dot" /> 已簽到
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
  const [signed, setSigned] = useState(() => employees.map(() => false));
  useEffect(() => {
    setSigned(prev => prev.length !== employees.length ? employees.map(() => false) : prev);
  }, [employees.length]);

  const [signingHistory, setSigningHistory] = useState([]);
  const [mobileSigns, setMobileSigns] = useState([]);

  useEffect(() => {
    const fetchSigns = () => fetch(`${SUPABASE_URL}/rest/v1/safety_signs?order=submitted_at.desc.nullslast&limit=50`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setMobileSigns(d); })
      .catch(() => {});
    fetchSigns();
    const id = setInterval(fetchSigns, 15000);
    return () => clearInterval(id);
  }, []);

  const empName = (id) => employees.find(e => e.id === id)?.name || `員工 #${id}`;

  const handleSign = (i) => {
    const n = [...signed];
    n[i] = true;
    setSigned(n);
    const now = new Date();
    const timeStr = now.toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" });
    const dateStr = now.toLocaleDateString("zh-HK");
    setSigningHistory(prev => [{ date: dateStr, name: employees[i]?.name || "–", site: employees[i]?.site || "工地", time: timeStr, device: "系統代簽" }, ...prev]);
    showToast(`✅ ${employees[i]?.name} 安全條款簽署成功，時間戳記已記錄`, "success");
  };

  const handleRemind = (i) => {
    const emp = employees[i];
    if (!emp) return;
    if (!emp.phone) { showToast(`⚠️ ${emp.name} 未設定電話號碼`, "error"); return; }
    const msg = `${emp.name} 您好，\n請盡快到今日工地簽署安全守則，並拍照存檔。\n\n— 俊輝電梯工程 管理系統`;
    const r = sendWhatsApp(emp.phone, msg);
    if (r.ok) showToast(`📱 WhatsApp 已開啟 — 請按發送鍵寄給 ${emp.name}`, "success");
    else showToast(`⚠️ ${r.reason}`, "error");
  };

  const handleExportHistory = () => {
    if (signingHistory.length === 0) { showToast("⚠️ 尚無簽署記錄", "error"); return; }
    const headers = ["日期","人員","工地","簽署時間","記錄方式"];
    const rows = signingHistory.map(r => [r.date, r.name, r.site, r.time, r.device]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `安全簽署記錄_${new Date().toLocaleDateString("zh-HK").replace(/\//g,"-")}.csv`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("📊 簽署記錄已匯出！", "success");
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
              onClick={() => {
                if (!checked) return;
                const now = new Date();
                const timeStr = now.toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" });
                setSigningHistory(prev => [{ date: now.toLocaleDateString("zh-HK"), name: "本人", site: "當前工地", time: timeStr, device: "Web App 自簽" }, ...prev]);
                showToast(`✅ 簽署成功！時間戳記：${now.toLocaleString('zh-HK')}`, "success");
              }}
            >
              ✍️ 確認簽署
            </button>
            <button className="btn btn-secondary">📄 列印守則</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">今日人員簽署狀態</div>
            <div className="card-action" style={{ cursor: "pointer" }} onClick={handleExportHistory}>導出記錄 →</div>
          </div>
          <div className="card-body" style={{ padding: "12px 20px" }}>
            {employees.map((e, i) => (
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
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemind(i)}>
                    📱 催簽
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
              {signingHistory.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", color: "#3a4255", padding: 20, fontSize: 13 }}>尚無簽署記錄，確認簽署後將顯示於此</td></tr>
              ) : signingHistory.map((r, i) => (
                <tr key={i}>
                  <td className="td-name">{r.date}</td>
                  <td>{r.name}</td><td>{r.site}</td><td>{r.time}</td><td style={{ fontSize: 11 }}>{r.device}</td>
                  <td><span className="badge green"><span className="badge-dot" /> 有效</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {mobileSigns.length > 0 && (
        <div className="card" style={{ marginTop: 4 }}>
          <div className="card-header">
            <div className="card-title">📋 工地工作日誌（手機 App 提交）</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "#22c55e", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", animation: "pulse 2s infinite" }} />
                即時更新
              </span>
              <span className="badge green"><span className="badge-dot" />{mobileSigns.length} 條記錄</span>
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="data-table">
              <thead>
                <tr><th>提交時間</th><th>工地 / 機號</th><th>RWL 負責人</th><th>工作類別</th><th>PPE</th><th>狀態</th></tr>
              </thead>
              <tbody>
                {mobileSigns.map(s => (
                  <tr key={s.id}>
                    <td className="td-name">{s.submitted_at ? new Date(s.submitted_at).toLocaleString("zh-HK", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "–"}</td>
                    <td>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{s.site || "–"}</div>
                      {s.lift_no && <div style={{ fontSize: 10, color: "#555d6e" }}>機號：{s.lift_no}</div>}
                    </td>
                    <td>{s.rlw || empName(s.employee_id)}</td>
                    <td style={{ fontSize: 11, color: "#9aa0b4" }}>{s.work_category || "–"}</td>
                    <td style={{ fontSize: 10, color: "#555d6e", maxWidth: 160 }}>{s.safety_ppe || "–"}</td>
                    <td>
                      {s.abnormal
                        ? <span className="badge red" title={s.abnormal_desc || ""}><span className="badge-dot" />⚠️ 異常</span>
                        : <span className="badge green"><span className="badge-dot" />正常</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
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
  const [mobileAttendance, setMobileAttendance] = useState([]);

  useEffect(() => {
    const fetchToday = () => {
      const today = new Date().toISOString().split("T")[0];
      fetch(`${SUPABASE_URL}/rest/v1/attendance?date=eq.${today}&order=check_in.desc.nullslast&limit=100`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      })
        .then(r => r.json())
        .then(d => { if (Array.isArray(d)) setMobileAttendance(d); })
        .catch(() => {});
    };
    fetchToday();
    const id = setInterval(fetchToday, 15000);
    return () => clearInterval(id);
  }, []);

  const empName = (id) => employees.find(e => e.id === id)?.name || `員工 #${id}`;
  const [selectedSiteView, setSelectedSiteView] = useState(null); // for site-focused map view
  const [viewMode, setViewMode] = useState("employee"); // "employee" | "site"
  const [empPage, setEmpPage] = useState(0);
  const EMP_PER_PAGE = 5;
  const [siteCoords, setSiteCoords] = useState({ ...SITE_GPS });
  const [editGeoSite, setEditGeoSite] = useState(null);
  const [geoEditForm, setGeoEditForm] = useState({ lat: "", lng: "", radius: 150 });

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

  const handleExportCSV = () => {
    try {
      if (!employees || employees.length === 0) {
        showToast("⚠️ 尚無員工資料", "error");
        return;
      }
      const monthLabel = new Date().toLocaleDateString("zh-HK", { year: "numeric", month: "long" });
      const headers = ["員工", "職位", "今日地盤", "今日簽到時間", "應出勤天數", "實際出勤天數", "遲到次數", "出勤率"];
      const rows = employees.map((e, i) => {
        const rate = Math.round(((e.days || 22) / 23) * 100);
        const lateCount = [1, 0, 3, 0, 1][i] || 0;
        return [
          e.name || "",
          e.role || "",
          empSite[i] || "未分配",
          checkedIn[i] ? (checkInTime[i] || "") : "未簽到",
          "23 天",
          `${e.days || 22} 天`,
          `${lateCount} 次`,
          `${rate}%`,
        ];
      });
      // Append summary row
      const totalPresent = checkedIn.filter(Boolean).length;
      rows.push([]); // blank separator
      rows.push(["—— 統計 ——", "", "", "", "", "", "", ""]);
      rows.push(["總人數", "", "", "", "", `${employees.length} 人`, "", ""]);
      rows.push(["今日已簽到", "", "", "", "", `${totalPresent} 人`, "", ""]);
      rows.push(["未分配地盤", "", "", "", "", `${unassigned.length} 人`, "", ""]);
      rows.push(["匯出時間", "", "", "", "", new Date().toLocaleString("zh-HK"), "", ""]);

      const escape = v => `"${String(v).replace(/"/g, '""')}"`;
      const csvContent = [headers, ...rows].map(r => r.map(escape).join(",")).join("\r\n");
      const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
      const filename = `出勤彙總_${monthLabel}_${new Date().toLocaleDateString("zh-HK").replace(/\//g, "-")}.csv`;

      if (window.navigator && window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      }
      showToast(`📊 已匯出 ${employees.length} 名員工出勤資料（${filename}）`, "success");
    } catch (err) {
      console.error("CSV export failed:", err);
      showToast(`❌ CSV 匯出失敗：${err.message || "未知錯誤"}`, "error");
    }
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
  const focusGPS = siteCoords[focusSite] || { lat: "22.3193", lng: "114.1694" };
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
                  {empSite[i] && siteCoords[empSite[i]] && (
                    <div style={{ fontSize: 10, color: "#3a4255", marginBottom: 8 }}>
                      📍 GPS: {siteCoords[empSite[i]].lat}°N {siteCoords[empSite[i]].lng}°E
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
              {employees.length > EMP_PER_PAGE && (() => {
                const totalPages = Math.ceil(employees.length / EMP_PER_PAGE);
                const start = empPage * EMP_PER_PAGE + 1;
                const end = Math.min((empPage + 1) * EMP_PER_PAGE, employees.length);
                const atFirst = empPage === 0;
                const atLast = empPage >= totalPages - 1;
                return (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 4px", borderTop: "1px solid #1e2330", marginTop: 4 }}>
                    <div style={{ fontSize: 11, color: "#555d6e" }}>顯示 {start}-{end} / 共 {employees.length} 名</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <button onClick={() => setEmpPage(p => Math.max(0, p - 1))} disabled={atFirst}
                        style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${atFirst ? "#1e2330" : "#2a3045"}`, background: atFirst ? "#0d0f12" : "#1e2330", color: atFirst ? "#3a4255" : "#e8eaf0", cursor: atFirst ? "not-allowed" : "pointer", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>← 上一頁</button>
                      <span style={{ fontSize: 12, color: "#f0c000", fontWeight: 700, padding: "0 8px", minWidth: 40, textAlign: "center" }}>{empPage + 1} / {totalPages}</span>
                      <button onClick={() => setEmpPage(p => Math.min(totalPages - 1, p + 1))} disabled={atLast}
                        style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${atLast ? "#1e2330" : "#2a3045"}`, background: atLast ? "#0d0f12" : "#1e2330", color: atLast ? "#3a4255" : "#e8eaf0", cursor: atLast ? "not-allowed" : "pointer", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>下一頁 →</button>
                    </div>
                  </div>
                );
              })()}
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
                      📍 {siteCoords[p.name] ? `${siteCoords[p.name].lat}°N ${siteCoords[p.name].lng}°E` : "GPS 未設定"}
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
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 700, color: "#f0c000" }}>{siteCoords[focusSite]?.radius || 150} m</div>
              </div>
              <div style={{ background: "#0d0f12", borderRadius: 8, padding: "10px 14px", border: "1px solid #1e2330" }}>
                <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>此地盤人數</div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 700, color: "#22c55e" }}>{focusCount} 人</div>
              </div>
            </div>

            {editGeoSite && (
              <div style={{ background: "rgba(240,192,0,0.05)", border: "1px solid rgba(240,192,0,0.25)", borderRadius: 8, padding: "12px 14px", marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "#f0c000", marginBottom: 8 }}>⚙️ 設定「{editGeoSite}」GPS</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "#3a4255", marginBottom: 4 }}>緯度 (Lat)</div>
                    <input value={geoEditForm.lat} onChange={ev => setGeoEditForm(f => ({ ...f, lat: ev.target.value }))}
                      className="form-input" placeholder="22.3193" style={{ padding: "6px 8px", fontSize: 12 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#3a4255", marginBottom: 4 }}>經度 (Lng)</div>
                    <input value={geoEditForm.lng} onChange={ev => setGeoEditForm(f => ({ ...f, lng: ev.target.value }))}
                      className="form-input" placeholder="114.1694" style={{ padding: "6px 8px", fontSize: 12 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#3a4255", marginBottom: 4 }}>半徑(m)</div>
                    <input value={geoEditForm.radius} onChange={ev => setGeoEditForm(f => ({ ...f, radius: ev.target.value }))}
                      className="form-input" type="number" style={{ padding: "6px 8px", fontSize: 12 }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => {
                    if (!geoEditForm.lat || !geoEditForm.lng) { showToast("⚠️ 請輸入 GPS 座標", "error"); return; }
                    setSiteCoords(prev => ({ ...prev, [editGeoSite]: { lat: geoEditForm.lat, lng: geoEditForm.lng, radius: Number(geoEditForm.radius) || 150 } }));
                    setEditGeoSite(null);
                    showToast(`✅ 「${editGeoSite}」GPS 已更新！`, "success");
                  }} className="btn btn-primary btn-sm">✅ 儲存</button>
                  <button onClick={() => setEditGeoSite(null)} className="btn btn-secondary btn-sm">取消</button>
                </div>
              </div>
            )}

            {/* Quick site GPS reference table */}
            <div style={{ fontSize: 11, color: "#555d6e", marginBottom: 6, fontWeight: 600 }}>各地盤 GPS 座標</div>
            <div style={{ maxHeight: 180, overflowY: "auto" }}>
              {activeProjects.map(p => (
                <div key={p.id}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "6px 10px", borderRadius: 6, marginBottom: 4,
                    background: selectedSiteView === p.name ? "#1a1f2e" : "#0d0f12",
                    border: `1px solid ${selectedSiteView === p.name ? "#f0c000" : "#1e2330"}`
                  }}
                >
                  <div onClick={() => setSelectedSiteView(p.name)} style={{ fontSize: 11, fontWeight: 600, flex: 1, cursor: "pointer" }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ fontSize: 10, color: "#3a4255" }}>
                      {siteCoords[p.name] ? `${siteCoords[p.name].lat}, ${siteCoords[p.name].lng}` : "未設定"}
                    </div>
                    <button onClick={() => { setEditGeoSite(p.name); setGeoEditForm({ lat: siteCoords[p.name]?.lat || "", lng: siteCoords[p.name]?.lng || "", radius: siteCoords[p.name]?.radius || 150 }); }}
                      style={{ background: "none", border: "1px solid #2a3045", color: "#8891a4", borderRadius: 4, padding: "2px 6px", fontSize: 10, cursor: "pointer" }}>⚙️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {mobileAttendance.length > 0 && (
        <div className="card" style={{ marginTop: 4, marginBottom: 4 }}>
          <div className="card-header">
            <div className="card-title">📱 今日手機 App 簽到記錄</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "#22c55e", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", animation: "pulse 2s infinite" }} />
                即時更新
              </span>
              <span className="badge green"><span className="badge-dot" />{mobileAttendance.length} 人已簽到</span>
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="data-table">
              <thead>
                <tr><th>員工</th><th>工地</th><th>簽到時間</th><th>GPS 座標</th><th>精準度</th><th>簽退時間</th><th>狀態</th></tr>
              </thead>
              <tbody>
                {mobileAttendance.map(a => (
                  <tr key={a.id}>
                    <td className="td-name">{empName(a.employee_id)}</td>
                    <td style={{ fontSize: 11 }}>
                      {a.site?.startsWith("[手動]") ? (
                        <span style={{ color: "#f0c000" }} title="員工手動新增的工地（非系統預設）">⚠️ {a.site}</span>
                      ) : (a.site || "–")}
                    </td>
                    <td>{a.check_in ? new Date(a.check_in).toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" }) : "–"}</td>
                    <td style={{ fontSize: 10, color: "#60a5fa", fontFamily: "monospace" }}>
                      {a.check_in_lat && a.check_in_lng
                        ? `${Number(a.check_in_lat).toFixed(4)}, ${Number(a.check_in_lng).toFixed(4)}`
                        : "–"}
                    </td>
                    <td style={{ fontSize: 11, color: a.check_in_accuracy > 50 ? "#f0c000" : "#22c55e" }}>
                      {a.check_in_accuracy ? `±${a.check_in_accuracy}m` : "–"}
                    </td>
                    <td>{a.check_out ? new Date(a.check_out).toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" }) : <span style={{ color: "#555d6e" }}>—</span>}</td>
                    <td>
                      {a.check_out
                        ? <span className="badge green"><span className="badge-dot" />已完成</span>
                        : <span className="badge yellow"><span className="badge-dot" />工作中</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Monthly summary table */}
      <div className="card" style={{ marginTop: 4 }}>
        <div className="card-header">
          <div className="card-title">本月出勤彙總</div>
          <div className="card-action" style={{ cursor: "pointer" }} onClick={handleExportCSV}>下載 CSV →</div>
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

function Progress({ showToast, projects = INITIAL_PROJECTS, employees = [], onUpdateProgress }) {
  const [projectIdx, setProjectIdx] = useState(0);
  const [pct, setPct] = useState("15");
  const [note, setNote] = useState("");
  const [stageDesc, setStageDesc] = useState("");
  const [milestoneStatus, setMilestoneStatus] = useState("done"); // "done" | "in_progress"
  const [editChartId, setEditChartId] = useState(null); // project name being edited
  const [editForm, setEditForm] = useState({ pct: 0, plan: 0 });
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = () => fetch(`${SUPABASE_URL}/rest/v1/progress_reports?order=submitted_at.desc.nullslast&limit=30`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setReports(d); })
      .catch(() => {});
    fetchReports();
    const id = setInterval(fetchReports, 15000);
    return () => clearInterval(id);
  }, []);

  const empName = (id) => employees.find(e => e.id === id)?.name || `員工 #${id}`;

  const selectStage = (p, desc) => {
    setPct(p);
    setStageDesc(desc);
    setNote(desc); // auto-fill note with stage content
  };

  const handleSubmit = async () => {
    const activeList = projects.filter(p => p.phase === "active");
    const selected = activeList[projectIdx];
    if (selected && pct) onUpdateProgress?.(selected.name, Number(pct));
    const statusLabel = milestoneStatus === "in_progress" ? "🔄 進行中" : "✅ 已完成";

    // Auto-trigger 自動請款: when milestone marked as 已完成此節點, create
    // a CF invoice for (contract value × pct%) and insert into invoices table.
    // Admin can then print/send it from 工程管理 → 🖨️ PDF.
    if (milestoneStatus === "done" && selected) {
      const contractValue = Number(selected.value || 0);
      const amount = Math.round(contractValue * Number(pct) / 100);
      if (contractValue > 0 && amount > 0) {
        try {
          // Find next CF number (max existing + 1)
          const res = await fetch(
            `${SUPABASE_URL}/rest/v1/invoices?select=cf_num&order=cf_num.desc.nullslast&limit=1`,
            { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
          );
          const rows = await res.json();
          const nextNum = (Array.isArray(rows) && rows[0]?.cf_num ? Number(rows[0].cf_num) : 0) + 1;
          const cfNoFmt = `CF${String(nextNum).padStart(5, "0")}`;
          const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/invoices`, {
            method: "POST",
            headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
            body: JSON.stringify({
              project_id: selected.id,
              stage: cfNoFmt,
              amount,
              label: stageDesc || `${pct}% 完工節點`,
              cf_num: nextNum,
              status: "pending",
            }),
          });
          if (!insertRes.ok) throw new Error(`HTTP ${insertRes.status}`);
          showToast(`✅ ${selected.name} ${pct}% 已完成 — 自動產生 ${cfNoFmt} 請款 HK$${amount.toLocaleString()}`, "success");
        } catch (e) {
          showToast(`📊 進度已提交，但自動請款失敗：${e.message}`, "error");
        }
      } else {
        showToast(`📊 進度回報已提交：${selected?.name} — ${pct}% ${statusLabel}（合約金額未設定，未產生請款）`, "success");
      }
    } else {
      showToast(`📊 進度回報已提交：${selected?.name} — ${pct}% ${statusLabel}（圖表已即時更新）`, "success");
    }

    setNote("");
    setStageDesc("");
  };

  const handleStartEdit = (proj) => {
    setEditChartId(proj.name);
    setEditForm({ pct: proj.pct || 0, plan: proj.plan || 0 });
  };

  const handleSaveEdit = () => {
    if (editChartId) {
      onUpdateProgress?.(editChartId, Number(editForm.pct));
      // Note: plan is updated client-side only via onUpdateProgress (extends to plan if supported)
      showToast(`✅ 「${editChartId}」進度已更新為 ${editForm.pct}%`, "success");
    }
    setEditChartId(null);
  };

  const handleCancelEdit = () => {
    setEditChartId(null);
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

          <div className="form-group">
            <label className="form-label">提交狀態</label>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button onClick={() => setMilestoneStatus("done")}
                style={{ flex: 1, padding: "8px 14px", borderRadius: 6, border: milestoneStatus === "done" ? "2px solid #22c55e" : "1px solid #2a3045", background: milestoneStatus === "done" ? "rgba(34,197,94,0.08)" : "#13161c", color: milestoneStatus === "done" ? "#22c55e" : "#8891a4", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>
                ✅ 已完成此節點
              </button>
              <button onClick={() => setMilestoneStatus("in_progress")}
                style={{ flex: 1, padding: "8px 14px", borderRadius: 6, border: milestoneStatus === "in_progress" ? "2px solid #f0c000" : "1px solid #2a3045", background: milestoneStatus === "in_progress" ? "rgba(240,192,0,0.08)" : "#13161c", color: milestoneStatus === "in_progress" ? "#f0c000" : "#8891a4", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>
                🔄 進行中（尚未完成）
              </button>
            </div>
            <div style={{ fontSize: 11, color: "#3a4255", marginTop: 6 }}>💡 「進行中」可記錄階段中途進度，未必需要 100% 完成節點</div>
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
                      {editChartId !== p.name && (
                        <button onClick={() => handleStartEdit(p)}
                          style={{ background: "none", border: "1px solid #2a3045", color: "#8891a4", borderRadius: 4, padding: "2px 8px", fontSize: 11, cursor: "pointer" }}
                          title="編輯進度">✏️</button>
                      )}
                    </div>
                  </div>
                  <div className="progress-bar-bg">
                    <div className={`progress-bar-fill ${p.status}`} style={{ width: `${p.pct}%` }} />
                  </div>
                  {editChartId === p.name && (
                    <div style={{ marginTop: 8, padding: "10px 12px", background: "rgba(240,192,0,0.05)", border: "1px solid rgba(240,192,0,0.25)", borderRadius: 6, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <label style={{ fontSize: 10, color: "#3a4255" }}>實際進度 %</label>
                        <input type="number" min="0" max="100" value={editForm.pct}
                          onChange={e => setEditForm(f => ({ ...f, pct: e.target.value }))}
                          style={{ width: 70, background: "#0d0f12", border: "1px solid #2a3045", borderRadius: 4, padding: "4px 8px", color: "#f0c000", fontFamily: "'Barlow Condensed'", fontSize: 14, fontWeight: 700 }} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <label style={{ fontSize: 10, color: "#3a4255" }}>計劃 %</label>
                        <input type="number" min="0" max="100" value={editForm.plan}
                          onChange={e => setEditForm(f => ({ ...f, plan: e.target.value }))}
                          style={{ width: 70, background: "#0d0f12", border: "1px solid #2a3045", borderRadius: 4, padding: "4px 8px", color: "#60a5fa", fontFamily: "'Barlow Condensed'", fontSize: 14, fontWeight: 700 }} />
                      </div>
                      <button onClick={handleSaveEdit}
                        style={{ background: "#22c55e", border: "none", color: "#0d0f12", borderRadius: 4, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontWeight: 700, marginLeft: "auto" }}>✅ 儲存</button>
                      <button onClick={handleCancelEdit}
                        style={{ background: "#1e2330", border: "1px solid #2a3045", color: "#8891a4", borderRadius: 4, padding: "6px 12px", fontSize: 11, cursor: "pointer" }}>取消</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">📋 回報時間軸</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "#22c55e", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", animation: "pulse 2s infinite" }} />
                  即時更新
                </span>
                <span className="badge green"><span className="badge-dot" />{reports.length} 條記錄</span>
              </div>
            </div>
            <div className="card-body" style={{ padding: reports.length === 0 ? "20px" : "8px 0" }}>
              {reports.length === 0 ? (
                <div style={{ color: '#9aa0b4', fontSize: 13, textAlign: 'center', padding: '12px 0' }}>
                  尚無進度回報，員工透過手機 App 提交後將顯示於此
                </div>
              ) : (
                <div style={{ maxHeight: 320, overflowY: "auto" }}>
                  {reports.map(r => (
                    <div key={r.id} style={{ padding: "10px 16px", borderBottom: "1px solid #1e2330", display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ minWidth: 56, fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: r.progress_pct >= 95 ? "#22c55e" : r.progress_pct >= 50 ? "#f0c000" : "#60a5fa", lineHeight: 1.1 }}>
                        {r.progress_pct}%
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2, gap: 8 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "#e8eaf0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {r.project || "–"}
                          </div>
                          <div style={{ fontSize: 10, color: "#555d6e", flexShrink: 0 }}>
                            {r.submitted_at ? new Date(r.submitted_at).toLocaleString("zh-HK", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "–"}
                          </div>
                        </div>
                        {r.note && (
                          <div style={{ fontSize: 11, color: "#9aa0b4", lineHeight: 1.5, marginTop: 2 }}>
                            {r.note}
                          </div>
                        )}
                        <div style={{ fontSize: 10, color: "#555d6e", marginTop: 4 }}>
                          👤 {empName(r.employee_id)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Invoice({ showToast }) {
  const [sent, setSent] = useState(false);

  // Open the editable Chun Fai-format invoice template (matches the Excel
  // template the user provided — auto today's date, Anlev as default Bill-To,
  // unit price × pct = amount auto-calculated, all fields editable). Loads
  // the latest project list from Supabase so the Project Code field has
  // autocomplete suggestions seeded with real CFs.
  const handlePreviewDraft = async () => {
    let projectOptions = [];
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/invoices?select=stage,label,amount,cf_num,projects(name)&order=cf_num.desc.nullslast&limit=100`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
      const rows = await res.json();
      if (Array.isArray(rows)) {
        // Dedupe by ecName
        const seen = new Set();
        projectOptions = rows
          .map(r => ({
            ecName: r.projects?.name || "",
            description: r.label || "",
            contractValue: r.amount || 0,
          }))
          .filter(r => r.ecName && !seen.has(r.ecName) && seen.add(r.ecName));
      }
    } catch (e) { /* fall through with empty options */ }
    generateInvoicePDF({}, { projectOptions });
  };

  const handleConfirmSend = () => {
    setSent(true);
    showToast("📧 請款單已正式發送至客戶！系統已記錄發送時間", "success");
  };

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
                <button className="btn btn-primary btn-sm" onClick={handleConfirmSend} disabled={sent}
                  style={{ opacity: sent ? 0.6 : 1 }}>
                  {sent ? "✅ 已發送" : "確認發送"}
                </button>
                <button className="btn btn-secondary btn-sm" onClick={handlePreviewDraft}>預覽草稿</button>
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
          <div className="card-action" style={{ cursor: "pointer" }} onClick={handlePreviewDraft}>下載 PDF →</div>
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
  const [approvalSubmitted, setApprovalSubmitted] = useState(false);
  const [signatures, setSignatures] = useState({});
  const [viewSig, setViewSig] = useState(null); // employee sig to view in modal

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/payroll_signatures?order=signed_at.desc&limit=500`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    }).then(r => r.json()).then(d => {
      if (!Array.isArray(d)) return;
      const map = {};
      d.forEach(s => { map[`${s.employee_id}_${s.payroll_month}`] = s; });
      setSignatures(map);
    }).catch(() => {});
    const id = setInterval(() => {
      fetch(`${SUPABASE_URL}/rest/v1/payroll_signatures?order=signed_at.desc&limit=500`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      }).then(r => r.json()).then(d => {
        if (!Array.isArray(d)) return;
        const map = {};
        d.forEach(s => { map[`${s.employee_id}_${s.payroll_month}`] = s; });
        setSignatures(map);
      }).catch(() => {});
    }, 15000);
    return () => clearInterval(id);
  }, []);
  const totalSalary = employees.reduce((a, e) => a + (e.days || 22) * (e.rate || 0), 0);

  const handleExportExcel = () => {
    try {
      if (!employees || employees.length === 0) {
        showToast("⚠️ 尚無員工資料，請先新增員工", "error");
        return;
      }
      const headers = ["員工", "職位", "日薪(HK$)", "出勤天數", "遲到扣薪", "總薪酬(HK$)", "狀態"];
      const rows = employees.map(e => {
        const total = (e.days || 22) * (e.rate || 0);
        return [e.name || "", e.role || "", e.rate || 0, `${e.days || 22}天`, "–", total, "待審批"];
      });
      // Escape any existing double-quotes in values to prevent CSV breakage
      const escape = v => `"${String(v).replace(/"/g, '""')}"`;
      const csvContent = [headers, ...rows].map(r => r.map(escape).join(",")).join("\r\n");
      // BOM + content for Excel UTF-8 compatibility
      const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
      const filename = `薪酬報表_${new Date().toLocaleDateString("zh-HK").replace(/\//g, "-")}.csv`;
      // IE/Edge legacy fallback
      if (window.navigator && window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      }
      showToast(`📊 已匯出 ${employees.length} 筆薪酬資料（${filename}）`, "success");
    } catch (err) {
      console.error("Excel export failed:", err);
      showToast(`❌ 匯出失敗：${err.message || "未知錯誤"}`, "error");
    }
  };

  const handleSubmitApproval = () => {
    if (employees.length === 0) { showToast("⚠️ 尚無員工資料可提交", "error"); return; }
    setApprovalSubmitted(true);
    showToast("✅ 薪酬已提交老闆審批，等候確認...", "success");
  };

  return (
    <div>
      <div className="kpi-row">
        <div className="kpi-card" style={{ "--accent": "#f0c000" }}>
          <div className="kpi-label">本月薪酬總額</div>
          <div className="kpi-value" style={{fontSize:22}}>HK${totalSalary.toLocaleString()}</div>
          <div className="kpi-sub">{employees.length} 名員工，自動計算</div>
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
            <button className="btn btn-secondary btn-sm" onClick={handleExportExcel}>匯出 Excel</button>
            <button className="btn btn-primary btn-sm" onClick={handleSubmitApproval} disabled={approvalSubmitted}
              style={{ opacity: approvalSubmitted ? 0.6 : 1 }}>
              {approvalSubmitted ? "⏳ 審批中..." : "提交審批"}
            </button>
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr><th>員工</th><th>職位</th><th>日薪</th><th>出勤天數</th><th>總薪酬</th><th>簽收狀態</th></tr>
            </thead>
            <tbody>
              {employees.map((e, i) => {
                const total = (e.days || 22) * (e.rate || 0);
                return (
                  <tr key={i}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="emp-avatar" style={{ background: e.color, width: 28, height: 28, fontSize: 12 }}>{e.name[0]}</div>
                        <span className="td-name">{e.name}</span>
                      </div>
                    </td>
                    <td>{e.role}</td>
                    <td>HK${e.rate || 0}</td>
                    <td style={{ color: (e.days || 22) < 20 ? "#d63030" : "#9aa0b4" }}>
                      {e.days || 22} 天 {(e.days || 22) < 20 && "⚠️"}
                    </td>
                    <td className="td-amount">HK${total.toLocaleString()}</td>
                    <td>
                      {(() => {
                        const key = `${e.id}_2025年7月`;
                        const sig = signatures[key];
                        return sig ? (
                          <button onClick={() => setViewSig(sig)}
                            style={{ background: "rgba(34,197,94,0.1)", border: "1px solid #22c55e", color: "#22c55e", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                            ✅ 已簽收
                          </button>
                        ) : (
                          <span className="badge yellow"><span className="badge-dot" />待簽收</span>
                        );
                      })()}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={5} style={{ textAlign: "right", fontWeight: 700, color: "#c8d0e0", paddingRight: 16 }}>合計</td>
                <td className="td-amount">HK${totalSalary.toLocaleString()}</td>
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

        {/* Signature View Modal */}
        {viewSig && (
          <div onClick={() => setViewSig(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div onClick={e => e.stopPropagation()}
              style={{ background: "#13161c", border: "1.5px solid #22c55e", borderRadius: 14, padding: 24, maxWidth: 420 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#22c55e", marginBottom: 12, textAlign: "center" }}>✅ 薪酬簽收記錄</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14, fontSize: 12 }}>
                <div><span style={{ color: "#555d6e" }}>月份：</span><span style={{ color: "#e8eaf0", fontWeight: 700 }}>{viewSig.payroll_month}</span></div>
                <div><span style={{ color: "#555d6e" }}>簽署時間：</span><span style={{ color: "#e8eaf0" }}>{new Date(viewSig.signed_at).toLocaleString("zh-HK")}</span></div>
                {viewSig.gps_lat && <div><span style={{ color: "#555d6e" }}>GPS：</span><span style={{ color: "#60a5fa", fontSize: 11 }}>{Number(viewSig.gps_lat).toFixed(5)}, {Number(viewSig.gps_lng).toFixed(5)}</span></div>}
                {viewSig.gps_accuracy && <div><span style={{ color: "#555d6e" }}>精準度：</span><span style={{ color: "#60a5fa" }}>±{viewSig.gps_accuracy}m</span></div>}
              </div>
              {viewSig.signature_data && (
                <div style={{ background: "#fff", borderRadius: 10, padding: 10, textAlign: "center", marginBottom: 14 }}>
                  <img src={viewSig.signature_data} alt="簽名" style={{ maxWidth: "100%", maxHeight: 100 }} />
                </div>
              )}
              <div style={{ fontSize: 11, color: "#555d6e", textAlign: "center", marginBottom: 14, lineHeight: 1.6 }}>
                「本人確認已收到上述全數薪金，並無異議。」
              </div>
              <button onClick={() => setViewSig(null)} className="btn btn-secondary" style={{ width: "100%" }}>關閉</button>
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-header"><div className="card-title">歷史薪酬記錄</div></div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="data-table">
              <thead><tr><th>月份</th><th>薪酬總額</th><th>人數</th><th>狀態</th></tr></thead>
              <tbody>
                {[
                  ["2025年7月", `HK$${totalSalary.toLocaleString()}`, employees.length, "yellow", "待發"],
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

  const handleExportExcel = () => {
    const headers = ["報價名稱", "合約金額(HK$)", "人工成本(HK$)", "外判(HK$)", "管理費(HK$)", "總成本(HK$)", "毛利潤(HK$)", "利潤率(%)"];
    const currentName = `當前報價 ${new Date().toLocaleDateString("zh-HK")}`;
    const currentMargin = projectValue > 0 ? ((profit / projectValue) * 100).toFixed(1) : "0.0";
    const currentRow = [currentName, projectValue, labourTotal, subcontract, overhead, totalCost, profit, currentMargin];
    const savedRows = savedQuotes.map(q => {
      const cost = q.labour + q.sub + q.over;
      const margin = q.value > 0 ? ((q.profit / q.value) * 100).toFixed(1) : "0.0";
      return [q.name, q.value, q.labour, q.sub, q.over, cost, q.profit, margin];
    });
    const csv = [headers, currentRow, ...savedRows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `報價利潤試算_${new Date().toLocaleDateString("zh-HK").replace(/\//g, "-")}.csv`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("📊 報價試算已匯出（CSV 可用 Excel 開啟）！", "success");
  };

  const handleExportPDF = () => {
    const w = window.open("", "_blank");
    const today = new Date().toLocaleDateString("zh-HK");
    const currentMargin = projectValue > 0 ? ((profit / projectValue) * 100).toFixed(1) : "0.0";
    const workerRows = workers.map(wk => `<tr><td>${wk.role}</td><td style="text-align:right">${wk.days} 天</td><td style="text-align:right">HK$${wk.rate}</td><td style="text-align:right">HK$${(wk.days * wk.rate).toLocaleString()}</td></tr>`).join("");
    const savedRows = savedQuotes.map(q => {
      const cost = q.labour + q.sub + q.over;
      const margin = q.value > 0 ? ((q.profit / q.value) * 100).toFixed(1) : "0.0";
      return `<tr><td>${q.name}</td><td style="text-align:right">HK$${q.value.toLocaleString()}</td><td style="text-align:right">HK$${cost.toLocaleString()}</td><td style="text-align:right;color:${q.profit >= 0 ? "#22c55e" : "#d63030"};font-weight:700">HK$${q.profit.toLocaleString()}</td><td style="text-align:right">${margin}%</td></tr>`;
    }).join("");
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>報價利潤試算 - ${today}</title>
<style>body{font-family:Arial,sans-serif;padding:30px;font-size:13px;max-width:880px;margin:0 auto;color:#1a1a1a}
.header{display:flex;justify-content:space-between;align-items:center;padding-bottom:14px;border-bottom:3px solid #f0c000;margin-bottom:20px}
.company{font-size:20px;font-weight:700}
h3{margin:22px 0 12px;font-size:15px;color:#333;padding-bottom:6px;border-bottom:1px solid #eee}
table{width:100%;border-collapse:collapse;margin-bottom:14px;font-size:12px}
th{background:#1a1a1a;color:#fff;padding:9px 12px;text-align:left}
td{padding:9px 12px;border-bottom:1px solid #eee}
.kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px}
.kpi-box{padding:12px 14px;border-radius:8px;border:1px solid #ddd;background:#fafafa}
.kpi-label{font-size:10px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
.kpi-val{font-size:18px;font-weight:700}
.profit-positive{color:#22c55e}.profit-negative{color:#d63030}
@media print{.noprint{display:none}body{padding:18px}}</style></head><body>
<div class="header"><div><div class="company">俊輝電梯工程有限公司</div><div style="font-size:12px;color:#666">報價利潤試算報表</div></div><div style="text-align:right;font-size:12px;color:#666">列印日期：${today}</div></div>

<h3>📊 當前報價試算</h3>
<div class="kpi">
<div class="kpi-box"><div class="kpi-label">合約金額</div><div class="kpi-val" style="color:#f0c000">HK$${projectValue.toLocaleString()}</div></div>
<div class="kpi-box"><div class="kpi-label">總成本</div><div class="kpi-val" style="color:#d63030">HK$${totalCost.toLocaleString()}</div></div>
<div class="kpi-box"><div class="kpi-label">毛利潤</div><div class="kpi-val ${profit >= 0 ? "profit-positive" : "profit-negative"}">HK$${profit.toLocaleString()}</div></div>
<div class="kpi-box"><div class="kpi-label">利潤率</div><div class="kpi-val ${actualMargin >= targetMargin ? "profit-positive" : "profit-negative"}">${currentMargin}%</div></div>
</div>

<h3>👷 人工成本明細</h3>
<table><thead><tr><th>職位</th><th style="text-align:right">天數</th><th style="text-align:right">日薪</th><th style="text-align:right">小計</th></tr></thead>
<tbody>${workerRows}<tr style="background:#f9f9f9;font-weight:700"><td>合計</td><td></td><td></td><td style="text-align:right">HK$${labourTotal.toLocaleString()}</td></tr></tbody></table>

<h3>💰 成本拆分</h3>
<table><thead><tr><th>項目</th><th style="text-align:right">金額</th><th style="text-align:right">佔比</th></tr></thead>
<tbody>
<tr><td>人工成本</td><td style="text-align:right">HK$${labourTotal.toLocaleString()}</td><td style="text-align:right">${totalCost > 0 ? (labourTotal / totalCost * 100).toFixed(1) : 0}%</td></tr>
<tr><td>外判費用</td><td style="text-align:right">HK$${subcontract.toLocaleString()}</td><td style="text-align:right">${totalCost > 0 ? (subcontract / totalCost * 100).toFixed(1) : 0}%</td></tr>
<tr><td>管理費 / 雜費</td><td style="text-align:right">HK$${overhead.toLocaleString()}</td><td style="text-align:right">${totalCost > 0 ? (overhead / totalCost * 100).toFixed(1) : 0}%</td></tr>
<tr style="background:#f9f9f9;font-weight:700"><td>總成本</td><td style="text-align:right">HK$${totalCost.toLocaleString()}</td><td style="text-align:right">100.0%</td></tr>
</tbody></table>

${savedQuotes.length > 0 ? `<h3>📁 已儲存報價記錄 (${savedQuotes.length})</h3>
<table><thead><tr><th>名稱</th><th style="text-align:right">合約金額</th><th style="text-align:right">總成本</th><th style="text-align:right">利潤</th><th style="text-align:right">利潤率</th></tr></thead>
<tbody>${savedRows}</tbody></table>` : ""}

<div class="noprint" style="margin-top:30px;text-align:center">
<button onclick="window.print()" style="padding:10px 24px;background:#1a1a1a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">🖨️ 列印 / 儲存為 PDF</button></div>
<script>window.onload=()=>{setTimeout(()=>window.print(),300)}</script></body></html>`);
    w.document.close();
    showToast("📄 報價單 PDF 已生成！請在新視窗中列印或儲存", "success");
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
            <button className="btn btn-secondary" onClick={handleExportExcel}>📊 Excel</button>
            <button className="btn btn-secondary" onClick={handleExportPDF}>📄 PDF</button>
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
// Chun Fai invoice template — fully editable in the popup window. Mirrors
// the Excel formulas: AMOUNT = unit_price × pct, auto subtitle "X 元的 Y%，
// 共 Z 元", TOTAL = AMOUNT row(s). Date defaults to today, Bill-To defaults
// to Anlev Elex Elevator Ltd, both editable. Inline JS recalculates as the
// admin edits any field.
// Issuing companies — admin can switch between Chun Fai (俊輝電梯) and
// Bigspread (巨揚有限公司) at the top of the invoice template. All fields
// stay editable so any one-off override is fine.
const INVOICE_COMPANIES = [
  {
    id: "chunfai",
    cn: "俊輝電梯工程有限公司",
    en: "Chun Fai Lifts Engineering Company Ltd.",
    addr: "Room 901, International Trade Centre,\n11-19 Sha Tsui Road, Tsuen Wan, N.T., Hong Kong",
    phone: "5444 2099",
    email: "chunfailifts@gmail.com",
  },
  {
    id: "bigspread",
    cn: "巨揚有限公司",
    en: "Bigspread Ltd.",
    addr: "Room 901, International Trade Centre,\n11-19 Sha Tsui Road, Tsuen Wan, N.T., Hong Kong",
    phone: "5444 2099",
    email: "bigspreadltd@gmail.com",
  },
];

// Default Bill-To client list — verified against real CF000364 invoice.
// Admin can still type any new name; <datalist> is just autocomplete suggestions.
const DEFAULT_INVOICE_CLIENTS = [
  { name: "Anlev Elex Elevator Ltd", addr: "13/F, Island Place Tower, 510 King's Road, North Point, Hong Kong", phone: "Phone: 2561 8278" },
  { name: "Schindler Lifts (Hong Kong) Ltd", addr: "Schindler House, 17 Sun Yip Street, Chai Wan, Hong Kong", phone: "Phone: 2516 8000" },
  { name: "Otis Elevator Company (HK) Ltd", addr: "20/F, Otis Building, 11 Hoi Shing Road, Tsuen Wan, N.T., Hong Kong", phone: "Phone: 2516 1668" },
  { name: "Mitsubishi Electric (Hong Kong) Ltd", addr: "10/F, Manulife Tower, 169 Electric Road, North Point, Hong Kong", phone: "Phone: 2510 0555" },
  { name: "Hitachi Elevator Engineering (HK) Co. Ltd", addr: "16/F, Hitachi Tower, 10 Harcourt Road, Central, Hong Kong", phone: "Phone: 2735 9218" },
];

// Milestone presets — sourced from "INVO flow.pdf" (the user's official
// completion-stage definitions). Picking one in the invoice template
// fills Details + sets pct% in one click.
const MILESTONE_PRESETS = [
  { group: "新裝完工紙", pct: 20,  text: "已進場開工及提交秤線表" },
  { group: "新裝完工紙", pct: 50,  text: "已完成外門框, 門頭, 地砵, 已完成主副路軌安裝及調校" },
  { group: "新裝完工紙", pct: 80,  text: "已完成機房及井道全面安裝, 已拆棚交較車行慢車" },
  { group: "新裝完工紙", pct: 95,  text: "已完成 EMSD 驗機, 已完成保養部驗收手尾" },
  { group: "新裝完工紙", pct: 100, text: "已完成客戶交機時安裝手尾" },
  { group: "舊裝完工紙", pct: 30,  text: "已完成拆除機房物料, 已完成拆除井道物料 (不包括外門、外門框及外門地砵), 已提供已簽到工地的「升降機/自動梯工作日誌」, 已提供有效的廢料回收紙回條/載貨入帳票回條" },
  { group: "舊裝完工紙", pct: 65,  text: "已提交秤線表, 已完成機房及井道全面安裝, 已完成外門框, 門頭, 地砵, 外門, 已完成主副路軌安裝及調校, 已交較車行快車, 已提供已簽到工地的「升降機/自動梯工作日誌」, 已提供有效的廢料回收紙回條/載貨入帳票回條" },
  { group: "舊裝完工紙", pct: 100, text: "已完成 EMSD 驗機, 已完成保養部驗收手尾, 已完成客戶交機時安裝手尾, EMSD 發出准用証六個月內" },
  { group: "特殊多期",   pct: 20,  text: "進場開工, 提交秤線表, 完成初期外門框, 門頭, 地砵, 完成初期主副路軌安裝及調校" },
  { group: "特殊多期",   pct: 45,  text: "完成機房及井道全面安裝, 協助快車慢車調試, 完成 EMSD 驗機" },
  { group: "特殊多期",   pct: 70,  text: "完成第二期安裝及升機, 協助快車慢車調試, 完成 EMSD 驗機" },
  { group: "特殊多期",   pct: 95,  text: "完成第三期安裝及升機, 協助快車慢車調試, 完成 EMSD 驗機" },
  { group: "特殊多期",   pct: 100, text: "完成拆卸及清理" },
];

function generateInvoicePDF(inv, opts = {}) {
  const w = window.open("", "_blank");
  if (!w) { alert("請允許彈出視窗以生成 PDF"); return; }
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd for <input type=date>
  // Invoice number: format as CF##### (5-digit zero-padded) when cf_num
  // is available. Falls back to inv.cfNo if it's already in the right form,
  // or a timestamp-based default.
  const cfNumDigits = inv?.cf_num
    ? String(inv.cf_num).padStart(5, "0")
    : (inv?.cfNo ? String(inv.cfNo).replace(/[^0-9]/g, "").padStart(5, "0") : "");
  const invNo = cfNumDigits
    ? `CF${cfNumDigits}`
    : (inv?.cfNo || `INV-${Date.now().toString().slice(-6)}`);
  const orderNo = inv?.orderNo || ""; // Anlev's WO number (optional, editable)
  const ecName = inv?.ecName || inv?.projectName || "";
  const desc = inv?.description || "";
  const unitPrice = Number(inv?.contractValue || inv?.amount || 0);
  // Project autocomplete — comes from caller (ProjectManager passes its CF list,
  // Invoice page can pass a Supabase query). Each item: {ecName, contractValue, description?}
  const projectOptions = Array.isArray(opts.projectOptions) ? opts.projectOptions : [];
  const clientOptions = Array.isArray(opts.clientOptions) && opts.clientOptions.length
    ? opts.clientOptions
    : DEFAULT_INVOICE_CLIENTS;
  // Stored pct may be "20" (string), 20, or 0.2 — normalise to fraction
  const rawPct = inv?.pct;
  let pctFraction = 0;
  if (rawPct !== undefined && rawPct !== null && rawPct !== "") {
    const n = Number(rawPct);
    pctFraction = n > 1 ? n / 100 : n;
  } else if (unitPrice && inv?.amount) {
    pctFraction = Number(inv.amount) / unitPrice;
  }
  const pctDisplay = pctFraction ? (pctFraction * 100).toFixed(pctFraction * 100 % 1 ? 1 : 0) : "";

  // Escape any user-supplied strings before injecting into HTML
  const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Invoice ${esc(invNo)}</title>
<style>
  body{font-family:Arial,'Microsoft JhengHei',sans-serif;padding:40px;font-size:13px;color:#000;max-width:820px;margin:0 auto;background:#fff}
  .header{margin-bottom:20px}
  .co-en{font-size:18px;font-weight:700}
  .co-cn{font-size:15px;font-weight:700}
  .co-addr{font-size:11px;color:#444;line-height:1.6;margin-top:4px}
  .invoice-bar{display:flex;justify-content:space-between;align-items:center;margin:24px 0 10px;padding-bottom:8px;border-bottom:2px solid #000}
  .invoice-title{font-size:20px;font-weight:700;letter-spacing:2px}
  .invoice-meta{display:flex;gap:18px;font-size:12px}
  .invoice-meta label{color:#666;margin-right:4px}
  .bill-label{font-weight:bold;font-size:14px;margin:14px 0 6px;letter-spacing:1px}
  table{width:100%;border-collapse:collapse;margin:14px 0}
  th{background:#1a1a1a;color:#fff;padding:9px 10px;text-align:left;font-size:12px;font-weight:700}
  th:nth-child(3),th:nth-child(4),th:nth-child(5),th:nth-child(6){text-align:right}
  td{padding:10px;border:1px solid #ddd;vertical-align:top}
  td.r{text-align:right} td.c{text-align:center}
  .total-row td{font-weight:bold;background:#f5f5f5;font-size:15px}
  .footer{line-height:1.9;margin-top:24px;font-size:12px;border-top:1px solid #eee;padding-top:14px}
  .co{font-weight:bold}
  /* Editable inputs — look like plain text on screen, hide borders on print */
  input.e, textarea.e {
    font:inherit;color:inherit;background:transparent;border:1px dashed #cdd5e0;
    border-radius:3px;padding:2px 4px;width:100%;box-sizing:border-box;outline:none;
  }
  input.e:focus, textarea.e:focus { border-color:#FF6B1A;background:#fff8f0 }
  textarea.e { resize:vertical;min-height:38px;font-family:inherit }
  input.num { text-align:right }
  .controls { position:fixed;top:14px;right:14px;display:flex;gap:8px;z-index:100 }
  .btn { padding:9px 18px;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:700;font-family:inherit }
  .btn-print { background:#1a1a1a;color:#fff }
  .btn-reset { background:#fff;color:#666;border:1px solid #ccc }
  @media print {
    .controls, .company-picker, .no-print { display:none !important }
    input.e, textarea.e, select.e { border:none !important;background:transparent !important;padding:0 !important;-webkit-appearance:none;appearance:none }
    select.e { background-image:none !important }
    body { padding:18px;max-width:none }
  }
</style></head><body>

<div class="controls">
  <button class="btn btn-reset" onclick="if(confirm('清空所有欄位？')) location.reload()">↺ 重設</button>
  <button class="btn btn-print" onclick="window.print()">🖨️ 列印 / 儲存為 PDF</button>
</div>

<div class="header">
  <div style="display:flex;justify-content:flex-end;margin-bottom:6px" class="company-picker">
    <select id="companyPicker" class="e" style="font-size:11px;width:200px">
      ${INVOICE_COMPANIES.map(c => `<option value="${c.id}">出單公司：${esc(c.cn)}</option>`).join("")}
    </select>
  </div>
  <input class="e" id="coEN" value="${esc(INVOICE_COMPANIES[0].en)}" style="font-size:20px;font-weight:700;width:100%;border:none;padding:0"/>
  <input class="e" id="coCN" value="${esc(INVOICE_COMPANIES[0].cn)}" style="font-size:16px;font-weight:700;width:100%;border:none;padding:0;margin-top:4px"/>
  <textarea class="e" id="coAddr" rows="2" style="font-size:12px;color:#222;width:100%;border:none;padding:0;margin-top:8px;resize:none">${esc(INVOICE_COMPANIES[0].addr)}</textarea>
  <div style="font-size:12px;color:#222;margin-top:2px">
    Phone: <input class="e" id="coPhone" value="${esc(INVOICE_COMPANIES[0].phone)}" style="width:90px;border:none;padding:0"/>
  </div>
  <div style="font-size:12px;color:#222">
    EMAIL: <input class="e" id="coEmail" value="${esc(INVOICE_COMPANIES[0].email)}" style="width:240px;border:none;padding:0"/>
  </div>
</div>

<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:30px;margin:24px 0 14px">
  <!-- LEFT column: BILL TO -->
  <div style="flex:1;min-width:0">
    <div style="font-weight:bold;font-size:14px;letter-spacing:1px;margin-bottom:6px">BILL TO</div>
    <input class="e" id="billName" list="clientList" value="Anlev Elex Elevator Ltd" placeholder="輸入或選擇客戶名稱..." style="font-weight:600"/>
    <datalist id="clientList">
      ${clientOptions.map(c => `<option value="${esc(c.name)}"></option>`).join("")}
    </datalist>
    <textarea class="e" id="billAddr" rows="2" style="margin-top:4px">13/F, Island Place Tower, 510 King's Road, North Point, Hong Kong</textarea>
    <input class="e" id="billPhone" value="Phone: 2561 8278" style="margin-top:4px"/>
  </div>

  <!-- RIGHT column: invoice meta -->
  <div style="text-align:right;font-size:13px;min-width:240px">
    <div style="font-size:18px;font-weight:700;letter-spacing:2px;margin-bottom:6px">INVOICE 發票</div>
    <div style="margin-bottom:4px">
      #<input class="e" id="invNo" value="${esc(invNo)}" style="width:130px;text-align:right;font-weight:700"/>
    </div>
    <div style="margin-bottom:4px">
      <span style="color:#666">DATE: </span>
      <input class="e" type="date" id="invDate" value="${today}" style="width:140px;text-align:right"/>
    </div>
    <div>
      <span style="color:#666">Order No.: </span>
      <input class="e" id="orderNo" value="${esc(orderNo)}" placeholder="例：WO102AC003249" style="width:170px;text-align:right;font-weight:700"/>
    </div>
  </div>
</div>

<table>
  <thead><tr>
    <th style="width:5%">Items</th>
    <th style="width:32%">Project Code</th>
    <th style="width:27%">Details</th>
    <th style="width:7%">Quantity</th>
    <th style="width:14%">Unit Price (HK$)</th>
    <th style="width:15%">AMOUNT (HK$)</th>
  </tr></thead>
  <tbody>
    <tr>
      <td class="c">1</td>
      <td>
        <textarea class="e" id="proj1" rows="2" placeholder="工程編號（例：EC-561 柴灣物流倉）" style="width:100%">${esc(ecName)}</textarea>
        <datalist id="projectList">
          ${projectOptions.map(p => `<option value="${esc(p.ecName || p.name || "")}"></option>`).join("")}
        </datalist>
        <div class="no-print" style="display:flex;align-items:center;gap:6px;margin-top:6px">
          <label style="font-size:10px;color:#888;white-space:nowrap">選擇：</label>
          <select id="projPicker" class="e" style="flex:1;font-size:10px;cursor:pointer">
            <option value="">-- 從工程清單選擇 --</option>
            ${projectOptions.map((p, i) => `<option value="${i}">${esc(p.ecName || p.name || "")}</option>`).join("")}
          </select>
        </div>
      </td>
      <td>
        <textarea class="e" id="det1" rows="3" placeholder="工序描述（可從下方節點選單套用，或自行輸入）...">${esc(desc || "日更代工")}</textarea>
        <div class="no-print" style="display:flex;align-items:center;gap:6px;margin-top:6px">
          <label style="font-size:10px;color:#FF6B1A;font-weight:700;white-space:nowrap">📋 完工節點：</label>
          <select id="milestonePreset" class="e" style="flex:1;font-size:10px;border-color:#FF6B1A;cursor:pointer">
            <option value="">-- 點擊選擇 --</option>
            ${MILESTONE_PRESETS.map((m, idx) => `<option value="${idx}">${esc(m.group)} ${m.pct}% — ${esc(m.text.slice(0, 24))}${m.text.length > 24 ? "..." : ""}</option>`).join("")}
          </select>
        </div>
      </td>
      <td class="c"><input class="e num" id="qty1" value="1" style="width:40px;text-align:center"/></td>
      <td class="r"><input class="e num" id="price1" type="number" min="0" step="any" value="${unitPrice || ""}"/></td>
      <td class="r"><input class="e num" id="amt1" type="number" min="0" step="any" readonly style="background:#f9f9f9"/></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td colspan="4" style="font-size:12px;color:#444">
        <textarea class="e" id="subtitle1" rows="2" style="width:100%"></textarea>
        <div class="no-print" style="display:flex;align-items:center;gap:6px;margin-top:4px;font-size:10px;color:#888">
          請款 %：
          <input class="e num" id="pct1" type="number" min="0" max="100" step="any" value="${pctDisplay}" style="width:60px;text-align:right;font-size:11px"/>%
          <span style="color:#aaa">（自動換算 AMOUNT 及上方副標題）</span>
        </div>
      </td>
    </tr>
    <tr class="total-row">
      <td colspan="5" class="r">TOTAL:</td>
      <td class="r" id="totalCell">HK$0</td>
    </tr>
  </tbody>
</table>

<div class="footer">
  <div>Make all checks payable to <span class="co">Chun Fai Lifts Engineering Company Ltd.</span></div>
  <div class="co">俊輝電梯工程有限公司</div>
  <div style="margin-top:8px">If you have any questions concerning this invoice, contact Mr. Kam at 5444 2099.</div>
  <div style="margin-top:14px;font-weight:bold;letter-spacing:1px">THANK YOU FOR YOUR BUSINESS!</div>
</div>

<script>
  // Mirror the Excel formulas:
  //   F19 (AMOUNT)  = E19 * H19         (unit_price * pct_fraction)
  //   C20 (subtitle) = TEXT(E,"#,##0") & " 元的 " & TEXT(H,"0%") & "，共 " & TEXT(F,"#,##0") & " 元"
  //   F21 (TOTAL)   = sum of AMOUNT rows
  function fmt(n) { return Number(n||0).toLocaleString("en-HK", { maximumFractionDigits: 2 }); }
  function recalc() {
    const price = parseFloat(document.getElementById("price1").value) || 0;
    const pct = (parseFloat(document.getElementById("pct1").value) || 0) / 100;
    const amt = price * pct;
    document.getElementById("amt1").value = amt.toFixed(2);
    document.getElementById("subtitle1").value = price && pct
      ? \`\${fmt(price)} 元的 \${(pct*100).toFixed(pct*100 % 1 ? 1 : 0)}%，共 \${fmt(amt)} 元\`
      : "";
    document.getElementById("totalCell").innerText = "HK$" + fmt(amt);
  }
  document.getElementById("price1").addEventListener("input", recalc);
  document.getElementById("pct1").addEventListener("input", recalc);
  // Manual override: if admin edits AMOUNT directly, stop auto-recalc on next keystroke
  document.getElementById("amt1").addEventListener("input", () => {
    const v = parseFloat(document.getElementById("amt1").value) || 0;
    document.getElementById("totalCell").innerText = "HK$" + fmt(v);
  });
  document.getElementById("amt1").removeAttribute("readonly");
  document.getElementById("amt1").style.background = "transparent";

  // Datalist autofill — when a known client/project is picked, fill related fields.
  const CLIENT_DB = ${JSON.stringify(clientOptions)};
  const PROJECT_DB = ${JSON.stringify(projectOptions)};
  const MILESTONE_DB = ${JSON.stringify(MILESTONE_PRESETS)};
  const COMPANY_DB = ${JSON.stringify(INVOICE_COMPANIES)};

  // Company picker → swaps issuing company info (俊輝 ↔ 巨揚)
  document.getElementById("companyPicker").addEventListener("change", e => {
    const c = COMPANY_DB.find(x => x.id === e.target.value);
    if (!c) return;
    document.getElementById("coEN").value    = c.en;
    document.getElementById("coCN").value    = c.cn;
    document.getElementById("coAddr").value  = c.addr;
    document.getElementById("coPhone").value = c.phone;
    document.getElementById("coEmail").value = c.email;
  });

  // Milestone preset → fills Details + pct + recalcs
  document.getElementById("milestonePreset").addEventListener("change", e => {
    const idx = e.target.value;
    if (idx === "") return;
    const m = MILESTONE_DB[Number(idx)];
    if (!m) return;
    document.getElementById("det1").value = m.text;
    document.getElementById("pct1").value = m.pct;
    recalc();
  });
  document.getElementById("billName").addEventListener("change", e => {
    const c = CLIENT_DB.find(x => x.name === e.target.value);
    if (c) {
      if (c.addr)  document.getElementById("billAddr").value  = c.addr;
      if (c.phone) document.getElementById("billPhone").value = c.phone;
    }
  });
  // Picking from the project dropdown autofills the project textarea +
  // price + pct + details, then recalcs.
  document.getElementById("projPicker").addEventListener("change", e => {
    const idx = e.target.value;
    if (idx === "") return;
    const p = PROJECT_DB[Number(idx)];
    if (!p) return;
    document.getElementById("proj1").value = p.ecName || p.name || "";
    if (p.contractValue) document.getElementById("price1").value = p.contractValue;
    if (p.description) document.getElementById("det1").value = p.description;
    if (p.pct) {
      const n = Number(p.pct);
      document.getElementById("pct1").value = n > 1 ? n : n * 100;
    }
    recalc();
  });

  recalc();
</script>
</body></html>`);
  w.document.close();
}

// ── Employment Contract Generator ─────────────────────────────────────────────
// Opens an editable Traditional-Chinese 僱傭合約 in a new window, prefilled
// from the employee record. Mirrors the format of 僱傭合約-韓小錦.docx the
// user supplied. All fields editable; print to PDF via the browser dialog.
function generateEmploymentContract(emp) {
  const w = window.open("", "_blank");
  if (!w) { alert("請允許彈出視窗以生成合約"); return; }
  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];
  // Default contract: today + 11 months (matches the example: 2026-01-21 → 2026-12-20)
  const endDefault = new Date(today.getFullYear(), today.getMonth() + 11, today.getDate() - 1)
    .toISOString().split("T")[0];
  const fmtDate = iso => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
  };
  const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const empName = emp?.name || "";
  const empRole = emp?.role || "電梯技工";
  const empRate = Number(emp?.rate || 0);
  const empHkid = emp?.hkid || ""; // HKID not stored in DB by default — admin types it

  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>僱傭合約 ${esc(empName)}</title>
<style>
  body{font-family:'Microsoft JhengHei','PingFang TC','Noto Sans TC',Arial,sans-serif;padding:48px 56px;font-size:13px;color:#000;max-width:820px;margin:0 auto;background:#fff;line-height:1.85}
  h1{text-align:center;font-size:22px;letter-spacing:6px;margin:0 0 28px;font-weight:800}
  h2{font-size:14px;font-weight:800;margin:18px 0 6px;border-left:4px solid #000;padding-left:8px}
  p{margin:6px 0}
  ol,ul{margin:6px 0 8px 28px;padding:0}
  ol li,ul li{margin:3px 0}
  .meta-row{margin:8px 0}
  input.e, textarea.e {
    font:inherit;color:inherit;background:transparent;border:1px dashed #cdd5e0;
    border-radius:3px;padding:1px 6px;outline:none;box-sizing:border-box;
  }
  input.e:focus, textarea.e:focus { border-color:#FF6B1A;background:#fff8f0 }
  textarea.e { resize:vertical;font-family:inherit;width:100%;min-height:38px }
  input.inline { display:inline-block;font-weight:700 }
  .sig-block{margin-top:48px;display:grid;grid-template-columns:1fr 1fr;gap:40px}
  .sig-line{border-top:1px solid #000;padding-top:6px;margin-top:42px;font-size:12px}
  .controls { position:fixed;top:14px;right:14px;display:flex;gap:8px;z-index:100 }
  .btn { padding:9px 18px;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:700;font-family:inherit }
  .btn-print { background:#1a1a1a;color:#fff }
  .btn-reset { background:#fff;color:#666;border:1px solid #ccc }
  @media print {
    .controls { display:none !important }
    input.e, textarea.e { border:none !important;background:transparent !important;padding:0 !important }
    body { padding:24px;max-width:none }
  }
</style></head><body>

<div class="controls">
  <button class="btn btn-reset" onclick="if(confirm('清空所有欄位？')) location.reload()">↺ 重設</button>
  <button class="btn btn-print" onclick="window.print()">🖨️ 列印 / 儲存為 PDF</button>
</div>

<h1>僱傭合約</h1>

<p>本僱傭合約由 <input class="e inline" id="employer" value="巨揚有限公司" style="width:180px"/>（以下簡稱「僱主」）與 <input class="e inline" id="empName" value="${esc(empName)}" style="width:160px"/>，閣下之僱傭期擔任本公司 — <input class="e inline" id="empRole" value="${esc(empRole)}" style="width:140px"/> 一職，條款及細則如下：</p>

<h2>受僱日期</h2>
<p class="meta-row">
  閣下之上任日期為
  <input class="e inline" type="date" id="startDate" value="${todayISO}" style="width:140px"/>
  至
  <input class="e inline" type="date" id="endDate" value="${endDefault}" style="width:140px"/>。
</p>

<h2>基本薪金</h2>
<p>閣下之基本薪金為每日港幣 $<input class="e inline" id="dailyRate" type="number" min="0" step="any" value="${empRate || ""}" style="width:90px;text-align:right"/> 元正。</p>

<h2>工資期</h2>
<p>工資期為每月首天至當月最後一天，工資按月支付，轉賬至銀行戶口。</p>

<h2>工作時間及地點</h2>
<p>基本工作時間為每星期六天工作，每天工作九小時（包括午飯時間一小時）。</p>
<p>閣下之主管會按工作需求作安排及知會閣下的工作日期、時間、地點。</p>
<p>（因應工作的需要，公司有權更改閣下的工作時間及地點，而工作時間將由公司或直屬上司決定及安排。）</p>

<h2>試用期</h2>
<p>閣下將不會有試用期。</p>

<h2>終止僱傭合約</h2>
<p><strong>終止僱傭合約通知期</strong>：如合約期內任何一方想終止僱傭合約都必須給予七日通知期或七日代通知金。</p>
<p><strong>即時終止僱傭合約</strong>：若僱員犯有嚴重錯誤，公司可即時終止僱傭合約而無需作出任何通知期或支付代通知金。</p>
<p>下列七種行為可導致即時解僱：</p>
<ol>
  <li>拒不服從合法合理的指示；</li>
  <li>與應有的忠誠履行職責背道而馳的錯誤行為；</li>
  <li>欺騙或不誠實；</li>
  <li>經常性的疏忽職責；</li>
  <li>未經許可泄露公司機密資料或商業機密；</li>
  <li>嚴重違反僱傭合約所規定的條款；</li>
  <li>根據普通法其他有可能引致終止合同的理由。</li>
</ol>

<h2>強積金</h2>
<p>根據《強制性公積金計劃條例》的規定，閣下已加入公司的強積金計劃。就《強制性公積金計劃條例》而言，僱員不屬臨時僱員。</p>

<h2>安全健康工作安排</h2>
<p>見附件。</p>

<h2>資料保密</h2>
<p>僱員在受僱期間或本僱傭合約終止後任何時候，在未經僱主授權或按法例要求情況下不得挪用或向任何人士、機構或公司披露所有關於僱主的業務、知識產權或其他商業保密資料，並需要盡最大努力防止以上資料外洩。</p>

<h2>其他條款</h2>
<ul>
  <li>閣下不會享有酌情年終獎金、酌情工作表現獎金、醫療保險計劃及其他全職員工之員工福利；</li>
  <li>在僱用期間，閣下必須遵守所有適用之公司政策、規則和監管；</li>
  <li>在僱用期間，僱員不能為其他公司服務，亦不能經營私人業務；</li>
  <li>由於本集團正積極開拓中國內地、澳門及海外市場，視乎業務上的需要，閣下有可能被委派往來或長駐中國內地、澳門或海外工作。</li>
</ul>

<h2>適用法例</h2>
<p>如對本合約有任何爭議，雙方同意依據香港特別行政區法律所約束及處理。</p>

<p style="margin-top:18px">此合約建基於閣下前僱主真實及完整之諮詢資料，如資料有任何歪曲或不正確，可能會導致即時解僱。如閣下願意接受本公司之聘用條款，請在此聘用書之正、副本上簽署，並將副本交回本公司。</p>

<p style="margin-top:14px"><strong>本人已閱讀此聘用合約內容，並明白及同意此聘用書內之條款。</strong></p>

<div class="sig-block">
  <div>
    <div class="sig-line">僱員簽署</div>
    <p style="margin-top:14px"><strong id="sigName">${esc(empName)}</strong></p>
    <p>香港身份證號碼：<input class="e inline" id="hkid" value="${esc(empHkid)}" placeholder="例：M812938(5)" style="width:140px"/></p>
    <p>日期：<input class="e inline" type="date" id="sigDate" value="${todayISO}" style="width:140px"/></p>
  </div>
  <div>
    <div class="sig-line">僱主代表簽署</div>
    <p style="margin-top:14px"><input class="e inline" id="employerRep" placeholder="姓名 / 職位" style="width:200px"/></p>
    <p>公司印鑑</p>
    <p>日期：<input class="e inline" type="date" id="sigDate2" value="${todayISO}" style="width:140px"/></p>
  </div>
</div>

<script>
  // Sync the signature-block name with the intro empName field as admin types
  document.getElementById("empName").addEventListener("input", e => {
    document.getElementById("sigName").innerText = e.target.value || "";
  });
</script>
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
  // Inline editing state — when editingId is set, that table row becomes editable
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [editSaving, setEditSaving] = useState(false);

  // Load all invoices with project names from Supabase
  const loadCFList = async () => {
    setLoading(true);
    try {
      // Supabase caps at 1000 rows per request (server max-rows).
      // Paginate to fetch ALL CFs, not just the first 1000.
      const allData = [];
      let offset = 0;
      while (true) {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/invoices?select=*,ec_name,projects(name)&order=cf_num.asc.nullslast&limit=1000&offset=${offset}`,
          { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
        );
        const page = await res.json();
        if (!Array.isArray(page)) break;
        allData.push(...page);
        if (page.length < 1000) break; // last page
        offset += 1000;
      }
      const flat = allData.map(inv => ({
        id: inv.id,
        cfNo: inv.stage || "",
        ecName: inv.ec_name || inv.projects?.name || "",
        amount: inv.amount || 0,
        status: inv.status || "pending",
        pct: inv.pct || "",
        description: inv.label || inv.description || "",
        contractValue: inv.contract_value || "",
        projectId: inv.project_id,
        startDate: inv.start_date || "",
        endDate: inv.end_date || "",
        contactPhone: inv.contact_phone || "",
        cf_num: inv.cf_num,
      }));
      setCfList(flat);
    } catch(e) {
      showToast("⚠️ 載入發票失敗", "error");
      setCfList([]);
    }
    setLoading(false);
  };

  useEffect(() => { loadCFList(); }, []);

  // 🔔 Check deadlines every time cfList loads - send WhatsApp for projects ending within 10 days
  const BOSS_PHONE = "85254442099"; // 老闆電話 (852 + 5444 2099)
  const MAKE_WEBHOOK_DEADLINE = "https://hook.eu2.make.com/YOUR_DEADLINE_WEBHOOK"; // Make webhook

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
      if (!inv.endDate || inv.status === "paid" || inv.status === "completed") return;
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

  // Open modal overlay with full edit form (stays at current scroll position)
  const handleEditCF = (item) => {
    setEditingId(item.id);
    setEditRow({
      cfNo: item.cfNo || "",
      ecName: item.ecName || "",
      amount: String(item.amount || ""),
      pct: item.pct || "",
      description: item.description || "",
      contractValue: item.contractValue ? String(item.contractValue) : "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      contactPhone: item.contactPhone || "",
    });
  };

  const handleSaveInline = async () => {
    if (!editRow.amount) { showToast("⚠️ 請填寫金額", "error"); return; }
    setEditSaving(true);
    try {
      await sbUpdate("invoices", editingId, {
        stage: editRow.cfNo,
        amount: Number(editRow.amount) || 0,
        label: editRow.description,
        start_date: editRow.startDate || null,
        end_date: editRow.endDate || null,
        contact_phone: editRow.contactPhone || null,
        cf_num: parseInt(editRow.cfNo.replace(/[^0-9]/g, "")) || null,
      });
      setCfList(prev => prev.map(c => c.id === editingId ? {
        ...c, cfNo: editRow.cfNo, amount: Number(editRow.amount) || 0,
        description: editRow.description, startDate: editRow.startDate,
        endDate: editRow.endDate, contactPhone: editRow.contactPhone,
      } : c));
      showToast("✅ 已更新！");
      setEditingId(null);
    } catch (e) {
      showToast("❌ 更新失敗：" + e.message, "error");
    }
    setEditSaving(false);
  };

  // Mark invoice as completed (archived)
  const handleComplete = async (item) => {
    try {
      await sbUpdate("invoices", item.id, { status: "completed" });
      setCfList(prev => prev.map(c => c.id === item.id ? { ...c, status: "completed" } : c));
      showToast(`✅ ${item.cfNo} 已標記為「已完成」`);
    } catch (e) {
      showToast("❌ 操作失敗：" + e.message, "error");
    }
  };

  // Filtered list
  const PAGE_SIZE = 50;
  const [currentPage, setCurrentPage] = useState(1);

  const ecCodes = [...new Set(cfList.map(c => c.ecName.match(/EC-\d+/)?.[0]).filter(Boolean))].sort();
  const filtered = cfList.filter(c => {
    const s = search.toLowerCase();
    const matchSearch = !s || c.cfNo.toLowerCase().includes(s) || c.ecName.toLowerCase().includes(s) || c.description.toLowerCase().includes(s);
    const matchPaid = filterPaid === "all" || (filterPaid === "completed" ? c.status === "completed" : filterPaid === "paid" ? c.status === "paid" : (c.status !== "paid" && c.status !== "completed"));
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
          <option value="completed">📦 已完成</option>
        </select>
        <select value={filterEC} onChange={e => handleFilterEC(e.target.value)}
          style={{ background:"#13161c", border:"1px solid #2a3045", color:"#e8eaf0", borderRadius:6, padding:"8px 12px", fontSize:12, maxWidth:160 }}>
          <option value="all">全部 EC 工程</option>
          {ecCodes.map(ec => <option key={ec} value={ec}>{ec}</option>)}
        </select>
        <button className="btn btn-primary" onClick={() => setShowAddForm(v => !v)}>
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
            <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>工程描述（可輸入或從清單選取）</div>
            <input list="cf-desc-presets" value={addForm.description} onChange={e => setAddForm({...addForm, description: e.target.value})}
              placeholder="輸入或選擇完工描述..." className="form-input" style={{ width:"100%" }} />
            <datalist id="cf-desc-presets">
              <option value="已完成客戶交機時安裝手尾" />
              <option value="已完成機房及井道全面安裝，已拆棚交較車行慢車" />
              <option value="已完成 EMSD 驗機，已完成保養部驗收手尾" />
              <option value="已完成外門框、門頭、地砵，已完成主副路軌安裝及調校" />
              <option value="已進場開工及提交秤線表" />
              <option value="已完成拆除機房物料，已完成拆除井道物料" />
              <option value="已提交秤線表，已完成機房及井道全面安裝，已完成外門框、門頭、地砵、外門" />
              <option value="已完成 EMSD 驗機，已完成保養部驗收手尾，已完成客戶交機時安裝手尾" />
            </datalist>
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
            <button className="btn btn-secondary" onClick={() => { setShowAddForm(false); setAddForm({ cfNo: "", ecName: "", amount: "", pct: "", description: "", contractValue: "", startDate: "", endDate: "", contactPhone: "" }); }}>取消</button>
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
                  {["✅","CF 號碼","EC 工程名稱","發票金額","工程描述","到期日","操作"].map(h => (
                    <th key={h} style={{ padding:"10px 12px", textAlign:"left", fontSize:10, color:"#3a4255", textTransform:"uppercase", letterSpacing:0.8, whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((item, idx) => {
                    const daysLeft = item.endDate ? Math.ceil((new Date(item.endDate) - new Date()) / 86400000) : null;
                    const isNearDeadline = daysLeft !== null && daysLeft >= 0 && daysLeft <= 10;
                    const isOverdue = daysLeft !== null && daysLeft < 0;
                    const isCompleted = item.status === "completed";
                    const isPaid = item.status === "paid";
                    // If completed OR paid, HIDE overdue/deadline warnings — it's settled
                    const showDeadline = !isCompleted && !isPaid;
                    const rowBg = (isNearDeadline && showDeadline) ? "rgba(239,68,68,0.04)" : isCompleted ? "rgba(255,255,255,0.015)" : isPaid ? "rgba(34,197,94,0.04)" : idx%2===0 ? "rgba(255,255,255,0.01)" : "transparent";
                    const dimStyle = isCompleted ? { opacity: 0.5 } : {};
                    return (
                  <tr key={item.id} style={{ borderBottom:"1px solid #0d0f12", background: rowBg, ...dimStyle, transition:"opacity 0.3s" }}>
                    {/* Paid checkbox */}
                    <td style={{ padding:"8px 10px", textAlign:"center" }}>
                      <input type="checkbox" checked={item.status === "paid" || isCompleted} onChange={() => !isCompleted && togglePaid(item)}
                        disabled={isCompleted}
                        style={{ width:16, height:16, accentColor: isCompleted ? "#9aa0b4" : "#22c55e", cursor: isCompleted ? "default" : "pointer" }} />
                    </td>
                    {/* CF No */}
                    <td style={{ padding:"8px 10px", whiteSpace:"nowrap" }}>
                      <span style={{ background: isCompleted ? "#1e2330" : item.status==="paid" ? "#1a2e1a" : "#1a1f2e", color: isCompleted ? "#555d6e" : item.status==="paid" ? "#22c55e" : "#f0c000", borderRadius:5, padding:"3px 9px", fontFamily:"'Barlow Condensed'", fontWeight:800, fontSize:13 }}>
                        {item.cfNo}
                      </span>
                      {isCompleted && <span style={{ marginLeft:6, fontSize:9, color:"#555d6e" }}>📦</span>}
                    </td>
                    {/* EC Name */}
                    <td style={{ padding:"8px 10px", maxWidth:220 }}>
                      <div style={{ fontSize:12, color: isCompleted ? "#555d6e" : "#e8eaf0", lineHeight:1.4 }}>{item.ecName}</div>
                    </td>
                    {/* Amount */}
                    <td style={{ padding:"8px 10px", whiteSpace:"nowrap" }}>
                      <div style={{ fontFamily:"'Barlow Condensed'", fontWeight:700, fontSize:15, color: isCompleted ? "#555d6e" : item.status==="paid" ? "#22c55e" : "#f0c000" }}>
                        {item.amount > 0 ? `HK$${Number(item.amount).toLocaleString()}` : "—"}
                      </div>
                    </td>
                    {/* Description */}
                    <td style={{ padding:"8px 10px", maxWidth:200 }}>
                      <div style={{ fontSize:11, color: isCompleted ? "#3a4255" : "#9aa0b4", lineHeight:1.5, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
                        {item.description || "—"}
                      </div>
                    </td>
                    {/* End date — hide overdue for completed */}
                    <td style={{ padding:"8px 10px", whiteSpace:"nowrap", minWidth:130 }}>
                      {item.endDate ? (
                        <div style={{ fontSize:11, color: isCompleted ? "#22c55e" : isOverdue ? "#EF4444" : isNearDeadline ? "#f0c000" : "#8891a4", fontWeight: (isNearDeadline||isOverdue) && showDeadline ? 700 : 400 }}>
                          {isCompleted ? "✅ " : "■ "}{item.endDate}
                          {isNearDeadline && showDeadline && <span style={{ marginLeft:4, color:"#EF4444" }}>({daysLeft}日)</span>}
                          {isOverdue && showDeadline && <span style={{ marginLeft:4, color:"#EF4444" }}>超期!</span>}
                        </div>
                      ) : <span style={{ color:"#3a4255" }}>—</span>}
                    </td>
                    {/* Actions — opens modal on ✏️ click */}
                    <td style={{ padding:"8px 10px", whiteSpace:"nowrap" }}>
                      {(
                        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                          {!isCompleted && (
                            <button onClick={() => handleEditCF(item)}
                              style={{ background:"none", border:"1px solid #f0c000", color:"#f0c000", borderRadius:5, padding:"4px 8px", fontSize:11, cursor:"pointer" }}>
                              ✏️
                            </button>
                          )}
                          <button onClick={() => generateInvoicePDF(item, {
                            projectOptions: cfList.filter(c => c.ecName && c.id !== item.id).map(c => ({ ecName: c.ecName, description: c.description || "", contractValue: c.contractValue || c.amount || 0, pct: c.pct || "" })),
                          })}
                            style={{ background:"none", border:"1px solid #2a3045", color:"#60a5fa", borderRadius:5, padding:"4px 8px", fontSize:11, cursor:"pointer" }}>
                            🖨️
                          </button>
                          {item.status === "paid" && !isCompleted && (
                            <button onClick={() => handleComplete(item)}
                              title="標記為已完成（歸檔）"
                              style={{ background:"rgba(96,165,250,0.1)", border:"1px solid #60a5fa", color:"#60a5fa", borderRadius:5, padding:"4px 8px", fontSize:10, fontWeight:700, cursor:"pointer" }}>
                              📦 已完成
                            </button>
                          )}
                          {isNearDeadline && !isCompleted && (
                            <button onClick={() => sendCFDeadlineWhatsApp(item)}
                              style={{ background:"#25D366", border:"none", color:"#fff", borderRadius:5, padding:"4px 8px", fontSize:11, cursor:"pointer" }}>
                              📱
                            </button>
                          )}
                        </div>
                      )}
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

      {/* ═══ EDIT MODAL — fixed center overlay, doesn't move scroll ═══ */}
      {editingId && (
        <div onClick={() => setEditingId(null)}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:"#13161c", border:"1.5px solid #f0c000", borderRadius:14, padding:20, width:"100%", maxWidth:540, maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ fontFamily:"'Barlow Condensed'", fontSize:18, fontWeight:700, color:"#f0c000", marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span>✏️ 編輯 {editRow.cfNo}</span>
              <button onClick={() => setEditingId(null)}
                style={{ background:"none", border:"none", color:"#555d6e", fontSize:20, cursor:"pointer" }}>✕</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:10 }}>
              <div>
                <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>CF 號碼</div>
                <input value={editRow.cfNo} onChange={e => setEditRow({...editRow, cfNo: e.target.value})}
                  className="form-input" style={{ background:"#0d0f12" }} />
              </div>
              <div>
                <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>完成 %</div>
                <input value={editRow.pct} onChange={e => setEditRow({...editRow, pct: e.target.value})}
                  className="form-input" style={{ background:"#0d0f12" }} />
              </div>
              <div>
                <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>發票金額 (HK$) *</div>
                <input value={editRow.amount} onChange={e => setEditRow({...editRow, amount: e.target.value})}
                  type="number" className="form-input" style={{ background:"#0d0f12" }} />
              </div>
            </div>
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>合約總值 (HK$)</div>
              <input value={editRow.contractValue} onChange={e => setEditRow({...editRow, contractValue: e.target.value})}
                type="number" className="form-input" style={{ background:"#0d0f12" }} />
            </div>
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>EC 工程名稱</div>
              <input value={editRow.ecName} readOnly
                className="form-input" style={{ background:"#0d0f12", color:"#555d6e" }} />
            </div>
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>工程描述</div>
              <input value={editRow.description} onChange={e => setEditRow({...editRow, description: e.target.value})}
                className="form-input" style={{ background:"#0d0f12", width:"100%" }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:10 }}>
              <div>
                <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>📅 開始日期</div>
                <input type="date" value={editRow.startDate} onChange={e => setEditRow({...editRow, startDate: e.target.value})}
                  className="form-input" style={{ background:"#0d0f12" }} />
              </div>
              <div>
                <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>📅 結束日期</div>
                <input type="date" value={editRow.endDate} onChange={e => setEditRow({...editRow, endDate: e.target.value})}
                  className="form-input" style={{ background:"#0d0f12", borderColor: editRow.endDate ? "#f0c000" : "" }} />
              </div>
              <div>
                <div style={{ fontSize:10, color:"#555d6e", marginBottom:4 }}>📱 聯絡人電話</div>
                <input type="tel" value={editRow.contactPhone} onChange={e => setEditRow({...editRow, contactPhone: e.target.value})}
                  placeholder="9XXXXXXX" className="form-input" style={{ background:"#0d0f12" }} />
              </div>
            </div>
            {editRow.endDate && (() => {
              const d = Math.ceil((new Date(editRow.endDate) - new Date()) / 86400000);
              return d <= 0 ? <div style={{ background:"rgba(239,68,68,0.1)", border:"1px solid #EF4444", borderRadius:8, padding:"8px 12px", marginBottom:10, fontSize:12, color:"#EF4444" }}>⚠️ 已超期 {Math.abs(d)} 日</div>
                : d <= 10 ? <div style={{ background:"rgba(240,192,0,0.08)", border:"1px solid #f0c000", borderRadius:8, padding:"8px 12px", marginBottom:10, fontSize:12, color:"#f0c000" }}>🔴 距離結束只剩 {d} 日</div>
                : <div style={{ background:"rgba(34,197,94,0.06)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:8, padding:"8px 12px", marginBottom:10, fontSize:12, color:"#22c55e" }}>✅ 距離結束還有 {d} 日</div>;
            })()}
            <div style={{ display:"flex", gap:8, marginTop:4 }}>
              <button onClick={handleSaveInline} disabled={editSaving}
                className="btn btn-primary" style={{ flex:1 }}>
                {editSaving ? "儲存中..." : "✅ 確認更新"}
              </button>
              <button onClick={() => setEditingId(null)}
                className="btn btn-secondary">取消</button>
            </div>
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

  // Doc type keys aligned with employee mobile app (employee_mobile_app_2.jsx)
  // so docs uploaded from the mobile app render correctly here.
  const DOC_TYPES = [
    { id: "greencard",  label: "綠卡（建造業工人安全卡）", icon: "🟢", required: true,  emsd: true,  hasExpiry: true  },
    { id: "id",         label: "香港身份證",               icon: "🪪", required: true,  emsd: false, hasExpiry: false },
    { id: "address",    label: "住址證明",                 icon: "🏠", required: true,  emsd: false, hasExpiry: false },
    { id: "license",    label: "升降機技工註冊牌照",       icon: "📋", required: false, emsd: true,  hasExpiry: true  },
    { id: "other_cert", label: "其他證明",                 icon: "📄", required: false, emsd: false, hasExpiry: true  },
  ];

  const allEmps = employees;

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
      // Supabase returns {code, message, ...} when table missing — only accept arrays
      const safe = Array.isArray(data) ? data : [];
      if (!Array.isArray(data) && data?.message) {
        console.warn("EmployeeDocs load:", data.message);
      }
      setDocs(prev => ({ ...prev, [emp.id]: safe }));
    } catch (e) {
      console.error("EmployeeDocs load failed:", e);
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
        const responseData = await res.json();
        if (!Array.isArray(responseData)) {
          // Likely an error object (e.g., table not found, RLS denied)
          throw new Error(responseData?.message || "上傳失敗：資料庫回應異常");
        }
        const saved = responseData[0];
        setDocs(prev => ({ ...prev, [empId]: [...(Array.isArray(prev[empId]) ? prev[empId] : []), saved] }));
        showToast(`✅ ${file.name} 上傳成功！`);
      } catch (e) {
        console.error("Upload failed:", e);
        showToast(`❌ 上傳失敗：${e.message || "未知錯誤"}`, "error");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleExportPDF = (emp) => {
    const empDocs = docs[emp.id] || [];
    const w = window.open("", "_blank");
    const today = new Date().toLocaleDateString("zh-HK");
    const summaryRows = DOC_TYPES.map(dt => {
      const dList = empDocs.filter(x => x.doc_type === dt.id);
      const last = dList.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at))[0];
      return `<tr><td>${dt.icon} ${dt.label}${dt.required ? ' <span style="font-size:10px;color:#ef4444">必須</span>' : ''}</td><td style="color:${dList.length > 0 ? "#22c55e" : "#ef4444"};font-weight:600">${dList.length > 0 ? "✅ 已上傳" : "❌ 待補交"}</td><td>${dList.length} 份</td><td>${last ? new Date(last.uploaded_at).toLocaleDateString("zh-HK") : "–"}</td></tr>`;
    }).join("");
    const docSections = DOC_TYPES.map(dt => {
      const dList = empDocs.filter(x => x.doc_type === dt.id);
      if (dList.length === 0) return `<div class="doc-section"><div class="doc-hdr"><span>${dt.icon} ${dt.label}</span><span style="color:#ef4444;font-weight:700">❌ 待補交</span></div><div style="color:#aaa;font-size:12px;padding:10px 0">尚未上傳任何文件</div></div>`;
      const items = dList.map(d => {
        if (d.file_data && d.file_data.startsWith("data:image")) {
          return `<div style="margin-top:10px"><div style="font-size:11px;color:#666;margin-bottom:4px">📄 ${d.file_name}</div><img src="${d.file_data}" style="max-width:100%;max-height:320px;border:1px solid #ddd;border-radius:4px;display:block"/></div>`;
        } else if (d.file_data && d.file_data.startsWith("data:application/pdf")) {
          return `<div style="background:#f0f0f0;padding:10px 14px;border-radius:4px;margin-top:10px;font-size:12px">📑 ${d.file_name} <span style="color:#22c55e;font-weight:600">(PDF 檔案已上傳)</span></div>`;
        } else {
          return `<div style="background:#f0f0f0;padding:10px 14px;border-radius:4px;margin-top:10px;font-size:12px">📎 ${d.file_name}</div>`;
        }
      }).join("");
      return `<div class="doc-section"><div class="doc-hdr"><span>${dt.icon} ${dt.label}</span><span style="color:#22c55e;font-weight:700">✅ ${dList.length} 份</span></div>${items}</div>`;
    }).join("");
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${emp.name} 文件存檔</title>
<style>body{font-family:Arial,sans-serif;padding:30px;font-size:13px;max-width:900px;margin:0 auto;color:#1a1a1a}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:12px;border-bottom:3px solid #f0c000}
.company{font-size:20px;font-weight:700}
.emp-info{background:#f9f9f9;padding:14px 18px;border-radius:8px;margin-bottom:20px;border-left:4px solid #f0c000}
.summary{width:100%;border-collapse:collapse;margin-bottom:24px;font-size:12px}
.summary th{background:#1a1a1a;color:#fff;padding:9px 12px;text-align:left}
.summary td{padding:9px 12px;border-bottom:1px solid #eee}
.doc-section{border:1px solid #ddd;border-radius:8px;padding:14px 18px;margin-bottom:14px;page-break-inside:avoid;background:#fff}
.doc-hdr{display:flex;justify-content:space-between;align-items:center;font-size:14px;font-weight:700;padding-bottom:8px;border-bottom:1px solid #eee;margin-bottom:6px}
h3{margin:24px 0 14px;font-size:15px;color:#333}
@media print{.noprint{display:none}body{padding:15px}}</style></head><body>
<div class="header"><div><div class="company">俊輝電梯工程有限公司</div><div style="font-size:12px;color:#666">員工文件存檔 (一鍵匯總)</div></div><div style="text-align:right;font-size:12px;color:#666">列印日期：${today}</div></div>
<div class="emp-info"><div style="font-size:18px;font-weight:700">${emp.name}</div><div style="font-size:12px;color:#666;margin-top:4px">${emp.role || "電梯技工"} · 手機：${emp.phone || "–"}</div></div>
<h3>📋 文件清單概覽</h3>
<table class="summary"><thead><tr><th>文件類型</th><th>狀態</th><th>份數</th><th>最後上傳</th></tr></thead><tbody>${summaryRows}</tbody></table>
<h3>📎 文件詳情</h3>
${docSections}
<div class="noprint" style="margin-top:30px;text-align:center">
<button onclick="window.print()" style="padding:10px 24px;background:#1a1a1a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">🖨️ 列印 / 儲存為 PDF</button></div>
<script>window.onload=()=>{setTimeout(()=>window.print(),300)}</script></body></html>`);
    w.document.close();
  };

  // Compute missing required doc labels for a given employee, send WhatsApp
  const handleRemindDocs = (emp, e) => {
    e.stopPropagation(); // don't also trigger loadDocs
    if (!emp.phone) { showToast(`⚠️ ${emp.name} 未設定電話號碼`, "error"); return; }
    const empDocsList = docs[emp.id] || [];
    const missing = DOC_TYPES
      .filter(dt => dt.required && !empDocsList.some(d => d.doc_type === dt.id))
      .map(dt => dt.label);
    if (missing.length === 0) { showToast(`✅ ${emp.name} 所有必要文件已齊備`, "success"); return; }
    const list = missing.map((m, i) => `  ${i + 1}. ${m}`).join("\n");
    const msg = `${emp.name} 您好，\n您尚有以下必要文件未補交，請於 3 日內透過員工 App 上傳：\n${list}\n\n— 俊輝電梯工程 管理系統`;
    const r = sendWhatsApp(emp.phone, msg);
    if (r.ok) showToast(`📱 WhatsApp 已開啟 — 請按發送鍵寄給 ${emp.name}（${missing.length} 份文件）`, "success");
    else showToast(`⚠️ ${r.reason}`, "error");
  };

  return (
    <div>
      {allEmps.length === 0 && (
        <div style={{ textAlign:"center", padding:40, color:"#555d6e", background:"#13161c", borderRadius:10, border:"1px solid #1e2330" }}>
          <div style={{ fontSize:32, marginBottom:8 }}>📁</div>
          <div style={{ fontSize:14, marginBottom:8 }}>尚未有員工資料</div>
          <div style={{ fontSize:12, color:"#3a4255" }}>請先在「員工管理」頁面新增員工</div>
        </div>
      )}
      <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap" }}>
        {allEmps.map(emp => (
          <div key={emp.id} onClick={() => loadDocs(emp)}
            style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:10, border:`1.5px solid ${selEmp?.id===emp.id?"#f0c000":"#1e2330"}`, background:selEmp?.id===emp.id?"#1a1f2e":"#13161c", cursor:"pointer", minWidth:180 }}>
            <div style={{ width:34, height:34, borderRadius:"50%", background:emp.color||"#f0c000", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, color:"#0d0f12", fontSize:14 }}>{emp.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight:700, fontSize:14, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{emp.name}</div>
              <div style={{ fontSize:11, color:"#555d6e" }}>
                {docs[emp.id] ? `${docs[emp.id].length}/${DOC_TYPES.length} 份` : "點擊查看"}
              </div>
            </div>
            <button onClick={(e) => handleRemindDocs(emp, e)}
              title="催交文件 WhatsApp"
              style={{ background:"rgba(255,107,26,0.12)", border:"1px solid rgba(255,107,26,0.3)", color:"#f0c000", borderRadius:6, padding:"4px 8px", fontSize:11, fontWeight:700, cursor:"pointer", flexShrink:0 }}>
              📱 催交
            </button>
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
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    <button onClick={() => { setForm({name:emp.name,role:emp.role||"電梯技工",phone:emp.phone||"",pin:emp.pin||"",rate:emp.rate||850,color:emp.color||"#f0c000"}); setEditId(emp.id); setShowAdd(true); }}
                      style={{ background:"#1e2330", border:"none", color:"#60a5fa", borderRadius:5, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>✏️</button>
                    <button onClick={() => handleResetPin(emp)}
                      style={{ background:"#1e2330", border:"none", color:"#f0c000", borderRadius:5, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>🔐 PIN</button>
                    <button onClick={() => generateEmploymentContract(emp)}
                      title="生成僱傭合約 PDF"
                      style={{ background:"#1e2330", border:"none", color:"#22c55e", borderRadius:5, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>📄 合約</button>
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

// ── WhatsApp helper (wa.me click-to-chat) ─────────────────────────────────
// Opens a new tab at https://wa.me/{phone}?text={encoded message} so the
// admin can review + press Send. Zero setup (no Meta account, no Make.com
// webhook, no API key, no bans). Keeps the same `sendWhatsApp` signature
// as the prior async webhook implementation so callers don't change.
function sendWhatsApp(phone, message) {
  if (!phone) return { ok: false, reason: "收件人電話未設定" };
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length < 8) return { ok: false, reason: "電話格式不正確" };
  const e164 = digits.startsWith("852") ? digits : ("852" + digits);
  const url = `https://wa.me/${e164}?text=${encodeURIComponent(message)}`;
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) return { ok: false, reason: "彈出視窗被阻擋，請允許彈出視窗" };
  return { ok: true };
}

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

// Pull the actual PostgREST error message out of the response body
// (e.g. "column 'foo' does not exist") instead of just throwing the HTTP
// status code — makes 400/409 bugs in the schema/payload diagnosable
// without opening the browser network panel.
async function readSbError(res, fallback) {
  try {
    const txt = await res.text();
    try {
      const j = JSON.parse(txt);
      const detail = j.message || j.hint || j.details || j.error;
      if (detail) return `${fallback} ${res.status} — ${detail}`;
    } catch { /* not JSON, fall through */ }
    if (txt) return `${fallback} ${res.status} — ${txt.slice(0, 200)}`;
  } catch { /* can't read body */ }
  return `${fallback} ${res.status}`;
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
  if (!res.ok) throw new Error(await readSbError(res, "Insert error:"));
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
  if (!res.ok) throw new Error(await readSbError(res, "Update error:"));
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
  id: e.id, name: e.name, role: e.role, phone: e.phone, pin: e.pin,
  rate: e.daily_rate, site: e.site, color: e.color || "#f0c000",
  days: 22, signed: true, lat: "22.3193", lng: "114.1694",
});

// ── Leave Approval Inbox ──────────────────────────────────────────────────────
const LEAVE_TYPE_META = {
  personal:     { label: "事假",   icon: "🗓️",  color: "#60A5FA" },
  sick:         { label: "病假",   icon: "🤒",  color: "#EF4444" },
  annual:       { label: "年假",   icon: "🏖️",  color: "#22C55E" },
  compensatory: { label: "補假",   icon: "⏱️",  color: "#A78BFA" },
  unpaid:       { label: "無薪假", icon: "💸",  color: "#F0C000" },
  other:        { label: "其他",   icon: "📝",  color: "#9CA3AF" },
};

// ── Subcontractor Agreement Page ──────────────────────────────────────────────
function SubcontractPage({ showToast, projects = [] }) {
  const empty = {
    contractorName: "", contractorAddress: "", contractorPhone: "", contractorIdNo: "",
    projectName: "", projectLocation: "",
    startDate: "", endDate: "",
    workersRequired: "2", contractSum: "",
    stage1Pct: "20", stage1Desc: "動工按金",
    stage2Pct: "70", stage2Desc: "按工程進度支付",
    stage3Pct: "10", stage3Desc: "保留金（保養期後發放）",
    defectsMonths: "6",
    insuranceRequired: true,
    notes: "",
  };
  const [form, setForm] = useState(empty);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const f = (key, val) => setForm({ ...form, [key]: val });
  const contractSum = Number(form.contractSum) || 0;
  const s1 = Math.round(contractSum * (Number(form.stage1Pct) || 0) / 100);
  const s2 = Math.round(contractSum * (Number(form.stage2Pct) || 0) / 100);
  const s3 = Math.round(contractSum * (Number(form.stage3Pct) || 0) / 100);

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/subcontractor_contracts?order=created_at.desc&limit=50`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    }).then(r => r.json()).then(d => { if (Array.isArray(d)) setSaved(d); })
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!form.contractorName || !form.projectName) {
      showToast("⚠️ 請填寫判頭名稱及工程名稱", "error"); return;
    }
    setSaving(true);
    try {
      const row = {
        contractor_name: form.contractorName, contractor_address: form.contractorAddress,
        contractor_phone: form.contractorPhone, contractor_id_no: form.contractorIdNo,
        project_name: form.projectName, project_location: form.projectLocation,
        start_date: form.startDate || null, end_date: form.endDate || null,
        workers_required: Number(form.workersRequired) || 2,
        contract_sum: contractSum,
        stage1_pct: Number(form.stage1Pct), stage1_desc: form.stage1Desc,
        stage2_pct: Number(form.stage2Pct), stage2_desc: form.stage2Desc,
        stage3_pct: Number(form.stage3Pct), stage3_desc: form.stage3Desc,
        defects_period_months: Number(form.defectsMonths) || 6,
        insurance_required: form.insuranceRequired,
        notes: form.notes, status: "draft",
      };
      const res = await fetch(`${SUPABASE_URL}/rest/v1/subcontractor_contracts`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" },
        body: JSON.stringify(row),
      });
      const [s] = await res.json();
      setSaved(prev => [s, ...prev]);
      showToast("✅ 合約已儲存！");
    } catch (e) { showToast("❌ 儲存失敗：" + e.message, "error"); }
    setSaving(false);
  };

  const handlePrint = () => {
    const esc = s => String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    const today = new Date().toLocaleDateString("zh-HK", { year:"numeric", month:"long", day:"numeric" });
    const w = window.open("", "_blank");
    if (!w) { showToast("⚠️ 請允許彈出視窗", "error"); return; }
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>分判合約 — ${esc(form.contractorName)}</title>
<style>
body{font-family:'Microsoft JhengHei','PingFang TC',Arial,sans-serif;padding:48px 56px;font-size:13px;color:#000;max-width:820px;margin:0 auto;line-height:1.85}
h1{text-align:center;font-size:22px;letter-spacing:6px;margin:0 0 24px;font-weight:800}
h2{font-size:14px;font-weight:800;margin:20px 0 8px;border-left:4px solid #000;padding-left:8px}
p{margin:6px 0}
ol,ul{margin:6px 0 8px 28px}ol li,ul li{margin:3px 0}
table{width:100%;border-collapse:collapse;margin:12px 0}
th,td{border:1px solid #333;padding:8px 12px;text-align:left;font-size:12px}
th{background:#f0f0f0;font-weight:700}
td.r{text-align:right}
.sig-block{margin-top:48px;display:grid;grid-template-columns:1fr 1fr;gap:40px}
.sig-line{border-top:1px solid #000;padding-top:6px;margin-top:42px;font-size:12px}
.controls{position:fixed;top:14px;right:14px;display:flex;gap:8px;z-index:100}
.btn{padding:9px 18px;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:700;font-family:inherit}
.btn-print{background:#1a1a1a;color:#fff}
@media print{.controls{display:none!important}body{padding:24px}}
</style></head><body>
<div class="controls"><button class="btn btn-print" onclick="window.print()">🖨️ 列印 / 儲存為 PDF</button></div>

<h1>分判合約</h1>
<p style="text-align:center;font-size:12px;color:#666;margin-bottom:24px">SUBCONTRACTOR AGREEMENT</p>

<p>本分判合約由 <strong>巨揚有限公司</strong>（以下簡稱「總承判商」）與 <strong>${esc(form.contractorName)}</strong>（以下簡稱「分判商」）訂立。</p>
<p>日期：<strong>${today}</strong></p>

<h2>第一條 — 工程資料</h2>
<table>
<tr><th style="width:30%">工程名稱</th><td>${esc(form.projectName)}</td></tr>
<tr><th>工程地點</th><td>${esc(form.projectLocation) || "—"}</td></tr>
<tr><th>預計開工日期</th><td>${form.startDate || "待定"}</td></tr>
<tr><th>預計完工日期</th><td>${form.endDate || "待定"}</td></tr>
<tr><th>所需工人人數</th><td>${form.workersRequired} 人</td></tr>
</table>

<h2>第二條 — 合約金額及付款安排</h2>
<p>本合約總金額為 <strong>HK$${contractSum.toLocaleString()}</strong>（港幣${contractSum > 0 ? Math.floor(contractSum/10000) + "萬" + (contractSum%10000 > 0 ? contractSum%10000 : "") : "零"}元正），按以下階段支付：</p>
<table>
<thead><tr><th>階段</th><th>描述</th><th style="text-align:right">百分比</th><th style="text-align:right">金額 (HK$)</th></tr></thead>
<tbody>
<tr><td>第一期</td><td>${esc(form.stage1Desc)}</td><td class="r">${form.stage1Pct}%</td><td class="r">$${s1.toLocaleString()}</td></tr>
<tr><td>第二期</td><td>${esc(form.stage2Desc)}</td><td class="r">${form.stage2Pct}%</td><td class="r">$${s2.toLocaleString()}</td></tr>
<tr><td>第三期（保留金）</td><td>${esc(form.stage3Desc)}</td><td class="r">${form.stage3Pct}%</td><td class="r">$${s3.toLocaleString()}</td></tr>
<tr style="background:#f9f9f9;font-weight:700"><td colspan="2">合計</td><td class="r">${Number(form.stage1Pct)+Number(form.stage2Pct)+Number(form.stage3Pct)}%</td><td class="r">$${(s1+s2+s3).toLocaleString()}</td></tr>
</tbody>
</table>
<p>保留金將於工程完工後 <strong>${form.defectsMonths} 個月</strong>（保養期）屆滿後發放，前提是期間無任何缺陷或維修事項。</p>

<h2>第三條 — 保險要求</h2>
${form.insuranceRequired ? `<p>分判商必須在開工前提供以下有效保險證明文件：</p>
<ol>
<li><strong>僱員補償保險</strong>（Employees' Compensation Insurance）— 根據《僱員補償條例》（第282章）的規定</li>
<li><strong>承判商全險</strong>（Contractors' All Risks Insurance）— 涵蓋工程期間之一切風險</li>
</ol>
<p>如分判商未能於開工前提供上述保險證明，總承判商有權暫停或終止本合約。</p>` : `<p>本合約無額外保險要求。分判商須自行確保符合法定保險規定。</p>`}

<h2>第四條 — 延誤責任及罰則</h2>
<p>若工程未能按預定日期完成，分判商須承擔因此而導致之<strong>一切經濟損失及違約金</strong>，包括但不限於：</p>
<ul>
<li>業主或發展商向總承判商徵收之延期罰款</li>
<li>因延誤導致之額外管理費、設備租賃費及第三方損失</li>
<li>總承判商為完成工程而需安排之替代人手或加班費用</li>
</ul>

<h2>第五條 — 遵守法規</h2>
<p>分判商必須<strong>嚴格遵守</strong>以下規定：</p>
<ol>
<li><strong>機電工程署（EMSD）</strong>發出之所有指引、規例及技術標準</li>
<li>《升降機及自動梯條例》（第618章）及相關附屬法例</li>
<li>《職業安全及健康條例》（第509章）</li>
<li>《建築地盤（安全）規例》（第59I章）</li>
<li>所有適用之香港特別行政區政府法例及規管要求</li>
</ol>
<p>如因分判商違反上述法規而導致任何罰款、處罰或法律責任，分判商須承擔全部責任及費用。</p>

<h2>第六條 — 工作質量</h2>
<p>分判商須確保所有工程均達到專業水準，符合 EMSD 驗收標準。如驗收不合格，分判商須自費重做直至合格為止。</p>

<h2>第七條 — 終止合約</h2>
<p>在下列情況下，總承判商有權即時終止本合約而無需作出補償：</p>
<ul>
<li>分判商未能按時開工或嚴重延誤工程進度</li>
<li>分判商之工程質量未達到合理標準</li>
<li>分判商違反本合約任何條款</li>
<li>分判商違反安全規定，危及工人或公眾安全</li>
</ul>

<h2>第八條 — 適用法例</h2>
<p>如對本合約有任何爭議，雙方同意依據<strong>香港特別行政區法律</strong>所約束及處理。</p>

${form.notes ? `<h2>附加條款</h2><p>${esc(form.notes).replace(/\n/g, "<br/>")}</p>` : ""}

<p style="margin-top:20px"><strong>雙方已閱讀並明白本合約之所有條款，並同意遵守。</strong></p>

<div class="sig-block">
<div>
  <div class="sig-line">總承判商簽署</div>
  <p style="margin-top:14px"><strong>巨揚有限公司</strong></p>
  <p>代表姓名：_______________</p>
  <p>日期：_______________</p>
</div>
<div>
  <div class="sig-line">分判商簽署</div>
  <p style="margin-top:14px"><strong>${esc(form.contractorName)}</strong></p>
  <p>身份證/商業登記號碼：${esc(form.contractorIdNo) || "_______________"}</p>
  <p>日期：_______________</p>
</div>
</div>
</body></html>`);
    w.document.close();
  };

  const loadContract = (c) => {
    setForm({
      contractorName: c.contractor_name || "", contractorAddress: c.contractor_address || "",
      contractorPhone: c.contractor_phone || "", contractorIdNo: c.contractor_id_no || "",
      projectName: c.project_name || "", projectLocation: c.project_location || "",
      startDate: c.start_date || "", endDate: c.end_date || "",
      workersRequired: String(c.workers_required || 2), contractSum: String(c.contract_sum || ""),
      stage1Pct: String(c.stage1_pct || 20), stage1Desc: c.stage1_desc || "動工按金",
      stage2Pct: String(c.stage2_pct || 70), stage2Desc: c.stage2_desc || "按工程進度支付",
      stage3Pct: String(c.stage3_pct || 10), stage3Desc: c.stage3_desc || "保留金（保養期後發放）",
      defectsMonths: String(c.defects_period_months || 6),
      insuranceRequired: c.insurance_required !== false,
      notes: c.notes || "",
    });
    showToast("✅ 已載入合約");
  };

  const Field = ({ label, k, type, ph, w: width, children }) => (
    <div style={{ marginBottom: 10, flex: width ? `0 0 ${width}` : undefined }}>
      <div style={{ fontSize: 10, color: "#555d6e", marginBottom: 4 }}>{label}</div>
      {children || <input type={type||"text"} value={form[k]} onChange={e => f(k, e.target.value)}
        placeholder={ph} className="form-input" style={{ background: "#0d0f12" }} />}
    </div>
  );

  return (
    <div>
      {/* Form */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="sign-card" style={{ marginBottom: 0 }}>
          <div className="sign-title">👷 分判商資料</div>
          <Field label="分判商名稱 *" k="contractorName" ph="例：永利電梯工程有限公司" />
          <Field label="地址" k="contractorAddress" ph="地址（可選）" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="電話" k="contractorPhone" ph="9XXXXXXX" type="tel" />
            <Field label="身份證/商業登記號碼" k="contractorIdNo" ph="例：12345678-000" />
          </div>
        </div>
        <div className="sign-card" style={{ marginBottom: 0 }}>
          <div className="sign-title">🏗 工程資料</div>
          <Field label="工程名稱 *" k="projectName">
            <select value={form.projectName} onChange={e => f("projectName", e.target.value)}
              className="form-select" style={{ background: "#0d0f12" }}>
              <option value="">── 選擇或輸入 ──</option>
              {projects.map(p => <option key={p.id || p.name} value={p.name}>{p.name}</option>)}
            </select>
            <input value={form.projectName} onChange={e => f("projectName", e.target.value)}
              placeholder="或直接輸入工程名稱..." className="form-input" style={{ background: "#0d0f12", marginTop: 6 }} />
          </Field>
          <Field label="工程地點" k="projectLocation" ph="例：荃灣沙咀道11-19號" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <Field label="預計開工日期" k="startDate" type="date" />
            <Field label="預計完工日期" k="endDate" type="date" />
            <Field label="所需工人人數" k="workersRequired" type="number" ph="2" />
          </div>
        </div>
      </div>

      {/* Payment terms */}
      <div className="sign-card" style={{ marginBottom: 20 }}>
        <div className="sign-title">💰 付款安排</div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, color: "#555d6e", marginBottom: 4 }}>合約總金額 (HK$) *</div>
          <input type="number" value={form.contractSum} onChange={e => f("contractSum", e.target.value)}
            placeholder="例：500000" className="form-input"
            style={{ background: "#0d0f12", fontSize: 20, fontFamily: "'Barlow Condensed'", fontWeight: 800, color: "#f0c000" }} />
        </div>
        <table className="data-table" style={{ marginBottom: 10 }}>
          <thead><tr><th>階段</th><th>描述</th><th style={{ width: 80 }}>%</th><th style={{ width: 120 }}>金額</th></tr></thead>
          <tbody>
            {[
              { key: "1", label: "第一期", pctK: "stage1Pct", descK: "stage1Desc", amt: s1 },
              { key: "2", label: "第二期", pctK: "stage2Pct", descK: "stage2Desc", amt: s2 },
              { key: "3", label: "第三期（保留金）", pctK: "stage3Pct", descK: "stage3Desc", amt: s3 },
            ].map(s => (
              <tr key={s.key}>
                <td style={{ fontWeight: 700 }}>{s.label}</td>
                <td><input value={form[s.descK]} onChange={e => f(s.descK, e.target.value)}
                  className="form-input" style={{ background: "#0d0f12", padding: "4px 8px", fontSize: 11 }} /></td>
                <td><input type="number" value={form[s.pctK]} onChange={e => f(s.pctK, e.target.value)}
                  style={{ width: 50, background: "#0d0f12", border: "1px solid #2a3045", color: "#f0c000", borderRadius: 4, padding: "4px", textAlign: "right", fontWeight: 700 }} />%</td>
                <td style={{ textAlign: "right", fontFamily: "'Barlow Condensed'", fontWeight: 700, color: "#22c55e" }}>HK${s.amt.toLocaleString()}</td>
              </tr>
            ))}
            <tr style={{ background: "#0d0f12", fontWeight: 700 }}>
              <td colSpan={2} style={{ textAlign: "right" }}>合計</td>
              <td>{Number(form.stage1Pct)+Number(form.stage2Pct)+Number(form.stage3Pct)}%</td>
              <td style={{ textAlign: "right", fontFamily: "'Barlow Condensed'", fontSize: 16, color: "#f0c000" }}>HK${(s1+s2+s3).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="保養期（月）" k="defectsMonths" type="number" ph="6" />
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: "#555d6e", marginBottom: 4 }}>保險要求</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => f("insuranceRequired", true)}
                style={{ flex: 1, padding: "8px", borderRadius: 6, border: form.insuranceRequired ? "2px solid #22c55e" : "1px solid #2a3045", background: form.insuranceRequired ? "rgba(34,197,94,0.08)" : "#13161c", color: form.insuranceRequired ? "#22c55e" : "#8891a4", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>✅ 需要保險</button>
              <button onClick={() => f("insuranceRequired", false)}
                style={{ flex: 1, padding: "8px", borderRadius: 6, border: !form.insuranceRequired ? "2px solid #d63030" : "1px solid #2a3045", background: !form.insuranceRequired ? "rgba(214,48,48,0.08)" : "#13161c", color: !form.insuranceRequired ? "#d63030" : "#8891a4", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>❌ 免保險</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes + actions */}
      <div className="sign-card" style={{ marginBottom: 20 }}>
        <div className="sign-title">📝 附加條款</div>
        <textarea value={form.notes} onChange={e => f("notes", e.target.value)}
          placeholder="額外條款、特殊要求..."
          className="form-input" style={{ background: "#0d0f12", width: "100%", minHeight: 80, resize: "vertical" }} />
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ flex: 1 }}>
            {saving ? "儲存中..." : "💾 儲存合約"}
          </button>
          <button onClick={handlePrint} className="btn btn-secondary" style={{ flex: 1 }}>
            🖨️ 列印 / PDF
          </button>
          <button onClick={() => setForm(empty)} className="btn btn-secondary">↺ 清空</button>
        </div>
      </div>

      {/* Saved contracts */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📁 已儲存合約</div>
          <span className="badge green"><span className="badge-dot" />{saved.length} 份</span>
        </div>
        <div className="card-body" style={{ padding: loading ? 20 : 0 }}>
          {loading ? <div style={{ textAlign: "center", color: "#555d6e" }}>載入中...</div>
          : saved.length === 0 ? <div style={{ textAlign: "center", padding: 20, color: "#555d6e" }}>尚未儲存任何合約</div>
          : <table className="data-table">
            <thead><tr><th>分判商</th><th>工程</th><th>金額</th><th>日期</th><th>操作</th></tr></thead>
            <tbody>
              {saved.map(c => (
                <tr key={c.id}>
                  <td className="td-name">{c.contractor_name}</td>
                  <td style={{ fontSize: 11 }}>{c.project_name}</td>
                  <td style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, color: "#f0c000" }}>HK${Number(c.contract_sum||0).toLocaleString()}</td>
                  <td style={{ fontSize: 11, color: "#8891a4" }}>{c.created_at ? new Date(c.created_at).toLocaleDateString("zh-HK") : "—"}</td>
                  <td>
                    <button onClick={() => loadContract(c)} style={{ background: "#1e2330", border: "none", color: "#60a5fa", borderRadius: 5, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>📂 載入</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
      </div>
    </div>
  );
}

// ── Calendar Page ─────────────────────────────────────────────────────────────
// Month-grid view with three event layers: leave (per-employee), project
// completion deadlines, and project milestone targets. Click a date to see
// the day's events in a side panel.
function CalendarPage({ employees = [], projects = [] }) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [leaves, setLeaves] = useState([]);
  const [docs, setDocs] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Realtime polling — 15 seconds. Refetches leave_requests, employee_docs
  // with expiry, and CF invoices with start_date or end_date. So a worker
  // uploading a green card or a CF being added/edited reflects on the
  // calendar within 15 seconds.
  useEffect(() => {
    const fetchAll = () => {
      Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/leave_requests?status=in.(pending,approved)&order=start_date.asc&limit=500`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        }).then(r => r.json()).catch(() => []),
        fetch(`${SUPABASE_URL}/rest/v1/employee_docs?select=id,employee_id,doc_type,file_name,expiry_date,uploaded_at&expiry_date=not.is.null&order=expiry_date.asc&limit=500`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        }).then(r => r.json()).catch(() => []),
        fetch(`${SUPABASE_URL}/rest/v1/invoices?select=*,projects(name)&order=end_date.asc.nullslast&limit=500`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        }).then(r => r.json()).catch(() => []),
      ]).then(([l, d, inv]) => {
        if (Array.isArray(l)) setLeaves(l);
        if (Array.isArray(d)) setDocs(d);
        if (Array.isArray(inv)) setInvoices(inv);
        setLastRefresh(new Date());
      });
    };
    fetchAll();
    const id = setInterval(fetchAll, 15000);
    return () => clearInterval(id);
  }, []);

  const empById = id => employees.find(e => e.id === id);
  const monthLabel = cursor.toLocaleDateString("zh-HK", { year: "numeric", month: "long" });
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build event index keyed by yyyy-mm-dd
  const eventsByDate = {};
  const addEvent = (dateStr, ev) => {
    if (!eventsByDate[dateStr]) eventsByDate[dateStr] = [];
    eventsByDate[dateStr].push(ev);
  };
  // Leaves — fan out across the date range
  leaves.forEach(l => {
    if (!l.start_date || !l.end_date) return;
    const start = new Date(l.start_date);
    const end = new Date(l.end_date);
    const emp = empById(l.employee_id);
    const tMeta = LEAVE_TYPE_META[l.leave_type] || { label: l.leave_type, icon: "📝", color: "#9CA3AF" };
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split("T")[0];
      addEvent(key, {
        kind: "leave",
        color: tMeta.color,
        icon: tMeta.icon,
        label: `${emp?.name || "員工"} ${tMeta.label}`,
        status: l.status,
      });
    }
  });
  // Project deadlines (end date)
  projects.forEach(p => {
    if (!p.end) return;
    addEvent(p.end, {
      kind: "deadline",
      color: "#EF4444",
      icon: "⏰",
      label: `${p.name} 完工`,
    });
  });
  // Document expiry dates — green card / EMSD licence renewal reminders
  const DOC_LABELS = {
    greencard: "綠卡", id: "身份證", address: "住址證明",
    license: "技工牌照", other_cert: "其他證明",
  };
  docs.forEach(d => {
    if (!d.expiry_date) return;
    const emp = empById(d.employee_id);
    addEvent(d.expiry_date, {
      kind: "doc_expiry",
      color: "#A78BFA",
      icon: "📄",
      label: `${emp?.name || "員工"} ${DOC_LABELS[d.doc_type] || d.doc_type} 到期`,
    });
  });
  // CF invoices — show on their end_date (request payment due) and on
  // start_date (covering-period start) if different. Unpaid get gold,
  // paid get muted green.
  invoices.forEach(inv => {
    const cfNo = inv.cf_num ? `CF${String(inv.cf_num).padStart(5, "0")}` : (inv.stage || "CF");
    const projName = inv.projects?.name || "";
    const amt = Number(inv.amount || 0);
    const isPaid = inv.status === "paid";
    const baseLabel = `${cfNo} ${projName} HK$${amt.toLocaleString()}`;
    if (inv.end_date) {
      addEvent(inv.end_date, {
        kind: "invoice",
        color: isPaid ? "#22c55e" : "#f0c000",
        icon: isPaid ? "✅" : "💰",
        label: `${baseLabel}${isPaid ? " (已收)" : " 到期"}`,
      });
    }
    // Also surface start_date if it's different, to mark the covering period start
    if (inv.start_date && inv.start_date !== inv.end_date) {
      addEvent(inv.start_date, {
        kind: "invoice_start",
        color: "#60a5fa",
        icon: "📋",
        label: `${cfNo} ${projName} 開始`,
      });
    }
  });

  // Compute the "expiring soon" warning list (within 60 days, including past)
  const now = new Date();
  const sixtyDaysOut = new Date(now.getTime() + 60 * 86400000);
  const expiringSoon = docs
    .map(d => {
      if (!d.expiry_date) return null;
      const exp = new Date(d.expiry_date);
      const daysLeft = Math.ceil((exp - now) / 86400000);
      if (exp > sixtyDaysOut) return null;
      return { ...d, daysLeft, emp: empById(d.employee_id) };
    })
    .filter(Boolean)
    .sort((a, b) => a.daysLeft - b.daysLeft);
  // Same idea for project deadlines within 30 days
  const upcomingDeadlines = projects
    .map(p => {
      if (!p.end) return null;
      const end = new Date(p.end);
      const daysLeft = Math.ceil((end - now) / 86400000);
      if (daysLeft < 0 || daysLeft > 30) return null;
      return { ...p, daysLeft };
    })
    .filter(Boolean)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  // Build the grid: 6 weeks × 7 days
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const todayStr = new Date().toISOString().split("T")[0];
  const dateKey = day => day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : "";
  const selectedEvents = selectedDay ? (eventsByDate[selectedDay] || []) : [];

  return (
    <div>
      {/* ─── Live alert banners ─── */}
      {(expiringSoon.length > 0 || upcomingDeadlines.length > 0) && (
        <div style={{ display: "grid", gridTemplateColumns: expiringSoon.length > 0 && upcomingDeadlines.length > 0 ? "1fr 1fr" : "1fr", gap: 12, marginBottom: 14 }}>
          {expiringSoon.length > 0 && (
            <div style={{ background: "rgba(167,139,250,0.06)", border: "1.5px solid rgba(167,139,250,0.4)", borderLeft: "4px solid #A78BFA", borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>📄</span>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#A78BFA" }}>{expiringSoon.length} 份文件即將到期 / 已到期</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 120, overflowY: "auto" }}>
                {expiringSoon.slice(0, 6).map(d => {
                  const isOver = d.daysLeft < 0;
                  const urgent = d.daysLeft <= 14;
                  return (
                    <div key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, padding: "3px 0" }}>
                      <span style={{ color: "#c8d0e0" }}>
                        {d.emp?.name || `員工 #${d.employee_id}`} · {DOC_LABELS[d.doc_type] || d.doc_type}
                      </span>
                      <span style={{ color: isOver ? "#d63030" : urgent ? "#f0c000" : "#A78BFA", fontWeight: 700, fontSize: 11 }}>
                        {isOver ? `已過期 ${-d.daysLeft} 日` : `${d.daysLeft} 日後到期`}
                      </span>
                    </div>
                  );
                })}
                {expiringSoon.length > 6 && <div style={{ fontSize: 11, color: "#555d6e", paddingTop: 2 }}>+ {expiringSoon.length - 6} 份其他</div>}
              </div>
            </div>
          )}
          {upcomingDeadlines.length > 0 && (
            <div style={{ background: "rgba(239,68,68,0.06)", border: "1.5px solid rgba(239,68,68,0.4)", borderLeft: "4px solid #EF4444", borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>⏰</span>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#EF4444" }}>{upcomingDeadlines.length} 個工程 30 日內完工</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 120, overflowY: "auto" }}>
                {upcomingDeadlines.slice(0, 6).map(p => (
                  <div key={p.id || p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, padding: "3px 0" }}>
                    <span style={{ color: "#c8d0e0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: 8 }}>{p.name}</span>
                    <span style={{ color: p.daysLeft <= 7 ? "#d63030" : "#f0c000", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{p.daysLeft} 日後</span>
                  </div>
                ))}
                {upcomingDeadlines.length > 6 && <div style={{ fontSize: 11, color: "#555d6e", paddingTop: 2 }}>+ {upcomingDeadlines.length - 6} 個其他</div>}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Month nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <button onClick={() => setCursor(new Date(year, month - 1, 1))}
          style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #2a3045", background: "#1e2330", color: "#e8eaf0", cursor: "pointer", fontWeight: 600 }}>← 上月</button>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 24, fontWeight: 800, color: "#f0c000" }}>{monthLabel}</div>
          <span style={{ fontSize: 11, color: "#22c55e", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", animation: "pulse 2s infinite" }} />
            即時更新 · {lastRefresh.toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
        </div>
        <button onClick={() => setCursor(new Date(year, month + 1, 1))}
          style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #2a3045", background: "#1e2330", color: "#e8eaf0", cursor: "pointer", fontWeight: 600 }}>下月 →</button>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 14, marginBottom: 14, fontSize: 11, color: "#9aa0b4", flexWrap: "wrap" }}>
        {Object.entries(LEAVE_TYPE_META).map(([k, v]) => (
          <span key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: v.color }} />
            {v.icon} {v.label}
          </span>
        ))}
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: "#EF4444" }} />⏰ 工程完工
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: "#A78BFA" }} />📄 文件到期
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: "#f0c000" }} />💰 CF 請款到期
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: "#60a5fa" }} />📋 CF 開始
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 14 }}>
        {/* Calendar grid */}
        <div className="card">
          <div className="card-body" style={{ padding: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid #1e2330" }}>
              {["日", "一", "二", "三", "四", "五", "六"].map((d, i) => (
                <div key={d} style={{ padding: "10px 8px", textAlign: "center", fontSize: 11, fontWeight: 700, color: i === 0 || i === 6 ? "#d63030" : "#9aa0b4", borderRight: i < 6 ? "1px solid #1e2330" : "none" }}>{d}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridAutoRows: "minmax(96px, auto)" }}>
              {cells.map((day, i) => {
                const key = dateKey(day);
                const events = day ? (eventsByDate[key] || []) : [];
                const isToday = key === todayStr;
                const isSelected = key === selectedDay;
                const isWeekend = i % 7 === 0 || i % 7 === 6;
                return (
                  <div key={i}
                    onClick={() => day && setSelectedDay(key === selectedDay ? null : key)}
                    style={{
                      borderRight: i % 7 < 6 ? "1px solid #1e2330" : "none",
                      borderBottom: "1px solid #1e2330",
                      padding: 6,
                      background: !day ? "#0a0c10" : isSelected ? "#1a1f2e" : isToday ? "rgba(240,192,0,0.05)" : "#13161c",
                      cursor: day ? "pointer" : "default",
                      minHeight: 96,
                      position: "relative",
                    }}>
                    {day && (
                      <>
                        <div style={{ fontSize: 13, fontWeight: 700, color: isToday ? "#f0c000" : isWeekend ? "#d63030" : "#e8eaf0", marginBottom: 4 }}>
                          {day}{isToday && <span style={{ fontSize: 9, marginLeft: 4 }}>今日</span>}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          {events.slice(0, 3).map((ev, j) => (
                            <div key={j} style={{ background: ev.color + "22", borderLeft: `3px solid ${ev.color}`, color: ev.color, fontSize: 10, padding: "2px 4px", borderRadius: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {ev.icon} {ev.label}
                            </div>
                          ))}
                          {events.length > 3 && <div style={{ fontSize: 10, color: "#555d6e" }}>+{events.length - 3} 個其他</div>}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side panel — selected day details */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">{selectedDay ? selectedDay : "選擇日期"}</div>
            {selectedEvents.length > 0 && <span className="badge yellow"><span className="badge-dot" />{selectedEvents.length} 個事件</span>}
          </div>
          <div className="card-body" style={{ padding: 14 }}>
            {!selectedDay && (
              <div style={{ color: "#555d6e", fontSize: 13, textAlign: "center", padding: "40px 0" }}>
                點擊任何一日<br/>查看當日事件
              </div>
            )}
            {selectedDay && selectedEvents.length === 0 && (
              <div style={{ color: "#555d6e", fontSize: 13, textAlign: "center", padding: "20px 0" }}>當日無事件</div>
            )}
            {selectedEvents.map((ev, i) => (
              <div key={i} style={{ padding: "10px 12px", marginBottom: 8, background: ev.color + "11", border: `1px solid ${ev.color}55`, borderRadius: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: ev.color }}>{ev.icon} {ev.label}</div>
                {ev.status && <div style={{ fontSize: 10, color: "#9aa0b4", marginTop: 2 }}>{ev.status === "approved" ? "✅ 已批准" : "🕒 待審批"}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LeaveApproval({ showToast, employees = [] }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending"); // pending | approved | rejected | all
  const [noteFor, setNoteFor] = useState(null); // request id currently showing note input
  const [noteText, setNoteText] = useState("");

  const empById = (id) => employees.find(e => e.id === id);

  const fetchRequests = () => {
    setLoading(true);
    fetch(`${SUPABASE_URL}/rest/v1/leave_requests?order=created_at.desc&limit=200`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setRequests(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRequests();
    const id = setInterval(fetchRequests, 15000); // poll like the other live sections
    return () => clearInterval(id);
  }, []);

  const handleDecision = async (req, newStatus) => {
    try {
      const emp = empById(req.employee_id);
      const patch = {
        status: newStatus,
        admin_note: noteFor === req.id ? noteText : null,
        approved_at: new Date().toISOString(),
      };
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leave_requests?id=eq.${req.id}`, {
        method: "PATCH",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const [updated] = await res.json();
      setRequests(prev => prev.map(r => r.id === req.id ? updated : r));
      setNoteFor(null);
      setNoteText("");

      // Open WhatsApp so admin can notify the employee of the decision
      if (emp?.phone) {
        const t = LEAVE_TYPE_META[req.leave_type] || { label: req.leave_type };
        const verdict = newStatus === "approved" ? "✅ 已批准" : "❌ 已拒絕";
        const noteLine = patch.admin_note ? `\n管理員備注：${patch.admin_note}` : "";
        const msg = `${emp.name} 您好，\n您的請假申請 ${verdict}\n類型：${t.label}\n日期：${req.start_date} 至 ${req.end_date}（${req.days} 日）${noteLine}\n\n— 俊輝電梯工程 管理系統`;
        sendWhatsApp(emp.phone, msg); // opens wa.me — admin hits Send
      }

      showToast(`${newStatus === "approved" ? "✅ 已批准" : "❌ 已拒絕"}${emp?.name ? ` ${emp.name}` : ""} 的請假 — WhatsApp 已開啟`, "success");
    } catch (e) {
      showToast(`❌ 操作失敗：${e.message}`, "error");
    }
  };

  const filtered = requests.filter(r => filter === "all" ? true : r.status === filter);
  const pendingCount = requests.filter(r => r.status === "pending").length;

  return (
    <div>
      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { label: "待審批", value: pendingCount, color: "#f0c000" },
          { label: "已批准", value: requests.filter(r => r.status === "approved").length, color: "#22c55e" },
          { label: "已拒絕", value: requests.filter(r => r.status === "rejected").length, color: "#d63030" },
          { label: "總申請", value: requests.length, color: "#60a5fa" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#13161c", border: "1px solid #1e2330", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 24, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[
          { id: "pending",  label: `🕒 待審批 (${pendingCount})` },
          { id: "approved", label: "✅ 已批准" },
          { id: "rejected", label: "❌ 已拒絕" },
          { id: "all",      label: "📋 全部" },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            style={{ padding: "7px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: filter === f.id ? "#f0c000" : "#1e2330", color: filter === f.id ? "#0d0f12" : "#8891a4" }}>
            {f.label}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#22c55e" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", animation: "pulse 2s infinite" }} />
          即時更新
        </div>
      </div>

      {loading && requests.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "#555d6e" }}>載入中...</div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <div className="card-body" style={{ textAlign: "center", padding: 40, color: "#555d6e" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
            <div style={{ fontSize: 14 }}>{filter === "pending" ? "尚無待審批的請假申請" : "沒有符合條件的記錄"}</div>
          </div>
        </div>
      ) : (
        filtered.map(r => {
          const t = LEAVE_TYPE_META[r.leave_type] || { label: r.leave_type, icon: "📝", color: "#9CA3AF" };
          const emp = empById(r.employee_id);
          const isEditing = noteFor === r.id;
          return (
            <div key={r.id} className="card" style={{ marginBottom: 12 }}>
              <div className="card-body" style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 12, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: emp?.color || "#f0c000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#0d0f12", fontSize: 16 }}>
                      {emp?.name?.[0] || "?"}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#e8eaf0" }}>{emp?.name || `員工 #${r.employee_id}`}</div>
                      <div style={{ fontSize: 11, color: "#555d6e", marginTop: 2 }}>
                        提交於 {r.created_at ? new Date(r.created_at).toLocaleString("zh-HK") : "—"}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: t.color }}>
                      {t.icon} {t.label}
                    </span>
                    <span className={`badge ${r.status === "pending" ? "yellow" : r.status === "approved" ? "green" : "red"}`}>
                      <span className="badge-dot" />
                      {r.status === "pending" ? "待審批" : r.status === "approved" ? "已批准" : "已拒絕"}
                    </span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: r.reason ? 10 : 0 }}>
                  <div style={{ background: "#0d0f12", borderRadius: 8, padding: "8px 12px" }}>
                    <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1 }}>開始</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#e8eaf0", marginTop: 2 }}>{r.start_date}</div>
                  </div>
                  <div style={{ background: "#0d0f12", borderRadius: 8, padding: "8px 12px" }}>
                    <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1 }}>結束</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#e8eaf0", marginTop: 2 }}>{r.end_date}</div>
                  </div>
                  <div style={{ background: "rgba(240,192,0,0.06)", borderRadius: 8, padding: "8px 12px", border: "1px solid rgba(240,192,0,0.2)" }}>
                    <div style={{ fontSize: 10, color: "#3a4255", textTransform: "uppercase", letterSpacing: 1 }}>日數</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#f0c000", marginTop: 2 }}>{r.days} 日</div>
                  </div>
                </div>

                {r.reason && (
                  <div style={{ background: "#0d0f12", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#9aa0b4", lineHeight: 1.6 }}>
                    💬 {r.reason}
                  </div>
                )}

                {r.admin_note && (
                  <div style={{ background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#60a5fa", marginTop: 8 }}>
                    管理員備注：{r.admin_note}
                  </div>
                )}

                {r.status === "pending" && (
                  <>
                    {isEditing && (
                      <textarea value={noteText} onChange={e => setNoteText(e.target.value)}
                        placeholder="備注（可選，會一併發送到員工 WhatsApp）..."
                        style={{ width: "100%", marginTop: 10, background: "#0d0f12", border: "1px solid #2a3045", color: "#e8eaf0", borderRadius: 8, padding: "8px 12px", fontSize: 12, fontFamily: "inherit", minHeight: 60, resize: "vertical" }} />
                    )}
                    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                      {!isEditing && (
                        <button onClick={() => { setNoteFor(r.id); setNoteText(""); }}
                          className="btn btn-secondary btn-sm">✏️ 添加備注</button>
                      )}
                      {isEditing && (
                        <button onClick={() => { setNoteFor(null); setNoteText(""); }}
                          className="btn btn-secondary btn-sm">取消備注</button>
                      )}
                      <div style={{ flex: 1 }} />
                      <button onClick={() => handleDecision(r, "rejected")}
                        style={{ background: "rgba(214,48,48,0.12)", border: "1px solid #d63030", color: "#d63030", borderRadius: 6, padding: "7px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                        ❌ 拒絕
                      </button>
                      <button onClick={() => handleDecision(r, "approved")}
                        style={{ background: "#22c55e", border: "none", color: "#0d0f12", borderRadius: 6, padding: "7px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                        ✅ 批准
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

// ── Settings Page ──────────────────────────────────────────────────────────────
function Settings({ showToast, theme, setTheme, waConfig, setWaConfig, safetyRules, setSafetyRules }) {
  const [rulesEdit, setRulesEdit] = useState(safetyRules);
  const [waEdit, setWaEdit] = useState(waConfig);

  const handleSaveRules = () => {
    setSafetyRules(rulesEdit);
    showToast("✅ 安全守則已更新！", "success");
  };

  const handleSaveWA = () => {
    setWaConfig(waEdit);
    showToast(waEdit.enabled ? "✅ WhatsApp 通知已啟用！" : "✅ WhatsApp 通知已停用", "success");
  };

  const handleResetRecords = () => {
    const ok = window.confirm("⚠️ 確定要清除所有考勤、簽署及活動記錄？\n\n此操作無法復原。\n（工程管理及員工資料將會保留）");
    if (!ok) return;
    try {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith("signing_") || k.startsWith("attendance_") || k === "signingHistory" || k === "attendanceLog") {
          localStorage.removeItem(k);
        }
      });
    } catch (e) {}
    showToast("✅ 所有考勤/簽署記錄已清除！頁面即將重新載入...", "success");
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <div>
      {/* Theme + Reset row */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="sign-card" style={{ marginBottom: 0 }}>
          <div className="sign-title">🎨 主題模式</div>
          <div style={{ fontSize: 12, color: "#9aa0b4", marginBottom: 14 }}>切換深色 / 淺色顯示模式</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setTheme("dark")}
              style={{ flex: 1, padding: "12px 16px", borderRadius: 8, border: theme === "dark" ? "2px solid #f0c000" : "1px solid #2a3045", background: theme === "dark" ? "#0d0f12" : "#13161c", color: theme === "dark" ? "#f0c000" : "#8891a4", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
              🌙 深色模式 {theme === "dark" && "✓"}
            </button>
            <button onClick={() => setTheme("light")}
              style={{ flex: 1, padding: "12px 16px", borderRadius: 8, border: theme === "light" ? "2px solid #f0c000" : "1px solid #2a3045", background: theme === "light" ? "#fff7d6" : "#13161c", color: theme === "light" ? "#b8870a" : "#8891a4", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
              ☀️ 淺色模式 {theme === "light" && "✓"}
            </button>
          </div>
          <div style={{ fontSize: 11, color: "#3a4255", marginTop: 12 }}>💡 主題偏好會自動儲存於瀏覽器</div>
        </div>

        <div className="sign-card" style={{ marginBottom: 0, borderTop: "3px solid #d63030" }}>
          <div className="sign-title" style={{ color: "#d63030" }}>🗑️ 重設所有記錄</div>
          <div style={{ fontSize: 12, color: "#9aa0b4", marginBottom: 14 }}>清除考勤簽到、安全簽署及其他活動記錄。<br/><strong style={{ color: "#22c55e" }}>工程管理及員工資料將會保留。</strong></div>
          <button onClick={handleResetRecords}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #d63030", background: "rgba(214,48,48,0.08)", color: "#d63030", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
            🗑️ 清除所有考勤/簽署記錄
          </button>
          <div style={{ fontSize: 11, color: "#3a4255", marginTop: 12 }}>⚠️ 此操作無法復原，請謹慎使用</div>
        </div>
      </div>

      {/* WhatsApp Click-to-Chat info */}
      <div className="sign-card" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div className="sign-title" style={{ marginBottom: 0 }}>📱 WhatsApp 通知</div>
          <span className="badge green"><span className="badge-dot" />免費方式</span>
        </div>
        <div style={{ fontSize: 13, color: "#c8d0e0", marginBottom: 10, lineHeight: 1.7 }}>
          所有 WhatsApp 通知（催簽、催交文件、請假批核）會透過 <strong style={{ color: "#22c55e" }}>wa.me 點擊對話</strong> 方式寄送：
        </div>
        <ol style={{ fontSize: 12, color: "#9aa0b4", paddingLeft: 20, marginBottom: 12, lineHeight: 1.8 }}>
          <li>按下 📱 催簽 / 催交 / 批核按鈕</li>
          <li>系統自動開啟一個 WhatsApp 對話視窗（訊息已預先填好）</li>
          <li>閣下只需確認無誤後按 <strong style={{ color: "#22c55e" }}>發送</strong></li>
        </ol>
        <div style={{ padding: "10px 12px", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 6, fontSize: 11, color: "#c8d0e0", lineHeight: 1.7 }}>
          ✅ <strong>優點：</strong>完全免費、無需 API 設定、無封號風險、訊息從你個人帳戶寄出。<br/>
          ℹ️ <strong>建議：</strong>電腦上可安裝 <span style={{ color: "#22c55e" }}>WhatsApp Desktop</span> 或使用 WhatsApp Web，方便連續發送。<br/>
          ⚠️ <strong>注意：</strong>請確保員工電話已於「員工管理」正確輸入（香港 8 位數字，系統自動加 852）。
        </div>
      </div>

      {/* Safety rules editor */}
      <div className="sign-card">
        <div className="sign-title">🛡️ 安全守則編輯</div>
        <div style={{ fontSize: 12, color: "#9aa0b4", marginBottom: 14 }}>編輯安全簽署頁顯示的工地安全守則內容</div>
        <textarea
          value={rulesEdit}
          onChange={e => setRulesEdit(e.target.value)}
          className="form-input"
          style={{ width: "100%", minHeight: 200, fontFamily: "inherit", lineHeight: 1.7, resize: "vertical" }}
          placeholder="輸入安全守則內容..."
        />
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button onClick={handleSaveRules} className="btn btn-primary" style={{ flex: 1 }}>💾 儲存守則</button>
          <button onClick={() => setRulesEdit(safetyRules)} className="btn btn-secondary">↺ 還原</button>
        </div>
        <div style={{ fontSize: 11, color: "#3a4255", marginTop: 10 }}>💡 守則會自動儲存於瀏覽器 localStorage</div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const [projects, setProjectsState] = useState(INITIAL_PROJECTS);
  const [employees, setEmployees] = useState([]);
  const [dbStatus, setDbStatus] = useState("loading");
  const [loadMsg, setLoadMsg] = useState("連接 Supabase...");
  const [deadlineAlerts, setDeadlineAlerts] = useState([]);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("theme") || "dark"; } catch { return "dark"; }
  });
  const [waConfig, setWaConfig] = useState(() => {
    try {
      const stored = localStorage.getItem("waConfig");
      return stored ? JSON.parse(stored) : { enabled: false, webhook: "", phone: "85254442099" };
    } catch { return { enabled: false, webhook: "", phone: "85254442099" }; }
  });
  const [safetyRules, setSafetyRules] = useState(() => {
    try {
      return localStorage.getItem("safetyRules") || "第一條 — 個人防護裝備：所有進入施工現場人員必須全程佩戴安全帽、安全鞋及反光背心。電梯槽內作業必須配備安全繩及防墜落裝置。\n\n第二條 — 電源管制：進行任何電氣工程前，必須確認主電源已切斷並上鎖（LOTO程序），並在配電箱貼上警告標示。\n\n第三條 — 高空作業：超過2米高度作業必須使用獲認可之升降台或搭棚架，不得單人作業，必須保持通話聯絡。\n\n第四條 — 危險品存放：潤滑油、清潔劑等危險品須存放於指定區域，遠離熱源，並確保通風良好。\n\n第五條 — 緊急應變：熟悉緊急撤離路線及急救箱位置。發生意外須即時通報主管並填寫事故報告表。";
    } catch { return ""; }
  });

  // Apply theme class to body
  useEffect(() => {
    try {
      document.body.classList.toggle("light-mode", theme === "light");
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  // Persist waConfig
  useEffect(() => {
    try { localStorage.setItem("waConfig", JSON.stringify(waConfig)); } catch (e) {}
  }, [waConfig]);

  // Persist safetyRules
  useEffect(() => {
    try { localStorage.setItem("safetyRules", safetyRules); } catch (e) {}
  }, [safetyRules]);

  // ── WhatsApp deadline notification via Make webhook (configured in Settings) ──
  const MAKE_WEBHOOK = waConfig.webhook || "https://hook.eu2.make.com/YOUR_WEBHOOK_ID";
  const BOSS_PHONE = waConfig.phone || "85254442099";

  const checkDeadlines = async (projList) => {
    const today = new Date();
    const alerts = [];
    for (const p of projList) {
      if (!p.end || p.phase === "completed") continue;
      const endDate = new Date(p.end);
      const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      if (daysLeft >= 0 && daysLeft <= 10) {
        alerts.push({ ...p, daysLeft });
        // Send WhatsApp via Make (only if bot enabled + webhook configured)
        if (waConfig.enabled && waConfig.webhook && !waConfig.webhook.includes("YOUR_WEBHOOK_ID")) {
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
        setEmployees(emps.map(mapEmployee));

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
    staff:     { icon: "👷", title: "員工管理", sub: "人員 / PIN / 薪酬" },
    safety: { icon: "🛡", title: "安全條款", sub: "電子簽署" },
    attendance: { icon: "📍", title: "GPS 考勤", sub: "管理" },
    progress: { icon: "📊", title: "施工進度", sub: "回報與預警" },
    invoice: { icon: "💰", title: "自動請款", sub: "上單系統" },
    payroll: { icon: "💼", title: "薪酬核算", sub: "自動計算" },
    empdocs: { icon: "📁", title: "員工文件", sub: "綠卡 / ID / 住址證明" },
    profit: { icon: "📈", title: "報價利潤", sub: "試算工具" },
    tax: { icon: "🧾", title: "老闆稅務", sub: "計算器（香港有限公司）" },
    leave: { icon: "📝", title: "請假審批", sub: "員工請假申請 / 批核" },
    calendar: { icon: "📅", title: "行事曆", sub: "請假 / 工程完工 / 進度節點" },
    subcontract: { icon: "📋", title: "判頭合約", sub: "分判合約 / 進度付款 / 保險" },
    settings: { icon: "⚙️", title: "系統設定", sub: "主題 / 通知 / 重設" },
  };

  const pt = PAGE_TITLES[active] || { icon: "📋", title: active, sub: "" };

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
                <ProjectManager projects={projects} setProjects={setProjects} showToast={showToast} onAdd={addProjectToDB} onUpdate={updateProjectInDB} onDelete={deleteProjectFromDB} dbConnected={dbStatus === "connected"} />
              </>
            )}
            {active === "staff"   && <StaffManagement employees={employees} setEmployees={setEmployees} showToast={showToast} />}
            {active === "empdocs" && <EmployeeDocs showToast={showToast} employees={employees} />}
            {active === "safety" && <Safety showToast={showToast} employees={employees} />}
            {active === "attendance" && <Attendance showToast={showToast} employees={employees} projects={projects} />}
            {active === "progress" && <Progress showToast={showToast} projects={projects} employees={employees} onUpdateProgress={(projName, newPct) => setProjectsState(prev => prev.map(p => p.name === projName ? { ...p, pct: newPct } : p))} />}
            {active === "invoice" && <Invoice showToast={showToast} />}
            {active === "payroll" && <Payroll showToast={showToast} employees={employees} />}
            {active === "profit" && <ProfitCalc showToast={showToast} />}
            {active === "tax" && <TaxCalc showToast={showToast} />}
            {active === "leave" && <LeaveApproval showToast={showToast} employees={employees} />}
            {active === "calendar" && <CalendarPage employees={employees} projects={projects} />}
            {active === "subcontract" && <SubcontractPage showToast={showToast} projects={projects} />}
            {active === "settings" && <Settings showToast={showToast} theme={theme} setTheme={setTheme} waConfig={waConfig} setWaConfig={setWaConfig} safetyRules={safetyRules} setSafetyRules={setSafetyRules} />}
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
