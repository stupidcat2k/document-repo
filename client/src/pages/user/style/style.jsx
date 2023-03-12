import styled from 'styled-components';

export const Scrollbar = styled.div`
    .ant-table-body {
        ::-webkit-scrollbar {
            width: 0.5rem;
            height: 0.5rem;
        }

        ::-webkit-scrollbar-track {
            background: ${props => props.theme.primaryColor};
            border-radius: 100vw;
            margin-block: 1rem;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #767676;
            border-radius: 100vw;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: ${props => props.theme.scrollbarThumbColor};
        }
    }
`