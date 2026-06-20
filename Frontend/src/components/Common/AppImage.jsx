import React, { useState, useEffect } from 'react';
import { HiOutlineUser, HiOutlineBookOpen, HiOutlinePhotograph, HiOutlineExclamationCircle } from 'react-icons/hi';
import { FiEdit3 } from 'react-icons/fi';

const AppImage = ({
  src,
  alt = '',
  className = '',
  fallbackSrc = null,
  fallbackType = 'default', // "avatar" | "book" | "author" | "cover" | "default"
  userName = '',
  name = '',
  showBrokenMessage = false,
  uploadedButBroken = false,
  imgClassName = '',
  imgStyle = {},
  onError,
  onLoad,
  ...props
}) => {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }

    // Only show loading state if we haven't successfully loaded an image before
    if (!hasLoadedOnce) {
      setStatus('loading');
    }
  }, [src, hasLoadedOnce]);

  // Extract initials for avatars
  const getInitials = () => {
    const displayName = name || userName || 'User';
    const words = displayName.trim().split(' ');
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return displayName.slice(0, 2).toUpperCase();
  };

  // Generate a determinist gradient index based on the name
  const getGradientClass = () => {
    const displayName = name || userName || 'User';
    const charCode = displayName.charCodeAt(0) || 0;
    const gradients = [
      "from-[#5A453D] to-[#C8A27E]",
      "from-[#3B2B26] to-[#8A6654]",
      "from-[#6B5045] to-[#D1AA83]",
      "from-[#8B6248] to-[#E0BE97]",
      "from-[#4A362F] to-[#B88963]",
      "from-[#6F564B] to-[#F1D2AD]",
    ];
    return gradients[charCode % gradients.length];
  };

  const renderFallbackIcon = () => {
    switch (fallbackType) {
      case 'avatar':
      case 'author':
        if (name || userName) {
          return (
            <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${getGradientClass()} text-white rounded-[inherit]`}>
              <span className="font-bold text-lg tracking-wider opacity-90">{getInitials()}</span>
            </div>
          );
        }
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-tan/20 text-coffee/60 rounded-[inherit]">
            {fallbackType === 'author' ? <FiEdit3 className="w-1/3 h-1/3" /> : <HiOutlineUser className="w-1/3 h-1/3" />}
          </div>
        );
      case 'book':
      case 'cover':
        return (
          <div className="w-[7rem] h-[7rem] flex flex-col items-center justify-center bg-tan/20 text-coffee/60 rounded-3xl">
            <HiOutlineBookOpen className="w-1/3 h-1/3" />
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-tan/20 text-coffee/60 rounded-[inherit]">
            <HiOutlinePhotograph className="w-1/3 h-1/3" />
          </div>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {status === 'loading' && !hasLoadedOnce && (
        <div className="absolute inset-0 z-0  bg-tan/30 animate-pulse rounded-[inherit]"></div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        onLoad={(e) => {
          setStatus('loaded');
          setHasLoadedOnce(true);
          if (onLoad) onLoad(e);
        }}
        onError={() => {
          setStatus('error');
          if (onError) onError();
        }}
        className={`w-full h-full rounded-[inherit]  transition-all duration-300 ${status === 'loaded' || hasLoadedOnce ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        style={{ ...imgStyle, display: status === 'error' ? 'none' : 'block' }}
        {...props}
      />

      {/* Error Fallback */}
      {status === 'error' && (
        <div className="absolute inset-0 z-0 flex items-center justify-center rounded-[inherit] bg-tan/10 border border-tan/30">
          {fallbackSrc ? (
            <img src={fallbackSrc} alt={alt} className="w-full h-full rounded-[inherit] object-[inherit]" {...props} />
          ) : (
            renderFallbackIcon()
          )}

          {/* Broken Image Message Overlay */}
          {(showBrokenMessage || uploadedButBroken) && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-coffee/80 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap z-10">
              <HiOutlineExclamationCircle className="w-3 h-3 text-red-400" />
              <span>{uploadedButBroken ? "Image lost" : "Unavailable"}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppImage;
