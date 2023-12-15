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

        data.forEach((developer) => {
            let devId = localStorage.getItem("devId");
            let myCurrentId = localStorage.getItem("myCurrentId");
            if (developer.user._id == devId) {
                if (developer.user._id == myCurrentId) {
                    let editButton = document.querySelector(".editProfile");
                    editButton.classList.remove("hidden");
                }

                let profile = document.querySelector(".profile");

                let mainInfoCard = document.createElement("div");
                mainInfoCard.classList.add("mainInfoCard");

                let img = document.createElement("img");
                img.setAttribute("src", `${developer.user.avatar}`);
                mainInfoCard.append(img);

                let devName = document.createElement("h2");
                devName.textContent = `${developer.user.name}`;
                mainInfoCard.append(devName);

                let devJob = document.createElement("h4");
                devJob.textContent = `${developer.status} at ${developer.company}`;
                mainInfoCard.append(devJob);

                let devLocation = document.createElement("p");
                devLocation.textContent = `${developer.location}`;
                mainInfoCard.append(devLocation);

                let socialIcons = document.createElement("ul");

                if (developer.social.facebook !== null) {
                    let social = document.createElement("li");
                    let link = document.createElement("a");
                    link.setAttribute("href", `${developer.social.facebook}`);
                    let icon = document.createElement("i");
                    icon.classList.add("fa-brands", "fa-square-facebook");
                    link.append(icon);
                    social.append(link);
                    socialIcons.append(social);
                }

                if (developer.social.instagram !== null) {
                    let social = document.createElement("li");
                    let link = document.createElement("a");
                    link.setAttribute("href", `${developer.social.instagram}`);
                    let icon = document.createElement("i");
                    icon.classList.add("fa-brands", "fa-instagram");
                    link.append(icon);
                    social.append(link);
                    socialIcons.append(social);
                }

                if (developer.social.twitter !== null) {
                    let social = document.createElement("li");
                    let link = document.createElement("a");
                    link.setAttribute("href", `${developer.social.twitter}`);
                    let icon = document.createElement("i");
                    icon.classList.add("fa-brands", "fa-twitter");
                    link.append(icon);
                    social.append(link);
                    socialIcons.append(social);
                }

                if (developer.social.youtube !== null) {
                    let social = document.createElement("li");
                    let link = document.createElement("a");
                    link.setAttribute("href", `${developer.social.youtube}`);
                    let icon = document.createElement("i");
                    icon.classList.add("fa-brands", "fa-youtube");
                    link.append(icon);
                    social.append(link);
                    socialIcons.append(social);
                }

                if (developer.social.linkedin !== null) {
                    let social = document.createElement("li");
                    let link = document.createElement("a");
                    link.setAttribute("href", `${developer.social.linkedin}`);
                    let icon = document.createElement("i");
                    icon.classList.add("fa-brands", "fa-linkedin");
                    link.append(icon);
                    social.append(link);
                    socialIcons.append(social);
                }

                mainInfoCard.append(socialIcons);
                profile.append(mainInfoCard);

                let devBio = document.createElement("div");
                devBio.classList.add("devBio", "devAbility");

                let devBioName = document.createElement("h5");
                devBioName.textContent = `${developer.user.name}s Bio`;
                devBio.append(devBioName);

                let currentBio = document.createElement("p");
                currentBio.textContent = `${developer.bio}` || "Not provided";
                devBio.append(currentBio);

                profile.append(devBio);

                let devSkillsAll = document.createElement("div");
                devSkillsAll.classList.add("devSkillSet", "devAbility");

                let skillSet = document.createElement("h5");
                skillSet.textContent = "Skill Set";
                devSkillsAll.append(skillSet);

                let skillsAll = document.createElement("ul");

                developer.skills.forEach((skill) => {
                    let currentSkill = document.createElement("li");
                    currentSkill.textContent = skill;
                    skillsAll.append(currentSkill);
                });

                devSkillsAll.append(skillsAll);
                profile.append(devSkillsAll);

                let expEdu = document.createElement("div");
                expEdu.classList.add("exp-edu");

                let devExp = document.createElement("div");
                devExp.classList.add("devExp");

                developer.experience.forEach((expElem) => {
                    let devStatus = document.createElement("div");
                    devStatus.classList.add("devStatus");

                    let title = document.createElement("h2");
                    title.textContent = "Experience";
                    devStatus.append(title);

                    let devCompany = document.createElement("span");
                    devCompany.textContent = `${expElem.company}`;
                    devCompany.classList.add("bold");
                    devStatus.append(devCompany);

                    let expTime = document.createElement("p");
                    expTime.textContent = `${expElem.from
                        .toString()
                        .slice(0, 10)} - ${expElem.to.toString().slice(0, 10)}`;
                    devStatus.append(expTime);

                    let position = document.createElement("p");
                    let positionTitle = document.createElement("span");
                    positionTitle.textContent = "Position: ";

                    let positionName = document.createElement("span");
                    positionName.textContent = `${expElem.title}`;

                    position.append(positionTitle);
                    position.append(positionName);
                    devStatus.append(position);

                    let location = document.createElement("p");
                    let locationTitle = document.createElement("span");
                    locationTitle.textContent = "Location: ";

                    let locationsName = document.createElement("span");
                    locationsName.textContent = `${expElem.location}`;

                    location.append(locationTitle);
                    location.append(locationsName);
                    devStatus.append(location);

                    devExp.append(devStatus);

                    let expDescription = document.createElement("p");
                    let descriptionTitle = document.createElement("span");
                    descriptionTitle.textContent = "Description: ";

                    let descriptionName = document.createElement("span");
                    descriptionName.textContent = `${expElem.description}`;

                    expDescription.append(descriptionTitle);
                    expDescription.append(descriptionName);
                    devStatus.append(expDescription);

                    devExp.append(devStatus);
                });

                let devEdu = document.createElement("div");
                devEdu.classList.add("devEdu");

                developer.education.forEach((eduElem) => {
                    let devStatus = document.createElement("div");
                    devStatus.classList.add("devStatus");

                    let title = document.createElement("h2");
                    title.textContent = "Education";
                    devStatus.append(title);

                    let eduSchool = document.createElement("span");
                    eduSchool.textContent = `${eduElem.school}`;
                    eduSchool.classList.add("bold");
                    devStatus.append(eduSchool);

                    if (!eduElem.to) {
                        let eduTime = document.createElement("p");
                        eduTime.textContent = `${eduElem.from
                            .toString()
                            .slice(0, 10)} - Now`;
                        devStatus.append(eduTime);
                    }

                    let degree = document.createElement("p");
                    let degreeTitle = document.createElement("span");
                    degreeTitle.textContent = "Degree: ";

                    let degreeName = document.createElement("span");
                    degreeName.textContent = `${eduElem.degree}`;

                    degree.append(degreeTitle);
                    degree.append(degreeName);
                    devStatus.append(degree);

                    let fieldOfStudy = document.createElement("p");
                    let fieldOfStudyTitle = document.createElement("span");
                    fieldOfStudyTitle.textContent = " Field Of Study: ";

                    let locationsName = document.createElement("span");
                    locationsName.textContent = `${eduElem.fieldofstudy}`;

                    fieldOfStudy.append(fieldOfStudyTitle);
                    fieldOfStudy.append(locationsName);
                    devStatus.append(fieldOfStudy);

                    devEdu.append(devStatus);

                    let eduDescription = document.createElement("p");
                    let descriptionTitle = document.createElement("span");
                    descriptionTitle.textContent = "Description: ";

                    let descriptionName = document.createElement("span");
                    descriptionName.textContent = `${eduElem.description}`;

                    eduDescription.append(descriptionTitle);
                    eduDescription.append(descriptionName);
                    devStatus.append(eduDescription);

                    devEdu.append(devStatus);
                });

                expEdu.append(devExp);
                expEdu.append(devEdu);

                profile.append(expEdu);

                let githubUsername = developer.githubusername;
                // console.log(githubUsername);

                (async function getProfile() {
                    let { data: github } = await axios.get(
                        `/api/profile/github/${githubUsername}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "x-auth-token": `${token}`,
                            },
                        }
                    );

                    let profile = document.querySelector(".profile");

                    github.forEach((elem) => {
                        console.log(elem);

                        let githubRepos = document.createElement("div");
                        githubRepos.classList.add("githubRepos");

                        let title = document.createElement("h2");
                        title.textContent = "Github Repos";
                        githubRepos.append(title);

                        let repoCard = document.createElement("div");
                        repoCard.classList.add("repoCard");

                        let repoName = document.createElement("a");
                        repoName.textContent = `${elem.name}`;
                        repoName.setAttribute("href", `${elem.html_url}`);
                        repoCard.append(repoName);

                        let repoStatus = document.createElement("div");
                        repoStatus.classList.add("repoStatus");

                        let stars = document.createElement("span");
                        stars.textContent = `Stars: ${elem.stargazers_count}`;
                        repoStatus.append(stars);

                        let watchers = document.createElement("span");
                        watchers.textContent = `Watchers: ${elem.watchers_count}`;
                        repoStatus.append(watchers);

                        let forks = document.createElement("span");
                        forks.textContent = `Forks: ${elem.forks_count}`;
                        repoStatus.append(forks);

                        repoCard.append(repoStatus);
                        githubRepos.append(repoCard);
                        profile.append(githubRepos);
                    });
                })();
            }
        });
    })();
});
