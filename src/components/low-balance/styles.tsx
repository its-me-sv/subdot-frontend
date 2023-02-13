import styled from "styled-components";

export const Text = styled.span<{dark: boolean}>`
    font-family: Inter;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 0.42rem;
    color: #1a1a1a;
    ${props => props.dark && `
        color: #f5f4f9;
    `}
    a {
        text-decoration: underline;
        color: #1a1a1a;
        ${props => props.dark && `
            color: #f5f4f9;
        `}
    }
`;
