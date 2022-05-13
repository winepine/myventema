import { Box, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import * as React from 'react'
import { LinkGroupData } from './_data'

interface LinkGroupProps {
  data: LinkGroupData
}

export const LinkGroup = (props: LinkGroupProps) => {
  const { data } = props
  const { links, title } = data

  return (
    <Box>
      <Text
        textTransform="uppercase"
        mb={{ base: '6', md: '10' }}
        fontWeight="bold"
        letterSpacing="wide"
      >
        {title}
      </Text>
      <Stack as="ul" spacing={{ base: 2, md: 4 }} listStyleType="none">
        {links.map((link, idx) => (
          <Box as="li" key={idx}>
            <Link href={link.href} passHref>
              <Box display="flex" as="a" _hover={{ textDecoration: 'underline' }}>
                {link.icon && <Box mr="2" my="auto">{link.icon}</Box>}
                <span>{link.label}</span>
                {link.badge && (
                  <Box as="span" ms="2">
                    {link.badge}
                  </Box>
                )}
              </Box>
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
