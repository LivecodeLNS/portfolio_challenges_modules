"use strict";
function log(...msg) {
    console.log(...msg);
}
function clear() {
    console.clear();
}
function doc() {
    return document;
}
function docQS(selector) {
    return doc().querySelector(selector);
}
function docQSA(selector) {
    return doc().querySelectorAll(selector);
}
function docGEBI(selector) {
    return doc().getElementById(selector);
}
function lineDecorative() {
    let line = "=";
    for (let i = 0; i < 80; i++) {
        line += "=";
    }
    return line;
}
function resToHTMLElem(response) {
    return new DOMParser().parseFromString(response, "text/html").body;
}
function handleRes(res) {
    let content = resToHTMLElem(res);
    const btnHeaderInfo = getBtnHeaderAttr();
    docGEBI("btn__header").append(btnHeaderInfo.text);
    docGEBI("root").append(content);
    docGEBI("btn__header").addEventListener("click", btnHeaderInfo.fn);
}
function getBtnHeaderAttr() {
    log("FUNCA");
    let textsAndFncs = {
        edit: {
            text: "LOG OUT",
            fn: handleClickToHome,
        },
        view: {
            text: "LOG IN",
            fn: handleClickToLogin,
        },
        login: {
            text: "CANCEL",
            fn: handleClickToHome,
        },
    };
    let contentBtn = textsAndFncs.view;
    if (mode === "edit")
        contentBtn = textsAndFncs.edit;
    if (mode === "login")
        contentBtn = textsAndFncs.login;
    return contentBtn;
}
function handleClickToHome() {
    window.location.assign("index.html?mode=view");
}
function handleClickToLogin() {
    window.location.assign("index.html?mode=login");
}
function handleClickToEdit(event) {
    event.preventDefault();
    log('');
    window.location.assign("index.html?mode=edit");
}
const urlParams = new URLSearchParams(location.search);
const mode = urlParams.get("mode") ?? "view";
fetch(`${location.origin}/modes_SPA/mode_${mode}.html`)
    .then((res) => res.text())
    .then((res) => handleRes(res));
