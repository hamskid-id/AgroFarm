import { Bell, CheckCircle2, Truck, Tag, Star } from "lucide-react";
import { Button } from "../../ui/button";
import { SheetWrapper } from "../../ui/custom-sheet";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "order" | "offer" | "product" | "rating";
}

interface NotificationsSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NotificationsSheet = ({ isOpen, setIsOpen }: NotificationsSheetProps) => {
  const notifications: Notification[] = [
    {
      id: 1,
      title: "New Arrival!",
      message: "Fresh organic tomatoes just arrived from Green Valley Farms",
      time: "5 min ago",
      unread: true,
      type: "product",
    },
    {
      id: 2,
      title: "Order Shipped",
      message: "Your order #ORD-7890 has been shipped and will arrive tomorrow",
      time: "1 hour ago",
      unread: true,
      type: "order",
    },
    {
      id: 3,
      title: "Special Offer",
      message: "20% off on all organic products this weekend only",
      time: "2 hours ago",
      unread: false,
      type: "offer",
    },
    {
      id: 4,
      title: "Price Alert",
      message: "Avocado prices have dropped by 15% at Fresh Harvest",
      time: "1 day ago",
      unread: false,
      type: "product",
    },
  ];

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "offer":
        return <Tag className="h-4 w-4 text-orange-500" />;
      case "rating":
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-emerald-500" />;
    }
  };

  return (
    <SheetWrapper
      open={isOpen}
      title="Notifications"
      setOpen={setIsOpen}
      trigger={
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-blue-50 transition-colors h-10 w-10 group"
        >
          <Bell className="h-5 w-5 text-gray-600 group-hover:text-blue-500 transition-colors" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs flex items-center justify-center shadow-sm">
              {unreadCount}
            </div>
          )}
        </Button>
      }
    >
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md group ${
                notification.unread
                  ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4
                      className={`font-semibold text-sm ${
                        notification.unread ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {notification.title}
                    </h4>
                    {notification.unread && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No notifications yet</p>
            <p className="text-sm text-gray-400 mt-1">
              We'll notify you about orders and offers
            </p>
          </div>
        )}

        {notifications.length > 0 && (
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          </div>
        )}
      </div>
    </SheetWrapper>
  );
};

export default NotificationsSheet;
