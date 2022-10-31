function RenderCard(props) {

    const {setShowFormModal, setIsUserEditing, autoFillForm, userData, onDelete, onEdit} = props;

    return (
        <div className="card">      
            <div className='edit-button-div'>
                <button 
                    className='edit-button'
                    onClick={() => {
                        onEdit(userData.id)
                        setShowFormModal(true)
                        autoFillForm(userData)
                        setIsUserEditing(true)
                    }}
                >
                    Edit
                </button>
                <button 
                    className='edit-button'
                    onClick={() => onDelete(userData.id)}
                >
                    Delete
                </button>
            </div>
            <img className="image" src={userData.image} alt=''/>
            <div className="text-box">
                <div className="name">
                    <b> {userData.firstName} {userData.lastName} </b>
                </div>
                <div className="description">
                    <p><b>Age:</b> {userData.age}</p> 
                    <p><b>Height:</b> {userData.height}</p> 
                    <p><b>University:</b> {userData.university}</p> 
                </div> 
            </div>
        </div>
    );
  
}

export default RenderCard;