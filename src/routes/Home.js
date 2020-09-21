import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import Tweet from 'components/Tweet';

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);

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
    e.preventDefault();

    await dbService.collection('tweets').add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });

    setTweet('');
  };

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
        <input type="submit" value="Tweet" />
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
