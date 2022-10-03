import { useState, useEffect } from 'react';
import { Message, Ellipsis } from '@ui';
import { Tooltip, Grid } from 'antd';
import { FiLink } from 'react-icons/fi';
import {
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { useRouter } from 'next/router';

const { useBreakpoint } = Grid;

interface ShareSocialProps {
  data?: any;
  shareUrl: string;
  type?: string;
  title?: string;
}

const ShareOnSocials = ({ data, shareUrl, type, title }: ShareSocialProps) => {
  const router = useRouter();
  const screens = useBreakpoint();
  function copyUrl() {
    if (typeof window !== 'undefined') {
      window.navigator.clipboard.writeText(shareUrl);
      Message.success('Copied to clipboard!');
    }
  }

  return (
    <div className="flex items-center">
      <Ellipsis placement="top" title="Facebook">
        <FacebookShareButton
          key={'share-facebook-' + data?.id}
          url={shareUrl}
          quote={title}
          hashtag={'#uninexuniverse'}
          className="mr-1">
          <FacebookIcon size={screens.xs ? "24px" : "28px"} round={true} />
        </FacebookShareButton>
      </Ellipsis>
      <Ellipsis placement="top" title="Messenger">
        <FacebookMessengerShareButton 
          appId=''
          key={'share-messenger-' + data?.id}
          url={shareUrl}
          title="Bloodstock Exchange share link:"
          className="mr-1">
            <FacebookMessengerIcon size={screens.xs ? "24px" : "28px"} round={true}/>
        </FacebookMessengerShareButton>
      </Ellipsis>
      <Tooltip placement="top" title="Copy Link">
        <p className="inline-flex">
          <span
            className="border border-solid mb-2 border-gray-750 rounded-circle cursor-pointer"
            style={{ padding: '6px' }}
            onClick={copyUrl}>
            <FiLink size={screens.xs ? "10px" : "12px"} color="gray" />
          </span>
        </p>
      </Tooltip>
    </div>
  );
};

export default ShareOnSocials;
