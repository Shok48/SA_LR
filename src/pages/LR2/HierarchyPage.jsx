import { useState, useEffect } from "react"
import Page from "../../shared/ui/page/Page"
import { LeftistIncidentsFormInput } from "../../shared/ui/LeftistIncidentsFormInput/LeftistIncidentsFormInput"
import { convertLeftIncidentsToGraph as convertLeftToGraph, orderFunction } from "../../shared/utils/GraphUtils"
import { AbjacencyMatrix } from "../../shared/ui/AdjacencyMatrix/AbjacencyMatrix"

export const HierarchyPage = () => {
    const title = 'Лабораторная работа №2'
    const subTitle = 'Построение иерархии классов'
    const [graph, setGraph] = useState({ nodes: [], edges: []})
    const [orderedGraph, setOrderedGraph] = useState(null)

    const handleFormSubmit = (leftInc) => {
        setGraph(convertLeftToGraph(leftInc))
    }

    useEffect(() => {
        console.log("Основной граф:", graph);
    }, [graph])

    useEffect(() => {
        if (graph.nodes.length > 0 && graph.edges.length > 0) {
            const orderedGraph = orderFunction(graph);
            setOrderedGraph(orderedGraph);
        }
    }, [graph]);

    useEffect(() => {
        if (orderedGraph) {
            console.log("Граф после применения алгоритма с mapping:", orderedGraph);
        }
    }, [orderedGraph]);

    return (
        <Page title={title} subTitle={subTitle}>
            <LeftistIncidentsFormInput onFormSubmit={handleFormSubmit} />

           
            {
                graph.nodes.length > 0 && graph.edges.length > 0 
                    && <AbjacencyMatrix 
                            graph={graph}
                            title="Матрица смежности исходного графа"
                        />
            }

            {orderedGraph?.newGraph && (
                <AbjacencyMatrix
                    graph={orderedGraph.newGraph}
                    title="Матрица смежности иерархического графа"
                    headers={Object
                                .entries(orderedGraph.mapping)
                                .sort(([, newNum1], [, newNum2]) => newNum1 - newNum2)
                                .map(([oldNum, newNum]) => {return `V${newNum}' (V${oldNum})`})
                            }
                />
            )}

            
        </Page>
    )
}