import createIcon from './createIcon'

export default createIcon(({ size, color }) => (
  <svg
    width={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="path-1-inside-1_6619_36"
      fill="white"
    >
      <path d="M2.96774 6.54831C3.38065 6.54831 3.76774 6.60334 4.10323 6.65837C4.72258 6.76842 5.23871 6.85097 5.6 6.5208C5.83226 6.3282 5.93548 5.97052 5.93548 5.47527C5.93548 4.3472 5.36774 3.49427 4.25806 2.99902C4.51613 2.66885 4.67097 2.25614 4.67097 1.81592C4.67097 0.825418 3.89677 0 2.96774 0C2.03871 0 1.26452 0.825418 1.26452 1.81592C1.26452 2.25614 1.41935 2.66885 1.67742 2.99902C0.567742 3.49427 0 4.3472 0 5.47527C0 5.97052 0.103226 6.30069 0.335484 6.5208C0.722581 6.87848 1.54839 6.7134 1.83226 6.65837C2.16774 6.60334 2.55484 6.54831 2.96774 6.54831ZM2.96774 0.577792C3.6129 0.577792 4.15484 1.15558 4.15484 1.84343C4.15484 2.53128 3.6129 3.10907 2.96774 3.10907C2.32258 3.10907 1.78065 2.53128 1.78065 1.84343C1.78065 1.15558 2.32258 0.577792 2.96774 0.577792ZM0.670968 6.10809C0.567742 6.02555 0.516129 5.80544 0.516129 5.50278C0.516129 4.48477 1.05806 3.82443 2.14194 3.43924C2.37419 3.57681 2.65806 3.65935 2.96774 3.65935C3.27742 3.65935 3.56129 3.57681 3.79355 3.43924C4.87742 3.82443 5.41935 4.51228 5.41935 5.50278C5.41935 5.80544 5.36774 6.02555 5.26452 6.10809C5.08387 6.27317 4.67097 6.19063 4.18065 6.10809C3.81935 6.05306 3.40645 5.97052 2.96774 5.97052C2.52903 5.97052 2.11613 6.02555 1.75484 6.10809C1.26452 6.21815 0.851613 6.27317 0.670968 6.10809Z" />
    </mask>
    <path
      d="M2.96774 6.54831C3.38065 6.54831 3.76774 6.60334 4.10323 6.65837C4.72258 6.76842 5.23871 6.85097 5.6 6.5208C5.83226 6.3282 5.93548 5.97052 5.93548 5.47527C5.93548 4.3472 5.36774 3.49427 4.25806 2.99902C4.51613 2.66885 4.67097 2.25614 4.67097 1.81592C4.67097 0.825418 3.89677 0 2.96774 0C2.03871 0 1.26452 0.825418 1.26452 1.81592C1.26452 2.25614 1.41935 2.66885 1.67742 2.99902C0.567742 3.49427 0 4.3472 0 5.47527C0 5.97052 0.103226 6.30069 0.335484 6.5208C0.722581 6.87848 1.54839 6.7134 1.83226 6.65837C2.16774 6.60334 2.55484 6.54831 2.96774 6.54831ZM2.96774 0.577792C3.6129 0.577792 4.15484 1.15558 4.15484 1.84343C4.15484 2.53128 3.6129 3.10907 2.96774 3.10907C2.32258 3.10907 1.78065 2.53128 1.78065 1.84343C1.78065 1.15558 2.32258 0.577792 2.96774 0.577792ZM0.670968 6.10809C0.567742 6.02555 0.516129 5.80544 0.516129 5.50278C0.516129 4.48477 1.05806 3.82443 2.14194 3.43924C2.37419 3.57681 2.65806 3.65935 2.96774 3.65935C3.27742 3.65935 3.56129 3.57681 3.79355 3.43924C4.87742 3.82443 5.41935 4.51228 5.41935 5.50278C5.41935 5.80544 5.36774 6.02555 5.26452 6.10809C5.08387 6.27317 4.67097 6.19063 4.18065 6.10809C3.81935 6.05306 3.40645 5.97052 2.96774 5.97052C2.52903 5.97052 2.11613 6.02555 1.75484 6.10809C1.26452 6.21815 0.851613 6.27317 0.670968 6.10809Z"
      fill={color}
    />
    <path
      d="M4.10323 6.65837L4.27819 5.6737L4.26509 5.67156L4.10323 6.65837ZM5.6 6.5208L4.96168 5.75103L4.94316 5.76638L4.9254 5.78261L5.6 6.5208ZM4.25806 2.99902L3.47018 2.38319L2.68252 3.39092L3.85051 3.9122L4.25806 2.99902ZM1.67742 2.99902L2.08497 3.9122L3.25296 3.39092L2.4653 2.38319L1.67742 2.99902ZM0.335484 6.5208L-0.352443 7.24669L-0.343166 7.25526L0.335484 6.5208ZM1.83226 6.65837L1.6704 5.67156L1.65614 5.67389L1.64195 5.67664L1.83226 6.65837ZM0.670968 6.10809L1.34556 5.3699L1.32123 5.34766L1.29548 5.32708L0.670968 6.10809ZM2.14194 3.43924L2.65156 2.57884L2.24849 2.3401L1.80707 2.49698L2.14194 3.43924ZM3.79355 3.43924L4.12842 2.49698L3.68699 2.3401L3.28392 2.57884L3.79355 3.43924ZM5.26452 6.10809L4.64 5.32708L4.61425 5.34766L4.58992 5.3699L5.26452 6.10809ZM4.18065 6.10809L4.34665 5.12197L4.33894 5.12067L4.33122 5.11949L4.18065 6.10809ZM1.75484 6.10809L1.97385 7.08382L1.97756 7.08297L1.75484 6.10809ZM2.96774 7.54831C3.29655 7.54831 3.61835 7.5922 3.94136 7.64518L4.26509 5.67156C3.91714 5.61448 3.46474 5.54831 2.96774 5.54831V7.54831ZM3.92827 7.64295C4.21664 7.69419 4.60383 7.76446 4.97571 7.75429C5.38107 7.74321 5.86179 7.63623 6.2746 7.25899L4.9254 5.78261C4.97692 5.73554 5.01893 5.75237 4.92106 5.75504C4.86583 5.75655 4.7877 5.7523 4.67449 5.73782C4.56063 5.72325 4.43461 5.70159 4.27818 5.67379L3.92827 7.64295ZM6.23832 7.29057C6.83132 6.79883 6.93548 6.03904 6.93548 5.47527H4.93548C4.93548 5.66109 4.91518 5.76583 4.9004 5.81313C4.88727 5.85513 4.89276 5.80818 4.96168 5.75103L6.23832 7.29057ZM6.93548 5.47527C6.93548 4.73735 6.74741 4.04189 6.34199 3.44071C5.93859 2.84255 5.35908 2.39533 4.66562 2.08584L3.85051 3.9122C4.26673 4.09796 4.52592 4.32483 4.68382 4.55896C4.83968 4.79008 4.93548 5.08511 4.93548 5.47527H6.93548ZM5.04595 3.61484C5.43257 3.1202 5.67097 2.49336 5.67097 1.81592H3.67097C3.67097 2.01893 3.59969 2.2175 3.47018 2.38319L5.04595 3.61484ZM5.67097 1.81592C5.67097 0.334451 4.50844 -1 2.96774 -1V1C3.2851 1 3.67097 1.31638 3.67097 1.81592H5.67097ZM2.96774 -1C1.42704 -1 0.264516 0.334451 0.264516 1.81592H2.26452C2.26452 1.31638 2.65038 1 2.96774 1V-1ZM0.264516 1.81592C0.264516 2.49336 0.502914 3.1202 0.889536 3.61484L2.4653 2.38319C2.3358 2.2175 2.26452 2.01893 2.26452 1.81592H0.264516ZM1.26987 2.08584C0.576407 2.39533 -0.00311041 2.84255 -0.406503 3.44071C-0.81193 4.04189 -1 4.73735 -1 5.47527H1C1 5.08511 1.0958 4.79008 1.25166 4.55896C1.40956 4.32483 1.66875 4.09796 2.08497 3.9122L1.26987 2.08584ZM-1 5.47527C-1 6.08788 -0.874758 6.75158 -0.352388 7.24663L1.02336 5.79497C1.04355 5.8141 1.04307 5.82779 1.03337 5.79739C1.02002 5.7555 1 5.6596 1 5.47527H-1ZM-0.343166 7.25526C0.14734 7.70849 0.791424 7.74834 1.13443 7.74428C1.52647 7.73963 1.88648 7.66647 2.02256 7.64009L1.64195 5.67664C1.49417 5.70529 1.29933 5.74219 1.11074 5.74442C1.01888 5.74551 0.961606 5.73735 0.93454 5.7306C0.907125 5.72377 0.952014 5.72894 1.01413 5.78634L-0.343166 7.25526ZM1.99412 7.64518C2.31714 7.5922 2.63893 7.54831 2.96774 7.54831V5.54831C2.47074 5.54831 2.01835 5.61448 1.6704 5.67156L1.99412 7.64518ZM2.96774 1.57779C2.98377 1.57779 3.02504 1.58474 3.07385 1.63678C3.12287 1.68905 3.15484 1.76336 3.15484 1.84343H5.15484C5.15484 0.664618 4.22457 -0.422208 2.96774 -0.422208V1.57779ZM3.15484 1.84343C3.15484 1.92351 3.12287 1.99782 3.07385 2.05008C3.02504 2.10213 2.98377 2.10907 2.96774 2.10907V4.10907C4.22457 4.10907 5.15484 3.02225 5.15484 1.84343H3.15484ZM2.96774 2.10907C2.95172 2.10907 2.91045 2.10213 2.86163 2.05008C2.81261 1.99782 2.78065 1.92351 2.78065 1.84343H0.780645C0.780645 3.02225 1.71091 4.10907 2.96774 4.10907V2.10907ZM2.78065 1.84343C2.78065 1.76336 2.81261 1.68905 2.86163 1.63678C2.91045 1.58474 2.95172 1.57779 2.96774 1.57779V-0.422208C1.71091 -0.422208 0.780645 0.664618 0.780645 1.84343H2.78065ZM1.29548 5.32708C1.40566 5.41518 1.46316 5.50778 1.48917 5.55746C1.51578 5.60829 1.52419 5.64226 1.52495 5.64534C1.52575 5.64851 1.51613 5.60582 1.51613 5.50278H-0.483871C-0.483871 5.7024 -0.467683 5.9211 -0.415277 6.13062C-0.370433 6.30991 -0.260539 6.64362 0.0464521 6.8891L1.29548 5.32708ZM1.51613 5.50278C1.51613 5.18257 1.59658 4.9927 1.70504 4.85641C1.8245 4.7063 2.04901 4.53354 2.47681 4.3815L1.80707 2.49698C1.15099 2.73014 0.562594 3.08014 0.140123 3.611C-0.293349 4.15568 -0.483871 4.80499 -0.483871 5.50278H1.51613ZM1.63231 4.29964C2.02017 4.52937 2.48028 4.65935 2.96774 4.65935V2.65935C2.83584 2.65935 2.72821 2.62425 2.65156 2.57884L1.63231 4.29964ZM2.96774 4.65935C3.4552 4.65935 3.91531 4.52937 4.30317 4.29964L3.28392 2.57884C3.20727 2.62425 3.09964 2.65935 2.96774 2.65935V4.65935ZM3.45868 4.3815C3.8775 4.53035 4.10445 4.70683 4.22741 4.86289C4.34138 5.00755 4.41935 5.20104 4.41935 5.50278H6.41935C6.41935 4.81402 6.22636 4.16834 5.7984 3.62515C5.37942 3.09337 4.79347 2.73333 4.12842 2.49698L3.45868 4.3815ZM4.41935 5.50278C4.41935 5.60582 4.40974 5.64851 4.41053 5.64534C4.4113 5.64226 4.4197 5.60829 4.44631 5.55746C4.47232 5.50778 4.52983 5.41518 4.64 5.32708L5.88903 6.8891C6.19602 6.64362 6.30592 6.30991 6.35076 6.13062C6.40317 5.9211 6.41935 5.7024 6.41935 5.50278H4.41935ZM4.58992 5.3699C4.71981 5.2512 4.8483 5.21735 4.89399 5.20832C4.9364 5.19994 4.94479 5.20528 4.89377 5.20247C4.84688 5.19988 4.77978 5.19236 4.68149 5.17745C4.58165 5.1623 4.47877 5.14421 4.34665 5.12197L4.01464 7.09421C4.22576 7.12976 4.52525 7.18518 4.78365 7.19943C4.98948 7.21078 5.5211 7.22828 5.93911 6.84628L4.58992 5.3699ZM4.33122 5.11949C4.02841 5.07337 3.50497 4.97052 2.96774 4.97052V6.97052C3.30793 6.97052 3.6103 7.03275 4.03007 7.09669L4.33122 5.11949ZM2.96774 4.97052C2.44675 4.97052 1.95895 5.03569 1.53211 5.13321L1.97756 7.08297C2.27331 7.0154 2.61132 6.97052 2.96774 6.97052V4.97052ZM1.53583 5.13237C1.42374 5.15753 1.32677 5.1771 1.24275 5.19083C1.15741 5.20477 1.09824 5.21054 1.06003 5.21194C1.0183 5.21348 1.02797 5.20869 1.06951 5.21815C1.11292 5.22803 1.22762 5.26212 1.34556 5.3699L-0.00362839 6.84628C0.394906 7.21048 0.896861 7.21929 1.13351 7.21059C1.41841 7.20012 1.71999 7.14079 1.97385 7.08381L1.53583 5.13237Z"
      fill={color}
      mask="url(#path-1-inside-1_6619_36)"
    />
    <mask
      id="path-3-inside-2_6619_36"
      fill="white"
    >
      <path d="M14.3226 3.0266C14.5807 2.69644 14.7355 2.28373 14.7355 1.84351C14.7355 0.853006 13.9614 0.0275879 13.0323 0.0275879C12.1033 0.0275879 11.3291 0.853006 11.3291 1.84351C11.3291 2.28373 11.4839 2.69644 11.742 3.0266C10.6323 3.52186 10.0646 4.37479 10.0646 5.50286C10.0646 5.99811 10.1678 6.32828 10.4001 6.54839C10.7872 6.90607 11.613 6.74098 11.8968 6.68596C12.2323 6.63093 12.6452 6.5759 13.0323 6.5759C13.4452 6.5759 13.8323 6.63093 14.1678 6.68596C14.7872 6.79601 15.3033 6.87855 15.6646 6.54839C15.8968 6.35579 16.0001 5.99811 16.0001 5.50286C16.0001 4.37479 15.4323 3.52186 14.3226 3.0266ZM13.0323 0.577866C13.6775 0.577866 14.2194 1.15566 14.2194 1.84351C14.2194 2.53135 13.6775 3.10915 13.0323 3.10915C12.3872 3.10915 11.8452 2.53135 11.8452 1.84351C11.8452 1.15566 12.3872 0.577866 13.0323 0.577866ZM15.3291 6.10816C15.1484 6.27325 14.7355 6.19071 14.2452 6.10816C13.8839 6.05314 13.471 5.97059 13.0323 5.97059C12.5936 5.97059 12.1807 6.02562 11.8194 6.10816C11.3291 6.19071 10.9162 6.24573 10.7355 6.10816C10.6323 6.02562 10.5807 5.80551 10.5807 5.50286C10.5807 4.48484 11.1226 3.82451 12.2065 3.43931C12.4388 3.57688 12.7226 3.65943 13.0323 3.65943C13.342 3.65943 13.6259 3.57688 13.8581 3.43931C14.942 3.82451 15.4839 4.51236 15.4839 5.50286C15.4839 5.80551 15.4323 6.02562 15.3291 6.10816Z" />
    </mask>
    <path
      d="M14.3226 3.0266C14.5807 2.69644 14.7355 2.28373 14.7355 1.84351C14.7355 0.853006 13.9614 0.0275879 13.0323 0.0275879C12.1033 0.0275879 11.3291 0.853006 11.3291 1.84351C11.3291 2.28373 11.4839 2.69644 11.742 3.0266C10.6323 3.52186 10.0646 4.37479 10.0646 5.50286C10.0646 5.99811 10.1678 6.32828 10.4001 6.54839C10.7872 6.90607 11.613 6.74098 11.8968 6.68596C12.2323 6.63093 12.6452 6.5759 13.0323 6.5759C13.4452 6.5759 13.8323 6.63093 14.1678 6.68596C14.7872 6.79601 15.3033 6.87855 15.6646 6.54839C15.8968 6.35579 16.0001 5.99811 16.0001 5.50286C16.0001 4.37479 15.4323 3.52186 14.3226 3.0266ZM13.0323 0.577866C13.6775 0.577866 14.2194 1.15566 14.2194 1.84351C14.2194 2.53135 13.6775 3.10915 13.0323 3.10915C12.3872 3.10915 11.8452 2.53135 11.8452 1.84351C11.8452 1.15566 12.3872 0.577866 13.0323 0.577866ZM15.3291 6.10816C15.1484 6.27325 14.7355 6.19071 14.2452 6.10816C13.8839 6.05314 13.471 5.97059 13.0323 5.97059C12.5936 5.97059 12.1807 6.02562 11.8194 6.10816C11.3291 6.19071 10.9162 6.24573 10.7355 6.10816C10.6323 6.02562 10.5807 5.80551 10.5807 5.50286C10.5807 4.48484 11.1226 3.82451 12.2065 3.43931C12.4388 3.57688 12.7226 3.65943 13.0323 3.65943C13.342 3.65943 13.6259 3.57688 13.8581 3.43931C14.942 3.82451 15.4839 4.51236 15.4839 5.50286C15.4839 5.80551 15.4323 6.02562 15.3291 6.10816Z"
      fill={color}
    />
    <path
      d="M14.3226 3.0266L13.5348 2.41078L12.7471 3.41851L13.9151 3.93979L14.3226 3.0266ZM11.742 3.0266L12.1495 3.93979L13.3175 3.41851L12.5299 2.41078L11.742 3.0266ZM10.4001 6.54839L9.71213 7.27428L9.72141 7.28285L10.4001 6.54839ZM11.8968 6.68596L11.735 5.69914L11.7207 5.70148L11.7065 5.70423L11.8968 6.68596ZM14.1678 6.68596L14.3428 5.70129L14.3297 5.69914L14.1678 6.68596ZM15.6646 6.54839L15.0263 5.77862L15.0077 5.79397L14.99 5.8102L15.6646 6.54839ZM16.0001 5.50286H15.0001H16.0001ZM15.3291 6.10816L14.7046 5.32715L14.6788 5.34774L14.6545 5.36998L15.3291 6.10816ZM14.2452 6.10816L14.4112 5.12204L14.4035 5.12074L14.3958 5.11956L14.2452 6.10816ZM11.8194 6.10816L11.9854 7.09429L12.0139 7.08949L12.0421 7.08305L11.8194 6.10816ZM10.7355 6.10816L10.111 6.88918L10.1203 6.89657L10.1297 6.90373L10.7355 6.10816ZM12.2065 3.43931L12.7161 2.57892L12.3131 2.34017L11.8716 2.49705L12.2065 3.43931ZM13.8581 3.43931L14.193 2.49705L13.7516 2.34017L13.3485 2.57892L13.8581 3.43931ZM15.4839 5.50286L14.4839 5.50286L15.4839 5.50286ZM15.1105 3.64243C15.4971 3.14779 15.7355 2.52094 15.7355 1.84351H13.7355C13.7355 2.04651 13.6643 2.24509 13.5348 2.41078L15.1105 3.64243ZM15.7355 1.84351C15.7355 0.362039 14.573 -0.972412 13.0323 -0.972412V1.02759C13.3497 1.02759 13.7355 1.34397 13.7355 1.84351H15.7355ZM13.0323 -0.972412C11.4916 -0.972412 10.3291 0.362039 10.3291 1.84351H12.3291C12.3291 1.34397 12.715 1.02759 13.0323 1.02759V-0.972412ZM10.3291 1.84351C10.3291 2.52094 10.5675 3.14779 10.9541 3.64243L12.5299 2.41078C12.4004 2.24509 12.3291 2.04651 12.3291 1.84351H10.3291ZM11.3344 2.11342C10.641 2.42292 10.0615 2.87014 9.65807 3.4683C9.25264 4.06948 9.06458 4.76494 9.06458 5.50286H11.0646C11.0646 5.1127 11.1604 4.81767 11.3162 4.58655C11.4741 4.35241 11.7333 4.12555 12.1495 3.93979L11.3344 2.11342ZM9.06458 5.50286C9.06458 6.11547 9.18982 6.77917 9.71219 7.27422L11.0879 5.82255C11.1081 5.84169 11.1076 5.85538 11.0979 5.82497C11.0846 5.78309 11.0646 5.68719 11.0646 5.50286H9.06458ZM9.72141 7.28285C10.2119 7.73608 10.856 7.77593 11.199 7.77187C11.591 7.76722 11.9511 7.69406 12.0871 7.66768L11.7065 5.70423C11.5587 5.73288 11.3639 5.76977 11.1753 5.77201C11.0835 5.7731 11.0262 5.76493 10.9991 5.75819C10.9717 5.75136 11.0166 5.75653 11.0787 5.81392L9.72141 7.28285ZM12.0587 7.67277C12.3786 7.6203 12.7277 7.5759 13.0323 7.5759V5.5759C12.5628 5.5759 12.086 5.64156 11.735 5.69914L12.0587 7.67277ZM13.0323 7.5759C13.3611 7.5759 13.6829 7.61979 14.0059 7.67277L14.3297 5.69914C13.9817 5.64207 13.5293 5.5759 13.0323 5.5759V7.5759ZM13.9928 7.67053C14.2812 7.72177 14.6684 7.79205 15.0403 7.78188C15.4456 7.7708 15.9264 7.66382 16.3392 7.28657L14.99 5.8102C15.0415 5.76312 15.0835 5.77995 14.9856 5.78263C14.9304 5.78414 14.8523 5.77989 14.7391 5.76541C14.6252 5.75084 14.4992 5.72918 14.3428 5.70138L13.9928 7.67053ZM16.3029 7.31816C16.8959 6.82642 17.0001 6.06663 17.0001 5.50286H15.0001C15.0001 5.68867 14.9798 5.79342 14.965 5.84071C14.9518 5.88272 14.9573 5.83577 15.0263 5.77862L16.3029 7.31816ZM17.0001 5.50286C17.0001 4.76494 16.812 4.06948 16.4066 3.4683C16.0032 2.87014 15.4237 2.42292 14.7302 2.11342L13.9151 3.93979C14.3313 4.12555 14.5905 4.35241 14.7484 4.58655C14.9043 4.81767 15.0001 5.1127 15.0001 5.50286L17.0001 5.50286ZM13.0323 1.57787C13.0483 1.57787 13.0896 1.58481 13.1384 1.63686C13.1874 1.68912 13.2194 1.76343 13.2194 1.84351H15.2194C15.2194 0.664692 14.2891 -0.422134 13.0323 -0.422134V1.57787ZM13.2194 1.84351C13.2194 1.92358 13.1874 1.99789 13.1384 2.05016C13.0896 2.1022 13.0483 2.10915 13.0323 2.10915V4.10915C14.2891 4.10915 15.2194 3.02232 15.2194 1.84351H13.2194ZM13.0323 2.10915C13.0163 2.10915 12.975 2.1022 12.9262 2.05016C12.8772 1.99789 12.8452 1.92358 12.8452 1.84351H10.8452C10.8452 3.02232 11.7755 4.10915 13.0323 4.10915V2.10915ZM12.8452 1.84351C12.8452 1.76343 12.8772 1.68912 12.9262 1.63686C12.975 1.58481 13.0163 1.57787 13.0323 1.57787V-0.422134C11.7755 -0.422134 10.8452 0.664692 10.8452 1.84351H12.8452ZM14.6545 5.36998C14.7844 5.25127 14.9129 5.21743 14.9586 5.2084C15.001 5.20001 15.0094 5.20535 14.9583 5.20254C14.9115 5.19995 14.8444 5.19244 14.7461 5.17752C14.6462 5.16237 14.5433 5.14428 14.4112 5.12204L14.0792 7.09429C14.2903 7.12983 14.5898 7.18526 14.8482 7.19951C15.0541 7.21086 15.5857 7.22835 16.0037 6.84635L14.6545 5.36998ZM14.3958 5.11956C14.093 5.07344 13.5696 4.97059 13.0323 4.97059V6.97059C13.3725 6.97059 13.6749 7.03283 14.0946 7.09676L14.3958 5.11956ZM13.0323 4.97059C12.5113 4.97059 12.0235 5.03577 11.5967 5.13328L12.0421 7.08305C12.3379 7.01548 12.6759 6.97059 13.0323 6.97059V4.97059ZM11.6534 5.12204C11.5339 5.14215 11.4301 5.15872 11.3375 5.17097C11.2439 5.18334 11.1748 5.18954 11.1246 5.19138C11.0709 5.19336 11.0648 5.18922 11.089 5.19357C11.1099 5.19733 11.2178 5.21845 11.3414 5.31259L10.1297 6.90373C10.5231 7.20337 10.9951 7.19749 11.1981 7.19003C11.4592 7.18043 11.7457 7.13465 11.9854 7.09429L11.6534 5.12204ZM11.3601 5.32715C11.4702 5.41525 11.5277 5.50785 11.5537 5.55753C11.5804 5.60836 11.5888 5.64234 11.5895 5.64541C11.5903 5.64858 11.5807 5.60589 11.5807 5.50286H9.5807C9.5807 5.70247 9.59689 5.92117 9.6493 6.13069C9.69414 6.30999 9.80404 6.6437 10.111 6.88918L11.3601 5.32715ZM11.5807 5.50286C11.5807 5.18264 11.6612 4.99277 11.7696 4.85648C11.8891 4.70637 12.1136 4.53361 12.5414 4.38158L11.8716 2.49705C11.2156 2.73021 10.6272 3.08022 10.2047 3.61107C9.77123 4.15575 9.5807 4.80506 9.5807 5.50286H11.5807ZM11.6969 4.29971C12.0847 4.52945 12.5449 4.65943 13.0323 4.65943V2.65943C12.9004 2.65943 12.7928 2.62432 12.7161 2.57892L11.6969 4.29971ZM13.0323 4.65943C13.5198 4.65943 13.9799 4.52945 14.3677 4.29971L13.3485 2.57892C13.2718 2.62432 13.1642 2.65943 13.0323 2.65943V4.65943ZM13.5233 4.38158C13.9421 4.53042 14.169 4.7069 14.292 4.86296C14.406 5.00762 14.4839 5.20112 14.4839 5.50286H16.4839C16.4839 4.8141 16.2909 4.16842 15.863 3.62523C15.444 3.09344 14.858 2.7334 14.193 2.49705L13.5233 4.38158ZM14.4839 5.50286C14.4839 5.60589 14.4743 5.64858 14.4751 5.64541C14.4759 5.64234 14.4843 5.60836 14.5109 5.55753C14.5369 5.50785 14.5944 5.41525 14.7046 5.32715L15.9536 6.88918C16.2606 6.6437 16.3705 6.30999 16.4153 6.13069C16.4677 5.92117 16.4839 5.70247 16.4839 5.50286L14.4839 5.50286Z"
      fill={color}
      mask="url(#path-3-inside-2_6619_36)"
    />
    <path
      d="M9.29029 12.2438C9.54836 11.9136 9.70319 11.5009 9.70319 11.0607C9.70319 10.0702 8.929 9.24477 7.99997 9.24477C7.07094 9.24477 6.29674 10.0702 6.29674 11.0607C6.29674 11.5009 6.45158 11.9136 6.70965 12.2438C5.59997 12.739 5.03223 13.592 5.03223 14.72C5.03223 15.2153 5.13545 15.5455 5.36771 15.7656C5.75481 16.1233 6.58061 15.9582 6.86448 15.9031C7.19997 15.8481 7.61287 15.7931 7.99997 15.7931C8.41287 15.7931 8.79997 15.8481 9.13545 15.9031C9.75481 16.0132 10.2709 16.0957 10.6322 15.7656C10.8645 15.573 10.9677 15.2153 10.9677 14.72C10.9677 13.592 10.4 12.739 9.29029 12.2438ZM7.99997 9.79505C8.64513 9.79505 9.18706 10.3728 9.18706 11.0607C9.18706 11.7485 8.64513 12.3263 7.99997 12.3263C7.35481 12.3263 6.81287 11.7485 6.81287 11.0607C6.81287 10.3728 7.35481 9.79505 7.99997 9.79505ZM10.2967 15.3529C10.1161 15.5179 9.70319 15.4354 9.21287 15.3529C8.85158 15.2978 8.43868 15.2153 7.99997 15.2153C7.56126 15.2153 7.14836 15.2703 6.78707 15.3529C6.29674 15.4354 5.88384 15.4904 5.70319 15.3529C5.59997 15.2703 5.54836 15.0502 5.54836 14.7476C5.54836 13.7295 6.09029 13.0692 7.17416 12.684C7.40642 12.8216 7.69029 12.9041 7.99997 12.9041C8.30965 12.9041 8.59352 12.8216 8.82578 12.684C9.90965 13.0692 10.4516 13.7571 10.4516 14.7476C10.4516 15.0502 10.4 15.2428 10.2967 15.3529Z"
      fill={color}
    />
    <path
      d="M10.7097 12.2162L10.9678 12.7115C12.8775 11.6109 14.0904 9.49234 14.1936 7.20868L13.6775 7.18117C13.6 9.27223 12.4646 11.1982 10.7097 12.2162Z"
      fill={color}
    />
    <path
      d="M7.99992 0.852913C8.95476 0.852913 9.88379 1.10054 10.7096 1.59579L10.9677 1.10054C10.0644 0.577774 9.05798 0.302635 8.02573 0.302635C6.99347 0.302635 5.96121 0.577774 5.05798 1.10054L5.31605 1.59579C6.11605 1.10054 7.04508 0.852913 7.99992 0.852913Z"
      fill={color}
    />
    <path
      d="M5.52265 12.3538C3.63878 11.3908 2.42587 9.4098 2.32265 7.18117L1.80652 7.20868C1.90974 9.62991 3.25168 11.8035 5.29039 12.8765L5.52265 12.3538Z"
      fill={color}
    />
    <path
      d="M8.25807 6.08064H7.74194V6.63092H8.25807V6.08064Z"
      fill={color}
    />
    <path
      d="M9.2903 6.08064H8.77417V6.63092H9.2903V6.08064Z"
      fill={color}
    />
    <path
      d="M7.22585 6.08064H6.70972V6.63092H7.22585V6.08064Z"
      fill={color}
    />
  </svg>
))
