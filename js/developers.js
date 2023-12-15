document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com";

    let token = localStorage.getItem("token");
    if (!token) {
        window.location.replace("/pages/login.html");
    }

    (async function getProfile() {
        let { data } = await axios.get("/api/profile", {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": `${token}`,
            },
        });

        let developersInfo = document.querySelector(".developers");

        data.forEach((developer) => {
            let devInfo = document.createElement("div");
            devInfo.classList.add("developer-info");

            let img = document.createElement("img");
            img.setAttribute("src", `${developer.user.avatar}`);
            devInfo.append(img);

            let currentInfo = document.createElement("div");
            currentInfo.classList.add("current-info");

            let devName = document.createElement("p");
            devName.classList.add("name");
            devName.textContent = developer.user.name;
            currentInfo.append(devName);

            let devCompany = document.createElement("p");
            devCompany.classList.add("position");
            devCompany.textContent = developer.company;
            currentInfo.append(devCompany);

            let devLocation = document.createElement("p");
            devLocation.classList.add("position");
            devLocation.textContent = developer.location;
            currentInfo.append(devLocation);

            let viewProfile = document.createElement("button");
            viewProfile.setAttribute("type", "submit");
            viewProfile.textContent = "View Profile";
            viewProfile.addEventListener("click", () => {
                localStorage.setItem("devId", `${developer.user._id}`);
                window.location.replace("/pages/profile.html");
            });
            currentInfo.append(viewProfile);

            devInfo.append(currentInfo);

            let devSkills = document.createElement("div");
            devSkills.classList.add("skills");

            let ul = document.createElement("ul");

            developer.skills.forEach((skill) => {
                let li = document.createElement("li");
                li.textContent = skill;
                ul.append(li);
            });

            devSkills.append(ul);
            devInfo.append(devSkills);

            developersInfo.append(devInfo);
        });
    })();
});
