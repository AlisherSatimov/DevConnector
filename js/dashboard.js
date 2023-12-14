document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com";

    let token = localStorage.getItem("token");
    if (!token) {
        window.location.replace("/pages/login.html");
    }

    let createProfile = document.querySelector(".createProfile");
    let currentProfile = document.querySelector(".currentProfile");
    let welcomeUser = document.querySelector(".welcome");
    let experienceBody = document.querySelector(".experienceBody");
    let educationBody = document.querySelector(".educationBody");
    let deleteAccount = document.querySelector(".deleteAccount");

    // let token = localStorage.getItem("token");

    let deleteExperience = async (exp) => {
        await axios.delete(`/api/profile/experience/${exp._id}`, {
            headers: {
                "x-auth-token": `${token}`,
            },
        });
        experienceBody.innerHTML = "";
        educationBody.innerHTML = "";

        getProfile();
    };

    let deleteEducation = async (edu) => {
        await axios.delete(`/api/profile/education/${edu._id}`, {
            headers: {
                "x-auth-token": `${token}`,
            },
        });
        educationBody.innerHTML = "";
        experienceBody.innerHTML = "";

        getProfile();
    };

    async function getProfile() {
        let { data } = await axios.get(`/api/profile/me`, {
            headers: {
                "x-auth-token": `${token}`,
            },
        });
        if (data) {
            createProfile.classList.add("hidden");
            currentProfile.classList.remove("hidden");

            let userIcon = document.createElement("i");
            userIcon.classList.add("fa-solid", "fa-user");

            welcomeUser.textContent = "";
            welcomeUser.append(userIcon);
            welcomeUser.append(` Welcome ${data.user.name}`);
        }
        if (data.experience.length > 0) {
            data.experience.forEach((exp) => {
                let experience = document.createElement("tr");

                let company = document.createElement("td");
                company.textContent = exp.company;
                experience.append(company);

                let title = document.createElement("td");
                title.textContent = exp.title;
                experience.append(title);

                let from = exp.from.toString().slice(0, 10);
                let to = "Now";
                if (exp.to) {
                    to = exp.to.toString().slice(0, 10);
                }
                workTime = document.createElement("td");
                workTime.textContent = from + " - " + to;
                experience.append(workTime);

                let deleteBtn = document.createElement("td");
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener("click", () =>
                    deleteExperience(exp)
                );
                experience.append(deleteBtn);

                experienceBody.append(experience);
            });
        }

        if (data.education.length > 0) {
            data.education.forEach((edu) => {
                let education = document.createElement("tr");

                let school = document.createElement("td");
                school.textContent = edu.school;
                education.append(school);

                let degree = document.createElement("td");
                degree.textContent = edu.degree;
                education.append(degree);

                let from = edu.from.toString().slice(0, 10);
                let to = "Now";
                if (edu.to) {
                    to = edu.to.toString().slice(0, 10);
                }
                eduTime = document.createElement("td");
                eduTime.textContent = from + " - " + to;
                education.append(eduTime);

                let deleteBtn = document.createElement("td");
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener("click", () => deleteEducation(edu));
                education.append(deleteBtn);

                educationBody.append(education);
            });
        }
    }
    getProfile();

    deleteAccount.addEventListener("click", async () => {
        let areYouSure = confirm("Are you sure? This can NOT be undone!");
        if (areYouSure) {
            await axios.delete("/api/profile", {
                headers: {
                    "x-auth-token": `${token}`,
                },
            });
            localStorage.removeItem("token");
            window.location.replace("/pages/login.html");
        }
    });
});
