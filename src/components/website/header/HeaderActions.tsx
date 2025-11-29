import { Button } from "../../ui/button";
import { SheetWrapper } from "../../ui/custom-sheet";
import FavoritesProducts from "./FavoritesProducts";
import MobileMenu from "./MobileMenu";
import NotificationsSheet from "./NotificationsSheet";
import { products } from "@/components/constants/product";
import Link from "next/link";
import { UserPlus, Heart, Bell, Menu } from "lucide-react";

interface HeaderActionsProps {
  isFavoriteSheetOpen: boolean;
  setIsFavoriteSheetOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const HeaderActions = ({
  isFavoriteSheetOpen,
  setIsFavoriteSheetOpen,
  isNotificationsOpen,
  setIsNotificationsOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: HeaderActionsProps) => {
  const favoritesList = products;

  return (
    <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2">
      {/* Join as Vendor Button */}
      <Button
        variant="outline"
        className="font-semibold text-orange-800 hidden lg:flex items-center gap-2 bg-orange-50 rounded-xl border border-orange-200 px-4 py-2 text-sm rounded-lg transition-all duration-200"
        asChild
      >
        <Link href="/vendor-registration">
          <UserPlus className="h-4 w-4" />
          Sell on FarmCart
        </Link>
      </Button>

      {/* Notifications */}
      <NotificationsSheet
        isOpen={isNotificationsOpen}
        setIsOpen={setIsNotificationsOpen}
      />

      {/* Wishlist */}
      <SheetWrapper
        open={isFavoriteSheetOpen}
        title="Your Wishlist"
        setOpen={setIsFavoriteSheetOpen}
        trigger={
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-rose-50 transition-colors h-10 w-10 group"
          >
            <Heart className="h-5 w-5 text-gray-600 group-hover:text-rose-500 transition-colors" />
            {favoritesList.length > 0 && (
              <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs flex items-center justify-center shadow-sm">
                {favoritesList.length}
              </div>
            )}
          </Button>
        }
      >
        <FavoritesProducts favoritesList={favoritesList} />
      </SheetWrapper>

      {/* Auth Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          asChild
          className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
        >
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
        <Button
          asChild
          className="hidden md:inline-flex bg-[#D89C06] hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-2 text-sm rounded-lg hover:shadow-lg transition-all"
        >
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>

      {/* Mobile Menu */}
      <SheetWrapper
        open={isMobileMenuOpen}
        title="Menu"
        setOpen={setIsMobileMenuOpen}
        trigger={
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-10 w-10 hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </Button>
        }
      >
        <MobileMenu />
      </SheetWrapper>
    </div>
  );
};

export default HeaderActions;
