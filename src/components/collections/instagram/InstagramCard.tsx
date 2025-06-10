
import React from 'react';
import { InstagramPost } from '@/lib/types';

interface InstagramCardProps {
  post: InstagramPost;
}

const InstagramCard: React.FC<InstagramCardProps> = ({ post }) => {
  // Handle media type comparison correctly
  const isVideo = post.mediaType === 'video' || post.mediaType === 'VIDEO';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img 
          src={post.thumbnailUrl || post.imageUrl}
          alt={post.caption}
          className="w-full h-64 object-cover"
        />
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 5v10l8-5-8-5z"/>
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-3">
          {post.avatarUrl && (
            <img 
              src={post.avatarUrl}
              alt={post.username}
              className="w-8 h-8 rounded-full mr-3"
            />
          )}
          <div>
            <h3 className="font-semibold text-sm">{post.username}</h3>
            <p className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleDateString()}</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{post.caption}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
              </svg>
              {post.likes}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
              </svg>
              {post.comments}
            </span>
          </div>
          
          {isVideo && post.mediaUrl && (
            <a 
              href={post.mediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Watch
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstagramCard;
