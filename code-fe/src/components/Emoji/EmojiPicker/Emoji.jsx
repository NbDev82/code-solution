import React from 'react';
import Picker from 'emoji-picker-react';

export default function EmojiPicker({isOpenEmoji, onEmojiClick}) {
  return (
    <div style={isOpenEmoji ? { display: 'block' } : { display: 'none' }}>
      <Picker onEmojiClick={onEmojiClick} />;
    </div>
  );
}
