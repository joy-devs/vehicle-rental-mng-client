import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';

const images = [
  { id: 'bugati', route: '/sample1' },
  { id: 'bugati 2', route: '/sample2' },
  { id: 'bugati 3', route: '/sample3' },
  { id: 'teana', route: '/sample4' },
  { id: 'huracan', route: '/sample5' },
  { id: 'cayenne', route: '/sample6' },
  
];

const Cloud = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dcwglllgt' } });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => {
        const img = cld
          .image(image.id)
          .format('auto')
          .quality('auto')
          .resize(auto().gravity(autoGravity()).width(500).height(500));

        return (
          <Link to={image.route} key={index}>
            <AdvancedImage cldImg={img} />
          </Link>
        );
      })}
    </div>
  );
};

export { Cloud, images };