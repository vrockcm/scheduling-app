import { styled, useStyletron } from "baseui";

export const FullHeightContainer = styled("div", ({ $theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: $theme.colors.backgroundSecondary,
}));

export const Container = styled("div", ({ $theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  overflow: "auto",
}));

export const SplitItemsWithSpaceContainer = styled("div", ({ $theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
}));

export const SplitItemsContainer = styled("div", ({ $theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const NoFlexContainer = styled("div", ({ $theme }) => ({
  width: "100%",
  height: "100%",
  overflow: "auto",
}));

export const Outer = ({ children }) => {
  const [css, theme] = useStyletron();
  return <div>{children}</div>;
};

export const Inner = ({ children }) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: ".25rem",
      })}
    >
      {children}
    </div>
  );
};
