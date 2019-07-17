import * as React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { DialogActions } from '@app/store/actions'
export namespace ConfirmModal {
  
  export interface IProps {
    show: boolean
    onHide: typeof DialogActions.dialogHide
  }

  export interface IState {
    show: boolean
  }
}

export class DialogComp extends React.Component<ConfirmModal.IProps, ConfirmModal.IState> {

  constructor(props: ConfirmModal.IProps, context?: any) {
    super(props, context)
    this.state = { show: this.props.show || false }
  }

  handleHide(event: React.MouseEvent<HTMLButtonElement>) {
    this.handleCancel()
    this.props.onHide()
  }

  handleCancel() {
    this.setState({ show: false })
  }

  render() {
    return (
      <Modal
          show={this.state.show}
          onHide={() => this.handleHide}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Custom Modal Styling
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>确定删除吗？</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={() => this.handleCancel}>取消</Button>
            <Button onClick={() => this.handleHide}>确定</Button>
          </Modal.Footer>
        </Modal>
    )
  }
}