import Page from "../../shared/ui/page/Page"
import { RightIncidentsFormInput } from "../../shared/ui/RightIncidentsFormInput/RightIncidentsFormInput";

export const DecompositionPage = () => {
    const title = 'Лабораторная работа №3';
    const subTitle = 'Декомпозиция графа';

    return (
        <Page title={title} subTitle={subTitle}>
            <RightIncidentsFormInput />
        </Page>
    )
}