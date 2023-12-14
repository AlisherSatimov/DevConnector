document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com";

    let formSignUp = document.querySelector("form");

    formSignUp.addEventListener("submit", async (e) => {
        e.preventDefault();

        let userName = formSignUp[0].value;
        let userEmail = formSignUp[1].value;
        let userPassword = formSignUp[2].value;
        let confirmPassword = formSignUp[3].value;

        if (userPassword == confirmPassword) {
            let { data: user } = await axios.post("/api/users", {
                name: userName,
                email: userEmail,
                password: userPassword,
            });
            localStorage.setItem("token", user.token);
            console.log(user);
            setTimeout(() => {
                window.location.replace("/pages/dashboard.html");
            }, 2_000);
        } else {
            alert("Enter the same password in both fields");
        }
    });
});
