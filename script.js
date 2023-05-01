const Keyboard = {
	elements: {
		header: null,
		textArea: null,
		main: null,
		containerKeyboard: null,
		keys: [],
	},

	eventHandlers: {
		oninput: null,
		onclose: null,
	},

	properties: {
		value: "",
		capsLock: false,
		language: "eng",
	},

	init() {
		this.elements.header = document.createElement("h1");
		this.elements.header.innerHTML = "Virtual Keyboard";
		this.elements.textArea = document.createElement("textarea");
		this.elements.main = document.createElement("div");
		this.elements.containerKeyboard = document.createElement("div");

		this.elements.textArea.id = "text";
		this.elements.main.id = "keyboard";
		this.elements.containerKeyboard.classList.add("keyboard__keys");

		this.elements.main.appendChild(this.elements.containerKeyboard);
		this.elements.containerKeyboard.appendChild(this._createKeys());
		document.body.appendChild(this.elements.header);
		document.body.appendChild(this.elements.textArea);
		document.body.appendChild(this.elements.main);

		// Automatically use keyboard for elements with .use-keyboard-input
		document.querySelectorAll(".use-keyboard-input").forEach((element) => {
			element.addEventListener("focus", () => {
				this.open(element.value, (currentValue) => {
					element.value = currentValue;
				});
			});
		});

		this._createKeys();
	},

	_createKeys() {
		const fragment = document.createDocumentFragment();
		const keyLayout = [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"0",
			"backspace",
			"q",
			"w",
			"e",
			"r",
			"t",
			"y",
			"u",
			"i",
			"o",
			"p",
			"caps",
			"a",
			"s",
			"d",
			"f",
			"g",
			"h",
			"j",
			"k",
			"l",
			"enter",
			"done",
			"z",
			"x",
			"c",
			"v",
			"b",
			"n",
			"m",
			",",
			".",
			"?",
			"space",
		];

		// Creates HTML for an icon
		const createIconHTML = (icon_name) => {
			return `<i class="material-icons">${icon_name}</i>`;
		};

		keyLayout.forEach((key) => {
			const keyElement = document.createElement("button");
			const insertLineBreak =
				["backspace", "p", "enter", "?"].indexOf(key) !== -1;

			// Add attributes/classes
			keyElement.setAttribute("type", "button");
			keyElement.classList.add("keyboard__key");

			switch (key) {
				case "backspace":
					keyElement.classList.add("keyboard__key_large");
					keyElement.innerHTML = createIconHTML("backspace");

					keyElement.addEventListener("click", () => {
						this.properties.value = this.properties.value.substring(
							0,
							this.properties.value.length - 1
						);
						this._triggerEvent("oninput");
					});

					break;

				case "caps":
					keyElement.classList.add(
						"keyboard__key_large",
						"keyboard__key-activ"
					);
					keyElement.innerHTML = createIconHTML("keyboard_capslock");

					keyElement.addEventListener("click", () => {
						this._toggleCapsLock();
						keyElement.classList.toggle(
							"keyboard__key-activate",
							this.properties.capsLock
						);
					});

					break;

				case "enter":
					keyElement.classList.add("keyboard__key_large");
					keyElement.innerHTML = createIconHTML("keyboard_return");

					keyElement.addEventListener("click", () => {
						this.properties.value += "\n";
						this._triggerEvent("oninput");
					});

					break;

				case "space":
					keyElement.classList.add("keyboard__key_extra-large");
					keyElement.innerHTML = createIconHTML("space_bar");

					keyElement.addEventListener("click", () => {
						this.properties.value += " ";
						this._triggerEvent("oninput");
					});

					break;

				case "done":
					keyElement.classList.add(
						"keyboard__key_large"
						// "keyboard__key--dark"
					);
					keyElement.innerHTML = createIconHTML("check_circle");

					keyElement.addEventListener("click", () => {
						this.close();
						this._triggerEvent("onclose");
					});

					break;

				default:
					keyElement.textContent = key.toLowerCase();

					keyElement.addEventListener("click", () => {
						this.properties.value += this.properties.capsLock
							? key.toUpperCase()
							: key.toLowerCase();
						this._triggerEvent("oninput");
					});

					break;
			}

			fragment.appendChild(keyElement);

			if (insertLineBreak) {
				fragment.appendChild(document.createElement("br"));
			}
		});

		return fragment;
	},

	_triggerEvent(handlerName) {
		if (typeof this.eventHandlers[handlerName] == "function") {
			this.eventHandlers[handlerName](this.properties.value);
		}
	},

	_toggleCapsLock() {
		this.properties.capsLock = !this.properties.capsLock;

		for (const key of this.elements.keys) {
			if (key.childElementCount === 0) {
				key.textContent = this.properties.capsLock
					? key.textContent.toUpperCase()
					: key.textContent.toLowerCase();
			}
		}
	},

	open(initialValue, oninput, onclose) {
		this.properties.value = initialValue || "";
		this.eventHandlers.oninput = oninput;
		this.eventHandlers.onclose = onclose;
		// this.elements.main.classList.remove("keyboard--hidden");
	},

	close() {
		this.properties.value = "";
		this.eventHandlers.oninput = oninput;
		this.eventHandlers.onclose = onclose;
		// this.elements.main.classList.add("keyboard--hidden");
	},
};

window.addEventListener("DOMContentLoaded", function () {
	debugger;
	Keyboard.eventHandlers.oninput = (val) => {
		Keyboard.elements.textArea.value = val;
	};
	Keyboard.init();
});
