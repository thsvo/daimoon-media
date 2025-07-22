import ReactPlayer from 'react-player/youtube';

const Video = (props) => {
  const { url } = props;

  return (
    <>
      <ReactPlayer
        playing={true}
        volume={0.5}
        muted={false}
        url={url}
        controls={false}
        width='100%'
        height='100%'
        //playIcon={<daimoon_diamond />}
      />
    </>
  );
};

export default Video;
