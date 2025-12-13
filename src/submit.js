// submit.js

import { pipelineApi } from "./services/api/pipeline";
import { useStore } from "./store";

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }))

    async function handleSubmit() {
        try {
            const payload = { nodes, edges }
            const res = await pipelineApi.sendPipeline(payload)
            if (res.success) {
                const { num_nodes, num_edges, is_dag } = res.data
                alert(`Pipeline Assessed successfully! It has ${num_nodes} node${num_nodes > 1 ? "s" : ""}, ${num_edges} edge${num_edges > 1 ? "s" : ""} and is ${is_dag ? "not" : ""} cyclic in nature.`)
            }
        } catch (err) {
            console.log("Error sending the pipeline data:", err)
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
