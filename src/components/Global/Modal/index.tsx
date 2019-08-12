import * as React from 'react'
import { Modal, Button } from 'react-bootstrap'

export function ConfirmModal(props: any) {
  return (
    <Modal
      {...props}
      size="sm"
      centered
      aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            警告！
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>删除后将无法恢复，确定要执行该操作吗？</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" size="sm" onClick={props.onHide}>取消</Button>
          <Button variant="info" size="sm" onClick={props.onClose}>确定</Button>
        </Modal.Footer>
      </Modal>
  );
}
