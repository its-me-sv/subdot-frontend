import styled from "styled-components";

export const Title = styled.span<{dark: boolean;}>`
    font-family: Inter;
    font-size: 1.2rem;
    align-self: center;
    margin-bottom: 1rem;
    color: #1a1a1a;
    ${props => props.dark && `
        color: #f5f4f9;
    `}
`;

export const Footer = styled.div`
    margin: 1.2rem 0rem;
    align-self: center;
`;
