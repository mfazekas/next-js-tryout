
import fetch from 'next/dist/compiled/node-fetch'

export async function getServerSideProps(context) {
  let {query} = context;
  let {t, h} = query;

  let uriToCapture = 'https://next-js-tryout.vercel.app/shared/preview?t=${t}&h={h}';
  let url = `https://69o4qrgoeh.execute-api.us-west-1.amazonaws.com/dev/image.jpg?key=preview_t_${t}_h_${h}&url=${encodeURI(uriToCapture)}`;
  console.log("URL", url);
  fetch(url)
  return {
    props: {t: t, h: h}
  }
}

/// Nothing to render
export default function Home() {
  return (<></>);
}