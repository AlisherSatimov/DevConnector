let addSocial = document.querySelector(".addSocial");
let allSocials = document.querySelector(".all-socials");

addSocial.addEventListener("click", function () {
    allSocials.classList.toggle("hidden");
});

let token = localStorage.getItem("token");

if (!token) {
    window.location.replace("/pages/login.html");
}

(async () => {
    let token = localStorage.getItem("token");
    let setValueForm = document.querySelector("form");

    axios.defaults.baseURL = "https://nt-devconnector.onrender.com";

    let { data } = await axios.get("/api/profile/me", {
        headers: {
            "x-auth-token": `${token}`,
        },
    });

    setValueForm[0].value = data.status;
    setValueForm[1].value = data?.company;
    setValueForm[2].value = data?.website;
    setValueForm[3].value = data?.location;
    setValueForm[4].value = data?.skills.toString();
    setValueForm[5].value = data?.githubusername;
    setValueForm[6].value = data?.bio;
    setValueForm[8].value = data?.social.twitter;
    setValueForm[9].value = data?.social.facebook;
    setValueForm[10].value = data?.social.youtube;
    setValueForm[11].value = data?.social.linkedin;
    setValueForm[12].value = data?.social.instagram;
})();

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
