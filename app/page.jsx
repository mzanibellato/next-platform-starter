import Link from 'next/link';
import { Card } from 'components/card';
import { ContextAlert } from 'components/context-alert';
import { Markdown } from 'components/markdown';
import { RandomQuote } from 'components/random-quote';
import { getNetlifyContext } from 'utils';

const contextExplainer = `
The card below is rendered on the server based on the value of \`process.env.CONTEXT\` 
([docs](https://docs.netlify.com/configure-builds/environment-variables/#build-metadata)):
`;

const preDynamicContentExplainer = `
The card content below is fetched by the client-side from \`/quotes/random\` (see file \`app/quotes/random/route.js\`) with a different quote shown on each page load:
`;

const postDynamicContentExplainer = `
On Netlify, Next.js Route Handlers are automatically deployed as [Serverless Functions](https://docs.netlify.com/functions/overview/).
Alternatively, you can add Serverless Functions to any site regardless of framework, with acccess to the [full context data](https://docs.netlify.com/functions/api/).

And as always with dynamic content, beware of layout shifts & flicker! (here, we aren't...)
`;

const ctx = getNetlifyContext();

export default function Page() {
    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <section>
                <ContextAlert className="mb-6" />
                <h1 className="mb-4">Netlify Platform Starter - Next.js</h1>
                <p className="mb-6 text-lg">Get started with Next.js and Netlify in seconds.</p>
                <Link href="https://docs.netlify.com/frameworks/next-js/overview/" className="btn btn-lg sm:min-w-64">
                    Read the Docs
                </Link>
            </section>

            {/* Sezione immagini: immagine permessa e immagine bloccata */}
            <section className="flex flex-col gap-6">
                <h2>Test immagini con CSP</h2>
                <p>Immagine permessa (da dominio CSP consentito):</p>
                <img 
                  src="https://ioninteractive.com/ionacademy/wp-content/uploads/2023/12/ion_academy-How_to_create_a_test_url.png" 
                  alt="Immagine permessa" 
                  style={{ maxWidth: '300px' }} 
                />
                <p>Immagine bloccata (da dominio non consentito):</p>
                <img 
                  src="https://iteratorstesting.com/images/_mediumSize/testLink-logo.png" 
                  alt="Immagine bloccata" 
                  style={{ maxWidth: '300px' }} 
                />
            </section>

            {/* Sezione script: script inline autorizzato e script inline bloccato */}
            <section className="flex flex-col gap-6">
                <h2>Test script inline con CSP nonce</h2>

                {/* Script autorizzato con nonce */}
                <script 
                    nonce={process.env.NEXT_PUBLIC_CSP_NONCE /* o altro modo di passare nonce */}
                    dangerouslySetInnerHTML={{
                        __html: `
                            console.log('Script inline autorizzato eseguito');
                            document.body.style.backgroundColor = '#d0f0c0'; // prova visiva
                        `
                    }} 
                />

                {/* Script bloccato senza nonce */}
                <script dangerouslySetInnerHTML={{
                    __html: `
                        console.log('Questo script inline senza nonce sarà bloccato');
                        alert('Alert che non dovrebbe apparire perché blocca CSP');
                    `
                }} />
            </section>

            {!!ctx && (
                <section className="flex flex-col gap-4">
                    <Markdown content={contextExplainer} />
                    <RuntimeContextCard />
                </section>
            )}

            <section className="flex flex-col gap-4">
                <Markdown content={preDynamicContentExplainer} />
                <RandomQuote />
                <Markdown content={postDynamicContentExplainer} />
            </section>
        </div>
    );
}

function RuntimeContextCard() {
    const title = `Netlify Context: running in ${ctx} mode.`;
    if (ctx === 'dev') {
        return (
            <Card title={title}>
                <p>Next.js will rebuild any page you navigate to, including static pages.</p>
            </Card>
        );
    } else {
        return (
            <Card title={title}>
                <p>This page was statically-generated at build time.</p>
            </Card>
        );
    }
}
