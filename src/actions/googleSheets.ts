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

export async function fetchAllGoogleSheets(spreadsheetId: string, sheetNames: string[]) {
  try {
    const timestamp = new Date().getTime();
    const sheetNameToGid: Record<string, string> = {};

    // 1. Fetch HTML ONCE to get all GIDs
    try {
      const htmlUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?usp=sharing`;
      const htmlRes = await fetch(htmlUrl, { cache: 'no-store' });
      const htmlText = await htmlRes.text();
      
      const regex = /\[\d+,0,\\"(\d+)\\",\[\{\\"1\\":\[\[0,0,\\"([^\\"]+)\\"/g;
      let match;
      
      while ((match = regex.exec(htmlText)) !== null) {
        const foundGid = match[1];
        const foundName = match[2];
        sheetNameToGid[foundName.trim()] = foundGid;
      }
    } catch (e) {
      console.warn("Failed to extract GIDs in bulk", e);
    }

    // 2. Fetch all CSVs concurrently
    const results = await Promise.all(sheetNames.map(async (sheetName) => {
      let gid = sheetNameToGid[sheetName.trim()];
      
      // Fallback search if exact trim didn't match
      if (!gid) {
        const matchingKey = Object.keys(sheetNameToGid).find(k => k.includes(sheetName) || sheetName.includes(k));
        if (matchingKey) gid = sheetNameToGid[matchingKey];
      }

      let url = "";
      if (gid) {
         url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}&_t=${timestamp}`;
      } else {
         url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&sheet=${encodeURIComponent(sheetName)}&_t=${timestamp}`;
      }
      
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to fetch sheet ${sheetName}`);
        
        const csvText = await res.text();
        const parsed = Papa.parse(csvText, { skipEmptyLines: true });
        
        return { name: sheetName, success: true, data: parsed.data };
      } catch (err) {
        console.error(`Error fetching sheet ${sheetName}:`, err);
        return { name: sheetName, success: false, data: [] };
      }
    }));

    return { success: true, results };
  } catch (error) {
    console.error("Error in fetchAllGoogleSheets:", error);
    return { success: false, results: [] };
  }
}
