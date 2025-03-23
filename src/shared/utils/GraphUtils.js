export const convertLeftIncidentsToGraph = (leftIncidents) => {
    const nodes = Object.keys(leftIncidents).map(Number);
    const edges = Object.entries(leftIncidents).flatMap(([node, neighbors]) =>
        neighbors.map(Number).map(neighbor => ({ from: neighbor, to: +node }))
    );
    return { nodes, edges };
};

export const convertGraphToLeftIncidents = ({ nodes, edges }) => {
    return edges.reduce((acc, { from, to }) => {
        if (!acc[from]) acc[from] = [];
        acc[from].push(to);
        return acc;
    }, Object.fromEntries(nodes.map(node => [node, []])));
};

export const convertGraphToRightIncidents = ({ nodes, edges }) => {
    return edges.reduce((acc, { from, to }) => {
        if (!acc[to]) acc[to] = [];
        acc[to].push(from);
        return acc;
    }, Object.fromEntries(nodes.map(node => [node, []])));
};

export const convertGraphToAdjacencyMatrix = ({ nodes, edges }) => {
    const nodeIndex = Object.fromEntries(nodes.map((node, index) => [node, index]));
    const matrix = Array.from({ length: nodes.length }, () => 
        Array.from({ length: nodes.length }, () => 0)
    );

    edges.forEach(({ from, to }) => {
        matrix[nodeIndex[from]][nodeIndex[to]] = 1;
    });

    return matrix;
};

export const convertGraphToIncidenceMatrix = ({ nodes, edges }) => {
    const nodeIndex = Object.fromEntries(nodes.map((node, index) => [node, index]));
    const matrix = Array.from({ length: nodes.length }, () => 
        Array.from({ length: edges.length }, () => 0)
    );

    edges.forEach(({ from, to }, edgeIndex) => {
        matrix[nodeIndex[from]][edgeIndex] = -1;
        matrix[nodeIndex[to]][edgeIndex] = 1;
    });

    return matrix;
};

export const orderFunction = (graph) => {
    const { nodes, edges } = graph;
    const HL = []; // Иерархические уровни
    const usedV = new Set(); // Используем множество для быстрого поиска
    let notUsedV = new Set(nodes); // Оставшиеся вершины

    // Подсчитываем входящие рёбра для каждой вершины
    const inDegree = new Map(nodes.map(node => [node, 0]));
    for (const edge of edges) {
        inDegree.set(edge.to, (inDegree.get(edge.to) || 0) + 1);
    }

    // Шаг 1: Формирование уровней
    while (notUsedV.size > 0) {
        const currentLevel = [];
        for (const vertex of notUsedV) {
            let k = inDegree.get(vertex);
            for (const edge of edges) {
                if (usedV.has(edge.from) && edge.to === vertex) {
                    k--;
                }
            }
            if (k === 0) currentLevel.push(vertex);
        }

        if (currentLevel.length === 0) break; // Защита от бесконечного цикла (циклы в графе)

        HL.push({ level: currentLevel });
        for (const vertex of currentLevel) {
            usedV.add(vertex);
            notUsedV.delete(vertex);
        }
    }

    console.log('Уровни', HL)

    // Шаг 2: Перенумерация вершин
    const vertexToNewId = new Map();
    let newId = 1;
    for (const level of HL) {
        for (const vertex of level.level) {
            vertexToNewId.set(vertex, newId++);
        }
    }

    // Шаг 3: Обновление рёбер
    const newEdges = edges.map(edge => ({
        from: vertexToNewId.get(edge.from),
        to: vertexToNewId.get(edge.to),
    }));

    // Шаг 4: Формирование нового графа
    const newGraph = {
        nodes: Array.from(vertexToNewId.values()),
        edges: newEdges,
    };

    return {
        newGraph,
        mapping: Object.fromEntries(vertexToNewId),
    };
}