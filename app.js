//selecting all elements

const formElm = document.querySelector("form");
const tweetTextContentInput = document.querySelector(".tweet-name");
const countStartText = document.querySelector(".count-start-text");
const addTweetElm = document.querySelector(".add-tweet");
const addListItem = document.querySelector(".list-group");

//temporary variables
let tweetsTempoStore = [];
let characterCount = 0;
let inputCountMatch = 1;

// yyyy - MM - dd;
// console.log(time);
// console.log(date);

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
    id: id,
    tweetNo: tweetNo,
    tweetName: tweetTextResult,
    dateAndTime: time,
  };

  tweetsTempoStore.push(tweetsTempo);
  // add tweet to UI
  addTweetToUI(id, tweetNo, tweetTextResult, time);
  // add tweet to local storage
  addTweetToLocalStore(tweetsTempo);
  // add to search filter base on id.
});

// add key-down event listener -------
tweetTextContentInput.addEventListener("keyup", (evt) => {
  const value = tweetTextContentInput.value.length;

  if (value > 0) {
    inputCountMatch = value + 1;
    characterCount++;
    countStartText.textContent = characterCount;
    // console.log(characterCount);
    // console.log(inputCountMatch);
    // console.log(tweetTextContentInput.value.length);
    // }
    // else {
    //   characterCount--;
    //   inputCountMatch--;
    //   countStartText.textContent = characterCount;
    //   // console.log(characterCount);
    //   // console.log(inputCountMatch);
    //   if (characterCount === 0) {
    //     return;
  }
});

// addEventlistener into listItems.

addListItem.addEventListener("click", (evt) => {
  console.log(evt.target);
  if (evt.target.classList.contains("delete-tweet")) {
    const id = getTweetId(evt.target);
    console.log(id);
    // remove tweet from UI
    removeTweetFromUI(id);
    // update temporary store
    removeFromTempoStore(id);
    console.log(id);
  }
});

//ALL FUNCTIONS WHICH CAN BE REUSED!

function addTweetInputResult(tweetTextContentInput) {
  const tweetText = tweetTextContentInput.value;
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
  // &nbsp;
  addListItem.insertAdjacentHTML("beforeend", htmlElm);
  clearTweetInputValue();
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

function UpdateAfterRemove(tweetsTempoStore, id) {
  return tweetsTempoStore.filter((elem) => elem.id !== id);
}

function removeFromTempoStore(id) {
  const newTweetTempoStore = UpdateAfterRemove(tweetsTempoStore, id);
  tweetsTempoStore = newTweetTempoStore;
}
