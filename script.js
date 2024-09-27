let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "hi-GB";
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();

  if (hours >= 0 && hours < 12) {
    speak("Good Morning");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Aftrenoon");
  } else {
    speak("Good Evening");
  }
}
window.addEventListener("load", () => {
  wishMe();
});

let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.computedStyleMap.display = "none";
  voice.computedStyleMap.display = "block";
});

function takeCommand(message) {
  btn.computedStyleMap.display = "flex";
  voice.computedStyleMap.display = "none";

  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello mam,How can I help you ??");
  } else if (message.includes("Who are you")) {
    speak("I am Neva, a virtual assistant created by Nikita Magar");
  } else if (message.includes("Open youtube")) {
    speak("Opening youtube");
    window.open("https://www.youtube.com/", "_blank");
  } else if (message.includes("Open Google")) {
    speak("Opening google");
    window.open("https://www.google.com/", "_blank");
  } else if (message.includes("Open facebook")) {
    speak("Opening facebook");
    window.open("https://www.facebook.com/", "_blank");
  } else if (message.includes("Open Instagram")) {
    speak("Opening Instagram");
    window.open("https://www.instagram.com/?hl=en", "_blank");
  } else if (message.includes("Open calculator")) {
    speak("Opening calculator");
    window.open("calculator://");
  } else if (message.includes("Open whatsapp")) {
    speak("Opening whatsapp");
    window.open("whatsapp://");
  } else if (message.includes("what is time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(time);
  } else if (message.includes("what is Date")) {
    let date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
    });
    speak(date);
  } else {
    speak(
      `This is what i found on the internet regarding ${message.replace(
        "Neva",
        ""
      )}`
    );
    window.open(
      `https://www.google.com/search?q=${message.replace("Neva", "")}`
    );
  }
}
