

export default function getPrefetchUrl({t, h}) {
  let uriToCapture = 'https://next-js-tryout.vercel.app/shared/preview?t=${t}&h={h}';
  let url = `https://69o4qrgoeh.execute-api.us-west-1.amazonaws.com/dev/image.jpg?key=preview_t_${t}_h_${h}&url=${encodeURI(uriToCapture)}`;
  return url; 
}