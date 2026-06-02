const items = [
  {
    language: "Yolŋu",
    title: "Ŋunhi dhu miyalk ga dirramu ŋorra waŋganyŋur ŋunhaladjaŋ dhiŋ dhu ŋuli Hep-B’ny gurrapamirr",
    content: `Waŋganyŋuny dhu rerri hep-b märram wakal-marranha-kurr, miyalkthu ga dirramuy.`
  },

  {
    language: "Anindilyakwa",
    title: "Ajuwaja-langwa",
    content: `Ningkidarrinkga akwa ningkenungkwarba ningkibina nungkuwilyakinama akina arrubuda ajunguwa emikirra Hepatitis B yanda kengbijanguma akina angbilyuwa kirribinuwa karnumamalya yikurndirrkayina-manja.`
  },

  {
    language: "warlpiri",
    title: "Kaji kanpa Hep B-ji mani kajinpa warri-warri-kirra yani yapa-kurlu",
    content: `Wati palka Hep B-kirlirli kaji kala yinyi karntaku warri-warri-jangkaluju. Karnta palka Hep B-kirliji kaji kala watiki yinyi warri-warri-jangkaluju.`
  },

  {
    language: "Tiwi",
    title: "Ngini Tiwi amintiya tinga karri wuta wurikimiliyi",
    content: `Tini amintiya tinga karri wuta takurtapirri-ajirri api arimarruwa awarra jana Hep B.`
  },

  {
    language: "Arrernte",
    title: "Arrpanhenge interle aperlenge arlke",
    content: `Tyerrtye akngerre areye-le Hep B ineme arrpenhenge inteme-le. Arelhe-le Hep B ineme artwenge inteme-le kenhe artwele nhenhe renhe ineme arelhenge inteme-le.`
  },

  {
    language: "Kunwinjku",
    title: "Bininj dja Daluk kabenekaliyo",
    content: `Bu mak kabenekaliyo bininj dja daluk, nakka wanjh kabenebebbeworren namekke kundjak Hep B.`
  },

  {
    language: "Pitjantjatjara",
    title: "Tjungu ngariṟa pika nyanga paluṟu utiringkupai",
    content: `Wati nyaratja Hep B tjara alatjiṯu kungka nyarangka ngaringi paluṟu, ka kungka nyarangku Hep B mantjini alatjiṯu.
Kungkangku Hep B tjarangku wati ungkupai.`
  },

  {
    language: "Murrinh Patha",
    title: "Hep b-ka kardu palngun i nugarn ngatha mange wiye thaningintha nhini-ka nart deyida matharr-yu.",
    content: `Hep B-ka kardu palngun i nugarn deninthalet i ngarra kardu numi warra denginthalet-ka matharr warda themnginthamutmut.`
  }
];

function setReactInput(input, value) {
  if (!input) return;

  const setter =
    Object.getOwnPropertyDescriptor(
      input.constructor.prototype,
      "value"
    )?.set ||
    Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value"
    )?.set;

  setter.call(input, value);

  input.dispatchEvent(
    new Event("input", { bubbles: true })
  );

  input.dispatchEvent(
    new Event("change", { bubbles: true })
  );
}

function contentToHtml(text) {

  return `
    <p>
      <span style="font-size:20px;">
        ${text
          .replace(/\r\n/g, "\n")
          .replace(/\n/g, "<br>")
        }
      </span>
    </p>
  `;
}

function pasteHtmlIntoEditor(editor, html) {

  editor.focus();

  const range = document.createRange();
  range.selectNodeContents(editor);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  const clipboardData = new DataTransfer();

  clipboardData.setData(
    "text/html",
    html
  );

  clipboardData.setData(
    "text/plain",
    html.replace(/<[^>]+>/g, "")
  );

  editor.dispatchEvent(
    new ClipboardEvent("paste", {
      bubbles: true,
      cancelable: true,
      clipboardData
    })
  );

  editor.dispatchEvent(
    new InputEvent("input", {
      bubbles: true,
      inputType: "insertFromPaste"
    })
  );

  editor.dispatchEvent(
    new Event("change", {
      bubbles: true
    })
  );
}

async function updateOneLanguage(item) {

  const tab =
    [...document.querySelectorAll(".lang-tab")]
      .find(
        el =>
          el.innerText
            .trim()
            .toLowerCase() ===
          item.language.toLowerCase()
      );

  if (!tab) {
    console.warn(
      `${item.language} tab not found`
    );
    return;
  }

  tab.click();

  await new Promise(resolve =>
    setTimeout(resolve, 1500)
  );

  const titleInput =
    document.querySelector(
      'input[placeholder="Enter slide title"]'
    );

  const editor =
    document.querySelector(
      ".ProseMirror"
    );

  setReactInput(
    titleInput,
    item.title
  );

  if (editor) {

    pasteHtmlIntoEditor(
      editor,
      contentToHtml(item.content)
    );
  }

  console.log(
    `${item.language} updated`
  );
}

async function run() {

  for (const item of items) {

    await updateOneLanguage(item);

    await new Promise(resolve =>
      setTimeout(resolve, 1000)
    );
  }

  console.log(
    "Sexual transmission: all 8 languages updated."
  );
}

run();