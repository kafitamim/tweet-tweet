//selecting all elements

const formElm = document.querySelector("form");
const tweetTextContentInput = document.querySelector(".tweet-name");
const countStartText = document.querySelector(".count-start-text");
const addTweetElm = document.querySelector(".add-tweet");
const addListItem = document.querySelector(".list-group");
const filterTweetElm = document.querySelector("#search-tweet");

//temporary variables
let tweetsTempoStore = [];
// showfilterArr(tweetsTempoStore);

// ALL EVENT LISTENER ADD HERE!

// add eventListener to the form element

formElm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const tweetTextResult = addTweetInputResult(tweetTextContentInput);
  const isError = validateTweetTextLength(tweetTextResult);
  if (isError) {
    alert("Pleas complete your tweet within 250 words!");
    return;
  }
  // add temporary variable
  const time = dateFns.format(new Date(), "ddd-MMM h:mma");
  const id = tweetsTempoStore.length;
  const tweetNo = id + 1;
  const tweetsTempo = {
    id,
    tweetNo,
    tweetName: tweetTextResult,
    dateAndTime: time,
  };
  tweetsTempoStore.push(tweetsTempo);
  // showfilterArr(tweetsTempoStore);
  addTweetToUI(id, tweetNo, tweetTextResult, time);
  // add tweet to local storage
  addTweetToLocalStore(tweetsTempo);
  // add to search filter base on id.
});

// counter -------
tweetTextContentInput.addEventListener("input", (evt) => {
  let textCounter = tweetTextContentInput.value.length;
  countStartText.textContent = textCounter;
});

// addEventlistener into listItems.

addListItem.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("delete-tweet")) {
    const id = getTweetId(evt.target);
    // remove tweet from UI
    removeTweetFromUI(id);
    // update temporary store
    removeFromTempoStore(id);
    //remove from local storage
    removeTweetsFromStorage(id);
  }
});

filterTweetElm.addEventListener("keyup", (evt) => {
  const filteredValue = evt.target.value;
  const filteredTweetArr = tweetsTempoStore.filter((filtered) => {
    return filtered.tweetName.includes(filteredValue);
  });
  showfilterArr(filteredTweetArr);
});

//ALL FUNCTIONS WHICH CAN BE REUSED!

function addTweetInputResult(tweetTextContentInput) {
  let tweetText = tweetTextContentInput.value;
  return tweetText;
}

function validateTweetTextLength(textValidCheck) {
  let isError = false;
  if (textValidCheck.length > 250 || textValidCheck.length < 1) {
    isError = true;
    return isError;
  } else {
    isError = false;
    return isError;
  }
}

function clearTweetInputValue() {
  tweetTextContentInput.value = "";
}

function addTweetToUI(id, tweetNo, tweet, time) {
  const htmlElm = `
  <li class="list-group-item tweet-${id} collection-item">
  <strong> <span class="tweet-number">  ${tweetNo}.</span>
  </strong> <strong> ${tweet} </strong>
  <i class="fa fa-trash float-right delete-tweet"></i>
  <i class="fas fa-clock float-right">
    <span class="tweet-date"> ${time} </span>
  </i>
    </li>`;
  addListItem.insertAdjacentHTML("beforeend", htmlElm);
  clearTweetInputValue();
  countStartText.textContent = 0;
}

function addTweetToLocalStore(tweetsTempo) {
  let tweetsTempoStore;
  if (localStorage.getItem("localStoreTweetKey")) {
    tweetsTempoStore = JSON.parse(localStorage.getItem("localStoreTweetKey"));
    tweetsTempoStore.push(tweetsTempo);
    localStorage.setItem(
      "localStoreTweetKey",
      JSON.stringify(tweetsTempoStore)
    );
  } else {
    tweetsTempoStore = [];
    tweetsTempoStore.push(tweetsTempo);
    localStorage.setItem(
      "localStoreTweetKey",
      JSON.stringify(tweetsTempoStore)
    );
  }
}

function getTweetId(targetTweet) {
  const targetElm = targetTweet.parentElement;
  return Number(targetElm.classList[1].split("-")[1]);
}

function removeTweetFromUI(id) {
  document.querySelector(`.tweet-${id}`).remove();
}

function updateAfterRemove(tweetsTempoStore, id) {
  return tweetsTempoStore.filter((elem) => elem.id !== id);
}

function removeFromTempoStore(id) {
  const newTweetTempoStore = updateAfterRemove(tweetsTempoStore, id);
  console.log(newTweetTempoStore);
  tweetsTempoStore = newTweetTempoStore;
}

function showfilterArr(filtArr) {
  addListItem.innerHTML = "";
  filtArr.forEach((elem) => {
    const htmlElm = `
  <li class="list-group-item tweet-${elem.id} collection-item">
  <strong> <span class="tweet-number">  ${elem.tweetNo}.</span>
  </strong> <strong> ${elem.tweetName} </strong>
  <i class="fa fa-trash float-right delete-tweet"></i>
  <i class="fas fa-clock float-right">
    <span class="tweet-date"> ${elem.dateAndTime} </span>
  </i>
    </li>`;
    addListItem.insertAdjacentHTML("beforeend", htmlElm);
  });
}

function removeTweetsFromStorage(id) {
  const tweetsTempoStore = JSON.parse(
    localStorage.getItem("localStoreTweetKey")
  );
  const getTweetsAfterRemove = updateAfterRemove(tweetsTempoStore, id);
  localStorage.setItem(
    "localStoreTweetKey",
    JSON.stringify(getTweetsAfterRemove)
  );
  // update id number
}

document.addEventListener("DOMContentLoaded", (evt) => {
  if (localStorage.getItem("localStoreTweetKey")) {
    localTweet = JSON.parse(localStorage.getItem("localStoreTweetKey"));
    showfilterArr(localTweet);
  }
});
