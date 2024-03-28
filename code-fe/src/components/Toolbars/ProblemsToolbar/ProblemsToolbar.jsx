import { memo, useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Input } from '@chakra-ui/react';
import './ProblemsToolbar.scss';
import ButtonDefault from '~/components/Buttons/Button';

function ProblemsToolbar({ onPickOnProblem, onSearchSubmit, onFilterStatus, onFilterDifficulty }) {
  const [inputValue, setInputValue] = useState('');
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearchSubmit(inputValue);
    }
  };

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
          <MenuOptionGroup defaultValue={'all'}>
            <MenuItemOption value="all" type="radio" onClick={(e) => onFilterStatus(e.currentTarget.value)}>
              All
            </MenuItemOption>
            <MenuItemOption value="todo" type="radio" onClick={(e) => onFilterStatus(e.currentTarget.value)}>
              Todo
            </MenuItemOption>
            <MenuItemOption value="solved" type="radio" onClick={(e) => onFilterStatus(e.currentTarget.value)}>
              Solved
            </MenuItemOption>
            <MenuItemOption value="attempted" type="radio" onClick={(e) => onFilterStatus(e.currentTarget.value)}>
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
          <MenuOptionGroup defaultValue={'all'}>
            <MenuItemOption value="all" type="radio" onClick={(e) => onFilterDifficulty(e.currentTarget.value)}>
              All
            </MenuItemOption>
            <MenuItemOption value="easy" type="radio" onClick={(e) => onFilterDifficulty(e.currentTarget.value)}>
              Easy
            </MenuItemOption>
            <MenuItemOption value="normal" type="radio" onClick={(e) => onFilterDifficulty(e.currentTarget.value)}>
              Normal
            </MenuItemOption>
            <MenuItemOption value="hard" type="radio" onClick={(e) => onFilterDifficulty(e.currentTarget.value)}>
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
      <ButtonDefault id="pickone" small highlight color="White" onClick={onPickOnProblem}>
        <span>Pick One</span>
        <ShuffleIcon sx={{ fontSize: 24 }}></ShuffleIcon>
      </ButtonDefault>
    </div>
  );
}

export default memo(ProblemsToolbar);
