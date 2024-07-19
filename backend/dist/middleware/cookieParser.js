export default function parseCookies(cookieHeader) {
    const cookies = {};
    if (cookieHeader) {
        cookieHeader.split(';').forEach(cookie => {
            const [name, value] = cookie.split('=');
            cookies[name.trim()] = value?.trim();
        });
    }
    return cookies;
}
