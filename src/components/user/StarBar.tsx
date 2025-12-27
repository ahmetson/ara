import React, { useState, useEffect } from 'react';
import ControlPanel from '@/components/panel/ControlPanel';
import { getIcon } from '@/components/icon';
import Tooltip from '@/components/custom-ui/Tooltip';
import Button from '@/components/custom-ui/Button';
import CreateBlogForm from '@/components/blog/CreateBlogForm';
import { authClient } from '@/client-side/auth';
import { getStarByUserId } from '@/client-side/star';
import type { AuthUser } from '@/types/auth';

interface StarBarProps {
  authorId: string;
  onBlogCreated?: () => void;
}

const StarBar: React.FC<StarBarProps> = ({
  authorId,
  onBlogCreated,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const checkOwnership = async () => {
      if (isPending) {
        setIsLoading(true);
        return;
      }

      const user = session?.user as AuthUser | undefined;
      if (!user?.id) {
        setIsOwnProfile(false);
        setIsLoading(false);
        return;
      }

      try {
        // Get the star for the current authenticated user
        const currentUserStar = await getStarByUserId(user.id);
        if (currentUserStar && currentUserStar._id) {
          // Compare the current user's star _id with the authorId
          // Ensure both are strings for comparison (handles ObjectId objects)
          const currentUserId = String(currentUserStar._id);
          const authorIdStr = String(authorId);
          setIsOwnProfile(currentUserId === authorIdStr);
        } else {
          setIsOwnProfile(false);
        }
      } catch (error) {
        console.error('Error checking ownership:', error);
        setIsOwnProfile(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkOwnership();
  }, [session, authorId, isPending]);

  const handleSuccess = () => {
    setShowForm(false);
    setTimeout(() => {
      onBlogCreated?.();
      window.dispatchEvent(new CustomEvent('blog-created'));
    }, 500);
  };

  // Don't render if not own profile or still loading
  if (isLoading || !isOwnProfile) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="relative">
          <ControlPanel className="p-3 overflow-visible">
            <div className="flex items-center gap-3">
              {/* New Blog Post Button */}
              <Tooltip content="Create a new blog post to share your thoughts and experiences">
                <Button
                  onClick={() => setShowForm(true)}
                  variant="primary"
                  outline={true}
                  focus={false}
                  className="flex items-center gap-2"
                >
                  {getIcon({ iconType: 'new-file', className: 'w-4 h-4' })}
                  <span>New Blog Post</span>
                </Button>
              </Tooltip>
            </div>
          </ControlPanel>
        </div>
      </div>

      {/* Create Blog Form */}
      {showForm && (
        <CreateBlogForm
          authorId={authorId}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}
    </>
  );
};

export default StarBar;

