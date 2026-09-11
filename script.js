/* =====================================================
   GLITCHSEARCH
   COMPLETE JAVASCRIPT
===================================================== */


/* =====================================================
   BROKEN KEYBOARD MAP
=====================================================

   Physical key → What GlitchSearch produces

   Example:

   G → H
   W → E
   K → L
   I → O

   This object is intentionally easy to edit.
===================================================== */

const brokenKeyMap = {

    // Top row
    q: "w",
    w: "e",
    e: "r",
    r: "t",
    t: "y",
    y: "u",
    u: "i",
    i: "o",
    o: "p",
    p: "q",

    // Middle row
    a: "s",
    s: "d",
    d: "f",
    f: "g",
    g: "h",
    h: "j",
    j: "k",
    k: "l",
    l: "a",

    // Bottom row
    z: "x",
    x: "c",
    c: "v",
    v: "b",
    b: "n",
    n: "m",
    m: "z"

};


/* =====================================================
   SEARCH ELEMENTS
===================================================== */

const searchInterface =
    document.getElementById("searchInterface");

const gameInterface =
    document.getElementById("gameInterface");

const searchInput =
    document.getElementById("searchInput");

const clearButton =
    document.getElementById("clearButton");

const searchButton =
    document.getElementById("searchButton");

const gameButton =
    document.getElementById("gameButton");

const backButton =
    document.getElementById("backButton");

const damagePercentage =
    document.getElementById("damagePercentage");

const damageStatus =
    document.getElementById("damageStatus");

const damageFill =
    document.getElementById("damageFill");


/* =====================================================
   SEARCH VARIABLES
===================================================== */

let originalText = "";

let brokenText = "";

let keyboardHealth = 100;


/* =====================================================
   CONVERT A CHARACTER
===================================================== */

function convertCharacter(character) {

    /*
     * Spaces remain spaces.
     */

    if (character === " ") {
        return " ";
    }


    const lowerCharacter =
        character.toLowerCase();


    /*
     * Check whether the character
     * exists in our broken map.
     */

    if (
        Object.prototype.hasOwnProperty.call(
            brokenKeyMap,
            lowerCharacter
        )
    ) {

        const replacement =
            brokenKeyMap[lowerCharacter];


        /*
         * Preserve uppercase.
         */

        if (
            character >= "A" &&
            character <= "Z"
        ) {

            return replacement.toUpperCase();
        }


        return replacement;
    }


    /*
     * Numbers and punctuation
     * remain unchanged.
     */

    return character;
}


/* =====================================================
   UPDATE SEARCH INPUT
===================================================== */

function updateSearchInput() {

    searchInput.value =
        brokenText;
}


/* =====================================================
   DAMAGE METER
===================================================== */

function updateDamageMeter() {

    const characterCount =
        originalText.length;


    const damage =
        Math.min(
            characterCount,
            100
        );


    keyboardHealth =
        Math.max(
            0,
            100 - damage
        );


    damagePercentage.textContent =
        keyboardHealth + "%";


    damageFill.style.width =
        keyboardHealth + "%";


    if (keyboardHealth >= 80) {

        damageStatus.textContent =
            "Perfect";

    } else if (keyboardHealth >= 50) {

        damageStatus.textContent =
            "Slightly damaged";

    } else if (keyboardHealth >= 25) {

        damageStatus.textContent =
            "Unstable";

    } else if (keyboardHealth > 0) {

        damageStatus.textContent =
            "Critical";

    } else {

        damageStatus.textContent =
            "Keyboard has given up";
    }
}


/* =====================================================
   SEARCH KEYBOARD HANDLER
===================================================== */

