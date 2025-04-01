// import { React, useContext } from 'react'
// import {assets} from '../assets/frontend-assets/assets'
// import { PlayerContext } from '../context/PlayerContext'

// const Player = () => {

//   const {track,seekBar,seekBg,playStatus,play,pause,time,previous,next,seekSong} = useContext(PlayerContext);

//   return track ? (
//     <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
//         <div className='hidden lg:flex items-center gap-4'>
//             <img className='w-12' src={track.image} alt="" />
//             <div>
//                 <p>{track.name}</p>
//                 <p>{track.desc.slice(0,12)}</p>
//             </div>
//         </div>
//         <div className='flex flex-col items-center gap-1 m-auto'>
//             <div className='flex gap-4'>
//               <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
//               <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />
//               {playStatus
//               ?<img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="" />
//               :<img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" />
//               }
//               <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
//               <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="" />
//             </div>
//             <div className='flex items-center gap-5'>
//               <p>{time.currentTime.minute}:{time.currentTime.second}</p>
//               <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
//                 <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
//               </div>
//               <p>{time.totalTime.minute}:{time.totalTime.second}</p>
//             </div>
//         </div>
//         <div className='hidden lg:flex items-center gap-2 opacity-75'>
//           <img className='w-4' src={assets.play_icon} alt="" />
//           <img className='w-4' src={assets.mic_icon} alt="" />
//           <img className='w-4' src={assets.queue_icon} alt="" />
//           <img className='w-4' src={assets.speaker_icon} alt="" />
//           <img className='w-4' src={assets.volume_icon} alt="" />
//           <div className='w-20 bg-slate-50 h-1 rounded'></div>
//           <img className='w-4' src={assets.mini_player_icon} alt="" />
//           <img className='w-4' src={assets.zoom_icon} alt="" />
//         </div>
//     </div>
//   ) : null
// }

// export default Player



"use client"

import { useContext } from "react"
import { assets } from "../assets/frontend-assets/assets"
import { PlayerContext } from "../context/PlayerContext"

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    volumeBar,
    volumeBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
    volume,
    isMuted,
    changeVolume,
    toggleMute,
  } = useContext(PlayerContext)

  // Function to get the appropriate volume icon based on volume level
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return assets.volume_mute_icon || assets.volume_icon // Fallback if mute icon not available
    } else if (volume < 0.3) {
      return assets.volume_low_icon || assets.volume_icon // Fallback if low volume icon not available
    } else if (volume < 0.7) {
      return assets.volume_medium_icon || assets.volume_icon // Fallback if medium volume icon not available
    } else {
      return assets.volume_icon
    }
  }

  return track ? (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image || "/placeholder.svg"} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img className="w-4 cursor-pointer" src={assets.shuffle_icon || "/placeholder.svg"} alt="" />
          <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon || "/placeholder.svg"} alt="" />
          {playStatus ? (
            <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon || "/placeholder.svg"} alt="" />
          ) : (
            <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon || "/placeholder.svg"} alt="" />
          )}
          <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon || "/placeholder.svg"} alt="" />
          <img className="w-4 cursor-pointer" src={assets.loop_icon || "/placeholder.svg"} alt="" />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] h-1 bg-gray-600 rounded-full cursor-pointer group relative"
          >
            <div className="absolute inset-0 flex items-center">
              <hr
                ref={seekBar}
                className="h-1 border-none w-0 bg-green-500 rounded-full group-hover:bg-green-400 transition-colors"
              />
            </div>
            {/* Hover effect - dot that follows cursor */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -right-1 h-3 w-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ right: `${100 - (seekBar.current?.style.width.replace("%", "") || 0)}%` }}
            ></div>
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.play_icon || "/placeholder.svg"} alt="" />
        <img className="w-4" src={assets.mic_icon || "/placeholder.svg"} alt="" />
        <img className="w-4" src={assets.queue_icon || "/placeholder.svg"} alt="" />
        <img className="w-4" src={assets.speaker_icon || "/placeholder.svg"} alt="" />

        {/* Volume control section */}
        <div className="flex items-center gap-1">
          <img
            onClick={toggleMute}
            className="w-4 cursor-pointer"
            src={getVolumeIcon() || "/placeholder.svg"}
            alt="Volume"
          />
          <div
            ref={volumeBg}
            onClick={changeVolume}
            className="w-20 bg-gray-600 h-1 rounded-full cursor-pointer group relative"
          >
            <div className="absolute inset-0 flex items-center">
              <hr
                ref={volumeBar}
                className="h-1 border-none bg-white rounded-full group-hover:bg-green-400 transition-colors"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
            {/* Hover effect - dot that follows cursor */}
            <div
              className="absolute top-2/2 -translate-y-1/2 h-1 w-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${volume * 100}%`, transform: "translate(-50%, -50%)" }}
            ></div>
          </div>
        </div>

        <img className="w-4" src={assets.mini_player_icon || "/placeholder.svg"} alt="" />
        <img className="w-4" src={assets.zoom_icon || "/placeholder.svg"} alt="" />
      </div>
    </div>
  ) : null
}

export default Player

