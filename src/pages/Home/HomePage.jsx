import Page from "../../shared/ui/page/Page"


const HomePage = () => {
    const title = 'Домашняя страница'

    return (
        <Page title={title}>
            <p style={{alignSelf: 'center'}}>Это домашная страница!</p>
            <span style={{padding: '15px'}}>Здесь будут собираться и храниться все лабораторные работы по Системному анализу. Каждая ЛР будет выделена в отдельную ссылку в шапке данного сайта. Все ЛР будут реализованы на React-JS</span>
        </Page>
    )
}

export default HomePage