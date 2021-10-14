const randomBytes = (N) => globalThis.crypto.getRandomValues(new Uint8ClampedArray(N));
const handleRequest = async (request)=> {
  const url = new URL(request.url);
  console.log(url)
  const bytesLength = Number(url.pathname.split('/')[1]) || 1;
  return new Response(randomBytes(bytesLength), {
    headers:{
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${bytesLength}.bin"`,
      server:url.host
  }});
};
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});