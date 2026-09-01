"use server";

import Papa from "papaparse";

export async function fetchGoogleSheet(spreadsheetId: string, sheetName: string) {
  try {
    const timestamp = new Date().getTime();
    
    // Attempt to extract the GID for the specific sheetName to bypass Google API bugs with Thai strings
    let gid = "";
    try {
      const htmlUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?usp=sharing`;
      const htmlRes = await fetch(htmlUrl, { cache: 'no-store' });
      const htmlText = await htmlRes.text();
      
      // Regex to find all sheet GIDs and their corresponding names
      // Format in HTML is like: [21350203,"[2,0,\"866581680\",[{\"1\":[[0,0,\"สัปดาห์ที่ 3\"
      const regex = /\[\d+,0,\\"(\d+)\\",\[\{\\"1\\":\[\[0,0,\\"([^\\"]+)\\"/g;
      
      let match;
      while ((match = regex.exec(htmlText)) !== null) {
        const foundGid = match[1];
        let foundName = match[2];
        
        // Clean up any unicode escape sequences or emojis if present
        // But normally it's exact.
        if (foundName === sheetName || foundName.trim() === sheetName.trim() || foundName.includes(sheetName)) {
          gid = foundGid;
          break;
        }
      }
    } catch (e) {
      console.warn("Failed to extract GID, falling back to sheet name query", e);
    }

    let url = "";
    if (gid) {
       url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}&_t=${timestamp}`;
    } else {
       url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&sheet=${encodeURIComponent(sheetName)}&_t=${timestamp}`;
    }
    
    const res = await fetch(url, { cache: 'no-store' }); // Disable cache for real-time updates
    
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
