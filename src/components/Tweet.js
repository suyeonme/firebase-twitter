import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';

const Tweet = ({ tweetObj, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const handleToggle = () => setIsEditing(!isEditing);
  const handleChange = e => setNewTweet(e.target.value);

  const handleDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this tweet?');
    if (ok) {
      // Delete tweet from firestore
      await dbService.doc(`tweets/${tweetObj.id}`).delete();

      // Delete an image from storage
      if (tweetObj.imgStrUrl !== '')
        await storageService.refFromURL(tweetObj.imgStrUrl).delete();
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({ text: newTweet });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              onChange={handleChange}
              required
            />
            <input type="submit" value="Update tweet" />
          </form>
          <button onClick={handleToggle}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.imgStrUrl && (
            <img
              src={tweetObj.imgStrUrl}
              width="50px"
              height="50px"
              alt="Tweet"
            />
          )}
          {isOwner && (
            <>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={handleToggle}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
