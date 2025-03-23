import styles from './Page.module.css'
import { PropTypes } from 'prop-types'

const Page = ({ title, subTitle, children}) => {
    return (
        <div className={styles.page}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subTitle}>{subTitle}</h3>
            {children}
        </div>
    )
}

Page.prototype = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    children: PropTypes.node
}

export default Page