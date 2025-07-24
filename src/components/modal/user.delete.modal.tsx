import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

const UserDeleteModal = (props: any) => {
    const queryClient = useQueryClient();
    const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;
    const mutation = useMutation({
        mutationFn: async (payload: any) => {
            await fetch(`http://localhost:8000/users/${payload.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": " application/json"
                }
            });
        },
        onSuccess(data, variables, context) {
            toast('Wow so easy! Create succeed');
            setIsOpenDeleteModal(false)
            queryClient.invalidateQueries({ queryKey: ['fetchUser'] })
        },
    })
    const handleSubmit = () => {
        mutation.mutate({
            id: dataUser?.id
        })
    }

    return (
        <Modal
            show={isOpenDeleteModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            onHide={() => setIsOpenDeleteModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete A User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete the user: {dataUser?.email ?? ""}
            </Modal.Body>
           <Modal.Footer>
                    {!mutation.isPending ?
                        <>
                            <Button
                                variant='warning'
                                onClick={() => setIsOpenDeleteModal(false)} className='mr-2'>Cancel</Button>
                            <Button onClick={() => handleSubmit()}>Save</Button>
                        </>
                        :
                        <Button variant='primary' disabled>
                            <Spinner
                                as="span"
                                animation='border'
                                size='sm'
                                role='status'
                                aria-hidden='true'
                            /><></> Saving...
                        </Button>}
                </Modal.Footer>
        </Modal>
    )
}

export default UserDeleteModal;