const items = [
  {
    language: "Yolŋu",
    title: "Maŋguy nha yan dhu nhuŋu dhäwuny lakaram",
    content: `Hep-B dhu ga weyin ŋorra djinawa nhukal rumbalŋur rerrikthunamiriw nhe dhu ga dhäkay-ŋanhamirrdja yurr bän balaŋ gi buŋa yan dhu ga nhuŋu bidilany. Nhaliy nhä yän dhu malŋmaramany ŋunhi nhe Hep-B-mirr dja special djakap nhe dhu maŋgu rerriw. Ŋhiyaŋuny rom dhu marrga malŋmaram nhämunha rerri ga maŋguŋur ŋorra.`
  },
  {
    language: "Anindilyakwa",
    title: "Ngakurra-langwa merra na-makina-murra ena alawudawarra.  Narrumamena-ma merra.",
    content: `Enena angbilyuwa enungkwurakba kuwambilyama ngakurri-wa-manja akwa ngarningka nara awerribikama enena Hep B. Ena kuwarriyakina-ma ngakurri-langwa awa. Ningkakina kingendena-manja keningimidina-manja akina-langwa angbilyuwa Hep B kilikaja kajungwa  karriyimameni-yada merra kajungwa kuwaburangkeyini-yada akinuwa angbilyuwa virus. Akina kembirra kakumakina-murra amiyembena angbilyuwa virus ngarruwilyakina-ma ngakurra-langwa-manja merra.`
  },
  {
    language: "warlpiri",
    title: "Nyuntu nyangu yalyungku mipa kaji ka ngalpa ngarrirni- yalyu test",
    content: `Hep B kirliji kula nganta kanpa ngurrju nyina kala lawa pulyangku juku kangku ngawu mani. Milya pinjakuju kaji kanpa marda mardani hep B ngulaju yanta special test kirra yungulurla nyanyi virus,ki. Kujarluju kaji kangku ngarrirni nyajangu virus kanpa mardani nyuntu nyangu palkangka.`
  },
  {
    language: "Tiwi",
    title: "Wuta tokutuwi wunga nginingawula manunguli api awungarri wunyayi awarra jana",
    content: `Awarra Hep B yunukuni arimuwu yilaruwu kangawula punikapa api awarra jana arikirimi kukura. Tokutuwi wuwunga nginingawula manunguli wuta wupakuluwunyi ngini awarra Hep B arimuwu kangawula. Tokutuwi wumatiyarra ngawa ngini ngawuni awarra jana kapi nginingawula manunguli.`
  },
  {
    language: "Arrernte",
    title: "Alhwe ngkwinhenge-ntyele ante akwele itne arrengekulthe nhenhe renhe areme.",
    content: `Hep B nhenhe arlenge alhentye atwetye aneme tyerrtye ngkwenhe kwene-le, rlkerte awelhe tyakenhe unte aneme kenhe re akenhe aleme ngkwenhe rlkerte ileme.
Alhwe testem-ilemele ante akwele itne areme Hep B arrengkulthe nhenhe ikwere.  Alakenhe mpwareme-le anteme akwele itne areme-le ileme arrengkulthe akweke apeke uwe akngerre apeke-arle aneme alhwe ngkwenhe-le`
  },
  {
    language: "Kunwinjku",
    title: "Kunkurlba ke kamulewan",
    content: `Hep B manbu kundjak kunkuyeng karri, kanjdji kore kuburrk kadberre. Minj karrikanjbekkarren manekke kundjak kahdi kanjdji, kahbun kundiw kadberre, bu karridiwwarremen. Wanjh yire kore clinic ba ngundikurlbamang dja ngundikurlbanan, wanjh kumekke kabirrinan kore kunkurlba ke, bu yikarrme virus nawu kundjak. Wanjh nawu doctor kanmarneyime bu kamulewan kunkurlba kadberrre, bu kunubewu nawern dja nayahwurd nawu virus kundjak karrikarrme, kore ngad kunkurlba kadberre.`
  },
  {
    language: "Pitjantjatjara",
    title: "Panya nyuntumpa tjulkungku kutju nintini nyuntu kanyinyangka Hep B",
    content: `Nyuntu Hep B kanyiṟa, nyuntu walytjangku kulini nyuntu wiṟu mulapa nyinanyi, palu wiya, nyuntu pika puḻka-tjara. Tjulku nyuntumpa-wanungku nyakupai Hep B. Palula-wanungku nyuntumpa tjulkungka nyakupai pika palunya. Alu nyanga palula unngu nyinanyi puḻka mulapa, panya tjulku atunymankula kuṉpulpai, pika kutjupa tjuṯa puntu unngu wiyalpai.`
  },
  {
    language: "Murrinh Patha",
    title: "Kumulung ngarra nhinhi da matha kathimadhapnu, nhini warda kurdinhimardayithnu-yu.",
    content: `Hep B-ka kanam ngarra nginipunh neki da bere matha wangu.  Nanhthi-ka ngarra punhu neki-wa thanwuy thim-yu. Numi deyida-ka kardu birnu thurran pana-ya, pana-ya.
Thurru ngarra clinic thanirdi i kanhimathap nhinhi ngatha the nabath-nu-ka kumulung nanhthi kama virus-ya. 
Nanhthi virus kama-ya tharthin thanam ngarra kumulung nhinhi-yu.`
  }
];

function setReactInput(input, value) {
  if (!input) return;

  const setter =
    Object.getOwnPropertyDescriptor(input.constructor.prototype, "value")?.set ||
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;

  setter.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function contentToHtml(text) {
  return `
    <p>
      <span style="font-size:20px;">
        ${text.replace(/\r\n/g, "\n").replace(/\n/g, "<br>")}
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
  clipboardData.setData("text/html", html);
  clipboardData.setData("text/plain", html.replace(/<[^>]+>/g, ""));

  editor.dispatchEvent(new ClipboardEvent("paste", {
    bubbles: true,
    cancelable: true,
    clipboardData
  }));

  editor.dispatchEvent(new InputEvent("input", {
    bubbles: true,
    inputType: "insertFromPaste"
  }));

  editor.dispatchEvent(new Event("change", { bubbles: true }));
}

async function updateOneLanguage(item) {
  const tab = [...document.querySelectorAll(".lang-tab")].find(
    el => el.innerText.trim().toLowerCase() === item.language.toLowerCase()
  );

  if (!tab) {
    console.warn(`${item.language} tab not found`);
    return;
  }

  tab.click();
  await new Promise(resolve => setTimeout(resolve, 1500));

  const titleInput = document.querySelector('input[placeholder="Enter slide title"]');
  const editor = document.querySelector(".ProseMirror");

  setReactInput(titleInput, item.title);

  if (editor) {
    pasteHtmlIntoEditor(editor, contentToHtml(item.content));
  }

  console.log(`${item.language} updated`);
}

async function run() {
  for (const item of items) {
    await updateOneLanguage(item);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log("All 8 languages updated.");
}

run();