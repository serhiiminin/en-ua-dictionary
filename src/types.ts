export interface RequestParams {
  endpoint: string;
  method: string;
  headers?: object;
  body?: object;
}

export type Fetcher = <T>(params: RequestParams) => Promise<T>;
export type FetcherWithToken = (token: string) => Fetcher;

export interface User {
  _id: string;
  name?: string;
  imageUrl?: string;
  googleId?: string;
  facebookId?: string;
  email?: string;
  active?: boolean;
  password?: string;
  expires?: string;
}

export interface Word {
  _id: string;
  antonyms?: string[];
  definitions?: string[];
  examples?: string[];
  gif?: string;
  options?: string[];
  partOfSpeech?: string[];
  similarTo?: string[];
  synonyms?: string[];
  transcription?: string;
  word?: string;
  ownerId?: string;
  timesLearnt?: number;
  lastLearnt?: string;
  created: string;
  updated: string;
}

export interface Token {
  _id: string;
  token: string;
  email: string;
  expiresAt: number;
}

export interface Theme {
  main: {
    borderRadius: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderStyle: {
      base: string;
    };
    borderWidth: {
      base: string;
    };
    breakpoint: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    boxShadow: {
      block: string;
    };
    color: {
      background: string;
      text: string;
      main: string;
      dark: string;
      light: string;
      contrastText: string;
      notification: {
        success: string;
        error: string;
        warning: string;
        info: string;
      };
      gradient: {
        block: string;
      };
    };
    fontFamily: {
      cairoBold: string;
      cairoRegular: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    letterSpacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    lineHeight: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    space: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    opacity: {
      disabled: number;
      snackbar: number;
    };
    zIndex: {
      notification: number;
    };
    transition: {
      base: number;
      button: number;
      controls: number;
      notification: number;
    };
  };
  palette: {
    background: {
      paper: string;
    };
    primary: {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
    };
    secondary: {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
    };
    text: {
      primary: string;
    };
  };
  typography: {
    useNextVariants: boolean;
    fontFamily: string;
    fontSize: string;
  };
}

export interface ThemeProps {
  theme: Theme;
}

export interface SearchParams {
  sortBy: string;
  sortDirection: string;
  page: number;
  countPerPage: number;
  query?: string;
  filter?: string;
}

export interface QueryParams {
  skip: number;
  limit: number;
  sortDirection: number;
  sortBy: string;
  filter?: string;
}

export interface Gif {
  images: {
    downsized_large: {
      url: string;
    };
  };
}

export interface FormData {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  appEndpoint?: string;
}
