
function createBlog(blog) {
    let allBlogs = document.getElementById('blogs');
    let div = document.createElement('div');
    div.setAttribute('class', 'blog');
    div.innerHTML = `   
                <img class="pic" src="../../images/${blog.articleImage}">
                <div class="bcontent">
                    <div class="date">
                        <img src="../../images/calendar-icon.png" /> ${blog.articleDate}
                    </div>
                    <p> ${blog.articleName} </p>
                    <button onclick="popupToggle(${blog.articleId})"> Read more </button>
                </div>
    `
    allBlogs.appendChild(div);
    createBlogPopUp(blog);
}

function popupToggle(articleId) {
    document.getElementById(articleId.toString()).classList.toggle("active")
}

function createBlogPopUp(blog) {
    let allBlogPopUps = document.getElementById("popups");
    let div = document.createElement('div');
    div.setAttribute('class', 'popup');
    div.setAttribute('id', blog.articleId);

    div.innerHTML = `
    <div class="overlay"></div>
    <div class="popup-content">
        <button onclick="popupToggle(${blog.articleId})"> <img src="../../images/close.png" width="20px"> </button>
        <img class="pic" src="../../images/${blog.articleImage}">
        <div class="date">
            <img src="../../images/calendar-icon.png" /> ${blog.articleDate}
        </div>
        <h1> ${blog.articleHeader}</h1>
        <p> ${blog.articleParagraph} </p>
    </div>
    `
    allBlogPopUps.appendChild(div);

}