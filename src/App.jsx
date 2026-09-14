async function downloadSafetyPDF(name, rec, btn) {
  const original = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = '產生中...'; }

  const signedISO = rec.signed_at;
  const validUntil = rec.valid_until ||
    (function () { const d = new Date(signedISO); d.setMonth(d.getMonth() + 6); return d.toISOString().slice(0, 10); })();
  const guidelines = SAFETY_TEXT;
  const sig = rec.signature_data || '';

  const sheet = document.createElement('div');
  sheet.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;padding:56px 64px;background:#fff;color:#111;font-family:-apple-system,BlinkMacSystemFont,"PingFang HK","Microsoft JhengHei",sans-serif;box-sizing:border-box;';
  sheet.innerHTML =
    '<div style="text-align:center;border-bottom:3px solid #b8860b;padding-bottom:18px;margin-bottom:26px">' +
      '<div style="font-size:26px;font-weight:800;letter-spacing:2px">巨揚工程有限公司</div>' +
      '<div style="font-size:17px;font-weight:700;margin-top:14px">安全守則培訓及承諾書</div>' +
      '<div style="font-size:12px;color:#666;margin-top:3px">Safety Guidelines Training &amp; Acknowledgement</div>' +
    '</div>' +

    '<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:26px">' +
      '<tr><td style="padding:8px 0;color:#666;width:120px">員工姓名</td><td style="padding:8px 0;font-weight:700;font-size:16px">' + name + '</td></tr>' +
      '<tr><td style="padding:8px 0;color:#666">身份證號碼</td><td style="padding:8px 0;font-weight:600">' + (rec.hkid_masked || '＿＿＿＿＿＿＿＿') + '</td></tr>' +
      '<tr><td style="padding:8px 0;color:#666">簽署日期</td><td style="padding:8px 0;font-weight:600">' + signedISO.slice(0, 10) + '　' + signedISO.slice(11, 16) + ' HKT</td></tr>' +
      '<tr><td style="padding:8px 0;color:#666">有效期至</td><td style="padding:8px 0;font-weight:700;color:#b8860b">' + validUntil + '</td></tr>' +
      '<tr><td style="padding:8px 0;color:#666">文件版本</td><td style="padding:8px 0">' + (rec.document_version || '2026-09-02') + '</td></tr>' +
    '</table>' +

    '<div style="font-size:15px;font-weight:700;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid #ddd">安全守則全文</div>' +
    '<div style="font-size:11px;line-height:1.9;white-space:pre-wrap;color:#222;margin-bottom:40px">' +
      guidelines.replace(/&/g, '&amp;').replace(/</g, '&lt;') +
    '</div>' +

    '<div style="border-top:2px solid #b8860b;padding-top:20px">' +
      '<div style="font-size:15px;font-weight:700;margin-bottom:10px">員工承諾條款</div>' +
      '<div style="font-size:13px;line-height:2.0;margin-bottom:22px">' +
        '本人 <span style="font-weight:700;border-bottom:1px solid #111;padding:0 10px">' + name + '</span> 確認：<br>' +
        '（一）已參與上述完整安全培訓，並清楚了解及明白《升降機及自動梯條例》（Cap.618）及相關規例之要求；<br>' +
        '（二）明白並同意遵守公司安全管理制度（SOP、SMP、PTW）及本守則所有條款；<br>' +
        '（三）明白工地上任何違反安全規例之行為可導致嚴重後果，包括工傷、法律責任及紀律處分；<br>' +
        '（四）同意在發現任何不安全情況時，有責任立即停工並向主管報告，不得隱瞞；<br>' +
        '（五）確認本人具備執行所分配工作之相關資格及牌照，並承諾在資格失效前主動通知公司；<br>' +
        '（六）明白本承諾書之簽署屬法律文件，將作為本人已接受安全培訓之正式紀錄，有效期為六個月，屆滿須重新簽署。' +
      '</div>' +

      '<div id="sigBlock">' +
        '<div style="font-size:13px;font-weight:600;margin-bottom:16px">本人已細閱並完全理解以上安全守則全文，並以下方簽名確認同意遵守所有條款。</div>' +
        '<div style="font-size:13px;color:#666;margin-bottom:6px">員工簽名 Employee Signature</div>' +
        '<div style="border:1px solid #bbb;height:120px;display:flex;align-items:center;justify-content:center;background:#fafafa">' +
          (sig ? '<img src="' + sig + '" style="max-height:110px;max-width:96%;filter:invert(1) hue-rotate(180deg) saturate(0) contrast(2)">' : '<span style="color:#bbb;font-size:12px">簽名未存檔</span>') +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;font-size:12px;color:#666;margin-top:10px">' +
          '<span>姓名：<b style="color:#111">' + name + '</b></span>' +
          '<span>身份證：<b style="color:#111">' + (rec.hkid_masked || '＿＿＿＿') + '</b></span>' +
          '<span>日期：<b style="color:#111">' + signedISO.slice(0, 10) + '</b></span>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div style="margin-top:30px;padding-top:14px;border-top:1px solid #ddd;text-align:center;font-size:10px;color:#888;line-height:1.8">' +
      '本文件以電子方式簽署，具法律約束力　｜　本紀錄保存期限：5 年<br>' +
      '巨揚工程有限公司安全管理系統　產生時間：' + new Date().toLocaleString('zh-HK', { timeZone: 'Asia/Hong_Kong' }) +
    '</div>';

  document.body.appendChild(sheet);

  try {
    const cv = await window.html2canvas(sheet, { scale: 1.5, backgroundColor: '#ffffff', logging: false });
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

    const PW = 210, PH = 297, TOP = 12, BOT = 16;
    const pxPerMm = cv.width / PW;
    const bodyPx = Math.floor((PH - TOP - BOT) * pxPerMm);
    const ctx = cv.getContext('2d');

    // 搵一行全白嘅像素，避免切斷文字
    const rowIsBlank = (y) => {
      const d = ctx.getImageData(0, y, cv.width, 1).data;
      for (let x = 0; x < cv.width; x += 4) {
        const i = x * 4;
        if (d[i] < 245 || d[i + 1] < 245 || d[i + 2] < 245) return false;
      }
      return true;
    };

    // 簽名區唔可以被分開：記低佢喺 canvas 上嘅起點做強制分頁
    const sb = sheet.querySelector('#sigBlock');
    const forced = sb ? Math.round(sb.offsetTop * 1.5) : -1;

    // 先計好每頁切喺邊，得出總頁數
    const cuts = [];
    let pos = 0;
    while (pos < cv.height) {
      let end = Math.min(pos + bodyPx, cv.height);
      if (forced > pos + 40 && forced < end) {
        end = forced;                       // 喺簽名區之前斷開
      } else if (end < cv.height) {
        const limit = Math.max(pos + Math.floor(bodyPx * 0.5), end - 160);
        let y = end;
        while (y > limit && !rowIsBlank(y)) y--;
        if (y > limit) end = y;
      }
      cuts.push([pos, end]);
      pos = end;
      if (cuts.length > 30) break;
    }
    const total = cuts.length;

    // 中文頁碼：用 canvas 畫出嚟再貼入 PDF
    const pageLabel = (n) => {
      const c = document.createElement('canvas');
      c.width = 600; c.height = 60;
      const g = c.getContext('2d');
      g.fillStyle = '#ffffff'; g.fillRect(0, 0, c.width, c.height);
      g.fillStyle = '#888888';
      g.font = '26px -apple-system, "PingFang HK", "Microsoft JhengHei", sans-serif';
      g.textAlign = 'center';
      g.fillText('第 ' + n + ' 頁，共 ' + total + ' 頁', c.width / 2, 38);
      return c.toDataURL('image/jpeg', 0.9);
    };

    const tmp = document.createElement('canvas');
    const tctx = tmp.getContext('2d');

    cuts.forEach(([from, to], i) => {
      if (i > 0) doc.addPage();
      tmp.width = cv.width;
      tmp.height = to - from;
      tctx.fillStyle = '#ffffff';
      tctx.fillRect(0, 0, tmp.width, tmp.height);
      tctx.drawImage(cv, 0, from, cv.width, to - from, 0, 0, cv.width, to - from);
      doc.addImage(tmp.toDataURL('image/jpeg', 0.92), 'JPEG', 0, TOP, PW, (to - from) / pxPerMm);
      doc.addImage(pageLabel(i + 1), 'JPEG', 75, PH - 12, 60, 6);
    });

    doc.save(name + '_安全守則簽署_' + signedISO.slice(0, 10) + '.pdf');
  } catch (err) {
    console.error('[PDF ERROR]', err.message);
    alert('PDF 產生失敗：' + err.message);
  } finally {
    sheet.remove();
    if (btn) { btn.disabled = false; btn.textContent = original; }
  }
}
