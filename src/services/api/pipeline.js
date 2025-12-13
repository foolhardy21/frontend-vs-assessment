import Api, { API_CONFIG } from "../config"

const API_URL = API_CONFIG.BASE_URL + "/pipelines"

async function sendPipeline(payload) {
    try {
        const res = await Api.post(API_URL + "/parse", payload)
        return res
    } catch (err) {
        throw err
    }
}

export const pipelineApi = {
    sendPipeline,
}