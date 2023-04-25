import keyObject from "./keys.json" assert {type: "json"};
let shiftPressed = false;
class add_element {
  constructor(tag, classes, content, content_ru, contentUp_en, contentUp_ru) {
    this.tag = tag;
    this.classes = classes;
    this.content = content;
    this.content_ru = content_ru;
    this.contentUp_en = contentUp_en;
    this.contentUp_ru = contentUp_ru;
    this.my_element = ``;
    this.key_paragraph_eng, this.key_paragraph_eng_shift,  this.key_paragraph_eng_capslock, this.key_paragraph_ru,  this.key_paragraph_ru_shift, this.key_paragraph_ru_capslock;
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
    // заполнение спаном для обычного англ
    this.key_paragraph_eng = document.createElement(`span`);
    this.key_paragraph_eng.classList.add(`eng`);
    this.key_paragraph_eng.classList.add(`normal`);
    this.key_paragraph_eng.textContent = this.content;
    this.my_element.appendChild(this.key_paragraph_eng);

    // заполнение спаном для шифт англ
    this.key_paragraph_eng_shift = document.createElement(`span`);
    this.key_paragraph_eng_shift .classList.add(`eng`);
    this.key_paragraph_eng_shift .classList.add(`shift`);
    this.key_paragraph_eng_shift .classList.add(`hidden`);
    this.key_paragraph_eng_shift .textContent = this.contentUp_en;
    this.my_element.appendChild(this.key_paragraph_eng_shift);

    // заполнение спаном для капс англ
    this.key_paragraph_eng_capslock = document.createElement(`span`);
    this.key_paragraph_eng_capslock .classList.add(`eng`);
    this.key_paragraph_eng_capslock .classList.add(`capslock`);
    this.key_paragraph_eng_capslock .classList.add(`hidden`);
    this.key_paragraph_eng_capslock .textContent = this.contentUp_en;
    this.my_element.appendChild(this.key_paragraph_eng_capslock );

    // заполнение спаном для обычного ру
    this.key_paragraph_ru = document.createElement(`span`);
    this.key_paragraph_ru .classList.add(`ru`);
    this.key_paragraph_ru .classList.add(`normal`);
    this.key_paragraph_ru .classList.add(`hidden`);
    this.key_paragraph_ru.textContent = this.content_ru;
    this.my_element.appendChild(this.key_paragraph_ru );

    // заполнение спаном для шифт ру
    this.key_paragraph_ru_shift = document.createElement(`span`);
    this.key_paragraph_ru_shift .classList.add(`ru`);
    this.key_paragraph_ru_shift .classList.add(`shift`);
    this.key_paragraph_ru_shift .classList.add(`hidden`);
    this.key_paragraph_ru_shift.textContent = this.contentUp_ru;
    this.my_element.appendChild(this.key_paragraph_ru_shift );

    // заполнение спаном для капс ру
    this.key_paragraph_ru_capslock = document.createElement(`span`);
    this.key_paragraph_ru_capslock .classList.add(`ru`);
    this.key_paragraph_ru_capslock .classList.add(`capslock`);
    this.key_paragraph_ru_capslock .classList.add(`hidden`);
    this.key_paragraph_ru_capslock.textContent = this.contentUp_ru;
    this.my_element.appendChild(this.key_paragraph_ru_capslock );

    return this.my_element;
  }
}

document.body.appendChild(
  new add_element(`h1`, [`title`], `RSS Virtual Keyboard`).createEL()
);
document.body.appendChild(
  new add_element(`textarea`, [`textarea`], ``).createEL()
);
document.body.appendChild(new add_element(`main`, [`keyboard`], ``).createEL());
document.body.appendChild(new add_element(`h3`, [`instruction_1`], `Клавиатура создана в операционной системе Windows 10 `).createEL());
document.body.appendChild(new add_element(`h3`, [`instruction_2`], `Для смены языка нажмите левые Shift + Alt`).createEL());
document.querySelector(`.keyboard`);

// console.log(Object.keys(keyObject[`row_${1}`]).length);

