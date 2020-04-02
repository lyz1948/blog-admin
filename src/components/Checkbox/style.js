import styled, { keyframes } from 'styled-components'

const checkboxEffect = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`

export const Container = styled.div`
  .checkbox-wrapper {
    .checkbox {
      display: block;
      position: relative;
      width: 16px;
      height: 16px;
      padding: 4px;
    }
    .checkbox-input {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
      z-index: 1;
    }
    .checkbox-input:checked ~ .checkbox-inner {
      background: #1890ff;
    }
    .checkbox-input:checked ~ .checkbox-inner::after {
      opacity: 1;
      border-right: 0;
      border-top: 0;
    }
    .checkbox-inner {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 2px;
      border: 1px solid #b7acac;
      border-collapse: separate;
      transition: all .3s;
    }
    .checkbox-inner::after {
      content: '';
      position: absolute;
      left: 20%;
      top: 20%;
      width: 10px;
      height: 6px;
      border: 2px solid #b7acac;
      transform: rotate(-45deg);
      opacity: 0;
    }
    // .checkbox {
    //   display: block;
    //   position: relative;
    //   left: 0;
    //   top: 0;
    //   width: 16px;
    //   height: 16px;
    //   border-radius: 2px;
    //   border: 1px solid #d8d8d8;
    //   background: #fff;
    // }
    // .checkbox-checked {
    //   content: '';
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   border: 1px solid #1890ff;
    //   border-radius: 2px;
    //   visibility: hidden;
    //   animation: ${checkboxEffect} .36s ease-in-out;
    //   animation-fill-mode: backwards;
    // }
    // .checkbox-input {
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   width: 100%;
    //   height: 100%;
    //   outline: none;
    //   cursor: pointer;
    //   opacity: 0;
    //   z-index: 1;
    // }
    // .checkbox-inner {
    //   display: block;
    //   position: relative;
    //   left: 0;
    //   top: 0;
    //   width: 16px;
    //   height: 16px;
    //   border-radius: 2px;
    //   border: 1px solid #fff;
    //   background: #1890ff;
    //   &::after {
    //     content: ' ';
    //     position: absolute;
    //     display: table;
    //     border-top: 0;
    //     border-left: 0;
    //     transform: rotate(45deg) scale(1) translate(-50%, -50%);
    //     transition: all .2s;
    //   }
    // }
  }
`