import React from 'react';
import { ButtonProps } from '@material-ui/core/Button';
import ButtonSocial from './button-social';

const ButtonGoogle = (props: ButtonProps): JSX.Element => (
  <ButtonSocial {...props}>
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <g clipPath="url(#clip0)">
        <path
          d="M4.57695 12.8265L3.88078 15.4254L1.33629 15.4792C0.575859 14.0688 0.144531 12.4551 0.144531 10.7403C0.144531 9.08202 0.547813 7.51827 1.26266 6.14136H1.2632L3.52852 6.55667L4.52086 8.80839C4.31316 9.4139 4.19996 10.0639 4.19996 10.7403C4.20004 11.4743 4.33301 12.1776 4.57695 12.8265Z"
          fill="#FBBB00"
        />
        <path
          d="M19.9698 8.87219C20.0847 9.47711 20.1445 10.1018 20.1445 10.7403C20.1445 11.4563 20.0693 12.1546 19.9259 12.8282C19.4391 15.1206 18.1671 17.1222 16.405 18.5387L16.4045 18.5381L13.5512 18.3925L13.1473 15.8716C14.3166 15.1859 15.2303 14.1129 15.7116 12.8282H10.3644V8.87219H15.7897H19.9698Z"
          fill="#518EF8"
        />
        <path
          d="M16.4044 18.5382L16.405 18.5387C14.6913 19.9162 12.5143 20.7404 10.1445 20.7404C6.3363 20.7404 3.02533 18.6118 1.3363 15.4794L4.57697 12.8267C5.42146 15.0805 7.59564 16.6849 10.1445 16.6849C11.2401 16.6849 12.2665 16.3887 13.1473 15.8717L16.4044 18.5382Z"
          fill="#28B446"
        />
        <path
          d="M16.5275 3.04254L13.288 5.69473C12.3764 5.12497 11.2989 4.79583 10.1446 4.79583C7.53797 4.79583 5.32312 6.47383 4.52094 8.80848L1.26324 6.14145H1.2627C2.92699 2.93266 6.27973 0.740356 10.1446 0.740356C12.5709 0.740356 14.7957 1.60465 16.5275 3.04254Z"
          fill="#F14336"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="20" height="20" fill="white" transform="translate(0.144531 0.740356)" />
        </clipPath>
      </defs>
    </svg>
  </ButtonSocial>
);

export default ButtonGoogle;
