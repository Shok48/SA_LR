import Page from "../../shared/ui/page/Page";
import GraphInputForm from "./components/GraphInputForm/GraphInputForm";

const ConverterPage = () => {
    const title = 'Лабарторная работа №1'
    const subTitle = 'Перевод матрицы левых инциденций в матрицы смежности и инциденций'

    return(
        <Page title={title} subTitle={subTitle}>
            <GraphInputForm />
        </Page>
    )
}

export default ConverterPage;