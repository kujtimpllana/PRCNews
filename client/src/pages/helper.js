export const setColor = (cat) => {
  const colors = {
    politics: "slategray",
    sport: "green",
    fashion: "navy",
    technology: "teal",
    auto: "maroon",
    fun: "chocolate",
  };

  let color = colors[cat] || "";

  return color;
};

export const loadMoreBtnStyle = (postsLength, totalNumOfPosts) => {
  return postsLength === totalNumOfPosts ? "none" : "block";
};

export const getText = (html) => {
  const document = new DOMParser().parseFromString(html, "text/html");
  return document.body.textContent;
};
