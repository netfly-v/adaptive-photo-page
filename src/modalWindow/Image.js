import axios from 'axios';
import { useEffect, useState } from 'react';

export const Image = ({ imageId }) => {
  const [bigPhoto, setBigPhoto] = useState(null);
  const [comment, setComment] = useState(null);
  const [newComment, setNewComment] = useState(null);

  useEffect(() => {
    axios.get(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}`).then(response => {
      setBigPhoto(response.data.url);
      setComment(response.data.comments[0].text);
    });
  }, []);

  return (
    <>
      <img src={bigPhoto} />
      <p>{comment}</p>
      <textarea
        rows="2"
        cols="40"
        onChange={({ target }) => {
          setNewComment(target.value);
        }}
      />
      <div>
        <button
          onClick={() => {
            axios
              .post(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}/comments`, {
                name: 'vasya',
                comment: newComment,
              })
              .then(response => console.log(response));
          }}
        >
          Add comment
        </button>
      </div>
      {console.log(newComment)}
    </>
  );
};
