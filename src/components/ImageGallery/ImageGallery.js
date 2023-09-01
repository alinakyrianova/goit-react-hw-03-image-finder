import { GalleryImage } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGallery, ImageGalleryItem } from './ImageGallery.styled';

export const Gallery = ({ imgItems }) => {
  return (
    <div>
      <ImageGallery>
        {imgItems.map(item => {
          console.log('item:', item);
          return (
            <ImageGalleryItem key={item.id}>
              <GalleryImage item={item} />
            </ImageGalleryItem>
          );
        })}
      </ImageGallery>
    </div>
  );
};