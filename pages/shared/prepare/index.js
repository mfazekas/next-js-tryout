
import fetch from 'next/dist/compiled/node-fetch'
import https from 'next/dist/compiled/https';

import getPrefetchUrl from '../../../utils/get-prefetch-url'

export async function getServerSideProps(context) {
  let {query} = context;
  let {t, h} = query;

  let uri = getPrefetchUrl({t, h});
  console.log("Prefetch URL on server side:", url);

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  fetch(url, { agent: httpsAgent })
  return {
    props: {t: t, h: h}
  }
}

/// Nothing to render
export default function Home() {
  return (<></>);
}