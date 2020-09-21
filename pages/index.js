import Head from 'next/head'
import { useRouter } from 'next/router'
import fetch from 'next/dist/compiled/node-fetch'
import { useState } from 'react';

export async function getServerSideProps(context) {
  let {query} = context;

  let qh = query['h'] || 130;
  let qt = query['t'];
  let uriToCapture = `https://next-js-tryout.vercel.app/to-screenshot?t=${qt}a#map=1/30/${qh}`
  return {
    props: {
      foot: "woah",
      url: {query: {foo: "bar", asd: "bas", title: `foo123 ${query['t']}`}},
      meta: {
        image: `https://69o4qrgoeh.execute-api.us-east-1.amazonaws.com/dev/image.jpg?key=preview_t_${qt}_h_${qh}&wait=yes&url=${encodeURI(uriToCapture)}`,
        title: `T:${query['t']}`
      },
    }, // will be passed to the page component as props
  }
}

export default function Home({url: { query }, meta}) {
  const router = useRouter()
  console.log(router.query);
  console.log("RAW QUery", query);

  const [title, setTitle] = useState("hello")
  const [coords, setCoords] = useState(130)
  const [share, setShared] = useState(false)

  return (
    <div className="container">
      <Head>
        <title>Create Next App ok {query["title"]}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:description" content={`An description - ${query["title"]}`} key="description" />
        <meta property="og:image" content={meta['image']} key="image" />
        <meta property="og:title" content={meta["title"]} key="title" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:description" content={`title - ${meta['title']}`} key="twdescription" />
        <meta property="og:image:width" content={500} />
        <meta property="og:image:height" content={800} />
      </Head>

      <main>
        <h1 className="title">
          Welcome to ok <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div>
          <div class="flex flex-row my-1">
            <div class="w-16">Title:</div><input value={title} onChange={(e) => { setTitle(e.target.value); setShared(false) }} />
          </div>
          <div class="flex flex-row my-1">
            <div class="w-16">Coords:</div><input value={coords} onChange={(e) => { setCoords(e.target.value); setShared(false) }} />
          </div>
          <button class="rounded bg-yellow-400 p-3 my-1" onClick={(e) => {
            console.log("Share pressed");
            fetch(`${window.location.protocol}//${window.location.host}/shared/prepare?t=${encodeURIComponent(title)}&h=${coords}`)
            //router.push(`/shared?t=${encodeURIComponent(title)}&h=${coords}`)
            setShared(true)
          }}>Share</button>
        </div>

        {share && <div class="border rounded">
            <div>URL:</div><div>{`${window.location.protocol}//${window.location.host}/shared?t=${encodeURIComponent(title)}&h=${coords}`}</div>
          </div>}
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
