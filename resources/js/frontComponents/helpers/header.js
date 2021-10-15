export const header = {
    headers: {
        "Accept-Language": !localStorage.getItem("lang") ? "en" : localStorage.getItem("lang"),
    }
}


export const csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');