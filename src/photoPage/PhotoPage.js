import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Image } from '../modalWindow/Image';
import { ModalWindow } from '../modalWindow/ModalWindow';
import styles from './PhotoPage.module.css';

export const PhotoPage = () => {
  const [photos, setPhotos] = useState([]);
  const [isModal, setModal] = useState(false);
  const [imageId, setImageId] = useState(null);

  const onClose = () => setModal(false);

  useEffect(() => {
    axios.get('https://boiling-refuge-66454.herokuapp.com/images').then(response => setPhotos(response.data));
  }, []);

  return (
    <div className={styles.photoPage}>
      <header className={styles.header}>PhotoPage</header>
      {photos.map(photo => (
        <button
          key={photo.id}
          className={styles.photoButton}
          onClick={() => {
            setModal(true);
            setImageId(photo.id);
          }}
        >
          <img className={styles.image} src={photo.url} alt={photo.id}></img>
        </button>
      ))}
      <Fragment>
        <ModalWindow
          visible={isModal}
          title="Modal Window"
          content={<Image imageId={imageId} />}
          footer={<button onClick={onClose}>Закрыть</button>}
          onClose={onClose}
        />
      </Fragment>
    </div>
  );
};
