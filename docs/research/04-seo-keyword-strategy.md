# SEO kulcsszó- és versenytárs-stratégia (Ahrefs adatok alapján)

*Forrás: Ahrefs API v3 (keywords-explorer, site-explorer), HU piac, 2026-09-03*

## 1. Fő megállapítás: kicsi, de gyakorlatilag üres verseny

A magyar "fémipari fűrészgép" niche **abszolút keresési volumenben nagyon kicsi** (a legtöbb célkulcsszó havi 0–300 keresés között van), **DE** a jelenlegi versenytársak Ahrefs-mérhető organikus jelenléte is elképesztően gyenge:

| Domain | Domain Rating | Organikus kulcsszavak (HU) | Becsült havi organikus látogató |
|---|---|---|---|
| mep.btkkft.hu (jelenlegi BTK/MEP oldal) | **18** | **0** | **0** |
| atlanti-szerszam.hu | **24** | 6 (egyik sem MEP/fűrészgép témájú) | 4 |
| legnex.hu | 6 | 20 (1 db "kézi szalagfűrész" #9-es helyen, 300 vol.) | 81 |
| kerl.hu (Pilous forgalmazó) | 10 | 7 | 38 |

**Fontos korrekció a WebSearch-alapú kutatáshoz képest:** a WebSearch kutatás azt jelezte, hogy az Atlanti-Szerszám Kft. "jól rangsorol" MEP-márkás keresésekre. Az Ahrefs adatok ezt nem támasztják alá — a domainjük teljes organikus kulcsszó-lába mindössze 6 kifejezés, ebből **egy sem** MEP- vagy fűrészgép-témájú (helyi/branded kifejezésekre rangsorolnak: "szeged szerszámbolt" stb.). Valószínű magyarázat: az Atlanti-Szerszám MEP-termékoldalai léteznek és időnként megjelennek hosszú far­kú, gyakorlatilag mérhetetlen volumenű keresésekre (Ahrefs küszöb alatt), de **nincs valódi, mérhető organikus rangsorolási erejük** ezen a témán. **Ez jó hír**: a "MEP fűrészgép" / "MEP Magyarország" / modellnév-alapú long-tail térben gyakorlatilag nincs érdemi organikus versenytárs — egy jól felépített, friss, technikailag rendben lévő oldal reális eséllyel viszonylag gyorsan vezető pozícióba kerülhet.

A mep.btkkft.hu jelenlegi 0 organikus kulcsszava (DR 18 ellenére) arra utal, hogy a régi oldal technikailag/tartalmilag nem termel érdemi organikus forgalmat — ez erős érv az újraépítés mellett.

## 2. Mért kulcsszó-adatok (Ahrefs, HU, havi keresési volumen)

### Márkás / kategória célkulcsszavak (a brief eredeti listája)

| Kulcsszó | Volumen/hó | CPC (USD) | Megjegyzés |
|---|---|---|---|
| ipari fűrészgép | 10 | 0.20 | |
| automata fűrészgép | 0 | 0.15 | |
| szalagfűrész fémhez | 70 | 0.20 | legjobb az eredeti listából |
| körfűrész fémhez | 20 | – | |
| fémipari fűrészgép | 0 | 0.30 | magas CPC ellenére 0 mért volumen → alacsony keresési gyakoriság, de kereskedelmi szándék |
| ipari szalagfűrész | 70 | 0.15 | |
| fémipari darabológép | 0 | – | |
| automata szalagfűrész | 0 | – | |
| profil daraboló gép | 0 | – | |
| MEP Magyarország | 0 | – | domináns találatok irrelevánsak (Model European Parliament HU, "MEP-90 Kft." gumiabroncs cég) — NE építs erre önálló landing oldalt/kulcsszóra |
| MEP fűrészgép, MEP szalagfűrész, MEP körfűrész, MEP hivatalos forgalmazó, MEP szerviz, MEP alkatrész, félautomata szalagfűrész, CNC szalagfűrész, acél daraboló gép, cső daraboló gép, alumínium daraboló gép, fémdaraboló fűrészgép | nincs mérhető adat | – | Ahrefs adatbázisában nincs mérhető havi volumen — ez tipikus új/niche márkás+kategória kombinációknál; nem jelenti azt, hogy nincs kereslet, csak hogy a jelenlegi (rossz) SERP-lefedettség miatt nincs mérhető kattintási minta |

### Rokon kifejezések (related-terms lekérdezés "szalagfűrész" szóra, csak releváns/ipari találatok kiszűrve)

| Kulcsszó | Volumen/hó | CPC (USD) |
|---|---|---|
| **szalagfűrész eladó** | 900 | 0.02 |
| **fém szalagfűrész** | 500 | 0.15 |
| **használt szalagfűrész olcsón** | 400 | 0.04 |
| **asztali szalagfűrész** | 450 | 0.07 |
| **fémipari szalagfűrész** | 250 | 0.15 |
| kézi szalagfűrész | 300 | 0.08 |
| használt szalagfűrész eladó | 200 | 0.03 |
| fémvágó szalagfűrész | 200 | 0.10 |
| ipari fém szalagfűrész | 50 | 0.20 |
| fémdaraboló szalagfűrész | 80 | 0.30 |
| fém fűrészgép | 60 | 0.25 |
| elektromos fémfűrész | 30 | 0.15 |
| vízszintes szalagfűrész | 60 | 0.15 |

**Beazonosított szándék-réteg:** a niche keresési forgalom nagy része **használt/hobbi/kisipari** vásárlói szándék felé húz ("eladó", "használt", "olcsón", "kézi", "asztali" — feltehetően barkácsipar, nem nehézipari beszerző). Ez azt jelenti: a fő, nagy volumenű kulcsszavak **nem** a MEP célközönségét (ipari beszerzők, gyártó cégek) képviselik közvetlenül — ezeket nem szabad félrevezető módon célozni (pl. ne állítsunk be egy MEP ipari automata gépet "olcsó szalagfűrész eladó" kulcsszóra). Ehelyett a stratégia két rétegű:
1. **Kereskedelmi/ipari mag** (alacsony volumen, magas szándék): "ipari szalagfűrész", "fémipari szalagfűrész", "automata szalagfűrész", modellnév-alapú long-tail — ide optimalizáljuk a kategória- és termékoldalakat.
2. **Tájékoztató/tudástár réteg** (a blog feladata): "milyen szalagfűrészt vegyek", "hogyan válasszunk fémipari szalagfűrészt", automata vs. félautomata döntési tartalmak — ez hozza be a felső tölcsér forgalmat és épít szakmai hitelességet/linket, még ha a keresési volumen egyenként alacsony is.

## 3. Keyword map / topic cluster javaslat

**Pillér 1 — MEP márka & Magyarország** (branded)
- MEP Magyarország, MEP hivatalos forgalmazó, MEP fűrészgép, MEP szerviz, MEP alkatrész, MEP [modellnév] (pl. "MEP Shark 332")
- Cél oldalak: főoldal, Rólunk/MEP Magyarország oldal, egyedi termékoldalak
- Nincs mérhető Ahrefs-volumen ma, de gyakorlatilag versenytárs nélküli tér — hosszú távon ez építi a "MEP Magyarország" entitást magát Google szemében

**Pillér 2 — Szalagfűrész kategória**
- ipari szalagfűrész, fémipari szalagfűrész, automata szalagfűrész, félautomata szalagfűrész, fém szalagfűrész, szalagfűrész fémhez, fémvágó szalagfűrész
- Cél oldalak: /termekek/szalagfureszek/ és alkategóriák

**Pillér 3 — Körfűrész kategória**
- körfűrész fémhez, fémvágó körfűrész, gyorsdaraboló, tárcsás darabológép
- Cél oldalak: /termekek/korfureszek/ és alkategóriák

**Pillér 4 — Ipari darabolás / szakmai tudástár (blog)**
- acél daraboló gép, cső daraboló gép, profil daraboló gép, alumínium daraboló gép, "milyen szalagfűrészt vegyek", vágási kapacitás, automata vs. félautomata
- Cél: 8 induló blogcikk + belső linkelés a termék-/kategóriaoldalak felé

**Pillér 5 — Szerviz & alkatrész**
- MEP szerviz, MEP alkatrész, fűrészgép szerviz, szalagfűrészlap fémhez
- Cél oldalak: Szerviz/Kapcsolat szekció — alacsony volumen, de magas kereskedelmi/meglévő ügyfél szándék

## 4. Versenytárs-tanulságok (mit csináljunk jobban)

- **Kerl Hungária (Pilous)** a legjobb strukturális minta: egy-márkás forgalmazói pozicionálás, "hivatalos magyarországi képviselet" nyíltan kimondva, részletes spec-oldalak, ajánlatkérő űrlap mindenhol — ezt a mintát kövessük.
- **Femgepszer.hu** jó content-marketing mintát ad (vásárlási útmutató cikkek) — a blog-stratégiánkban hasznosítsuk.
- **Fűrész Tech / MEBA-Hungary**: elavult design, gyenge fotózás — könnyű vizuálisan felülmúlni.
- **Egyik versenytársnak sincs érdemi Ahrefs-mérhető organikus ereje** ezen a témán → technikai SEO-alapok (sitemap, schema, gyors betöltés, helyes URL-struktúra, belső linkelés) + következetes tartalomgyártás valószínűleg önmagában is vezető pozícióba juttatja az oldalt 6–12 hónapon belül.

## 5. MISSING DATA / további Ahrefs-lépések

- MISSING DATA: keyword `difficulty` mező jelenleg instabil/hibás az Ahrefs API-ban több magyar kulcsszóra (ismétlődő "internal server error" a `difficulty` mező bekérésekor) — a `keyword_difficulty` becslést a `site-explorer-organic-keywords` végpont `keyword_difficulty` oszlopával kell később pótolni, vagy újra próbálni, ha az API-hiba megszűnik.
- MISSING DATA: a fenti kulcsszó-lista csak a brief eredeti listáját és egy "szalagfűrész" seed related-terms lekérdezését fedi le — javasolt további related-terms lekérdezés "körfűrész", "darabológép" és "ipari gép beszerzés" seedekre, amint a termékstruktúra (Excel) megérkezik és pontosítható, mely kategóriaoldalakra van ténylegesen szükség.
- Site Audit (Ahrefs Site Audit projekt) csak a kész oldal domainjén futtatható — ez a Fázis 8-as lépés (a fejlesztés végén).
