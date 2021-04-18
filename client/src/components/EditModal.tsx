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
import { editItem } from '../flux/actions/itemActions';
import { IItemReduxProps, IItemEditModal, ITarget } from '../types/interfaces';

const EditModal = ({ isAuthenticated, editItem, isAdmin, item }: IItemEditModal) => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState(item.name);
    const [desc, setDesc] = useState(item.desc);
    const [prize, setPrize] = useState(item.prize)

    const handleToggle = () => setModal(!modal);

    const handleChangeName = (e: ITarget) => setName(e.target.value);
    const handleChangeDesc = (e: ITarget) => setDesc(e.target.value);
    const handleChangePrize = (e: ITarget) => {
        let num = parseInt(e.target.value as string)
        setPrize(num)
    };

    const handleOnSubmit = (e: any) => {
        e.preventDefault();

        const newItem = {
            _id: item._id,
            name: name,
            desc: desc,
            prize: prize
        };

        // Add item via addItem action
        editItem(newItem);
        // Close modal
        handleToggle();
    };

    return (
        <>
            {isAuthenticated && isAdmin ? (
                <Button
                    color="info"
                    size="sm"
                    onClick={handleToggle}
                >
                    Edit
                </Button>
            ) : (
                <h4 className="mb-3 ml-4">Please log in to manage items</h4>
            )}

            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Edit  Product List</ModalHeader>
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
                                Update product
              </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
};

const mapStateToProps = (state: IItemReduxProps) => ({
    //item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin:state.auth.isAdmin
});

export default connect(mapStateToProps, { editItem })(EditModal);
