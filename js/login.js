document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

    let formSignIn = document.querySelector("form");

    formSignIn.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            let email = formSignIn[0].value;
            let password = formSignIn[1].value;

            let { data: user } = await axios.post("/auth", {
                email: email,
                password: password,
            });

            localStorage.setItem("token", user.token);

            setTimeout(() => {
                window.location.replace("/pages/dashboard.html");
            }, 2000);
        } catch (error) {
            alert("Incorrect email or password");
        }
    });
});
