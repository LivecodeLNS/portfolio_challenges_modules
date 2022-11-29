function log(...msg: any): void {
	console.log(...msg);
}
function clear(): void {
	console.clear();
}
function doc(): Document {
	return document;
}
function docQS(
	selector: string
): HTMLElementTagNameMap | SVGElementTagNameMap | Element | null {
	return doc().querySelector(selector);
}
function docQSA(selector: string): NodeListOf<Node> | null {
	return doc().querySelectorAll(selector);
}
function docGEBI(selector: string): HTMLElement | null {
	return doc().getElementById(selector);
}
function lineDecorative(): string {
	let line: string = "=";
	for (let i = 0; i < 80; i++) {
		line += "=";
	}
	return line;
}
function resToHTMLElem(response: string): HTMLElement {
	return new DOMParser().parseFromString(response, "text/html").body;
}
function handleRes(res: string): void {
	let content: HTMLElement = resToHTMLElem(res);
	const btnHeaderInfo: textAndFn = getBtnHeaderAttr();
	docGEBI("btn__header")!.append(btnHeaderInfo.text);
	docGEBI("root")!.append(content);
	docGEBI("btn__header")!.addEventListener("click", btnHeaderInfo.fn);
}
interface textAndFn extends Object {
	text: string;
	fn: VoidFunction;
}
function getBtnHeaderAttr(): textAndFn {
	log("FUNCA");
	let textsAndFncs: {
		edit: textAndFn;
		view: textAndFn;
		login: textAndFn;
	} = {
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
	let contentBtn: textAndFn = textsAndFncs.view;
	if (mode === "edit") contentBtn = textsAndFncs.edit;
	if (mode === "login") contentBtn = textsAndFncs.login;
	return contentBtn;
}
function handleClickToHome(): void {
	window.location.assign("index.html?mode=view");
}
function handleClickToLogin(): void {
	window.location.assign("index.html?mode=login");
}
function handleClickToEdit(event: Event): void {
	event.preventDefault();
	log("FUNCANDO");
	window.location.assign("index.html?mode=edit");
}

const urlParams: URLSearchParams = new URLSearchParams(location.search);
const mode: string = urlParams.get("mode") ?? "view";
fetch(`${location.origin}/modes_SPA/mode_${mode}.html`)
	.then((res) => res.text())
	.then((res) => handleRes(res));
