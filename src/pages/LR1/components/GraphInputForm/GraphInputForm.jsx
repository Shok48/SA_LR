import { useState } from 'react';
import styles from './GraphInputForm.module.css';

const GraphInputForm = () => {
    const [input, setInput] = useState('');

    const onInputChange = (e) => {
        const value = e.target.value;
        const regex = /^[0-9,: \n]*$/
        if (regex.test(value)) {
            setInput(value);
        }
    };

    return (
        <form className={styles.form}>
            <label htmlFor="graphInput">Множество левых инцидентностей (G<sup>-</sup>):</label>
            <textarea
                name="graphInput"
                id="graphInput"
                className={styles.textarea}
                placeholder={'1: 2, 4\n2: \n3: 1'}
                value={input}
                onChange={onInputChange}
            />
            <button>Преобразовать</button>
            <div className={styles['save_load-section']}>
                <button>Сохранить в JSON</button>
                <input type="file" name="" id="" />
                <button>Загрузить из JSON</button>
            </div>
        </form>
    );
};

export default GraphInputForm;