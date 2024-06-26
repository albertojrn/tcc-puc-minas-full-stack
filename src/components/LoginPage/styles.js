import { styled } from '@mui/material'

export const GoogleButton = styled('button')`
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: WHITE;
  background-image: none;
  border: 1px solid #747775;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
  transition: background-color .218s, border-color .218s, box-shadow .218s;
  vertical-align: middle;
  white-space: nowrap;
  min-width: min-content;
  width: 100%;

  & .gsi-material-button-icon {
    position: absolute;
    left: 0;
    height: 20px;
    margin-right: 12px;
    min-width: 20px;
    width: 20px;
  }

  & .gsi-material-button-content-wrapper {
    -webkit-align-items: center;
    align-items: center;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
    height: 100%;
    justify-content: space-between;
    position: relative;
    width: 100%;
  }

  & .gsi-material-button-contents {
    -webkit-flex-grow: 1;
    flex-grow: 1;
    font-family: 'Roboto', arial, sans-serif;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
  }

  & .gsi-material-button-state {
    -webkit-transition: opacity .218s;
    transition: opacity .218s;
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  &:disabled {
    cursor: default;
    background-color: #ffffff61;
    border-color: #1f1f1f1f;
  }

  &:disabled .gsi-material-button-contents {
    opacity: 38%;
  }

  &:disabled .gsi-material-button-icon {
    opacity: 38%;
  }

  &:not(:disabled):active .gsi-material-button-state, 
  &:not(:disabled):focus .gsi-material-button-state {
    background-color: #303030;
    opacity: 12%;
  }

  &:not(:disabled):hover {
    -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  }

  &:not(:disabled):hover .gsi-material-button-state {
    background-color: #303030;
    opacity: 8%;
  }
`