searchInput.addEventListener(
    "keydown",
    function(event) {

        /*
         * Keep normal browser shortcuts working.
         */

        if (
            event.ctrlKey ||
            event.metaKey ||
            event.altKey
        ) {
            return;
        }


        /* ---------------------------------------------
           ENTER
        --------------------------------------------- */

        if (event.key === "Enter") {

            event.preventDefault();

            performSearch();

            return;
        }


        /* ---------------------------------------------
           BACKSPACE
        --------------------------------------------- */

        if (event.key === "Backspace") {

            event.preventDefault();


            const start =
                searchInput.selectionStart;

            const end =
                searchInput.selectionEnd;


            if (start !== end) {

                originalText =
                    originalText.slice(0, start) +
                    originalText.slice(end);

                brokenText =
                    brokenText.slice(0, start) +
                    brokenText.slice(end);

            } else if (start > 0) {

                originalText =
                    originalText.slice(0, start - 1) +
                    originalText.slice(start);

                brokenText =
                    brokenText.slice(0, start - 1) +
                    brokenText.slice(start);
            }


            updateSearchInput();

            updateDamageMeter();


            const position =
                Math.max(
                    0,
                    start - 1
                );


            searchInput.focus();

            searchInput.setSelectionRange(
                position,
                position
            );


            return;
        }


        /* ---------------------------------------------
           DELETE
        --------------------------------------------- */

        if (event.key === "Delete") {

            event.preventDefault();


            const start =
                searchInput.selectionStart;

            const end =
                searchInput.selectionEnd;


            if (start !== end) {

                originalText =
                    originalText.slice(0, start) +
                    originalText.slice(end);

                brokenText =
                    brokenText.slice(0, start) +
                    brokenText.slice(end);

            } else {

                originalText =
                    originalText.slice(0, start) +
                    originalText.slice(start + 1);

                brokenText =
                    brokenText.slice(0, start) +
                    brokenText.slice(start + 1);
            }


            updateSearchInput();

            updateDamageMeter();


            searchInput.focus();

            searchInput.setSelectionRange(
                start,
                start
            );


            return;
        }


        /* ---------------------------------------------
           NAVIGATION KEYS
        --------------------------------------------- */

        if (

            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowDown" ||
            event.key === "Home" ||
            event.key === "End"

        ) {

            return;
        }


        /* ---------------------------------------------
           MODIFIER KEYS
        --------------------------------------------- */

        if (

            event.key === "Shift" ||
            event.key === "CapsLock" ||
            event.key === "Control" ||
            event.key === "Alt" ||
            event.key === "Tab"

        ) {

            return;
        }


        /* ---------------------------------------------
           NORMAL CHARACTER
        --------------------------------------------- */

        if (event.key.length === 1) {

            event.preventDefault();


            const start =
                searchInput.selectionStart;

            const end =
                searchInput.selectionEnd;


            const physicalCharacter =
                event.key;


            const glitchCharacter =
                convertCharacter(
                    physicalCharacter
                );


            originalText =
                originalText.slice(0, start) +
                physicalCharacter +
                originalText.slice(end);


            brokenText =
                brokenText.slice(0, start) +
                glitchCharacter +
                brokenText.slice(end);


            updateSearchInput();

            updateDamageMeter();


            const position =
                start + 1;


            searchInput.focus();

            searchInput.setSelectionRange(
                position,
                position
            );
        }
    }
);


/* =====================================================
   SEARCH
===================================================== */

function performSearch() {

    const query =
        brokenText.trim();


    if (!query) {

        searchInput.focus();

        return;
    }


    const encodedQuery =
        encodeURIComponent(query);


    const googleURL =
        "https://www.google.com/search?q=" +
        encodedQuery;


    window.open(
        googleURL,
        "_blank",
        "noopener,noreferrer"
    );
}


searchButton.addEventListener(
    "click",
    performSearch
);


/* =====================================================
   CLEAR SEARCH
===================================================== */

clearButton.addEventListener(
    "click",
    function() {

        originalText = "";

        brokenText = "";

        keyboardHealth = 100;


        updateSearchInput();

        updateDamageMeter();


        searchInput.focus();
    }
);


/* =====================================================
   GAME ELEMENTS
===================================================== */

const targetWordElement =
    document.getElementById("targetWord");

const gameInput =
    document.getElementById("gameInput");

const gameOutput =
    document.getElementById("gameOutput");

const gameFeedback =
    document.getElementById("gameFeedback");

const timerElement =
    document.getElementById("timer");

const scoreElement =
    document.getElementById("score");

const wordsCompletedElement =
    document.getElementById("wordsCompleted");

const mistakesElement =
    document.getElementById("mistakes");

const startGameButton =
    document.getElementById("startGameButton");

const stopGameButton =
    document.getElementById("stopGameButton");

const restartGameButton =
    document.getElementById("restartGameButton");

