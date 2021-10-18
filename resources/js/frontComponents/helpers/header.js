import { encryptLocalStorage, decryptLocalStorage } from '../helpers/hash';

export const header = {
    headers: {
        "Accept-Language": !localStorage.getItem("lang") ? "en" : localStorage.getItem("lang"),
    }
}

export const header_auth = {
    headers: {
        "Accept-Language": !localStorage.getItem("lang") ? "en" : localStorage.getItem("lang"),
        "Authorization": !decryptLocalStorage("user") ? null : "Bearer " + decryptLocalStorage("user").access_token,
        "Accept": "application/json"
    }
}


export const csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');