import keyObject from "./keys.json" assert {type: "json"};

class add_element {
  constructor(tag, classes, content) {
    this.tag = tag;
    this.classes = classes;
    this.content = content;
    this.my_element = ``;
    this.key_paragraph;
  }

  createEL() {
    this.my_element = document.createElement(this.tag);
    if (this.classes.length > 1) {
      for (let i = 0; i < this.classes.length; i++) {
        this.my_element.classList.add(this.classes[i]);
      }
    } else {
      this.my_element.classList.add(this.classes);
    }
    this.my_element.textContent = this.content;
    return this.my_element;
  }

  createKey() {
    this.my_element = document.createElement(this.tag);
    if (this.classes.length > 1) {
      for (let i = 0; i < this.classes.length; i++) {
        this.my_element.classList.add(this.classes[i]);
      }
    } else {
      this.my_element.classList.add(this.classes);
    }
    this.key_paragraph = document.createElement(`span`);
    this.key_paragraph.classList.add(`eng`);
    this.key_paragraph.textContent = this.content;
    this.my_element.appendChild(this.key_paragraph);

    return this.my_element;
  }
}

document.body.appendChild(new add_element(`h1`, [`title`], `RSS Virtual Keyboard`).createEL());
document.body.appendChild(new add_element(`textarea`, [`textarea`], ``).createEL());
document.body.appendChild(new add_element(`main`, [`keyboard`], ``).createEL());
document.querySelector(`.keyboard`)

console.log(Object.values(keyObject["row_1"])[2]["code"]);

document.addEventListener("DOMContentLoaded", function (event) {
  document
    .getElementsByTagName(`main`)[0]
    .appendChild(new add_element(`div`, [`row_1`], ``).createEL());
  for (let i = 0; i < Object.keys(keyObject["row_1"]).length; i++) {
    document
      .querySelector(`.row_1`)
      .appendChild(
        new add_element(
          `div`,
          [`keyboard__key`, `${Object.values(keyObject["row_1"])[i]["code"]}`],
          `${Object.values(keyObject["row_1"])[i]["key"]}`
        ).createKey()
      );
  }
  for (let i = 0; i < Object.keys(keyObject["row_2"]).length; i++) {
    document
      .querySelector(`.row_1`)
      .appendChild(
        new add_element(
          `div`,
          [`keyboard__key`, `${Object.values(keyObject["row_2"])[i]["code"]}`],
          `${Object.values(keyObject["row_2"])[i]["key"]}`
        ).createKey()
      );
  }

  // const keyElementsArr = Array.from(keyElements)
  Array.from(document.getElementsByClassName(`keyboard__key`)).forEach(element => {
    if (!element.classList.contains(`Backspace`)) {
      element.addEventListener(`click`, (event) =>{
        console.log(element);
        document.querySelector(`.textarea`).textContent += element.textContent
      })
    }
  });
  // document.querySelector(`.textarea`).textContent += document.querySelector(`.${event.code}`).textContent
  // keyElements.forEach(element => {
  //   console.log(element);
  // });
});



document.addEventListener('click', (event) => {
  console.log(event);
})

document.addEventListener('keydown', (event) => {
  if (event.key === `Tab`) {
    event.preventDefault();
}
  document.querySelector(`.${event.code}`).classList.add(`active`)
  console.log(event);
})

document.addEventListener('keyup', (event) => {
  document.querySelector(`.${event.code}`).classList.remove(`active`)
  console.log(event);
})
