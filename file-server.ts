// this function will handle the http string request
async function handler(request: Request) {
  console.log(request.url);
  
  const url = new URL(request.url);
  const filepath = decodeURIComponent(url.pathname);

  try {
    const file = await Deno.open("." + filepath, { read: true });
    //console.log(filepath);
    return new Response(file.readable);
  } catch {
    console.log(filepath, 404);
    return new Response("404 Not Found", { status: 404 });
  }
}

const options = { port: 8080 };
Deno.serve(options, handler);
