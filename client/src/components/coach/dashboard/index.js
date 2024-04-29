import React, { useState } from "react";
import {
  NoFlexContainer,
  FullHeightContainer,
  Inner,
  Outer,
  Container,
  SplitItemsWithSpaceContainer,
} from "../../commons";
import AppHeader from "../../commons/appheader";
import { Grid, Cell, STYLE, ALIGNMENT } from "baseui/layout-grid";
import { getAllBookings } from "../../utils/resource";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Avatar } from "baseui/avatar";
import { Tag, VARIANT } from "baseui/tag";
import { Button, SHAPE } from "baseui/button";
import {
  DisplayXSmall,
  HeadingLarge,
  HeadingXSmall,
  HeadingXXLarge,
  LabelLarge,
  LabelMedium,
} from "baseui/typography";
import { Block } from "baseui/block";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    function fetchUserDetails() {
      getAllBookings().then((resp) => {
        setData(resp.data);
      });
    }
    fetchUserDetails();
  }, []);

  return (
    <FullHeightContainer>
      <AppHeader />
      <NoFlexContainer>
        <Block padding={"20px"}>
          <SplitItemsWithSpaceContainer>
            <HeadingLarge $style={{ textAlign: "center" }}>
              All Coach Bookings
            </HeadingLarge>
            <div>
              <Button
                shape={SHAPE.pill}
                overrides={{ BaseButton: { style: { margin: "10px" } } }}
                onClick={() => {
                  navigate(`/coaches/history`);
                }}
              >
                History
              </Button>
            </div>
          </SplitItemsWithSpaceContainer>

          {data && Object.entries(data).length > 0 ? (
            Object.entries(data).map(([date, bookings]) => (
              <Outer>
                <HeadingXSmall margin="10px" style={{ textAlign: "center" }}>
                  {date}
                </HeadingXSmall>
                <Grid
                  gridStyle={STYLE.compact}
                  gridGutters={0}
                  align={ALIGNMENT.center}
                  overrides={{
                    Root: {
                      style: {
                        justifyContent: "center",
                      },
                    },
                  }}
                >
                  {bookings.map((d) => (
                    <Cell span={[12, 6]}>
                      <Inner>
                        <Card key={d.id} $style={{ width: "100%" }}>
                          <StyledBody>
                            <Container>
                              <LabelLarge $style={{ textAlign: "center" }}>
                                {d.coach.name}
                              </LabelLarge>
                              <Tag
                                closeable={false}
                                variant={VARIANT.solid}
                                kind="accent"
                              >
                                Coach
                              </Tag>
                            </Container>

                            <LabelMedium>Name: {d.name}</LabelMedium>
                            <LabelMedium>Phone Number: {d.phone}</LabelMedium>
                            <LabelMedium>
                              Time: {d.startTime} - {d.endTime}
                            </LabelMedium>
                            <LabelMedium>Duration 2hr</LabelMedium>
                          </StyledBody>
                        </Card>
                      </Inner>
                    </Cell>
                  ))}
                </Grid>
              </Outer>
            ))
          ) : (
            <HeadingXSmall margin="10px" style={{ textAlign: "center" }}>
              No Bookings
            </HeadingXSmall>
          )}
        </Block>
      </NoFlexContainer>
    </FullHeightContainer>
  );
};

export default Dashboard;
