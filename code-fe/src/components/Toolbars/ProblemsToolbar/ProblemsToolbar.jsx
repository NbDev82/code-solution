import { memo, useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Input } from '@chakra-ui/react';
import './ProblemsToolbar.scss';
import ButtonDefault from '~/components/Buttons/Button';
import PropTypes from 'prop-types';
import { FILTER_DEFAULT, DIFFICULTY_DEFAULT, STATUS_DEFAULT } from '~/utils/Const';
import { normalizeName } from '~/utils/string';

function ProblemsToolbar(props) {
  const [inputValue, setInputValue] = useState('');
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.onSearchSubmit(inputValue);
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
          <MenuOptionGroup defaultValue={'ALL'} value={props.filters.status}>
            <MenuItemOption
              value="ALL"
              onClick={(e) => {
                props.onFilterStatus('ALL');
              }}
            >
              All
            </MenuItemOption>
            {STATUS_DEFAULT.map((value, index) => (
              <MenuItemOption
                key={index}
                value={value}
                onClick={() => {
                  props.onFilterStatus(value);
                }}
              >
                {normalizeName(value)}
              </MenuItemOption>
            ))}
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
          <MenuOptionGroup defaultValue={'ALL'} value={props.filters.difficulty} type="radio">
            <MenuItemOption
              value="ALL"
              onClick={(e) => {
                props.onFilterDifficulty('ALL');
              }}
            >
              All
            </MenuItemOption>
            {DIFFICULTY_DEFAULT.map((value, index) => (
              <MenuItemOption
                key={index}
                value={value}
                onClick={() => {
                  props.onFilterDifficulty(value);
                }}
              >
                {normalizeName(value)}
              </MenuItemOption>
            ))}
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
