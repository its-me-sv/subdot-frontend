import styled from "styled-components";

export const Text = styled.span<{dark: boolean}>`
    font-family: Inter;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 0.42rem;
    color: #222222;
    ${props => props.dark && `
        color: #ffffff;
    `}
    a {
        text-decoration: underline;
        color: #222222;
        ${props => props.dark && `
            color: #ffffff;
        `}
    }
`;
