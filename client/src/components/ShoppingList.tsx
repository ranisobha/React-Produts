import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../flux/actions/itemActions';
import { IItemReduxProps, IShoppingList } from '../types/interfaces';
import EditModal from './EditModal';

const ShoppingList = ({
  getItems,
  item,
  isAuthenticated,
  isAdmin,
  deleteItem
}: IShoppingList) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  const { items } = item;
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {isAuthenticated && items.map(({ _id, name, prize, desc }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {isAdmin ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(_id)}
                  >
                    &times;
                  </Button>
                ) : null}

                {isAdmin ? (
                  <EditModal item={{_id:_id,name:name,prize:prize,desc:desc}}/>
                ) : null}
                Name: {name} Description: {desc} Prize : {prize}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

const mapStateToProps = (state: IItemReduxProps) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin:state.auth.isAdmin
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
