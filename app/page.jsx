"use client";

import { useEffect, useState } from "react";

export default function SimpleCspTestPage() {
  const [nonce, setNonce] = useState(null);

  useEffect(() => {
    fetch(window.location.href, { method: "HEAD" })
      .then((res) => res.headers.get("x-csp-nonce"))
      .then(setNonce)
      .catch(() => setNonce(null));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Test CSP con nonce e immagini</h1>

      <section style={{ marginTop: 20 }}>
        <h2>Immagine permessa (dominio consentito)</h2>
        <img
          src="https://ioninteractive.com/ionacademy/wp-content/uploads/2023/12/ion_academy-How_to_create_a_test_url.png"
          alt="Immagine permessa"
          style={{ maxWidth: 300, border: "1px solid green" }}
        />
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Immagine bloccata (dominio non consentito)</h2>
        <img
          src="https://iteratorstesting.com/images/_mediumSize/testLink-logo.png"
          alt="Immagine bloccata"
          style={{ maxWidth: 300, border: "1px solid red" }}
        />
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Script inline con nonce</h2>
        {nonce ? (
          <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `
                console.log("Script inline autorizzato eseguito");
                document.body.style.backgroundColor = "#d0f0c0";
              `,
            }}
          />
        ) : (
          <p>Attendi nonce...</p>
        )}
      </section>
    </div>
  );
}
