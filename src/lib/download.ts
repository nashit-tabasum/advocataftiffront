const buildCorsProxyUrl = (url: string): string =>
  `https://corsproxy.io/?${encodeURIComponent(url)}`;

export async function fetchTextWithCors(url: string): Promise<string> {
  const proxied = buildCorsProxyUrl(url);
  const res = await fetch(proxied);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

export function triggerDownload(blob: Blob, filename: string): void {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        current.push(field);
        field = "";
      } else if (char === "\n") {
        current.push(field);
        rows.push(current);
        current = [];
        field = "";
      } else if (char === "\r") {
        // ignore
      } else {
        field += char;
      }
    }
  }
  if (field.length > 0 || current.length > 0) {
    current.push(field);
    rows.push(current);
  }
  return rows;
}

export function rowsToTsv(rows: string[][]): string {
  return rows
    .map((r) => r.map((c) => `"${c.replaceAll('"', '""')}"`).join("\t"))
    .join("\n");
}

export function rowsToJson(rows: string[][]): string {
  if (rows.length === 0) return "[]";
  const [head, ...body] = rows;
  const objs = body.map((r) => {
    const obj: Record<string, string> = {};
    head.forEach((h, i) => {
      obj[h || `col_${i + 1}`] = r[i] ?? "";
    });
    return obj;
  });
  return JSON.stringify(objs, null, 2);
}

export function rowsToXml(rows: string[][]): string {
  if (rows.length === 0)
    return '<?xml version="1.0" encoding="UTF-8"?><rows/>';
  const [head, ...body] = rows;
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const items = body
    .map(
      (r) =>
        `<row>${head
          .map(
            (h, i) =>
              `<${esc(h || `col_${i + 1}`)}>${esc(r[i] ?? "")}</${esc(
                h || `col_${i + 1}`
              )}>`
          )
          .join("")}</row>`
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><rows>${items}</rows>`;
}

export async function downloadCsvFile(url: string, filenameBase: string) {
  const text = await fetchTextWithCors(url);
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  triggerDownload(blob, `${filenameBase}.csv`);
}

export async function downloadExcelFromCsv(url: string, filenameBase: string) {
  const text = await fetchTextWithCors(url);
  const rows = parseCsv(text);
  const tsv = rowsToTsv(rows);
  const blob = new Blob([tsv], {
    type: "text/tab-separated-values;charset=utf-8",
  });
  triggerDownload(blob, `${filenameBase}.xls`);
}

export async function downloadJsonFromCsv(url: string, filenameBase: string) {
  const text = await fetchTextWithCors(url);
  const rows = parseCsv(text);
  const json = rowsToJson(rows);
  const blob = new Blob([json], { type: "application/json;charset=utf-8" });
  triggerDownload(blob, `${filenameBase}.json`);
}

export async function downloadXmlFromCsv(url: string, filenameBase: string) {
  const text = await fetchTextWithCors(url);
  const rows = parseCsv(text);
  const xml = rowsToXml(rows);
  const blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
  triggerDownload(blob, `${filenameBase}.xml`);
}