const gameMessage =
    document.getElementById("gameMessage");


/* =====================================================
   GAME WORDS
=====================================================

   These words only contain letters supported
   by the GlitchSearch mapping.
===================================================== */

const gameWords = [

    "hello",
    "world",
    "glitch",
    "search",
    "keyboard",
    "computer",
    "browser",
    "website",
    "typing",
    "broken",
    "digital",
    "random",
    "screen",
    "orange",
    "future",
    "system",
    "signal",
    "button",
    "pixel",
    "cursor",
    "network",
    "challenge",
    "machine",
    "speed",
    "chaos",
    "program",
    "creative",
    "experiment"

];


/* =====================================================
   GAME VARIABLES
===================================================== */

let currentWord = "";

let currentBrokenInput = "";

let gameRunning = false;

let score = 0;

let wordsCompleted = 0;

let mistakes = 0;

let startTime = 0;

let timerInterval = null;

let completionInProgress = false;


/* =====================================================
   RANDOM WORD
===================================================== */

function getRandomWord() {

    let word;


    do {

        word =
            gameWords[
                Math.floor(
                    Math.random() *
                    gameWords.length
                )
            ];

    } while (
        word === currentWord &&
        gameWords.length > 1
    );


    return word;
}


/* =====================================================
   GET INVERSE KEY
=====================================================

   This is not displayed to the player.

   It simply lets us verify that the target
   can be produced by the physical keyboard.
===================================================== */

function getPhysicalKeyForTarget(targetCharacter) {

    const lowerTarget =
        targetCharacter.toLowerCase();


    for (
        const physicalKey in brokenKeyMap
    ) {

        if (
            brokenKeyMap[physicalKey] ===
            lowerTarget
        ) {

            return physicalKey;
        }
    }


    return null;
}


/* =====================================================
   START TIMER
===================================================== */

function startTimer() {

    stopTimer();


    startTime =
        performance.now();


    timerInterval =
        setInterval(
            function() {

                if (!gameRunning) {
                    return;
                }


                const elapsed =
                    performance.now() -
                    startTime;


                timerElement.textContent =
                    (elapsed / 1000).toFixed(2);

            },
            10
        );
}


/* =====================================================
   STOP TIMER
===================================================== */

function stopTimer() {

    if (timerInterval !== null) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;
    }
}


/* =====================================================
   ELAPSED TIME
===================================================== */

function getElapsedTime() {

    return (
        performance.now() -
        startTime
    ) / 1000;
}


/* =====================================================
   LOAD NEW TARGET
===================================================== */

function loadNewWord() {

    currentWord =
        getRandomWord();


    /*
     * This is the target OUTPUT.

     * The player must physically press
     * the correct keys to produce it.
     */

    targetWordElement.textContent =
        currentWord;


    currentBrokenInput = "";

    gameInput.value = "";

    gameOutput.textContent =
        "Nothing yet...";


    gameFeedback.textContent =
        "Figure out the physical keys";


    completionInProgress = false;


    if (gameRunning) {

        gameInput.focus();
    }
}


/* =====================================================
   START GAME
===================================================== */

function startGame() {

    stopTimer();


    gameRunning = true;

    completionInProgress = false;


    score = 0;

    wordsCompleted = 0;

    mistakes = 0;


    scoreElement.textContent =
        "0";

    wordsCompletedElement.textContent =
        "0";

    mistakesElement.textContent =
        "0";

    timerElement.textContent =
        "00.00";


    gameMessage.textContent =
        "";


    startGameButton.classList.add(
        "hidden"
    );


    stopGameButton.classList.remove(
        "hidden"
    );


    restartGameButton.classList.remove(
        "hidden"
    );


    loadNewWord();


    startTimer();


    setTimeout(
        function() {

            if (gameRunning) {

                gameInput.focus();
            }

        },
        50
    );
}


/* =====================================================
   STOP GAME
===================================================== */

