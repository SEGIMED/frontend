import Cookies from "js-cookie";
const a = Cookies.get('a');
const b = Cookies.get('b');
const c = Cookies.get('c');
const headers = {
    'token': a,
    'Content-Type': 'application/json'
}
const config = { headers, b, c, a };
export default config;