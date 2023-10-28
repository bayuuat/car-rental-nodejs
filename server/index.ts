import http, { IncomingMessage, ServerResponse, get } from "http";
import fs from "fs";
import path from "path";

const { PORT = 3000 } = process.env;

function serveHtml(res: http.ServerResponse, filename: string) {
  const home = fs.readFileSync(
    path.join(__dirname, "..", "public", `${filename}.html`),
    { encoding: "utf8" },
  );

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(home);
}

const contentTypeDefault: Record<string, string> = {
  ".css": "text/css",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpg",
  ".png": "image/png",
  ".js": "text/javascript",
};

function getURL(req: http.IncomingMessage) {
  const url = new URL(`http://127.0.0.1:2000${req.url}`);
  return url;
}

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const publicFolder = ["css", "images", "scripts"];
    const isAccessingPublicFolder = publicFolder.some((folder) =>
      req.url!.includes(folder),
    );

    if (isAccessingPublicFolder) {
      const extName = path.extname(req.url!);
      const fileText = fs.readFileSync(
        path.join(__dirname, "..", "public", req.url!),
      );

      res.writeHead(200, { "Content-Type": contentTypeDefault[extName] });
      res.end(fileText);
      return;
    }

    const url = getURL(req);

    switch (url.pathname) {
      case "/":
        serveHtml(res, "index");
        break;
      case "/cari":
        serveHtml(res, "cari");
        break;
      case "/base":
        serveHtml(res, "load.index");
        break;
      default:
        serveHtml(res, "404");
    }
  },
);

// Start the server
server.listen(Number(PORT), () => {
  console.log(`Server is running, please visit http://127.0.0.1:${PORT}`);
});
