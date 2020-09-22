import React, { useState } from 'react';
import { storageService, dbService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState('');
  const [imgStr, setImgStr] = useState('');

  const handleChange = e => {
    setTweet(e.target.value);
  };

  const handleSubmit = async e => {
    if (tweet === '') {
      return;
    }

    let imgStrUrl = '';
    e.preventDefault();

    if (imgStr !== '') {
      const imgStrRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const res = await imgStrRef.putString(imgStr, 'data_url');
      imgStrUrl = await res.ref.getDownloadURL();
    }

    const newTweet = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      imgStrUrl,
    };

    await dbService.collection('tweets').add(newTweet);
    setTweet('');
    setImgStr('');
  };

  const handleChangeImg = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = finishedEvent => {
      const result = finishedEvent.currentTarget.result;
      setImgStr(result);
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteImg = () => setImgStr('');

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input
  //       type="text"
  //       placeholder="What's on your mind?"
  //       maxLength={120}
  //       value={tweet}
  //       onChange={handleChange}
  //     />
  //     <input type="file" accept="image/*" onChange={handleChangeImg} />
  //     <input type="submit" value="Tweet" />
  //     {imgStr && (
  //       <div>
  //         <img src={imgStr} width="50px" height="50px" alt="Tweet" />
  //         <button onClick={handleDeleteImg}>Clear</button>
  //       </div>
  //     )}
  //   </form>
  // );

  return (
    <form onSubmit={handleSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={tweet}
          onChange={handleChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>

      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={handleChangeImg}
        style={{
          opacity: 0,
        }}
      />

      {imgStr && (
        <div className="factoryForm__attachment">
          <img
            src={imgStr}
            style={{
              backgroundImage: imgStr,
            }}
            alt="Tweet"
          />
          <div className="factoryForm__clear" onClick={handleDeleteImg}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
