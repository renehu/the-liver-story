const fs = require("fs");
const path = require("path");
const axios = require("axios");

function safeName(name) {
  return String(name || "untitled")
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

async function downloadMp3(url, targetPath) {
  const res = await axios({
    method: "GET",
    url,
    responseType: "stream",
    timeout: 60000,
  });

  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(targetPath);
    res.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function main() {
  const jsonFiles = fs
    .readdirSync(".")
    .filter(
      (file) =>
        file.startsWith("old-lang") &&
        file.endsWith(".json") &&
        file !== "old-lang-id-map.json"
    );

  console.log("Found JSON files:");
  console.log(jsonFiles.join("\n"));

  let total = 0;
  let failed = [];

  for (const jsonFile of jsonFiles) {
    const json = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

    const langFolder = path.join(
      "downloads",
      jsonFile.replace(".json", "")
    );

    fs.mkdirSync(langFolder, { recursive: true });

    console.log(`\n=== Processing ${jsonFile} ===`);

    for (const chapter of json.data.list) {
      for (const sub of chapter.sub_chapters || []) {
        const items = sub.data || [];

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const mp3Url = item.audio?.[0];

          if (!mp3Url || !mp3Url.endsWith(".mp3")) continue;

          const originalFileName = mp3Url.split("/").pop();

          const title = safeName(
            item.title || sub.sub_chapter_name || `item-${i + 1}`
          );

          const fileName = `${sub.sub_chapter_id}-${i + 1}-${title}-${originalFileName}`;

          const targetPath = path.join(langFolder, fileName);

          if (fs.existsSync(targetPath)) {
            console.log("Skip:", fileName);
            continue;
          }

          console.log("Download:", fileName);

          try {
            await downloadMp3(mp3Url, targetPath);
            total++;
          } catch (err) {
            console.log("FAILED:", mp3Url);
            failed.push({
              jsonFile,
              subChapterId: sub.sub_chapter_id,
              index: i,
              title,
              url: mp3Url,
              error: err.message,
            });
          }
        }
      }
    }
  }

  fs.writeFileSync(
    "download-failed.json",
    JSON.stringify(failed, null, 2),
    "utf8"
  );

  console.log("\nDONE");
  console.log("Downloaded:", total);
  console.log("Failed:", failed.length);
  console.log("Failed list saved to download-failed.json");
}

main().catch((err) => {
  console.error("SCRIPT ERROR:", err);
});