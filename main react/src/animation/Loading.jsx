import { motion } from "framer-motion";

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(194,194,194,255)"
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(97,97,97,255)"
  }
};

export function Loading (){
  return (
    <div className="d-flex justify-content-center">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        className="logo-animate"
      >
      <motion.path
        d="M36.5848 37.4734H34.7413V20.077H36.7406L46.3995 34.3836H46.5553V20.077H48.4248V37.4734H46.3995L36.7146 23.2187H36.5848V37.4734Z"variants={icon}
        initial="hidden"
          animate="visible"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          transition={{
            default: { repeat: Infinity, duration: 2, ease: "linear" },
            fill: { repeat: Infinity, duration: 2, ease: [1, 0, 0.8, 1] }
          }}
      />
      <motion.path
        d="M63.4402 37.4734H51.73V20.077H63.4402V21.7647H53.5735V27.8664H63.0507V29.5801H53.5735V35.7857H63.4402V37.4734Z"variants={icon}
        initial="hidden"
          animate="visible"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          transition={{
            default: { repeat: Infinity, duration: 2, ease: "linear" },
            fill: { repeat: Infinity, duration: 2, ease: [1, 0, 0.8, 1] }
          }}
      />
      <motion.path
        d="M67.4682 37.4734H65.2352L71.5707 28.7492V28.5934L65.2352 20.077H67.4942L72.9728 27.425H73.1286L78.5812 20.077H80.8142L74.4787 28.5934V28.7233L80.8142 37.4734H78.5552L73.0766 29.9177H72.9468L67.4682 37.4734Z"variants={icon}
        initial="hidden"
          animate="visible"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          transition={{
            default: { repeat: Infinity, duration: 2, ease: "linear" },
            fill: { repeat: Infinity, duration: 2, ease: [1, 0, 0.8, 1] }
          }}
      />
      <motion.path
        d="M90.3889 37.7331C85.9489 37.7331 83.1707 35.1626 83.1707 30.6187V20.077H85.0402V30.6187C85.0402 34.3317 86.5721 35.9415 90.3889 35.9415C94.1538 35.9415 95.7117 34.3317 95.7117 30.6187V20.077H97.5812V30.6187C97.5812 35.1626 94.777 37.7331 90.3889 37.7331Z"variants={icon}
        initial="hidden"
          animate="visible"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          transition={{
            default: { repeat: Infinity, duration: 2, ease: "linear" },
            fill: { repeat: Infinity, duration: 2, ease: [1, 0, 0.8, 1] }
          }}
      />
      <motion.path
        d="M107.211 37.7331C102.381 37.7331 100.278 35.1885 100.278 32.2026V31.8131H102.122V32.0987C102.122 34.5134 103.394 36.0194 107.263 36.0194C110.145 36.0194 111.495 35.0587 111.495 33.0594C111.495 31.112 110.612 30.385 107.99 29.8138L104.978 29.1387C102.252 28.5675 100.382 27.3212 100.382 24.517C100.382 21.9984 102.459 19.8173 106.588 19.8173C111.106 19.8173 113.079 22.5696 113.079 25.3998V25.7373H111.236V25.4517C111.236 23.0629 109.989 21.531 106.562 21.531C103.68 21.531 102.252 22.4917 102.252 24.3871C102.252 26.3605 103.212 26.9317 105.757 27.5289L108.769 28.2299C111.651 28.8791 113.365 30.2292 113.365 32.9556C113.365 35.604 111.313 37.7331 107.211 37.7331Z"variants={icon}
        initial="hidden"
          animate="visible"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          transition={{
            default: { repeat: Infinity, duration: 2, ease: "linear" },
            fill: { repeat: Infinity, duration: 2, ease: [1, 0, 0.8, 1] }
          }}
      />
      <motion.path
        d="M42.0114 18.2596C37.0781 18.2596 34.0921 14.7284 34.0921 9.30175C34.0921 3.87508 37.0781 0.343857 42.0114 0.343857C46.2697 0.343857 49.1518 2.86245 49.1518 6.80912V7.01684H47.1785V6.80912C47.1785 3.74526 45.5427 2.13544 41.9076 2.13544C37.8311 2.13544 36.0395 4.47228 36.0395 9.30175C36.0395 14.1312 37.8311 16.4681 41.9076 16.4681C45.5427 16.4681 47.1785 14.8582 47.1785 11.7944V11.5867H49.1518V11.7944C49.1518 15.741 46.2697 18.2596 42.0114 18.2596Z"variants={icon}
        initial="hidden"
          animate="visible"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          transition={{
            default: { repeat: Infinity, duration: 2, ease: "linear" },
            fill: { repeat: Infinity, duration: 2, ease: [1, 0, 0.8, 1] }
          }}
      />
      <motion.path
        d="M63.413 18H52.0404V0.603506H53.8839V16.3123H63.413V18Z"variants={icon}
        initial="hidden"
          animate="visible"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          transition={{
            default: { repeat: Infinity, duration: 2, ease: "linear" },
            fill: { repeat: Infinity, duration: 2, ease: [1, 0, 0.8, 1] }
          }}
      />
      <motion.path
        d="M66.3633 18H64.4159L71.4524 0.603506H74.1008L81.1373 18H79.138L77.0349 12.9109H68.4405L66.3633 18ZM71.6601 5.01754L69.1156 11.2232H76.3338L73.7892 5.01754L72.8026 2.36912H72.6727L71.6601 5.01754Z"variants={icon}
        initial="hidden"
          animate="visible"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          transition={{
            default: { repeat: Infinity, duration: 2, ease: "linear" },
            fill: { repeat: Infinity, duration: 2, ease: [1, 0, 0.8, 1] }
          }}
      />
      <motion.path
        d="M89.9615 18.2596C85.1321 18.2596 83.0289 15.7151 83.0289 12.7291V12.3396H84.8724V12.6253C84.8724 15.04 86.1447 16.546 90.0135 16.546C92.8956 16.546 94.2457 15.5853 94.2457 13.586C94.2457 11.6386 93.3629 10.9116 90.7405 10.3403L87.7285 9.66526C85.0022 9.09403 83.1328 7.84772 83.1328 5.04351C83.1328 2.52491 85.2099 0.343857 89.3384 0.343857C93.8563 0.343857 95.8296 3.09614 95.8296 5.92631V6.26386H93.9861V5.97824C93.9861 3.58947 92.7398 2.05754 89.3124 2.05754C86.4303 2.05754 85.0022 3.01824 85.0022 4.91368C85.0022 6.88701 85.9629 7.45824 88.5075 8.05544L91.5194 8.75649C94.4015 9.40561 96.1152 10.7558 96.1152 13.4821C96.1152 16.1305 94.064 18.2596 89.9615 18.2596Z"variants={icon}
        initial="hidden"
          animate="visible"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          transition={{
            default: { repeat: Infinity, duration: 2, ease: "linear" },
            fill: { repeat: Infinity, duration: 2, ease: [1, 0, 0.8, 1] }
          }}
      />
      <motion.path
        d="M105.511 18.2596C100.682 18.2596 98.5784 15.7151 98.5784 12.7291V12.3396H100.422V12.6253C100.422 15.04 101.694 16.546 105.563 16.546C108.445 16.546 109.795 15.5853 109.795 13.586C109.795 11.6386 108.912 10.9116 106.29 10.3403L103.278 9.66526C100.552 9.09403 98.6823 7.84772 98.6823 5.04351C98.6823 2.52491 100.759 0.343857 104.888 0.343857C109.406 0.343857 111.379 3.09614 111.379 5.92631V6.26386H109.536V5.97824C109.536 3.58947 108.289 2.05754 104.862 2.05754C101.98 2.05754 100.552 3.01824 100.552 4.91368C100.552 6.88701 101.512 7.45824 104.057 8.05544L107.069 8.75649C109.951 9.40561 111.665 10.7558 111.665 13.4821C111.665 16.1305 109.614 18.2596 105.511 18.2596Z"variants={icon}
        initial="hidden"
          animate="visible"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          transition={{
            default: { repeat: Infinity, duration: 2, ease: "linear" },
            fill: { repeat: Infinity, duration: 2, ease: [1, 0, 0.8, 1] }
          }}
      />
        <motion.path
          d="M14.9298 0.999997L0 19.5L14.9298 38L29.8596 19.5L14.9298 0.999997ZM14.9298 4.46561L2.79681 19.5L14.9298 34.5344L27.0628 19.5L14.9298 4.46561Z"variants={icon}
          initial="hidden"
          animate="visible"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          transition={{
            default: { repeat: Infinity, duration: 2, ease: "linear" },
            fill: { repeat: Infinity, duration: 2, ease: "linear" }
          }}
        />
      </motion.svg>
    </div>
  )
}