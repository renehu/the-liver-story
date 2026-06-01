const fs = require("fs");
const path = require("path");

const LANGUAGE_MAP = {
  "old-lang-2": { id: 2, name: "Yolŋu" },
  "old-lang-3": { id: 3, name: "Anindilyakwa" },
  "old-lang-7": { id: 7, name: "Warlpiri" },
  "old-lang-9": { id: 9, name: "Tiwi" },
  "old-lang-10": { id: 10, name: "Arrernte" },
  "old-lang-11": { id: 11, name: "Kunwinjku" },
  "old-lang-12": { id: 12, name: "Pitjantjatjara" },
  "old-lang-16": { id: 16, name: "Murrinh Patha" },
};

function safeName(name) {
  return String(name || "untitled")
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, " ")
    .trim();
}

function getEnglishSlideNames() {
  const englishJson = JSON.parse(
    fs.readFileSync("old-lang-1-English.json", "utf8")
  );

  const result = {};

  for (const chapter of englishJson.data.list) {
    for (const sub of chapter.sub_chapters || []) {
      const items = sub.data || [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        const englishName =
          item.title ||
          sub.sub_chapter_name ||
          `slide-${sub.sub_chapter_id}-${i + 1}`;

        result[`${sub.sub_chapter_id}-${i}`] = safeName(englishName);
      }
    }
  }

  return result;
}

function findDownloadedMp3(downloadRoot, hashFileName) {
  const folders = fs.readdirSync(downloadRoot);

  for (const folder of folders) {
    const folderPath = path.join(downloadRoot, folder);

    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath);

    const found = files.find((file) =>
      file.endsWith(hashFileName)
    );

    if (found) {
      return path.join(folderPath, found);
    }
  }

  return null;
}

function makeTargetMp3FileName(subChapterId, langId, languageName, originalMp3Name) {
  return `sub_chapter_${subChapterId}-lang_${langId}_${safeName(languageName)}-${originalMp3Name}`;
}

async function main() {
  const exportsDir = "exports";
  const downloadsDir = "downloads";

  fs.mkdirSync(exportsDir, { recursive: true });

  const englishSlideNames = getEnglishSlideNames();

  const jsonFiles = fs
    .readdirSync(".")
    .filter(
      (file) =>
        file.startsWith("old-lang-") &&
        file.endsWith(".json") &&
        file !== "old-lang-id-map.json" &&
        file !== "old-lang-1-English.json"
    );

  let copied = 0;
  let missing = [];

  for (const jsonFile of jsonFiles) {
    const langKey = jsonFile.replace(".json", "");
    const langInfo = LANGUAGE_MAP[langKey];

    if (!langInfo) {
      console.log("Skip unknown language file:", jsonFile);
      continue;
    }

    const json = JSON.parse(
      fs.readFileSync(jsonFile, "utf8")
    );

    console.log(`Processing ${langInfo.name} (${jsonFile})`);

    for (const chapter of json.data.list) {
      for (const sub of chapter.sub_chapters || []) {
        const items = sub.data || [];

        for (let i = 0; i < items.length; i++) {
          const item = items[i];

          const mp3Url = item.audio?.[0] || "";

          if (!mp3Url.endsWith(".mp3")) {
            continue;
          }

          const originalMp3Name = mp3Url.split("/").pop();

          const slideName =
            englishSlideNames[`${sub.sub_chapter_id}-${i}`] ||
            safeName(item.title || sub.sub_chapter_name || `slide-${sub.sub_chapter_id}-${i + 1}`);

          const slideFolder = path.join(
            exportsDir,
            slideName
          );

          fs.mkdirSync(slideFolder, {
            recursive: true,
          });

          const downloadedMp3 = findDownloadedMp3(
            downloadsDir,
            originalMp3Name
          );

          const targetMp3Name = makeTargetMp3FileName(
            sub.sub_chapter_id,
            langInfo.id,
            langInfo.name,
            originalMp3Name
          );

          if (downloadedMp3) {
            fs.copyFileSync(
              downloadedMp3,
              path.join(slideFolder, targetMp3Name)
            );

            copied++;
          } else {
            missing.push({
              language: langInfo.name,
              oldLangId: langInfo.id,
              subChapterId: sub.sub_chapter_id,
              index: i,
              title: item.title || "",
              originalMp3Name,
              mp3Url,
            });
          }

          const mappingFile = path.join(
            slideFolder,
            "mapping.json"
          );

          let mapping = {};

          if (fs.existsSync(mappingFile)) {
            mapping = JSON.parse(
              fs.readFileSync(mappingFile, "utf8")
            );
          }

          mapping[langInfo.name] = {
            oldLangId: langInfo.id,
            oldLanguageFile: jsonFile,
            subChapterId: sub.sub_chapter_id,
            dataIndex: i,
            title: item.title || "",
            content: item.content || "",
            originalMp3Name,
            exportedMp3Name: targetMp3Name,
            oldMp3Url: mp3Url,
          };

          fs.writeFileSync(
            mappingFile,
            JSON.stringify(mapping, null, 2),
            "utf8"
          );
        }
      }
    }
  }

  fs.writeFileSync(
    "export-missing-mp3.json",
    JSON.stringify(missing, null, 2),
    "utf8"
  );

  console.log("\nDONE");
  console.log("Copied:", copied);
  console.log("Missing:", missing.length);
  console.log("Missing list saved to export-missing-mp3.json");
}

main().catch((err) => {
  console.error("SCRIPT ERROR:", err);
});