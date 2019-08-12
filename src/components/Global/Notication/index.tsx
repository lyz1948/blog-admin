import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'

export function Notication() {
  const [show, setShow] = useState(true)

  return (
    <Toast transition="div" onClose={() => setShow(true)} show={show} delay={3000} autohide>
      <Toast.Header>
        <strong className="mr-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
    // <Toast transition="div" onClose={() => setShow(false)} show={show} delay={3000} autohide={true}>
    //   <Toast.Header>
    //     <img src="" className="rounded mr-2" alt="" />
    //     <strong className="mr-auto">Bootstrap</strong>
    //     <small>11 mins ago</small>
    //   </Toast.Header>
    //   <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
    // </Toast>
  )
}