function stopGame() {

    if (!gameRunning) {
        return;
    }


    /*
     * Stop game FIRST.
     */

    gameRunning = false;


    /*
     * Stop timer.
     */

    stopTimer();


    /*
     * Remove keyboard focus.
     */

    gameInput.blur();


    stopGameButton.classList.add(
        "hidden"
    );


    startGameButton.classList.remove(
        "hidden"
    );


    restartGameButton.classList.remove(
        "hidden"
    );


    targetWordElement.textContent =
        "STOPPED";


    gameOutput.textContent =
        "Game stopped";


    gameFeedback.textContent =
        "Press START to play again";


    gameMessage.textContent =
        "Final score: " + score;
}


/* =====================================================
   GAME INPUT KEYDOWN
=====================================================

   IMPORTANT:

   The game listens directly to keydown.

   The browser does NOT first insert the
   physical character.

   Instead we transform the physical key
   ourselves and build the output.
===================================================== */

gameInput.addEventListener(
    "keydown",
    function(event) {

        if (!gameRunning) {

            event.preventDefault();

            return;
        }


        /*
         * Keep Ctrl/Cmd shortcuts available.
         */

        if (
            event.ctrlKey ||
            event.metaKey ||
            event.altKey
        ) {

            return;
        }


        /* ---------------------------------------------
           BACKSPACE
        --------------------------------------------- */

        if (event.key === "Backspace") {

            event.preventDefault();


            if (
                currentBrokenInput.length > 0
            ) {

                currentBrokenInput =
                    currentBrokenInput.slice(
                        0,
                        -1
                    );
            }


            gameInput.value =
                currentBrokenInput;


            updateGameOutput();


            return;
        }


        /* ---------------------------------------------
           DELETE
        --------------------------------------------- */

        if (event.key === "Delete") {

            event.preventDefault();

            return;
        }


        /* ---------------------------------------------
           ENTER
        --------------------------------------------- */

        if (event.key === "Enter") {

            event.preventDefault();

            return;
        }


        /* ---------------------------------------------
           ARROW / NAVIGATION KEYS
        --------------------------------------------- */

        if (

            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowDown" ||
            event.key === "Home" ||
            event.key === "End"

        ) {

            event.preventDefault();

            return;
        }


        /* ---------------------------------------------
           MODIFIER KEYS
        --------------------------------------------- */

        if (

            event.key === "Shift" ||
            event.key === "Control" ||
            event.key === "Alt" ||
            event.key === "CapsLock" ||
            event.key === "Tab"

        ) {

            return;
        }


        /* ---------------------------------------------
           NORMAL PHYSICAL KEY
        --------------------------------------------- */

        if (event.key.length === 1) {

            event.preventDefault();


            const physicalKey =
                event.key;


            /*
             * Convert the physical key through
             * the broken keyboard.
             */

            const glitchCharacter =
                convertCharacter(
                    physicalKey
                );


            /*
             * Add the transformed character.
             */

            currentBrokenInput +=
                glitchCharacter;


            /*
             * Show the transformed output.
             */

            gameInput.value =
                currentBrokenInput;


            updateGameOutput();


            /*
             * Check the player's guess.
             */

            checkGameProgress();
        }

    }
);


/* =====================================================
   UPDATE GAME OUTPUT
===================================================== */

function updateGameOutput() {

    if (
        currentBrokenInput.length === 0
    ) {

        gameOutput.textContent =
            "Nothing yet...";

        return;
    }


    gameOutput.textContent =
        currentBrokenInput;


    /*
     * Small glitch animation.
     */

    gameOutput.classList.remove(
        "shake"
    );


    void gameOutput.offsetWidth;


    gameOutput.classList.add(
        "shake"
    );
}


/* =====================================================
   CHECK GAME PROGRESS
===================================================== */

function checkGameProgress() {

    /*
     * Don't check after the game has stopped.
     */

    if (!gameRunning) {
        return;
    }


    const target =
        currentWord;


    const typed =
        currentBrokenInput;


    /* ---------------------------------------------
       WRONG CHARACTER
    --------------------------------------------- */

    for (
        let i = 0;
        i < typed.length;
        i++
    ) {

        if (
            typed[i].toLowerCase() !==
            target[i]?.toLowerCase()
        ) {

            mistakes++;


            mistakesElement.textContent =
                mistakes;


            gameFeedback.textContent =
                "✕ Wrong glitch! Use Backspace and try again.";


            shakeGameOutput();


            return;
        }
    }


    /* ---------------------------------------------
       PARTIALLY CORRECT
    --------------------------------------------- */

    if (
        typed.length <
        target.length
    ) {

        gameFeedback.textContent =
            typed.length +
            " / " +
            target.length +
            " correct";

        return;
    }


    /* ---------------------------------------------
       PERFECT MATCH
    --------------------------------------------- */

    if (
        typed.toLowerCase() ===
        target.toLowerCase()
    ) {

        completeWord();
    }
}


