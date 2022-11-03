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
  const [genderUser, setGenderUser] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isUserEditing, setIsUserEditing] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=200')
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
          user.gender.toLowerCase().includes(searchString.toLowerCase())
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
      genderUser === '' &&      
      imageUser === ''
      ) {setIsButtonDisabled(true);}
      else {setIsButtonDisabled(false)};
  }, [firstNameUser, lastNameUser, ageUser, heightUser, genderUser, imageUser]);

  function autoFillForm(user) {
    setFirstNameUser(user.firstName);
    setLastNameUser(user.lastName);
    setAgeUser(user.age);
    setHeightUser(user.height);
    setGenderUser(user.gender);
    setImageUser(user.image);
  }

  function handleEdit(id) {
    const editedUser = currentUsers.find((user) => user.id === id);

    setFirstNameUser(editedUser.firstName);
    setLastNameUser(editedUser.lastName);
    setAgeUser(editedUser.age);
    setHeightUser(editedUser.height);
    setGenderUser(editedUser.gender);
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
        gender: genderUser,
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
    editedUser.gender = genderUser;

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
    setGenderUser('');
    setImageUser('');

  }

  function sortUsers(btn) {
    setShowSortModal(!showSortModal)
    if (btn === 1) {
      const sortedUsers = [...currentUsers];
      sortedUsers.sort((a,b) => a.firstName.localeCompare(b.firstName));
      setCurrentUsers(sortedUsers);
      return;
    }

    if (btn === 2) {
      const sortedUsers = [...currentUsers];
      sortedUsers.sort((a,b) => b.firstName.localeCompare(a.firstName));
      setCurrentUsers(sortedUsers);
      return;
    }

    if (btn === 3) {
      const sortedUsers = [...currentUsers];
      sortedUsers.sort((a,b) => b.age - a.age);
      setCurrentUsers(sortedUsers);
      return;
    }

    if (btn === 4) {
      const sortedUsers = [...currentUsers];
      sortedUsers.sort((a,b) => a.age - b.age);
      setCurrentUsers(sortedUsers);
      return;
    }
  }

  return (
  <div className='page'>
    <header>
      <button 
        className='add-button'
        onClick={() => {
          setShowFormModal(!showFormModal)
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
      <button 
        className='add-button'
        onClick={() => setShowSortModal(!showSortModal)}
      >
        Sort by
      </button>
      {showSortModal && <div className='sort-modal-div'>
          <div 
          className='sort-option' 
          onClick={() => sortUsers(1)}
          >
            Name: A-Z
          </div>
          <div 
          className='sort-option' 
          onClick={() => sortUsers(2)}
          >
            Name: Z-A
          </div>
          <div 
          className='sort-option' 
          onClick={() => sortUsers(3)}
          >
            Age: Higher to Lower
          </div>
          <div 
          className='sort-option' 
          onClick={() => sortUsers(4)}
          >
            Age: Lower to Higher
          </div>
        </div>
      }
    </header>
    {showFormModal && <div className='modal-div'>
      <div className='title-modal-div'>
        <p className='title-modal'>Adicione um novo usuário aqui</p>
        <label className='input-label'>First Name:</label>
        <input 
          name='first-name'
          value={firstNameUser}
          onChange={(event) => setFirstNameUser(event.target.value)}
          type='text'
          className='modal-input'
          placeholder='First Name'
        />
        <label className='input-label'>Last Name:</label>
        <input 
          name='last-name'
          value={lastNameUser}
          onChange={(event) => setLastNameUser(event.target.value)}
          type='text'
          className='modal-input'
          placeholder='Last Name'
        />
        <label className='input-label'>Age:</label>
        <input 
          name='age'
          value={ageUser}
          onChange={(event) => setAgeUser(event.target.value)}
          type='text'
          className='modal-input'
          placeholder='Age'
        />
        <label className='input-label'>Height:</label>
        <input 
          name='height'
          value={heightUser}
          onChange={(event) => setHeightUser(event.target.value)}
          type='text'
          className='modal-input'
          placeholder='Height'
        />
        <label className='input-label'>Gender:</label>
        <input 
          name='gender'
          value={genderUser}
          onChange={(event) => setGenderUser(event.target.value)}
          type='text'
          className='modal-input'
          placeholder='gender'
        />
        <label className='input-label'>Image (URL):</label>
        <input 
          name='image'
          value={imageUser}
          onChange={(event) => setImageUser(event.target.value)}
          type='text'
          className='modal-input'
          placeholder='Image'
        />
        <div className='form-button-div'>
          <button
            className='form-button'
            onClick={(user) => {
              setShowFormModal(false)
              resetInputValues()
              setIsUserEditing(false)
            }}
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
    </div>}
    <div className='card-box-div'>

      {usersToShow ? usersToShow.map((user) => (
        <RenderCard
        key={user.id}
        userData={user}
        setShowFormModal={setShowFormModal}
        autoFillForm={autoFillForm}
        setIsUserEditing={setIsUserEditing}
        onEdit={handleEdit}
        onDelete={deleteUser}
        />
      )) : null}

    </div>
  </div>
  );
}

export default App;
