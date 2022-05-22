let flashcards = [
  {
    question: "How many states are in the USA",
    answer: "50 States",
  },
  {
    question: "How many lakes are in Minnesota",
    answer: "About 10,000 lakes",
  },
];
const flashCard = document.querySelector(".flashcard");
const question = document.querySelector(".question");
const answer = document.querySelector(".answer");
const backButton = document.querySelector(".back-button");
const nextButton = document.querySelector(".next-button");
const randomButton = document.querySelector(".random-button");
const saveButton = document.querySelector(".save-button");
const deleteButton = document.querySelector(".delete");
const deleteAllButton = document.querySelector("#delete_cards");
const editButton = document.querySelector(".edit");
const editQuestion = document.querySelector("#question-input-edit");
const editAnswer = document.querySelector("#answer-input-edit");
const editCloseButton = document.querySelector(".edit-close");
const editBox = document.querySelector(".edit-box");
const saveEditButton = document.querySelector(".save-edit-button");
const viewCardsButton = document.querySelector("#view");

// display card shows first card to begin with
let index = 0;
question.innerHTML = flashcards[index].question;
answer.innerHTML = flashcards[index].answer;

// shows answers when display card is clicked
flashCard.addEventListener("click", function () {
  if (answer.style.display == "none") answer.style.display = "block";
  else answer.style.display = "none";
});
// back button handler
backButton.addEventListener("click", goBack);
function goBack() {
  answer.style.display = "none";
  if (flashcards.length === 0) {
    return (question.innerHTML = ""), (answer.innerHTML = "");
  }
  if (index == 0) {
    index = flashcards.length - 1;
  } else {
    index--;
  }
  question.innerHTML = flashcards[index].question;
  answer.innerHTML = flashcards[index].answer;
  //updates the edit input text when display changes
  editQuestion.innerHTML = flashcards[index].question;
  editAnswer.innerHTML = flashcards[index].answer;
}

nextButton.addEventListener("click", goNext);
// next button handler
function goNext() {
  answer.style.display = "none";
  if (flashcards.length === 0) {
    return (question.innerHTML = ""), (answer.innerHTML = "");
  }
  if (index === flashcards.length - 1) {
    index = 0;
  } else {
    index++;
  }
  question.innerHTML = flashcards[index].question;
  answer.innerHTML = flashcards[index].answer;

  //updates the edit input text when display changes
  editQuestion.innerHTML = flashcards[index].question;
  editAnswer.innerHTML = flashcards[index].answer;
}
randomButton.addEventListener("click", () => {
  answer.style.display = "none";
  if (flashcards.length === 0) {
    return (question.innerHTML = ""), (answer.innerHTML = "");
  }
  const randomNumber = Math.floor(Math.random() * flashcards.length);
  index = randomNumber;
  question.innerHTML = flashcards[index].question;
  answer.innerHTML = flashcards[index].answer;
  //updates the edit input text when display changes
  editQuestion.innerHTML = flashcards[index].question;
  editAnswer.innerHTML = flashcards[index].answer;
});
// create new flashcard
saveButton.addEventListener("click", (event) => {
  const questionInput = document.querySelector("#question-input");
  const answerInput = document.querySelector("#answer-input");

  const newFlashCard = {
    question: questionInput.value,
    answer: answerInput.value,
  };

  flashcards.push(newFlashCard);
  questionInput.value = "";
  answerInput.value = "";
  //New card shows on display when create new card
  index = flashcards.length - 1;
  question.innerHTML = flashcards[index].question;
  answer.innerHTML = flashcards[index].answer;
});

// delete button handler
deleteButton.addEventListener("click", (event) => {
  if (flashcards.length === 0) return (flashcards = []);
  flashcards.splice(index, 1);
  goBack();
});
// delete All cards handler
deleteAllButton.addEventListener("click", () => {
  flashcards = [];
  question.innerHTML = "";
  answer.innerHTML = "";
});
// Edit button handler
editButton.addEventListener("click", () => {
  if (flashcards.length === 0) {
    return alert("You have no cards to edit");
  }
  editQuestion.innerHTML = flashcards[index].question;
  editAnswer.innerHTML = flashcards[index].answer;

  if (editBox.style.display == "none") editBox.style.display = "block";
});
// Close edit button handler
editCloseButton.addEventListener("click", () => {
  editQuestion.innerHTML = flashcards[index].question;
  editAnswer.innerHTML = flashcards[index].answer;
  editBox.style.display = "none";
});
//save edit button handler
saveEditButton.addEventListener("click", () => {
  const questionEditInput = document.querySelector("#question-input-edit");
  const answerEditInput = document.querySelector("#answer-input-edit");

  flashcards[index].question = questionEditInput.value;
  flashcards[index].answer = answerEditInput.value;

  question.innerHTML = flashcards[index].question;
  answer.innerHTML = flashcards[index].answer;
});
// View all cards button handler, Updates cards list
viewCardsButton.addEventListener("click", () => {
  removeCards(); 
  listCards();
});
function listCards() {
  flashcards.forEach((card) => {
    const flashcard = document.createElement("div");
    const question = document.createElement("h2");
    const answer = document.createElement("h2");

    flashcard.className = "list-flashcard";

    question.setAttribute(
      "style",
      "border-top:1px solid red; padding: 15px; margin-top:30px"
    );
    question.textContent = card.question;

    answer.setAttribute("style", "text-align:center; display:none; color:red");
    answer.textContent = card.answer;
    flashcard.appendChild(question);
    flashcard.appendChild(answer);
     // show answer on click for each listed flashcard 
    flashcard.addEventListener("click", () => {
      if (answer.style.display == "none") answer.style.display = "block";
      else answer.style.display = "none";
    });

    document.querySelector(".flashcards").appendChild(flashcard);
  });
}
function removeCards() {
  const parent = document.querySelector(".flashcards");
  parent.replaceChildren();
}
// event listener on flashcards array for .push()
const pushify = function(arr, callback) {
  arr.push = function(e) {
      Array.prototype.push.call(arr, e);
      callback(arr);
  };
};
// updates the list of cards everytime new card pushed
pushify(flashcards, function() {
  removeCards(); 
  listCards();
});

