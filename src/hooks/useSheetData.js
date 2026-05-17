import { useState, useEffect } from "react";

const SHEET_ID = "1jawx0CLbbrSOdxwv-Ds-FqS8jw7UMuGyONzskDDXBB8";

const SHEET_GIDS = {
  intro: 1468995404,
  about: 0,
  projects: 431847824,
  skills: 1671238189,
  dsa: 954527161,
  contact: 286549545,
  experience: 1242176191
};

// Splits full CSV text into logical rows, correctly handling quoted fields
// that contain embedded newlines (which Google Sheets produces for multi-line cells)
function splitCSVRows(csv) {
  const rows = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];

    if (ch === '"') {
      if (inQuotes && csv[i + 1] === '"') {
        // Escaped quote inside a quoted field
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
        current += ch;
      }
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      // Real row boundary — skip \r\n pairs
      if (ch === "\r" && csv[i + 1] === "\n") i++;
      if (current.trim()) rows.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) rows.push(current);
  return rows;
}

// Parses one CSV row string into field values, handling quoted fields with commas
function parseCSVLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

function csvToRows(csv) {
  const rows = splitCSVRows(csv);
  if (rows.length === 0) return [];

  const headers = parseCSVLine(rows[0]).map((h) => h.trim());

  return rows.slice(1).map((row) => {
    const values = parseCSVLine(row);
    return headers.reduce((obj, h, i) => {
      obj[h] = (values[i] ?? "").trim();
      return obj;
    }, {});
  });
}

export function useSheetData(sheetName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const gid = SHEET_GIDS[sheetName];
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch sheet data");
        return res.text();
      })
      .then((csv) => {
        setData(csvToRows(csv));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [sheetName]);

  return { data, loading, error };
}