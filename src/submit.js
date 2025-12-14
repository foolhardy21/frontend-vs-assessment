// submit.js

import { useState } from "react";
import { pipelineApi } from "./services/api/pipeline";
import { useStore } from "./store";

export const SubmitButton = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }))

    async function handleSubmit() {
        try {
            setIsSubmitting(true)
            const payload = { nodes, edges }
            const res = await pipelineApi.sendPipeline(payload)
            if (res.success) {
                const { num_nodes, num_edges, is_dag } = res.data
                alert(`Pipeline Parsed successfully! It has ${num_nodes} node${num_nodes > 1 ? "s" : ""}, ${num_edges} edge${num_edges > 1 ? "s" : ""} and is ${is_dag ? "not" : ""} cyclic in nature.`)
            }
        } catch (err) {
            console.log("Error sending the pipeline data:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <button
                disabled={isSubmitting}
                type="submit"
                onClick={handleSubmit}
                className="rounded border border-green-500 px-3 py-1 transition-all duration-200
                text-[12px] text-green-800 bg-green-100 hover:bg-green-200
                disabled:opacity-70
                "
            >
                Submit
            </button>
        </div>
    );
}
