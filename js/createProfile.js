let addSocial = document.querySelector(".addSocial");
let allSocials = document.querySelector(".all-socials");

addSocial.addEventListener("click", function () {
    allSocials.classList.toggle("hidden");
});

let token = localStorage.getItem("token");
if (!token) {
    window.location.replace("/pages/login.html");
}

document.addEventListener("DOMContentLoaded", async () => {
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com";

    let createProfileForm = document.querySelector("form");
    let token = localStorage.getItem("token");

    createProfileForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let status = createProfileForm[0].value;
        let company = createProfileForm[1].value;
        let website = createProfileForm[2].value;
        let location = createProfileForm[3].value;
        let skills = createProfileForm[4].value;
        let githubUsername = createProfileForm[5].value;
        let bioYourself = createProfileForm[6].value;
        let twitter = createProfileForm[7].value;
        let facebook = createProfileForm[8].value;
        let youtube = createProfileForm[9].value;
        let linkedin = createProfileForm[10].value;
        let instagram = createProfileForm[11].value;

        await axios.post(
            "/api/profile",
            {
                status: status,
                company: company,
                website: website,
                location: location,
                skills: skills,
                githubusername: githubUsername,
                bio: bioYourself,
                twitter: twitter,
                facebook: facebook,
                youtube: youtube,
                linkedin: linkedin,
                insagram: instagram,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": `${token}`,
                },
            }
        );

        setTimeout(() => {
            window.location.replace("/pages/dashboard.html");
        }, 2_000);
    });
});
