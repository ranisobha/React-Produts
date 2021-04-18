import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../flux/actions/itemActions';
import { IItemReduxProps, IItemModal, ITarget } from '../types/interfaces';

const ItemModal = ({ isAuthenticated, isAdmin, addItem }: IItemModal) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [prize, setPrize] = useState('')

  const handleToggle = () => setModal(!modal);

  const handleChangeName = (e: ITarget) => setName(e.target.value);
  const handleChangeDesc = (e: ITarget) => setDesc(e.target.value);
  const handleChangePrize = (e: ITarget) => setPrize(e.target.value);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const newItem = {
      name: name,
      desc: desc,
      prize: parseInt(prize)
    };

    // Add item via addItem action
    addItem(newItem);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      {
        isAuthenticated ? <div>Welcome</div> : <h4 className="mb-3 ml-4">Please log in to manage products</h4>
      }

      {isAuthenticated && isAdmin ? (
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
        >
          Add Product
        </Button>
      ) : ''}
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add To Product List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                value={name}
                placeholder="Add product"
                onChange={handleChangeName}
              />
              <Label for="item">Description</Label>
              <Input
                type="text"
                name="desc"
                id="item"
                value={desc}
                placeholder="Add Description"
                onChange={handleChangeDesc}
              />
              <Label for="item">Prize</Label>
              <Input
                type="text"
                name="prize"
                id="item"
                value={prize}
                placeholder="Add Prize"
                onChange={handleChangePrize}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add product
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: IItemReduxProps) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, { addItem })(ItemModal);
