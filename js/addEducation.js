document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com";

    let token = localStorage.getItem("token");
    if (!token) {
        window.location.replace("/pages/login.html");
    }

    let addEducationForm = document.querySelector("form");

    let currentEdu = document.querySelector(".currentEdu");
    let toDate = document.querySelector(".toDate");

    currentEdu.addEventListener("change", (e) => {
        e.preventDefault();
        toDate.toggleAttribute("disabled");
    });

    addEducationForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let school = addEducationForm[0].value;
        let degree = addEducationForm[1].value;
        let fieldofstudy = addEducationForm[2].value;
        let from = addEducationForm[3].value;
        let to = addEducationForm[5].value;
        let description = addEducationForm[6].value;

        await axios.put(
            "/api/profile/education",
            {
                school: school,
                degree: degree,
                fieldofstudy: fieldofstudy,
                from: from,
                to: to,
                description: description,
            },
            {
                headers: {
                    "x-auth-token": `${token}`,
                },
            }
        );
        setTimeout(() => {
            window.location.replace("/pages/dashboard.html");
        }, 2_000);
    });
});
