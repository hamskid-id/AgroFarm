"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Define union types for better type safety
export type DropdownSeparator = {
  separator: true;
};

export type DropdownMenuItemType = {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  subItems?: DropdownItem[];
  content?: never; // Ensure content is not used with label
};

export type DropdownContentItem = {
  content: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  label?: never; // Ensure label is not used with content
  icon?: never;
  subItems?: never;
};

export type DropdownItem =
  | DropdownSeparator
  | DropdownMenuItemType
  | DropdownContentItem;

interface CustomDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
  label?: string;
  disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  trigger,
  items,
  className,
  label,
  disabled = false,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn("w-[145px]", className)}>
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}

        {items.map((item, index) => {
          // Type guard for separator
          if ("separator" in item && item.separator) {
            return <DropdownMenuSeparator key={`separator-${index}`} />;
          }

          // Type guard for content item
          if ("content" in item && item.content) {
            return (
              <DropdownMenuItem
                key={`content-${index}`}
                onClick={item.onClick}
                disabled={item.disabled}
                className="p-0"
              >
                {item.content}
              </DropdownMenuItem>
            );
          }

          // Type guard for regular menu item
          if ("label" in item) {
            // Handle submenu items
            if (item.subItems && item.subItems.length > 0) {
              return (
                <DropdownMenuSub key={`submenu-${index}`}>
                  <DropdownMenuSubTrigger>
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {item.subItems.map((subItem, subIndex) => {
                      if ("separator" in subItem && subItem.separator) {
                        return (
                          <DropdownMenuSeparator
                            key={`sub-separator-${subIndex}`}
                          />
                        );
                      }

                      if ("label" in subItem) {
                        return (
                          <DropdownMenuItem
                            key={`subitem-${subIndex}`}
                            onClick={subItem.onClick}
                            disabled={subItem.disabled}
                          >
                            {subItem.icon && (
                              <span className="mr-2">{subItem.icon}</span>
                            )}
                            {subItem.label}
                          </DropdownMenuItem>
                        );
                      }

                      return null;
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              );
            }

            // Regular menu item
            return (
              <DropdownMenuItem
                key={`item-${index}`}
                onClick={item.onClick}
                disabled={item.disabled}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </DropdownMenuItem>
            );
          }

          return null;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(CustomDropdown);
