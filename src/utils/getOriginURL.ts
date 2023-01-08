export default function getOriginURL(url: string) {
    return url
        .slice(0, url.includes("#") ? url.indexOf("#") : url.length)
        .replace(/\/$/, "")
}
