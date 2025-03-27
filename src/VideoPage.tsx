import { useEffect, useRef } from "react";
import Video from "@/assets/video.mp4"
const AutoPlayFullScreenVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true; // Start muted to bypass restrictions
          await videoRef.current.play(); // Try playing video

          videoRef.current.muted = false; // Unmute after play starts
          videoRef.current.volume = 1.0; // Set max volume

          if (videoRef.current.requestFullscreen) {
            await videoRef.current.requestFullscreen();
          }
        } catch (error) {
          console.error("Autoplay, fullscreen, or volume setup failed", error);
        }
      }
    };

    setTimeout(playVideo, 500); // Small delay to improve autoplay success

  }, []);

  return (
    <video
      ref={videoRef}
      src={Video}
      autoPlay
      loop
      className="w-full h-full"
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default AutoPlayFullScreenVideo;
