import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, HStack, Tooltip } from '@chakra-ui/react';
import styles from './EmoijComment.module.scss';
import { EMOJI_COMMENT } from '~/utils/Const';
export default function EmojiComment({ onSelectEmoji, children }) {
  const [listEmoji, setListEmoji] = useState([
    EMOJI_COMMENT.love,
    EMOJI_COMMENT.haha,
    EMOJI_COMMENT.huhu,
    EMOJI_COMMENT.humm,
    EMOJI_COMMENT.woww,
    EMOJI_COMMENT.angry,
  ]);
  console.log(listEmoji)
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <HStack justifyContent="space-around" alignItems="center">
            {listEmoji.map((emoji) => (
              <Tooltip key={emoji.name} label={emoji.name} placement="top" bg='var(--primary-color)'>
                <span  className={styles.emoji} onClick={() => onSelectEmoji(emoji)}>
                  {emoji.emoji}
                </span>
              </Tooltip>
            ))}
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
