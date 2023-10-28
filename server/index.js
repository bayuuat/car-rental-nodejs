"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const { PORT = 2000 } = process.env;
function serveHtml(res, filename) {
    const home = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "public", `${filename}.html`), { encoding: "utf8" });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(home);
}
const contentTypeDefault = {
    ".css": "text/css",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpg",
    ".png": "image/png",
    ".js": "text/javascript",
};
function getURL(req) {
    const url = new URL(`http://127.0.0.1:2000${req.url}`);
    return url;
}
const server = http_1.default.createServer((req, res) => {
    const publicFolder = ["css", "images", "scripts"];
    const isAccessingPublicFolder = publicFolder.some((folder) => req.url.includes(folder));
    if (isAccessingPublicFolder) {
        const extName = path_1.default.extname(req.url);
        const fileText = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "public", req.url));
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
});
// Start the server
server.listen(Number(PORT), () => {
    console.log(`Server is running, please visit http://127.0.0.1:${PORT}`);
});
