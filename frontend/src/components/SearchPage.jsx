"use client"

import { useState, useEffect, useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"
import { assets } from "../assets/frontend-assets/assets"
import { useNavigate } from "react-router-dom"

const SearchPage = () => {
  const { songsData, albumsData, playWithId } = useContext(PlayerContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState({
    songs: [],
    albums: [],
  })
  const navigate = useNavigate()

  // Search algorithm to filter songs and albums
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults({ songs: [], albums: [] })
      return
    }

    const query = searchQuery.toLowerCase()

    // Filter songs
    const filteredSongs = songsData.filter(
      (song) =>
        song.name.toLowerCase().includes(query) ||
        song.artist?.toLowerCase().includes(query) ||
        song.desc?.toLowerCase().includes(query),
    )

    // Filter albums
    const filteredAlbums = albumsData.filter(
      (album) =>
        album.title?.toLowerCase().includes(query) ||
        album.name?.toLowerCase().includes(query) ||
        album.desc?.toLowerCase().includes(query),
    )

    setSearchResults({
      songs: filteredSongs,
      albums: filteredAlbums,
    })
  }, [searchQuery, songsData, albumsData])

  return (
    <div className="flex flex-col h-full">
      {/* Search Input */}
      <div className="sticky top-0 bg-[#121212] py-4 z-10">
        <div className="relative w-full max-w-lg">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <img className="w-5 h-5" src={assets.search_icon || "/placeholder.svg"} alt="Search" />
          </div>
          <input
            type="text"
            className="block w-full p-3 pl-10 text-sm text-white bg-[#242424] rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setSearchQuery("")}>
            
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="mt-4 flex-1 overflow-auto">
        {searchQuery.trim() === "" ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-xl font-bold mb-2">Search for songs or albums</div>
            <div className="text-sm">Find your favorite music</div>
          </div>
        ) : (
          <div>
            {/* Songs Results */}
            {searchResults.songs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Songs</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {searchResults.songs.slice(0, 8).map((song) => (
                    <div
                      key={song._id}
                      className="bg-[#181818] p-4 rounded hover:bg-[#282828] transition-all cursor-pointer"
                      onClick={() => playWithId(song._id)}
                    >
                      <div className="relative group">
                        <img
                          src={song.image || "/placeholder.svg"}
                          alt={song.name}
                          className="w-full aspect-square object-cover rounded shadow-lg mb-4"
                        />
                        <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                          <img src={assets.play_icon || "/placeholder.svg"} alt="Play" className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="font-semibold truncate">{song.name}</h3>
                      <p className="text-gray-400 text-sm truncate">{song.artist || song.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Albums Results */}
            {searchResults.albums.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Albums</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {searchResults.albums.slice(0, 8).map((album) => (
                    <div
                      key={album._id}
                      className="bg-[#181818] p-4 rounded hover:bg-[#282828] transition-all cursor-pointer"
                      onClick={() => navigate(`/album/${album._id}`)}
                    >
                      <div className="relative group">
                        <img
                          src={album.image || "/placeholder.svg"}
                          alt={album.title}
                          className="w-full aspect-square object-cover rounded shadow-lg mb-4"
                        />
                        <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                          <img src={assets.play_icon || "/placeholder.svg"} alt="Play" className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="font-semibold truncate">{album.title}</h3>
                      <p className="text-gray-400 text-sm truncate">{album.artist || "Album"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchResults.songs.length === 0 && searchResults.albums.length === 0 && (
              <div className="flex flex-col items-center justify-center mt-16 text-gray-400">
                <div className="text-xl font-bold mb-2">No results found for "{searchQuery}"</div>
                <div className="text-sm">Try different keywords or check your spelling</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage

