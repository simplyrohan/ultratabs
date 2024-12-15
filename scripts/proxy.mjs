const scramjet = new ScramjetController({
  files: {
    wasm: "/scram/scramjet.wasm.js",
    worker: "/scram/scramjet.worker.js",
    client: "/scram/scramjet.client.js",
    shared: "/scram/scramjet.shared.js",
    sync: "/scram/scramjet.sync.js",
  },
});

scramjet.init("./sw.js");

const connection = new BareMux.BareMuxConnection("/proxy/baremux/worker.js");

export function search(input, template) {
  try {
    return new URL(input).toString();
  } catch (err) { }

  try {
    const url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) { }

  return template.replace("%s", encodeURIComponent(input));
}

export async function getUV(input) {
  // try {
  //     await registerSW();
  // } catch (err) {
  //     error.textContent = "Failed to register service worker.";
  //     errorCode.textContent = err.toString();
  //     throw err;
  // }

  let url = search(input, "https://www.google.com/search?q=%s");

  // let wispUrl = "wss://wisp.mercurywork.shop/wisp/"
  let wispUrl = "wss://wisp.mercurywork.shop/wisp/"

  if (await connection.getTransport() !== "/proxy/epoxy/index.mjs") {
      await connection.setTransport("/proxy/epoxy/index.mjs", [{ wisp: wispUrl }]);
  }
  // if (await connection.getTransport() !== "/libcurl/libcurl.mjs") {
  //   await connection.setTransport("/libcurl/libcurl.mjs", [{ wisp: wispUrl }]);
  // }

  // let viewUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
  let viewUrl = scramjet.encodeUrl(url);

  return viewUrl;
}
