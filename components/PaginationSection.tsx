import React from "react";
import Router from "next/router";
import PaginationButton from "./PaginationButton";

export type PaginationSectionProps = {
    currentPage: number;
    pageCount: number;
    hintCount: number;
};

const PaginationSection: React.FC<PaginationSectionProps> = (props) => {
    const firstIndex = Math.max(1, props.currentPage - props.hintCount);
    const lastIndex = Math.min(props.pageCount, props.currentPage + props.hintCount);
    return (
        <div className="pagination-container">
            {props.currentPage != 1 ?
                <button className="pagination-first-page pagination-nav-buttton" onClick={() => Router.push("/feed/[page_num]", `/feed/${1}`)}>{`<<`}</button> : ''}
            {props.currentPage != 1 ?
                <button className="pagination-back pagination-nav-buttton" onClick={() => Router.push("/feed/[page_num]", `/feed/${props.currentPage - 1}`)}>{`<`}</button> : ''}
            {(new Array(lastIndex - firstIndex + 1)).fill(1).map((_, i) =>
                <div className="pagination-button-container-container" key={firstIndex + i}>
                    <PaginationButton isSelected={firstIndex + i == props.currentPage} page={firstIndex + i}></PaginationButton>
                </div>
            )}
            {props.currentPage != props.pageCount ?
                <button className="pagination-forward pagination-nav-buttton" onClick={() => Router.push("/feed/[page_num]", `/feed/${props.currentPage + 1}`)}>{`Next Page >`}</button> : ''}
            <style jsx>{`
                .pagination-container {
                    margin: 2rem auto;
                    width:fit-content;
                    display:flex;      
                    height:2rem;  
                    border: 1px solid gray;
                    border-radius: 2px;
                }
                .pagination-button-container-container:not(:first-child){
                    border-left:1px solid gray;
                }
                .pagination-nav-buttton{
                    padding:0 0.5rem;
                    border:none;
                    background:inherit; 
                }
                .pagination-forward{
                    border-left:1px solid gray;
                }
      `}</style>
        </div>
    );
};

export default PaginationSection;
