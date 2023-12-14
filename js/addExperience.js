document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com";

    let token = localStorage.getItem("token");
    if (!token) {
        window.location.replace("/pages/login.html");
    }

    let addExperienceForm = document.querySelector("form");

    let currentJob = document.querySelector(".currentJob");
    let toDate = document.querySelector(".toDate");

    currentJob.addEventListener("change", (e) => {
        e.preventDefault();
        toDate.toggleAttribute("disabled");
    });

    addExperienceForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let title = addExperienceForm[0].value;
        let company = addExperienceForm[1].value;
        let location = addExperienceForm[2].value;
        let from = addExperienceForm[3].value;
        let to = addExperienceForm[5].value;
        let description = addExperienceForm[6].value;

        await axios.put(
            "/api/profile/experience",
            {
                title: title,
                company: company,
                location: location,
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
