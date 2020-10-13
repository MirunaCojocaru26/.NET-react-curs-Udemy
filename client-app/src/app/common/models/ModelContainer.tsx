import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import { RootStoreContext } from "../../store/rootStore";

const ModelContainer = () => {
    const rootStore = useContext(RootStoreContext);
    const {modal: {open, body}, closeModal} = rootStore.modelStore;
  return (
    <Modal open={open} onClose={closeModal} size='mini' >
        <Modal.Content>
            {body}
        </Modal.Content>
    </Modal>
  );
};


export default observer( ModelContainer);