const all_posts = document.querySelector("#all_posts"),
  create_post_container = document.querySelector("#create_post"),
  disp_switch = document.getElementById("Init"); // Switches display
disp_switch.addEventListener("click", ({ target }) => {
  let x = getComputedStyle(create_post_container).display;
  if (x == "none") {
    $(all_posts).slideUp(200);
    $(create_post_container).slideDown(200);
    target.innerText = "View all posts";
  } else if (x != "none") {
    $(all_posts).slideDown(200);
    $(create_post_container).slideUp(200);
    target.innerText = "Add a new Post";
  }
});

// Checking image
const file = document.getElementById("file");
file.addEventListener("change", (e) => {
  const File = e.target.files[0];
  image_reader(File, e.target);
});
function image_reader(file, element) {
  let reader = new FileReader();
  let data = reader.readAsDataURL(file);
  reader.addEventListener("load", (blo) => {
    let res = blo.target.result;
    let image = document.createElement("img");
    image.srcset = res;
    image.addEventListener("load", (e) => {
      let height = e.target.height,
        width = e.target.width;
      if (height > width) {
        alert("Image dimension too long, select a wider image");
        element.value = "";
      } else if (height <= 100) {
        alert("Image height is too small");
        element.value = "";
      }
    });
  });
}

// Delete handler
let post_list = document.querySelectorAll("#post");
post_list.forEach((post) => {
  post.children.delete_btn.children[0].addEventListener("click", () => {
    let _id = post.children[0].children.title.innerText;
    fetch(`/post/${_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status == 200) {
          post.remove(post);
        } else {
          location = "/admin";
        }
      })
      .catch((err) => {
        console.error(err);
      });
    post.remove(post);
  });
});
// logout
function logout() {
  fetch("/logout", { method: "DELETE" })
    .then((res) => {
      if (res.status == 200) {
        location = "/";
      } else {
        location = "/admin";
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
