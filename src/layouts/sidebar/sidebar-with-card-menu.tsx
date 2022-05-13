////////////////////////
// 1- Being used in "/" index page (homepage).
////////////////////////


import React from 'react';
import { CardMenu } from 'components/card-menu';
import { useRouter } from 'next/router';
import ErrorMessage from 'components/error-message/error-message';
import styled from 'styled-components';
import Sticky from 'react-stickynode';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import CategoryWalker from 'components/category-walker/category-walker';
import useCategory from 'data/use-category';
import { useAppState } from 'contexts/app/app.provider';
import { useState } from 'react';
import { useEffect } from 'react';
import { ScaleFade } from '@chakra-ui/react';
import CategoryFilters from './categoryFilters'
import SpringModal from 'components/spring-modal/spring-modal';
import { useSpringModal } from 'contexts/spring-modal/use-spring-modal';

const Aside = styled.aside({
  width: '300px',
  position: 'fixed',
  top: 110,
  left: 30,
  height: 'calc(100% - 110px)',
});

const CardMenuWrapper = styled.div({
  display: 'grid',
  gridGap: '10px',
  gridTemplateColumns: '1fr 1fr',
  gridAutoRows: 'max-content',
  paddingBottom: 30,

  '@media (min-width: 550px) and (max-width: 990px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
});

const MobileOnly = styled.div({
  display: 'none',
  zIndex: 10,

  '@media (max-width: 990px)': {
    display: 'block',
  },
});

const DesktopOnly = styled.div({
  display: 'none',
  '@media (min-width: 991px)': {
    display: 'block',
  },
});

interface Props {
  type: string;
  categories?: any
  sidebarLayout?: string
  subCategories?: any
  categoryName?: string
  isSpringModalOpen?: boolean
  onIsMenuOpenClick?: any
  attributes?: any[]
}

export const SidebarWithCardMenu = ({ attributes, sidebarLayout, subCategories, categoryName, categories: data, type }: Props) => {
  const router = useRouter();
  const isShowSidebar = useAppState('isSidebarShow');
  const { pathname, query } = router;
  const selectedQueries = query.category;
  const { onModalClose } = useSpringModal();
  const [isHomepage, setIsHomepage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (router.asPath === "/") setIsHomepage(true)
  }, [isHomepage])

  useEffect(() => {
    setIsOpen(false);
  }, [router.query])

  return (
    <React.Fragment>
      <MobileOnly>
        {/* <Sticky top={67}>  // empty space between header and sticky filter bar */}
        <Sticky top={50}>
          {!isHomepage && <CategoryWalker
            setIsOpen={setIsOpen}
            style={{
              backgroundColor: '#ffffff',
              paddingTop: '15px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
            }}
          >
            <CategoryFilters 
              subCategories={subCategories}
              categoryName={categoryName}
              attributes={attributes}
              />
          </CategoryWalker>}

          <SpringModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
            <ScaleFade initialScale={0.5} in={true}>
              <CategoryFilters 
                subCategories={subCategories}
                categoryName={categoryName}
                attributes={attributes}
              />
            </ScaleFade>
          </SpringModal>

        </Sticky>
      </MobileOnly>

      <DesktopOnly>
        {/* <Sticky top={110}> */}
        {!isShowSidebar ? <Aside>
          <Scrollbar
            style={{ height: '100%', maxHeight: '100%' }}
            options={{
              scrollbars: {
                visibility: 'hidden',
              },
            }}
          >
            {sidebarLayout === "childCategory" ?  <ScaleFade initialScale={0.5} in={true} >
                <CategoryFilters 
                  subCategories={subCategories}
                  categoryName={categoryName}
                  attributes={attributes}
                />
            </ScaleFade> : 
              <CardMenuWrapper><CardMenu
                data={data}
                // onClick={onCategoryClick}
                active={selectedQueries}
              /></CardMenuWrapper>}
          </Scrollbar>
        </Aside> : <Scrollbar
            style={{ height: '100%', maxHeight: '100%' }}
            options={{
              scrollbars: {
                visibility: 'hidden',
              },
            }}
          >
            {sidebarLayout === "childCategory" ?  <ScaleFade initialScale={0.5} in={true} >
                <CategoryFilters 
                  subCategories={subCategories}
                  categoryName={categoryName}
                  attributes={attributes}
                />
            </ScaleFade> : 
              <CardMenuWrapper><CardMenu
                data={data}
                active={selectedQueries}
              /></CardMenuWrapper>}
          </Scrollbar>}
        {/* </Sticky> */}
      </DesktopOnly>
    </React.Fragment>
  );
};
