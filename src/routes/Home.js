import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';

import Tweet from 'components/Tweet';

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [imgStr, setImgStr] = useState();

  useEffect(() => {
    // Listen changing from firestore (update in realtime)
    dbService.collection('tweets').onSnapshot(snapshot => {
      const tweetArr = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTweets(tweetArr);
    });
  }, []);

  const handleChange = e => {
    setTweet(e.target.value);
  };

  const handleSubmit = async e => {
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

  const handleDeleteImg = () => setImgStr(null);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={tweet}
          onChange={handleChange}
        />
        <input type="file" accept="image/*" onChange={handleChangeImg} />
        <input type="submit" value="Tweet" />
        {imgStr && (
          <div>
            <img src={imgStr} width="50px" height="50px" alt="Tweet" />
            <button onClick={handleDeleteImg}>Clear</button>
          </div>
        )}
      </form>

      <div>
        {tweets.map(tw => (
          <Tweet
            key={tw.id}
            tweetObj={tw}
            isOwner={tw.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
