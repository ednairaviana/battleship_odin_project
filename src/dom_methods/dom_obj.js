const domObj = {
  plOne: null,
  plTwo: null,
  isCurrentTurn: true,
  board: {
    first: document.querySelector("#first"),
    second: document.querySelector("#second"),
  },

  positionBtn: {
    vertical: document.querySelector(".vert-btn"),
    horizontal: document.querySelector(".hori-btn"),
  },
};

export { domObj };
