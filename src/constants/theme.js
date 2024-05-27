export const NAVBAR_HEIGHT = 64

export const COLORS = {
  red: '#D2011A',
  lightBorder: 'lightgray',
  lightgray: '#fafafa',
  mediumgray: '#f0f0f0',
  inputBorderColor: 'rgba(0, 0, 0, 0.23)',
  urbanBeige: '#E3E2DD',
  urbanBlack: '#454545',
}

const CUSTOM_THEME = {
  palette: {
    primary: {
      main: COLORS.urbanBeige,
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: COLORS.urbanBlack,
    },
    standard: {
      main: '#000000',
    },
  }
}

export default CUSTOM_THEME
