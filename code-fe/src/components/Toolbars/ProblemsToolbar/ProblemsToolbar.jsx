import { memo, useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Input } from '@chakra-ui/react';
import './ProblemsToolbar.scss';
import ButtonDefault from '~/components/Buttons/Button';
import PropTypes from 'prop-types';
import { FILTER_DEFAULT } from '~/utils/Const';

function ProblemsToolbar(props) {
  const [inputValue, setInputValue] = useState('');
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.onSearchSubmit(inputValue);
    }
  };
  console.log(props.filters.difficulty);

  return (
    <div className="filter_container">
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
          backgroundColor="transparent"
          color="var(--secondary-color)"
          _hover={{ bg: 'var(--gray-light)' }}
          _expanded={{ bg: 'var(--primary-color)', color: 'var(--white)' }}
        >
          Status
        </MenuButton>
        <MenuList minWidth="160px" boxShadow="var(--box-shadow)">
          <MenuOptionGroup defaultValue={'ALL'} value={props.filters.status}>
            <MenuItemOption value="ALL" type="radio" onClick={(e) => props.onFilterStatus(e.currentTarget.value)}>
              All
            </MenuItemOption>
            <MenuItemOption value="TODO" type="radio" onClick={(e) => props.onFilterStatus(e.currentTarget.value)}>
              Todo
            </MenuItemOption>
            <MenuItemOption value="SOLVED" type="radio" onClick={(e) => props.onFilterStatus(e.currentTarget.value)}>
              Solved
            </MenuItemOption>
            <MenuItemOption value="ATTEMPTED" type="radio" onClick={(e) => props.onFilterStatus(e.currentTarget.value)}>
              Attempted
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
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
          backgroundColor="transparent"
          color="var(--secondary-color)"
          _hover={{ bg: 'var(--gray-light)' }}
          _expanded={{ bg: 'var(--primary-color)', color: 'var(--white)' }}
        >
          Difficulty
        </MenuButton>
        <MenuList minWidth="160px" boxShadow="var(--box-shadow)">
          <MenuOptionGroup defaultValue={'ALL'} value={props.filters.difficulty}>
            <MenuItemOption value="ALL" type="radio" onClick={(e) => props.onFilterDifficulty(e.currentTarget.value)}>
              All
            </MenuItemOption>
            <MenuItemOption value="EASY" type="radio" onClick={(e) => props.onFilterDifficulty(e.currentTarget.value)}>
              Easy
            </MenuItemOption>
            <MenuItemOption
              value="NORMAL"
              type="radio"
              onClick={(e) => props.onFilterDifficulty(e.currentTarget.value)}
            >
              Normal
            </MenuItemOption>
            <MenuItemOption value="HARD" type="radio" onClick={(e) => props.onFilterDifficulty(e.currentTarget.value)}>
              Hard
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <Input
        placeholder="Search..."
        width="40%"
        px="15px"
        fontSize="16px"
        height="80%"
        size="lg"
        variant="outline"
        borderRadius="var(--radius-size)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <ButtonDefault id="pickone" small highlight color="White" onClick={props.onPickOnProblem}>
        <span>Pick One</span>
        <ShuffleIcon sx={{ fontSize: 24 }}></ShuffleIcon>
      </ButtonDefault>
    </div>
  );
}
ProblemsToolbar.propTypes = {
  filters: PropTypes.object,
  onPickOnProblem: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  onFilterStatus: PropTypes.func,
  onFilterDifficulty: PropTypes.func,
};

ProblemsToolbar.defaultProps = {
  filters: FILTER_DEFAULT,
};

export default memo(ProblemsToolbar);
