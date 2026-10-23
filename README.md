# Volt Afdeling Utrecht — Hugo Website

Statische Hugo-site met Sveltia CMS voor visueel bewerken in de browser.

---

## Lokaal starten

```bash
cd mysite
hugo server
# Bezoek http://localhost:1313
```

Vereiste: Hugo v0.110 of hoger. Geen npm of Node.js nodig.

---

## Beheerpaneel (Sveltia CMS)

Na deployment bereikbaar op:
```
https://voltutrecht.pages.dev/admin/
```

Inloggen gaat via GitHub — iedereen die je toegang geeft tot de
repository kan inloggen en content bewerken.

---

## Sveltia CMS instellen (eenmalig na eerste deployment)

### Stap 1 — GitHub OAuth App aanmaken

1. Ga naar https://github.com/settings/developers
2. Klik **OAuth Apps -> New OAuth App**
3. Vul in:
   - Application name: Volt Utrecht CMS
   - Homepage URL: https://voltutrecht.pages.dev
   - Authorization callback URL: https://voltutrecht.pages.dev/api/auth/callback
4. Klik **Register application**
5. Kopieer de **Client ID**
6. Klik **Generate a new client secret** en kopieer ook dat

### Stap 2 — Secrets toevoegen in Cloudflare

1. Ga naar je Pages project in het Cloudflare dashboard
2. Klik **Settings -> Environment variables**
3. Voeg toe (voor zowel Production als Preview):
   - GITHUB_CLIENT_ID     = jouw Client ID uit stap 1
   - GITHUB_CLIENT_SECRET = jouw Client Secret uit stap 1
4. Klik **Save**
5. Ga naar **Deployments** en klik **Retry deployment**

### Stap 3 — Inloggen testen

Ga naar https://voltutrecht.pages.dev/admin/ en klik Login with GitHub.

---

## Redacteuren toegang geven

1. Ga naar https://github.com/vvededeeltuin/voltutrecht/settings/collaborators
2. Klik **Add people** en voer het GitHub-gebruikersnaam in
3. Kies **Write** als rol

---

## Wat redacteuren kunnen bewerken

- Nieuws: toevoegen, bewerken, taggen per community of fractie
- Evenementen: datum, locatie, koppeling aan community of fractie
- Vacatures: toevoegen en bewerken
- Team Bestuur: namen, rollen, uitspraken, fotos
- Team Communities: visie-kaarten en teamleden per community
- Team Fracties: visie-kaarten en fractieleden per fractie

---

## Site updaten na lokale wijzigingen

```bash
git add .
git commit -m "Omschrijving van de wijziging"
git push
```

Cloudflare herdeployt automatisch binnen ongeveer 60 seconden.
