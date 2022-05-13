/********************
 * 1--> This category card is used in homepage categories 
 * 
 * 
 * 
 */


import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from './box';
import { Text } from './text';
import * as icons from 'assets/icons/category-icons';
import Link from 'next/link';
import { Box as ChakraBox } from '@chakra-ui/react';
import Image from 'next/image'
 
 const CardBox = styled.div<any>((props) =>
   css({
     backgroundColor: ['gray.200', 'gray.200', '#fff'],
     textAlign: 'center',
     padding: '1rem 10px',
     borderRadius: [10, 10, 6],
     cursor: 'pointer',
     border: props.active ? '2px solid' : '2px solid',
     borderColor: props.active ? '#212121' : ['gray.200', 'gray.200', '#fff'],
   })
 );
 interface Props {
   data: any;
   active: any;
   style?: any;
   onCheckClick?: any;
 }
 const Icon = ({ name, style }) => {
   const TagName = icons[name];
   return !!TagName ? <TagName style={style} /> : <p>Invalid icon {name}</p>;
 };
 export const CardMenu = ({ data, onCheckClick, active, style }: Props) => {
  //  console.log({ data });
   return (
     <>
       {data.map(({ id, name, image, slug, uri }) => {
         const uriWithourSlashes = uri?.substring(1, uri.length - 1);
        //  console.log({ uriWithourSlashes, uri, slug: decodeURI(slug) });
        // console.log({ slug, active })

         return (
            <CardBox
              key={id}
              onClick={onCheckClick}
              active={slug === active}
              role='button'
              style={style}
            >
              <Link 
                href={{
                  pathname: "/[category]",
                  query: { category: decodeURI(slug) }
                }}
                replace
              >
                <a>
                  <Box
                    padding='1rem'
                    height={80}
                    alignItems='center'
                    justifyContent='center'
                    display='flex'
                    position="relative"
                  >
                    {image?.src ? <Image 
                      src={image?.src}
                      layout="fixed"
                      width={50}
                      height={50}
                      alt={image?.name}
                      /> : <Icon 
                      name={'FruitsVegetable'} 
                      style={{ height: 40, width: 'auto' }} 
                      /> 
                      }

                    
                  </Box>
                  <Text as='span' color='#212121' fontSize={14} fontWeight={600}>
                    {name}
                  </Text>
                </a>  
              </Link>
            </CardBox>
         )
       })}
       {/* <ChakraBox bg="red">Testing</ChakraBox> */}
     </>
   );
 };
 