document.addEventListener("DOMContentLoaded", function (event) {
  
  for (let m = 1; m <= Object.keys(keyObject).length; m++) {
    document
    .getElementsByTagName(`main`)[0]
    .appendChild(new add_element(`div`, [`row_${m}`], ``).createEL());
    for (let i = 0; i < Object.keys(keyObject[`row_${m}`]).length; i++) {
      document
        .querySelector(`.row_${m}`)
        .appendChild(
          new add_element(
            `div`,
            [
              `keyboard__key`,
              `${Object.values(keyObject[`row_${m}`])[i]["code"]}`,
            ],
            `${Object.values(keyObject[`row_${m}`])[i]["key"]}`,
            `${Object.values(keyObject[`row_${m}`])[i]["key_ru"]}`,
            `${Object.values(keyObject[`row_${m}`])[i]["key_shift"]}`,
            `${Object.values(keyObject[`row_${m}`])[i]["key_ru_shift"]}`
          ).createKey()
        );
    }
  }

let my_textarea =  document.querySelector(`.textarea`)

// функция вкл/выкл классы 
function onOffClass (collectionOn, collectionOff) {
  collectionOn = Array.from(collectionOn);
  collectionOff = Array.from(collectionOff);

  for (let i = 0; i < collectionOn.length; i++) {
    // console.log(collectionOff[i]);
    collectionOn[i].classList.toggle(`hidden`);
    collectionOff[i].classList.toggle(`hidden`);
  }
}


  // функция вставки текста
  function textInsert(text) {
    let startPosition = my_textarea.selectionStart;
    let endPosition = my_textarea.selectionEnd;
    let newValueTextInput =
      my_textarea.value.substring(0, startPosition) +
      text +
      my_textarea.value.substring(endPosition);
    my_textarea.value = newValueTextInput;
    my_textarea.selectionEnd =
      startPosition == endPosition
        ? startPosition + text.length
        : startPosition + 1;
    // console.log(document.querySelector(`.textarea`).selectionEnd);
  }

  function textDeleteBackspace(text) {
    let startPosition = document.querySelector(`.textarea`).selectionStart;
    let endPosition = document.querySelector(`.textarea`).selectionEnd;
    let newValueTextInput = "";
    if (startPosition == endPosition && endPosition != 0) {
      if (document.querySelector(`.textarea`).selectionStart == document.querySelector(`.textarea`).value.length) {
        newValueTextInput = document.querySelector(`.textarea`).value.substring(0,document.querySelector(`.textarea`).selectionStart - 1) + document.querySelector(`.textarea`).value.substring(document.querySelector(`.textarea`).selectionEnd, document.querySelector(`.textarea`).value.length);
        document.querySelector(`.textarea`).value = newValueTextInput;
      } else {
        newValueTextInput = document.querySelector(`.textarea`).value.substring(0,document.querySelector(`.textarea`).selectionStart - 1) + document.querySelector(`.textarea`).value.substring(document.querySelector(`.textarea`).selectionEnd, document.querySelector(`.textarea`).value.length);
        document.querySelector(`.textarea`).value = newValueTextInput;
        document.querySelector(`.textarea`).selectionStart = startPosition - 1;
        document.querySelector(`.textarea`).selectionEnd = endPosition - 1;
        
        // console.log(document.querySelector(`.textarea`).selectionStart, document.querySelector(`.textarea`).selectionEnd);
        // document.querySelector(`.textarea`).selectionStart -= 1;
        // document.querySelector(`.textarea`).selectionEnd -= 1;
      }
    } else {
      console.log(`here`);
      newValueTextInput =
        document.querySelector(`.textarea`).value.substring(0, startPosition) +
        document
          .querySelector(`.textarea`)
          .value.substring(
            endPosition,
            document.querySelector(`.textarea`).value.length
          );
          document.querySelector(`.textarea`).value = newValueTextInput;
          document.querySelector(`.textarea`).selectionEnd = startPosition;
    }
    // console.log(document.querySelector(`.textarea`).value.length);
    
  }
  let capsKey = document.querySelector(`.CapsLock`)
  Array.from(document.getElementsByClassName(`keyboard__key`)).forEach(
    (element) => {
      element.addEventListener(`click`, (event) => {
        if (element.classList.contains(`Tab`)) {
          document.querySelector(`.textarea`).textContent += `  `;
        } else if (element.classList.contains(`Backspace`)) {
          textDeleteBackspace();
        } else if (element.classList.contains(`CapsLock`)) {
          onOffClass(document.getElementsByClassName(`eng capslock`), document.getElementsByClassName(`eng normal`))
          capsKey.classList.toggle(`caps_active`)
        }
        // реализовать смену языков
        else {
          if (capsKey.classList.contains(`caps_active`)) {
            textInsert(document.querySelector(`.${element.classList[0]}.${element.classList[1]} .${`eng.capslock`}`).textContent);
          } else {

            textInsert(document.querySelector(`.${element.classList[0]}.${element.classList[1]} .${`eng.normal`}`).textContent);
          }
          // console.log(`.${element.classList[0]}.${element.classList[1]} .${`eng.normal`}`);
        }
      });
    }
  );

  document.addEventListener(`click`, (event) => {
    if (shiftPressed) {
      event.preventDefault();
      document.addEventListener("selectstart", (event) => {
        console.log(`here`);
        event.preventDefault();
        return false});
      document.addEventListener("mousedown", (event) => {
        console.log(`here222`);
        event.preventDefault();
        return false});
      return false;
    }
  })

  document.addEventListener("keydown", (event) => {
    // console.log(event);
    if (event.key === `Tab`) {
      event.preventDefault();
    }
    if (event.key === `CapsLock`) {
      event.preventDefault();
      onOffClass(document.getElementsByClassName(`eng capslock`), document.getElementsByClassName(`eng normal`))
      capsKey.classList.toggle(`caps_active`)
    }
    if (event.key === `Shift`) {
      event.preventDefault();
      shiftPressed = true;
      return false;
    }
    document.querySelector(`.${event.code}`).classList.add(`active`);
  });

  document.addEventListener("keyup", (event) => {
    document.querySelector(`.${event.code}`).classList.remove(`active`);
    if (event.key === `Shift`) {
      shiftPressed = false;
      return false;
    }
  });
});
