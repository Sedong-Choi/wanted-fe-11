import styled from "@emotion/styled"

export const FormLayout = ({ children }) => {
    return <Layout>
        {children}
    </Layout>
}

const Layout = styled.div(`
    display: flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    min-height: 100vh;
    `)