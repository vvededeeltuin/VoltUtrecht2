/**
 * Cloudflare Pages Function — GitHub OAuth callback voor Sveltia CMS
 *
 * Deze functie handelt de OAuth-authenticatie af zodat redacteuren
 * kunnen inloggen op het beheerpaneel via hun GitHub-account.
 *
 * Vereiste omgevingsvariabelen in Cloudflare Pages dashboard:
 *   GITHUB_CLIENT_ID     — van jouw GitHub OAuth App
 *   GITHUB_CLIENT_SECRET — van jouw GitHub OAuth App
 */

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return new Response("Geen autorisatiecode ontvangen.", { status: 400 });
  }

  // Wissel de code in voor een toegangstoken bij GitHub
  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  );

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(
      `GitHub OAuth fout: ${tokenData.error_description}`,
      { status: 400 }
    );
  }

  const token = tokenData.access_token;

  // Stuur het token terug naar de CMS via een postMessage
  const html = `<!DOCTYPE html>
<html>
<head><title>Inloggen geslaagd</title></head>
<body>
<script>
  // Sveltia CMS verwacht dit postMessage formaat
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify({ token, provider: "github" })}',
        e.origin
      );
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
<p>Inloggen geslaagd — dit venster sluit automatisch.</p>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}
