function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString(); // Calculate expiration date
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

export {getCookie, setCookie};