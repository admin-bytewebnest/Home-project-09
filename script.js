import { EditorView, basicSetup } from "https://esm.sh/codemirror";

import { EditorState } from "https://esm.sh/@codemirror/state";

import { html } from "https://esm.sh/@codemirror/lang-html";

import { css } from "https://esm.sh/@codemirror/lang-css";



function showCode(selector, code, language = "html") {

    const block = document.querySelector(selector);

    if (!block) {

        console.error(`Элемент ${selector} не найден`);

        return;

    }

    const languageMode = language === "css"

        ? css()

        : html();



    new EditorView({

        state: EditorState.create({

            doc: code,

            extensions: [

                basicSetup,

                languageMode,

                // Только просмотр

                EditorView.editable.of(false),

                // Стили CodeMirror

                EditorView.theme({

                    "&": {

                        backgroundColor: "#0d111c",

                        color: "#c9d1d9",

                        fontSize: "15px",

                        borderRadius: "14px",
                        

                    },

                    ".cm-content": {

                        padding: "20px 0",

                    },

                    ".cm-gutters": {

                        backgroundColor: "#0a0e18",

                        color: "#4b5568",

                        border: "none",

                        paddingRight: "10px",

                    },

                    ".cm-line": {

                        padding: "0 20px",

                    },

                    ".cm-scroller": {

                        overflow: "auto",

                    },

                    ".cm-activeLine": {

                        backgroundColor: "rgba(255, 255, 255, 0.025)",

                    },

                    ".cm-activeLineGutter": {

                        backgroundColor: "transparent",

                    }

                })

            ]

        }),

        parent: block

    });

}


/* ==================================================
   КНОПКА КОПИРОВАНИЯ
   ================================================== */

function addCopyButton(selector, code) {

    const block = document.querySelector(selector);

    if (!block) {

        console.error(`Элемент ${selector} не найден`);

        return;

    }


    // Стили родительского блока
    block.style.position = "relative";


    // Создаём кнопку
    const button = document.createElement("button");

    button.type = "button";

    button.textContent = "Скопировать";


    // Стили кнопки
    Object.assign(button.style, {

        position: "absolute",

        top: "12px",

        right: "12px",

        padding: "8px 12px",

        border: "1px solid #61329a",

        borderRadius: "8px",

        background: "#0d111c",

        color: "#c9d1d9",

        cursor: "pointer",

        zIndex: "10",

        transition: "0.2s",

    });


    // Hover
    button.addEventListener("mouseenter", () => {

        button.style.background = "#61329a";

    });


    button.addEventListener("mouseleave", () => {

        button.style.background = "#0d111c";

    });


    // Копирование
    button.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(code);

            button.textContent = "Скопировано ✓";


            setTimeout(() => {

                button.textContent = "Скопировать";

            }, 1500);

        } catch (error) {

            console.error("Не удалось скопировать код:", error);

        }

    });


    // Добавляем кнопку в блок
    block.appendChild(button);

}


showCode(

    ".wrapper__result",

    `<div class="card">
    <h3>Заголовок карточки</h3>
    <p>Это параграф внутри карточки.</p>
</div>`,

    "html"

);


addCopyButton(

    ".wrapper__result",

    `<div class="card">
    <h3>Заголовок карточки</h3>
    <p>Это параграф внутри карточки.</p>
</div>`

);

