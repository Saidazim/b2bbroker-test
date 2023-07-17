/// <reference lib="webworker" />

let timer: any = null;
let timerValue = 1000; // Default to 1 second
let arraySize = 10; // Default size

const generateData = () => {
    const data = [];
    for (let i = 0; i < arraySize; i++) {
        // Generate unique id using current time and a random number
        const id = `id_${Date.now()}_${Math.random()}`;

        // Generate random int, float and color values
        const int = Math.floor(Math.random() * 100);
        const float = parseFloat((Math.random() * 100).toFixed(18));
        const colors = ['red', 'green', 'blue', 'yellow', 'black', 'white'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Generate child object
        const child = {
            id: `child_${Date.now()}_${Math.random()}`,
            color: colors[Math.floor(Math.random() * colors.length)]
        };

        data.push({ id, int, float, color, child });
    }

    return data;
};

const startTimer = () => {
    if (timer) {
        clearInterval(timer);
    }

    timer = setInterval(() => {
        const data = generateData();
        postMessage(data);
    }, timerValue);
};

startTimer();

onmessage = (event) => {
    const { timerValue: newTimerValue, arraySize: newArraySize } = event.data;

    if (newTimerValue) {
        timerValue = newTimerValue;
        startTimer();
    }

    if (newArraySize) {
        arraySize = newArraySize;
    }
};
