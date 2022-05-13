import React from 'react';
import { Counter } from 'components/counter/counter';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { CURRENCY } from 'utils/constant';
import {
  ItemBox,
  Image,
  Information,
  Name,
  Price,
  Weight,
  Total,
  RemoveButton,
} from './cart-item.style';
import Link from 'next/link';
import useExtractProductLink from 'utils/useExtractProductLink';

interface Props {
  data: any;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<Props> = ({
  data,
  onDecrement,
  onIncrement,
  onRemove,
}) => {
  const { productURI } = useExtractProductLink(data.permalink);

  const { name: title, price, sale_price: salePrice, unit, quantity } = data;
  const displayPrice = salePrice ? salePrice : price;

  let image = data.images?.[0]?.src

  return (
    <ItemBox>
      <Counter
        value={quantity}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        variant="lightVertical"
      />
      <Image src={image} />
      <Information>
        <Link 
          href="/[category]/[product]" as={`/${productURI}`}
        >
          <a>
            <Name>{title}</Name>
          </a>
        </Link>
        <Price>
          {/* {CURRENCY} */}
          &euro; {parseFloat(displayPrice).toFixed(2)}
        </Price>
        <Weight>
          {quantity} X {displayPrice} = {(quantity * displayPrice).toFixed(2)} &euro;
        </Weight>
      </Information>
      {/* <Total>
        {CURRENCY}
        {(quantity * displayPrice).toFixed(2)}
      </Total> */}
      <RemoveButton onClick={onRemove}>
        <CloseIcon />
      </RemoveButton>
    </ItemBox>
  );
};
