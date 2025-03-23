import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './LeftistIncidentsFormInput.module.css';

// const INPUT_REGEX = /^(?!.*\s{2})(?!.*::)(?!.*,,)[0-9\s,:\n]*$/;
const INPUT_REGEX = /^[0-9,: \n]*$/;

export const LeftistIncidentsFormInput = ({ onFormSubmit }) => {
    const [input, setInput] = useState('');
    const fileInputRef = useRef(null);

    const parseInput = (input) => {
        return input.split('\n').reduce((acc, line) => {
            const [node, neighbors] = line.split(':').map(str => str.trim());
            acc[+node] = neighbors ? neighbors.split(',').map(Number) : [];
            return acc;
        }, {});
    };

    const stringifyInput = (leftInc) => {
        return Object.entries(leftInc)
            .map(([node, neighbors]) => `${node}: ${neighbors.join(', ')}`)
            .join('\n');
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        if (INPUT_REGEX.test(value)) {
            setInput(value);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const leftInc = parseInput(input);
        if (leftInc) onFormSubmit(leftInc);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = ({ target: { result } }) => {
            try {
                const leftInc = JSON.parse(result);
                console.log('Множество левых инциденций загружено:', leftInc);
                setInput(stringifyInput(leftInc));
            } catch (error) {
                alert('Ошибка при загрузке файла: неверный формат JSON');
                console.error(error);
            }
        };
        reader.readAsText(file);
    };

    const handleFileSave = () => {
        if (!input.trim()) {
            alert('Поле ввода пустое');
            return;
        }

        const data = JSON.stringify(parseInput(input), null, 4);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'leftIncidents.json';
        link.click();
        
        URL.revokeObjectURL(url);
    };

    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <label htmlFor='textarea'>Введите множество левых инцидентов:</label>
            <textarea 
                id='textarea'
                className={styles.textarea}
                value={input}
                onChange={handleInputChange}
                placeholder={'1: 2, 3\n2: \n3: 1'}
            />

            <div className={styles.controls}>
                <button type='submit'>Преобразовать</button>

                <div className={styles.fileControls}>
                    <input 
                        type='file' 
                        style={{ display: 'none' }}
                        ref={fileInputRef} 
                        onChange={handleFileUpload}
                        accept='.json'
                    />
                    
                    <button type='button' onClick={handleFileSave} >Сохранить в JSON</button>
                    <button type='button' onClick={() => fileInputRef.current?.click()}>Загрузить из JSON</button>
                </div>
            </div>
        </form>
    );
};

LeftistIncidentsFormInput.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
};
