import React from "react"
import styled from "styled-components"
import { CommentResponse } from "../../apis/reports/type"

interface Props {
    comments: CommentResponse[]
}

export const CommentList: React.FC<Props> = ({ comments }) => {
    if (!comments.length)
        return <NoComments>등록된 코멘트가 없습니다.</NoComments>

    return (
        <ListContainer>
            {comments.map((comment) => (
                <CommentCard key={comment.report_answer_id}>
                    <CommentMeta>
                        <CommentDate>
                            {comment.created_at.slice(0, 10)}
                        </CommentDate>
                        <CommentState>{comment.state}</CommentState>
                    </CommentMeta>

                    <CommentBody>
                        {comment.answer
                            .replace(/\\n/g, "\n")
                            .split("\n")
                            .map((line, idx, arr) => (
                                <span key={idx}>
                                    {line}
                                    {idx < arr.length - 1 && <br />}
                                </span>
                            ))}
                    </CommentBody>
                </CommentCard>
            ))}
        </ListContainer>
    )
}

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const CommentCard = styled.div`
    border: 1px solid #f2f2f2;
    padding: 12px;
    border-radius: 8px;
    background: #fff;
`

const CommentMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`

const CommentDate = styled.span`
    color: #999;
    font-size: 13px;
`

const CommentState = styled.span`
    font-size: 13px;
    color: #666;
`

const CommentBody = styled.div`
    color: #333;
    font-size: 14px;
    white-space: pre-wrap;
`

const NoComments = styled.p`
    color: #888;
    font-size: 14px;
    margin-top: 8px;
    text-align: center;
`
