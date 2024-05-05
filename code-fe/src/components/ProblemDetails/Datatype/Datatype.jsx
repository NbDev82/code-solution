import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DATATYPE_DEFAULT } from '~/utils/Const';
import { Input, Menu, MenuList, MenuButton, Button, MenuItemOption, MenuOptionGroup } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
const Datatype = (props) => {
  const [title, setTitle] = useState(DATATYPE_DEFAULT[0]);
  return (
    <Menu closeOnSelect={false} className="menu">
      <MenuButton
        className="menu__btn"
        as={Button}
        rightIcon={<ChevronDownIcon fontSize="16px" />}
        px={10}
        py={8}
        transition="all 0.2s"
        borderRadius="var(--radius-size-smallsmall)"
        borderWidth="0.5px"
        fontSize="16px"
        backgroundColor="var(--gray)"
        color="var(--white)"
        _hover={{ bg: 'var(--gray-100)' }}
        _expanded={{ bg: 'var(--gray-300)', color: 'var(--white)' }}
      >
        {title}
      </MenuButton>
      <MenuList minWidth="160px" boxShadow="var(--box-shadow)">
        <MenuOptionGroup type="radio">
          {DATATYPE_DEFAULT.map((value, index) => (
            <MenuItemOption
              key={index}
              value={value}
              onClick={() => {
                setTitle(value);
                props.onChangeValue(value);
              }}
            >
              {value}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

Datatype.propTypes = {
  onChangeValue: PropTypes.func,
};

export default Datatype;
