const items = [
  {
    language: "Yolŋu",
    title: `Rerri dhuwal liver cancer dhu bawalamirriy märram`,
    content: `Ŋuli nhe ga Hep-B rerri weyin ŋayathaŋal, nhuŋu ban ŋayi ganydjarr-dumurr yi, ga ŋuli nhe ga bayngu Heb rerri ŋayatham ŋunhi dhiny ga manymak nhe. Ŋuli nhe dhu 50 years old- mirri yirr, dr-y dja dhu ŋäŋthun nhuna nhe dhu djakap märram nhakun ultrasound djakap bidilaw ga blood test, ŋunhi dhiny nhe dhu ga märram 6 month-thu djulkthurr bala nhe dhu djakap dja märraŋun. Ŋuli ga ganydjarr-dumurr ŋuthan djiniwa nhukal bidilaŋur ga ŋuli dhu malŋmaram barrku yan, mirritjin ga ŋorra. Ŋuli dhu yindi dhirr dja gumurr-däl nha dhu malŋ’maraŋ mirritjinguny.`
  },
  {
    language: "Anindilyakwa",
    title: `Awa-langwa angbilyu-wa`,
    content: `Amiyerra kuwilyakina-manja Hepatitis B kembirra akina cancer kangekburakajungwunama arrawa awa-manja. Akinu-langwa nungkwurrilangwa doctor yikabuminamenama merra akwa yikaburringkini-yada akurruburrungkuma nungkwurrilangwa-manja awa angkababurni-langwa  yimangbala-manja yimawura nungkwurrilangwa-manja age 50 keyamina-manja. Cancer kalungkwarringina-manja nungkwurrilangwa-manja awa akwa karrakburrangina-manja naru-wiya aramaduma akina eningaba mirrijina narruwilyakinama. Umba karrakburrangina-manja ababurna nara akina angekburakama.`
  },
  {
    language: "warlpiri",
    title: `Nyarrpa jarrimi kalu warrarda- yilima cancer wiri nyayirni`,
    content: `Kajinpa tarnnga warrarda mardani Hep B ngulaju kaji kanpa cancer mani  nyuntu nyangu yilimarla. Kajinpa 50 jarrimi nyangka doctor nyuntu nyangu yungupa mardani yilima  kurlangu ultrasound 6 monthrla. Kaji yilima cancer wiri jarrimi yilimarla ngulakuju palka ka karrimi treatment. Kala kajili wirilki palka mani ngulaju nganta hard treat-ti maninjakuju.`
  },
  {
    language: "Tiwi",
    title: `Kurrukurra cancer`,
    content: `Yingwapa Tiwi kapi wuniyi awarra Hep B wuta wiyi wunga awarra kurukura liver cancer karri wuta papurruluwiyi. Karri nguwa 50 years old ngarra kuluwunyi tokutuwi ngini wunga manunguli amitya ultrasound scans awarra liver 6 month. Ngini arukulani arimi awarra kurukura api wuta tokutuwi wumaniwani ngawa ngini kijini awarra kurukura jana arramukuta pupuni arimi arramukuta karlu.`
  },
  {
    language: "Arrernte",
    title: `Kele nthakene anteme irreme arrurlenge-ntyele?  Cancer-le anteme aleme ngkwinhe rlkerte ileme.`,
    content: `Unte apeke arle Hep B akerte aneke arrurlenge-tyele, wale unte ithwenge apeke aleme ngkwenhe akurne-iletyenhe cancer-le, unte arle Hep B nhenhe akerte anetyakene.  Alakenhe ikwernge anteme unte 50 years old irreme-le, ngare ngkwenhe-le ngenhe apayutheme alhwe inetyeke (blood test) uthene ultrasound scans arlke inetyeke 6 months-nge akwethe.  Aleme ngkwenhe-nge apeke arle cancer arrteme  nhenge arrekwerle, kwerle anteme arle arekeke-iperre, akngerre irreketye athathe (treatments) mpware-tyeke, arne akurne yanhe urlkere apeke arle akngerre irreke areke-iperre, uyarne treatment-le mwerre-ileme.`
  },
  {
    language: "Kunwinjku",
    title: `Cancer kamarnburren kore kurriw`,
    content: `Bu ngudda yikarrme Hep B nawu kundjak bu kunkuyeng, wanjh wardi cancer kamarnburren kore kurriw ke.  Bu yiyimerran age ke 50, wanjh yire kore clinic bu kayimerran dird 6. Ngundikurlbamang dja mak ngundinan ultrasound scan baddumang kore kurriw ke. Nawu doctor werrk kangalke cancer kundjak kore kundiw ke, wardi yerre wanjh kakimukmen. Dja wanjh werrk yimang mirridjin. Dja bu minj yire kore clinic, wanjh kunukka kakimukmen nawu cancer kundjak.`
  },
  {
    language: "Pitjantjatjara",
    title: `Alu cancer-tjara, pika kura mulapa`,
    content: `Nyuntu pika Hep B tjarangku, pika cancer mapalkungku mantjilpai. Palu nyuntu tjinguṟu Hep B wiya tjara, nyuntumpa tjuku-tjuku nguwanpa pika nyanga palunya mantjilku. Nyanga palula-nguṟu nyuntu panya year 50-ngka ngaṟanyi, doctor nyuntumpa tjulku nyuntumpa nyakunytjaku, munu paluṟu ultrasound nyaaṉi munu nyanganyi nyuntumpa alu nyanganyi piṟa mankurpa-mankurpa-ngka. Nyuntumpa alungka cancer tjinguṟu ngaṟanyangka, paluṟu doctor-ngku panya cancer nyanga palunya nyakula doctor-ngku miritijina wiṟu ungkupai. Tjinguṟu cancer nyanga palunya puḻka mulapa ngaṟanyangka, puṯu palyalpai.`
  },
  {
    language: "Murrinh Patha",
    title: `Kanhi-ka nanhthi matharr wiye ngarra punhu pirrim.`,
    content: `Matharr Hep B nabath tharni-ka nanhthi matharr wiye-ka nart deyida ngarra nahnthi punhu-yu.
Ngarra 50 warda thamanu-ka ku wanangkal warda panhimathadhap-nu pirra nanhthi kumulung ngarra nhinhi-yu i nanhthi parninhimangawurtnu da-ka merrk 6-wa pumampatha-nu.
Nanhthi matharr wiye wurdanturturt wurran ngarra nanhthi punhu nhinhi-yu. Mu mangini kunungingki-re ngatha memnuwatha wurran-ka nanhthi mirrithin warda bampakamit-yu. Mu nanhthi ngala ngatha kirra-ka nhini-ka da tiduk warda`
  }
];