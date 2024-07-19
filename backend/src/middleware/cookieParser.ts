// This function is used for parsing cookies comming from socket requests
export default function parseCookies(cookieHeader: string | undefined): Record<string, string> {
    const cookies: Record<string, string> = {};
    if (cookieHeader) {
        cookieHeader.split(';').forEach(cookie => {
            const [name, value] = cookie.split('=');
            cookies[name.trim()] = value?.trim();
        });
    }
    return cookies;
}