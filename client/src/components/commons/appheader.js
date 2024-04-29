import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from "baseui/header-navigation";
import { StyledLink as Link } from "baseui/link";
import { LabelMedium } from "baseui/typography";
import { useStyletron } from "baseui";

export default function AppHeader({ student }) {
  const [css, theme] = useStyletron();
  return (
    <div>
      <HeaderNavigation>
        <NavigationList $align={ALIGN.left}>
          <NavigationItem>
            <LabelMedium>Scheduling App</LabelMedium>
          </NavigationItem>
        </NavigationList>
        <NavigationList $align={ALIGN.center} />
        {!student && (
          <>
            <NavigationList $align={ALIGN.right}>
              <NavigationItem>
                <Link href="/">Home</Link>
              </NavigationItem>
            </NavigationList>
            <NavigationList $align={ALIGN.right}>
              <NavigationItem
                className={css({
                  marginRight: "20px",
                })}
              >
                <Link href="/coaches/profiles">Coach Schedules</Link>
              </NavigationItem>
            </NavigationList>
          </>
        )}
      </HeaderNavigation>
    </div>
  );
}
