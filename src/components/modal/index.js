/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'

const ModalBox = ({onChange, onSubmit}) => {
    return (
        <div id="myModal" className="modal" css={css`
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);
        `}>
            <div className="modal-content" css={css`
                background-color: #fefefe;
                margin: 15% auto;
                padding: 20px;
                border: 1px solid #888;
                width: 80%;
                position: relative;
                background-color: #fefefe;
                margin: auto;
                padding: 0;
                border: 1px solid #888;
                width: 80%;
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
            `}>
                <div className="modal-header" css={css`
                    padding: 2px 16px;
                    background-color: #5cb85c;
                    color: white;
                `}>
                    <span className="close" css={css`
                        color: #aaa;
                        float: right;
                        font-size: 28px;
                        font-weight: bold;
                        &:hover,&:focus: {
                            color: black;
                            text-decoration: none;
                            cursor: pointer;
                        }
                    `}>&times;</span>
                    <h2>Modal Header</h2>
                </div>
                <div className="modal-body" css={css`
                    padding: 2px 16px;
                `}>
                    <form onSubmit={onSubmit.bind(this)}>
                        <label>
                            Enter Nickname
                            <input type="text" placeholder="Insert pokemon name" onChange={onChange.bind(this)} />
                        </label>
                        <input type="submit" value="Submit" />
                        <span css={css`color:red;display:none`} className="validation">Name is already taken</span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export {ModalBox};
