import Head from 'next/head'
import { useRouter } from 'next/router'
import fetch from 'next/dist/compiled/node-fetch'


async function fetchScreenshot() {
  

  const req = {
    //navigate to our automation test page
    url:"https://next-js-tryout.vercel.app/to-screenshot",
    //outputs a jpeg.  Note the value of the Label in the screenshot
    //renderType:"jpeg",
    renderType:"automation",
    //request will pause until the DOMReady event, then click the button which changes the label
    // ready-to-screenshot
    overseerScript:'page.setViewport({width: 400, height: 300}); page.meta.log("zero") ; await page.waitForNavigation({waitUntil:"domcontentloaded"}); page.meta.log("first") ; await page.waitForDelay(30000); page.meta.log("second") ; await page.waitForSelector("div#ready-to-screenshot") ; await page.waitForSelector("#ready-to-screenshot"); page.meta.log("third") ; await page.waitForDelay(30000);',
  }

  let request = `https://phantomjscloud.com/api/browser/v2/a-demo-key-with-low-quota-per-ip-address/?request=${encodeURIComponent(JSON.stringify(req))}`
  console.log("Request", request)


///
/// https://phantomjscloud.com/api/browser/v2/ak-xckn1-433j2-z0w1c-atfw4-20vhh/?request=%7B%22url%22%3A%22https%3A%2F%2Fnext-js-tryout.vercel.app%2Fto-screenshot%22%2C%22renderType%22%3A%22automation%22%2C%22overseerScript%22%3A%22page.setViewport(%7Bwidth%3A%20400%2C%20height%3A%20300%7D)%3B%20await%20page.waitForNavigation(%7BwaitUntil%3A%5C%22domcontentloaded%5C%22%7D)%3B%20await%20page.waitForDelay(50000)%3B%20await%20page.waitForSelector(%5C%22%23ready-to-screenshot%5C%22)%3B%20await%20page.waitForDelay(30000)%3B%22%7D
///
/// https://phantomjscloud.com/api/browser/v2/ak-xckn1-433j2-z0w1c-atfw4-20vhh/?request=%7B%22url%22%3A%22https%3A%2F%2Fnext-js-tryout.vercel.app%2Fto-screenshot%22%2C%22renderType%22%3A%22automation%22%2C%22overseerScript%22%3A%22page.setViewport(%7Bwidth%3A%20400%2C%20height%3A%20300%7D)%3B%20page.meta.log(%5C%22zero%5C%22)%20%3B%20await%20page.waitForNavigation(%7BwaitUntil%3A%5C%22domcontentloaded%5C%22%7D)%3B%20page.meta.log(%5C%22first%5C%22)%20%3B%20await%20page.waitForDelay(30000)%3B%20page.meta.log(%5C%22second%5C%22)%20%3B%20await%20page.waitForSelector(%5C%22%23ready-to-screenshot%5C%22)%3B%20page.meta.log(%5C%22third%5C%22)%20%3B%20await%20page.waitForDelay(30000)%3B%22%7D

  const res = await fetch(request)
  const data = await res.json()
  console.log("Got data", data);

  return data;

}

export async function getServerSideProps(context) {
  let {query} = context;
  await fetchScreenshot();
  return {
    props: {
      foot: "woah",
      url: {query: {foo: "bar", asd: "bas", title: `foo123 ${query['t']}`}}
    }, // will be passed to the page component as props
  }
}

export default function Home({url: { query }}) {
  const router = useRouter()
  console.log(router.query);
  console.log("RAW QUery", query);

  return (
    <div className="container">
      <Head>
        <title>Create Next App ok {query["title"]}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:description" content={`An description - ${query["title"]}`} key="title" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to ok <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing ok ok {query["title"]} <code>pages/index.js</code>
        </p>

        <p>
          <pre>
            {JSON.stringify(query)}
          </pre>
        </p>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/zeit/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
