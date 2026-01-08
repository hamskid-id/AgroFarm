import { Button } from "../../ui/button";
import { SheetWrapper } from "../../ui/custom-sheet";
import FavoritesProducts from "./FavoritesProducts";
import MobileMenu from "./MobileMenu";
import NotificationsSheet from "./NotificationsSheet";
import { products } from "@/components/constants/product";
import Link from "next/link";
import { UserPlus, Heart, Bell, Menu } from "lucide-react";
import { useFavoritesStore } from "@/stores/favorites-store";

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
  const { getFavoritesCount, favorites } = useFavoritesStore();
  const favoritesCount = getFavoritesCount();

  return (
    <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2">
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
            {favoritesCount > 0 && (
              <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs flex items-center justify-center shadow-sm">
                {favoritesCount}
              </div>
            )}
          </Button>
        }
      >
        <FavoritesProducts favoritesList={favorites} />
      </SheetWrapper>

      {/* Auth Buttons */}
      <div className="flex items-center gap-2">
        <Button className=" bg-orange-500 hover:bg-orange-600 text-white hidden lg:flex">
          Start Selling
        </Button>
        <Button
          variant="ghost"
          asChild
          className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
        >
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
      </div>

      {/* Mobile Menu */}
      {/* <SheetWrapper
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
      </SheetWrapper> */}
    </div>
  );
};

export default HeaderActions;
