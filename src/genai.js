// Generator Model from https://gitlab.com/genai-bot/generator-service

const START = "__start";
const END = "__end";
const keepCasePrefixes = ["http:", "https:", "<a:", "<:"];

function wordProcess(word) {
    for (let i = 0; i < keepCasePrefixes.length; i++) {
        if (word.startsWith(keepCasePrefixes[i])) return word;
    }
    return word.toLowerCase();
}

function buildModel(samples, keySize) {
    const model = new Map();

    for (const sample of samples) {
        const words = sample
            .split(/\s+/)
            .filter(Boolean)
            .map(wordProcess);

        if (!words.length) continue;

        const stream = [
            ...Array(keySize).fill(START),
            ...words,
            END
        ];

        let keyArr = stream.slice(0, keySize);

        for (let i = keySize; i < stream.length; i++) {
            const key = keyArr.join("|");
            const next = stream[i];

            let nextMap = model.get(key);
            if (!nextMap) {
                nextMap = new Map();
                model.set(key, nextMap);
            }

            nextMap.set(next, (nextMap.get(next) || 0) + 1);

            keyArr.shift();
            keyArr.push(next);
        }
    }

    return model;
}

function sampleWeighted(map) {
    let total = 0;
    for (const count of map.values()) total += count;

    let r = Math.random() * total;

    for (const [word, count] of map) {
        r -= count;
        if (r <= 0) return word;
    }
}

function generateText(model, maxLength, keySize, begin = "") {
    let currentKey;
    const resultWords = [];

    if (begin.length > 0) {
        const startWords = begin.split(/\s+/).map(wordProcess);

        if (startWords.length >= keySize) {
            currentKey = startWords.slice(-keySize);
        } else {
            currentKey = [
                ...Array(keySize - startWords.length).fill(START),
                ...startWords
            ];
        }

        resultWords.push(...startWords);
    } else {
        currentKey = Array(keySize).fill(START);
    }

    let currentLength = begin.length;

    while (true) {
        const key = currentKey.join("|");
        const nextMap = model.get(key);
        if (!nextMap) break;

        const nextWord = sampleWeighted(nextMap);
        if (!nextWord || nextWord === END) break;

        const extraLen =
            resultWords.length === 0
                ? nextWord.length
                : nextWord.length + 1;

        if (currentLength + extraLen > maxLength) break;

        resultWords.push(nextWord);
        currentLength += extraLen;

        currentKey.shift();
        currentKey.push(nextWord);
    }

    return resultWords.join(" ");
}

function generateFromModel(model, {
    maxLength = 1500,
    keySize = 1,
    attempts = 5,
    begin = "",
    count = 1
} = {}) {
    function generateAttempt() {
        for (let i = 0; i < attempts; i++) {
            const res = generateText(model, maxLength, keySize, begin);
            if (res.length > begin.length) return res;
        }
        return "Out of attempts";
    }

    const results = [];
    for (let i = 0; i < count; i++) {
        const r = generateAttempt();
        if (r.length) results.push(r);
    }

    return results;
}

function generate(samples, options = {}) {
    const { keySize = 1 } = options;
    const model = buildModel(samples, keySize);
    return generateFromModel(model, options);
}

module.exports = {
    buildModel,
    generateFromModel,
    generate
};