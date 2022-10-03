import NextImage from '@components/NextImage';
import styled from '@emotion/styled';
import React from 'react';

interface NoResultProps {
  text?: string;
  classNames?: string;
  page?: string;
}

const NoResult = ({ text, classNames, page }: NoResultProps) => {
  return (
    <NoResults className={classNames}>
      <NextImage src="/assets/images/logo/logo.png" alt="UnisexUniverse" width="120px" height="100px" />
      <p className="text">{text || 'No Result Found'}</p>
    </NoResults>
  );
};

const NoResults = styled.div`
  text-align: center;
  color: var(--light-gray-6);
  p.text {
    font-weight: 700;
    font-size: 20px;
    margin: 0;
  }
  img {
    opacity: 0.58;
  }
`;

export { NoResult };
