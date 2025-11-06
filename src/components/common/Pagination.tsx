import React from "react"
import styled from "styled-components"

interface PaginationProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    const groupSize = 5
    const currentGroup = Math.floor((currentPage - 1) / groupSize)
    const startPage = currentGroup * groupSize + 1
    const endPage = Math.min(startPage + groupSize - 1, totalPages)

    const pages = []
    for (let i = startPage; i <= endPage; i++) pages.push(i)

    const handlePrevGroup = () => {
        const prevGroupStart = Math.max(startPage - groupSize, 1)
        onPageChange(prevGroupStart)
    }

    const handleNextGroup = () => {
        const nextGroupStart = startPage + groupSize
        if (nextGroupStart <= totalPages) onPageChange(nextGroupStart)
    }

    return (
        <PaginationWrapper>
            <ArrowButton onClick={handlePrevGroup} disabled={startPage === 1}>
                &lt;
            </ArrowButton>

            {pages.map((p) => (
                <PageButton
                    key={p}
                    $active={p === currentPage}
                    onClick={() => onPageChange(p)}
                >
                    {p}
                </PageButton>
            ))}

            <ArrowButton
                onClick={handleNextGroup}
                disabled={endPage === totalPages}
            >
                &gt;
            </ArrowButton>
        </PaginationWrapper>
    )
}

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 24px;

    @media (max-width: 480px) {
        gap: 4px;
        margin-top: 16px;
    }
`

const PageButton = styled.button<{ $active?: boolean }>`
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    background: ${({ $active }) => ($active ? "#1860f0" : "transparent")};
    color: ${({ $active }) => ($active ? "#fff" : "#333")};
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
        background: #1860f0;
        color: white;
    }

    @media (max-width: 480px) {
        width: 26px;
        height: 26px;
        font-size: 13px;
        border-radius: 4px;
    }
`

const ArrowButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
    color: #333;
    opacity: 0.8;

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`
