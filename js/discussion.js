document.addEventListener("DOMContentLoaded", async () => {
    let token = localStorage.getItem("token");
    axios.defaults.baseURL = "https://nt-devconnector.onrender.com";

    let postId = localStorage.getItem("postId");

    (async function getComment() {
        let { data } = await axios.get(`/api/posts/comment/${postId}`, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": `${token}`,
            },
        });

        console.log(data);
    })();
});
