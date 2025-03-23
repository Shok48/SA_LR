import PropTypes from "prop-types"
import { convertGraphToAdjacencyMatrix as GraphToAbjMatrix } from "../../utils/GraphUtils"
import { Table, Tag, Tooltip } from "antd";
import 'antd/dist/reset.css'

export const AbjacencyMatrix = ({graph, headers = null, title = 'Матрица смежности'}) => {
    const matrix = GraphToAbjMatrix(graph)
    headers = headers || graph.nodes.map((_, i) => `V${i + 1}`)

    const dataSource = matrix.map((row, rowIndex) => ({
        key: `row-${rowIndex}`,
        vertex: headers ? headers[rowIndex] : `V${rowIndex + 1}`,
        ...row.reduce((acc, value, colIndex) => {
            acc[`col-${colIndex}`] = value;
            return acc;
        }, {})
    }))

    const columns = [
        {
            title: title,
            dataIndex: 'vertex',
            key: 'vertex',
            render: (text) => <Tag color="blue">{text}</Tag>
        },
        ...headers.map((header, colIndex) => ({
            title: header,
            dataIndex: `col-${colIndex}`,
            key: `col-${colIndex}`,
            render: (value, record) => (
                <Tooltip title={value === 1 ? `Дуга: ${record.vertex} → ${header}` : ''}>
                    <Tag color={value === 1 ? 'green' : 'default'}>{value}</Tag>
                </Tooltip>
            )
        }))
    ]

    return (
        <Table 
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
        />
    )
}

AbjacencyMatrix.propTypes = {
    graph: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.number).isRequired,
        edges: PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.number).isRequired
        ).isRequired
    }).isRequired,
    headers: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
}