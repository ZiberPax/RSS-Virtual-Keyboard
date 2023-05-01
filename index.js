import keyObject from "./keys.json" assert {type: "json"};
let shiftPressed = false;
let actual_language;
if (localStorage.getItem(`language`) && (localStorage.getItem(`language`) == `eng` || localStorage.getItem(`language`) == `ru`)) {
  actual_language = localStorage.getItem(`language`);
} else {
  actual_language = `eng`;
  localStorage.setItem('language',actual_language);
}
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
document.querySelector(`.textarea`).focus();
document.body.appendChild(new add_element(`main`, [`keyboard`], ``).createEL());
document.body.appendChild(new add_element(`h3`, [`instruction_1`], `Клавиатура создана в операционной системе Windows 10 `).createEL());
document.body.appendChild(new add_element(`h3`, [`instruction_2`], `Для смены языка нажмите левые Ctrl + Alt`).createEL());
document.querySelector(`.keyboard`);

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
            `${Object.values(keyObject[`row_${m}`])[i]["key_eng"]}`,
            `${Object.values(keyObject[`row_${m}`])[i]["key_ru"]}`,
            `${Object.values(keyObject[`row_${m}`])[i]["key_shift_eng"]}`,
            `${Object.values(keyObject[`row_${m}`])[i]["key_shift_ru"]}`
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
        : startPosition + text.length;
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
      }
    } else {
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
  }

  function textDeleteDel(text) {
    let startPosition = document.querySelector(`.textarea`).selectionStart;
    let endPosition = document.querySelector(`.textarea`).selectionEnd;
    let newValueTextInput = "";
    if (startPosition == endPosition) {
      if (document.querySelector(`.textarea`).selectionStart != document.querySelector(`.textarea`).value.length) {
        newValueTextInput = document.querySelector(`.textarea`).value.substring(0,document.querySelector(`.textarea`).selectionStart) + document.querySelector(`.textarea`).value.substring(document.querySelector(`.textarea`).selectionEnd + 1, document.querySelector(`.textarea`).value.length);
        document.querySelector(`.textarea`).value = newValueTextInput;
        document.querySelector(`.textarea`).selectionStart = startPosition ;
        document.querySelector(`.textarea`).selectionEnd = endPosition;
      }
    } else {
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
  }
  let capsKey = document.querySelector(`.CapsLock`)
  // проверяю язык и включаю на клавиатуре нужный
  if (localStorage.getItem(`language`) == `eng`) {
    let collectionOn = Array.from(document.getElementsByClassName(`eng normal`));
    let collectionOff = Array.from(document.getElementsByClassName(`ru normal`));

    for (let i = 0; i < collectionOn.length; i++) {
      collectionOn[i].classList.remove(`hidden`);
      collectionOff[i].classList.add(`hidden`);
    }
  } else {
    let collectionOn = Array.from(document.getElementsByClassName(`ru normal`));
    let collectionOff = Array.from(document.getElementsByClassName(`eng normal`));
    for (let i = 0; i < collectionOn.length; i++) {
      collectionOn[i].classList.remove(`hidden`);
      collectionOff[i].classList.add(`hidden`);
    }
  }
  // получаю массив всех клавиш на страница и вешаю листнер для каждой 
  Array.from(document.getElementsByClassName(`keyboard__key`)).forEach((element) => {
    // лиснер для клика на кливишу 
      element.addEventListener(`click`, (event) => {
        if (element.classList.contains(`Tab`)) {
          document.querySelector(`.textarea`).textContent += `  `;
        } else if (element.classList.contains(`Backspace`)) {
          textDeleteBackspace();
        } else if (element.classList.contains(`CapsLock`)) {
          onOffClass(document.getElementsByClassName(`${actual_language} capslock`), document.getElementsByClassName(`${actual_language} normal`))
          capsKey.classList.toggle(`caps_active`)
          
        } else if (event.target.outerText == 'Shift' || event.target.outerText == 'Ctrl' || event.target.outerText == 'Alt' || event.target.outerText == 'Win') {
        } else if (shiftPressed) {
          if (document.querySelector(`.CapsLock`).classList.contains(`caps_active`)) {
            textInsert(document.querySelector(`.${element.classList[0]}.${element.classList[1]} .${`${actual_language}.normal`}`).textContent);    
          } else {
            textInsert(document.querySelector(`.${element.classList[0]}.${element.classList[1]} .${`${actual_language}.shift`}`).textContent);    
          }
        } else if (element.classList.contains(`Enter`)) {
          textInsert(`\n`);
        } else if (element.classList.contains(`Delete`)) {
          textDeleteDel();
        }
        
        else {
          if (capsKey.classList.contains(`caps_active`)) {
            textInsert(document.querySelector(`.${element.classList[0]}.${element.classList[1]} .${`${actual_language}.capslock`}`).textContent);
          } else {  
            textInsert(document.querySelector(`.${element.classList[0]}.${element.classList[1]} .${`${actual_language}.normal`}`).textContent);
          }
        }
      });
    }


  );
  // деактивирую возможность выделять элементы везде, кроме textarea
  document.addEventListener("selectstart", (event) => {
    if (!event.target.classList.contains(`textarea`)) {
      event.preventDefault();
      return false;
    }
  });

  // лиснер для нажатой но не отпущенной кнопки мыши
  document.addEventListener("mousedown", (event) => {
    if (event.target.outerText == `Shift`) {
      event.preventDefault();
      shiftPressed = true;
      let collectionOn = Array.from(document.getElementsByClassName(`${actual_language} capslock`));
      let collectionOff = Array.from(document.getElementsByClassName(`${actual_language} normal`));
      if (document.querySelector(`.CapsLock`).classList.contains(`caps_active`)) {
        for (let i = 0; i < collectionOn.length; i++) {
          collectionOn[i].classList.add(`hidden`);
          collectionOff[i].classList.remove(`hidden`);
        }
      } else {
        for (let i = 0; i < collectionOn.length; i++) {
          collectionOn[i].classList.remove(`hidden`);
          collectionOff[i].classList.add(`hidden`);
        }
      }
    }
    if (!event.target.classList.contains(`textarea`)) {
      event.preventDefault();
      return false;
    }
  });

  // лиснер для отпущенной кнопки мыши
  document.addEventListener("mouseup", (event) => {
    if (event.target.outerText == `Shift`) {
      shiftPressed = false;
      let collectionOn = Array.from(document.getElementsByClassName(`${actual_language} capslock`));
      let collectionOff = Array.from(document.getElementsByClassName(`${actual_language} normal`));
      if (document.querySelector(`.CapsLock`).classList.contains(`caps_active`)) {
        for (let i = 0; i < collectionOn.length; i++) {
          collectionOn[i].classList.remove(`hidden`);
          collectionOff[i].classList.add(`hidden`);
        }
      }
      else {
        for (let i = 0; i < collectionOn.length; i++) {
          collectionOn[i].classList.add(`hidden`);
          collectionOff[i].classList.remove(`hidden`);
        }
      }
    }
  });

  // лиснер для нажатой, но не отпущенной клавишы клавиатуры
  document.addEventListener("keydown", (event) => {
    if (event.key === `Tab`) {
      event.preventDefault();
      document.querySelector(`.Tab`).classList.add(`tab-active`)
      textInsert(`    `);
    }
    if (event.key === `Enter`) {
      event.preventDefault();
      textInsert(`\n`);
    }
    if (event.key === `ArrowUp`) {
      event.preventDefault();
      textInsert(`↑`);
    }
    if (event.key === `ArrowDown`) {
      event.preventDefault();
      textInsert(`↓`);
    }
    if (event.key === `ArrowLeft`) {
      event.preventDefault();
      textInsert(`←`);
    }
    if (event.key === `ArrowRight`) {
      event.preventDefault();
      textInsert(`→`);
    }
    if (event.key === `CapsLock`) {
      event.preventDefault();
      onOffClass(document.getElementsByClassName(`${actual_language} capslock`), document.getElementsByClassName(`${actual_language} normal`))
      capsKey.classList.toggle(`caps_active`)
    }
    if (event.key === `Shift`) {
      event.preventDefault();
      shiftPressed = true;
      let collectionOn = Array.from(document.getElementsByClassName(`${actual_language} capslock`));
      let collectionOff = Array.from(document.getElementsByClassName(`${actual_language} normal`));
    
      if (document.querySelector(`.CapsLock`).classList.contains(`caps_active`)) {
        for (let i = 0; i < collectionOn.length; i++) {
          collectionOn[i].classList.add(`hidden`);
          collectionOff[i].classList.remove(`hidden`);
        }
      } else {
        for (let i = 0; i < collectionOn.length; i++) {
          collectionOn[i].classList.remove(`hidden`);
          collectionOff[i].classList.add(`hidden`);
        }
      }
    }
    if (event.key === `Control`) {
      document.querySelector(`.ControlLeft`).classList.add(`control-active`)
    }
    if (event.key === `Alt`) {
      event.preventDefault()
      document.querySelector(`.AltLeft`).classList.add(`alt-active`)
    }
    if (document.querySelector(`.AltLeft`).classList.contains(`alt-active`) && document.querySelector(`.ControlLeft`).classList.contains(`control-active`)) {
      let acum_lang = actual_language;
      if (actual_language == 'eng') {
        actual_language = `ru`;
        localStorage.setItem('language', actual_language)
        if (capsKey.classList.contains(`caps_active`)) {
          onOffClass(document.getElementsByClassName(`${actual_language} capslock`), document.getElementsByClassName(`${acum_lang} capslock`))
        } else {
          onOffClass(document.getElementsByClassName(`${actual_language} normal`), document.getElementsByClassName(`${acum_lang} normal`))
        }
      } else if (document.querySelector(`.AltLeft`).classList.contains(`alt-active`) && document.querySelector(`.Tab`).classList.contains(`tab-active`)) {
      } else {
        actual_language = `eng`;
        localStorage.setItem('language', actual_language)
        if (capsKey.classList.contains(`caps_active`)) {
          onOffClass(document.getElementsByClassName(`${actual_language} capslock`), document.getElementsByClassName(`${acum_lang} capslock`))
        } else {
          onOffClass(document.getElementsByClassName(`${actual_language} normal`), document.getElementsByClassName(`${acum_lang} normal`))
        }
      }

    }
    if (!((event.getModifierState('CapsLock') == true ) &&  (capsKey.classList.contains(`caps_active`) == true))) {
      event.getModifierState('CapsLock') == false
    }
    if (document.querySelector(`.${event.code}`)) {
      document.querySelector(`.${event.code}`).classList.add(`active`);
    }
  });
  // лиснер для отпущенной клавишы клавиатуры
  document.addEventListener("keyup", (event) => {
    if (document.querySelector(`.${event.code}`)) {
      document.querySelector(`.${event.code}`).classList.remove(`active`);
    }
    if (event.key === `Shift`) {
      shiftPressed = false;
      let collectionOn = Array.from(document.getElementsByClassName(`${actual_language} capslock`));
      let collectionOff = Array.from(document.getElementsByClassName(`${actual_language} normal`));
    
      if (document.querySelector(`.CapsLock`).classList.contains(`caps_active`)) {
        for (let i = 0; i < collectionOn.length; i++) {
          collectionOn[i].classList.remove(`hidden`);
          collectionOff[i].classList.add(`hidden`);
        }
      }
      else {
        for (let i = 0; i < collectionOn.length; i++) {
          collectionOn[i].classList.add(`hidden`);
          collectionOff[i].classList.remove(`hidden`);
        }
      }
    }

    if (event.key === `Control`) {
      document.querySelector(`.ControlLeft`).classList.remove(`control-active`)
    }
    if (event.key === `Alt`) {
      event.preventDefault()
      document.querySelector(`.AltLeft`).classList.remove(`alt-active`)
    }
  });


  document.addEventListener('keypress', (event) => {
    if (!document.querySelector(`.${event.code}`)) {
      console.log(`нет такой клавишы`);
      event.preventDefault()
      return 
    }
    // блок для обработки нажатия CAPSLOCK 
    if ((event.getModifierState('CapsLock') == true ) &&  (capsKey.classList.contains(`caps_active`) == false)) {
      event.preventDefault()
      textInsert(document.querySelector(`.${event.code} .${`${actual_language}.normal`}`).textContent)
    }
    else if ((!event.getModifierState('CapsLock')) &&  (capsKey.classList.contains(`caps_active`))) {
      event.preventDefault()
      textInsert(document.querySelector(`.${event.code} .${`${actual_language}.capslock `}`).textContent)
    }
    else if (event.key === `Alt`) {
      event.preventDefault()
    } else if (event.key === `MetaKey`) {
    } else {
      event.preventDefault()
      if (capsKey.classList.contains(`caps_active`)) {
        textInsert(document.querySelector(`.${event.code} .${`${actual_language}.capslock `}`).textContent);
      } else {
        textInsert(document.querySelector(`.${event.code} .${`${actual_language}.normal `}`).textContent);

      }
    }
  })

});

