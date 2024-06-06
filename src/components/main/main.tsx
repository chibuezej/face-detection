import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { FaceDetection as _FaceDetection } from "@mediapipe/face_detection";
import { Camera as _Camera } from '@mediapipe/camera_utils';

import webcamImg from "../../assets/svg/mic.svg";
import bulb from "../../assets/svg/bulb.svg";
import wifi from "../../assets/svg/wifi.svg";
import micReady from "../../assets/svg/webReady.svg";
import webcamReady from "../../assets/svg/cam.svg";
import bulbReady from "../../assets/svg/bulbReady.svg";
import wifiReady from "../../assets/svg/wifiReady.svg";
import mic from "../../assets/svg/micReady.svg";
import network from "../../assets/svg/network.svg";

import { useFaceDetection, CameraOptions } from "../../hooks/useFaceDetection";

const gridItems = [
  {
    imgSrc: webcamImg,
    text: "Webcam",
    type: "webcam",
    img: webcamReady,
    liveImg: micReady,
  },
  {
    imgSrc: network,
    text: "Speed",
    type: "speed",
    img: wifiReady,
    liveImg: wifi,
  },
  {
    imgSrc: webcamImg,
    text: "Gadget mic",
    type: "mic",
    img: mic,
    liveImg: micReady,
  },
  {
    imgSrc: bulb,
    text: "Lighting",
    type: "lighting",
    img: bulbReady,
    liveImg: bulb,
  },
];

export default function Main() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isNetworkGood, setIsNetworkGood] = useState(navigator.onLine);

  const canvasRef = useRef(null);

  // This is a hack to enable vite properly bundle FaceDetection and Camera
  const FaceDetection = _FaceDetection || (window as any).FaceDetection;
  const Camera = _Camera || (window as any).Camera;
  
  const { webcamRef, detected } = useFaceDetection({
    faceDetectionOptions: {
      model: "short",
    },
    faceDetection: new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }: CameraOptions) =>
      new Camera(mediaSrc, {
        onFrame,
        width: 300,
        height: 300,
      }),
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleUserMedia = useCallback(() => {
    setIsNetworkGood(true);
  }, []);

  return (
    <div className="bg-[#ffffff] rounded-[20px] w-[80%] md:w-[50%] shadow-2xl px-6 py-8">
      <h1 className="text-[20px] font-medium">System check</h1>
      <p className="text-[14px] text-[#4A4A68] leading-6">
        We utilize your camera image to ensure fairness for all participants,
        and we also employ both your camera and microphone for video questions
        where you will be prompted to record a response using your camera or
        webcam, so it's essential to verify that your camera and microphone are
        functioning correctly and that you have a stable internet connection. To
        do this, please position yourself in front of your camera, ensuring that
        your entire face is clearly visible on the screen. This includes your
        forehead, eyes, ears, nose, and lips. You can initiate a 5-second
        recording of yourself by clicking the button below.
      </p>
      <div className="flex pt-8 gap-10 items-center flex-col lg:flex-row">
        <div
          className={`border ${
            detected ? "border-green-500" : "border-[#755AE2]"
          } w-[275px] h-[168px] rounded-[10px] flex justify-center items-center overflow-hidden`}
        >
          <Webcam
            audio={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            onUserMedia={handleUserMedia}
            videoConstraints={{
              width: 275,
              height: 168,
              facingMode: "user",
            }}
          />
          
          <canvas ref={canvasRef} style={{ position: "absolute" }} />
        </div>
        <div className="grid grid-cols-2 gap-5">
          {gridItems.map((item, index) => {
            const isReady =
              (item.type === "webcam" && detected) ||
              (item.type === "mic" && webcamRef) ||
              (item.type === "speed" && isNetworkGood) ||
              (item.type === "lighting" && isNetworkGood);
            const iconColor =
              item.type === "speed"
                ? isNetworkGood
                  ? "#755AE2"
                  : "red"
                : "#755AE2";
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center bg-[#F5F3FF] w-[91px] h-[71px] relative rounded-[10px]"
              >
                <div
                  className={`absolute w-[16px] h-[16px] rounded-full right-1 top-0 flex items-center justify-center`}
                  style={{ backgroundColor: iconColor }}
                >
                  {isReady && <img src={item.img} alt="" />}
                </div>
                <div
                  className={`bg-[#E6E0FF] p-2 rounded-full ${
                    isReady
                      ? "border-[3px] border-[#755AE2]"
                      : "border-[#FF5F56]"
                  }`}
                >
                  <img
                    src={isReady ? item.liveImg : item.imgSrc}
                    alt={item.text}
                    className={`w-[18px] h-[18px] ${
                      item.type === "mic" && isReady
                        ? "bg-[#755AE2] rounded-full"
                        : ""
                    }`}
                  />
                </div>
                <p className="text-[10px] font-normal text-[#4A4A68] py-1">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pt-10">
        <button
          onClick={openModal}
          disabled={true}
          className="bg-[#755AE2] text-white rounded-lg p-4 text-[14px] font-medium"
        >
          Take picture and continue
        </button>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-[18px] w-[472px]">
            <div className="flex justify-between bg-[#755AE2] p-4 items-center rounded-t-[18px]">
              <h2 className="text-[16px] font-medium text-white">
                Start assessment
              </h2>
              <button
                onClick={closeModal}
                className="bg-[purple] bg-opacity-10 text-[#F5F3FF] rounded-[9px] px-4 py-2 mr-2 text-[12px] cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="flex flex-col items-center bg-[#F5F3FF] py-4 gap-2">
              <h1 className="text-[20px] font-medium text-[#755AE2] ">
                Proceed to start assessment
              </h1>
              <p className="text-[14px] font-normal text-center text-[#675E8B] px-16">
                Kindly keep to the rules of the assessment and sit up, stay in
                front of your camera/webcam and start your assessment.
              </p>
            </div>
            <div className="flex justify-end py-6 px-8">
              <button className="bg-[#755AE2] text-white rounded-lg px-8 py-2">
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
