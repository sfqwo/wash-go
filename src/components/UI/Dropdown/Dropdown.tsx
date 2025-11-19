"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { IDropdown } from "./types";
import styles from "./Dropdown.module.scss";

export function Dropdown({ children, content }: IDropdown) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.content} sideOffset={10}>
          {content}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function DropdownItem({
  ...props
}: React.ComponentProps<typeof DropdownMenu.Item>) {
  return <DropdownMenu.Item asChild {...props} />;
}

