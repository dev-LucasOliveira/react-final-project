import React from 'react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RenderCard from './RenderUserCard';
import './App.css';

function App() {

  const [currentUsers, setCurrentUsers] = useState([]);
  const [usersToShow, setUsersToShow] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [imageUser, setImageUser] = useState('');
  const [firstNameUser, setFirstNameUser] = useState('');
  const [lastNameUser, setLastNameUser] = useState('');
  const [ageUser, setAgeUser] = useState('');
  const [heightUser, setHeightUser] = useState('');
  const [universityUser, setUniversityUser] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isUserEditing, setIsUserEditing] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(jsonRes => setCurrentUsers(jsonRes.users))
  }, []);     

  useEffect(() => {
    setUsersToShow(currentUsers)
  }, [currentUsers]);     

  useEffect(() => {
    if (searchField === '') {
      setUsersToShow(currentUsers);
    }

    function searchUserField(usersArray, searchString) {
      const newArray = usersArray.map((user) => {
        if (
          user.firstName.toLowerCase().includes(searchString.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchString.toLowerCase()) || 
          user.age.toString().includes(searchString.toLowerCase()) || 
          user.height.toString().includes(searchString.toLowerCase()) || 
          user.university.toLowerCase().includes(searchString.toLowerCase())
          ) {return user;} 
          return {};
      });
      return newArray.filter((user) => user.firstName);
    }

    const filteredUsers = searchUserField(currentUsers, searchField);
    setUsersToShow(filteredUsers);
  }, [currentUsers, searchField]);    

  useEffect(() => {
    if (
      firstNameUser === '' && 
      lastNameUser === '' && 
      ageUser === '' &&
      heightUser === '' &&      
      universityUser === '' &&      
      imageUser === ''
      ) {setIsButtonDisabled(true);}
      else {setIsButtonDisabled(false)};
  }, [firstNameUser, lastNameUser, ageUser, heightUser, universityUser, imageUser]);

  // useEffect(() => {
  //   if (isUserEditing === true) {
  //     setIsButtonDisabled(false);
  //   }
  //   else ;
  // }, [isUserEditing]);

  function autoFillForm(user) {
    setFirstNameUser(user.firstName);
    setLastNameUser(user.lastName);
    setAgeUser(user.age);
    setHeightUser(user.height);
    setUniversityUser(user.university);
    setImageUser(user.image);
  }

  function handleEdit(id) {
    const editedUser = currentUsers.find((user) => user.id === id);

    setFirstNameUser(editedUser.firstName);
    setLastNameUser(editedUser.lastName);
    setAgeUser(editedUser.age);
    setHeightUser(editedUser.height);
    setUniversityUser(editedUser.university);
    setImageUser(editedUser.image);
  }


  function addNewUserCard() {

    if (isUserEditing === false) {
      const newUserData = {
        id: uuidv4(),
        image: imageUser,
        firstName: firstNameUser,
        lastName: lastNameUser,
        age: ageUser,
        height: heightUser,
        university: universityUser,
      };

      
      // spread operator
      const updatedCurrentUsers = [
        newUserData,
        ...currentUsers
      ];

      // console.log('estou aqui');

      setCurrentUsers(updatedCurrentUsers);

      resetInputValues();

      setShowFormModal(false);

      return;

    }

    const editedUserIndex = currentUsers.findIndex((user) => user.id === isUserEditing);
    const editedUser = currentUsers.find((user) => user.id === isUserEditing);

    editedUser.image = imageUser;
    editedUser.firstName = firstNameUser;
    editedUser.lastName = lastNameUser;
    editedUser.age = ageUser;
    editedUser.height = heightUser;
    editedUser.university = universityUser;

    const updatedCurrentUsers = [...currentUsers];
    updatedCurrentUsers.splice(editedUserIndex, 1, editedUser);
    setCurrentUsers(updatedCurrentUsers);

    resetInputValues();

    setShowFormModal(false);

    setIsUserEditing(false);

  }

  function deleteUser(id) {

    const editedUserIndex = currentUsers.findIndex((user) => user.id === id);

    const updatedCurrentUsers = [...currentUsers];
    updatedCurrentUsers.splice(editedUserIndex, 1);
    setCurrentUsers(updatedCurrentUsers);

  }

  function resetInputValues() {

    setFirstNameUser('');
    setLastNameUser('');
    setAgeUser('');
    setHeightUser('');
    setUniversityUser('');
    setImageUser('');

  }

  return (
  <div className='page'>
    <header>
      <button 
        className='add-button'
        onClick={() => {
          setShowFormModal(true)
          resetInputValues()
        }}
      >
        Add
      </button>
        <input 
          name='input-box' 
          value={searchField} 
          onChange={(event) => setSearchField(event.target.value)} 
          type="text" 
          className='input-box' 
          placeholder='Search here'
        />
    </header>
    {showFormModal && <div className='modal-div'>
      <div className='title-modal-div'>
        <p className='title-modal'>Adicione um novo usuário aqui</p>
        <label className='input-label'>Primeiro nome:</label>
        <input 
          name='first-name'
          value={firstNameUser}
          onChange={(event) => setFirstNameUser(event.target.value)}
          type='text'
          className='modal-input'
          placeholder='Primeiro nome'
        />
        <label className='input-label'>Último nome:</label>
        <input 
          name='last-name'
          value={lastNameUser}
          onChange={(event) => setLastNameUser(event.target.value)}
          type='text'
          className='modal-input'
          placeholder='Último nome'
        />
        <label className='input-label'>Idade:</label>
        <input 
          name='age'
          value={ageUser}
          onChange={(event) => setAgeUser(event.target.value)}
          type='text'
          className='modal-input'
          placeholder='Idade'
        />
        <label className='input-label'>Altura:</label>
        <input 
          name='height'
          value={heightUser}
          onChange={(event) => setHeightUser(event.target.value)}
          type='text'
          className='modal-input'
          placeholder='Altura'
        />
        <label className='input-label'>Universidade:</label>
        <input 
          name='university'
          value={universityUser}
          onChange={(event) => setUniversityUser(event.target.value)}
          type='text'
          className='modal-input'
          placeholder='university'
        />
        <label className='input-label'>Imagem (URL):</label>
        <input 
          name='image'
          value={imageUser}
          onChange={(event) => setImageUser(event.target.value)}
          type='text'
          className='modal-input'
          placeholder='image'
        />
        <div className='form-button-div'>
          <button
            className='form-button'
            onClick={() => setShowFormModal(false)}
          >
            Cancelar
          </button>
          <button
            className='form-button'
            onClick={(event) => addNewUserCard(event)}
            disabled={isButtonDisabled}
          >
            Enviar
          </button>
        </div>
      </div>
      <div className='continent-modal-div'></div>
    </div>}
    <div className='card-box-div'>

      {usersToShow ? usersToShow.map((user) => (
        <RenderCard
        key={user.id}
        userData={user}
        // onDelete={handleDelete}
        onEdit={handleEdit}
        setShowFormModal={setShowFormModal}
        autoFillForm={autoFillForm}
        setIsUserEditing={setIsUserEditing}
        onDelete={deleteUser}
        />
      )) : null}

    </div>
  </div>
  );
}

export default App;
