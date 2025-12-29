"use client";

import { AppleIcon, ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FacebookIcon, GoogleIcon } from "@/svg";

interface IFooterText {
  footerText: string;
  footerLink: string;
  footerLinkTitle: string;
}

interface IAuthLayout extends Partial<IFooterText> {
  title?: string;
  description?: string;
  enableFooter?: boolean;
  children?: React.ReactNode;
  showBackButton?: boolean;
  backButtonHref?: string;
  backButtonText?: string;
}

const OrSeparator = () => (
  <div className="flex items-center w-full">
    <div className="flex-grow h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
    <span className="mx-4 text-sm font-medium text-gray-500">OR</span>
    <div className="flex-grow h-px bg-gradient-to-l from-gray-300 to-transparent"></div>
  </div>
);

const FooterText: React.FC<IFooterText> = ({
  footerText,
  footerLink,
  footerLinkTitle,
}) => (
  <div className="text-center sm:text-md text-[13px] text-gray-600">
    {footerText}
    <Link
      href={footerLink}
      className="ms-2 font-medium sm:text-md text-[13px] text-[#4169E1] hover:text-primary-500 hover:underline transition-colors"
    >
      {footerLinkTitle}
    </Link>
  </div>
);

const AuthLayout: React.FC<IAuthLayout> = ({
  title,
  description,
  enableFooter = true,
  children,
  footerText,
  footerLink,
  footerLinkTitle,
  showBackButton = true,
  backButtonHref = "/",
  backButtonText = "Back to home",
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[35rem]">
        {/* Back Button */}
        {showBackButton && (
          <div className="mb-6">
            <Link
              href={backButtonHref}
              className="inline-flex items-center text-[#00bc7d] hover:text-emerald-700 transition-colors font-medium"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              {backButtonText}
            </Link>
          </div>
        )}

        {/* Auth Card */}
        <section className="dark:bg-black bg-[#FAFAFA] rounded-3xl overflow-hidden pt-14 pb-12 md:px-16 px-4 w-full shadow-2xl border-0">
          <div className="flex flex-col w-full justify-center">
            <div className="h-full">
              <div className="min-h-full flex flex-col">
                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center py-0">
                  <div className="w-full">
                    {title && (
                      <h1 className="mb-2 text-[25px] text-center md:text-[30px] font-[700] dark:text-white">
                        {title}
                      </h1>
                    )}
                    {description && (
                      <p className="text-sm text-center md:text-[15px] font-[400] text-[#606060] dark:text-gray-400 mb-6">
                        {description}
                      </p>
                    )}

                    <div className="mt-6">
                      {children}

                      {enableFooter &&
                        footerText &&
                        footerLink &&
                        footerLinkTitle && (
                          <div className="mt-6 space-y-4">
                            <OrSeparator />

                            {/* Social Login */}
                            <div className="grid grid-cols-1 gap-4">
                              <button className="w-full bg-[#FDC316] hover:bg-[#FDC316]/90 rounded-[10px] flex justify-center items-center sm:h-[48px] h-[40px] hover:bg-gray-100 transition dark:bg-gray-800 dark:border-gray-700 shadow-sm">
                                <GoogleIcon />
                              </button>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-center pb-4">
                              <FooterText
                                footerText={footerText || ""}
                                footerLink={footerLink || ""}
                                footerLinkTitle={footerLinkTitle || ""}
                              />
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthLayout;
