const { parentPort, workerData } = require("worker_threads")

const { action, args } = workerData

async function main() {
    switch (action) {
        case "genai": {
            const genAi = require("./genai")
            const result = genAi(...args)
            return parentPort.postMessage(result)
        }
    
        case "spectrogram": {
            const spectrogram = require("./spectrogram")
            const result = await spectrogram(...args)
            return parentPort.postMessage(result)
        }

        case "decrypt-messages": {
            const { decrypt } = require("./functions")
            const [messages] = args
            const result = messages.map((m => ({ ...m, content: decrypt(m.content) })))
            return parentPort.postMessage(result)
        }
    }
}

main()