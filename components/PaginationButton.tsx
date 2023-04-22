import React from "react";
import Router from "next/router";

export type PaginationButtonProps = {
    page: number;
    isSelected: boolean;
};

const PaginationButton: React.FC<PaginationButtonProps> = (props) => {
    return (
        <div className="pagination-page-buttton-container">
            <button className={props.isSelected ? "pagination-page-buttton selected" : "pagination-page-buttton"} onClick={() => Router.push("/feed/[page_num]", `/feed/${props.page}`)}>{props.page}</button>
            <style jsx>{`
                .pagination-page-buttton-container{
                    height:100%;
                }
                .pagination-page-buttton {
                    min-width: 2.5rem;
                    height:100%;
                    border:none;
                    background:inherit;
                }
                .pagination-page-buttton.selected{
                    background: gray;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default PaginationButton;
