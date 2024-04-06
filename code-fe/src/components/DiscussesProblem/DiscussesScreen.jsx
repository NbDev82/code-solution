import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import './DiscussesScreen.scss';
import DisCussContent from './DiscussContent/DiscussContent';
import CommentEditText from '~/components/DiscussesProblem/CommentEditText/CommentEditText';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : '#2c2929',
  ...theme.typography.body2,
  maxHeight: 300,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#d3c9c9',
  size: 20,
}));

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export default function DiscussesScreen() {
  return (
    <ThemeProvider theme={theme}>
      <CommentEditText />
      <Stack spacing={2} className="discuss__layout" divider={<Divider orientation="horizontal" flexItem />}>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
        <Item>
          <DisCussContent />
        </Item>
      </Stack>
    </ThemeProvider>
  );
}