/* =====================================================
   SHAKE OUTPUT
===================================================== */

function shakeGameOutput() {

    gameOutput.classList.remove(
        "shake"
    );


    void gameOutput.offsetWidth;


    gameOutput.classList.add(
        "shake"
    );
}


/* =====================================================
   COMPLETE WORD
===================================================== */

function completeWord() {

    if (
        completionInProgress ||
        !gameRunning
    ) {

        return;
    }


    completionInProgress = true;


    const timeTaken =
        getElapsedTime();


    wordsCompleted++;


    /*
     * Score based on word length and speed.
     */

    const basePoints =
        currentWord.length * 10;


    const speedBonus =
        Math.max(
            0,
            Math.round(
                100 - timeTaken * 5
            )
        );


    const points =
        basePoints +
        speedBonus;


    score += points;


    scoreElement.textContent =
        score;


    wordsCompletedElement.textContent =
        wordsCompleted;


    gameFeedback.textContent =
        "✓ PERFECT GLITCH!";


    gameMessage.textContent =
        "+" + points + " points";


    /*
     * Give the player the congratulations alert.
     */

    setTimeout(
        function() {

            if (!gameRunning) {
                return;
            }


            alert(
                "🎉 CONGRATULATIONS!\n\n" +
                "You produced:\n" +
                currentWord.toUpperCase() +
                "\n\n" +
                "Time taken: " +
                timeTaken.toFixed(2) +
                " seconds\n\n" +
                "Points earned: +" +
                points +
                "\n\n" +
                "Now try the next word!"
            );


            /*
             * If the player did not stop
             * the game while the alert
             * was open, continue.
             */

            if (gameRunning) {

                loadNewWord();
            }

        },
        50
    );
}


/* =====================================================
   RESTART GAME
===================================================== */

restartGameButton.addEventListener(
    "click",
    function() {

        startGame();
    }
);


/* =====================================================
   START GAME BUTTON
===================================================== */

startGameButton.addEventListener(
    "click",
    function() {

        if (!gameRunning) {

            startGame();
        }
    }
);


/* =====================================================
   STOP GAME BUTTON
===================================================== */

stopGameButton.addEventListener(
    "click",
    function() {

        stopGame();
    }
);


/* =====================================================
   OPEN GAME
===================================================== */

gameButton.addEventListener(
    "click",
    function() {

        /*
         * Make absolutely sure that
         * no old game is running.
         */

        gameRunning = false;

        stopTimer();


        /*
         * Switch interface.
         */

        searchInterface.classList.add(
            "hidden"
        );

        gameInterface.classList.remove(
            "hidden"
        );


        /*
         * Reset game display.
         */

        targetWordElement.textContent =
            "READY?";


        gameInput.value = "";

        currentBrokenInput = "";


        gameOutput.textContent =
            "Nothing yet...";


        gameFeedback.textContent =
            "Press START to begin";


        timerElement.textContent =
            "00.00";


        scoreElement.textContent =
            "0";


        wordsCompletedElement.textContent =
            "0";


        mistakesElement.textContent =
            "0";


        gameMessage.textContent =
            "";


        startGameButton.classList.remove(
            "hidden"
        );


        stopGameButton.classList.add(
            "hidden"
        );


        restartGameButton.classList.add(
            "hidden"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


/* =====================================================
   BACK TO SEARCH
===================================================== */

backButton.addEventListener(
    "click",
    function() {

        /*
         * Completely stop the game.
         */

        gameRunning = false;

        stopTimer();

        gameInput.blur();


        /*
         * Switch back.
         */

        gameInterface.classList.add(
            "hidden"
        );

        searchInterface.classList.remove(
            "hidden"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        searchInput.focus();
    }
);


/* =====================================================
   INITIALIZE SEARCH
===================================================== */

updateSearchInput();

updateDamageMeter();

searchInput.focus();