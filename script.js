/* =========================================
   APOLOGY QUEST - SCRIPT
   ========================================= */


/* ---------- CHANGE SCREEN ---------- */

function goTo(screenID) {
    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    const nextScreen = document.getElementById(screenID);

    if (nextScreen) {
        nextScreen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ---------- START GAME ---------- */

function startGame() {
    goTo("level1");
    startFloatingHearts();
}


/* ---------- LEVEL 1 ---------- */

function wrongAnswer(button) {

    const feedback = document.getElementById("feedback");

    feedback.textContent =
        "❌ Nope. That definitely isn't going to help. Try again 😭";

    button.style.transform = "translateX(-8px)";

    setTimeout(function() {
        button.style.transform = "translateX(8px)";
    }, 100);

    setTimeout(function() {
        button.style.transform = "translateX(-5px)";
    }, 200);

    setTimeout(function() {
        button.style.transform = "translateX(0)";
    }, 300);
}


function correctLevel1() {

    const feedback = document.getElementById("feedback");

    feedback.textContent =
        "✅ Correct. You admitted that you were wrong.";

    setTimeout(function() {
        goTo("level2");
    }, 1200);
}


/* ---------- LEVEL 2 ---------- */

function correctLevel2() {

    const feedback = document.getElementById("feedback2");

    feedback.textContent =
        "✅ Good. No excuses. That's progress.";

    setTimeout(function() {
        goTo("memories");
    }, 1200);
}


/* ---------- MEMORY ROOM ---------- */

let memoriesOpened = 0;

function openMemory(number) {

    const message = document.getElementById("memoryMessage");

    const messages = {
        1: "eta emoji t hasir but tui bhab sedin ki korechilam hehehe and sedin special na but ami ekta kichu korechilam and for hint tor onko tuition e ekjon dhukechilo 😂",

        2: "ghum pache anuuuuuuuuuuuu. 🌙",

        3: "anu be like : soptahe 2 bar besi naa heheheh ❤️",

        4: "eta to anuu khub bhalo dey and emon emon jayge te diyeche ar ki bolbo hihihihi . 🥹"
    };

    message.textContent = messages[number];

    memoriesOpened = memoriesOpened + 1;

    if (memoriesOpened >= 2) {

        const continueButton =
            document.getElementById("memoryContinue");

        continueButton.classList.remove("hidden");
    }
}


/* ---------- BOSS FIGHT ---------- */

let bossHealth = 100;

function bossAttack(type) {

    const healthBar =
        document.getElementById("bossHealth");

    const feedback =
        document.getElementById("bossFeedback");


    if (type === "chocolate") {

        bossHealth = bossHealth - 15;

        feedback.textContent =
            "🍫 Chocolate is definitely helpful... but it can't fix everything.";
    }


    else if (type === "flowers") {

        bossHealth = bossHealth - 20;

        feedback.textContent =
            "🌹 Very cute. But flowers aren't a substitute for an apology.";
    }


    else if (type === "change") {

        bossHealth = 0;

        feedback.textContent =
            "❤️ That's the answer. Real change matters more than words.";
    }


    if (bossHealth < 0) {
        bossHealth = 0;
    }


    healthBar.style.width = bossHealth + "%";


    if (bossHealth === 0) {

        setTimeout(function() {
            goTo("apology");
            createHeartBurst();
        }, 1200);
    }
}


/* ---------- FINAL APOLOGY ---------- */

function showEnding() {
    goTo("ending");
}


/* ---------- YES BUTTON ---------- */

function yesEnding() {

    const message =
        document.getElementById("endingMessage");

    message.innerHTML =
        "❤️ <strong>Achievement Unlocked: Second Chance</strong>" +
        "<br><br>" +
        "Quest objective updated:" +
        "<br>" +
        "<em>Don't screw it up again. 😭</em>";

    createHeartBurst();
}


/* ---------- MAYBE BUTTON ---------- */

function maybeEnding() {

    const message =
        document.getElementById("endingMessage");

    message.innerHTML =
        "🥺 That's okay." +
        "<br><br>" +
        "Take your time.(ekdom aram se bhab main to tera hi huuu) You don't have to forgive me immediately." +
        "<br>" +
        "I just wanted you to know that I'm genuinely sorry. ❤️";
}


/* ---------- FLOATING HEARTS ---------- */

let heartsStarted = false;

function startFloatingHearts() {

    if (heartsStarted) {
        return;
    }

    heartsStarted = true;

    setInterval(function() {

        const heart =
            document.createElement("div");

        heart.className = "heart";

        const heartTypes = [
            "❤️",
            "💕",
            "💗",
            "💖",
            "♥️"
        ];

        const randomHeart =
            heartTypes[
                Math.floor(
                    Math.random() * heartTypes.length
                )
            ];

        heart.textContent = randomHeart;

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            (12 + Math.random() * 18) + "px";

        heart.style.animationDuration =
            (5 + Math.random() * 5) + "s";


        const heartContainer =
            document.getElementById("hearts");

        if (heartContainer) {
            heartContainer.appendChild(heart);
        }


        setTimeout(function() {

            heart.remove();

        }, 10000);

    }, 900);
}


/* ---------- HEART BURST ---------- */

function createHeartBurst() {

    for (let i = 0; i < 25; i++) {

        const heart =
            document.createElement("div");

        heart.textContent = "❤️";

        heart.style.position = "fixed";

        heart.style.left = "50%";

        heart.style.top = "50%";

        heart.style.fontSize = "25px";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "9999";


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 250;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


        const animation = heart.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },

                {
                    transform:
                        "translate(" +
                        "calc(-50% + " + x + "px), " +
                        "calc(-50% + " + y + "px)" +
                        ") scale(1.3)",
                    opacity: 0
                }
            ],

            {
                duration: 1200,
                easing: "cubic-bezier(.2,.8,.3,1)"
            }
        );


        document.body.appendChild(heart);


        animation.onfinish = function() {
            heart.remove();
        };
    }
}