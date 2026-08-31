# Projektregeln

## Hosting

- **Live-URL:** https://stockibanjo.github.io/ofenrohre-band
- Die alte Domain `ofenrohre.de` ist nicht mehr aktiv (archiviert am 30.03.2026).

## Git
- **Niemals selbständig committen oder pushen** – immer erst auf ausdrückliche Anweisung warten.
- Ausnahme: Wird ein Auftrag über die App „Claude Remote Terminal" (Vorlagen
  „Auftritt hinzufügen" / „Termin hinzufügen") gestartet, ist das die
  ausdrückliche Anweisung. Nach der Änderung per `/tmp/claude-frage.sh` fragen,
  ob committet und gepusht werden soll. Push = Live-Deploy (GitHub Pages).

---

## Auftritt hinzufügen (Seite `bilder-auftritte.html`)

Live: https://stockibanjo.github.io/ofenrohre-band/bilder-auftritte.html

Ein Auftritt ist eine `<tr>` in der Tabelle `table.stone-table.auf-liste`.
Neueste Auftritte stehen **oben** (direkt unter der Kopfzeile
`<th>Datum &amp; Anlass</th><th>Bilder</th>`).

**Eingaben aus der App:** **Datum** (`TT.MM.JJJJ`, aus dem Datumswähler) und
**Anlass** (Ort/Beschreibung) – auf der Seite in der Spalte „Datum & Anlass"
zusammengeführt zu `<span class="auf-datum">TT.MM.JJJJ</span><br>Anlass`. Dazu
optional hochgeladene Bilder in einem `/tmp/claude-anhang-<ts>/`-Ordner.

**Schritte:**

1. **Bildordner** (nur wenn Bilder angehängt sind): Ordner
   `auftritte/<JJ.MM.TT-slug>/` anlegen (2-stelliges Jahr, Monat, Tag; `slug` =
   klein­geschriebener Ort ohne Umlaute/Leerzeichen, z.B. `26.08.06-teningen`).
   Die hochgeladenen Bilder aus `/tmp/claude-anhang-<ts>/` dorthin kopieren.
2. **Thumbnails** je Bild erzeugen (Suffix `-k.jpg`), mit ImageMagick:
   ```
   convert "<bild>.jpg" -auto-orient -resize x300 -quality 82 "<bild>-k.jpg"
   ```
   Das Vollbild bleibt unter `<bild>.jpg`, das Thumbnail unter `<bild>-k.jpg`.
3. **Neue Zeile** oben in `auf-liste` einfügen (Muster der bestehenden Einträge):
   ```html
   <!-- <Anlass> <Jahr> -->
   <tr>
     <td class="auf-when"><span class="auf-datum">TT.MM.JJJJ</span><br><Anlass></td>
     <td class="auf-pics">
       <a class="lb" href="auftritte/<ordner>/<bild>.jpg"><img class="auf-thumb" src="auftritte/<ordner>/<bild>-k.jpg" alt="<Anlass> <Jahr>"></a>
       <!-- je weiteres Bild eine weitere <a class="lb">…</a>-Zeile -->
     </td>
   </tr>
   ```
   Ohne Bilder die `<td class="auf-pics">` leer lassen (keinen Ordner/Thumbnails
   anlegen).

---

## Termin hinzufügen (Seite `termine.html`)

Live: https://stockibanjo.github.io/ofenrohre-band/termine.html

Ein Termin ist eine `<tr>` in der Tabelle `table.stone-table` mit den Spalten
**Veranstaltung · Ort · Datum**. Die kursive Platzhalterzeile ganz unten
(„Öffentliche Probe … sporadisch", Stil `color:#5a4010; font-style:italic`)
bleibt immer als **letzte** Zeile stehen.

**Eingaben aus der App:** Veranstaltung, Ort, Datum.

**Schritt:** neue Zeile **oberhalb** der kursiven Platzhalterzeile einfügen:
```html
<tr>
  <td><Veranstaltung></td>
  <td><Ort></td>
  <td style="white-space: nowrap;"><Datum></td>
</tr>
```
Umlaute als HTML-Entities schreiben (z.B. `&#214;` für „Ö"), wie im Bestand.

---

## Termin entfernen (Seite `termine.html`)

Live: https://stockibanjo.github.io/ofenrohre-band/termine.html

**Eingabe aus der App:** ein Suchbegriff, der entweder auf die Spalte
**Veranstaltung** oder auf die Spalte **Datum** einer Termin-Zeile passt.

**Schritte:**

1. In der Termine-Tabelle die `<tr>` suchen, deren Veranstaltung **oder** Datum
   den Suchbegriff enthält (Groß-/Kleinschreibung ignorieren, HTML-Entities wie
   `&#214;` beim Vergleich als Klartext behandeln).
2. Genau **diese eine** Zeile löschen.
3. Die kursive Platzhalterzeile („Öffentliche Probe … sporadisch",
   `font-style:italic`) **niemals** löschen.
4. Passt **kein** Eintrag oder passen **mehrere** zugleich, nicht raten,
   sondern über `/tmp/claude-frage.sh` rückfragen (bei mehreren die Treffer
   auflisten und den gewünschten bestätigen lassen).

