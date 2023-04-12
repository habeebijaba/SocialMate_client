import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
  if (!string) return "#000000"; // default to black if string is undefined or null

  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (!name) return {}; // return empty object if name is undefined or null

  return {
    // sx: {
    //   bgcolor: stringToColor(name),
      
    // },
    sx: {
      bgcolor: stringToColor(name),
      width: "7rem",
      height: "7rem",
      borderRadius: "50%",
      objectFit: "cover",
      position: "absolute",
      left: 0,
      right: 0,
      margin: "auto",
      top: "12rem",
      fontSize: "3rem"
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

export default function BackgroundLetterAvatars({name}) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar(name)} />
    </Stack>
  );
}
