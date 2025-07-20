import type { FC } from 'react';

const BackgroundVideo: FC = () => (
  <video
    autoPlay
    loop
    muted
    playsInline
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: -1
    }}
  >
    <source src="background.mp4" type="video/mp4" />
    Seu navegador não suporta vídeo em background.
  </video>
);

export default BackgroundVideo;
