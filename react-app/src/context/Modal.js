
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalContext = React.createContext();


const ModalStyle = styled.div`
#modal {
    position: fixed;
    top: 0;
    right: 0;
    left: -175px;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #modal-background {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: ${props => props.backgroundColor || 'rgba(0, 0, 0, 0.7)'
    };
    }
  #modal-content {

    position: fixed;

    ${props => props.modalTop ? `top:${props.modalTop}`: null};

    ${props => props.modalBottomn ? `bottom:${props.modalBottomn}`: null};

    ${props => props.modalRight ? `right:${props.modalRight}`: null};

    ${props => props.modalLeft ? `left:${props.modalLeft}`: null};

    ${props => props.borderRadius ?
        `border-radius: ${props.borderRadius}`: null
    }
  }
`

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({onClose, children, top, bottom, left, right, backgroundColor, borderRadius}) {

  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <ModalStyle
    modalTop = {top}
    modalBottomn = {bottom}
    modalLeft = {left}
    modalRight = {right}
    backgroundColor = {backgroundColor}
    borderRadius = {borderRadius}
    >
        <div id="modal" onClick = {e => e.stopPropagation()}>
        <div id="modal-background" onClick={onClose} />
        <div id="modal-content">
            {children}
        </div>
        </div>
    </ModalStyle>,
    modalNode
  );
}
