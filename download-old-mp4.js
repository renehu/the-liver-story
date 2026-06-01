const fs = require("fs");
const path = require("path");
const axios = require("axios");

const TARGET_SUB_CHAPTER_ID = 22;
const OUTPUT_DIR = "download-MP4";

const LANGUAGE_MAP = {
  "old-lang-1-English": { id: 1, name: "English" },
  "old-lang-2": { id: 2, name: "Yolŋu" },
  "old-lang-3": { id: 3, name: "Anindilyakwa" },
  "old-lang-7": { id: 7, name: "Warlpiri" },
  "old-lang-9": { id: 9, name: "Tiwi" },
  "old-lang-10": { id: 10, name: "Arrernte" },
  "old-lang-11": { id: 11, name: "Kunwinjku" },
  "old-lang-12": { id: 12, name: "Pitjantjatjara" },
  "old-lang-13": { id: 13, name: "Burarra" },
  "old-lang-14": { id: 14, name: "Kriol" },
  "old-lang-15": { id: 15, name: "Wubuy" },
  "old-lang-16": { id: 16, name: "Murrinh Patha" },
};

function safeName(name) {
  return String(name || "unknown")
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, " ")
    .trim();
}

async function downloadFile(url, targetPath) {
  const res = await axios({
    method: "GET",
    url,
    responseType: "stream",
    timeout: 180000,
  });

  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(targetPath);
    res.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const jsonFiles = fs
    .readdirSync(".")
    .filter(
      (file) =>
        file.startsWith("old-lang") &&
        file.endsWith(".json") &&
        file !== "old-lang-id-map.json"
    );

  let downloaded = 0;
  let skippedNoVideo = 0;
  const failed = [];

  for (const jsonFile of jsonFiles) {
    const langKey = jsonFile.replace(".json", "");
    const langInfo = LANGUAGE_MAP[langKey];

    if (!langInfo) {
      console.log("Skip unknown language file:", jsonFile);
      continue;
    }

    const json = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

    console.log(`\n=== ${langInfo.name} / ${jsonFile} ===`);

    for (const chapter of json.data.list || []) {
      for (const sub of chapter.sub_chapters || []) {
        if (sub.sub_chapter_id !== TARGET_SUB_CHAPTER_ID) continue;

        const items = sub.data || [];

        for (let i = 0; i < items.length; i++) {
          const item = items[i];

          const videoUrl = item.video?.[0] || "";

          if (!videoUrl || !videoUrl.endsWith(".mp4")) {
            skippedNoVideo++;
            console.log(`No MP4: ${langInfo.name}, item ${i + 1}`);
            continue;
          }

          const originalMp4Name = videoUrl.split("/").pop();

          const fileName =
            `sub_chapter_${TARGET_SUB_CHAPTER_ID}` +
            `-lang_${langInfo.id}_${safeName(langInfo.name)}` +
            `-${originalMp4Name}`;

          const targetPath = path.join(OUTPUT_DIR, fileName);

          if (fs.existsSync(targetPath)) {
            console.log("Skip existing:", fileName);
            continue;
          }

          console.log("Downloading:", fileName);

          try {
            await downloadFile(videoUrl, targetPath);
            downloaded++;
          } catch (err) {
            console.log("FAILED:", videoUrl);

            failed.push({
              language: langInfo.name,
              langId: langInfo.id,
              jsonFile,
              subChapterId: TARGET_SUB_CHAPTER_ID,
              itemIndex: i,
              title: item.title || "",
              videoUrl,
              error: err.message,
            });
          }
        }
      }
    }
  }

  fs.writeFileSync(
    "download-mp4-failed.json",
    JSON.stringify(failed, null, 2),
    "utf8"
  );

  console.log("\nDONE");
  console.log("Downloaded MP4:", downloaded);
  console.log("No MP4 skipped:", skippedNoVideo);
  console.log("Failed:", failed.length);
  console.log("Failed list saved to download-mp4-failed.json");
}

main().catch((err) => {
  console.error("SCRIPT ERROR:", err);
});