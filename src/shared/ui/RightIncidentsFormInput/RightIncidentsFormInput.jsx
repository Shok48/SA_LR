import { PropTypes } from 'prop-types'
import styles from './RightIncidentsFormInput.module.css'
import { useState } from 'react'
import { Space } from 'antd'

export const RightIncidentsFormInput = ({onFormSubmit}) => {
    const [input, setInput] = useState({1: [1, 2, 3]})

    const InputSelect = () => {
        
    }

    return (
        <form className={styles.form}>
            <label>Множество правых инциденций (G<sup>+</sup>)</label>
            {
                Object.entries(input).map(([node, incidents]) => (
                    <div key={node} style={{alignSelf:'start'}}>
                        <Space>
                            <span>{node} &larr; &#123;</span>

                            {
                                incidents.map((incident, index) => (
                                    <InputSelect/>
                                ))
                            
                            }
                            <span>&#125;</span>
                        </Space>
                    </div>
                ))
            }
        </form>
    )
}

RightIncidentsFormInput.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
}