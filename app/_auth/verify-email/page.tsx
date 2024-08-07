import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/images/logos/logo.png";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/service/api/user.service";
import SendAgainBtn from "./send-again";
import ChangeEmailForm from "./change-email";
import UserMenu from "./user-menu";

const VerifyEmailPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex flex-col min-h-screen ">
      <header className="sticky top-0 left-0 right-0">
        <div className="flex justify-center sm:justify-between items-center px-4 py-2 ">
          <Link href="/" prefetch={true}>
            <Image
              priority
              src={LogoImage.src}
              width={48}
              height={48}
              alt="logo"
              className="w-full size-auto"
            />
          </Link>
          <UserMenu currentUser={currentUser!} />
        </div>
      </header>
      <div
        className="flex flex-col flex-grow sm:flex-grow-0 sm:grid grid-cols-12 transition-all
      "
      >
        <div className="flex flex-col flex-grow sm:flex-grow-0 sm:col-start-3 sm:col-end-11 mx-auto w-full sm:max-w-[570px] p-4">
          <div className="flex flex-col flex-grow space-y-6">
            <div className="mt-10 mb-6 text-center">
              <div className="inline-flex  w-[145px] h-[130px] min-w-[145px] min-h-[130px]">
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 145 130"
                  aria-hidden="true"
                  role="img"
                >
                  <g clipPath="url(#clip0_11448_56766)">
                    <path
                      d="M143.906 114.414H1.095c-.605 0-1.095.49-1.095 1.095v.014c0 .604.49 1.094 1.095 1.094h142.811c.604 0 1.094-.49 1.094-1.094v-.014c0-.605-.49-1.095-1.094-1.095z"
                      fill="url(#paint0_linear_11448_56766-uid-3)"
                    ></path>
                    <path
                      d="M114.908 60.428a23.635 23.635 0 01-20.07-23.354"
                      fill="#fff"
                    ></path>
                    <path
                      d="M114.908 60.428a23.635 23.635 0 01-20.07-23.354"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M127.217 107.563l-50.19-37.952a7.207 7.207 0 00-9.055 0l-50.19 38.237v1.677c0 3.966 2.401 7.107 5.685 7.107h98.079c3.24 0 5.685-2.999 5.685-6.837l-.014-2.232z"
                      fill="url(#paint1_linear_11448_56766-uid-3)"
                    ></path>
                    <path
                      d="M30.433 35.338a6.866 6.866 0 00-6.61 6.226l-5.927 65.002c-.412 4.349 2.133 7.917 5.686 7.917h97.993c3.554 0 6.084-3.582 5.686-7.917l-5.998-64.931a6.87 6.87 0 00-6.709-6.297h-84.12z"
                      fill="url(#paint2_linear_11448_56766-uid-3)"
                    ></path>
                    <path
                      d="M121.162 41.564a6.85 6.85 0 00-6.609-6.226h-14.314a14.94 14.94 0 00-3.141 8.998c0 8.414 7.505 15.479 17.625 17.512a18.141 18.141 0 01-5.316 6.34c-.284.227 0 .596.412.468a23.09 23.09 0 009.808-6.197h1.081c.81 0 1.606 0 2.388-.1l-1.934-20.795zm-97.025-1.449L66.225 69.88a7.108 7.108 0 005.459 1.194 6.978 6.978 0 01-3.454-1.421L26.425 36.832a7.008 7.008 0 00-2.288 3.283z"
                      fill="#C3D2C3"
                    ></path>
                    <path
                      d="M118.66 36.918L76.756 69.781a7.022 7.022 0 01-3.468 1.422 7.107 7.107 0 005.458-1.194l42.146-29.85a7.108 7.108 0 00-2.232-3.241z"
                      fill="#C3D2C3"
                    ></path>
                    <path
                      d="M17.895 106.482l.441-4.761 49.551-34.484a7.391 7.391 0 014.392-1.35 7.349 7.349 0 00-4.264 1.591l-50.12 39.004zm109.351 0l-.441-4.761-49.693-34.484a7.335 7.335 0 00-4.392-1.35 7.362 7.362 0 014.264 1.591l50.134 39.004h.128z"
                      fill="url(#paint3_linear_11448_56766-uid-3)"
                    ></path>
                    <path
                      d="M17.781 107.32c0 3.965 2.402 7.107 5.686 7.107h97.993c3.554 0 6.084-3.582 5.686-7.918l-50.12-39.046a7.206 7.206 0 00-9.054 0l-50.077 39.103-.114.754z"
                      fill="url(#paint4_linear_11448_56766-uid-3)"
                    ></path>
                    <path
                      d="M76.757 69.78l41.904-32.864a6.414 6.414 0 00-4.108-1.578h-84.12a6.467 6.467 0 00-4.094 1.578l41.918 32.863a6.795 6.795 0 008.5 0z"
                      fill="url(#paint5_linear_11448_56766-uid-3)"
                    ></path>
                    <path
                      d="M112.577 59.56a23.482 23.482 0 01-5.416 8.415.383.383 0 000 .526.351.351 0 00.426.086 23.397 23.397 0 009.95-8.302l-4.96-.724z"
                      fill="url(#paint6_radial_11448_56766-uid-3)"
                    ></path>
                    <path
                      d="M142.072 36.917a23.62 23.62 0 01-6.582 17.11 23.624 23.624 0 01-40.652-16.726v-.256a23.624 23.624 0 0147.234 0"
                      fill="url(#paint7_radial_11448_56766-uid-3)"
                    ></path>
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_11448_56766-uid-3"
                      x1="0"
                      y1="115.509"
                      x2="145"
                      y2="115.509"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#C3D2C3" stopOpacity="0"></stop>
                      <stop
                        offset=".01"
                        stopColor="#C3D2C3"
                        stopOpacity=".05"
                      ></stop>
                      <stop
                        offset=".03"
                        stopColor="#C3D2C3"
                        stopOpacity=".3"
                      ></stop>
                      <stop
                        offset=".06"
                        stopColor="#C3D2C3"
                        stopOpacity=".51"
                      ></stop>
                      <stop
                        offset=".09"
                        stopColor="#C3D2C3"
                        stopOpacity=".69"
                      ></stop>
                      <stop
                        offset=".12"
                        stopColor="#C3D2C3"
                        stopOpacity=".83"
                      ></stop>
                      <stop
                        offset=".15"
                        stopColor="#C3D2C3"
                        stopOpacity=".92"
                      ></stop>
                      <stop
                        offset=".18"
                        stopColor="#C3D2C3"
                        stopOpacity=".98"
                      ></stop>
                      <stop offset=".21" stopColor="#C3D2C3"></stop>
                      <stop offset=".84" stopColor="#C3D2C3"></stop>
                      <stop
                        offset=".88"
                        stopColor="#C3D2C3"
                        stopOpacity=".78"
                      ></stop>
                      <stop
                        offset=".96"
                        stopColor="#C3D2C3"
                        stopOpacity=".23"
                      ></stop>
                      <stop
                        offset="1"
                        stopColor="#C3D2C3"
                        stopOpacity=".01"
                      ></stop>
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_11448_56766-uid-3"
                      x1="17.781"
                      y1="92.34"
                      x2="127.217"
                      y2="92.34"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9AAA97"></stop>
                      <stop offset=".31" stopColor="#8D9D88"></stop>
                      <stop offset=".9" stopColor="#6B7962"></stop>
                      <stop offset="1" stopColor="#65735B"></stop>
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_11448_56766-uid-3"
                      x1="72.508"
                      y1="114.398"
                      x2="72.508"
                      y2="35.324"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9AAA97"></stop>
                      <stop offset=".02" stopColor="#9EAE9C"></stop>
                      <stop offset=".19" stopColor="#BDC8BB"></stop>
                      <stop offset=".37" stopColor="#D4DDD3"></stop>
                      <stop offset=".56" stopColor="#E5EBE4"></stop>
                      <stop offset=".76" stopColor="#EFF4EF"></stop>
                      <stop offset="1" stopColor="#F2F7F2"></stop>
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_11448_56766-uid-3"
                      x1="72.507"
                      y1="106.482"
                      x2="72.507"
                      y2="65.872"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9AAA97"></stop>
                      <stop offset=".14" stopColor="#A6B6A4"></stop>
                      <stop offset=".4" stopColor="#B6C6B5"></stop>
                      <stop offset=".67" stopColor="#C0CFC0"></stop>
                      <stop offset="1" stopColor="#C3D2C3"></stop>
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_11448_56766-uid-3"
                      x1="72.506"
                      y1="114.398"
                      x2="72.506"
                      y2="65.857"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9AAA97"></stop>
                      <stop offset=".09" stopColor="#B5C2B3"></stop>
                      <stop offset=".18" stopColor="#CCD5CA"></stop>
                      <stop offset=".29" stopColor="#DDE5DC"></stop>
                      <stop offset=".42" stopColor="#E9EFE9"></stop>
                      <stop offset=".6" stopColor="#F0F5F0"></stop>
                      <stop offset="1" stopColor="#F2F7F2"></stop>
                    </linearGradient>
                    <linearGradient
                      id="paint5_linear_11448_56766-uid-3"
                      x1="72.507"
                      y1="71.257"
                      x2="72.507"
                      y2="35.324"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9AAA97"></stop>
                      <stop offset=".04" stopColor="#9FAF9C"></stop>
                      <stop offset=".32" stopColor="#C3CEC1"></stop>
                      <stop offset=".58" stopColor="#DDE4DC"></stop>
                      <stop offset=".82" stopColor="#ECF2EC"></stop>
                      <stop offset="1" stopColor="#F2F7F2"></stop>
                    </linearGradient>
                    <radialGradient
                      id="paint6_radial_11448_56766-uid-3"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="rotate(34.804 -43.113 203.923) scale(4.8973 8.39264)"
                    >
                      <stop offset=".78" stopColor="#F66DBC"></stop>
                      <stop offset=".83" stopColor="#F867A2"></stop>
                      <stop offset=".92" stopColor="#FC585E"></stop>
                      <stop offset="1" stopColor="#FF4B25"></stop>
                    </radialGradient>
                    <radialGradient
                      id="paint7_radial_11448_56766-uid-3"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="matrix(25.58572 37.6679 -67.2682 45.69157 109.578 17.017)"
                    >
                      <stop offset=".558" stopColor="#F66DBC"></stop>
                      <stop offset=".749" stopColor="#F867A2"></stop>
                      <stop offset=".854" stopColor="#FC585E"></stop>
                      <stop offset="1" stopColor="#FF4B25"></stop>
                    </radialGradient>
                    <clipPath id="clip0_11448_56766-uid-3">
                      <rect width="145" height="130" fill="#fff"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-center mt-4">
              <span>Verify your email to continue</span>
            </h1>
            <div className="text-center text-muted-foreground text-base">
              We just sent an email to the address:{" "}
              <strong className="block md:inline">{currentUser?.email}</strong>
            </div>
            <p className="text-center text-muted-foreground text-base">
              Please check your email and select the link provided to verify
              your address.
            </p>
            <div className="flex flex-col sm:justify-center sm:flex-row gap-2">
              <Link
                target="_blank"
                href="https://gmail.com/"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "rounded-full order-last font-bold"
                )}
              >
                Go to Gmail Inbox
              </Link>
              <SendAgainBtn />
            </div>

            <ChangeEmailForm currentEmail={currentUser?.email!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
