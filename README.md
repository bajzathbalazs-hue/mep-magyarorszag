# MEP Magyarország — weboldal

MEP fémipari fűrészgépek magyarországi forgalmazói weboldala (BTK Kft.). Statikus HTML/CSS/JS alapváltozat, build-eszköz nélkül.

## Struktúra

```
index.html                          Főoldal
pages/rolunk.html                   Rólunk / MEP Magyarország
pages/kapcsolat.html                Kapcsolat + ajánlatkérő űrlap (demó, backend nélkül)
pages/termekek/index.html           Termékek — kategória áttekintő
pages/termekek/szalagfureszek/      Szalagfűrész kategória + modellek
pages/termekek/korfureszek/         Körfűrész kategória + modellek
pages/keszlet/index.html            Aktuális készlet (adat még hiányzik — lásd MISSING DATA)
pages/blog/index.html               Blog index (cikkek még hiányoznak — lásd MISSING DATA)
assets/css/style.css                Design rendszer (fehér–szürke–kék, dark/light mód)
assets/js/main.js                   Mobil menü, scroll reveal, űrlap-validáció
docs/research/                      Fázis 1 kutatási jelentések (BTK, MEP, konkurencia, SEO)
```

## Megnyitás helyben

Nincs build-lépés — nyisd meg az `index.html`-t egy helyi szerveren keresztül (pl. `python3 -m http.server` a projekt gyökerében), mert néhány relatív link/fetch csak `http://` alól működik megbízhatóan.

## Fő MISSING DATA pontok (lásd részletesen `docs/research/`)

- Nincs megerősítve nyilvános forrásból a "hivatalos/kizárólagos MEP-forgalmazó" pontos jogi megfogalmazása — a brief szerint ez tény, de céges dokumentummal még nem alátámasztott.
- Nincs végleges termékadatbázis (Excel) — a termékoldalak modellnevei megerősítettek (mepsaws.it/en + a régi mep.btkkft.hu alapján), de pontos műszaki adatok, árak és képek hiányoznak.
- Nincs aktuális raktárkészlet-adat.
- Nincs végleges, jóváhagyott 8 blogcikk-téma és -szöveg.
- Nincs megerősített céges jogi adat (adószám, cégjegyzékszám) magától a BTK-tól — csak külső cégadatbázisból, ellenőrzésre szorul.

## Következő lépések

1. Excel termékadatbázis feldolgozása → egyedi termékoldalak + pontos kategória-szűrők
2. Végleges 8 blogcikk megírása a SEO-stratégia alapján
3. Ajánlatkérő űrlap backend bekötése (spam-védelem + e-mail küldés)
4. Valós fotók/videók beillesztése a placeholder blokkok helyére
5. Ahrefs Site Audit a kész oldalon (Fázis 8)
