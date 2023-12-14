document.addEventListener("DOMContentLoaded", async () => {
    // axios.defaults.baseURL = "https://nt-devconnector.onrender.com";

    let token = localStorage.getItem("token");
    if (!token) {
        window.location.replace("/pages/login.html");
    }
});
