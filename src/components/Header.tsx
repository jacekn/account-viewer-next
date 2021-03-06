import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { ReactComponent as StellarLogo } from "assets/svg/logo-stellar.svg";
import { ReactComponent as IconCopy } from "assets/svg/icon-copy.svg";

import { resetStoreAction } from "config/store";
import { Avatar } from "components/Avatar";
import { CopyWithTooltip } from "components/CopyWithTooltip";
import { TextButton } from "components/basic/TextButton";
import {
  FONT_WEIGHT,
  HEADER_HEIGHT_REM,
  HEADER_VERTICAL_PADDING_REM,
  MEDIA_QUERIES,
  pageInsetStyle,
  PALETTE,
} from "constants/styles";
import { stopAccountWatcherAction } from "ducks/account";
import { stopTxHistoryWatcherAction } from "ducks/txHistory";
import { getFormattedPublicKey } from "helpers/getFormattedPublicKey";
import { useRedux } from "hooks/useRedux";

const WrapperEl = styled.div`
  @media (${MEDIA_QUERIES.headerFooterHeight}) {
    padding: ${HEADER_VERTICAL_PADDING_REM}rem 0;
  }
`;

const InsetEl = styled.div`
  ${pageInsetStyle};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const BaseEl = styled.div`
  height: ${HEADER_HEIGHT_REM}rem;
  display: flex;
  align-items: center;
`;

const LogoWrapperEl = styled(BaseEl)``;

const AccountWrapperEl = styled(BaseEl)`
  justify-content: center;
  order: 1;
  width: 100%;
  margin-top: 1.2rem;

  @media (${MEDIA_QUERIES.headerFooterHeight}) {
    width: auto;
    order: 0;
    flex: 1;
    justify-content: flex-end;
    margin-top: 0;
  }
`;

const SignOutWrapperEl = styled(BaseEl)``;

const AVLogoEl = styled.div`
  background-color: ${PALETTE.purple};
  color: ${PALETTE.white};
  text-transform: uppercase;
  font-size: 0.875rem;
  line-height: 1.125rem;
  font-weight: ${FONT_WEIGHT.medium};
  padding: 0.2rem 0.375rem 0.125rem;
  border-radius: 0.125rem;
`;

const LogoLinkEl = styled.a`
  display: block;
  overflow: hidden;
  height: 1.5rem;
  width: 1.9rem;
  margin-right: 0.75rem;

  @media (min-width: 600px) {
    width: 6rem;
  }

  svg {
    color: ${PALETTE.black};
    height: 100%;
    width: 6rem;
  }
`;

const CopyPublicKeyButtonEl = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-left: 0.75rem;
  margin-right: 0;
  margin-top: 0.25rem;
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: ${FONT_WEIGHT.medium};
  color: ${PALETTE.black};

  &:hover {
    opacity: 0.7;
  }

  svg {
    fill: ${PALETTE.purple};
    height: 1.25rem;
    width: 1.25rem;
    margin-left: 0.75rem;
    margin-top: -0.25rem;
  }

  &::after {
    content: "";
    cursor: default;
    display: none;
    width: 1px;
    height: 2rem;
    background-color: ${PALETTE.grey};
    position: absolute;
    top: -0.2rem;
    right: -1.5rem;
  }

  @media (${MEDIA_QUERIES.headerFooterHeight}) {
    margin-right: 2.6rem;

    &::after {
      display: block;
    }
  }
`;

export const Header = () => {
  const dispatch = useDispatch();
  const { account } = useRedux("account");
  const { isAuthenticated } = account;

  const handleSignOut = () => {
    dispatch(stopAccountWatcherAction());
    dispatch(stopTxHistoryWatcherAction());
    dispatch(resetStoreAction());
  };

  return (
    <WrapperEl>
      <InsetEl>
        <LogoWrapperEl>
          <LogoLinkEl href="https://www.stellar.org/">
            <StellarLogo />
          </LogoLinkEl>
          <AVLogoEl>Account Viewer</AVLogoEl>
        </LogoWrapperEl>

        {isAuthenticated && (
          <>
            <AccountWrapperEl>
              <Avatar publicAddress={account.data?.id} />
              <CopyWithTooltip copyText={account.data?.id}>
                <CopyPublicKeyButtonEl>
                  {getFormattedPublicKey(account.data?.id)}
                  <IconCopy />
                </CopyPublicKeyButtonEl>
              </CopyWithTooltip>
            </AccountWrapperEl>
            <SignOutWrapperEl>
              <TextButton onClick={handleSignOut}>Sign out</TextButton>
            </SignOutWrapperEl>
          </>
        )}
      </InsetEl>
    </WrapperEl>
  );
};
