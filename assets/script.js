const videoInfo = document.querySelector(".videoInfo");
const dropdownContent = document.querySelector(".dropdown-content");

var inputValue = localStorage.getItem("inputValue");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c37bbbe770msh4cfd6c234f0894bp1ac6d5jsnc54cc908bea9",
    "X-RapidAPI-Host": "youtube-video-download-info.p.rapidapi.com",
  },
};

const regex = /^https:\/\/youtu\.be\/([\w-]+)/;
let videoId;

inputValue.split("/")[2] === "youtu.be"
  ? (videoId = inputValue.match(regex)[1])
  : (videoId = inputValue.match(/v=([^&]+)/)[1]);

fetch(
  `https://youtube-video-download-info.p.rapidapi.com/dl?id=${videoId}`,
  options
)
  .then((response) => response.json())
  .then((response) => {
    videoInfo.insertAdjacentHTML(
      "afterbegin",
      `<iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/${videoId}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>`
    );

    for (const key in response.link) {
      let word = response.link[key][4].split(" ");
      const mp4 = word[0];
      const vdoType = mp4.slice(0, -1);

      if (response.link[key][3] === "OK") {
        return;
      }

      if (response.link[key][2] === "adaptive") {
        dropdownContent.insertAdjacentHTML(
          "beforeend",
          `<a href="${response.link[key][0]}">${response.link[key][3]} ${vdoType} <i style="color: red" class="fa-solid fa-volume-xmark"></i></a>`
        );
      }

      dropdownContent.insertAdjacentHTML(
        "beforeend",
        `<a href="${response.link[key][0]}">${response.link[key][3]} ${vdoType}</a>`
      );
    }
  })
  .catch((err) => console.error(err));
