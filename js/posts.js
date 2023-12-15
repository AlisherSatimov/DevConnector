document.addEventListener("DOMContentLoaded", async () => {
    let token = localStorage.getItem("token");
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com";

    let form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let post = form[0].value;

        let { data } = await axios.post(
            "/api/posts",
            {
                text: post,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": `${token}`,
                },
            }
        );
        window.location.replace("/pages/posts.html");
    });

    (async function getPost() {
        let { data } = await axios.get("/api/posts", {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": `${token}`,
            },
        });
        console.log(data[0]);
        let createPost = document.querySelector(".createPost");
        data.forEach((elem) => {
            let postBody = document.createElement("div");
            postBody.classList.add("postBody");

            let imgName = document.createElement("div");
            imgName.classList.add("imgName");

            let img = document.createElement("img");
            img.setAttribute("src", `${elem.avatar}`);
            imgName.append(img);

            let postMan = document.createElement("p");
            postMan.textContent = `${elem.name}`;
            imgName.append(postMan);

            postBody.append(postMan);

            let postLike = document.createElement("div");
            postLike.classList.add("post-like");

            let postValue = document.createElement("h4");
            postValue.textContent = `${elem.text}`;
            postLike.append(postValue);

            let postDate = document.createElement("p");
            postDate.textContent = `Posted on ${elem.date
                .toString()
                .slice(0, 10)}`;
            postLike.append(postDate);
            postBody.append(postLike);

            let likelike = document.createElement("div");
            likelike.classList.add("likelike");

            let like = document.createElement("i");
            like.classList.add("fa-solid", "fa-thumbs-up");
            likelike.append(like);

            let dislike = document.createElement("i");
            dislike.classList.add("fa-solid", "fa-thumbs-down");
            likelike.append(dislike);

            postBody.append(likelike);

            let discussion = document.createElement("button");
            discussion.textContent = "Discussion";
            discussion.addEventListener("click", () => {
                localStorage.setItem("postId", `${elem._id}`);
                window.location.replace("/pages/discussion.html");
            });

            postBody.append(discussion);
            createPost.append(postBody);
        });
    })();
});
