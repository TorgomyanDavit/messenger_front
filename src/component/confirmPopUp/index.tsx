import "./confirm.scss"; 


interface LoadingProps {
    confirmAction: (id: string) => void; 
    Cancel: (arg: string) => void;
    id:string
}

function ConfirmOPopUp({ confirmAction, Cancel, id }: LoadingProps) {
    return (
        <div className='confirm_dialog'>
            <p className='confirm_popUP'>Are you sure you want to delete user</p>
            <div className='conf_button_container'>
                <button className='deletUserButton' onClick={() => confirmAction(id)}> 
                    confirm
                </button>
                <button className='deletUserButton' onClick={() => Cancel("")}> 
                    Cancel
                </button>
            </div>
        </div>


    );
}

export default ConfirmOPopUp;

