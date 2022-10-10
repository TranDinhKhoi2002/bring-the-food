import { useEffect, useState } from "react";
import Image from "next/image";

function ImageWithFallback({ src, fallbackSrc, alt, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          setImgSrc(fallbackSrc);
        }
      }}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      alt={alt}
      style={{ maxWidth: "100%" }}
    />
  );
}

export default ImageWithFallback;
