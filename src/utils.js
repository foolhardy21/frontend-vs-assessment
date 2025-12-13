export const DRAGGABLE_NODES = [
    { type: "customInput", label: "Input" },
    { type: "llm", label: "LLM" },
    { type: "customOutput", label: "Output" },
    { type: "text", label: "Text" },
    { type: "file", label: "File" },
    { type: "image", label: "Image" },
    { type: "openai", label: "OpenAI" },
    { type: "agent", label: "Agent" },
    { type: "transformation", label: "Transformation" },
]

export const HANDLES_CONFIG = {
    input: [
        { type: "source", position: "Right", style: {}, idSuffix: "value" },
    ],
    llm: [
        { type: "target", position: "Left", style: { top: `${100 / 3}%` }, idSuffix: "system" },
        { type: "target", position: "Left", style: { top: `${200 / 3}%` }, idSuffix: "prompt" },
        { type: "source", position: "Right", style: {}, idSuffix: "response" },
    ],
    output: [
        { type: "target", position: "Left", idSuffix: "value", style: {} }
    ],
    text: [
        { type: "source", position: "Right", idSuffix: "output", style: {} },
    ],
    file: [
        { type: "source", position: "Right", idSuffix: "file", style: {} },
    ],
    agent: [
        { type: "target", position: "Left", idSuffix: "agent", style: {} },
        { type: "source", position: "Right", idSuffix: "agent", style: {} },
    ],
    image: [
        { type: "target", position: "Left", idSuffix: "image", style: {} },
        { type: "source", position: "Right", idSuffix: "image", style: {} },
    ],
    openai: [
        { type: "target", position: "Left", idSuffix: "openai", style: {} },
        { type: "source", position: "Right", idSuffix: "openai", style: {} },
    ],
    transformation: [
        { type: "target", position: "Left", idSuffix: "transformation", style: {} },
        { type: "source", position: "Right", idSuffix: "transformation", style: {} },
    ],
}

