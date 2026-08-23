"use server";

import Papa from "papaparse";

export async function fetchGoogleSheet(spreadsheetId: string, sheetName: string) {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    
    const res = await fetch(url, { next: { revalidate: 60 } }); // Cache for 60 seconds
    
    if (!res.ok) {
      throw new Error(`Failed to fetch sheet ${sheetName}: ${res.statusText}`);
    }
    
    const csvText = await res.text();
    
    // Parse the CSV
    const parsed = Papa.parse(csvText, {
      skipEmptyLines: true,
    });

    return { success: true, data: parsed.data };
  } catch (error) {
    console.error("Error fetching Google Sheet:", error);
    return { success: false, data: [] };
  }
}
