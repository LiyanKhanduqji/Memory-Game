document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What Is Your Name?");

  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
    document.getElementById("start").play();
  } else {
    document.querySelector(".name span").innerHTML = yourName;
    document.getElementById("start").play();
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

// let orderRnge = [...Array(blocks.length).keys()];
let orderRnge = Array.from(Array(blocks.length).keys()); // Another way

// console.log(orderRnge);
shuffle(orderRnge);
// console.log(orderRnge);

blocks.forEach((block, index) => {
  block.style.order = orderRnge[index];

  // Add click event
  block.addEventListener("click", function () {
    // trigger the flip block
    flipBlock(block);
  });
});
// Flip block function
function flipBlock(selectedBlock) {
  // Add class is-flipped
  selectedBlock.classList.add("is-flipped");

  // Collect all flipped cards
  let allFlippedBlocks = blocks.filter((flipBlock) =>
    flipBlock.classList.contains("is-flipped")
  );

  // If two blocks are selected
  if (allFlippedBlocks.length == 2) {
    stopClicking();
    // Check matched block function
    checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
// Shuffle function
function shuffle(array) {
  // Setting Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);
    // Decrease length by one
    current--;

    // [1] Save current element in stash
    temp = array[current];

    // [2] current element = random element
    array[current] = array[random];

    // [3] Random element = get element from stash
    array[random] = temp;
  }
  return array;
}

function stopClicking() {
  // Add Class no clicking on main container
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMatchedBlock(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("is-matched");
    secondBlock.classList.add("is-matched");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    document.getElementById("fail").play();
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}
