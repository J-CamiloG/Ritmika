import React from 'react';
import { Heart, Share2, Shuffle, Repeat, SkipBack, Play, SkipForward } from 'lucide-react';
import { SelectedItemDetailsProps } from '@/types/SelectedItemDetailsProps';


const SelectedItemDetails: React.FC<SelectedItemDetailsProps> = ({ item, type, onBack }) => {
    const isArtist = type === 'artist';
    const isAlbum = type === 'album';
    const isTrack = type === 'track';

    return (
        <div className="max-w-md mx-auto">
            <button 
                onClick={onBack} 
                className="mb-6 px-4 py-2 text-gray-200 hover:text-gray-800 transition-colors"
            >
                ← Back
            </button>
            
            <div className="bg-gradient-to-r from-purple-800 to-pink-600 rounded-3xl shadow-xl p-8">
                <div className="flex flex-col items-center text-center">
                    {/* Image Section */}
                    <div className="w-48 h-48 mb-6 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        {(isArtist || isAlbum) ? (
                            <img
                                src={item?.images?.[0]?.url || '/placeholder.svg'}
                                alt={item?.name || 'Cover'}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-4xl text-purple-500">♪</div>
                        )}
                    </div>

                    {/* Title & Artist Section */}
                    <div className="mb-8 w-full">
                        <h1 className="text-xl font-bold text-black mb-2">
                            {item?.name || 'Unknown Title'}
                        </h1>
                        <p className="text-sm text-black">
                            {isArtist ? `${item?.followers?.total || 0} followers` :  
                            isAlbum ? `Released: ${item?.release_date || 'Unknown date'}` :

                            item?.artists?.map((artist: any) => artist.name).join(', ') || 'Unknown Artist'}
                        </p>
                    </div>

                    {/* Audio Player (for tracks) */}
                    {isTrack && item?.preview_url && (
                        <div className="w-full mb-8">
                            <audio 
                                controls 
                                src={item.preview_url}
                                className="w-full h-12 rounded-lg"
                            >
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-4 w-full">
                        <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                            <Heart className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                            <Share2 className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Additional Details */}
                    {isArtist && (
                        <div className="mt-6 text-sm text-black">
                            <p>Genres: {item?.genres?.join(', ') || 'No genres available'}</p>
                            <p className="mt-2">Popularity: {item?.popularity || 'N/A'}/100</p>
                        </div>
                    )}
                    
                    {isAlbum && (
                        <div className="mt-6 text-sm text-black">
                            <p>Tracks: {item?.total_tracks || 'N/A'}</p>
                            <p className="mt-2">Type: {item?.album_type || 'N/A'}</p>
                        </div>
                    )}

                    {isTrack && (
                        <div className="mt-6 text-sm text-black">
                            <p>Duration: {Math.floor((item?.duration_ms || 0) / 1000 / 60)}:{String(Math.floor((item?.duration_ms || 0) / 1000 % 60)).padStart(2, '0')}</p>
                            <p className="mt-2">Album: {item?.album?.name || 'N/A'}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectedItemDetails;