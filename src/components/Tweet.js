import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

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
    <div className="nweet">
      {isEditing ? (
        <>
          <form onSubmit={handleSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              onChange={handleChange}
              required
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update tweet" className="formBtn" />
          </form>
          <span onClick={handleToggle} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.imgStrUrl && <img src={tweetObj.imgStrUrl} alt="Tweet" />}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={handleToggle}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
